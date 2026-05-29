---
name: blast-radius
description: Analyses how widely a target file is depended on before any change is made.
  Returns a risk-scored report covering direct dependents, entry points affected, test
  coverage gaps, and a proceed/pause verdict. Fork this before modifying any shared
  utility, hook, context, or component used in more than one place.
context: fork
model: claude-haiku-4-5
---

## Goal

Answer the question: "If I change this file, what breaks and how bad is it?"
Return a structured risk report the calling agent can act on before touching any code.

## Steps

1. Receive the target file path from the caller
2. Search for all files that import the target:
   - Match `from ['"].*<target-stem>['"]` (named, default, namespace imports)
   - Match `require(['"].*<target-stem>['"])` (CJS)
   - Match `export.*from ['"].*<target-stem>['"]` (re-exports — these multiply blast radius)
3. For each direct dependent, classify its type:
   - **Page / Route** — lives in `pages/`, `routes/`, `app/`, or is a route component
   - **Feature** — lives in a feature folder (`features/`, `modules/`, named domain folder)
   - **Shared** — lives in `components/`, `ui/`, `shared/`, `common/`, `lib/`, `utils/`, `hooks/`
   - **Test** — `*.test.*` or `*.spec.*` (exclude from dependent count, note separately)
   - **Barrel** — `index.ts` re-export (escalate: find who imports the barrel)
4. For each direct dependent, check whether a co-located test file exists
5. Check whether the **target file itself** has a test file
6. Do one transitive pass: for each direct dependent, count how many files import it
   (do not recurse further — keep the report bounded)
7. Score risk:

| Level | Condition |
|-------|-----------|
| **CRITICAL** | Target is in `shared/`, `lib/`, `utils/`, `hooks/`, `context/`, `store/` AND has >15 direct dependents OR is imported via a barrel that has >15 importers |
| **HIGH** | >10 direct dependents, OR any page/route is a direct dependent, OR target itself has no tests |
| **MEDIUM** | 3–10 direct dependents with some untested, OR 1–2 pages affected |
| **LOW** | ≤2 direct dependents, all with test files, target has tests |

## Output

Return this report to the calling agent — keep it under 400 words:

```
## Blast Radius: <target file>

**Risk level:** CRITICAL | HIGH | MEDIUM | LOW
**Direct dependents:** <N> files
**Entry points affected:** <N pages/routes — list them>
**Untested dependents:** <N files with no co-located test>
**Target has tests:** yes | no ⚠️

### Dependency map

| File | Type | Tests |
|------|------|-------|
| <path> | <page|feature|shared|barrel> | ✓ / ✗ |

### Transitive exposure

<N> additional files import the direct dependents above.
Highest-exposure paths: <list top 2–3 entry points and how they reach the target>

### Verdict

<RISK LEVEL> — <one sentence: why this score>.

<One of:>
- LOW/MEDIUM: Proceed. Test coverage is adequate — run the full suite after changes.
- HIGH: Proceed with care. Add tests to uncovered dependents before making structural changes.
- CRITICAL: Pause. Changing this file touches <N> entry points. Agree on a migration strategy before editing.
```
