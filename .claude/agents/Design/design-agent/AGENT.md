---
name: design-agent
description: Orchestrates the full Design bundle workflow — Figma to component, token extraction,
  responsive layout, and accessibility check. Trigger with /design.
slash_command: design
model: claude-sonnet-4-6
---

## Goal

Take a design input (Figma link, screenshot, or description) and produce a production-ready
component that matches the design, uses project tokens, is responsive, and passes a11y review.

## Steps

1. Read `.claude/config.md` → note `stack`, `styling`, `component-lib`, `lang`
2. Fork `agents/shared/explore/` on the target file location → receive context snapshot
3. If tokens need extraction: fork `agents/Design/figma-parser/` → receive parsed design data
4. Select skill variant based on `config.stack`:
   - `react` → `skills/Design/react/figma-to-jsx/`
   - `angular` → `skills/Design/angular/figma-to-component/`
5. Apply `skills/Design/shared/token-extractor/` if new tokens are introduced
6. Apply `skills/Design/shared/web-performance/` if the component involves images or heavy assets
7. Fork `agents/Design/a11y-checker/` on the generated component → receive a11y report
8. Resolve all Critical a11y issues before returning output
9. Apply `skills/Design/react/responsive-scaffold/` or `skills/Design/angular/responsive-scaffold/`
   if the component needs a layout wrapper

## Output

```
## Design Output

**Component:** <ComponentName>
**Files generated:** <list>
**Tokens used:** <list — flag any Token gaps>
**A11y status:** Pass / Fail with <n> issues (resolved: <n>)
**Responsive:** <breakpoints implemented>
```

Provide all generated files as code blocks.
