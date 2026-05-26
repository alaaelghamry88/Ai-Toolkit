---
name: figma-parser
description: Parses a Figma design input (link, screenshot, or frame JSON) and extracts
  structured component data — layout, spacing, colors, typography, and component hierarchy.
context: fork
model: claude-sonnet-4-6
---

## Goal

Produce structured design data from a Figma input that downstream skills (figma-to-jsx,
figma-to-component, token-extractor) can consume without re-parsing the design.

## Steps

1. Receive design input from parent agent (link / screenshot / JSON)
2. Identify the design input type:
   - **Figma URL** → note frame ID, request developer to export frame JSON or use Figma API
   - **Screenshot** → analyse image for layout structure, spacing, and component hierarchy
   - **Frame JSON** → parse directly

   <!-- TODO: Define if Figma API access is available and how credentials are managed -->

3. Extract and structure:
   - **Layout** — flex/grid direction, gap, padding, alignment
   - **Typography** — font family, size, weight, line-height for each text element
   - **Colors** — hex values, map to nearest project token if possible
   - **Sizing** — width, height, min/max constraints
   - **Component hierarchy** — name each layer, identify which are atomic components vs containers
   - **States** — default, hover, active, disabled, focus states if visible

4. Flag any values that don't map to existing tokens as **Token gaps**

## Output

```
## Parsed Design Data

**Input type:** <URL | screenshot | JSON>
**Root component:** <name>
**Hierarchy:**
  ComponentName
  ├── Header (flex, gap-4)
  │   ├── Icon (24×24, color: brand-primary)
  │   └── Title (font-xl, weight-semibold)
  └── Body (...)

**Color tokens:**
  - #1A73E8 → color-brand-primary ✓
  - #FF6B35 → TOKEN GAP (no match)

**Typography tokens:** <mapped list>
**Spacing:** <extracted values + token mapping>
**States identified:** <list>
```
