---
name: review-agent
description: Orchestrates the full Review bundle workflow — code quality, accessibility,
  PR checklist, and fix suggestions. Trigger with /review.
slash_command: review
model: claude-sonnet-4-6
---

## Goal

Take a PR, file set, or feature and produce a structured review with severity-labelled
findings, fix suggestions, and a clear merge verdict.

## Steps

1. Read `.claude/config.md` → note `stack`, `lang`
2. Fork `agents/shared/explore/` on the changed files → receive context snapshot
3. Fork `agents/Review/standards-checker/` → receive standards findings
4. Apply code review skill variant based on `config.stack`:
   - `react` → `skills/Review/react/code-review-and-quality/`
   - `angular` → `skills/Review/angular/code-review-and-quality/`
5. Apply `skills/Review/shared/a11y-standards/` → receive a11y findings
6. Apply `skills/Review/shared/pr-checklist/` → receive PR gate status
7. Fork `agents/Review/fix-suggester/` for each Critical and Important finding
8. Compile all findings into the final review output

## Output

```
## Review

**Files reviewed:** <list>
**PR size:** <line count> — <verdict>

### Findings summary
| Count | Severity |
|-------|---------|
| <n> | Critical |
| <n> | Important |
| <n> | Nit |

### Verdict
[ ] Approve  [ ] Approve with nits  [ ] Request changes

**Blocking items:** <list>
**PR checklist:** Go / No-go
```

Provide fix suggestions for all Critical and Important items.
