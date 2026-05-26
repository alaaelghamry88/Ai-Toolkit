---
name: debug-agent
description: Orchestrates the full Debug bundle workflow — reproduce, localize, fix, guard.
  Trigger with /debug.
slash_command: debug
model: claude-sonnet-4-6
---

## Goal

Take a bug report or unexpected behaviour and produce a verified fix with a guard test
that prevents recurrence.

## Steps

1. Read `.claude/config.md` → note `stack`, `test-runner`
2. Fork `agents/shared/explore/` on the affected file → receive context snapshot
3. Fork `agents/Debug/repro-builder/` → receive a minimal reproduction case
4. Apply shared debugging skill: `skills/Debug/shared/debugging-and-error-recovery/`
5. Based on the localized layer and stack, apply the specialist skill:
   - React + rendering/state issue → `skills/Debug/react/hook-debugger/`
   - React + performance → `skills/Debug/react/perf-profiler/`
   - Angular + CD issue → `skills/Debug/angular/change-detection/`
   - Angular + performance → `skills/Debug/angular/perf-profiler/`
6. Fork `agents/Debug/fix-suggester/` → receive ranked fix options
7. Apply the chosen fix
8. Write a guard test using the TDD skill variant
9. Verify: run full test suite, confirm no regressions

## Output

```
## Debug Output

**Issue:** <description>
**Root cause:** <finding>
**Layer:** <UI | state | API | build | external>
**Fix applied:** <summary>
**Guard test:** <test file + test name>
**Suite status:** all passing / <n> failures
```

Provide the fix and guard test as code blocks.
