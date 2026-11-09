# Screens

Specs come from the low-fi wireframes (Figma "Rundeloo Design", page Wireframes, frames numbered as below). Screens marked *no wireframe* are built in code following the existing patterns. Sample data in the wireframes uses "today = Mon, Oct 26".

## App shell (`(app)/layout.tsx`)

- **Sidebar (desktop):** groups Workspace (Dashboard, Applications, Companies, Calendar, Notes) and Prep (Question bank, Weekly summary · Pro), then Pinned notes (max 3), Recent (localStorage) and an Upgrade card at the bottom (Pro users see "Pro plan / Manage plan").
- **Top bar:** breadcrumb, alerts bell with badge, account menu (Settings, Plan and billing).
- **Mobile:** basic responsive; navigation pattern decided by Alex.

## Routes

| # | Screen | Route | Notes |
|---|---|---|---|
| 01 | Landing | `/` | Designed by Alex. No wireframe |
| 02 | Register | `/register` | |
| 03 | Login | `/login` | |
| 04 | Forgot password | `/forgot-password` | |
| — | Reset password | `/reset-password` | Added 2026-11-09. No wireframe |
| 05 | AI onboarding | `/onboarding` | **Needs a written spec first** |
| 06 | Workspace generated | `/onboarding/ready` | No wireframe |
| 07 | Dashboard | `/dashboard` | |
| 08 | Applications · board | `/applications?view=board` | |
| 09 | Applications · table | `/applications?view=table` | |
| 10 | Application detail | `/applications/[id]` + `/interviews`, `/study-path`, `/notes` | |
| 11 | Calendar | `/calendar?view=month\|week` | |
| 12 | Alerts | — | Bell dropdown, not a page |
| 13 | Companies | `/companies` | |
| 14 | Company detail | `/companies/[id]` + `/contacts`, `/notes` | |
| 15 | Interview prep | `/interviews/[id]/prep` | |
| 16 | Post-interview log | `/interviews/[id]/log` | |
| 17 | Question bank | `/questions` | |
| 18 | Notes editor | `/notes/[id]?tab=write\|links` | |
| 19 | Settings | `/settings` | No wireframe |
| 20 | Plan and billing | `/settings/billing` | No wireframe |
| 21 | Mock interview · Pro | `/simulator/[id]` | |
| 22 | Weekly summary · Pro | `/weekly-summary` | |
| M1 | Create/edit application | — | Sheet (drawer) from Applications and Dashboard. No wireframe |
| M2 | Paywall | — | Dialog. No wireframe |

## Specs

**07 · Dashboard.** Five metrics, each "today + this week": Interviews, Follow-ups (`alerts` follow_up), Deadlines (`applications.deadline`), Applied (`applied_at`), Prep tasks (unchecked `checklist_items` by `interviews.scheduled_at`, with a "Next" line). Pipeline with the 6 statuses and global totals. Next interview. Recent applications. Upcoming (7 days). Weekly summary card (locked for free). "+ New application" opens M1.

**08 · Board.** Header with total and Board/Table toggle. Filters: search, Company, Work mode, Date applied. Six columns in funnel order (Saved, Applied, Interviewing, Offer, On hold, Rejected — last two dimmed), never collapsed. Cards: company, role, work mode, age, optional tag (deadline in Saved/Applied, next interview in Interviewing). Max 5 cards per column sorted by `status_changed_at desc`, then "Show N more". "+" on a column opens M1 with that status.

**09 · Table.** Same header and filters plus Status. Columns: Company, Role, Status, Work mode, Applied, Deadline, Next step (derived), actions menu. Sortable headers, 12 rows per page. Default sort "Pipeline stage" (Offer, Interviewing, Applied, Saved, On hold, Rejected; then `status_changed_at desc`) with a visible Sort control.

