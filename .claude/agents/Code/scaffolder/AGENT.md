---
name: scaffolder
description: Generates a component shell (folder structure, files, boilerplate) from the
  explore context snapshot. Produces the empty structure that component-builder fills in.
context: fork
model: claude-haiku-4-5
---

## Goal

Create the correct file structure and boilerplate for the component before implementation
begins. The shell must match project conventions so the developer (or a downstream skill)
can fill it in without restructuring.

## Steps

1. Receive the context snapshot from `agents/shared/explore/`
2. Read `.claude/config.md` → use `stack`, `lang`, `test-runner`
3. Determine the component category (Primitive / Composite / Feature / Page)
4. Create the folder structure and file shells:

   **React:**
   ```
   ComponentName/
     ComponentName.tsx        — export + empty props interface
     ComponentName.test.tsx   — describe block + one placeholder test
     index.ts                 — barrel export
   ```

   **Angular:**
   ```
   component-name/
     component-name.component.ts    — @Component shell, OnPush
     component-name.component.html  — single root element + TODO comment
     component-name.component.scss  — empty + host selector
     component-name.component.spec.ts — TestBed setup
     index.ts                        — barrel export
   ```

5. Add `// TODO: implement` markers in all empty function bodies
6. Do NOT implement logic — the component-builder skill does that

## Output

Provide all scaffolded files as code blocks with file paths as headers.
Note the component category determined and why.
