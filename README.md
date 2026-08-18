# DSD — Friend Group Hub

> **GitHub repo:** [MohammedK-04/discordia](https://github.com/MohammedK-04/discordia) (project codename _Discordia_; product / brand is **DSD**).

> **For humans and AI assistants:** Read this file fully before changing code, opening PRs, or planning work. It is the source of truth for product intent, architecture, UX rules, and build order. Prefer following the roadmap over inventing parallel systems.

An **invite-only, open-source website** for the DSD friend group. Anyone in the group can branch, add a feature, and open a PR. Someone volunteers to keep Vercel deploys healthy — that is a maintainer role, **not** an owner or dictator.

**License:** MIT  
**Primary platform:** Mobile (phone-first UI; desktop is secondary)  
**Current status:** Frontend visual prototype (mocked data). Backend, auth, and payments are not wired yet.

---

## Table of contents

1. [What this project is](#1-what-this-project-is)
2. [What this project is not](#2-what-this-project-is-not)
3. [Core product concepts](#3-core-product-concepts)
4. [UX rules (do not break these)](#4-ux-rules-do-not-break-these)
5. [Stack](#5-stack)
6. [Repo layout](#6-repo-layout)
7. [Domain model (target)](#7-domain-model-target)
8. [What exists today](#8-what-exists-today)
9. [Running locally](#9-running-locally)
10. [Build roadmap (Jira-ready)](#10-build-roadmap-jira-ready)
11. [Epics for the board](#11-epics-for-the-board)
12. [Contributing](#12-contributing)
13. [Attribution](#13-attribution)
14. [Environment & secrets](#14-environment--secrets)
15. [Hints for AI coding agents](#15-hints-for-ai-coding-agents)
16. [Related docs](#16-related-docs)

---

## 1. What this project is

DSD is the group’s **shared operating system** for coordination:

| Need                         | How DSD handles it                                         |
| ---------------------------- | ---------------------------------------------------------- |
| Broadcast plans              | Home notice board / feed                                   |
| Find a time / decide quickly | Quick polls (“Decide today”)                               |
| Recurring rituals            | Recurring activities (e.g. Thursday soccer)                |
| Big trips                    | Planned activities with roles, deadlines, optional funding |
| Show up or not               | **Attendance (yes/no) before roles**                       |
| Shared money for trips       | Activity-attached funding (Stripe later)                   |
| Monthly giving               | Sadaqa / charity board (later)                             |
| Remember what’s coming       | Calendar synced to real activities                         |
| Credit builders              | Visible attribution on every feature module                |

The homepage is a **notice / announcement board**, not a single-purpose tool. Think: “wedding coming up,” “soccer Sunday,” plus widgets from active modules (open polls, role gaps, charity teaser).

---

## 2. What this project is not

- Not a public social network or discovery product
- Not a full replacement for WhatsApp / iMessage / Discord (notifications should meet people in chat later)
- Not a generic SaaS — ship thin, friend-group-sized features
- Not a place for unauthenticated browsing of member data
- Not “priority” as one vague slider — use **kind** + **attention** (see below)

---

## 3. Core product concepts

### Activity kind (what kind of plan)

| Kind          | Meaning                                    | Create path                                 |
| ------------- | ------------------------------------------ | ------------------------------------------- |
| **Casual**    | Light hangout                              | **One step** — post in seconds              |
| **Recurring** | Regular rhythm (soccer Thursdays)          | Details + recurrence                        |
| **Planned**   | Needs coordination (camping, out-of-state) | Details + optional roles + optional funding |

### Attention (how urgent)

| Attention           | Meaning                                           |
| ------------------- | ------------------------------------------------- |
| **Whenever**        | Quiet; no reminders                               |
| **Respond soon**    | Nudge before deadline                             |
| **Action required** | Pinned / prominent; reminders until people answer |

### Attendance vs roles

1. Ask **Will you attend?** → **Yes** or **No**
2. Only if **Yes** → show roles (drivers, cooks, etc.), waitlist, maybe + decide-by date
3. If **No** → do not ask for roles or trip contributions

### Funding vs charity

- **Trip / activity funding** — attached to a planned activity (cabin, gas, gear)
- **Charity / Sadaqa** — separate monthly pool + nominate/pick recipient
- Do **not** mix these pots in the same ledger without clear `type` metadata

### Access

- **Invite-only.** No invite → no account.
- Members can invite people they trust (links expire / can be revoked).

---

## 4. UX rules (do not break these)

1. **Mobile-first** — thumb reach, 48px+ targets, bottom tab bar, bottom sheets for create / RSVP / roles.
2. **Casual = fast** — if kind is Casual, skip the heavy setup wizard.
3. **Attendance before roles** — never jump straight to “pick a role.”
4. **Calendar is a read model** — activities are the source of truth; calendar must not become a second write path.
5. **Brand mark** — use the crew mark (`public/dsd-crew.svg`), not a letter-on-black placeholder.
6. **No standalone Funds tab** — funding lives on activities; Charity is its own section. Nav: Home · Plans · Calendar · Charity (+ create FAB).
7. **Attribution by default** — every feature module should show who built/updated it (when that component exists).
8. **Mock UI first was intentional** — when adding backend, preserve the flows already prototyped in `src/app/page.tsx`.

---

## 5. Stack

| Layer     | Choice                                                   |
| --------- | -------------------------------------------------------- |
| App       | **Next.js** (App Router)                                 |
| Host      | **Vercel**                                               |
| DB / Auth | **Supabase** (Postgres + Auth + RLS)                     |
| Payments  | **Stripe** (trip pots + charity; keep metadata separate) |
| Email     | Resend / Postmark / similar (transactional)              |
| Language  | TypeScript                                               |
| License   | MIT                                                      |

Planned later (not blockers for v1): Discord/SMS webhooks, GitHub API for auto-attribution.

---

## 6. Repo layout

```
DSD/
├── src/
│   ├── app/             # Next.js routes; keep route files thin
│   ├── components/
│   │   ├── layout/      # App frame, navigation, and composition
│   │   └── shared/      # Reusable, domain-neutral UI
│   ├── features/        # Product modules with co-located data and tests
│   └── lib/             # Cross-feature types, constants, and mock data
├── public/
│   └── dsd-crew.svg     # Canonical brand mark
├── docs/                # Backlog & opportunity notes
├── CONTRIBUTING.md
├── AGENTS.md            # Next.js agent notes (auto-maintained by next dev)
└── README.md            # ← you are here
```

Feature modules use this intentionally small shape:

```
src/features/
  <slug>/
    index.ts             # public exports
    components/          # UI and co-located tests
    data/                # feature-owned mock data
    types.ts             # feature-owned types, when needed
    styles.module.css
```

Import through `@/` aliases. Production code should import another feature through
its public `index.ts`, not its internal folders. Manifests and automatic feature
attribution are roadmap items, not part of the current architecture.

---

## 7. Domain model (target)

Suggested tables (names can evolve; concepts should not):

| Table                                          | Purpose                                                   |
| ---------------------------------------------- | --------------------------------------------------------- |
| `profiles`                                     | Member identity (linked to auth user)                     |
| `invites`                                      | Token, invited_by, expires_at, used_at                    |
| `activities`                                   | kind, attention, title, time/place, recurrence, organizer |
| `activity_rsvps`                               | user + activity → yes \| no \| maybe                      |
| `activity_roles`                               | role name, seats needed                                   |
| `role_claims`                                  | claimed \| waitlist \| maybe + decide_by                  |
| `polls` / `poll_options` / `poll_votes`        | Quick decisions                                           |
| `funds` / `fund_contributions`                 | Activity-attached money                                   |
| `charity_cycles` / nominations / contributions | Sadaqa board                                              |
| `notifications`                                | Outbound email/log                                        |

**Invariant:** Role claims only make sense when RSVP is `yes` (enforce in UI and, ideally, DB).

---

## 8. What exists today

Implemented as **UI-only** (no Supabase/Stripe yet):

- Mobile shell: app bar, bottom tabs, create FAB
- Home feed: attention banner, quick polls, activity cards, charity teaser, invite row
- Create activity sheet: kind + attention; Casual posts in one step; Planned/Recurring get details + roles/funding toggles
- Planned flow: **Are you coming?** then roles / waitlist / maybe
- Calendar month view + agenda with dummy August/September 2026 data
- Modular UI under `src/features/`, `src/components/`, and `src/lib/`

**Not implemented:** real auth, invites, persistence, Stripe, email.

---

## 9. Running locally

```bash
cd path/to/discordia
nvm use            # Node 22 (or use your preferred Node version manager)
npm install
npm run dev
```

Open the URL Next prints (often `http://localhost:3000` or `3001` if 3000 is taken).

```bash
npm run check   # typecheck, tests, and production build
npm run format  # formatting check
npm run lint    # ESLint (once its parser supports TypeScript 7)
```

---

## 10. Build roadmap (Jira-ready)

Work **top → bottom**. Do not start charity or Stripe before auth, activities, and calendar sync exist.

### Epic 0 — Platform

#### Task 1 — Repo & hygiene

Clean README, MIT, `.env.example`, contribution guide, and agree on the `src/features/` convention.

**Hint:** Stabilize structure before auth so PRs don’t thrash layout.

#### Task 2 — Create Supabase project

Create a **dev** Supabase project; save URL, anon key, service role.  
**Hint:** Service role never ships to the browser. Enable Email auth; turn on RLS early.

#### Task 3 — Database schema (v1)

Create tables listed in [Domain model](#7-domain-model-target).  
**Hint:** Store `kind` + `attention` on activities; separate `activity_rsvps` from `role_claims`.

#### Task 4 — Next.js ↔ Supabase

Wire `@supabase/ssr` (or current recommended helper), server + browser clients, Vercel env vars.  
**Hint:** Cookie sessions so Server Components / Route Handlers can read the user.

#### Task 5 — Auth UI

Sign up / sign in / sign out; protect app routes.  
**Hint:** Magic link or email+password first; OAuth optional. After login → home feed.

#### Task 6 — Invite-only membership

Members create invite links; accept flow creates `profiles`; expire/revoke.  
**Hint:** Seed first admin via SQL. Fields: `invited_by`, optional email, `token`, `expires_at`, `used_at`.

#### Task 7 — Profiles & roster

Display name, avatar, member list for role assignment.  
**Hint:** Auto-create `profiles` on first login (trigger). Brand photo ≠ every user’s avatar.

#### Task 8 — Light permissions

`member` vs `organizer` (who can create money requests / planned funding).  
**Hint:** Don’t overbuild RBAC. Start: anyone creates casual + polls; organizers create funded planned trips + charity cycles.

---

### Epic 1 — Activities

#### Task 9 — Casual activities (fast path)

One-step create → feed; RSVP yes/no.  
**Hint:** No roles/funding step. Use these to prove calendar sync early.

#### Task 10 — Recurring activities

Create series (e.g. Thursday soccer); generate upcoming instances.  
**Hint:** Pre-creating N instances is easier for per-date RSVPs than expanding RRULEs on every read.

#### Task 11 — Planned activities

Create with date/place, attention, roles (# needed), optional funding flag.  
**Hint:** Wizard: kind + attention → details → roles/funding. Persist before “posted.”

#### Task 12 — Attendance before roles

Yes/No first; No skips roles & trip funding prompts.  
**Hint:** Enforce in UI and DB. Footer disabled until attendance chosen.

#### Task 13 — Roles, waitlist, maybe

Claim, waitlist, maybe + `decide_by`; organizer can lock roles.  
**Hint:** Statuses: `claimed | waitlist | maybe`. Email when `decide_by` hits (depends on Task 17).

---

### Epic 2 — Polls & feed

#### Task 14 — Quick decisions / polls

Create, vote, live tallies, close by time; show on home.  
**Hint:** Unique vote per `(poll_id, user_id)`. Optional `activity_id` link.

#### Task 15 — Home notice board

Attention queue, open polls, upcoming activities, charity teaser.  
**Hint:** “Needs you” = unanswered RSVPs, open polls, unfilled roles (if yes), unpaid required funds.

---

### Epic 3 — Calendar

#### Task 16 — Calendar synced to activities

Month + agenda from real `activities` (optional charity deadlines).  
**Hint:** **Read-only view** over activities. One write path only.

---

### Epic 4 — Notifications

#### Task 17 — Transactional email

Invites, new poll, RSVP reminders, role lock, maybe deadline (“it’s 5pm — decide”), payment requests.  
**Hint:** Resend/Postmark + API route or cron. Log rows in `notifications`. Discord/SMS later.

---

### Epic 5 — Payments

#### Task 18 — Trip / activity funding (Stripe)

Fund on planned activity; goal and/or required per person; Checkout; mark paid.  
**Hint:** Store Stripe session / payment intent ids. **Do not** mix with charity pots — use metadata `type: trip_fund`.

---

### Epic 6 — Charity (last product epic)

#### Task 19 — Sadaqa / charity board

Monthly cycle, nominate, pick recipient, contribute via Stripe (or dedicated account), progress UI.  
**Hint:** Ship board UI + tracking before perfect payouts. Metadata `type: charity`. Can start with manual “received” flags.

---

### Epic 7 — Attribution & launch

#### Task 20 — Attribution component

Created by / Last updated / expandable changelog per feature (`manifest.json` v1).  
**Hint:** Hand-maintained manifests beat GitHub API for v1.

#### Task 21 — Hardening & ship

RLS audit, staging, seed script, E2E happy paths, Vercel prod, maintainer runbook.  
**Hint:** E2E: invite → login → casual → RSVP → poll → planned + role → calendar → trip pay → charity give.

---

### First sprint suggestion

`2 → 5 → 6 → 9 → 12 (casual RSVP) → 16 (read-only calendar) → 14`

Leave **18** and **19** until people actually use RSVPs and polls.

---

## 11. Epics for the board

| Epic                 | Tasks |
| -------------------- | ----- |
| Platform             | 1–8   |
| Activities           | 9–13  |
| Polls & feed         | 14–15 |
| Calendar             | 16    |
| Notifications        | 17    |
| Payments             | 18    |
| Charity              | 19    |
| Attribution & launch | 20–21 |

---

## 12. Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

Summary:

1. Branch from `main`
2. One focused change per PR
3. New modules under `src/features/<slug>/`, exported through `index.ts`
4. No secrets in git
5. Prefer small diffs — friend group, not a product company

---

## 13. Attribution

Every feature module should eventually show:

- **Created by**
- **Last updated by**
- Expandable history / changelog

v1: hand-maintained `manifest.json`. Later: optional GitHub blame/API.

---

## 14. Environment & secrets

Create `.env.local` (never commit):

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # server only

# Later
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
EMAIL_API_KEY=
```

Copy the committed `.env.example` to `.env.local` and fill only the values needed
for your current task.

---

## 15. Hints for AI coding agents

When working in this repo:

1. **Read this README** and the current UI in `src/app/page.tsx` / `src/app/globals.css` before redesigning flows.
2. **Preserve** attendance-before-roles, casual fast-path, mobile bottom nav, and calendar-as-read-model.
3. **Follow the roadmap order** — do not implement Stripe/charity before Supabase auth + activities unless the user explicitly asks.
4. This Next.js version may differ from training data — check `node_modules/next/dist/docs/` and heed `AGENTS.md`.
5. Prefer extending the prototype into real data over throwing away the UX.
6. Do not invent a public marketing site; this is invite-only for a friend group.
7. Do not reintroduce a standalone **Funds** top-level tab; funding is activity-scoped.
8. Keep copy and UI mobile-legible (avoid tiny 8–10px labels).

---

## 16. Related docs

- [CONTRIBUTING.md](./CONTRIBUTING.md) — how to add a feature module
- [docs/FEATURE_BACKLOG.md](./docs/FEATURE_BACKLOG.md) — module backlog brainstorm
- [docs/FRIEND_GROUP_OPPORTUNITIES.md](./docs/FRIEND_GROUP_OPPORTUNITIES.md) — earlier opportunity analysis

---

## Open questions for the group

Answer these when product decisions get stuck:

1. Primary chat app for notifications (iMessage / WhatsApp / Discord)?
2. Soccer vs trips — which ritual matters more for v1 polish?
3. Comfort with real names/photos even invite-only?
4. Venmo links vs real Stripe checkout for v1 trip funds?
5. Sadaqa nominations public inside the group or anonymous?

---

**Maintainer note:** Whoever runs Vercel/Supabase/Stripe holds keys and deploys — they facilitate. Product direction stays collaborative via PRs.
