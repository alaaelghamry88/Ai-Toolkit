---
name: web-performance
description: Measures, diagnoses, and fixes frontend performance issues targeting Core Web Vitals.
  Use when performance feels slow, CWV metrics are below threshold, a feature handles
  large data volumes, or after implementing a significant new UI feature.
  Adapted from agent-skills/performance-optimization.
user-invocable: false
---

## Instructions

> Source: adapted from addyosmani/agent-skills — performance-optimization

**Rule: Measure before optimizing. Performance work without measurement is guessing.**

### Step 1 — Measure

Establish baselines before touching any code:
- Run Lighthouse (CI or DevTools) → record LCP, INP, CLS scores
- Use Chrome DevTools Performance tab for runtime profiling
- Check bundle analyser (vite-bundle-analyser or webpack-bundle-analyzer)
- Record real-user metrics if available (web-vitals library)

Target thresholds:
| Metric | Good | Poor |
|--------|------|------|
| LCP | ≤ 2.5s | > 4.0s |
| INP | ≤ 200ms | > 500ms |
| CLS | ≤ 0.1 | > 0.25 |

### Step 2 — Identify the bottleneck

Do not fix everything at once. Pinpoint the single biggest constraint:
- Long tasks blocking main thread → JS bundle size, synchronous work
- Slow LCP → render-blocking resources, unoptimized images, server TTFB
- High CLS → unsized images/embeds, dynamic content injected above fold
- High INP → event handler cost, hydration cost, third-party scripts

### Step 3 — Fix the specific constraint

Common fixes:
- **Large bundles** → code-split with `React.lazy` / Angular lazy modules, tree-shake
- **Unnecessary re-renders** → `React.memo`, `useMemo`, `useCallback` (measure first)
- **Unoptimized images** → `<img>` with `width`/`height`, `loading="lazy"`, modern format (WebP/AVIF)
- **N+1 patterns** → batch requests, use React Query / SWR deduplication
- **Unvirtualized lists** → add virtual scrolling (react-window, CDK virtual scroll)

### Step 4 — Verify

Re-run the same measurements from Step 1. Confirm the specific metric improved.
Do not accept "feels faster" — show numbers.

### Step 5 — Guard

- Add a Lighthouse CI budget to prevent regression
- Add a bundle size check to CI (size-limit or bundlesize)

## Output format

Provide a report:
```
## Performance Report

**Baseline:** LCP ___, INP ___, CLS ___
**Bottleneck identified:** <single root cause>
**Fix applied:** <what was changed>
**After:** LCP ___, INP ___, CLS ___
**Guard added:** <CI check or budget>
```

Then provide any code changes as separate code blocks.
