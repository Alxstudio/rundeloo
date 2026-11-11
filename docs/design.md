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

## Design system (defined 2026-11-11)

All tokens live in `src/app/globals.css`. Components use semantic tokens only — no raw hex. Coding rules are in `.claude/rules/ui.md`.

**Stack:** shadcn/ui (style `radix-nova`, Radix primitives, Lucide icons), `cn()` from `clsx` + `tailwind-merge`, `cva` for variants, `next-themes` for the theme.

**Theme:** follows the OS until the user picks light or dark (`profiles.theme`); the `.dark` class switches every token.

| Semantic token | Light | Dark |
|---|---|---|
| background | White | Ink |
| foreground | Ink | Paper |
| card, popover | White | Graphite |
| primary (+ foreground) | Ink (White) | Paper (Ink) |
| secondary, accent | Paper | Steel |
| muted | Paper | Graphite |
| muted-foreground | Slate | Mist |
| border, input | Fog | Steel |
| ring (focus) | Slate | Slate |
| sidebar | Paper | Graphite |
| locked | Slate | Mist |

**Statuses:** neutral UI with one restrained hue per status. Saved grey, Applied blue, Interviewing violet, Offer green, On hold dimmed grey, Rejected dimmed red. Each has a text/dot token (`status-<status>`) and a 12% tint for pills (`status-<status>-subtle`), tuned per theme to pass 4.5:1. Always shown with the label.

**Shape and density:** compact, Linear-like. Base radius 6px (`rounded-lg`), Tailwind's 4px spacing scale, controls 32px high by default.

**Type:** Geist (`font-sans`) for UI and in-app titles, Geist Mono (`font-mono`) for labels, statuses and numbers, Unbounded (`font-display`) loaded only in `(marketing)`. Tailwind's type scale plus `text-2xs` (11px) for section labels.

**Locked (Pro):** `text-locked` + lock icon + "Unlock with Pro". Never color alone.

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
