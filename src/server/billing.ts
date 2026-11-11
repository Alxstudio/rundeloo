import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/server/auth";

/** The plan only counts while the subscription is active. Any error means no access. */
export async function hasProAccess(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .eq("user_id", userId)
    .maybeSingle();

  return !error && data?.plan === "premium" && data.status === "active";
}

/** For pages and Server Actions of Pro features. */
export async function requirePro() {
  const user = await requireUser();
  if (!(await hasProAccess(user.id))) redirect("/settings/billing");
  return user;
}
