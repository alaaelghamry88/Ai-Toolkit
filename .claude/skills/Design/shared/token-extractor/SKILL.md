---
name: token-extractor
description: Extracts design tokens from a Figma file, CSS, or existing codebase and
  generates a structured token file. Use when setting up a new project's token system,
  syncing tokens from Figma, or auditing token usage across the codebase.
invocation: auto
---

## Instructions

1. Read `.claude/config.md` — note stack, styling, component-lib
2. Run `agents/shared/explore/` to check if a token file already exists

<!-- TODO: Define token source — Figma Tokens plugin export, Style Dictionary JSON, or manual CSS audit -->
<!-- TODO: Define token output format — CSS custom properties, Tailwind config, Style Dictionary, or JS object -->

3. Identify token categories to extract:
   - **Color** — brand, semantic (success/warning/error/info), neutral scale
   - **Typography** — font families, size scale, weight, line-height, letter-spacing
   - **Spacing** — base unit, scale multipliers
   - **Radius** — border-radius values
   - **Shadow** — elevation levels
   - **Motion** — duration, easing curves

4. For each category:
   - Extract raw values
   - Apply naming convention: `{category}-{variant}-{modifier}` (e.g. `color-brand-primary`)
   - Check for duplicates — consolidate where values are identical

5. Generate the token file in the target format:
   - CSS custom properties → `tokens.css`
   - Tailwind config extension → `tailwind.config.ts`
   - JS/TS object → `tokens.ts`

6. Audit usage: grep the codebase for hardcoded values that should be tokens — report as **Token leaks**

## Output format

Provide the generated token file as a code block.
List any **Token leaks** found with file path and line number.
List any token values that conflict with existing definitions as **Token conflicts**.
