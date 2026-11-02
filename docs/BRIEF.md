A lightweight, optional, playful career story for the existing portfolio
\| Version 1.0 \| 2 November 2026

# 1. Project goal

Create a simple, polished interactive CV at /interactive-cv on the
existing portfolio website. Five short chapters tell a non-linear career
story, with optional micro-interactions. The experience complements,
never replaces, a conventional accessible CV. A recruiter must be able
to open the full CV at any moment.

Core principle: story first, games second. No required gameplay,
loading-heavy scenes, elaborate navigation, 3D engine, scoring, or
unnecessary dependencies.

# 2. Source material and editorial safeguards

- Use the supplied LotusInteractiveCV.pdf as a visual and narrative
  reference, especially pages 1, 3, 10, 11 and 12. The PDF is a rough
  wireframe, not a specification to reproduce literally.

- Use the existing portfolio and current conventional CV as the source
  of truth for names, dates, job titles, skills and project links. Do
  not invent metrics, credentials, dates, outcomes or contact details.

- Draft chapter copy below is indicative. Confirm it against the CV
  before publishing. Keep career changes positive and factual.

- Reuse the Grown On Trees parchment visual treatment as inspiration,
  but inspect actual existing styles and assets before deciding whether
  to share or recreate a small local component.

# 3. Routes and always-available CV

| Route / action       | Expected behaviour                                                                                                                                               |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /interactive-cv      | Interactive experience, shareable direct link; normal browser back/forward works.                                                                                |
| View CV (persistent) | Visible in header on every chapter, including games and mobile. Opens /cv (or existing canonical CV route) in the same site; do not force a download.            |
| /cv                  | Plain, accessible HTML CV with headings, employment dates, experience, skills, portfolio links and contact route.                                                |
| Download PDF         | Prominent link on /cv to a verified public PDF file using the download attribute when appropriate; also offer Open PDF for browsers that ignore forced download. |
| Back to portfolio    | Returns to existing portfolio home.                                                                                                                              |
| Skip story           | From intro, opens /cv; every chapter also has Next/Skip challenge.                                                                                               |

If an existing CV route or PDF exists, reuse it rather than creating
duplicate competing versions. Keep the HTML and PDF aligned with the
current CV.

# 4. Visual direction: simple by design

- Pastel palette with small neon accents; off-white or light
  backgrounds. Use the supplied references for mood, not exact
  illustrations.

- One small flat/isometric SVG illustration per chapter. Avoid full
  explorable maps, 3D, asset-heavy environments and character animation
  systems.

- Use a warm parchment card for narrative content: pale beige, brown
  border, compact typography and a subtle inset rule. Simplify the GOT
  results styling; decorative tacks are optional, not essential.

- A small glasses-wearing avatar can appear in intro and finale;
  optional and static for MVP.

- Desktop: illustration beside story card. Mobile: illustration above
  card, single column. No horizontal scrolling.

- Transitions: short opacity/translate changes (150–250 ms); respect
  prefers-reduced-motion.

- Readable type, AA contrast, obvious focus states, semantic buttons,
  keyboard controls, descriptive labels and alt text.

# 5. Site structure and screen flow

Portfolio → /interactive-cv → Intro → Chapters 1–5 → Finale/contact.
View CV is available throughout. Each chapter contains title, 2–3 short
story paragraphs, a small “skills gained” line and one clear primary
action. Progress indicator: Chapter X of 5. Preserve position on refresh
if easy; not essential to MVP.

| Screen                | Content                                                                                                                    | Primary / secondary actions                                                                |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Intro                 | “My story, in five short chapters.” Current role and 2–3 core skills; concise invitation.                                  | Start story; View CV; Back to portfolio.                                                   |
| 1\. The Journey       | Born in London, raised in Borneo, studied in Canada, returned to London. Small plane moving between simple location icons. | Next chapter; Back; View CV. Plane animation is automatic or one tap, not a blocking task. |
| 2\. Getting Started   | Camden market stall, retail and stock control. Initiative, customer experience, logistics.                                 | Try sorting challenge; Skip challenge / Next; Back; View CV.                               |
| 3\. Behind the Scenes | Fashion press office and PR, coordinating samples, editorial requests and events. Optional hat anecdote.                   | Try delivery challenge; Skip challenge / Next; Back; View CV.                              |
| 4\. Level Up          | Gamoola: digital lead, prototypes, web, interactive work, collaboration; coding skills developed through hands-on work.    | Explore 1–3 selected projects (external or portfolio links); Next; Back; View CV.          |
| 5\. What’s Next?      | Grown On Trees and freelance web/SEO work; link to live project. Focus on next role and what is offered.                   | View project; View CV; Get in touch; Back.                                                 |
| Finale (optional)     | A short “Thanks for exploring” message; not an extra chapter or compulsory step.                                           | View CV; Download CV (if PDF exists); Contact; Back to portfolio.                          |

# 6. Mini-game A: stock sort (Chapter 2)

Goal: sort four items into two clearly labelled boxes (e.g., “Shop
floor” and “Stockroom”) in under 20 seconds. This is a playful nod to
stock control, not an assessment.

- Entry: Try challenge. Alternative: Skip challenge, which immediately
  shows the chapter’s completion/Next state.

