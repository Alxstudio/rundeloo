import "server-only";

type ServerSecret =
  | "SUPABASE_SECRET_KEY"
  | "ANTHROPIC_API_KEY"
  | "VOYAGE_API_KEY"
  | "STRIPE_SECRET_KEY"
  | "STRIPE_WEBHOOK_SECRET"
  | "CRON_SECRET";

/** Falla de forma cerrada: un secreto ausente nunca debe abrir un endpoint. */
export function requireServerEnv(name: ServerSecret) {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}`);
  return value;
}
