# Interactive CV: implementation plan

**Approach:** build it in a separate repo (`interactive-cv`), test it on Netlify, then move one
self-contained folder (`src/interactive-cv/`) into the portfolio repo and add two routes.

```
interactive-cv repo (this one)                 lotus-pocus-portfolio repo (Vercel)
├── index.html, src/main, src/App  ── test shell, stays here
├── netlify.toml                   ── test hosting, stays here
└── src/interactive-cv/            ── the module ──────────────►  src/interactive-cv/
     ├── InteractiveCV.(jsx|tsx)        routes: intro, 1–5, thanks     + <Route path="/interactive-cv/*">
     ├── CVPage.(jsx|tsx)               plain HTML CV                  + <Route path="/cv">
     ├── data/chapters, data/cv         ALL copy and facts             + public/cv/Lotus-Tay-CV.pdf
     ├── components/ ParchmentCard, ChapterLayout, SiteHeader, Progress
     ├── games/ StockSort, SampleDelivery
     ├── scenes/ one small SVG per chapter + avatar
     └── styles/ scoped CSS (.icv root, --icv-* tokens)
```

---

## Step 0: Set up the repo (Lotus, about 10 minutes)

1. Create the GitHub repo. In a terminal, inside this folder:
   ```bash
   git init && git add . && git commit -m "Brief, plan and Claude Code instructions"
   gh repo create lotus-pocus/interactive-cv --private --source=. --push
   ```
   (Or create an empty repo on github.com and `git remote add origin … && git push -u origin main`.)
2. Keep the portfolio **next to** this folder (it already lives in `~/personal/lotus-portfolio/`):
   ```
   ~/personal/lotus-portfolio/interactive-cv          ← new
   ~/personal/lotus-portfolio/lotus-pocus-portfolio   ← existing, read-only
   ```
3. Open `interactive-cv` in VS Code and start Claude Code. Run `/add-dir ../lotus-pocus-portfolio`
   so it can read the portfolio. Tell it the portfolio is **read-only** in this project.
4. Netlify: **Add new site → Import from Git → interactive-cv**. `netlify.toml` already holds the
   build settings, the SPA fallback and the `noindex` header. Do this after Phase 1, once there
   is something to build.
5. Put the current conventional CV PDF at `public/cv/Lotus-Tay-CV.pdf`. If the portfolio
   already hosts one, note its URL instead and reuse it.

---

## Phase 0: Inspect (no code yet)

Claude Code reads the portfolio and fills in this table, then waits for approval.

### Portfolio stack *(filled in by Claude Code)*
| Item | Finding |
|---|---|
| Build tool (Vite / CRA / Next / other) | Vite (seen in screenshot): confirm version |
| React version | |
| JS or TS | JS/JSX |
| Router (React Router version? none?) | React Router, `BrowserRouter` in `App.jsx`: confirm version |
| CSS approach (plain CSS / modules / Tailwind / styled) | Plain `.css` per component, so the module must prefix its classes `.icv-…` |
| Fonts and colour tokens worth reusing | |
| Existing header/nav component | |
| Existing CV page or PDF, and its URL | |
| Contact method (email link / form / LinkedIn) | |
| `vercel.json` rewrites present? | |
| Lint and test commands | |

**Decisions this unlocks:**
- Scaffold this repo with the **same** build tool, React version, language and CSS approach.
- **If the portfolio uses React Router:** the module exports routes that use it.
- **If the portfolio has no router** (single scrolling page): choose between (a) adding
  `react-router-dom` to the portfolio at integration time, which is small and standard, or
  (b) driving chapters with `?chapter=2` and the History API inside the module, so the portfolio
  only needs one new page. Lotus decides.
- If the portfolio is **Next.js**, build the module as client components and plan integration as
  `app/interactive-cv/[[...chapter]]/page` + `app/cv/page`.

---

