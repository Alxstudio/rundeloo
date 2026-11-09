---
name: new-screen
description: Build a Rundeloo screen from its wireframe spec in docs/screens.md, following the design tokens, i18n and data-flow conventions.
argument-hint: "<screen number or route, e.g. 08 or /applications>"
disable-model-invocation: true
---

# Build a screen

1. Find the screen in `docs/screens.md` (by number or route). If it says *no wireframe*, propose a layout based on the closest existing screen and wait for OK.
2. Read the related tables and gotchas in `docs/database.md` and the conventions in `docs/design.md`.
3. Propose the breakdown before coding:
   - Route files (`page.tsx`, `layout.tsx`, tabs).
   - Components and where each lives (`components/<feature>/`, `shared/`, `ui/`).
   - Which are Server vs Client Components, and why.
   - Queries and Server Actions needed in `src/server/<feature>/`.
   - Zod schemas in `src/lib/validations/`.
   - New i18n keys.
   - shadcn/ui components to add, if any.
   Wait for Alex's OK.
4. Build it with: tokens only, every string in `en.json` and `es.json`, sentence case, empty/loading/error states, Pro items locked with `requirePro()` on the server.
5. If the data layer isn't ready yet (Supabase not connected), use typed mock data based on `src/types/database.ts` or the enums in `docs/database.md`, isolated in one file so it's easy to replace. Say so clearly.
6. Run `npm run lint` and `npm run build`. Summarize what's done and what's left (for example, tabs without a wireframe).
