---
name: figma-to-component
description: Converts a Figma design spec or screenshot into a production-ready Angular component.
  Use when implementing a new UI from a Figma link, screenshot, or design description.
  Handles layout, spacing, typography, and component decomposition for Angular.
invocation: auto
---

## Instructions

1. Read `.claude/config.md` — note styling, lang, component-lib
2. Run `agents/shared/explore/` on the target module to understand existing patterns

<!-- TODO: Define how Figma spec is provided — URL, screenshot path, or pasted frame JSON -->

3. Analyse the design:
   - Break into Angular components (smart/container vs dumb/presentational)
   - Check existing Angular Material or CDK components that match primitives
   - Note spacing scale, color tokens, typography variants

4. Map design values to project tokens (same rules as React variant — no hardcoded hex)

<!-- TODO: Add path to project design tokens / theme file -->

5. Generate the Angular component:
   - `@Component` with `standalone: true` (or NgModule if project convention requires it)
   - Typed `@Input()` decorators with default values
   - `OnPush` change detection strategy
   - SCSS file using existing theme variables
   - Template uses Angular Material components where appropriate

6. Write a spec file:
   - `TestBed` setup
   - Render and input binding tests
   - Accessibility check via `axe-core` or Angular CDK a11y

7. Export from the nearest barrel `index.ts`

## Output format

```
component-name.component.ts      — component class
component-name.component.html    — template
component-name.component.scss    — styles
component-name.component.spec.ts — tests
index.ts update                  — barrel export
```

Provide each file as a separate code block with the file path as the header.
Flag any design values that couldn't be mapped to existing tokens as **Token gap**.
