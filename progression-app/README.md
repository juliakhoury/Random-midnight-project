# Bodyweight Progression Program

A full-body, 16-week progressive training program using only bodyweight and resistance bands. Covers 11 muscle groups across 4 phases, with every exercise including mobility/flexibility benefits.

## Features
- **11 muscle groups** organized by Push / Pull / Core / Legs
- **4 progressive phases**: Foundation → Build → Strength → Advanced
- Builds toward skills like pistol squats, Nordic curls, dragon flags, handstand push-ups, and pull-ups
- Every exercise includes a mobility benefit
- Checkbox tracking for mastery
- Suggested training splits for each phase

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add to `package.json` scripts:
   ```json
   "deploy": "vite build && gh-pages -d dist"
   ```
4. Run `npm run deploy`

Or use **Vercel / Netlify** — just connect the repo and it auto-detects Vite.

## Tech
- React 18
- Vite
- Zero dependencies beyond React
