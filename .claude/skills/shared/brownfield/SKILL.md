---
name: brownfield
description:
  Maps, understands, and persists knowledge about an existing module or area of
  the codebase. Use when starting work in an unfamiliar part of a large codebase,
  when the agent needs to understand existing patterns before making changes, or
  when tacit codebase knowledge should be captured for future sessions.
  Produces a persistent CONTEXT.md file inside the feature folder that compounds over time.
user-invocable: false
---

## Invocation

| Command | Behavior |
|---------|----------|
| `/brownfield` | Infer module from open file, append to existing CONTEXT.md |
| `/brownfield <module>` | Explicit module path, append to existing CONTEXT.md |
| `/brownfield:refresh` | Full rewrite of the module CONTEXT.md |

## Purpose

This skill solves three problems in large brownfield codebases:

1. **Context loss** — agent forgets what it saw in a previous session
2. **Blind changes** — agent modifies files without understanding their dependents
3. **Slow exploration** — agent re-explores the same ground every session

It does this by writing a `CONTEXT.md` file directly inside the feature folder.
The file lives with the code it describes, moves when the folder moves, and
grows as the agent learns more across sessions.

---

## Step 1 — Identify the feature folder

If the developer provided a module path (e.g. `/brownfield src/features/auth`), use that.

Otherwise infer from context:
- What is the open file? Walk up to find its feature folder root.
- The feature folder is the highest folder that still contains only files
  related to this domain — stop before reaching `src/` or `app/` root.
- State your inference explicitly:
  "I'm treating `src/features/auth/` as the module root — correct me if wrong."

---

## Step 2 — Check for existing CONTEXT.md

Look for `CONTEXT.md` inside the identified feature folder.

- **File exists + command is `/brownfield`** → read it first, then run
  Step 3 focused only on what has changed or is missing. Append findings.
- **File exists + command is `/brownfield:refresh`** → ignore existing file,
  run full Step 3, rewrite from scratch.
- **File does not exist** → run full Step 3, create the file.

---

## Step 3 — Map the module

Work through these in order. Be surgical — navigate by following imports
from entry points. Do not scan the full codebase.

### 3a. Entry points
- What are the main files for this module? (index, barrel, route, page component)
- What is the public API surface? (exports, props, events, hooks)

### 3b. Dependency boundary
- What does this module import from outside itself?
- What imports this module from outside?
- Flag any circular dependencies or unusual coupling.

### 3c. Existing patterns and conventions
- What naming conventions are in use? (files, components, variables, CSS)
- What state management pattern is used here? (local, context, store)
- What data-fetching pattern? (hooks, services, loaders)
- Any non-obvious abstractions a new developer would need explained?

### 3d. Fragility map
- Files imported by many others (high blast radius if changed)
- Files with no tests or unclear ownership
- TODOs, FIXMEs, or commented-out code worth flagging
- Anything the agent has previously gotten wrong — captured as a warning

### 3e. Integration points
- Which external services, APIs, or stores does this module talk to?
- Any timing sensitivities, rate limits, or side effects to be aware of?

---

## Step 4 — Write CONTEXT.md

Write to `<feature-folder>/CONTEXT.md` using this structure:

```md
# <module> — Agent Context
_Last updated: <date> | Status: <fresh | stale | partial>_

## Entry points
<list of main files with one-line descriptions>

## Dependency boundary
<what flows in, what flows out, any notable coupling>

## Patterns and conventions
<naming, state, data-fetching patterns specific to this module>

## Fragility map
<high blast-radius files, untested areas, FIXMEs worth knowing>

## Integration points
<external services, APIs, timing concerns>

## Agent notes
<things the agent got wrong, learned the hard way, or wants future sessions to know>
```

Rules for writing:
- Be concise. This file loads into context every session — token cost matters.
- Write for an agent, not a human. No padding, no preamble.
- Use file paths relative to the feature folder root.
- If something is uncertain, say so explicitly rather than guessing.
- **Agent notes are additive only** — never delete a previous note, only append.
  This section is institutional memory that compounds across sessions.

---

## Step 5 — Confirm and hand off

After writing the file, output a short summary:

```
✦ brownfield: <module>
  Context file: <feature-folder>/CONTEXT.md
  Action: <created | updated | refreshed>
  Mapped: <N> entry points · <N> dependencies · <N> fragility flags
  Ready for: <next bundle or task>
```

Then hand off cleanly. Do not start implementing — that belongs to the
relevant bundle (Code, Debug, Design, Review).

---

## Behaviour rules

- **Never modify source files** during this skill. Read-only.
- **Never load the full file tree** — navigate by following imports from entry points.
- **Stale marker** — if `CONTEXT.md` is older than 2 weeks and the folder has
  recent git activity, prepend `Status: stale` and note it in the summary.
- **Wrong inference** — if the developer corrects the folder, re-run from Step 1.
- **Skip allowed** — if the developer says "skip brownfield", hand off immediately
  and append a note to `CONTEXT.md`: `Agent note: session skipped <date> by developer request.`
