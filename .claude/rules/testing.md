---
paths:
  - "src/**/*"
  - "vitest.config.mts"
---

# Testing rules

- Vitest for unit tests. Files sit next to the code: `foo.ts` → `foo.test.ts`. Run with `npm test` (never `npx vitest` directly: `scripts/vitest.mjs` fixes a Windows drive-letter bug).
- Test logic that can break silently: routing and access rules, pipeline order, date and time zone maths, Zod schemas, Pro gating and Server Action results.
- Keep that logic in pure functions without I/O (like `src/lib/route-access.ts`) so it can be tested without Supabase. Don't mock Supabase to test queries; those are covered by end-to-end tests (Playwright, task 12).
- Use `it.each` tables for input/output rules. Name tests by behaviour, in English.
- A bug fix comes with a test that fails before the fix.
