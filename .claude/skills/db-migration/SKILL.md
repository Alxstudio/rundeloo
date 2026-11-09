---
name: db-migration
description: Write a Supabase SQL migration file for Rundeloo with RLS, grants and triggers. Never applies it to the remote project.
argument-hint: "<what the migration changes>"
disable-model-invocation: true
---

# Write a migration

1. Read `docs/database.md` and `.claude/rules/database.md`.
2. Explain in Spanish what will change and why, and flag any conflict with `docs/decisions.md`. Wait for OK.
3. Create `supabase/migrations/<YYYYMMDDHHMMSS>_<snake_case_name>.sql`:
   - Wrap changes so they're safe to read top to bottom; comment each block in English.
   - New table: RLS enabled, policies (select/insert/update/delete as needed, ownership through `user_id` or the FK chain), `GRANT` to `authenticated` only, `updated_at` trigger, indexes on foreign keys.
   - New column: correct type (`timestamptz` for date-times), nullability, default if needed.
   - Enum change: append values only.
4. **Do not run it** against the remote project. Tell Alex how to apply it (Supabase CLI or SQL editor) and how to verify it with a query.
5. After Alex confirms it's applied: regenerate `src/types/database.ts`, update `docs/database.md` (tables, pending list) and log the decision if it qualifies.
