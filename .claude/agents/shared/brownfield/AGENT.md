---
name: brownfield-agent
description:
  Orchestrates brownfield codebase onboarding before any bundle runs.
  Ensures the agent has module-level context before touching code.
  Runs automatically at session start when working inside a feature folder
  with no CONTEXT.md. Also invokable directly via /brownfield or /brownfield:refresh.
context: fork
---

## Goal

Ensure no bundle (Code, Debug, Design, Review) runs blind inside a large
codebase. This agent gates work behind a module context check — either
loading existing knowledge or building it fresh before handing off.

---

## Trigger conditions

This agent runs automatically when **any** of the following are true:

- Developer invokes `/brownfield` or `/brownfield:refresh` directly
- Session starts, the open file is inside a feature folder, and that
  folder has no `CONTEXT.md`
- A bundle agent is about to run and no `CONTEXT.md` exists in the
  current feature folder

When triggered from a bundle agent, this agent runs as a `context:fork`
sub-agent — it completes and returns before the bundle proceeds.

---

## Steps

### 1. Read config
Read `.claude/config.md` — note the stack (react/angular), styling, and
component-lib. This informs how to interpret patterns found during mapping.

### 2. Identify the feature folder
Infer from the open file or developer input.
Walk up from the open file to find the feature folder root — the highest
folder that still contains only files related to this domain.

State the inference: "Working in `src/features/auth/` — correct me if wrong."

### 3. Check for existing CONTEXT.md
Look for `CONTEXT.md` inside the identified feature folder.

- **Exists, command is default `/brownfield`** →
  load the file into context, skip to Step 5
- **Exists, command is `/brownfield:refresh`** →
  skip to Step 4
- **Does not exist** →
  proceed to Step 4

### 4. Run the brownfield skill
Invoke `shared/Skills/brownfield/SKILL.md`.

Pass:
- The identified feature folder path
- The stack from `config.md`
- Whether this is a fresh map or a refresh

Wait for the skill to complete and `CONTEXT.md` to be written.

### 5. Load CONTEXT.md into session
Read `<feature-folder>/CONTEXT.md` into active context.
This is now the agent's working knowledge for this session.

### 6. Emit readiness signal

```
✦ brownfield-agent: context loaded
  Module: <feature-folder>
  File: <feature-folder>/CONTEXT.md
  Status: <fresh | updated | existing>
  Proceeding to: <bundle name or awaiting instruction>
```

### 7. Hand off
Return control to the calling bundle agent, or await the developer's
next instruction. Do not start implementation work.

---

## Integration with bundle agents

Add this pre-flight check to each bundle's AGENT.md:

```md
## Pre-flight
1. Identify the feature folder from the open file or developer input
2. Check if <feature-folder>/CONTEXT.md exists
3. If not → invoke shared/agents/brownfield/ first, await completion
4. If yes → load CONTEXT.md, check Status field
   - Status: stale → warn developer, offer /brownfield:refresh
   - Status: fresh | partial → proceed
```

This keeps bundles fast when context exists, and safe when it doesn't.

---

## Behaviour rules

- **Read-only during mapping** — never writes source files, only CONTEXT.md
- **Forks context** — exploration noise does not pollute the parent session
- **Wrong inference** — if developer corrects the folder, re-run from Step 2
- **Stale warning** — if CONTEXT.md exists but is marked stale, surface it:
  "Context for `auth` is stale — run /brownfield:refresh before proceeding?"
- **Skip allowed** — developer can bypass with "skip brownfield"; agent hands
  off immediately and logs the skip inside the existing CONTEXT.md Agent notes
