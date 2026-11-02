# Content checklist: confirm before publishing

**Source of truth:** the live CV PDF, `https://lotus-pocus-portfolio.vercel.app/Lotus_Tay_CV.pdf`
(the portfolio's `public/Lotus_Tay_CV.pdf`, checked 2 November 2026). It's newer than the CV
screenshot on p.8 of the wireframe PDF, which this list was first written from.

These are the points where the wireframe story (PDF p.2), the brief, the portfolio site and the CV
don't yet line up, or where a fact is still missing. Tick each one off, then Claude Code writes the
confirmed copy into `src/interactive-cv/data/`.

## Must resolve
- [ ] **Three years or four?** ⚠️ The CV profile says *"Creative Developer with **four years** of
      hands-on experience building interactive web applications"*. The portfolio's About section
      says *"I discovered frontend web development **in 2023**"* and *"Over the past **three years**
      I've continued learning"*. The certificate is dated 22 March 2023, about 3.5 years ago. Pick one
      figure (or drop the number) so the CV, the portfolio and the story agree.
- [ ] **Gamoola job title.** The CV says *Digital Operations Manager, February 2017 – Present*. The
      story says admin/studio managing → *Digital Lead*. Is it one title or a progression? If it's a
      progression, give dates for each step so the story and CV agree.
- [ ] **Brower Lewis PR, Account Manager.** On the CV, with **no dates**, and missing from the brief's
      chapter plan. Proposal: put it in Chapter 3, after the press office role. Is "headhunted" and
      "five fashion brands" accurate and OK to say publicly?
- [ ] **Giorgio Armani, Press Officer.** On the CV with **no dates**. Did "stock controller for sample
      collections" and then press officer both happen at Armani? This decides the order in Chapter 3.
      The CV mentions supporting Milan Fashion Week.
- [ ] **Freelance map link.** The CV now confirms the client spelling (*Channoil*) and the dates
      (*June 2026 – July 2026*). Is there a public link to the map, and is it OK to name the client?
- [ ] **"Over 50 GitHub projects"** (wireframe p.6). Not on the CV. Confirm the count or drop the number.
- [ ] **Certificate wording.** The CV says *Front-End Web Development Certificate, Trilogy Education
      Services (EdX)*. The certificate says *UK Skills 16-Week Front End Web Development, 22 March 2023*.
      The portfolio says *16-week Skills for Life bootcamp* in 2023. Pick one wording, and say whether
      to show the date. Suggest it goes in Chapter 4 as "Skilled up".
- [ ] **Phone number on `/cv`.** The PDF, with your mobile number, is already public at the URL above
      and will be the Download PDF target. Should the HTML version on `/cv` show the number too, or
      email only?
- [ ] **"Grown On Trees" or "Grown on Trees"?** The CV and the portfolio's button use lower-case
      "on"; the brief uses "On". Pick one.

## Story decisions
- [ ] **Chapter 1 locations.** The brief says London → Borneo → Canada → London. The wireframe has
      a fourth "Europe" island. Keep three, or add Europe (e.g. for Milan Fashion Week)?
- [ ] **Canada.** Keep it as "studied in Canada", or name the institution or subject?
- [ ] **Early roles** (market stall, door-to-door selling, retail assistant, stock controller) aren't on
      the CV and have no dates. Keep them story-only, or add a one-line "Early career" to `/cv`?
- [ ] **Family years** (wireframe "Job 6: became a mother, raised 3 kids while doing admin,
      project and studio managing at Gamoola"). The brief leaves this out. Include a line or leave it out?
      Your call. Either is fine.
- [ ] **Hat anecdote** (Chapter 3). Confirm you're happy with the "neither shoot used the hat" punchline.
- [ ] **Chapter 4 projects:** choose 1–3. Confirmed URLs on the CV: Photo-Panic host
      `https://photo-panic.netlify.app/` and player `https://photo-panic.netlify.app/player`.
      Is there a Gamoola project you can show publicly?
- [ ] **Intro:** the current role line, plus the 2–3 core skills to headline. The CV headline is
      *Creative Developer | Frontend Development | Interactive Experiences*. Use that?
- [ ] **Chapter 5 framing:** what kind of role you're looking for next (one sentence).

## Resolved
- [x] **PDF to download:** reuse `/Lotus_Tay_CV.pdf` from the portfolio (decided in Phase 1).
- [x] **Contact route:** `mailto:lotusetay@gmail.com`, as used by the portfolio Nav and Projects section.

## Already consistent (no action needed)
- Name, London base, email (`lotusetay@gmail.com`), portfolio, GitHub (`github.com/lotus-pocus`)
  and LinkedIn (`linkedin.com/in/lotus-tay`) on the CV
- Grown On Trees, live at https://grownontrees.gg/ (React, Vite, JavaScript, Sanity CMS, MapLibre GL JS, Netlify)
- Core skills and technologies, as now worded on the live CV. Wording changed since the wireframe copy:
  "AI-Assisted Development & Prototyping", "VR/AR Testing & Deployment", "Cross-Disciplinary
  Collaboration", "Cross-Browser & Mobile Testing", "Technical Documentation & Briefing".
