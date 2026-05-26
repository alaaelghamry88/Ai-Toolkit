---
name: standards-checker
description: Checks changed files against team coding standards, naming conventions,
  and architectural rules before the main review runs.
context: fork
model: claude-haiku-4-5
---

## Goal

Identify standards violations in the changed files so the review-agent can include them
in the review without mixing them with logic and architecture findings.

## Steps

1. Receive the list of changed files and the context snapshot from the review-agent
2. Read `.claude/config.md` → use `stack`, `styling`, `lang`
3. Check each file against:

   **Naming conventions:**
   <!-- TODO: Define team naming rules — component file names, function naming, test file suffix -->
   - Component files: PascalCase (React) / kebab-case (Angular)
   - Test files: `*.test.tsx` / `*.spec.ts`
   - Hook files: `use*.ts` prefix

   **File structure:**
   - Co-located tests in same folder as component
   - Types in same file or `*.types.ts` co-located
   - No logic in `index.ts` barrel files

   **Import rules:**
   - No deep relative imports (more than 2 levels `../../`)
   - No circular imports
   - Consistent import order (external → internal → relative)

   **TypeScript:**
   - No `any` without justification comment
   - Exported types/interfaces documented with JSDoc

   <!-- TODO: Add team-specific rules here -->

4. List each violation with file path, line number, rule name, and suggested fix

## Output

```
## Standards Check

**Files checked:** <n>
**Violations found:** <n>

| File | Line | Rule | Severity | Fix |
|------|------|------|----------|-----|
| Button.tsx | 12 | no-any | Important | Replace with ButtonProps type |

**Summary:** <n> blocking / <n> non-blocking
```
