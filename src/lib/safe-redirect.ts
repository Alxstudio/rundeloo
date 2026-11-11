/**
 * Accepts internal paths only, to prevent open redirects:
 * browsers treat "//evil.com" and "/\evil.com" as another domain.
 */
export function safeRedirectPath(
  value: string | null | undefined,
  fallback = "/dashboard",
) {
  if (!value || !value.startsWith("/")) return fallback;
  if (value.startsWith("//") || value.includes("\\")) return fallback;
  return value;
}
