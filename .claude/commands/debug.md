---
description: Run the full Debug bundle — reproduce the bug, localize it, apply a fix, add a guard test.
---

Run the `debug-agent` workflow for the following issue: $ARGUMENTS

Steps the agent will execute:
1. Read `.claude/config.md` for stack and test-runner context
2. Fork `agents/shared/explore` on the affected file
3. Apply `skills/Debug/shared/debugging-and-error-recovery` — Stop-the-Line rule in effect
4. Fork `agents/Debug/repro-builder` to strip the problem to a minimal reproduction
5. Apply the specialist skill based on stack and symptom:
   - React rendering/state → `skills/Debug/react/hook-debugger`
   - React performance → `skills/Debug/react/perf-profiler`
   - Angular CD → `skills/Debug/angular/change-detection`
   - Angular performance → `skills/Debug/angular/perf-profiler`
6. Fork `agents/Debug/fix-suggester` → ranked fix options with risk assessment
7. Apply the fix and write a guard test

If no input is provided after `/debug`, ask: "What's the bug? Describe what you expected vs what happened, and share the affected file if possible."
