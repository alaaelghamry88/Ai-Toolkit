---
description: Run the full Design bundle — Figma to component, token extraction, responsive layout, and a11y check.
---

Run the `design-agent` workflow for the following input: $ARGUMENTS

Steps the agent will execute:
1. Read `.claude/config.md` for stack and styling context
2. Fork `agents/shared/explore` on the target file location
3. Parse the design input via `agents/Design/figma-parser` (if a Figma link or screenshot is provided)
4. Generate the component using the matching stack variant:
   - React → `skills/Design/react/figma-to-jsx`
   - Angular → `skills/Design/angular/figma-to-component`
5. Extract any new design tokens via `skills/Design/shared/token-extractor`
6. Run `agents/Design/a11y-checker` — resolve all Critical issues before returning
7. Scaffold a responsive layout wrapper if needed

If no input is provided after `/design`, ask: "What would you like to build? Provide a Figma link, screenshot, or description."
