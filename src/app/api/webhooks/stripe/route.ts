import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { z } from "zod";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireServerEnv } from "@/server/env";
import { getStripe } from "@/server/stripe";
import type { Database } from "@/types/database";

type SubscriptionStatus = Database["public"]["Enums"]["subscription_status"];

const HANDLED_EVENTS = new Set([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

const userIdSchema = z.uuid();

function mapStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  switch (status) {
    case "active":
    case "trialing":
      return "active";
    case "canceled":
    case "incomplete_expired":
      return "canceled";
    default:
      return "past_due";
  }
}

async function syncSubscription(subscriptionId: string) {
  // Re-read from Stripe: duplicated or out-of-order events don't matter,
  // and a stale state is never written.
  const subscription = await getStripe().subscriptions.retrieve(subscriptionId);
  const supabase = createAdminClient();
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  // metadata.user_id is set by the server when it creates the Checkout.
  const metadataUserId = userIdSchema.safeParse(subscription.metadata.user_id);
  let userId = metadataUserId.success ? metadataUserId.data : null;

  if (!userId) {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();
    if (error) throw error;
    userId = data?.user_id ?? null;
  }

  if (!userId) {
    // Thrown so Stripe retries and the case stays visible.
    throw new Error(
      `Subscription without an associated user: ${subscription.id}`,
    );
  }

  const status = mapStatus(subscription.status);

  if (status === "canceled") {
    // Canceling an old subscription must not remove the plan from the new one.
    const { data, error } = await supabase
      .from("subscriptions")
      .select("stripe_subscription_id")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw error;
    if (
      data?.stripe_subscription_id &&
      data.stripe_subscription_id !== subscription.id
    ) {
      return;
    }
  }

  const periodEnd = subscription.items.data[0]?.current_period_end;

  const { error } = await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      plan: status === "canceled" ? "free" : "premium",
      status,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      current_period_end: periodEnd
        ? new Date(periodEnd * 1000).toISOString()
        : null,
      cancel_at_period_end: subscription.cancel_at_period_end,
    },
    { onConflict: "user_id" },
  );
  if (error) throw error;
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  // The signature is computed over the exact body: it must be read as text.
  const body = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      requireServerEnv("STRIPE_WEBHOOK_SECRET"),
    );
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (!HANDLED_EVENTS.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  try {
    const { id } = event.data.object as Stripe.Subscription;
    await syncSubscription(id);
  } catch (error) {
    // A 500 makes Stripe retry the event later.
    console.error("Stripe webhook error", event.id, error);
    return NextResponse.json({ error: "processing_failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
