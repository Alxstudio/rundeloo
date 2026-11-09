import "server-only";

import Stripe from "stripe";

import { requireServerEnv } from "@/server/env";

export function getStripe() {
  return new Stripe(requireServerEnv("STRIPE_SECRET_KEY"));
}
