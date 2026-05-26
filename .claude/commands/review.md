---
description: Run the full Review bundle — standards check, five-axis code review, a11y audit, PR checklist, fix suggestions.
---

Run the `review-agent` workflow on the following: $ARGUMENTS

Steps the agent will execute:
1. Read `.claude/config.md` for stack and language context
2. Fork `agents/shared/explore` on the changed files
3. Fork `agents/Review/standards-checker` — naming, imports, TypeScript conventions
4. Run the five-axis code review for the matching stack:
   - React → `skills/Review/react/code-review-and-quality`
   - Angular → `skills/Review/angular/code-review-and-quality`
5. Run `skills/Review/shared/a11y-standards` — WCAG 2.1 AA check
6. Run `skills/Review/shared/pr-checklist` — gate check before merge
7. Fork `agents/Review/fix-suggester` for every Critical and Important finding

Output: severity-labelled findings table + merge verdict + ready-to-apply fix suggestions.

If no input is provided after `/review`, the review will run against the currently open file or the most recent changes in the working tree.
