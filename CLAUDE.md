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
- Match the portfolio's stack: **Vite 8.0.13, React 19.2.6 (JSX, not TS), react-router-dom 7.17.0
  (`BrowserRouter` in `App.jsx`), plain `.css` file per component, ESLint 10 flat config, no test
  runner.** Runtime and build versions are pinned exactly in `package.json` to what the portfolio
  has installed, so don't bump them, and don't use APIs newer than those versions.
- Module layout: `src/interactive-cv/index.js` exports `InteractiveCV` and `CVPage`. Config defaults
  and `useConfig` live in `config.js`. All story copy is in `data/chapters.js`. Shared styles and
  `--icv-*` tokens are in `styles/icv.css`. Throwaway shell code lives in `src/shell/` and `src/App.jsx`.

## The portfolio's global CSS leaks into the module
The portfolio's `src/index.css` sets a `*` margin/padding reset, `a { color: inherit; text-decoration: none }`,
a near-black `body` (`#050505`) with white text, Geist font, and tight headings (weight 800,
line-height 0.98, letter-spacing -0.045em). The module must not rely on browser defaults: under
`.icv` it sets its own background, colour, font, heading metrics, paragraph/list spacing and link
underlines. Use `.icv .icv-x` selectors (two classes), because `.icv a` (0,1,1) beats a single
class. `src/shell/shell.css` is a verbatim copy of the portfolio's `index.css` so the test site
shows the same leaks. Keep it in sync if the portfolio's changes.

## Decisions (agreed with Lotus, November 2026)
- **Chrome at merge:** `/interactive-cv/*` renders **without** the portfolio Nav, AnnouncementBanner
  and SearchBox (Footer and CookieConsent stay). `/cv` keeps the normal portfolio chrome, including
  the Nav pinned at `top: 5rem; right: 2rem`, so `CVPage` has top padding to clear it
  (`--icv-cv-top`: 12rem narrow, 8rem at ≥70rem like the portfolio's PrivacyPage). The test shell
  mirrors both.
- **PDF:** reuse the existing portfolio PDF; never copy it into this repo. `pdfUrl` is
  `https://lotus-pocus-portfolio.vercel.app/Lotus_Tay_CV.pdf` on Netlify and `/Lotus_Tay_CV.pdf`
  (the module default) after the merge. That file is the **source of truth for CV facts**.
- **Contact:** the portfolio's existing `mailto:lotusetay@gmail.com`, passed in as `contactUrl`.
- **`/cv` is dark** (`#050505`, like the portfolio's PrivacyPage), set by overriding the `--icv-*`
  tokens on `.icv.icv-cv`. Reason: the portfolio Nav is white text with `mix-blend-mode: difference`,
  but `.site-nav` has a `z-index`, so it's its own stacking context and the blend never reaches the
  page. It only reads on dark backgrounds. Keep any page that shows the portfolio Nav dark.
- **Print:** `/cv` prints black on white with no buttons or back link (module CSS). The module can't
  hide the host's Nav and Footer without styling outside `.icv`, so the host does it: the shell's
  `ShellNav.css` and `ShellFooter.css` have `@media print { display: none }`, and the same two
  rules must be added to the portfolio's `Nav.css` and `Footer.css` at the merge.
- **CV content** lives in `data/cv.js`, transcribed word for word from the live PDF, including its
  link targets. The mobile number is deliberately left out of the HTML.
- **Favicon:** the portfolio has none (`/favicon.ico` is a 404 on the live site), so the shell has
  none either. Don't use the Sanity Studio's icons.
- **Footer** stays on every route, including `/interactive-cv`.
- **Story screens are dark too** (intro, chapters, thanks): the base `--icv-*` tokens in
  `styles/icv.css` are the dark set, shared with `/cv`.
- **ParchmentCard** recreates the Grown on Trees pinned-parchment result card
  (`.got-parchment--pinned`, applied to FlagRound's result card). Its source is only in the GOT
  review copies (e.g. `grown-on-trees/.commit7-review-20261030/isolated-revision-3/src/index.css`),
  not GOT's main `src/`. GOT is read-only; never import from it. The card sets its own ink tokens
  for the paper; all its text passes AA.
- **Card font:** M PLUS Rounded 1c, self-hosted in `fonts/` (Latin subset, weights 500/700/900,
  ~66 KB total, SIL OFL in `fonts/OFL.txt`) under the module-only family name
  `"ICV M PLUS Rounded 1c"`. Never add a Google Fonts `@import` to module CSS: it lands mid-bundle
  after the merge and browsers ignore it. Pixelify Sans isn't used.
- Illustration rules and palette: `docs/ILLUSTRATION_STYLE.md`.
- **Integration needs no `vercel.json` change.** The portfolio already rewrites `/((?!.*\.).*)` to
  `/index.html`.

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
- `npm run dev`: dev server at http://localhost:5173
- `npm run build`: production build to `dist/`
- `npm run preview`: serve the production build at http://localhost:4173
- `npm run lint`: ESLint (no test runner, same as the portfolio)
- Node 22 (pinned for Netlify in `netlify.toml`)

## Deployment
- Netlify builds from `main` using `netlify.toml`. Branches get deploy previews.
- The test site sends `X-Robots-Tag: noindex` so it doesn't compete with the portfolio in search.
