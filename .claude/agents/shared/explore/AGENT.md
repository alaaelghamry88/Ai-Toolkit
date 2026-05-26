---
name: explore
description: Maps the current file context, imports, and dependencies before any skill runs.
  Use at the start of every bundle workflow to ground the agent in the actual codebase.
context: fork
model: claude-haiku-4-5
---

## Goal

Produce a concise context snapshot: current file purpose, its direct imports, component
tree position, and any patterns the agent should follow. This snapshot is passed to the
calling orchestrator so downstream skills work with real codebase knowledge.

## Steps

1. Read `.claude/config.md` — note stack, styling, lang, component-lib, test-runner
2. Read the currently open file (or the file named by the caller)
3. Resolve its direct imports — read each one, note what it exports
4. Identify:
   - Component type (page, layout, feature, primitive, util)
   - State management in use (local, context, zustand, redux, signals, etc.)
   - Styling approach (tailwind classes, CSS modules, styled-components, etc.)
   - Test file presence and test runner used
5. Scan for any co-located types, hooks, or stories files
6. Note any obvious patterns (compound component, render prop, HOC, etc.)

## Output

Return a structured snapshot:

```
## Context Snapshot

**File:** <path>
**Type:** <component type>
**Stack match:** <react|angular> — matches config.md ✓
**Imports:** <list of key imports and what they provide>
**State:** <state approach>
**Styling:** <styling approach>
**Tests:** <test file path or "none found">
**Patterns:** <patterns observed>
**Gotchas:** <anything unusual the downstream skill should know>
```

Keep the snapshot under 300 words. Compress — do not repeat file contents verbatim.
