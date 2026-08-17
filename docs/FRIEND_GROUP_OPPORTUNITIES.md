# What else fits a DSD friend-group hub?

This note expands the original brief. Goal: keep the site as the **group’s shared operating system** — coordination, memory, and fairness — without trying to replace WhatsApp/iMessage/Discord.

## What the brief already nails

| Need | Module |
| --- | --- |
| Broadcast plans | Notice board |
| Find a time | I Want to Meet |
| Split costs | Payments (+ later ledger) |
| Shared giving | Sadaqa |
| Credit builders | Attribution |

Those cover **announce → decide → pay → give**. The gaps below are the other loops friend groups actually live in.

---

## High-value additions (most likely to get used)

### 1. Shared calendar + RSVPs
One place for weddings, soccer, birthdays, trips. Notice board pins link here; modules can push events automatically (“poll closed → event created”).

**Why:** Chat scrolls; a calendar does not. Reduces “wait when was that again?”

### 2. Carpool / rides board
Who’s driving, seats left, pickup points, who’s taking the train.

**Why:** Soccer and trips fail more on logistics than interest.

### 3. Gear locker
Inventory of shared or borrowable stuff: soccer ball, cones, tent, cooler, speakers, projector. Checkout / return status optional.

**Why:** Stops the same “who has the ball?” thread every week.

### 4. Lightweight member directory
Photo, preferred name, city/area, dietary notes, emergency contact (optional, private), skills (“I can grill / DJ / translate”).

**Why:** New hangouts and new friends join; a roster beats tribal knowledge.

### 5. Quick decisions (not scheduling)
Polls for *what*, not *when*: restaurant, movie, jersey color, campground.

**Why:** Distinct from When2meet; chat reactions don’t scale past ~8 people.

### 6. Birthdays & milestones
Auto-surface on the notice board: birthdays, anniversaries, graduations, new jobs. Optional “gift pool” that links into Payments.

**Why:** Low effort, high warmth — perfect notice-board content.

### 7. Soccer / sports hub
Season standings (casual), lineup, MVP of the week, field bookings, weather note, “need N more players.”

**Why:** If soccer is a ritual, it deserves a home — not only ad-hoc polls.

### 8. Trip planner
Itinerary, packing list with assignees, roles (driver, cook, photographer), budget target wired to Payments.

**Why:** Camping/trips are where payments + polls + gear collide.

---

## Medium-value / “nice when someone builds it”

### 9. Memory wall / photo dump
Event albums with captions; “on this day” resurfacing. Start with upload + tags; AI captions later if anyone cares.

### 10. Recommendations board
Food spots, barbers, clinics, apartments, halal finds, hiking trails — upvote / comments.

### 11. Recipe & cookout share
Who’s bringing what; dietary tags; “Khaled’s marinade” living recipes.

### 12. “Who’s free tonight?” ephemeral status
24-hour availability chips. Complements polls for spontaneous hangs.

### 13. Host rotation / fairness tracker
Who hosted last, who drove last, who paid the deposit — soft accountability without drama.

### 14. Idea inbox
Anyone submits module ideas; group votes what to build next. Fits the open-source culture.

### 15. Prayer / community helpers (if the group wants them)
Jummah meetup spots, taraweeh carpool, Ramadan iftar board — only if it matches DSD’s culture; keep optional modules.

### 16. Language / culture corner
Shared phrases, inside jokes glossary, wedding dua / speech drafts — lightweight wiki pages.

---

## Platform glue (not “features” but unlockers)

These make modules useful instead of abandoned:

| Capability | Why it matters |
| --- | --- |
| **Invite-only auth** | Trust for money, sadaqa, photos |
| **Notifications** | Discord/email when a poll or payment drops — otherwise people never check the site |
| **Roles** | Anyone can suggest; only some can create money requests |
| **Deep links** | One tap from group chat into the right poll/event |
| **Mobile-first UI** | Friend groups live on phones |
| **Offline-friendly reads** | Calendar + announcements still useful on flaky data |
| **Export** | CSV of expenses / sadaqa history for transparency |

---

## Design principles for new modules

1. **Solve a chat failure** — if WhatsApp already handles it well, skip it.
2. **Surface on the notice board** — or it will die.
3. **Attribution by default** — credit the builder.
4. **Opt-in privacy** — money, charity recipients, and personal contacts need care.
5. **Ship thin** — a Google Form–level v1 beats a half-finished SaaS clone.
6. **Compose, don’t silo** — polls create events; events create payment pots; trips use gear + rides.

---

## Suggested priority after V1 core

1. Calendar + RSVPs (feeds the notice board)
2. Notifications into the group chat channel you already use
3. Quick decisions + carpool (high frequency)
4. Gear locker + birthday reminders (high delight / low complexity)
5. Sports hub or trip planner (pick based on what DSD does more)
6. Memories + recommendations (once people already visit weekly)

---

## Open questions for the group

- What’s the primary chat (iMessage / WhatsApp / Discord / GroupMe)? Notifications should meet people there.
- Is soccer the main recurring ritual, or weddings/trips?
- Comfort level with real names + photos online (even invite-only)?
- Who is okay handling Stripe/Venmo links vs. just tracking “paid / not paid”?
- Should sadaqa nominations be public inside the group or anonymous?

Answer those, and the next 3 modules almost pick themselves.
