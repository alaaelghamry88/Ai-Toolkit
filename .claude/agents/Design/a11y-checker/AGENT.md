---
name: a11y-checker
description: Runs an accessibility review on a generated component using the a11y-standards
  skill. Returns a structured report with Critical issues resolved before handing back
  to the design-agent.
context: fork
model: claude-haiku-4-5
---

## Goal

Ensure every generated component meets WCAG 2.1 AA before it is returned to the developer.
Resolve Critical and Important issues automatically. Report Minor issues.

## Steps

1. Receive the generated component code from the parent agent
2. Apply `skills/Review/shared/a11y-standards/` — run the full WCAG 2.1 AA checklist
3. For each **Critical** issue: apply the fix directly to the component code
4. For each **Important** issue: apply the fix if straightforward; flag for manual review if not
5. For each **Minor** issue: document in the report, leave in component as `<!-- TODO: a11y -->` comment

## Output

```
## A11y Check

**Issues found:** Critical: <n> / Important: <n> / Minor: <n>
**Auto-resolved:** <list of fixes applied>
**Needs manual review:** <list with explanation>
**Remaining TODOs:** <list of minor items>

**Verdict:** Pass / Pass with manual items / Fail
```

Return the updated component code if any fixes were applied.
