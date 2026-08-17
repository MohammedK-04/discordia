# Contributing to DSD

**Read [README.md](./README.md) first** — it is the product + architecture source of truth for humans and AI assistants (concepts, UX rules, build order).

## How to add a feature module

1. Create a folder under `/features/<your-feature-slug>/`.
2. Add a `manifest.json` with at least:
   - `id`, `name`, `description`
   - `createdBy` (name + optional GitHub handle)
   - `contributors` (array)
   - `status`: `active` | `draft` | `archived`
   - `surfacesOnNoticeBoard`: boolean
3. Export a React component (or page route) the notice board can embed as a card/widget.
4. Wire the feature into the notice board registry (once that file exists).
5. Open a PR with a short demo note: what it does, who it helps, and how to try it.

## Attribution

Every feature should use the shared attribution component so **Created by** / **Last updated by** and a history dropdown stay consistent.

Prefer updating `manifest.json` on meaningful changes. Automatic GitHub blame/history can come later.

## PR norms

- One feature (or one focused fix) per PR when possible
- Keep secrets out of the repo (use `.env.local`; see `.env.example`)
- Prefer small, reviewable diffs — this is a friend group, not a product company
- Do not break UX invariants in the README (attendance before roles, casual fast-path, calendar as read model, no standalone Funds tab)
- Follow the [build roadmap](./README.md#10-build-roadmap-jira-ready) unless the task explicitly jumps ahead
