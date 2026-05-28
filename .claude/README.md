# Frontend AI Toolkit

A portable AI workflow toolkit for frontend teams. Skills, Agents, Hooks, and
context-aware prompts structured into `.claude/` — loaded natively by Claude Code.

---

## Quick Start

1. **Set your stack** — edit `config.md` (stack, styling, lang, component-lib, test-runner)
2. **Complete project setup** — fill in the TODOs listed in the [Project Setup](#project-setup) section below
3. **Trigger a bundle** — type a slash command in Claude Code
4. **Or describe your task** — skills auto-activate from your description

---

## Slash Commands

| Command | What it does |
|---------|-------------|
| `/code` | Scaffold component shell → write tests → implement |
| `/design` | Figma → component, token extraction, responsive layout, a11y check |
| `/debug` | Reproduce bug → localize → fix → add guard test |
| `/review` | Standards check → five-axis review → a11y audit → fix suggestions |
| `/codebase-onboarding` | Generate a persistent HTML map of codebase structure |

---

## Skills Inventory

### Code

| Skill | Stack | What it does |
|-------|-------|-------------|
| `component-builder` | React + Angular | Builds components from spec following team conventions |
| `test-driven-development` | React + Angular | Red-Green-Refactor TDD cycle |
| `refactor` | Shared | Test-gated structural refactoring — no behaviour changes allowed |
| `frontend-ui-engineering` | Shared | Production UI quality: design system adherence, WCAG 2.1 AA |
| `vercel-react-best-practices` | React | Performance rules: re-render, bundle, async, server components |

### Design

| Skill | Stack | What it does |
|-------|-------|-------------|
| `figma-to-jsx` | React | Figma spec → JSX component with tokens |
| `figma-to-component` | Angular | Figma spec → Angular component with tokens |
| `responsive-scaffold` | React + Angular | Responsive layout scaffolding at standard breakpoints |
| `token-extractor` | Shared | Extracts design tokens from Figma or existing code |
| `web-design-guidelines` | Shared | Web interface quality standards |
| `web-performance` | Shared | Performance audit and optimisation patterns |
| `vercel-react-view-transitions` | React | View Transition API patterns for navigation and animation |

### Debug

| Skill | Stack | What it does |
|-------|-------|-------------|
| `hook-debugger` | React | Diagnoses React hook lifecycle issues |
| `perf-profiler` | React + Angular | Performance profiling workflow |
| `change-detection` | Angular | Angular change detection debugging |
| `debugging-and-error-recovery` | Shared | Root-cause analysis and error recovery patterns |

### Review

| Skill | Stack | What it does |
|-------|-------|-------------|
| `code-review-and-quality` | React + Angular | Five-axis review: correctness, readability, architecture, security, performance |
| `a11y-standards` | Shared | WCAG 2.1 AA accessibility audit |
| `pr-checklist` | Shared | Team PR gates before merge |

### Shared

| Skill | Stack | What it does |
|-------|-------|-------------|
| `brownfield` | Shared | Loads feature-folder context for existing codebases before any bundle runs |

---

## Agents

Each bundle is orchestrated by an agent that forks sub-agents as needed:

| Bundle | Orchestrator | Sub-agents |
|--------|-------------|-----------|
| Code | `code-agent` | `explore`, `scaffolder`, `test-generator` |
| Design | `design-agent` | `explore`, `figma-parser`, `a11y-checker` |
| Debug | `debug-agent` | `explore`, `repro-builder`, `fix-suggester` |
| Review | `review-agent` | `explore`, `standards-checker`, `fix-suggester` |
| Onboarding | `codebase-onboarding` | — |
| Shared | `explore`, `summarise`, `brownfield` | — |

---

## Hooks

Two hooks run automatically on every file write or edit:

| Hook | Trigger | What it does |
|------|---------|-------------|
| `config-guard` | PreToolUse — Write + Edit | Blocks code file generation if `.claude/config.md` is missing or has no `stack:` value |
| `lint-gate` | PostToolUse — Write + Edit | Runs ESLint on changed `.ts/.tsx/.js/.jsx` files and surfaces errors back to the agent |

The lint gate only fires if `node_modules/.bin/eslint` exists — it is safe in projects without ESLint installed.

---

## How It Works

Every workflow follows the same sequence:

1. Agent reads `config.md` → knows stack, styling, component-lib, test-runner
2. `agents/shared/explore/` forks → maps current file context and imports
3. Agent selects the matching `react/` or `angular/` skill variant
4. Skill executes with project-aware context → structured output

---

## Project Setup

**These TODOs must be filled in before the toolkit works correctly for your team.**
Search for `TODO` comments across `.claude/` — each one marks a project-specific decision that the base toolkit cannot make for you.

| # | What to configure | Files |
|---|-------------------|-------|
| 1 | Stack declaration | `config.md` |
| 2 | Component naming, co-location, Storybook, state libraries | `skills/Code/*/component-builder/SKILL.md` |
| 3 | PR coverage threshold, description format, branch naming, Lighthouse gate | `skills/Review/shared/pr-checklist/SKILL.md` |
| 4 | Team naming rules and custom standards | `agents/Review/standards-checker/AGENT.md` |
| 5 | Design token file path, source, and output format | `skills/Design/*/figma-to-*/SKILL.md`, `skills/Design/shared/token-extractor/SKILL.md` |
| 6 | How Figma specs are provided and credential management | `agents/Design/figma-parser/AGENT.md` |
| 7 | Breakpoint scale and CDK BreakpointObserver usage | `skills/Design/*/responsive-scaffold/SKILL.md` |
| 8 | DevTools availability, Zone.js vs zoneless | `skills/Debug/*/SKILL.md` |

---

## Folder Structure

```
.claude/
├── config.md              ← edit this first
├── manifest.md            ← skill registry
├── settings.json          ← hook configuration
├── hooks/
│   ├── config-guard.js    ← pre-write stack check
│   └── lint-gate.js       ← post-write ESLint gate
├── agents/
│   ├── shared/            ← explore, summarise, brownfield
│   ├── Code/              ← code-agent, scaffolder, test-generator
│   ├── Design/            ← design-agent, figma-parser, a11y-checker
│   ├── Debug/             ← debug-agent, repro-builder, fix-suggester
│   ├── Review/            ← review-agent, standards-checker, fix-suggester
│   └── Onboarding/        ← codebase-onboarding, business-onboarding
├── skills/
│   ├── Code/              ← component-builder, TDD, refactor, frontend-ui-engineering
│   ├── Design/            ← figma, tokens, responsive, performance, view-transitions
│   ├── Debug/             ← hook-debugger, change-detection, perf-profiler, error-recovery
│   ├── Review/            ← code-review, a11y, pr-checklist
│   └── shared/            ← brownfield
└── scripts/
    ├── export-cursor.js   ← export to .cursor/
    └── export-copilot.js  ← export to .github/copilot-instructions.md
```

---

## Contribution

- New skill for one bundle → add inside that bundle's `skills/` folder
- Stack-specific → `react/` or `angular/` subfolder
- Stack-agnostic → `shared/` subfolder
- New agent → add `AGENT.md` inside the matching `agents/` bundle folder
- Update `manifest.md` when adding any skill or agent

## Export for Other Tools

```bash
node .claude/scripts/export-cursor.js    # → .cursor/
node .claude/scripts/export-copilot.js  # → .github/copilot-instructions.md
```

Both scripts read `config.md` and export only the matching stack variant.