- Interaction: tap/click an item, then tap/click its destination. Do not
  rely on drag-and-drop; keyboard must work.

- Feedback: immediate simple confirmation and gentle movement. No lives,
  timer, score or failure screen. Wrong placement can be corrected
  without penalty.

- Finish: “Sorted! Keeping track of stock was an early lesson in
  organisation.” Show Next chapter and Replay.

- Exit: Skip / Next remains visible throughout.

# 7. Mini-game B: sample delivery (Chapter 3)

Goal: arrange two editorial sample deliveries in the right order using a
small, self-contained scenario inspired by the hat anecdote. Avoid
pretending this is an exact reconstruction of events.

- Show two shoot cards and a sample hat. Ask which shoot should receive
  the hat first based on displayed times.

- Interaction: choose A or B; one choice. Make the timing unambiguous.

- Feedback: “Delivered! Coordinating requests meant keeping careful
  track of schedules.” Then optional anecdote: “After all that, neither
  shoot used the hat.”

- No timer, penalties or forced retries. Include Skip challenge, Next
  chapter and Replay.

- Keep the story accessible as ordinary text even if the interaction
  never loads.

# 8. Global button and navigation behaviour

| Control        | Behaviour                                                                                                  |
|----------------|------------------------------------------------------------------------------------------------------------|
| View CV        | Persistent, prominent header button. Navigates to HTML CV. Never hidden behind a menu or animation.        |
| Download PDF   | On CV page; link to actual current PDF. If unavailable, do not show a broken button; flag as a setup task. |
| Next           | Advances one chapter immediately; never waits for a game.                                                  |
| Back           | Returns to previous chapter, retaining simple state if feasible.                                           |
| Try challenge  | Opens optional inline micro-game within the chapter.                                                       |
| Skip challenge | Dismisses game and leaves chapter text and Next visible.                                                   |
| Replay         | Resets only the current mini-game.                                                                         |
| Project links  | Use existing validated destinations, indicate external links and open safely.                              |
| Get in touch   | Use existing portfolio contact method; do not invent email.                                                |

# 9. Technical approach and constraints

- First inspect repository structure, routing, CSS approach, existing CV
  content, portfolio design, shared components and available assets.
  Report findings and a small implementation plan before editing.

- Use existing React and routing conventions. Prefer data-driven chapter
  content in one small module, a reusable ParchmentCard and
  ChapterLayout, and two isolated mini-game components.

- Use local SVG/CSS assets and minimal motion; no game engine, map SDK,
  animation framework or new UI library without approval.

- Keep all meaningful CV content in semantic HTML (not canvas, image
  text or interaction-only content) for accessibility, indexing and
  copy/paste.

- Do not modify Grown On Trees, its live deployment, shared assets or
  unrelated routes. Do not copy proprietary assets without checking
  licensing and repository boundaries.

- Support responsive widths, keyboard navigation, screen readers,
  reduced motion and no-JS fallback where the existing framework
  permits.

- Preserve the portfolio’s existing build/deployment conventions; use
  existing lint/test commands.

# 10. Build in small, reviewable phases

| Phase             | Deliverable / review gate                                                                                               |
|-------------------|-------------------------------------------------------------------------------------------------------------------------|
| 0\. Inspect       | Read repository and PDF, identify current CV/PDF, propose exact files and routing. No edits yet.                        |
| 1\. Skeleton      | Create /interactive-cv, intro, five static chapter cards, navigation and persistent View CV. Verify mobile and desktop. |
| 2\. CV access     | Create or reuse /cv and PDF link; verify direct route, back navigation and download.                                    |
| 3\. Visual polish | Add lightweight SVG scenes, parchment style and subtle transitions. Verify accessibility.                               |
| 4\. Games         | Add two optional mini-games; keyboard, skip, replay and reduced-motion checks.                                          |
| 5\. QA            | Run build/tests, check deep links, browser back/forward, mobile widths, missing assets and all CTAs.                    |

# 11. Acceptance checklist

- A visitor can read the entire story without playing any game.

- View CV remains visible on intro, every chapter and during both
  challenges.

- CV page is readable HTML and offers a working PDF download.

- Five chapters, two optional mini-games maximum, no complex map or 3D.

- Story and CV facts match the current conventional CV; no invented
  claims.

- All buttons work with mouse, touch and keyboard.

- Mobile layout is legible and usable; no layout shifts or horizontal
  overflow.

- Reduced-motion preference is respected.

- No new heavyweight dependencies or unrelated repository changes.

- Production build passes; direct navigation to /interactive-cv and /cv
  works.

# 12. Starter prompt for Claude Code

Please read the attached LotusInteractiveCV.pdf and this Interactive CV
Design & Build Brief. Inspect my existing portfolio repository before
making any changes. First report the current route structure, available
CV/PDF, styling and reusable components; propose the smallest
implementation plan and exact files to change. Do not implement until I
approve the plan. Prioritise a simple, responsive, accessible
five-chapter story with a persistent View CV link and downloadable
conventional PDF. Two tiny optional games come last. Do not add 3D, a
game engine, heavy dependencies or unrelated refactors. Preserve
existing site behaviour and verify each phase.

Open questions to resolve during Phase 0: exact current CV text and
dates; location of current PDF; existing contact method; which project
links to feature; whether the CV page already exists; whether GOT
parchment styling is available in this repository.
