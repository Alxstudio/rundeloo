---
paths:
  - "supabase/**/*"
  - "src/types/database.ts"
---

# Database rules

- Read `docs/database.md` first.
- Never run SQL against the remote project without Alex's explicit OK. Write migrations as files in `supabase/migrations/`; Alex reviews and applies them.
- Every new table in the same migration: RLS enabled, its policies, manual `GRANT`s to `authenticated` (never to `anon`), `updated_at` trigger.
- Date-times are `timestamptz`. Nullable columns only when the value can genuinely be missing.
- Never reorder or rename enum values; add new values at the end.
- `embedding` stays `vector(1024)` (Voyage AI).
- After a schema change, regenerate `src/types/database.ts` and update `docs/database.md`.
