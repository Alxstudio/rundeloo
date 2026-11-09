/**
 * Acepta solo rutas internas para evitar redirecciones abiertas:
 * "//evil.com" o "/\evil.com" los navegadores los tratan como otro dominio.
 */
export function safeRedirectPath(
  value: string | null | undefined,
  fallback = "/dashboard",
) {
  if (!value || !value.startsWith("/")) return fallback;
  if (value.startsWith("//") || value.includes("\\")) return fallback;
  return value;
}
