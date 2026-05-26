# Frontend AI Toolkit

A portable AI workflow toolkit for frontend teams. Skills, Agents, and context-aware
prompts structured into `.claude/` — loaded natively by Claude Code.

---

## Quick Start

1. **Set your stack** — edit `config.md` (defaults to React + Tailwind + TypeScript)
2. **Trigger a bundle** — type a slash command in Claude Code
3. **Or describe your task** — skills auto-activate from your description

## Slash Commands

| Command | What it does |
|---------|-------------|
| `/design` | Figma → component, tokens, responsive layout, a11y check |
| `/code` | Scaffold component, write tests, implement |
| `/debug` | Reproduce → localize → fix → guard |
| `/review` | Standards check → flag issues → suggest fixes |

## How It Works

Every workflow follows the same sequence:
1. Agent reads `config.md` → knows stack, styling, test-runner
2. `agents/shared/explore/` runs → maps current file context and imports
3. Agent selects the matching `react/` or `angular/` skill variant
4. Skill executes → structured output back to you

## Folder Structure

```
.claude/
├── config.md          ← edit this first
├── manifest.md        ← skill registry
├── agents/shared/     ← explore + summarise (always active)
├── skills/
│   ├── Design/        ← figma, tokens, responsive, performance
│   ├── Code/          ← component builder, TDD
│   ├── Debug/         ← hook debugger, profiler, error recovery
│   └── Review/        ← code review, a11y, PR checklist
├── agents/            ← orchestrators + sub-agents per bundle
└── scripts/           ← export to Cursor / Copilot
```

## Contribution

- New skill for one bundle → add inside that bundle's `skills/` folder
- Stack-specific → `react/` or `angular/` subfolder
- Stack-agnostic → `shared/` subfolder
- Improve existing skill → edit the `SKILL.md` directly and commit

## Export for Other Tools

```bash
node .claude/scripts/export-cursor.js    # → .cursor/
node .claude/scripts/export-copilot.js  # → .github/copilot-instructions.md
```

Both scripts read `config.md` and export only the matching stack variant.
