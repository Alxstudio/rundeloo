---
name: finish-task
description: Close the current Rundeloo task. Runs lint and build, updates the docs, commits with Conventional Commits and prepares the PR title and description.
disable-model-invocation: true
---

# Finish a task

1. Confirm the current branch is a feature branch (`feat/`, `fix/`, `chore/`). If it's `main` or `develop`, stop.
2. Run `npm run lint` and `npm run build`. If either fails, fix it and explain the cause. Don't continue until both pass.
3. Update the docs in the same branch:
   - `docs/roadmap.md`: mark the task done with today's date and set the next one.
   - Any doc whose content changed (`architecture.md`, `database.md`, `screens.md`, `design.md`).
   - `docs/decisions.md` if the task produced a logged decision.
4. Show `git status` and a short summary of the diff. Ask Alex to confirm before committing.
5. Commit with a Conventional Commit in English (imperative, lowercase), e.g. `feat(kanban): add drag and drop between columns`.
6. Ask whether to push. If yes: `git push -u origin <branch>`.
7. Give Alex, ready to paste:
   - **PR title** (same as the commit message, it becomes the squash commit).
   - **PR description**: what changed, why, how to test it, and any **DECISIÓN REGISTRADA EN EL LOG**.
8. Remind him: PR into `develop`, squash and merge, then `git switch develop && git pull && git branch -d <branch>`.

Never open, approve or merge the PR.
