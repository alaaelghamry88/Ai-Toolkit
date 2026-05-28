---
name: figma-to-jsx
description: Converts a Figma design spec or screenshot into a production-ready React JSX component.
  Use when implementing a new UI from a Figma link, screenshot, or design description.
  Handles layout, spacing, typography, and component decomposition for React.
user-invocable: false
---

## Referenced Skills

Consult these skills throughout implementation:

- **`Design/shared/web-design-guidelines`** — validate the output UI against Web Interface Guidelines before finalizing
- **`Design/react/vercel-react-view-transitions`** — apply `<ViewTransition>` patterns for any navigation, list, or enter/exit animations in the component
- **`Code/react/vercel-react-best-practices`** — apply performance rules (bundle, re-render, rendering) when generating the JSX implementation

## Instructions

1. Read `.claude/config.md` — note styling (tailwind/css-modules), component-lib, lang (ts/js)
2. Run `agents/shared/explore/` on the target file location to understand existing patterns

<!-- TODO: Define how Figma spec is provided — URL, screenshot path, or pasted frame JSON -->

3. Analyse the design:
   - Break into atomic components (atoms → molecules → organism)
   - Identify reusable primitives already in the codebase (check component-lib)
   - Note spacing scale, color tokens, typography variants used

4. Map design values to project tokens:
   - Tailwind: map px values to spacing/text scale (`gap-4` not `gap-[16px]`)
   - CSS modules: use existing custom properties from design tokens file
   - Never hardcode hex values — use project color tokens

<!-- TODO: Add path to project design tokens file -->

5. Write the JSX component(s):
   - TypeScript props interface with JSDoc for each prop
   - Functional component with named export
   - Responsive variants using config.md breakpoints
   - No inline styles unless absolutely necessary

6. Write co-located test file using the config test-runner:
   - Render test
   - Snapshot or visual regression stub
   - Accessibility check (axe-core or testing-library queries)

7. Export from the nearest `index.ts` barrel

## Output format

```
ComponentName.tsx        — main component
ComponentName.test.tsx   — co-located tests
index.ts update          — barrel export line
```

Provide each file as a separate code block with the file path as the header.
Note any design values that couldn't be mapped to existing tokens — flag as **Token gap**.
