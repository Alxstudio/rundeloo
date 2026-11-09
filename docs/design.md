# Design

There is no high-fidelity design in Figma. The low-fi wireframes (Figma file "Rundeloo Design", page Wireframes) are the layout guide; the final look is built directly in code with the tokens below.

## Brand

- Personality: professional and reliable. References: Linear, Stripe, Vercel.
- Logo: three staggered horizontal bars (stages) + lowercase wordmark "rundeloo". Light version on Ink, dark version on White.

## Palette

| Token | Hex |
|---|---|
| Ink | `#0B0C0E` |
| Graphite | `#16181D` |
| Steel | `#2A2E36` |
| Slate | `#5B6270` |
| Mist | `#9AA1AE` |
| Fog | `#D8DBE1` |
| Paper | `#F4F5F7` |
| White | `#FFFFFF` |

## Typography

| Font | Weights | Use |
|---|---|---|
| Unbounded | 500, 700 | Display. **Marketing only** (landing, big headlines). Never inside the app: too wide for dense views |
| Geist | 400, 500, 600 | All app UI and in-app titles |
| Geist Mono | 400, 500 | Labels, statuses, metrics, numbers |

## To define in the design system task (Phase 6, task 4)

- Semantic tokens for shadcn/ui (background, foreground, muted, border, primary…) mapped to the palette, **light and dark** (`profiles.theme`).
- Kanban / status colors for the six `application_status` values. On hold and rejected are visually dimmed.
- Type scale, spacing scale, radii.
- A `locked` state for Pro features: Mist text and icon, lock icon + "Unlock with Pro". **Never color alone** (accessibility).

All of it lives in `src/app/globals.css` (`@theme`). Components use tokens only — no raw hex.

## UI conventions

- **Sentence case** everywhere ("Add company", not "Add Company"), except acronyms (STAR). Section labels in the sidebar style: small caps, 11 px, grey.
- UI copy in English first, translated through `messages/`.
- Pro items are visible but locked for free users; clicking opens the paywall.
- Lists that can grow show a cap and an expander: Kanban 5 cards per column + "Show N more"; calendar 3 events per day + "+N more"; Activity 5–6 events + "View all".
- Columns in detail pages are top-aligned; the side column is sticky.
- Dates follow the user's locale, including the calendar's first day of the week.
- Empty, loading, error and 404 states are designed for every screen, following the existing patterns.
- Responsive: basic, with Tailwind breakpoints. Mobile navigation (bottom bar or hamburger + drawer) is Alex's call.

## shadcn/ui components expected

Button, input, textarea, select, checkbox, tabs, table, card, badge (status pills), dialog (paywall), sheet (create/edit drawer), dropdown menu, popover (alerts), tooltip, avatar, progress, calendar, sonner (toasts), skeleton.
