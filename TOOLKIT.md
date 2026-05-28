# Frontend AI Toolkit — Build Spec

A complete reference for building the `.claude/` frontend AI toolkit repo.
Hand this to Claude Code to scaffold the full structure.

---

## What This Is

A portable AI workflow toolkit for frontend teams. It packages Skills, Agents, and
context-aware prompts into a structured `.claude/` folder that Claude Code reads natively.

**Three goals:**
1. Onboard any developer — regardless of AI experience — into agentic workflows fast
2. Enforce a consistent, generalized process across all frontend projects
3. Share team knowledge through versioned, commitable `.md` files

---

## How Developers Use It

Three interaction modes in Claude Code:

| Mode | How | When |
|---|---|---|
| Full bundle | `/code` `/design` `/debug` `/review` | Want the complete workflow |
| Auto-activate | Describe task naturally | Skill matches from `description` frontmatter |
| Direct skill | `@component-builder` | Want one focused thing |

**The agent always runs first:**
1. Developer triggers bundle or describes task
2. Agent reads `config.md` → knows the stack
3. `shared/agents/explore/` runs → reads open file + imports, maps context
4. Agent picks the right skill variant (react or angular)
5. Executes → structured output back to developer

---

## Folder Structure

```
.claude/
├── config.md                        # Stack declaration — set once per project
├── manifest.md                      # Native marketplace skills + install links
├── README.md                        # Onboarding — start here
├── scripts/
│   ├── export-cursor.js             # Export to .cursor/ when needed (secondary tool)
│   └── export-copilot.js            # Export to .github/ when needed (secondary tool)
│
├── shared/                          # Cross-bundle — always included
│   └── agents/
│       ├── explore/
│       │   └── AGENT.md             # context:fork — reads file + imports, maps deps
│       └── summarise/
│           └── AGENT.md             # context:fork — condenses context for agent
│
├── skills/
│   ├── Design/
│   │   ├── react/
│   │   │   ├── figma-to-jsx/
│   │   │   │   └── SKILL.md
│   │   │   └── responsive-scaffold/
│   │   │       └── SKILL.md
│   │   ├── angular/
│   │   │   ├── figma-to-component/
│   │   │   │   └── SKILL.md
│   │   │   └── responsive-scaffold/
│   │   │       └── SKILL.md
│   │   └── shared/
│   │       ├── token-extractor/
│   │       │   └── SKILL.md
│   │       └── web-performance/     # from agent-skills
│   │           └── SKILL.md
│   │
│   ├── Code/
│   │   ├── react/
│   │   │   ├── component-builder/
│   │   │   │   └── SKILL.md
│   │   │   └── test-driven-development/ # from agent-skills (react variant)
│   │   │       └── SKILL.md
│   │   ├── angular/
│   │   │   ├── component-builder/
│   │   │   │   └── SKILL.md
│   │   │   └── test-driven-development/ # from agent-skills (angular variant)
│   │   │       └── SKILL.md
│   │   └── shared/
│   │       └── frontend-ui-engineering/ # from agent-skills
│   │           └── SKILL.md
│   │
│   ├── Debug/
│   │   ├── react/
│   │   │   ├── hook-debugger/
│   │   │   │   └── SKILL.md
│   │   │   └── perf-profiler/
│   │   │       └── SKILL.md
│   │   ├── angular/
│   │   │   ├── change-detection/
│   │   │   │   └── SKILL.md
│   │   │   └── perf-profiler/
│   │   │       └── SKILL.md
│   │   └── shared/
│   │       └── debugging-and-error-recovery/ # from agent-skills
│   │           └── SKILL.md
│   │
│   └── Review/
│       ├── react/
│       │   └── code-review-and-quality/ # from agent-skills (react variant)
│       │       └── SKILL.md
│       ├── angular/
│       │   └── code-review-and-quality/ # from agent-skills (angular variant)
│       │       └── SKILL.md
│       └── shared/
│           ├── pr-checklist/
│           │   └── SKILL.md
│           └── a11y-standards/          # from agent-skills
│               └── SKILL.md
│
└── agents/
    ├── Design/
    │   ├── design-agent/
    │   │   └── AGENT.md             # orchestrator
    │   ├── figma-parser/
    │   │   └── AGENT.md             # context:fork
    │   └── a11y-checker/
    │       └── AGENT.md             # context:fork
    │
    ├── Code/
    │   ├── code-agent/
    │   │   └── AGENT.md             # orchestrator
    │   ├── scaffolder/
    │   │   └── AGENT.md             # context:fork
    │   └── test-generator/
    │       └── AGENT.md             # context:fork
    │
    ├── Debug/
    │   ├── debug-agent/
    │   │   └── AGENT.md             # orchestrator
    │   ├── repro-builder/
    │   │   └── AGENT.md             # context:fork
    │   └── fix-suggester/
    │       └── AGENT.md             # context:fork
    │
    └── Review/
        ├── review-agent/
        │   └── AGENT.md             # orchestrator
        ├── standards-checker/
        │   └── AGENT.md             # context:fork
        └── fix-suggester/
            └── AGENT.md             # context:fork
```

