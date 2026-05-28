---
name: code-review-and-quality
description: Conducts a five-axis code review for React code — correctness, readability,
  architecture, security, and performance. Use before merging any React PR, after feature
  completion, or when evaluating code quality.
  Adapted from agent-skills/code-review-and-quality (React variant).
user-invocable: false
---

## Instructions

> Source: adapted from addyosmani/agent-skills — code-review-and-quality (React variant)

**Approval standard: approve changes that improve code health. Perfect code doesn't exist.**

### The Five-Axis Review

**1. Correctness**
- Does it match the spec / ticket?
- Are edge cases handled: empty, loading, error, null, 0, empty array?
- Are tests present and meaningful (not just "renders without crashing")?
- Do error paths work?

**2. Readability & Simplicity**
- Would another React developer understand this without explanation?
- Are component and prop names descriptive?
- Is the JSX tree readable (under ~3 levels of nesting without abstraction)?
- Could this be done in fewer lines? Are abstractions earning their complexity?

**3. Architecture (React-specific)**
- Is state at the right level? (not hoisted higher than needed)
- Are side effects in `useEffect`, not in render?
- Is data fetching in a service layer, not directly in components?
- Are large components decomposed appropriately?
- Does the component follow the single-responsibility principle?
- Are custom hooks used to extract reusable logic?

**4. Security**
- No secrets or API keys in component code
- User input is sanitized before rendering (`dangerouslySetInnerHTML` requires justification)
- Third-party data treated as untrusted

**5. Performance**
- No functions or objects created inline in JSX that will cause unnecessary re-renders
- `key` props use stable IDs, not array indices
- Large lists virtualized
- Heavy computations in `useMemo`

### Change Sizing Guidelines

| Size | Verdict |
|------|---------|
| ~100 lines | Good |
| ~300 lines | Acceptable for single logical change |
| ~1000 lines | Too large — request split |

### Severity Labels

| Label | Meaning |
|-------|---------|
| **Critical** | Blocks merge — security, data loss, broken functionality |
| **Important** | Must fix before merge |
| **Nit** | Minor, optional |
| **Consider** | Worth evaluating, not required |
| **FYI** | Informational only |

### React Red Flags

- `any` in TypeScript without a comment explaining why
- `useEffect` with no dependency array (runs after every render)
- Direct DOM manipulation (`document.querySelector` in component code)
- `key={index}` on a re-orderable list
- Component over 200 lines without decomposition
- Missing `loading` and `error` states for async data

## Output format

```
## Code Review

**PR / File:** <name>
**Size:** <line count> — <verdict>

### Findings

| Axis | Severity | Finding | Suggestion |
|------|----------|---------|-----------|
| Correctness | Important | ... | ... |
| Architecture | Nit | ... | ... |

### Verdict
[ ] Approve  [ ] Approve with nits  [ ] Request changes

**Blocking items:** <list Critical + Important findings>
```
