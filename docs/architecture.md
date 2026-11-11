# Architecture

## Folder structure

```
rundeloo/
├── CLAUDE.md                       → Claude Code instructions (CLAUDE.local.md: personal, gitignored)
├── .claude/                        → settings.json, rules/, skills/, agents/
├── docs/                           → project documentation (this folder)
├── supabase/migrations/            → versioned SQL
├── .env.example                    → variable names, no values
└── src/
    ├── proxy.ts                    → session refresh + route protection (Next.js 16)
    ├── app/
    │   ├── (marketing)/            → landing (Alex designs it); layout without app chrome
    │   ├── (auth)/                 → centered minimal layout, no sidebar
    │   │   ├── login/  register/  forgot-password/  reset-password/
    │   │   └── onboarding/  (+ ready/)
    │   ├── (app)/                  → authenticated app: sidebar + top bar
    │   │   ├── loading.tsx  error.tsx
    │   │   ├── dashboard/
    │   │   ├── applications/  [id]/ (layout + overview, interviews/, study-path/, notes/)
    │   │   ├── companies/     [id]/ (layout + applications, contacts/, notes/)
    │   │   ├── interviews/[id]/ prep/  log/
    │   │   ├── calendar/
    │   │   ├── notes/  (layout with list) [id]/
    │   │   ├── questions/
    │   │   ├── simulator/[id]/
    │   │   ├── weekly-summary/
    │   │   └── settings/  billing/
    │   ├── auth/callback/route.ts  → exchanges the email code for a session
    │   ├── api/
    │   │   ├── webhooks/stripe/
    │   │   ├── cron/weekly-summary/
    │   │   └── simulator/          → AI streaming
    │   ├── layout.tsx  globals.css  not-found.tsx
    ├── components/
    │   ├── ui/                     → shadcn/ui, generated; don't hand-edit
    │   ├── layout/                 → app-sidebar, topbar, bottom-nav, user-menu, alerts-panel
    │   ├── shared/                 → used by several features (empty-state, pro-lock, paywall-dialog, status-badge…)
    │   └── <feature>/              → applications, companies, interviews, calendar, notes, dashboard…
    ├── server/                     → server only; every file starts with `import "server-only"`
    │   ├── auth.ts                 → getUser(), requireUser()
    │   ├── billing.ts              → requirePro() (reads subscriptions.plan)
    │   ├── ai/  claude.ts  embeddings.ts  prompts/
    │   └── <feature>/  queries.ts  actions.ts
    ├── lib/
    │   ├── supabase/  client.ts  server.ts  admin.ts  proxy.ts
    │   ├── validations/            → Zod schemas per feature
    │   ├── constants.ts            → pipeline priority map, questions per simulation (5)…
    │   └── utils.ts                → cn() and helpers
    ├── hooks/
    ├── i18n/
    ├── messages/  en.json  es.json
    └── types/database.ts           → generated from Supabase
```

Placement rule for components: shadcn → `ui/`; app shell → `layout/`; used by several features → `shared/`; everything else → its feature folder. Empty folders hold a `.gitkeep` until their first real file.

## Routing rules

- Route groups only decide **layout**. Protection is done in `proxy.ts`.
- Detail tabs are **nested routes** with the header in the segment's `layout.tsx` (shareable URLs, back button works, alerts can deep-link).
- **Exception:** the notes editor switches tabs with `?tab=write|links` so TipTap is not unmounted.
- View toggles are query params: `/applications?view=board|table`, `/calendar?view=month|week`.
- No route for: create/edit application drawer, alerts panel, paywall modal. They are components.
- URLs are in English regardless of the user's language.

## Data flow

| Need | Tool |
|---|---|
| Read | Server Components → `src/server/<feature>/queries.ts` |
| Create / update / delete | Server Actions → `src/server/<feature>/actions.ts` |
| External endpoints (Stripe webhook, cron, auth callback, AI streaming) | Route Handlers in `src/app/api/` (callback in `app/auth/callback/`) |
| tRPC | Not used |

Every action validates input with Zod (same schema as the form) and checks ownership through RLS. Pro actions call `requirePro()` first.

## Supabase clients

- `client.ts` — browser, publishable key.
- `server.ts` — Server Components, Server Actions and Route Handlers, with the session cookies.
- `admin.ts` — secret key, **bypasses RLS**. Only for: Stripe webhook (`subscriptions`), cron (`weekly_summaries`), `question_bank` writes.
- `proxy.ts` — `updateSession()`, called from `src/proxy.ts`.

## Auth and routing

- Supabase Auth (email + password). Recovery: `/forgot-password` → email → `/auth/callback` → `/reset-password`.
- Not signed in + `(app)` route → `/login`.
- Signed in + `profiles.onboarding_completed = false` → `/onboarding`.
- Signed in + `(auth)` page (except onboarding) → `/dashboard`.
- Onboarding progress per step lives in `localStorage` (v1); completion is stored server-side in `profiles.onboarding_completed`.

## i18n (option B — no locale in the URL)

Locale resolution, highest priority first:

```
profiles.language → cookie → Accept-Language → "en"
```

- Visitors: detected from the browser; a language switcher writes the cookie.
- On sign-up, the current locale is saved to `profiles.language`.
- Signed-in users change it in Settings. It drives the UI, AI responses, date formatting and the calendar's first day of the week.
- User content (notes, companies…) is never translated.
- All UI strings live in `src/messages/{en,es}.json`. Enum values are mapped to labels, never rendered raw (`interview` → "Interviewing").

## AI

- **Provider layer:** every AI feature (onboarding, simulator, study path, weekly summary, link suggestions) calls an interface in `src/server/ai/`, never a vendor SDK directly. The provider is picked by configuration: **Ollama in development**, production provider chosen in Phase 7 (it must be free). Prompts live in `src/server/ai/prompts/`, in English. The model answers in the user's `profiles.language`.
- **Embeddings** of 1024 dimensions stored in `notes.embedding` (pgvector) for auto-linking. Candidate model: Ollama `mxbai-embed-large`. Changing the model or dimension means re-embedding everything.
- The current `claude.ts` and `embeddings.ts` (Claude and Voyage AI) predate this decision and are replaced by the provider layer when the AI features are built (task 11). Their environment variables change then.
- Weekly summary: scheduled job every Monday (Vercel cron in Phase 7) → `/api/cron/weekly-summary`, protected with `CRON_SECRET`.
- Simulator: streamed through a Route Handler. Live feedback is not stored; only the final `feedback_text` and `score`.

## Billing

Stripe Checkout + webhook → writes `subscriptions` with the admin client. `subscriptions.plan` (`free` | `premium`) is the single source of truth for gating.

## Environment variables

| Variable | Exposed to browser |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes |
| `SUPABASE_SECRET_KEY` | No |
| `ANTHROPIC_API_KEY` | No |
| `VOYAGE_API_KEY` | No |
| `STRIPE_SECRET_KEY` | No |
| `STRIPE_WEBHOOK_SECRET` | No |
| `CRON_SECRET` | No |

## Hosting

Vercel (function region in Europe, next to Supabase `eu-central-1`) and Cloudflare for the domain. Set up in Phase 7. The only accepted cost is the domain: confirm before launch that the hosting free tier allows a commercial product with payments, or move to one that does.
