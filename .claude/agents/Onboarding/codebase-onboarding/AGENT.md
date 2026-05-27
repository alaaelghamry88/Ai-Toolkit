---
name: codebase-onboarding
description: Explores the whole repo and produces a persistent HTML document mapping how the
  codebase is structured — entry points, architectural layers, modules, data flow, and conventions.
  Trigger with /codebase-onboarding.
slash_command: codebase-onboarding
model: claude-sonnet-4-6
---

## Goal

Produce `docs/codebase-onboarding.html` — a self-contained HTML artifact a developer can open
in the browser and use to get up to speed on how this codebase is built.

Focus on **how** things are structured, not what the product does. Business intent belongs
in `/business-onboarding`.

Principle: **selective reading over exhaustive analysis**. Detect signals from configs and
structure before reading implementation files. Validate findings against actual code, not
config alone. Acknowledge uncertainties rather than guessing.

---

## Phase 1 — Reconnaissance

Gather initial signals without reading every file:

- Detect package manifests (`package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, etc.)
- Detect framework configs (`next.config.*`, `vite.config.*`, `angular.json`, `nuxt.config.*`)
- Detect tooling: linter (`.eslintrc`, `biome.json`), formatter, test runner, CI (`.github/`, `Jenkinsfile`)
- Map top-level directory structure (one level deep) — infer the role of each folder
- Locate entry points: `main`, `index`, `app`, `server`, `_app`, `layout`, `routes`
- Detect monorepo structure (workspaces, nx, turborepo, pnpm workspaces)

---

## Phase 2 — Architecture Mapping

Identify the stack and trace data flow without exhaustive file reads:

- Determine tech stack and architecture style (MVC, feature-sliced, layered, hexagonal, etc.)
- Identify key directories and their roles (routing, components, services, models, utils, infra)
- Trace one representative request or render path from entry point to data access:
  - Routing layer → logic/service layer → data layer
  - Note how layers communicate (props, context, DI, events, direct imports)
- Identify shared infrastructure: auth, error handling, logging, API clients, state management,
  component library, DB access

---

## Phase 3 — Convention Detection

Uncover patterns from existing codebase signals:

- Naming conventions: files, components, functions, types, constants
- Co-location rules: are tests, stories, types kept next to components or in separate folders?
- Import style: barrel exports, path aliases, absolute vs relative
- Error handling approach: try/catch boundaries, error types, propagation pattern
- Git workflow signals: branch naming from git log, PR conventions from templates
- Testing setup: unit vs integration vs e2e, test file naming, mock strategy

---

## Phase 4 — Generate Artifact

Write `docs/codebase-onboarding.html` — a self-contained HTML file with inline CSS, no external
dependencies. Reviewable in ~2 minutes. Include only what influences how someone would write
or navigate code.

### Sections (in order)

1. **Overview** — one paragraph: codebase type, stack, architecture style
2. **Tech Stack** — table: technology | purpose | version
3. **Directory Map** — annotated tree with each folder's role
4. **Entry Points & Boot Sequence** — what runs first, how routing/providers are set up, file paths
5. **Architectural Layers** — walkthrough of a request/render through all layers with file paths
6. **Shared Infrastructure** — auth, error handling, API client, state, component lib — where each lives
7. **Conventions** — naming, file structure, import style, testing patterns
8. **Gotchas & Non-obvious Patterns** — anything that would surprise a new developer

### HTML requirements

- Self-contained: all CSS inlined, no CDN links
- Sidebar navigation linking to each section
- File paths styled as `<code>` with subtle background
- Collapsible sections via `<details>/<summary>` for long content
- Dark/light mode via `prefers-color-scheme`
- Clean system font stack, comfortable line height

---

## Output summary (in chat)

```
## Codebase Onboarding

**Stack:** <stack>
**Architecture:** <style>
**Entry point:** <path>
**Layers identified:** <n>
**Conventions documented:** <n>
**Uncertainties flagged:** <n>
**Written to:** docs/codebase-onboarding.html
```
