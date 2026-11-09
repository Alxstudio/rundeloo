---
name: log-decision
description: Record a binding Rundeloo decision in docs/decisions.md and give Alex a copy ready for the Notion Decision Log.
argument-hint: "<decision in a few words>"
disable-model-invocation: true
---

# Log a decision

1. Check it qualifies: it conditions later development, or forgetting it would cause real damage. If it's already documented elsewhere (task description, brand sheet, another doc), say so and don't log it.
2. Check `docs/decisions.md` for a contradiction. If the new decision replaces an old one, say which and update or remove the old line instead of adding a duplicate.
3. Add one line under the right section of `docs/decisions.md` (Product, Database, Stack and code, Git, Structure and routing), in English, with the date when useful.
4. Reply in Spanish with:
   - **DECISIÓN REGISTRADA EN EL LOG:** the decision in one or two sentences.
   - A block ready to paste into Notion: title, date, context, decision, consequences.
