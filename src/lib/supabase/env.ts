// Public variables only. Next inlines process.env.NEXT_PUBLIC_* at build time
// only when written literally, so they are not read dynamically.
export function getSupabasePublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error("Missing public Supabase environment variables");
  }

  return { url, publishableKey };
}
