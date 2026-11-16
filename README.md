# wos-new-design

A rebuild of [wforce.org](https://wforce.org), the site for Workforce Opportunity Services, moving it off WordPress onto Next.js 16.
Same content and information architecture as the live site, with a new front end and design system.

**Live preview:** [wos-new-design.vercel.app](https://wos-new-design.vercel.app)

## Stack

- Next.js 16 (App Router), React 19, TypeScript in strict mode
- Tailwind CSS v4, with every colour and type token in `app/globals.css`
- GSAP for the one scroll-linked scene, d3-geo with world-atlas for the impact globe, lucide-react for icons
- No UI component library

## Run it locally

```sh
npm install
npm run dev
```

Then open http://localhost:3000.
People are edited at http://localhost:3000/admin/people, in development only.

## Docs

- [CLAUDE.md](CLAUDE.md) - the rules for anyone working on the site, people or agents
- [DESIGN.md](DESIGN.md) - the design system and the reasoning behind it
- [PROGRESS.md](PROGRESS.md) - where it stands and what is still open
- `AGENTS.md` is written by `next dev` and points coding agents at the Next.js 16 docs
