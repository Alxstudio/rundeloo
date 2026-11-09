---
paths:
  - "src/server/**/*"
  - "src/app/api/**/*"
  - "src/app/auth/**/*"
  - "src/lib/supabase/**/*"
  - "src/lib/validations/**/*"
---

# Server rules

- Every file in `src/server/` starts with `import "server-only"`.
- Reads go in `src/server/<feature>/queries.ts`; writes are Server Actions in `src/server/<feature>/actions.ts` with `"use server"`.
- Route Handlers only for: Stripe webhook, cron jobs (check `CRON_SECRET`), AI streaming, auth callback. No tRPC.
- Every action: `requireUser()` → validate input with the Zod schema from `src/lib/validations/` → (Pro only) `requirePro()` → query → `revalidatePath`/`revalidateTag` as needed.
- Return typed results (`{ ok: true, data } | { ok: false, error }`), never throw raw Supabase errors to the client.
- Supabase clients: `server.ts` for user requests (RLS applies), `admin.ts` **only** for the Stripe webhook, cron jobs and `question_bank` writes. Never import `admin.ts` anywhere else.
- Never trust ownership from the client: RLS plus the user's session decide what is visible.
- Changing `applications.status` also updates `status_changed_at` (and inserts into `application_status_history` once it exists).
- AI calls live in `src/server/ai/`. Prompts in `src/server/ai/prompts/`. The model answers in the user's `profiles.language`.
- Use types from `src/types/database.ts`. No `any`.
