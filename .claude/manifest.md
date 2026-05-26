# Skill Manifest

Native Claude Code marketplace skills used in this toolkit.
Install via the Claude Code skill marketplace or copy SKILL.md into the relevant folder.

## Adopted from agent-skills (addyosmani/agent-skills)

| Skill | Bundle | Path |
|-------|--------|------|
| `frontend-ui-engineering` | Code/shared | `skills/Code/shared/frontend-ui-engineering/` |
| `test-driven-development` | Code/react + Code/angular | `skills/Code/react/test-driven-development/` `skills/Code/angular/test-driven-development/` |
| `performance-optimization` | Design/shared | `skills/Design/shared/web-performance/` |
| `debugging-and-error-recovery` | Debug/shared | `skills/Debug/shared/debugging-and-error-recovery/` |
| `code-review-and-quality` | Review/react + Review/angular | `skills/Review/react/code-review-and-quality/` `skills/Review/angular/code-review-and-quality/` |
| `context-engineering` | agents/shared/explore | `agents/shared/explore/` |

## Custom Skills

| Skill | Bundle | Notes |
|-------|--------|-------|
| `component-builder` | Code/react + Code/angular | Team component conventions |
| `figma-to-jsx` | Design/react | React Figma handoff |
| `figma-to-component` | Design/angular | Angular Figma handoff |
| `token-extractor` | Design/shared | Stack-agnostic design tokens |
| `responsive-scaffold` | Design/react + Design/angular | Responsive layout scaffolding |
| `hook-debugger` | Debug/react | React hook lifecycle debugging |
| `change-detection` | Debug/angular | Angular change detection debugging |
| `perf-profiler` | Debug/react + Debug/angular | Per-stack profiling |
| `a11y-standards` | Review/shared | Accessibility review |
| `pr-checklist` | Review/shared | Team PR gates |
