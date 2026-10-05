# Rungline Frontend — Phase 1

A bare-bones but fully working practice UI: shows a problem, lets the student write code in a real editor (Monaco — the VS Code editor component), submits it to your backend, and shows pass/fail results per test case.

## What's deliberately simple right now

- **No real login** — on first visit, the app silently creates a "guest" account via `POST /users/guest` and remembers it in the browser's `localStorage`. Good enough to demo and pilot; swap for real auth later (the backend's `/users/guest` endpoint should get removed/locked down once that exists).
- **No adaptive engine yet** — "next problem" is just the next unsolved one in sequence (matches the backend's current Phase 1 behavior).
- **No hints / AI tutor yet** — that's Phase 3.
- **Python only** — language is hardcoded in `App.jsx` (`const LANGUAGE = "python"`); flip to `"cpp"` once you've generated C++ problems too, or add a real language-picker later.

## Setup

```bash
cd frontend
npm install
cp .env.example .env
```
Open `.env` and confirm `VITE_API_BASE_URL` points at your live Railway backend (already filled in with your current URL — update if it changes).

## Run locally

```bash
npm run dev
```
Opens at `http://localhost:5173`. It'll talk to whatever backend `VITE_API_BASE_URL` points to — so you can test against your live Railway backend, or point it at `http://127.0.0.1:8000` if you're also running the backend locally.

## Build for production

```bash
npm run build
```
Outputs static files to `dist/` — this is what actually gets deployed.

## Deploy to Vercel

1. Push this `frontend` folder to the same GitHub repo (or a separate one — either works, just note the root directory below)
2. vercel.com → New Project → import your repo
3. If `frontend` is a subfolder of a larger repo, set **Root Directory** to `frontend` in Vercel's project settings
4. Framework preset: Vite (should auto-detect)
5. Add environment variable in Vercel's project settings:
   ```
   VITE_API_BASE_URL=https://rungline-backend-production.up.railway.app
   ```
6. Deploy — Vercel gives you a live URL instantly

## What's next after this

- Share the Vercel URL with a few test students, watch where they get confused
- Keep generating problems — this UI works with however many are seeded in the backend right now
- When ready: real auth, the adaptive engine (Phase 2), AI tutor hints (Phase 3)
