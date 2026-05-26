---
description: Run the full Code bundle — explore context, scaffold component shell, write tests, implement.
---

Run the `code-agent` workflow for the following feature or task: $ARGUMENTS

Steps the agent will execute:
1. Read `.claude/config.md` for stack, component-lib, and test-runner context
2. Fork `agents/shared/explore` on the target file location
3. Fork `agents/Code/scaffolder` to generate the component shell
4. Implement the component using the matching stack variant:
   - React → `skills/Code/react/component-builder`
   - Angular → `skills/Code/angular/component-builder`
5. Apply `skills/Code/shared/frontend-ui-engineering` quality checklist
6. Fork `agents/Code/test-generator` to write tests
7. Verify TDD compliance via the matching test-driven-development skill

If no input is provided after `/code`, ask: "What would you like to build? Describe the component or feature."
