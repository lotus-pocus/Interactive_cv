# Interactive CV

A five-chapter interactive career story and an accessible HTML CV for Lotus Tay.
It's developed standalone and tested on Netlify, then merged into
[the portfolio](https://lotus-pocus-portfolio.vercel.app) at `/interactive-cv` and `/cv`.

- Brief: `docs/BRIEF.md`
- Plan and integration steps: `docs/IMPLEMENTATION_PLAN.md`
- Facts to confirm: `docs/CONTENT_CHECKLIST.md`
- Instructions for Claude Code: `CLAUDE.md`

## Run it locally
Needs Node 22.

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run build && npm run preview   # production build at http://localhost:4173
```
