---
name: hook-debugger
description: Diagnoses React hook lifecycle issues including stale closures, infinite render loops,
  incorrect dependency arrays, and effect timing problems. Use when a React component
  behaves unexpectedly, re-renders too often, or produces stale/incorrect values.
invocation: auto
---

## Instructions

1. Read `.claude/config.md` — confirm stack is react
2. Run `agents/shared/explore/` on the affected component to map its hook usage

<!-- TODO: Define if React DevTools Profiler output or console logs should be requested from the developer -->

### Step 1 — Identify the hook class

| Symptom | Suspect hook |
|---------|-------------|
| Component re-renders on every parent render | `useCallback` / `useMemo` missing or incorrect |
| Stale value inside a callback or effect | `useRef` for mutable, or missing dep array entry |
| Effect runs on every render | Missing or incorrect `useEffect` dependency array |
| Infinite render loop | State set unconditionally inside `useEffect` |
| State update has no visible effect | State mutation instead of new reference |
| Effect cleanup not running | Missing return from `useEffect` |
| Context consumer re-renders too broadly | Context not split by update frequency |

### Step 2 — Reproduce

Ask for the minimal reproduction steps or construct a test case:

```tsx
// Minimal reproduction template
function BugRepro() {
  // paste suspect hooks here
  // log renders: console.count('render')
}
```

### Step 3 — Diagnose dependency arrays

For every `useEffect`, `useCallback`, `useMemo`:
1. List all values referenced inside the callback
2. Check each is in the dependency array
3. Identify any objects/functions created inline that change reference every render

### Step 4 — Apply the fix pattern

**Stale closure** → add missing dep OR use `useRef` for values that should not trigger re-runs
**Inline object/function creating new ref** → lift outside component OR memoize
**Unconditional state set in effect** → add a condition or guard
**Missing cleanup** → return a cleanup function from `useEffect`
**Context causing broad re-renders** → split context or use `useMemo` for context value

### Step 5 — Guard

Write a test that would catch this regression:
```tsx
it('should not re-render when unrelated parent state changes', () => {
  // use render count tracking or React.memo + spy
})
```

## Output format

```
## Hook Debug Report

**Component:** <name>
**Symptom:** <what the developer observed>
**Root cause:** <identified hook issue>
**Fix:** <code change>
**Test added:** <test that guards against recurrence>
```

Provide the fix as a diff or annotated code block.
