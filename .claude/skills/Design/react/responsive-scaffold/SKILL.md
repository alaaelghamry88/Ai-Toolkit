---
name: responsive-scaffold
description: Scaffolds a responsive React layout with mobile-first breakpoints.
  Use when creating a new page layout, section, or container that must adapt across
  screen sizes. Generates the shell — fill in content after.
invocation: auto
---

## Instructions

1. Read `.claude/config.md` — use styling (tailwind/css-modules) and component-lib values
2. Run `agents/shared/explore/` on the target location to inherit existing layout patterns

<!-- TODO: Define team breakpoint scale (sm/md/lg/xl) and whether it matches Tailwind defaults or custom -->

3. Determine layout type from the request:
   - Page layout (sidebar + main, header + content + footer)
   - Grid layout (n-column, auto-fill)
   - Stack layout (vertical flow, spacing rhythm)
   - Split layout (50/50, 60/40, etc.)

4. Scaffold the layout component:
   - Mobile-first: base styles target smallest viewport
   - Add responsive modifiers (`md:`, `lg:`) for larger viewports
   - Use CSS Grid for two-dimensional layouts, Flexbox for one-dimensional
   - Apply consistent spacing from the project scale

5. Include named slot areas (`children`, `sidebar`, `header`, etc.) as typed props

6. Add a `/* TODO: fill content */` comment in each slot

7. Test:
   - Render at 320px, 768px, 1280px widths
   - Check no horizontal overflow at 320px

## Output format

Provide the scaffold component as a single code block.
Include a comment block at the top listing the breakpoints used and the layout strategy chosen.
