# MegaWins - No.1 Free-to-Play Social Casino

A modern, high-performance social casino and sweepstakes gaming portal built with React 19, TypeScript, Tailwind CSS, and Vite. Designed to replicate the authentic look and feel of top sweepstakes platforms (like FiestaSweeps) with real-time jackpot counters, live scrolling winners ticker, interactive platform catalog, and direct Telegram integration.

## Key Features

- **Brand & Theme**: Deep obsidian casino palette with glowing violet, indigo, and gold accents.
- **Dynamic Live Mega Jackpot**: Real-time incrementing jackpot counter replicating live platform action.
- **Live Winners Marquee**: Infinite smooth scrolling ticker featuring recent player wins across top platforms.
- **16+ Platform Arcades**: Fire Kirin, Orion Stars, Milky Way, Juwa 2.0, Panda Master, Ultra Panda, VBlink, Vegas Sweeps, Blue Dragon, Game Vault, Cash Machine, and more.
- **Categorized Game Filters**: Filter by All Games, Fish Games, Slots, Keno, Card Games, and Jackpots, with real-time search.
- **Promotions Showcase**: 50% Extra Credits Welcome Bonus, Free Credits Daily Rewards streak, and VIP Access.
- **Telegram Redirection**: All game cards, play buttons, and support widgets route directly to the designated Everest Gaming Room Telegram link (`https://t.me/everestonlinegamingroom`).
- **Floating 24/7 Support**: Persistent floating chat bubble widget with online status indicator.
- **Legal Compliance**: Full social sweepstakes disclaimers, official rules notices, and 18+ age verification.

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Vite 6
- **Hosting Ready**: Vercel (pre-configured with `vercel.json`)

## Hosting on Vercel

This repository is pre-configured with `vercel.json` for zero-configuration deployments on Vercel:

### Option 1: Vercel Web Dashboard (Recommended)
1. Push this repository to your GitHub account.
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Framework Preset: **Vite** (auto-detected).
5. Build Command: `vite build` (or `npm run build`).
6. Output Directory: `dist`.
7. (Optional) In **Environment Variables**, you can customize `VITE_TELEGRAM_URL`.
8. Click **Deploy**.

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel
```

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```
