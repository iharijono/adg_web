# adg_web

Public marketing website for **Facet** — AI Operational Intelligence
(AIOI). Built with Next.js (App Router), TypeScript, Tailwind CSS and
shadcn/ui, exported as a static site (`output: "export"`).

## What this repo owns

`adg_web` is the **Publishing Factory** of the three-repo Facet ecosystem:

| Repo | Owns | Deploys? |
| --- | --- | --- |
| `ai-decision-governance` | Platform/SDK implementation truth, infra, demo environment | Yes (orchestrator) |
| `adg_prod` | Product/business truth: one-pagers, messaging, decision guides | No (content only) |
| `adg_web` (this repo) | Public website — consumes content from the other two | Yes (piggybacks on the demo EC2 today) |

This repo does not author product copy or SDK documentation itself — it
**syncs** markdown from the sibling repos at build time and renders it.
"Write once, derive everywhere, use everywhere, publish everywhere."

## Content sync (Phase 1 — "ci-copy")

`scripts/sync-content.ts` copies, at build time, into `content/` (gitignored,
fully regenerated every run):

- `../adg_prod/product/one-pagers/*.customer.md` → `content/products/<slug>.md`
- `../ai-decision-governance/docs/developer-guides/*.md` → `content/docs/<slug>.md`
- `../adg_prod/product/decision-diagram/decision-tree.json` → `content/data/decision-tree.json`
  (derived from `adg_prod/tools/build_guide_diagrams.py`'s `GATES`/`FRAMEWORKS`
  dicts by `adg_prod/tools/export_decision_tree.py` — re-run that script in
  `adg_prod` whenever the decision tree content changes)

Run manually with:

```bash
npm run sync-content
```

It requires `../adg_prod` and `../ai-decision-governance` to exist as sibling
checkouts (override with `ADG_PROD_PATH` / `ADG_PLATFORM_PATH` env vars). It
also runs automatically as `prebuild`, before every `next build`.

There is no JSON schema/validation pipeline in `adg_prod` yet (that's the
planned Phase 2 "Content Factory" — `products.json`, `domains.json`, etc.,
with CI validation). Until then, this script reads the raw markdown directly.

## Local development

```bash
npm install
npm run dev
```

`npm run dev` does **not** auto-sync content (only `build` does) — run
`npm run sync-content` manually first if `content/` is empty or stale.

## Build

```bash
npm run build   # runs sync-content, then `next build` (static export to out/)
```

## Project structure

```
app/                  Next.js App Router routes (all statically exported)
  page.tsx            Landing page
  products/           Product index + /products/[slug]
  docs/               Developer docs index + /docs/[slug]
  fit/                Interactive integration-fit wizard
  downloads/          SDK install instructions
  contact/            Lead form (mailto fallback — no backend yet)
  demo/               Live demo CTA (demo EC2 is ephemeral; no fixed URL)
components/
  layout/             Site header/footer
  site/               Markdown renderer, fit wizard, dynamic icon, contact form
  ui/                 shadcn/ui primitives
data/                 Hand-maintained manifests (products.ts, docs.ts)
lib/                  Content read/render utilities
content/              Synced output (gitignored — see sync-content.ts)
scripts/sync-content.ts
```

## Deployment

The static export is served by nginx on the **same ephemeral EC2 instance**
as the `ai-decision-governance` live demo stack (see that repo's
`infra/demo/` and `demo-up.yml`/`demo-down.yml`). This is an intentional,
pragmatic choice for the current stage: a single transactional "demo + site
up/down together" deployment, at the cost of the public site going offline
whenever the demo environment is torn down.
