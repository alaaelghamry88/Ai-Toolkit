---
name: summarise
description: Condenses accumulated conversation context into a tight summary when the
  context window grows large or when switching major tasks.
context: fork
model: claude-haiku-4-5
---

## Goal

Produce a compressed summary of the current session state so the main agent can continue
with a fresh, focused context without losing critical decisions or progress.

## Steps

1. Identify work completed so far: files created/edited, decisions made, errors resolved
2. Extract the active goal — what the developer is still trying to achieve
3. Note any constraints or conventions established during the session
4. List files currently in a modified or partially-done state
5. Capture any open questions or blockers

## Output

```
## Session Summary

**Goal:** <what we're building / fixing>
**Completed:** <bulleted list of done items>
**In progress:** <current task>
**Modified files:** <list with one-line status each>
**Decisions made:** <key choices and why>
**Open questions:** <anything unresolved>
**Next step:** <single recommended action>
```

Keep summary under 400 words. Prioritise decisions that would be hard to recover
from context alone (non-obvious choices, rejected alternatives, env-specific facts).
