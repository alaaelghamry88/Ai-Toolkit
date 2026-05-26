---
name: test-driven-development
description: Applies Red-Green-Refactor TDD methodology for React components and hooks.
  Use when writing new features, fixing bugs, or adding behaviour to React code.
  Tests are written before implementation — "seems right" is not done.
  Adapted from agent-skills/test-driven-development (React variant).
invocation: auto
---

## Instructions

> Source: adapted from addyosmani/agent-skills — test-driven-development (React variant)

**Rule: Write a failing test before writing the code that makes it pass.**

### The TDD Cycle

**RED** → **GREEN** → **REFACTOR**

1. **RED** — Write a test that fails, proving the feature doesn't exist yet
2. **GREEN** — Write the *minimum* React code to make the test pass
3. **REFACTOR** — Clean up without breaking the green tests

Do not skip to GREEN. Do not write implementation before the failing test exists.

### React-Specific Test Setup

Read `.claude/config.md` → use `test-runner` value (default: vitest).

```
vitest + @testing-library/react + @testing-library/user-event
```

Always use:
- `render()` from `@testing-library/react`
- `screen` queries — prefer semantic: `getByRole`, `getByLabelText`, `getByText`
- `userEvent` over `fireEvent` for interactions
- `vi.fn()` for mocks (vitest) — mock at the boundary, not inside components

### Test Structure (Arrange-Act-Assert)

```tsx
describe('ComponentName', () => {
  it('should <expected behaviour>', async () => {
    // Arrange
    render(<ComponentName prop="value" />)
    // Act
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    // Assert
    expect(screen.getByText('Success')).toBeInTheDocument()
  })
})
```

### Hook Testing

Use `renderHook` from `@testing-library/react`:

```tsx
const { result } = renderHook(() => useMyHook(initialValue))
act(() => result.current.doSomething())
expect(result.current.value).toBe(expected)
```

### The Prove-It Pattern for Bug Fixes

When a bug report arrives:
1. Write a test that reproduces the bug (it **must fail** first)
2. Implement the fix
3. Verify the test now passes
4. Run the full suite — no new failures allowed

### Test Pyramid Targets (React)

- **Unit (~70%)** — isolated components with mocked dependencies, pure logic, hooks
- **Integration (~25%)** — components + their real children + mocked API layer
- **E2E (~5%)** — critical user flows only (Playwright/Cypress)

### What to Avoid

- `getByTestId` as a first resort — use semantic queries
- Over-mocking: mock at the API boundary, not at component children
- Testing implementation details (internal state, class names)
- Skipped tests (`it.skip`) without a tracked issue

### DAMP Over DRY in Tests

Descriptive And Meaningful Phrases — it's fine to repeat setup in tests if it makes
each test self-explanatory. Don't abstract so aggressively that the test intent is buried.

## Output format

For each feature/fix, provide:
1. The failing test first (RED) — in a code block labelled `test (RED)`
2. The minimal implementation (GREEN) — labelled `implementation (GREEN)`
3. Any refactor changes (REFACTOR) — labelled `refactor`

If fixing a bug, include the reproduction test before the fix.
