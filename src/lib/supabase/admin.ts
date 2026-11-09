import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicEnv } from "@/lib/supabase/env";
import { requireServerEnv } from "@/server/env";
import type { Database } from "@/types/database";

/**
 * Usa la clave secreta y SALTA las políticas RLS.
 * Solo para el webhook de Stripe, el cron y la escritura en question_bank.
 * Nunca lo uses en una acción con datos del usuario: filtra tú cada consulta.
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
