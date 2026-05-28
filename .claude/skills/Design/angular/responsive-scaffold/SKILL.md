---
name: responsive-scaffold
description: Scaffolds a responsive Angular layout component with mobile-first breakpoints.
  Use when creating a new page layout, section, or container that must adapt across
  screen sizes in an Angular project.
user-invocable: false
---

## Instructions

1. Read `.claude/config.md` — use styling and component-lib values
2. Run `agents/shared/explore/` to inherit existing layout patterns in this Angular project

<!-- TODO: Define team breakpoint map and whether Angular CDK BreakpointObserver is in use -->

3. Determine layout type (page, grid, stack, split — same taxonomy as React variant)

4. Scaffold the Angular layout component:
   - Mobile-first SCSS with nested breakpoint mixins
   - Use Angular CDK `BreakpointObserver` for JS-driven layout changes if needed
   - CSS Grid for two-dimensional, Flexbox for one-dimensional
   - `OnPush` change detection

5. Expose named content slots using Angular `<ng-content select="[slot-name]">` projection

6. Add `<!-- TODO: fill content -->` in each slot area

7. Test at 320px, 768px, 1280px — verify no horizontal overflow

## Output format

Provide the component and its SCSS as separate code blocks.
Include a comment block listing the breakpoints used and the layout strategy.
