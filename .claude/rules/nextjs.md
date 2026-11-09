---
paths:
  - "src/app/**/*"
  - "src/proxy.ts"
  - "next.config.ts"
---

# Next.js 16 rules

- If `AGENTS.md` or bundled docs in `node_modules/next/dist/docs/` exist, prefer them over memory: Next.js 16 changed several APIs.
- `params` and `searchParams` are async: `await` them in pages, layouts and route handlers.
- Check `next.config.ts` for `cacheComponents`. If enabled, request-time data (cookies, headers, Supabase session) must follow its rules.
- Route groups only decide layout: `(marketing)`, `(auth)`, `(app)`. Protection happens in `src/proxy.ts`.
- Detail tabs are nested routes with the header in the segment `layout.tsx`. Exception: the notes editor uses `?tab=write|links`.
- View toggles are query params (`?view=board|table`, `?view=month|week`).
- Drawer, paywall and alerts panel are components, never routes.
- Every route segment in `(app)` relies on the shared `loading.tsx` and `error.tsx` unless it needs its own.
- URLs are English and never contain the locale.
- Server Components by default. Add `"use client"` only for state, effects, browser APIs, TipTap or drag and drop, and keep client components as small leaves.
