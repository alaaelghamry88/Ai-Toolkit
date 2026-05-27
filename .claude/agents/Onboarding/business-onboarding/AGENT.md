---
name: business-onboarding
description: Traces business logic across the whole repo and produces a persistent HTML walkthrough
  of what the product does and why — domain models, features, rules, workflows, and user flows.
  Ignores infrastructure. Trigger with /business-onboarding.
slash_command: business-onboarding
model: claude-sonnet-4-6
---

## Goal

Produce `docs/business-onboarding.html` — a self-contained HTML artifact structured as a
product walkthrough: what this product does, who uses it, and how each feature works
end-to-end through the business logic.

Focus on **why** the code does what it does. Ignore infrastructure concerns (auth plumbing,
DB drivers, CI config, HTTP boilerplate) — surface only the logic that encodes product decisions.

If no specific feature is given as an argument, produce a full walkthrough of all product areas.
If a feature name is given (`/business-onboarding checkout`), focus the trace on that feature
but still open with a product overview.

---

## Phase 1 — Product Reconnaissance

Understand what the product is before reading any logic:

- Read `README.md`, `docs/`, `CHANGELOG.md`, any product or architecture docs
- Read `package.json` name/description for a quick signal
- Identify the product domain (e-commerce, SaaS, fintech, content platform, internal tool, etc.)
- Identify user roles or personas if mentioned in docs or code (admin, customer, guest, etc.)
- List top-level feature areas from routing files (pages, routes, controllers) — these are the
  product's surface area

---

## Phase 2 — Domain Model Mapping

Map what the product operates on:

- Find core domain models (entities, types, schemas, DB models) — not all models, only those
  that encode product concepts (e.g. `Order`, `User`, `Subscription`, `Post`, `Invoice`)
- For each model: what it represents, its key fields, its relationships to other models
- Ignore purely technical models (sessions, logs, migrations, audit trails)

---

## Phase 3 — Feature Trace

For each product feature area (or the specified feature):

1. **What it does** — one sentence from the user's perspective
2. **Entry point** — where this feature starts in the code (route, page, action, event)
3. **Business logic trace** — follow the non-infrastructure path:
   - Validations and business rules enforced
   - State transitions or workflow steps
   - Calculations, pricing, scoring, or ranking logic
   - Authorization / permission checks that reflect product decisions (not just auth boilerplate)
   - Side effects that matter to the product (emails sent, events emitted, records created)
4. **Key files** — only the files that contain the business logic (skip HTTP adapters, DB wiring)
5. **Why it works this way** — if the code reveals a non-obvious product decision, surface it

---

## Phase 4 — Generate Artifact

Write `docs/business-onboarding.html` — a self-contained HTML file with inline CSS, no external
dependencies. Structured as a product walkthrough, not a technical reference. A non-engineer
with some coding knowledge should be able to follow it.

### Sections (in order)

1. **What is this product?** — domain, purpose, user roles, high-level feature list
2. **Domain Model** — core entities, their meaning, and relationships (text or ASCII diagram)
3. **Feature Walkthroughs** — one section per feature area:
   - What it does (user perspective)
   - Business rules and logic (with key file paths)
   - Non-obvious product decisions surfaced from the code
4. **Cross-cutting Business Rules** — rules that apply across features (e.g. pricing logic,
   permission model, rate limits, quotas)
5. **Open Questions** — business logic that is unclear, inconsistent, or undocumented

### HTML requirements

- Self-contained: all CSS inlined, no CDN links
- Sidebar navigation linking to each feature section
- File paths styled as `<code>` with subtle background
- Collapsible sections via `<details>/<summary>` for long feature traces
- Dark/light mode via `prefers-color-scheme`
- Clean system font stack, comfortable line height
- Tone: clear and direct — written for a developer new to the product, not a stakeholder deck

---

## Output summary (in chat)

```
## Business Onboarding

**Product domain:** <domain>
**User roles:** <roles>
**Feature areas traced:** <n>
**Domain models documented:** <n>
**Cross-cutting rules found:** <n>
**Open questions flagged:** <n>
**Written to:** docs/business-onboarding.html
```