**10 · Application detail.** Header: role, link to company, status selector, Edit, more actions. Progress bar Saved → Applied → Interviewing → Offer. Tabs: Overview, Interviews, Study path (Pro), Notes. Overview main column: Next interview (Prepare button), Details, Upcoming, Application notes. Side column (sticky): Contacts, Activity (status history, 5–6 events + View all), Study path (locked). Interviews and Notes tabs have no wireframe.
*Study path (Pro):* plan card from `study_paths` (AI tag, "Generated … from the job posting · 2 of 5 done", % and bar), steps with number, title, topic, time, resource link and Done / In progress / To do, "Regenerate plan". Side: Built from (skills detected in the posting + link) and the company's `study_resources`.

**11 · Calendar.** Month navigation, Today, Month/Week toggle. Type filters double as legend: All, Interviews, Deadlines, Follow-ups, Reminders · Pro. Month grid; today circled, selected day outlined, past events dimmed, max 3 per day + "+N more". Side panel: selected day's events (Prepare, View application), prep checklist, "+ Add to this day" → menu Schedule interview / Add follow-up / Set deadline (always tied to an application). Derived events only.

**12 · Alerts panel.** "Mark all as done", tabs Pending/Done, groups Overdue/Today/Upcoming. Each alert: message, linked application, due date, Done, menu with Snooze and Dismiss. Clicking goes to the affected item. Badge = pending alerts overdue or due today.

**13 · Companies.** Table: Company, Industry, Best stage, Location, Apps, Contacts, Last activity (all but name/industry/location are derived). Default sort Best stage. "+ Add company".

**14 · Company detail.** Header: logo, name, website link, industry, location, Edit, more actions (no status selector or progress bar). Tabs: Applications · n, Contacts · n, Notes · n. Main: Applications (role, status, next step), Next interview, Company notes. Side: About (Website, Industry, Location, Added), Contacts, Activity.
*Contacts tab:* list with avatar, role, email, LinkedIn, menu, "Remind · Pro" teaser.
*Reminders (Pro):* per contact, a panel from `contact_reminders` (message, remind_at, Pending/Sent) with "+ Add reminder" and an AI suggestion with "Add".

**15 · Interview prep.** Header: interview type, application link, date, format, countdown ("In 3 days"), "Log interview" (→ 16). Progress "Prep 4/7". Main: Prep checklist (`checklist_items`, AI tag when `generated_by_ai`), Practice questions (`question_bank` of the same type, with difficulty; `hr` → behavioral), Interview notes (`notes.interview_id`). Side: Details, Mock interview (locked, Pro), Resources (`study_resources`).

**16 · Post-interview log.** Header like 15, title "Log interview", no actions. Form: Interview status (Done/Cancelled), Questions they asked, How I answered, What to improve, Update application status, checkbox "Remind me to send a thank-you note tomorrow" (creates a `follow_up` alert). Cancel / Save log. Side: interview details, tip "write it within 24 hours", prep recap.

**17 · Question bank.** Table: Question, Topic, Type, Difficulty, Hint. Expanded row: answer hint, "Add to prep", "Practice with AI · Pro". No "Add question" (read-only table) and no "practiced" state (no table for it).

**18 · Notes editor.** Left list: search, Pinned · n (same as sidebar), All notes (title, excerpt, context, date). Editor: "Linked to" chips (company, application, interview), Pin/Unpin, menu, tabs Write / Suggested links · n, title, TipTap blocks, "Type / for commands".
*Suggested links tab:* short explanation, Suggested (AI tag, target note, reason, quoted sentence, Link / Dismiss), Linked (accepted links, Unlink). Source: `note_links`.

**21 · Mock interview (Pro).** Header "Mock interview" + Pro tag, type, "Based on" (the application), "Question 2 of 5", timer, End session. Chat between "AI interviewer" and the user; answer box with Hint and Send. Side: Session (type, application, progress), Live feedback (not stored), Past sessions with score.

**22 · Weekly summary (Pro).** Header with period (`week_start – week_end`), "Previous week", "Generated Monday 8:00 AM". Main: Your week (`summary_text`), 4 metrics from `metrics_snapshot` (Applied, Responses, Interviews, Offers), Patterns we noticed (`detected_patterns`, AI tag). Side: Next step (`suggested_next_step`) with Start mock interview / Add to prep, Past summaries.

**Shared states:** empty, loading (`loading.tsx`, skeletons), error (`error.tsx`), 404 (`not-found.tsx`).
