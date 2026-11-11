import "server-only";

type ServerSecret =
  | "SUPABASE_SECRET_KEY"
  | "ANTHROPIC_API_KEY"
  | "VOYAGE_API_KEY"
  | "STRIPE_SECRET_KEY"
  | "STRIPE_WEBHOOK_SECRET"
  | "CRON_SECRET";

/** Fails closed: a missing secret must never open an endpoint. */
export function requireServerEnv(name: ServerSecret) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}
