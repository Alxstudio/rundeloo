import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/server/auth";

/** El plan solo cuenta con la suscripción activa. Ante cualquier error, no hay acceso. */
export async function hasProAccess(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("plan, status")
    .eq("user_id", userId)
    .maybeSingle();

  return !error && data?.plan === "premium" && data.status === "active";
}

/** Para páginas y Server Actions de funciones Pro. */
export async function requirePro() {
  const user = await requireUser();
  if (!(await hasProAccess(user.id))) redirect("/settings/billing");
  return user;
}
