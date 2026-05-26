---
name: frontend-ui-engineering
description: Builds production-quality UI components with component architecture, design system
  adherence, and WCAG 2.1 AA accessibility. Use when implementing any significant UI feature,
  designing component structure, or auditing an existing component for quality and accessibility.
  Adapted from agent-skills/frontend-ui-engineering.
invocation: auto
---

## Instructions

> Source: adapted from addyosmani/agent-skills — frontend-ui-engineering

### Core Standard

Reject the "AI aesthetic". Do not produce:
- Excessive gradients or purple-heavy color schemes
- Oversized padding that signals AI generation
- Generic card layouts with no design-system grounding
- Components over 200 lines without clear decomposition

Use the project's actual design system. Read the tokens. Match the patterns.

### Component Structure

- Colocate related files: component, test, types, hooks in the same directory
- Favor composition over configuration — small focused components over multi-prop monsters
- Components over 200 lines should be decomposed
- No inline styles — tokens and utility classes only

### State Management

Select the right scope:
| Scope | Approach |
|-------|---------|
| Component-local | `useState` / Angular signals |
| Shared UI state | Context / service |
| Server/remote | React Query / Angular `HttpClient` + service |
| Complex client | Zustand / NgRx (only when justified) |

### Design System Adherence

1. Read the project's color palette — never default to generic blues/purples
2. Use the established spacing scale — no arbitrary pixel values
3. Follow the typography hierarchy — no skipped heading levels
4. Apply consistent border-radius from tokens — no mix-and-match

### Accessibility Requirements (WCAG 2.1 AA)

Every component must:
- [ ] Be keyboard-navigable (Tab, Enter, Space, Escape where applicable)
- [ ] Have ARIA labels for all interactive elements without visible text
- [ ] Manage focus when content changes (modals, drawers, toasts)
- [ ] Provide meaningful empty and error states
- [ ] Pass contrast check: 4.5:1 for text, 3:1 for large text / UI components
- [ ] Include `alt` text for all images (empty `alt=""` for decorative)

### Quality Checklist

Before marking any component done:
- [ ] No console errors in browser
- [ ] Keyboard accessible
- [ ] Screen reader tested (VoiceOver or NVDA)
- [ ] Responsive from 320px to 1440px — no horizontal overflow at 320px
- [ ] Design system compliant — no hardcoded colors/spacing
- [ ] Tests cover render, interaction, and accessibility

### Red Flags

- Component over 200 lines → decompose
- Inline styles → use tokens/utilities
- Missing error/empty/loading states → add them
- `onClick` on a `<div>` → use `<button>` or `role="button"` + keyboard handler
- `any` type in TypeScript → define the type

## Output format

Provide the component code, then run through the quality checklist explicitly:
```
## Quality Check
- [x] Keyboard navigable
- [x] ARIA labels present
- [ ] Screen reader tested — TODO
...
```

Flag any items that are TODO with a reason.
