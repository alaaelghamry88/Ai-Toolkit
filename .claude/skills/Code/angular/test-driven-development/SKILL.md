---
name: test-driven-development
description: Applies Red-Green-Refactor TDD methodology for Angular components and services.
  Use when writing new features, fixing bugs, or adding behaviour to Angular code.
  Tests are written before implementation.
  Adapted from agent-skills/test-driven-development (Angular variant).
invocation: auto
---

## Instructions

> Source: adapted from addyosmani/agent-skills — test-driven-development (Angular variant)

**Rule: Write a failing test before writing the code that makes it pass.**

### The TDD Cycle

**RED** → **GREEN** → **REFACTOR** (same as React variant)

### Angular-Specific Test Setup

Read `.claude/config.md` → use `test-runner` value.

Default setup:
```
Karma + Jasmine  (legacy)
Vitest + Angular Testing Library  (preferred for new projects)
Jest + jest-preset-angular  (common alternative)
```

<!-- TODO: Confirm test runner for this project -->

Always use `TestBed` for component and service tests.

### Component Test Structure

```typescript
describe('MyComponent', () => {
  let fixture: ComponentFixture<MyComponent>
  let component: MyComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent], // standalone
    }).compileComponents()
    fixture = TestBed.createComponent(MyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should render with default input', () => {
    // Arrange — set @Input via component instance
    component.label = 'Submit'
    fixture.detectChanges()
    // Assert
    const el = fixture.nativeElement.querySelector('button')
    expect(el.textContent).toContain('Submit')
  })
})
```

### Service Test Structure

```typescript
describe('MyService', () => {
  let service: MyService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MyService],
    })
    service = TestBed.inject(MyService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => httpMock.verify())
})
```

### The Prove-It Pattern for Bug Fixes

Same as React variant: reproduce → test fails → fix → test passes → run full suite.

### Test Pyramid Targets (Angular)

- **Unit (~70%)** — services, pipes, pure functions, component logic with mocked deps
- **Integration (~25%)** — component + template + child components (no HTTP)
- **E2E (~5%)** — critical user flows (Cypress or Playwright)

### What to Avoid

- `NO_ERRORS_SCHEMA` — hides real template errors
- Over-broad `imports` in TestBed — only import what is needed
- Testing implementation details (private methods, internal signals)
- Skipped specs without a tracked issue

## Output format

Same as React variant:
1. Failing test first (RED)
2. Minimal implementation (GREEN)
3. Refactor if any

Label each block accordingly.
