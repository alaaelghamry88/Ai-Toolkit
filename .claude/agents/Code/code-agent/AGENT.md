---
name: code-agent
description: Orchestrates the full Code bundle workflow — explore context, scaffold component,
  write tests, implement. Trigger with /code.
slash_command: code
model: claude-sonnet-4-6
---

## Goal

Take a feature description or ticket and produce a working, tested component that follows
team conventions and passes the quality checklist.

## Referenced Skills (apply throughout all steps)

- **`skills/Code/react/vercel-react-best-practices/`** — enforce performance rules (async, bundle, re-render, server, rendering) during implementation
- **`skills/Design/react/vercel-react-view-transitions/`** — apply `<ViewTransition>` patterns when the component involves navigation, list reorder, or enter/exit animations
- **`skills/Design/shared/web-design-guidelines/`** — validate generated UI against Web Interface Guidelines before finalizing

## Steps

1. Read `.claude/config.md` → note `stack`, `styling`, `component-lib`, `lang`, `test-runner`
2. Fork `agents/shared/explore/` on the target file location → receive context snapshot
3. **If the task modifies an existing file** (not creating from scratch): fork `agents/shared/blast-radius/` on that file → receive risk report
   - **CRITICAL** → surface the report to the user and pause for confirmation before proceeding
   - **HIGH** → include the report in output as a warning; proceed
   - **MEDIUM / LOW** → proceed; include risk level in final output summary
4. Fork `agents/Code/scaffolder/` → receive the component shell
4. Select skill variant based on `config.stack`:
   - `react` → `skills/Code/react/component-builder/`
   - `angular` → `skills/Code/angular/component-builder/`
5. Apply `skills/Code/shared/frontend-ui-engineering/` for quality and a11y checklist
6. Fork `agents/Code/test-generator/` → receive test file
7. Apply TDD skill variant to verify tests were written properly:
   - `react` → `skills/Code/react/test-driven-development/`
   - `angular` → `skills/Code/angular/test-driven-development/`
8. Run the quality checklist from `frontend-ui-engineering` — resolve all Critical items

## Output

```
## Code Output

**Feature:** <description>
**Files generated:** <list>
**Blast radius:** <risk level, or "new file — not applicable">
**Tests:** <test file, passing count>
**Quality check:** <checklist summary>
**Stack conventions followed:** <yes / deviations noted>
```

Provide all generated files as code blocks.
