# Progress

Running log of what is done and what was decided.
Terse on purpose.
Plan lives in [BUILD-PLAN.md](BUILD-PLAN.md), rules in [CLAUDE.md](CLAUDE.md).

## Done

**Phase 1 - scaffold and design system.**
Next 16.2.4 / React 19 / TS strict / Tailwind v4, matching the reference site so tokens ported without translation.
Ported `globals.css`, `Brand.tsx` (11 primitives), `FadeIn.tsx`, `DESIGN.md`, the `next/font` setup.
Wrote `lib/brand.ts` from real live-site strings.
All six DESIGN.md §9 checks pass, check 6 included (all 14 `--color-*` tokens present in built CSS).

**Phase 2 - chrome.**
`lib/nav.ts` (nav tree as data), `Nav.tsx` (rebuilt, three levels), `Footer.tsx` (adapted), `WosMark.tsx`.
Wired into `app/layout.tsx`.
Build and lint clean; every nav and footer href present in the built HTML.

## Decisions

- Rulebook lives in `wos-new-design/CLAUDE.md`, not the parent, because only this directory is a git repo and the rules have to travel with it.
- Logo is the mirror's 800x163 full lockup with wordmark, not the reference site's mark-only crop. No adjacent org-name text needed.
- DESIGN.md §9 checks 1, 4, 5 rewritten: they returned hits on a clean tree, and a check that always returns noise gets ignored.
- DESIGN.md title, §0 (brand) and §4 (navigation) rewritten for this site. The rest is the reference site's, verbatim, reasoning included.
- Grouping labels render as headings, not links. Live site gives all six `href="#"`.
- Nav uses the APG disclosure-navigation pattern, not a menubar, so panel links stay in normal tab order.
- Dropdown panels span the full bar width; the Services panel is wider than its trigger.
- Mobile has one accordion level, nested groups pre-expanded. Three taps to a service page is the problem, not the fix.
- The header does not unmount on navigation, so each link closes the menu on click. An effect on `pathname` is what the React lint rule forbids.
- Trailing slashes are kept in `lib/nav.ts` because the live site is inconsistent; Next normalises them away in output, so the old URLs need redirects.

## Open

- The five open decisions in CLAUDE.md are all still open. Phase 7 (person pages) stays blocked on decision 4.
- Live footer carries a USFCR Verified Vendor badge. Deferred to the image harvest.
