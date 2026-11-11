---
paths:
  - "src/components/**/*"
  - "src/app/**/*.tsx"
  - "src/app/globals.css"
  - "src/messages/**/*"
---

# UI rules

- Read `docs/design.md` before building or restyling UI, and the screen's spec in `docs/screens.md`.
- Style only with tokens from `src/app/globals.css`. No hex values, no arbitrary colors like `bg-[#123456]`.
- Use **semantic** utilities (`bg-background`, `text-muted-foreground`, `border-border`, `text-status-offer`, `bg-status-offer-subtle`). The palette utilities (`bg-ink`, `text-slate`…) are for `globals.css` and rare brand moments only.
- Never use the `dark:` variant to swap colors: tokens already switch with the theme. `dark:` is only for adjustments a token can't express.
- A new color, size or radius becomes a token in `globals.css` first, then gets used. Check contrast in both themes: 4.5:1 for text, 3:1 for icons, borders that carry meaning and focus rings.
- Statuses: dot or label in `text-status-<status>`, pill in `bg-status-<status>-subtle`. Always with the translated label, never color alone. On hold and rejected are dimmed in the board, not recolored.
- Radii come from the scale (`rounded-lg` = 6px base). No arbitrary radii, spacing or font sizes (`p-[13px]`, `text-[15px]`); use the Tailwind scale and `text-2xs` for 11px section labels.
- Build variants with `cva` and merge classes with `cn()` from `@/lib/utils`. Never concatenate conditional class strings by hand.
- Add shadcn components with `npx shadcn add <name>` only when a screen needs them. After adding, check imports use `@/lib/utils` (the CLI may emit `from "cn"`, a package we don't use).
- Icons from `lucide-react`. Icon-only buttons need an `aria-label` (translated).
- Fonts: Geist for UI, Geist Mono for labels, statuses and numbers. **Unbounded only in `(marketing)`**.
- Component placement: shadcn → `components/ui/` (generated, don't hand-edit); app shell → `components/layout/`; used by several features → `components/shared/`; everything else → `components/<feature>/`.
- No hardcoded strings: every visible text goes through `src/messages/en.json` and `es.json` (add both keys). Enum values are mapped to labels, never rendered raw.
- Copy in **sentence case**, except acronyms.
- Dates formatted with the user's locale; the calendar's first day of the week follows it.
- Every list or data view has empty, loading and error states.
- Pro features stay visible for free users: lock icon + "Unlock with Pro", `text-locked` (Slate in light, Mist in dark). Never color alone. Clicking opens the paywall.
- Accessible by default: real buttons and links, labels on inputs, visible focus, sufficient contrast in light and dark.
- Responsive with Tailwind breakpoints; no mobile-specific features in v1.
