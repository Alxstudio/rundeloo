import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

/** User validated with Supabase, or null. Memoized per request. */
export const getUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return error ? null : user;
});

/**
 * For pages and Server Actions. Call it inside EVERY action: an action is a
 * public POST and doesn't inherit the check of the page that renders it.
 */
export async function requireUser() {
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
}
