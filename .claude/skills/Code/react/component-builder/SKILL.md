---
name: component-builder
description: Builds a React component from a description, design spec, or requirements.
  Use when creating new UI components, implementing layouts, or scaffolding component
  structure. Follows team conventions for naming, file structure, and component-lib usage.
invocation: auto
---

## Referenced Skills

Consult these skills throughout implementation:

- **`Code/react/vercel-react-best-practices`** — apply performance rules (re-render, bundle, async, server) when writing components
- **`Design/react/vercel-react-view-transitions`** — use `<ViewTransition>` patterns when the component involves navigation, list reorder, or enter/exit animations
- **`Design/shared/web-design-guidelines`** — check generated UI against Web Interface Guidelines before finalizing

## Instructions

1. Read `.claude/config.md` — use stack, styling, component-lib, lang, test-runner values
2. Run `agents/shared/explore/` on the target file or nearest sibling component

<!-- TODO: Define team naming convention (PascalCase default, any prefixes/suffixes?) -->
<!-- TODO: Define co-location rules — test file, stories file, types file in same folder? -->
<!-- TODO: Specify if Storybook is in use and if a story should be generated -->

3. Determine component category:
   - **Primitive** — wraps a single HTML element or component-lib primitive
   - **Composite** — composes multiple primitives into a pattern
   - **Feature** — owns business logic, data fetching, or complex state
   - **Page** — top-level route component

4. Build the component:
   - TypeScript `interface Props` with JSDoc for each prop
   - Named export (not default export unless page-level route)
   - Use component-lib primitives (shadcn/ui by default) before building from scratch
   - Tailwind utility classes — no inline styles
   - Apply `forwardRef` if the component wraps a DOM element
   - Compound component pattern for components with multiple named sub-parts

5. State management:
   - Feature-level state: `useState` / `useReducer` (or Zustand slice if project uses it)
   - Server state: React Query (`useQuery` / `useMutation`)
   - Form state: React Hook Form

   <!-- TODO: Confirm state libraries in use for this project -->

6. Write co-located test file:
   - Test id via `data-testid` (not class selectors)
   - Cover: renders without crash, key interactions, edge cases (empty, loading, error)
   - Use testing-library queries that reflect accessibility (`getByRole`, `getByLabelText`)

7. Export from the nearest `index.ts` barrel

## Output format

```
ComponentName/
  ComponentName.tsx        — component
  ComponentName.test.tsx   — tests
  index.ts                 — barrel (if new folder)
```

Provide each file as a separate code block.
Note any component-lib primitives used and why, and any deviations from conventions.
