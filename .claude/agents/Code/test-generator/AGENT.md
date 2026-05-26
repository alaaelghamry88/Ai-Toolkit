---
name: test-generator
description: Generates a test file for a completed component using the TDD skill.
  Produces tests that cover render, interaction, edge cases, and accessibility.
context: fork
model: claude-haiku-4-5
---

## Goal

Given a completed component, write a comprehensive test file that a reviewer could
use to verify the component works as documented.

## Steps

1. Receive the completed component code from the parent agent
2. Read `.claude/config.md` → use `stack`, `test-runner`
3. Select TDD skill variant:
   - `react` → `skills/Code/react/test-driven-development/`
   - `angular` → `skills/Code/angular/test-driven-development/`
4. Analyse the component:
   - List all `@Input` props / React props
   - List all user interactions (click, change, submit)
   - Identify async operations (loading, error, success states)
   - Identify conditional rendering paths
5. Write tests covering:
   - **Render** — default props, required props
   - **Interactions** — each user action and its expected outcome
   - **Edge cases** — empty data, null props, error state, loading state
   - **Accessibility** — axe-core or jest-axe assertion

## Output

Provide the complete test file as a single code block.
Include a summary:

```
## Tests Generated

**Framework:** <vitest | jest | karma/jasmine>
**Coverage:**
  - Render: <n> tests
  - Interactions: <n> tests
  - Edge cases: <n> tests
  - A11y: <n> tests
**Total:** <n> tests
```
