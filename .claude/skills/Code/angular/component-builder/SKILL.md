---
name: component-builder
description: Builds an Angular component from a description, design spec, or requirements.
  Use when creating new UI components, implementing layouts, or scaffolding Angular
  component structure. Follows team conventions for naming, modules, and component-lib usage.
user-invocable: false
---

## Instructions

1. Read `.claude/config.md` — use styling, component-lib, lang, test-runner
2. Run `agents/shared/explore/` on the target module/feature folder

<!-- TODO: Define team naming convention (kebab-case selector prefix, e.g. app-button) -->
<!-- TODO: Define standalone component vs NgModule convention for this project -->
<!-- TODO: Specify if Storybook is in use -->

3. Determine component category (same taxonomy as React variant):
   Primitive / Composite / Feature / Page (Smart)

4. Build the component:
   - `@Component` decorator with `standalone: true` unless NgModule required
   - `changeDetection: ChangeDetectionStrategy.OnPush` — always
   - Typed `@Input()` with `required: true` where applicable (Angular 16+)
   - `@Output()` with `EventEmitter` for user actions
   - Use Angular Material / CDK components before building from scratch
   - SCSS encapsulated — use `ViewEncapsulation.Emulated` (default)

5. State management:
   - Local: component state via signals (`signal()`, `computed()`) or `@Input`/`@Output`
   - Shared: inject a dedicated service (not the component's concern)
   - Server state: `HttpClient` in a service + `AsyncPipe` in template

   <!-- TODO: Confirm if NgRx, Akita, or another state lib is in use -->

6. Write spec file:
   - `TestBed.configureTestingModule` with minimal imports
   - Test `@Input()` bindings, `@Output()` emissions, and template rendering
   - Use `By.css()` sparingly — prefer element roles and labels

7. Export from the feature module or barrel `index.ts`

## Output format

```
component-name/
  component-name.component.ts
  component-name.component.html
  component-name.component.scss
  component-name.component.spec.ts
  index.ts (if new folder)
```

Provide each file as a separate code block.
