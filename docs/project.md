# Product

## What Rundeloo is

A web app that organizes the job search of unemployed junior and mid developers. The user describes what they are looking for and the AI builds their workspace: applications board and table, interview prep, companies with their contacts and resources, notes that link themselves, and a dashboard.

- **Target user (v1):** junior or mid developer without a job. Validated with dogfooding and interviews (3 juniors, 1 senior).
- **Languages:** English and Spanish from day one. Product copy is written in English first.
- **Platform:** responsive web app (basic responsive with Tailwind breakpoints). No native app in v1.
- **Target price:** USD 5–9 / month (not final).

## Free vs Pro

| Free — organization | Pro — active AI |
|---|---|
| Dashboard, applications (Kanban + table), application detail | Mock interview simulator |
| Companies, contacts, interviews, interview prep, post-interview log | Study path per application, generated from the job posting |
| Calendar (derived events), alerts | Contact reminders |
| Notes editor with AI link suggestions | Weekly summary with pattern detection |
| Question bank | |
| AI onboarding (builds the workspace) | |

Pro features are **visible to free users**, greyed out with a lock icon and an "Unlock with Pro" label. Clicking opens the paywall modal → Plan and billing. The real gate is on the server (`requirePro()`), never only in the UI.

## In scope for v1

Landing · auth (register, login, forgot/reset password) · AI onboarding · dashboard · applications · companies and contacts · interviews (prep + log) · calendar · alerts (bell dropdown) · notes with auto-linking · question bank · settings · plan and billing (Stripe) · the four Pro features.

## Out of scope for v1

Journaling · export and data portability (v2) · salary offer comparison · native mobile app · external integrations (including Google Calendar sync) · a global contacts screen (contacts only live inside a company).

## Quality bar

This is a portfolio piece for US companies. Code, commits, PRs and UI must read as professional product work: consistent design tokens, accessible components, clear Conventional Commits history.
