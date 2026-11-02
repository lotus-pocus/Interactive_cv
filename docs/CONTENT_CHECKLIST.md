# Content checklist: confirm before publishing

The conventional CV is the source of truth. These are the points where the wireframe story
(PDF p.2), the brief and the CV (PDF p.8) don't yet line up, or where a fact is still missing.
Tick each one off, then Claude Code writes the confirmed copy into `src/interactive-cv/data/`.

## Must resolve
- [ ] **Gamoola job title.** The CV says *Digital Operations Manager, Feb 2017 – Present*. The story
      says admin/studio managing → *Digital Lead*. Is it one title or a progression? If it's a
      progression, give dates for each step so the story and CV agree.
- [ ] **Brower Lewis PR, Account Manager.** It's on the CV but missing from the brief's chapter plan.
      Proposal: put it in Chapter 3, after the press office role. Is "headhunted" and
      "five fashion brands" accurate and OK to say publicly?
- [ ] **Giorgio Armani, Press Officer.** Did "stock controller for sample collections" and then press
      officer both happen at Armani? This decides the order in Chapter 3.
- [ ] **Freelance client name.** Check the spelling ("Channoil"?) and whether there's a public link to the map.
- [ ] **"Over 50 GitHub projects"** (wireframe p.6). Confirm the count or drop the number.
- [ ] **Certificate wording.** The CV says *Front-End Web Development Certificate, Trilogy Education
      Services (edX)*. The certificate says *UK Skills 16-Week Front End Web Development, 22 March 2023*.
      Pick one wording, and say whether to show the date. Suggest it goes in Chapter 4 as "Skilled up".
- [ ] **PDF to download.** Which file, and at what URL? It lists your personal mobile number. Are you
      happy for that to be publicly downloadable, or should there be a web version without it?
- [ ] **Contact route** for "Get in touch". Use what the portfolio already has (mailto, form or LinkedIn).

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
- [ ] **Chapter 4 projects:** choose 1–3 with URLs, e.g. Photo-Panic (host + player links), a
      Gamoola project you can show publicly.
- [ ] **Intro:** the current role line, plus the 2–3 core skills to headline.
- [ ] **Chapter 5 framing:** what kind of role you're looking for next (one sentence).

## Already consistent (no action needed)
- Name, London base, portfolio, GitHub (`lotus-pocus`) and LinkedIn URLs on the CV
- Grown On Trees, live at https://grownontrees.gg/ (React, Vite, Sanity, MapLibre, Netlify)
- Core skills and technologies list
