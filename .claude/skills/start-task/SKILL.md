---
name: start-task
description: Start the next Rundeloo task. Reads the roadmap, sets up the feature branch from develop and proposes a plan for Alex to approve.
argument-hint: "[optional task name]"
disable-model-invocation: true
---

# Start a task

1. Read `docs/roadmap.md`. If an argument was given, use that task; otherwise take the first task not marked done. Say which one in one line.
2. Read the docs that task depends on (`docs/architecture.md`, `docs/database.md`, `docs/design.md`, `docs/screens.md`, `docs/decisions.md`), only the relevant parts.
3. Check Git:
   - `git status`: if there are uncommitted changes, stop and ask what to do with them.
   - If on `main` or `develop`: `git switch develop`, `git pull`, then `git switch -c <prefix>/<kebab-name>` (`feat/`, `fix/` or `chore/`). Tell Alex the branch name.
4. Write the plan in Spanish:
   - Goal in one sentence.
   - Steps in execution order, each with the files it touches and why.
   - Dependencies to install, if any, and why.
   - Decisions that need Alex (anything not covered by `docs/decisions.md`), with your recommendation.
   - Anything that would contradict a documented decision, flagged first.
5. **Stop and wait for Alex's OK.** Don't edit files until he approves.
