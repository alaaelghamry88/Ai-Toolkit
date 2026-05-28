---
name: code-review-and-quality
description: Conducts a five-axis code review for Angular code — correctness, readability,
  architecture, security, and performance. Use before merging any Angular PR, after feature
  completion, or when evaluating code quality.
  Adapted from agent-skills/code-review-and-quality (Angular variant).
user-invocable: false
---

## Instructions

> Source: adapted from addyosmani/agent-skills — code-review-and-quality (Angular variant)

**Approval standard: approve changes that improve code health. Perfect code doesn't exist.**

### The Five-Axis Review (same axes as React variant)

**1. Correctness** — same as React variant

**2. Readability & Simplicity** — same as React variant

**3. Architecture (Angular-specific)**
- Is `ChangeDetectionStrategy.OnPush` applied to all new components?
- Are smart (container) and dumb (presentational) components separated?
- Is HTTP in services, not components?
- Are observables completed (via `async` pipe, `takeUntilDestroyed`, or explicit unsubscribe)?
- Are `@Input()` and `@Output()` typed and documented?
- Are lazy-loaded modules/routes used for feature areas?
- No circular dependencies between modules/services

**4. Security** — same as React variant
- Additional: no `bypassSecurityTrustHtml` without explicit justification and review
- `[innerHTML]` binding requires sanitization verification

**5. Performance (Angular-specific)**
- `trackBy` on all `*ngFor` / `@for` loops over dynamic data
- Pure pipes instead of function calls in templates
- `OnPush` on all new components
- No impure pipes unless justified

### Change Sizing Guidelines — same as React variant

### Severity Labels — same as React variant

### Angular Red Flags

- `Default` change detection on new components
- Observable subscriptions without completion strategy
- `any` type in TypeScript
- Function calls in templates (recalculated every CD cycle)
- `NO_ERRORS_SCHEMA` in test modules
- Missing `trackBy` on `*ngFor`
- `bypassSecurityTrustHtml` without comment

## Output format

Same as React variant:

```
## Code Review

**PR / File:** <name>
**Size:** <line count> — <verdict>

### Findings

| Axis | Severity | Finding | Suggestion |
|------|----------|---------|-----------|

### Verdict
[ ] Approve  [ ] Approve with nits  [ ] Request changes

**Blocking items:** <Critical + Important findings>
```