---

## config.md — Set Once Per Project

```md
# Project Config

stack: react
styling: tailwind
lang: typescript
component-lib: shadcn
test-runner: vitest
```

Agents read this first. Stack determines which `react/` or `angular/`
skill variant gets loaded. Never edit tool folders directly — always edit here.

---

## SKILL.md Anatomy — Open Standard

Every skill folder contains one required file: `SKILL.md`.
Optional: `resources/`, `examples/` loaded on demand.

```md
---
name: component-builder
description: Builds React components from description or Figma spec.
  Use when creating new UI components, implementing layouts, or
  scaffolding component structure.
user-invocable: false
---

## Instructions

1. Read .claude/config.md — use stack, styling, component-lib values
2. [skill-specific instructions here]

## Output format

[what the developer receives]
```

The `description` field is what Claude Code uses for auto-activation.
Write it as "Use when..." so matching is precise.

---

## AGENT.md Anatomy

```md
---
name: code-agent
description: Orchestrates the full code writing workflow.
---

## Goal
[what this agent achieves]

## Steps
1. Read .claude/config.md
2. Run shared/agents/explore/ — understand current file context
3. Select skill variant based on config.stack
4. [agent-specific steps]

## Output
[structured output format]
```

For sub-agents (context:fork), add to frontmatter:

```md
---
name: scaffolder
description: Generates component shell from explore context.
context: fork
---
```

---

## Skills Origin

| Skill | Origin | Notes |
|---|---|---|
| `frontend-ui-engineering` | agent-skills | Use as-is in shared/ |
| `test-driven-development` | agent-skills | Fork into react/ + angular/ variants |
| `web-performance` | agent-skills | Use as-is in Design/shared/ |
| `debugging-and-error-recovery` | agent-skills | Use as-is in Debug/shared/ |
| `code-review-and-quality` | agent-skills | Fork into react/ + angular/ variants |
| `a11y-standards` | agent-skills | Use as-is in Review/shared/ |
| `context-engineering` | agent-skills | Powers the explore agent |
| `component-builder` | custom | Team conventions, naming, component-lib |
| `figma-to-jsx` | custom | React-specific Figma handoff |
| `figma-to-component` | custom | Angular-specific Figma handoff |
| `token-extractor` | custom | Stack-agnostic design tokens |
| `responsive-scaffold` | custom | Fork per stack |
| `hook-debugger` | custom | React hook lifecycle debugging |
| `change-detection` | custom | Angular change detection debugging |
| `perf-profiler` | custom | Fork per stack |
| `pr-checklist` | custom | Team-specific PR gates |

Source for agent-skills content:
`https://github.com/addyosmani/agent-skills`

---

## Slash Commands

Each bundle's orchestrating agent maps to a slash command.
Declared in the agent's AGENT.md, picked up by Claude Code automatically.

| Command | Agent | Sequence |
|---|---|---|
| `/design` | design-agent | explore → tokens → build → a11y |
| `/code` | code-agent | explore → scaffold → test |
| `/debug` | debug-agent | explore → reproduce → locate → fix |
| `/review` | review-agent | explore → standards → flag → suggest |

---

## Secondary Tool Export

For team members using Cursor or Copilot, run once:

```bash
node .claude/scripts/export-cursor.js   # → .cursor/skills/ + .cursor/rules/
node .claude/scripts/export-copilot.js  # → .github/copilot-instructions.md
```

Both scripts read `config.md` and export only the matching stack variant.
Re-run after adding new skills. Never edit `.cursor/` or `.github/` directly.

---

## Contribution Rules

- **New skill for one bundle** → add inside that bundle's `Skills/` folder
- **New skill for all bundles** → add to `shared/`
- **Stack-specific** → add under `react/` or `angular/` subfolder
- **Stack-agnostic** → add under `shared/` subfolder
- **New agent** → add to the relevant bundle's `Agents/` folder
- **Sub-agent** → same as agent, add `context: fork` to frontmatter
- **Improves existing skill** → edit the `SKILL.md` directly, commit — team gets it on next pull

---

## Build Order for Claude Code

Build in this sequence — each step depends on the previous:

1. `config.md` + `manifest.md` + `README.md`
2. `shared/agents/explore/AGENT.md` + `shared/agents/summarise/AGENT.md`
3. All `SKILL.md` files — start with `Design/` (top priority)
4. All `AGENT.md` orchestrators — one per bundle
5. All `AGENT.md` sub-agents (context:fork) — per bundle
6. `scripts/export-cursor.js` + `scripts/export-copilot.js`

---

## What to Tell Claude Code

> "Build the frontend AI toolkit using the spec in TOOLKIT.md.
> Scaffold the full folder structure first, then fill in each file
> starting with Design bundle. Use the agent-skills repo at
> https://github.com/addyosmani/agent-skills as the source for
> adopted skills — copy and adapt their SKILL.md content.
> Custom skills should have placeholder instructions marked TODO.
> config.md should default to stack: react."
