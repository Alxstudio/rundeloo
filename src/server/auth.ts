import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

/** Usuario validado contra Supabase, o null. Se memoriza por petición. */
export const getUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return error ? null : user;
});

/**
 * Para páginas y Server Actions. Llámalo dentro de CADA acción: una acción es
 * un POST público y no hereda la comprobación de la página que la muestra.
 */
export async function requireUser() {
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
}
