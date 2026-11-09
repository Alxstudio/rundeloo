# Decision log

Binding decisions. Mirror of the Decision Log in Notion. Newest phase last. If a task needs to change one of these, stop and ask Alex first.

## Product

- Two entities, **Company 1:N Application**.
- Freemium: free = organization, Pro = active AI. Pro features are **visible but locked** for free users and open a paywall; the real gate is on the server.
- App is **bilingual (English and Spanish)** with i18n from day one.
- **Landing in v1**, in the same repo as the app.
- **No global contacts screen**: contacts live inside each company.
- **Calendar has no events of its own**: only derived from interviews, deadlines, alerts and (Pro) contact reminders. No Google Calendar sync in v1.
- **Alerts are a bell dropdown**, not a page. Snooze updates `due_at`; dismiss sets `status = dismissed`.
- **Pinned notes in the sidebar**, max 3, ordered by `notes.pinned_at`.
- **Onboarding:** completion flag in `profiles.onboarding_completed`; step progress in `localStorage` (v1). Login with onboarding incomplete → back to onboarding. **A written spec is mandatory before coding it.**
- Responsive web only (basic). No native app in v1.
- Figma work ended 2026-11-04: the design system and high fidelity are built in code.

## Database

- Supabase in **Europe** (`eu-central-1`).
- "Automatically expose new tables" **off**; manual `GRANT`s; `anon` has no table access.
- Date-times are **`timestamptz`**.
- Only `companies`, `notes` and user-level Pro tables carry `user_id`; others resolve ownership through foreign keys.
- `subscriptions`, `weekly_summaries`, `question_bank` are **read-only for the client**.
- Free/Pro limits enforced in the **server layer**, not the database.
- `embedding` is **`vector(1024)` (Voyage AI)**. Changing it means re-embedding everything.
- `on delete cascade` in the business chain, `set null` for note anchors and simulations.
- **Pipeline order needs an explicit priority map** (offer, interview, applied, saved, on_hold, rejected). Never `ORDER BY status`: it silently sorts by enum creation order.
- New columns: `notes.pinned_at timestamptz` and `applications.deadline date` (both nullable). `application_status_history` to be added before launch.

## Stack and code

- **Next.js 16.4** (App Router, TypeScript, `src/`, Turbopack). Session and route protection in **`src/proxy.ts`** (not `middleware.ts`).
- Tailwind CSS v4 with tokens in `globals.css` (`@theme`); shadcn/ui; TipTap.
- **Reads in Server Components, writes in Server Actions, Route Handlers only for webhooks, cron, AI streaming and the auth callback. No tRPC.** (Narrows the earlier "API Routes or tRPC".)
- Server-only code in `src/server/` with `import "server-only"`. Three Supabase clients; the admin client only for the Stripe webhook, cron and `question_bank`.
- Zod validation shared by client and server.
- Schema changes as versioned migrations in `supabase/migrations/`.
- In Vercel, pin the function region to Europe.

## Git

- `main` (production) and `develop` (integration, **default branch** on GitHub). Branches `feat/`, `fix/`, `chore/` from `develop`.
- **Squash merge into `develop`; merge commit from `develop` into `main`** (never squash into `main`). Releases on Fridays.
- Rulesets on both branches: PR required with 0 approvals, no force push, no deletion. Bypass list empty.
- Conventional Commits in English.
- **In Vercel (Phase 7), set `main` as Production Branch explicitly**, or it would deploy `develop`.

## Claude Code tooling (2026-11-09)

- Claude Code has **read-only access to Supabase and Figma** in this repo; write tools are denied in `.claude/settings.json`. It cannot run SQL against the remote project, so it sees the schema but not row data.
- **Only Alex runs migrations and remote changes.** Claude prepares the file in `supabase/migrations/`.
- All Claude Code configuration lives in `.claude/`, with `CLAUDE.md` at the repo root.

## Structure and routing (2026-11-09)

- Three route groups: `(marketing)` landing, `(auth)` login/register/forgot/reset/onboarding (no sidebar), `(app)` authenticated app.
- New screen **`/reset-password`**, required by the Supabase recovery flow.
- Detail tabs are **nested routes**, header in `layout.tsx`. Exception: notes editor uses `?tab=` to keep TipTap mounted.
- View toggles are query params (`?view=board|table`, `?view=month|week`).
- Components organized by feature.
- **i18n without locale in the URL (option B).** Priority: `profiles.language` → cookie → `Accept-Language` → English. Changed in Settings. Drives UI, AI responses, date formats and first day of the week. User content is never translated.
