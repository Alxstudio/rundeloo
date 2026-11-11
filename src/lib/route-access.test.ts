import { describe, expect, it } from "vitest";

import { needsOnboardingStatus, resolveRedirect } from "@/lib/route-access";

const guest = { signedIn: false } as const;
const onboarding = { signedIn: true, onboardingCompleted: false } as const;
const ready = { signedIn: true, onboardingCompleted: true } as const;
const unknown = { signedIn: true, onboardingCompleted: null } as const;

describe("resolveRedirect", () => {
  it.each([
    ["/", null],
    ["/login", null],
    ["/reset-password", null],
    ["/auth/callback", null],
    ["/privacy", null],
    ["/dashboard", "/login"],
    ["/applications/123/notes", "/login"],
    ["/onboarding", "/login"],
    ["/loginx", "/login"],
  ])("guest on %s → %s", (pathname, expected) => {
    expect(resolveRedirect(pathname, guest)).toBe(expected);
  });

  it.each([
    ["/dashboard", "/onboarding"],
    ["/settings/billing", "/onboarding"],
    ["/login", "/onboarding"],
    ["/onboarding", null],
    ["/onboarding/ready", null],
    ["/", null],
    ["/reset-password", null],
  ])("signed in, onboarding pending, on %s → %s", (pathname, expected) => {
    expect(resolveRedirect(pathname, onboarding)).toBe(expected);
  });

  it.each([
    ["/dashboard", null],
    ["/login", "/dashboard"],
    ["/register", "/dashboard"],
    ["/onboarding", "/dashboard"],
    ["/onboarding/ready", null],
  ])("signed in, onboarding done, on %s → %s", (pathname, expected) => {
    expect(resolveRedirect(pathname, ready)).toBe(expected);
  });

  it("lets a signed-in user through when the profile can't be read", () => {
    expect(resolveRedirect("/dashboard", unknown)).toBeNull();
    expect(resolveRedirect("/onboarding", unknown)).toBeNull();
    expect(resolveRedirect("/login", unknown)).toBe("/dashboard");
  });
});

describe("needsOnboardingStatus", () => {
  it.each([
    ["/dashboard", true],
    ["/onboarding", true],
    ["/login", true],
    ["/", false],
    ["/reset-password", false],
    ["/terms", false],
  ])("%s → %s", (pathname, expected) => {
    expect(needsOnboardingStatus(pathname)).toBe(expected);
  });
});
