import { afterEach, describe, expect, it, vi } from "vitest";

import { requireServerEnv } from "@/server/env";

describe("requireServerEnv", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns the value when the variable is set", () => {
    vi.stubEnv("CRON_SECRET", "test-secret");
    expect(requireServerEnv("CRON_SECRET")).toBe("test-secret");
  });

  it.each([undefined, ""])("throws when the variable is %j", (value) => {
    vi.stubEnv("CRON_SECRET", value);
    expect(() => requireServerEnv("CRON_SECRET")).toThrow(
      "Missing environment variable CRON_SECRET",
    );
  });
});
