---
name: perf-profiler
description: Profiles and fixes React rendering performance issues — unnecessary re-renders,
  slow component trees, and expensive computations. Use when a React UI feels laggy,
  interactions are slow, or the React Profiler shows unexpected renders.
user-invocable: false
---

## Instructions

1. Read `.claude/config.md` — confirm stack is react
2. Run `agents/shared/explore/` on the affected component tree

<!-- TODO: Define if React DevTools Profiler flamegraph or console.count data is available -->

### Step 1 — Measure

**Do not guess. Instrument first.**

```tsx
// Quick render counter (dev only)
const renderCount = useRef(0)
renderCount.current++
console.log(`${ComponentName} render #${renderCount.current}`)
```

Or use React DevTools Profiler → record an interaction → inspect "why did this render?"

### Step 2 — Locate expensive renders

Rank by:
1. Components that render on every parent re-render without prop changes
2. Components inside lists without stable `key` values
3. Components computing expensive values on every render
4. Components subscribing to large state objects when only needing a slice

### Step 3 — Apply targeted fixes

| Problem | Fix |
|---------|-----|
| Re-renders when props haven't changed | Wrap with `React.memo` |
| Expensive computation on every render | `useMemo(() => expensiveCalc(), [deps])` |
| Callback recreated on every render causing child re-renders | `useCallback(() => fn, [deps])` |
| Large list without virtualization | Add `react-window` or `@tanstack/react-virtual` |
| Context causes all consumers to re-render | Split context or memoize context value |
| `key` using array index | Use stable unique ID |

**Warning:** `React.memo`, `useMemo`, `useCallback` have overhead. Only apply after measuring. Do not wrap everything pre-emptively.

### Step 4 — Verify

Re-run the same measurement from Step 1. Confirm render count decreased or interaction time improved.

### Step 5 — Guard

Add a test or CI check:
- Bundle size check if code-splitting was applied
- Render count assertion for critical components (use `@testing-library/react` + render spy)

## Output format

```
## React Perf Report

**Component tree:** <root component affected>
**Measured issue:** <render count / interaction time before>
**Root cause:** <what was causing the excess work>
**Fix applied:** <what changed>
**After measurement:** <render count / interaction time after>
**Guard:** <test or CI check added>
```
