# Feature modules

Each product area lives under `src/features/<slug>/` and owns its UI, mock data, types, styles, and tests.

## Standard layout

```
src/features/
  <slug>/
    index.ts
    types.ts
    styles.module.css
    components/
      SomeComponent.tsx
      SomeComponent.test.tsx
    data/
```

## Import rules

| Allowed                                  | Not allowed                                   |
| ---------------------------------------- | --------------------------------------------- |
| `@/components/shared`, `@/lib/*`         | `@/components/layout`                         |
| Relative imports within the same feature | Deep imports into another feature's internals |

Use `@/` for imports from `src/`. Cross-feature coordination happens through
public `index.ts` exports, shared types in `lib/types`, or props passed by the
app/layout composition layer.

## Adding a new feature

1. Create `src/features/<your-slug>/` with the layout above.
2. Export public components from `index.ts`.
3. Wire into `src/components/layout/AppShell.tsx` or the home feed.
4. Add `*.test.tsx` beside interactive components.

## Current modules

| Slug         | Status  | Owner surface                       |
| ------------ | ------- | ----------------------------------- |
| `dashboard`  | active  | Home tab                            |
| `activities` | active  | Create activity sheet               |
| `attendance` | active  | Role / RSVP sheet                   |
| `calendar`   | active  | Calendar tab                        |
| `charity`    | planned | App-shell placeholder + home teaser |
| `plans`      | planned | App-shell placeholder               |
