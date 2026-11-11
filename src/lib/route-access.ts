// Route access rules applied by src/proxy.ts. Kept free of I/O so they can be unit tested.

const LANDING_PATH = "/";
const LOGIN_PATH = "/login";
const HOME_PATH = "/dashboard";
const ONBOARDING_PATH = "/onboarding";

/** Reachable without a session. Every other route is protected by default. */
const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/auth/callback",
  "/privacy",
  "/terms",
];

/** Signed-in users are sent away from these. */
const GUEST_ONLY_PATHS = ["/login", "/register", "/forgot-password"];

export type AccessState =
  | { signedIn: false }
  // null when the profile could not be read: onboarding rules are skipped.
  | { signedIn: true; onboardingCompleted: boolean | null };

const matches = (pathname: string, paths: string[]) =>
  paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

const isOpen = (pathname: string) =>
  pathname === LANDING_PATH || matches(pathname, PUBLIC_PATHS);

/** Whether deciding this route for a signed-in user needs profiles.onboarding_completed. */
export function needsOnboardingStatus(pathname: string) {
  return matches(pathname, GUEST_ONLY_PATHS) || !isOpen(pathname);
}

/** Returns the path to redirect to, or null to let the request through. */
export function resolveRedirect(
  pathname: string,
  state: AccessState,
): string | null {
  if (!state.signedIn) return isOpen(pathname) ? null : LOGIN_PATH;

  const { onboardingCompleted } = state;

  if (matches(pathname, GUEST_ONLY_PATHS)) {
    return onboardingCompleted === false ? ONBOARDING_PATH : HOME_PATH;
  }

  if (isOpen(pathname)) return null;

  if (onboardingCompleted === false && !matches(pathname, [ONBOARDING_PATH])) {
    return ONBOARDING_PATH;
  }

  // Only the first step: /onboarding/ready is shown right after completing it.
  if (onboardingCompleted === true && pathname === ONBOARDING_PATH) {
    return HOME_PATH;
  }

  return null;
}
