# Roadmap

Last updated: 2026-11-11.

The project follows an 8-phase methodology. One phase at a time; a phase is not left until it is closed.

| # | Phase | Status |
|---|---|---|
| 1 | From fuzzy idea to real problem | Done |
| 2 | Requirements | Done |
| 3 | Environment setup | Done |
| 4 | Technical design and architecture | Done |
| 5 | Wireframes and visual design | Done (2026-11-04) |
| 6 | **Development** | **In progress** |
| 7 | Production environment | Pending |
| 8 | Feedback, bugs, iteration | Pending (ongoing) |

Target launch (not final): realistic **2026-12-15** · optimistic 2026-11-20 · conservative 2026-12-28.

## Phase 6 — task order

1. ~~Base project: Next.js 16.4, first push to `main`~~ Done.
2. ~~Branching strategy~~ Done (2026-11-04). `develop` is the default branch; rulesets protect `main` and `develop`.
3. ~~Folder structure~~ Done (2026-11-09). Includes `CLAUDE.md`, `docs/` and the Claude Code setup in `.claude/` (rules, skills, hooks, reviewer agent, settings).
4. ~~Design system in code~~ Done (2026-11-11) on `feat/design-system`: shadcn/ui, tokens in `globals.css`, light and dark themes. See `docs/design.md`.
5. **Supabase connection for Next.js 16** — next (`proxy.ts`, three clients). The old A–F steps were written for Next.js 15 and are obsolete.
6. i18n base (option B, no locale in the URL). See `docs/architecture.md`.
7. Migration: version the current schema in `supabase/migrations/` and add `notes.pinned_at`, `applications.deadline`, `application_status_history`. See `docs/database.md`.
8. Authentication and route protection.
9. Core screens from the wireframes (`docs/screens.md`).
10. **Written spec of the AI onboarding — mandatory before coding it.**
11. AI onboarding, notes editor (TipTap), auto-linking, weekly summary, Pro features, Stripe.
12. Manual testing and visual consistency review on the real app.

## Phase 7 — production

Cloudflare domain (.com) · Vercel deploy (EU region, **Production Branch = `main` set explicitly**) · production-ready checklist per feature · Friday release cadence · Vercel cron for the weekly summary · Supabase free plan pauses after 7 days idle: solve before launch.

## Phase 8 — parked items

See "Parked" in `docs/database.md`, plus bug tracking, performance tests, public demo and LinkedIn demo.

## Open items

- AI onboarding spec (steps, questions, what it generates).
- Simulator `score` scale (recommendation: 0–10).
- Reverse image search of the logo (stacked bars are a common motif).
