import { describe, expect, it } from "vitest";

import { safeRedirectPath } from "@/lib/safe-redirect";

describe("safeRedirectPath", () => {
  it.each([
    "/applications?view=board",
    "/companies/123/contacts",
    "/reset-password",
  ])("keeps the internal path %s", (path) => {
    expect(safeRedirectPath(path)).toBe(path);
  });

  it.each([
    ["missing", null],
    ["empty", ""],
    ["absolute URL", "https://evil.com"],
    ["protocol-relative", "//evil.com"],
    ["backslash", "/\\evil.com"],
    ["relative", "dashboard"],
  ])("falls back to /dashboard for a %s value", (_, value) => {
    expect(safeRedirectPath(value)).toBe("/dashboard");
  });

  it("uses the given fallback", () => {
    expect(safeRedirectPath("//evil.com", "/login")).toBe("/login");
  });
});
