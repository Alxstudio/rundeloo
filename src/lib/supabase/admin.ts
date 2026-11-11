import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicEnv } from "@/lib/supabase/env";
import { requireServerEnv } from "@/server/env";
import type { Database } from "@/types/database";

/**
 * Uses the secret key and BYPASSES RLS policies.
 * Only for the Stripe webhook, cron jobs and question_bank writes.
 * Never use it in an action with user data: you would have to filter every query yourself.
 */
export function createAdminClient() {
  const { url } = getSupabasePublicEnv();

  return createClient<Database>(url, requireServerEnv("SUPABASE_SECRET_KEY"), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
