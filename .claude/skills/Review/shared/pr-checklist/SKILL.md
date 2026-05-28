---
name: pr-checklist
description: Runs the team PR gate checklist before a pull request is marked ready for review.
  Use before opening a PR or promoting a draft PR. Confirms tests pass, coverage thresholds
  are met, a11y is checked, and the PR description is complete.
user-invocable: false
---

## Instructions

1. Read `.claude/config.md` — use test-runner, stack, styling values
2. Run `agents/shared/explore/` on changed files to understand what was modified

<!-- TODO: Define team coverage threshold (e.g. 80% lines) -->
<!-- TODO: Define required PR description sections (e.g. Summary, Test plan, Screenshots) -->
<!-- TODO: Define if a Lighthouse CI score gate exists and at what threshold -->
<!-- TODO: Define team branch naming convention (e.g. feat/*, fix/*) -->

### Checklist

#### Code Quality
- [ ] All new code has tests
- [ ] Test suite passes locally (`<test-runner> run`)
- [ ] Coverage threshold met (<!-- TODO: threshold --> %)
- [ ] No `console.log` / debug statements left in production code
- [ ] No commented-out code without a tracked issue reference
- [ ] TypeScript: no new `any` types without justification

#### Functionality
- [ ] Feature works end-to-end in the browser
- [ ] Error states, loading states, and empty states are handled
- [ ] Works on mobile viewport (320px minimum)
- [ ] Works with keyboard navigation
- [ ] No regressions to existing features

#### Accessibility
- [ ] New interactive elements are keyboard accessible
- [ ] ARIA labels present where needed
- [ ] Color contrast passes WCAG 2.1 AA (4.5:1 text, 3:1 UI)
- [ ] Screen reader tested with VoiceOver or NVDA

#### PR Description
- [ ] Title is concise and imperative (under 70 chars)
- [ ] Body explains *why*, not just *what*
- [ ] Screenshots or screen recordings for visual changes
- [ ] Linked to ticket/issue
- [ ] Breaking changes documented

#### Pre-merge
- [ ] PR is not too large (~300 lines max for single logical change)
- [ ] Branch is up to date with main
- [ ] CI pipeline passes
- [ ] At least one reviewer approved

## Output format

Return the checklist with each item marked:
- `[x]` — passed
- `[ ]` — not met (explain why)
- `[~]` — partially met (explain what's missing)

Provide a **Go / No-go** verdict with a one-line summary of any blocking items.
