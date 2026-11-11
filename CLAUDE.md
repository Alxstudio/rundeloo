# Rundeloo

AI-powered workspace that organizes the job search of junior and mid developers: applications (Kanban and table), interview prep, companies and contacts, linked notes and a dashboard. Freemium: free = organization, Pro = active AI.

Owner and developer: Alex Cortell (Alxstudio). Portfolio project aimed at the US market.

## Current state

@docs/roadmap.md

## Where things are

| Topic | File |
|---|---|
| Product, scope, free vs Pro | `docs/project.md` |
| Folder structure, data flow, auth, i18n, AI | `docs/architecture.md` |
| Tables, enums, RLS, pending schema changes | `docs/database.md` |
| Brand, tokens, UI conventions | `docs/design.md` |
| Routes and screen specs | `docs/screens.md` |
| Every decision already taken | `docs/decisions.md` |

Coding rules load automatically from `.claude/rules/` when you touch matching files. Workflows are skills: `/start-task`, `/finish-task`, `/log-decision`, `/new-screen`, `/db-migration`. The `reviewer` subagent checks a branch before the PR. Hooks in `.claude/hooks/` format and lint every edited file and block shell access to `.env` files, commits on `main` or `develop`, and Supabase CLI commands that change the remote project.

`docs/decisions.md` is binding. If a request contradicts it, stop and say so before writing code.

## Commands

```bash
npm run dev     # local dev server (Turbopack)
npm run lint    # ESLint
npm run build   # production build, must pass before every commit
npm test        # Vitest unit tests
npm run format  # Prettier (format:check to verify)
```

## Stack

Next.js 16.4 (App Router, TypeScript, `src/`, Turbopack) · React 19 · Tailwind CSS v4 · shadcn/ui · TipTap · Supabase (Postgres 17 + pgvector, Auth) · AI behind a provider layer (Ollama in development, production provider chosen in Phase 7) · Stripe · Vercel (EU region) · Cloudflare (domain). Goal: zero running cost except the domain.

## How we work

- **Language:** reply to Alex in **Spanish**. Code, comments, commits, PR titles, docs and UI copy in **English**.
- **One task at a time**, in the order of `docs/roadmap.md`. Don't start the next task or "improve" unrelated code.
- **Plan before editing:** for any task bigger than a one-file fix, propose the steps and wait for Alex's OK.
- **Explain every decision** briefly, steps in execution order.
- **Branches:** never commit on `main` or `develop` (both protected). Check the current branch before any change.
- **Push and PRs:** push the feature branch only when asked. Never open, approve or merge PRs. Alex does that.
- **Dependencies:** install only what the current task needs, and say why. No new libraries without asking.
- **Ask first** before: schema changes, anything against the remote Supabase project, deleting files, rewriting Git history, or deviating from a documented decision.
- **Definition of done:** `npm run lint`, `npm test`, `npm run format:check` and `npm run build` pass, docs updated, short summary of what changed.
- **Decision log:** decisions that condition later work or would cause real damage if forgotten are flagged as **DECISIÓN REGISTRADA EN EL LOG** and added to `docs/decisions.md` (use `/log-decision`). Don't log what is documented elsewhere.

## Git conventions

- Branches from `develop`: `feat/`, `fix/`, `chore/` + kebab-case (`feat/kanban-board`).
- Conventional Commits, imperative, lowercase: `feat(kanban): add drag and drop between columns`. Types: feat, fix, chore, refactor, docs, style, test, perf.
- PRs into `develop` are **squash-merged** (PR title = commit message). `develop` → `main` is a **merge commit** on release (Fridays), titled `chore(release): YYYY-MM-DD`. Never squash `develop` into `main`.

## Non-negotiables

- TypeScript strict, no `any`.
- Server Components by default; reads in `src/server/<feature>/queries.ts`, writes in Server Actions. No tRPC.
- Pro gating enforced on the server with `requirePro()`. The locked UI is cosmetic.
- Never `ORDER BY status`: pipeline order comes from `src/lib/constants.ts`.
- No hardcoded UI strings, no raw enum values, no hex colors in components.
- Session and route protection in `src/proxy.ts`. There is no `middleware.ts` in Next.js 16.

## Secrets

Never read, print, commit or copy values from `.env.local`. Only `NEXT_PUBLIC_*` variables may reach the browser. The variable list lives in `.env.example`.
