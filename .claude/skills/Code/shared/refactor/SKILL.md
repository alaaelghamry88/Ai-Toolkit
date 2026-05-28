---
name: refactor
description: Restructures existing code without changing observable behaviour. Enforces
  a test gate — if tests don't exist or don't pass before the refactor starts, work
  stops. Use when a component is too large, logic is duplicated, types are loose, or
  names are unclear. Never use to add features or fix bugs.
user-invocable: false
---

## Referenced Skills

- **`Code/react/test-driven-development`** or **`Code/angular/test-driven-development`** — the test suite is the safety net; read the TDD skill to understand the test conventions in use
- **`Review/shared/code-review-and-quality`** — use the architecture axis to validate the post-refactor structure

## Instructions

**The invariant: tests pass before. Tests pass after. Nothing else is acceptable.**

### Step 0 — Pre-flight (halt if this fails)

1. Read `.claude/config.md` — note stack, test-runner
2. Identify test files for the target code (`*.test.tsx`, `*.spec.ts`, etc.)
3. Run the test suite scoped to the target:
   ```
   npx vitest run <path>          # vitest
   npx jest --testPathPattern <path>  # jest
   ng test --include=<path>       # angular
   ```
4. **If no tests exist → STOP.** Output:
   > Refactor halted: no tests found for `<target>`. Write tests that cover the current behaviour first, then re-run the refactor.
5. **If tests fail → STOP.** Output:
   > Refactor halted: tests are already failing before any changes. Fix the failures first, then re-run the refactor.

Only proceed when the suite is green.

---

### Step 1 — Scope

State exactly what will change and what refactor type applies:

| Type | When to use |
|------|-------------|
| **Extract component** | Component exceeds ~200 lines or has multiple distinct UI responsibilities |
| **Extract hook** | Logic repeated across 2+ components, or component has >2 `useState`/`useEffect` blocks |
| **Eliminate duplication** | Identical or near-identical code blocks in 2+ places |
| **Split file** | File exceeds ~300 lines with unrelated exports |
| **Rename** | Name doesn't describe current behaviour (function, variable, prop, file) |
| **Tighten types** | `any`, overly wide unions, or missing return types |

State the type, the target, and the expected outcome before touching any code.

---

### Step 2 — Refactor

Apply **one type at a time**. After each discrete change:
- Run the scoped test suite
- If tests fail: revert the last change, report what broke, stop

Rules:
- No behaviour changes — no new logic, no bug fixes, no feature additions
- No style-only changes (formatting, comment rewording) mixed with structural changes
- Match existing naming conventions exactly
- Do not touch files outside the stated scope

**Extract component checklist:**
- [ ] New component has a single clear responsibility
- [ ] Props interface is typed (no `any`)
- [ ] Named export (not default, unless page-level route)
- [ ] Co-located test file updated or created for the extracted component
- [ ] Original component imports and uses the new one without behaviour change

**Extract hook checklist:**
- [ ] Hook is prefixed `use`
- [ ] Returns a stable interface (memoize callbacks if returned from hook)
- [ ] Tested with `renderHook`
- [ ] Original component delegates to the hook without behaviour change

**Tighten types checklist:**
- [ ] No `any` introduced — replace with specific type or `unknown` + narrowing
- [ ] No `as` casts without a comment explaining why
- [ ] No type widening — only narrowing or no change

---

### Step 3 — Final verification

Run the full project test suite (not just the scoped subset):
```
npx vitest run      # vitest
npx jest            # jest
ng test             # angular
```

If anything outside the target scope fails: revert all changes and report which tests broke.

---

## Output format

```
## Refactor: <target file or component>

**Type:** <refactor type>
**Scope:** <what changed>

### Changes

1. <Change description>
   - Before: `<symbol or file>`
   - After: `<symbol or file>`

### Test results

- Pre-refactor: <N> tests passing
- Post-refactor: <N> tests passing
- Suite: <green / RED — list failures>

### Files touched

- Modified: <list>
- Created: <list>
- Deleted: <list>
```

If halted at pre-flight, output only the halt message with the reason.
