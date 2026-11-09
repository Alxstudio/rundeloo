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
- Fonts: Geist for UI, Geist Mono for labels, statuses and numbers. **Unbounded only in `(marketing)`**.
- Component placement: shadcn → `components/ui/` (generated, don't hand-edit); app shell → `components/layout/`; used by several features → `components/shared/`; everything else → `components/<feature>/`.
- No hardcoded strings: every visible text goes through `src/messages/en.json` and `es.json` (add both keys). Enum values are mapped to labels, never rendered raw.
- Copy in **sentence case**, except acronyms.
- Dates formatted with the user's locale; the calendar's first day of the week follows it.
- Every list or data view has empty, loading and error states.
- Pro features stay visible for free users: lock icon + "Unlock with Pro", Mist color. Never color alone. Clicking opens the paywall.
- Accessible by default: real buttons and links, labels on inputs, visible focus, sufficient contrast in light and dark.
- Responsive with Tailwind breakpoints; no mobile-specific features in v1.
