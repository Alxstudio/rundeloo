// Solo variables públicas. Next sustituye process.env.NEXT_PUBLIC_* en el build
// únicamente si se escriben literalmente, por eso no se leen de forma dinámica.
export function getSupabasePublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error("Faltan las variables públicas de Supabase");
  }

  return { url, publishableKey };
}
