---
name: a11y-standards
description: Reviews a component or page for WCAG 2.1 AA accessibility compliance.
  Use when auditing existing UI for accessibility issues, before shipping a new component,
  or after receiving an accessibility bug report. Covers keyboard, screen reader,
  color contrast, and ARIA correctness.
  Adapted from agent-skills/frontend-ui-engineering accessibility section.
invocation: auto
---

## Instructions

> Source: derived from addyosmani/agent-skills — frontend-ui-engineering (accessibility section)

1. Read `.claude/config.md` — note stack (react/angular) and component-lib
2. Run `agents/shared/explore/` on the target component or page

### WCAG 2.1 AA Checklist

#### 1. Keyboard Navigation (WCAG 2.1.1 / 2.4.3)
- [ ] All interactive elements reachable by Tab key
- [ ] Tab order is logical (matches visual reading order)
- [ ] No keyboard traps — user can always Tab out of a widget
- [ ] Custom widgets implement expected keyboard patterns:
  - Buttons: Enter / Space activates
  - Dialogs: Escape closes, focus returns to trigger
  - Menus: Arrow keys navigate, Escape closes
  - Tabs: Arrow keys switch tabs

#### 2. Screen Reader (WCAG 4.1.2)
- [ ] All interactive elements have an accessible name:
  - Buttons with only icons have `aria-label` or `aria-labelledby`
  - Form inputs have `<label>` or `aria-label`
  - Images have `alt` text (empty `alt=""` for decorative)
- [ ] Dynamic content changes announced via live regions (`aria-live`) where appropriate
- [ ] Status messages communicated without focus movement (`role="status"`)

#### 3. Color Contrast (WCAG 1.4.3 / 1.4.11)
- [ ] Text: 4.5:1 contrast ratio against background (3:1 for large text ≥ 18px/14px bold)
- [ ] UI components and focus indicators: 3:1 against adjacent colors
- [ ] Information is never conveyed by color alone

#### 4. Focus Management (WCAG 2.4.3)
- [ ] Opening a modal/drawer moves focus inside it
- [ ] Closing a modal/drawer returns focus to the trigger element
- [ ] Dynamically loaded content: focus moves to new content or an announcement is made

#### 5. Forms (WCAG 1.3.1 / 3.3.1 / 3.3.2)
- [ ] All fields have visible, persistent labels (not just placeholder)
- [ ] Error messages are linked to the field via `aria-describedby`
- [ ] Required fields indicated (not by color alone)
- [ ] Error summary at top of form for multi-field forms

#### 6. Images and Media (WCAG 1.1.1 / 1.2.x)
- [ ] Informative images have descriptive `alt` text
- [ ] Decorative images have `alt=""`
- [ ] Videos have captions; audio has transcripts

#### 7. Semantic HTML (WCAG 1.3.1)
- [ ] Headings form a logical hierarchy (no skipped levels)
- [ ] Lists use `<ul>` / `<ol>` not `<div>` with visual bullets
- [ ] Landmark regions present: `<main>`, `<nav>`, `<header>`, `<footer>`
- [ ] Interactive elements use native `<button>` / `<a>` not `<div onClick>`

### Testing Tools

- **axe DevTools** browser extension — automated WCAG audit
- **Lighthouse** → Accessibility score
- **axe-core** in tests (`@axe-core/react` or `jest-axe`)
- **VoiceOver** (Mac) / **NVDA** (Windows) — manual screen reader test
- **Keyboard-only** — navigate the full flow without a mouse

## Output format

```
## A11y Review

**Component/Page:** <name>
**Standard:** WCAG 2.1 AA

### Issues Found

| Issue | WCAG Criterion | Severity | Fix |
|-------|---------------|----------|-----|
| Button missing aria-label | 4.1.2 | Critical | Add aria-label="Close dialog" |
| Low contrast ratio 3.2:1 | 1.4.3 | Critical | Change color to #595959 |

### Score
- Critical: <n>
- Important: <n>
- Minor: <n>

**Verdict:** Pass / Fail / Pass with fixes
```

Provide code fixes for each Critical and Important issue.