## Phase 1: Skeleton
- Scaffold the test shell to match the portfolio stack.
- `src/interactive-cv/` with config props (`basePath`, `cvPath`, `portfolioUrl`, `pdfUrl`, `contactUrl`).
- Intro + five chapters + thanks, using placeholder copy from `data/chapters`.
- Persistent header: **View CV**, **Back to portfolio**, "Chapter X of 5".
- Next / Back / Skip story working; real URLs per chapter; browser back/forward works.
- Deploy to Netlify. **Gate:** check on a phone and a desktop.

## Phase 2: CV access
- `CVPage`: semantic HTML CV from `data/cv`, with **Download PDF** (`download` attribute) and **Open PDF**.
- Hide the PDF buttons if `pdfUrl` isn't set. Never show a broken button.
- **Gate:** direct load of `/cv`, back navigation, and the PDF download on iOS Safari and Android Chrome.

## Phase 3: Content
- Lotus works through `CONTENT_CHECKLIST.md`; Claude Code writes the confirmed copy into `data/`.
- **Gate:** every fact traceable to the conventional CV.

## Phase 4: Visual polish
- Pastel + small neon accent tokens; `ParchmentCard` recreated locally (don't import from the
  Grown On Trees repo).
- One small original SVG scene per chapter; static glasses-wearing avatar on the intro and thanks screens.
- 150–250 ms transitions; `prefers-reduced-motion` respected.
- Chapter 1 plane: CSS animation along a simple path, plays once automatically, and skipped under reduced motion.
- **Gate:** Lighthouse accessibility score ≥ 95, keyboard-only run-through, no horizontal scroll at 320px.

## Phase 5: Mini-games (both optional)
- `StockSort` (Chapter 2) and `SampleDelivery` (Chapter 3), exactly as in BRIEF §6–7.
- Try / Skip / Replay; Next is always visible; nothing blocks progress.
- **Gate:** play both by keyboard only, by touch only, and with a screen reader (VoiceOver or NVDA).

## Phase 6: QA on Netlify
- Production build; deep links to every route; refresh on every route; all CTAs; external links
  use `target="_blank" rel="noopener noreferrer"` with a visible "opens in new tab" cue.
- Remove placeholder text; check the bundle has no unexpected dependencies.

---

## Phase 7: Integration into the portfolio

### Recommended: move the module into the portfolio repo
1. Branch in the portfolio repo: `feature/interactive-cv`.
2. Copy `src/interactive-cv/` across unchanged. Copy the PDF to `public/cv/` if it isn't already there.
3. Add the two routes (or Next.js pages), passing `portfolioUrl="/"`.
4. Add an SPA fallback if needed. Vite and CRA on Vercel need `vercel.json`:
   `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.
   Check first that this won't break existing routes.
5. Add an entry point from the portfolio: a nav link or hero button saying "My story (interactive CV)".
6. Push the branch, and Vercel gives you a **preview URL** automatically. Test there, then merge.
7. Archive or keep the standalone repo. Turn off the Netlify site, or leave it as `noindex`.

**Why this option:** one codebase, one deploy, shared header and fonts, and `/cv` becomes a
first-class page on your own domain for SEO and recruiters.

### Alternatives (only if the stacks turn out to be incompatible)
- **Vercel rewrite proxy:** keep it on Netlify and add a rewrite in the portfolio's `vercel.json`
  from `/interactive-cv/:path*` to the Netlify URL. Build with Vite `base: '/interactive-cv/'`.
  There's no code merge, but you'd maintain two deployments and `/cv` would live under the CV app.
- **Static sub-folder:** build with `base: '/interactive-cv/'` and copy `dist/` into the
  portfolio's `public/interactive-cv/`. Simple, but you'd re-copy after every change.

---

## Starter prompt for Claude Code (first session)

> Read `CLAUDE.md`, `docs/BRIEF.md`, `docs/IMPLEMENTATION_PLAN.md` and the PDF in `docs/reference/`.
> Then inspect `../lotus-pocus-portfolio` **read-only**. Do not edit anything in it.
> Do Phase 0 only: fill in the "Portfolio stack" table in IMPLEMENTATION_PLAN.md, list any existing
> CV page/PDF and contact method, and propose the exact scaffold command and file list for Phase 1.
> Flag anything in the brief that conflicts with the portfolio's conventions. Do not scaffold or
> install anything until I approve.
