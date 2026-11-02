# Interactive CV — project instructions for Claude Code

A short, optional, playful five-chapter career story for Lotus Tay, plus a plain accessible HTML CV.
Built **standalone** in this repo and deployed to **Netlify** for testing, then **merged into the
portfolio** (https://lotus-pocus-portfolio.vercel.app, hosted on Vercel) at `/interactive-cv` and `/cv`.

Full brief: `docs/BRIEF.md`. Wireframe/mood PDF: `docs/reference/LotusInteractiveCV.pdf`.
Plan and phases: `docs/IMPLEMENTATION_PLAN.md`. Facts to confirm: `docs/CONTENT_CHECKLIST.md`.

## Golden rules
- Story first, games second. Every chapter is fully readable without playing anything.
- **View CV** is visible in the header on every screen, including during mini-games.
- Never invent facts, dates, metrics, job titles, links or contact details. Content comes only from
  `src/interactive-cv/data/` after Lotus has confirmed it (see CONTENT_CHECKLIST.md).
- No 3D, game engine, map SDK, animation library or UI kit. No new dependency without asking.
- All meaningful content is semantic HTML (not canvas, not text baked into images).
- Work in the phases in IMPLEMENTATION_PLAN.md. Stop at each review gate and summarise before continuing.
- Don't use the reference images in the PDF as assets. They're mood references from the web, not
  licensed. Draw original, simple SVGs.

## Portability: the module must lift cleanly into the portfolio
Everything that will move to the portfolio lives in **`src/interactive-cv/`**. Everything outside it
(`src/main.*`, `src/App.*`, `index.html`, `netlify.toml`) is a throwaway test shell.

- The module must not import anything from outside `src/interactive-cv/`.
- All paths and URLs come in as props/config, never hard-coded:
  `basePath` (default `/interactive-cv`), `cvPath` (default `/cv`), `portfolioUrl`, `pdfUrl`, `contactUrl`.
- CSS is scoped: CSS Modules, or plain CSS where every selector sits under a `.icv` root class.
  Custom properties are prefixed `--icv-`. No global resets, no styling of `body`/`html`/bare tags.
- Assets (SVGs, avatar) live inside the module folder or are imported by it, so they move with it.
- Match the portfolio's stack. Known so far: **Vite + React (JSX, not TS), React Router
  (`BrowserRouter` in `App.jsx`), plain `.css` file per component, ESLint flat config.**
  Phase 0 confirms the exact versions from its `package.json`.

## The portfolio is READ-ONLY
The portfolio lives at `../lotus-pocus-portfolio` (the live site, deployed by Vercel from `main`).
Read it for reference only. Never edit, install, commit or run git commands in it.
`.claude/settings.json` enforces this with deny rules.

## Routes (inside the module)
- `{basePath}` → intro
- `{basePath}/1` … `{basePath}/5` → chapters (real URLs so browser back/forward and deep links work)
- `{basePath}/thanks` → optional finale
- `{cvPath}` → plain HTML CV with **Download PDF** + **Open PDF** links

## Accessibility and motion
- Keyboard-operable everything; visible focus states; semantic `<button>`/`<a>`; AA contrast.
- Mini-games use tap-to-select then tap-destination, not drag-and-drop. No timers, scores or fail states.
- Transitions are 150–250 ms opacity/translate only, and are disabled under `prefers-reduced-motion`.
- Layout: illustration beside the card on desktop, stacked above it on mobile. No horizontal scroll at 320px.

## Commands
(Fill in once scaffolded, e.g.)
- `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`

## Deployment
- Netlify builds from `main` using `netlify.toml`. Branches get deploy previews.
- The test site sends `X-Robots-Tag: noindex` so it doesn't compete with the portfolio in search.
