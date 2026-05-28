---
name: perf-profiler
description: Profiles and fixes Angular rendering performance issues — slow change detection cycles,
  unvirtualized lists, heavy pipes, and zone.js overhead. Use when an Angular UI feels
  laggy, interactions are slow, or the Angular DevTools Profiler shows slow CD cycles.
user-invocable: false
---

## Instructions

1. Read `.claude/config.md` — confirm stack is angular
2. Run `agents/shared/explore/` on the affected component tree

<!-- TODO: Define if Angular DevTools Profiler output is available -->

### Step 1 — Measure

**Instrument before touching code.**

- Angular DevTools → Profiler tab → record user interaction → inspect CD cycle duration
- `ng.profiler.timeChangeDetection()` in browser console (dev mode)
- `console.time` / `console.timeEnd` around suspect template expressions

### Step 2 — Locate the bottleneck

1. Components with `Default` CD strategy in a high-frequency update path
2. Pure pipes vs impure pipes — impure pipes run every CD cycle
3. Template expressions calling functions (recalculated every CD cycle)
4. Large `*ngFor` lists without `trackBy`
5. Zone.js catching irrelevant async events

### Step 3 — Apply targeted fixes

| Problem | Fix |
|---------|-----|
| `Default` CD in hot path | Switch to `OnPush` + immutable data flow |
| Function call in template | Replace with pure pipe or memoized component property |
| Impure pipe | Convert to pure pipe or memoize result |
| Large list re-renders all items | Add `trackBy: trackById` to `*ngFor` |
| No virtualization on long lists | Add `cdk-virtual-scroll-viewport` |
| Zone.js catching mouse/scroll events | `runOutsideAngular` for the listener |

### Step 4 — Verify

Re-run the same Profiler recording. Confirm CD cycle duration improved.

### Step 5 — Guard

- Add bundle size check if lazy loading was applied
- Add a spec asserting `markForCheck` is not called more than expected

## Output format

```
## Angular Perf Report

**Component tree:** <root affected>
**Measured issue:** <CD cycle time / frequency before>
**Root cause:** <identified bottleneck>
**Fix applied:** <what changed>
**After measurement:** <CD cycle time / frequency after>
**Guard:** <test or CI check added>
```
