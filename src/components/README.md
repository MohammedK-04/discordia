# Components

Code here is **not** a product feature — it is shared building blocks every feature reuses.

## `shared/` — reusable pieces

Small UI parts any screen can import:

| Piece               | What it is                                          |
| ------------------- | --------------------------------------------------- |
| `avatar/`           | Circle initials for people                          |
| `sheet/`            | Bottom slide-up panel (create activity, pick roles) |
| `styles.module.css` | Buttons, cards, inputs used everywhere              |

**Analogy:** Lego bricks — Avatar, Sheet, primary button.

## `layout/` — the app frame

The chrome wrapped around every page:

| File                  | What it is                                                            |
| --------------------- | --------------------------------------------------------------------- |
| `AppShell.tsx`        | Puts it all together; switches Home / Calendar / placeholder tabs     |
| `nav.ts`              | Shared tab names, icons, and badges for desktop and mobile navigation |
| `Sidebar.tsx`         | Desktop left nav                                                      |
| `AppBar.tsx`          | Mobile top bar (logo, search, notifications)                          |
| `TabBar.tsx`          | Mobile bottom tabs + create FAB                                       |
| `PlaceholderView.tsx` | “Coming soon” for Plans / Charity tabs                                |

**Analogy:** The phone bezel and home button — not the apps inside.

---

**Rule of thumb:** If it could appear on multiple unrelated screens → `shared/`. If it is navigation or page structure → `layout/`. If it is a product area (polls, calendar) → `src/features/<name>/`.
