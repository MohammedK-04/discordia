# Contributing to DSD

**Read [README.md](./README.md) first** — it is the product + architecture source of truth for humans and AI assistants (concepts, UX rules, build order).

## Repository layout

```
src/
  app/              # Next.js routes (thin composition only)
  components/
    shared/         # reusable pieces (Avatar, Sheet, buttons)
    layout/         # app frame (nav, tabs, page wrapper)
  features/         # product modules (+ tests co-located in components/)
  lib/              # cross-feature types, constants, mock data
public/             # static assets
```

See [src/components/README.md](./src/components/README.md) and [src/features/README.md](./src/features/README.md).

## Module boundaries

- **One PR, one feature folder** when possible (`src/features/dashboard`, etc.).
- Use the `@/` alias for imports from `src/`; use relative imports within a feature.
- Features may import `@/components/shared` and `@/lib/*`, but not app layout code.
- Import another feature only through its public `index.ts`; never deep-import its internals. Use shared types in `lib/types` or pass props from the app/layout composition layer.
- Shared-boundary files (`src/app/page.tsx`, `src/components/shared/*`, `src/components/layout/*`, `src/lib/types/*`) should stay small — coordinate before editing.
- Mock data lives in `src/features/<slug>/data/` until real APIs exist.

## How to add a feature module

1. Create a folder under `src/features/<your-feature-slug>/` following [src/features/README.md](./src/features/README.md).
2. Export public components from `index.ts`.
3. Wire the feature into `src/components/layout/AppShell.tsx` or the home feed.
4. Add `*.test.tsx` next to interactive components in the same folder.
5. Open a PR with a short demo note: what it does, who it helps, and how to try it.

## Branch naming

- `feat/<slug>` — new feature module or user-facing slice
- `fix/<slug>` — bug fix
- `chore/<slug>` — tooling, docs, CI

## Validation (run before opening a PR)

```bash
npm run check       # typecheck + tests + production build
```

Formatting is available now. ESLint remains optional until typescript-eslint
supports the project's TypeScript 7 compiler:

```bash
npm run format      # Prettier check
npm run lint        # ESLint via eslint-config-next (currently blocked by TS 7)
```

Or run individually:

```bash
npm run typecheck   # TypeScript
npm run lint        # ESLint
npm run test        # Unit / interaction tests
npm run build       # Production build
```

## PR norms

- One feature (or one focused fix) per PR when possible
- Keep secrets out of the repo (use `.env.local`; see `.env.example`)
- Prefer small, reviewable diffs — this is a friend group, not a product company
- Do not break UX invariants in the README (attendance before roles, casual fast-path, calendar as read model, no standalone Funds tab)
- Follow the [build roadmap](./README.md#10-build-roadmap-jira-ready) unless the task explicitly jumps ahead
