# Golrang Smart Platform — Demo

An interactive proof-of-concept for the **Golrang Holding unified consumer &
data-driven commerce platform**, based on *Section 20 of the proposal: "Initial
Demo Experience & Proof-of-Concept Scenario."*

The demo plays a single coherent eight-step narrative that connects the
**consumer experience** to the **organizational (B2B) result** in one flow.

**Live demo:** https://hatchup-io.github.io/golrang-platform-demo/

## The eight-step scenario

| Step | Title | Surface |
|:----:|-------|---------|
| 1 | Onboarding — sign-up, priorities and a monthly budget goal | Consumer app |
| 2 | Need detection — predicting when the monthly shop is due | Consumer app |
| 3 | Smart cart — frequent items, economic alternatives, a campaign product, and auto-removed "already at home" items | Consumer app |
| 4 | Conversation — adding a Friday dinner party by voice, within a set budget | Consumer app |
| 5 | Optimization — three cart versions (economy, balanced, premium) | Consumer app |
| 6 | Payment — using the unified wallet and cashback | Consumer app |
| 7 | Complementary service — auto-preparing a Tapsi ride for the guest day | Consumer app |
| 8 | Corporate view — measuring the campaign result in the B2B panel | Corporate dashboard |

## Running locally

```bash
npm install
npm run dev      # dev server on http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

## Architecture

- **React + TypeScript + Vite** — no extra UI dependencies; hand-written CSS with
  full RTL support and the Vazirmatn font.
- `src/data.ts` — all content, personas, products and campaign metrics in a single
  data layer.
- `src/consumer.tsx` — the seven consumer-app screens (steps 1–7).
- `src/corporate.tsx` — the B2B dashboard (step 8): conversion funnel,
  target-vs-control comparison and A/B offer results.
- `src/App.tsx` — the app shell, step navigation and narration panel.

The product catalog uses real Golrang-ecosystem brands (Active, Ave, Famila, Oila,
Merci, Sahel Kenar, Espeh) sourced from Okala / Ofogh Kourosh, plus popular Iranian
staples (Kalleh, Telavang, Golestan) for categories Golrang doesn't produce.

## Deployment

Every push to `main` is automatically built and published to GitHub Pages via
`.github/workflows/deploy.yml`.

> The data is illustrative and for demonstration purposes only.
