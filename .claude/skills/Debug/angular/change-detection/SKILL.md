---
name: change-detection
description: Diagnoses Angular change detection issues — unexpected re-renders, ExpressionChangedAfterItHasBeenCheckedError,
  OnPush components not updating, and zone.js performance problems. Use when an Angular
  component displays stale data, errors on detection, or causes performance issues.
user-invocable: false
---

## Instructions

1. Read `.claude/config.md` — confirm stack is angular
2. Run `agents/shared/explore/` on the affected component

<!-- TODO: Define if the project uses Zone.js or has opted into zoneless (Angular 18+) -->

### Step 1 — Identify the CD symptom

| Symptom | Root cause area |
|---------|----------------|
| `ExpressionChangedAfterItHasBeenCheckedError` | Template expression mutates state during CD cycle |
| `OnPush` component shows stale data | Change not arriving via `@Input` reference change, Observable, or `markForCheck()` |
| Whole app re-renders on mouse move | Zone.js catching non-Angular async event |
| `OnPush` component never updates | Observable not piped through `async` pipe or manually subscribed without `markForCheck` |
| Manual subscription leaks | `ngOnDestroy` missing `unsubscribe()` or `takeUntilDestroyed()` |

### Step 2 — Reproduce

Add change detection logging:

```typescript
// In the component constructor (dev only)
constructor(private cdRef: ChangeDetectorRef) {}
ngDoCheck() { console.count('CD cycle: ' + this.constructor.name) }
```

### Step 3 — Apply the fix pattern

**ExpressionChangedError** → move mutation to `ngAfterViewInit` or `setTimeout`, or eliminate side effects from expressions

**OnPush not updating with new data** →
- Ensure `@Input` receives a new reference (not mutated object)
- Use `Observable` + `async` pipe
- Call `this.cdRef.markForCheck()` after async updates in manual subscriptions

**Zone.js over-triggering** →
- Run non-Angular async outside zone: `this.ngZone.runOutsideAngular(() => { ... })`
- Re-enter zone for actual DOM updates: `this.ngZone.run(() => { ... })`

**Subscription leak** →
- Add `takeUntilDestroyed()` (Angular 16+) or `ngOnDestroy` + `Subject` + `takeUntil`

### Step 4 — Verify

Clear the CD counter and repeat the triggering action. Confirm cycle count decreased.

### Step 5 — Guard

Write a test that catches regression:
```typescript
it('should not trigger change detection on unrelated input change', () => {
  // Use ChangeDetectorRef spy to assert markForCheck call count
})
```

## Output format

```
## Change Detection Report

**Component:** <name>
**Symptom:** <what was observed>
**CD strategy:** <Default | OnPush>
**Root cause:** <identified issue>
**Fix:** <code change>
**Verification:** <CD cycle count before/after>
**Guard:** <test added>
```
