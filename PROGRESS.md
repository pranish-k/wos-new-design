# Progress

Running log of what is done and what was decided.
Terse on purpose.
Plan lives in [BUILD-PLAN.md](BUILD-PLAN.md), rules in [CLAUDE.md](CLAUDE.md).

## Done

**Phase 1 - scaffold and design system.**
Next 16.2.4 / React 19 / TS strict / Tailwind v4, matching the reference site so tokens ported without translation.
Ported `globals.css`, `Brand.tsx` (11 primitives), `FadeIn.tsx`, `DESIGN.md`, the `next/font` setup.
`lib/brand.ts` written from real live-site strings.

**Phase 2 - chrome.**
`lib/nav.ts` (nav tree as data), `Nav.tsx` (rebuilt, three levels, keyboard operable), `Footer.tsx`, `WosMark.tsx`, wired into `app/layout.tsx`.

**Phase 3 - content pipeline and homepage.**
`tools/extract.py` pulls page copy out of the mirror, `tools/build_content.py` shapes it into `content/*.ts`, `tools/harvest.py` copies the 186 referenced original images into `public/images/`.
Homepage built with its real section structure and the live counter values.

**Phases 4 to 6 - pages.**
33 routes: 27 prose pages through `ContentPage`, the `/managed-service-centers/` hub with its six-card grid, `/financials` with 9 PDFs, the two partner pages with the logo wall, three person index pages, `/blog` plus the 9 posts at their live top-level slugs, `/contact`, `sitemap.ts`, `robots.ts`.

**Verification.**
Build and lint clean.
All six DESIGN.md §9 checks pass, check 6 included (14 `--color-*` tokens in the built CSS).
Zero `<img>` without alt in the built HTML.
No rounded corners, shadows, or blur anywhere; no two tinted or two dark sections adjacent on any page.
Route parity: everything in `wforce-header-asis.txt` has a route except person pages, the launch blockers, and the two payment endpoints.

## Decisions

- Rulebook lives in `wos-new-design/CLAUDE.md`, not the parent, because only this directory is a git repo and the rules have to travel with it.
- Logo is the mirror's 800x163 full lockup with wordmark, not the reference site's mark-only crop.
- DESIGN.md §9 checks 1, 4, 5 rewritten: they returned hits on a clean tree, and a check that always returns noise gets ignored. Check 5 no longer greps "Columbia" or "Northeastern", because both are part of this site's own history.
- DESIGN.md title, §0 (brand) and §4 (navigation) rewritten for this site. The rest is the reference site's, verbatim.
- Grouping labels render as headings, not links. The live site gives all six `href="#"`.
- Nav uses the APG disclosure-navigation pattern, not a menubar, so panel links stay in normal tab order.
- Dropdown panels span the full bar width; the Services panel is wider than its trigger.
- Mobile has one accordion level, nested groups pre-expanded.
- The header does not unmount on navigation, so each link closes the menu on click. An effect on `pathname` is what the React lint rule forbids.
- Blog posts keep their live top-level slugs via a dynamic `app/[post]` route. Static routes win, so the service pages are unaffected.
- Person cards are not links. Open decision 4 governs the canonical person URL and 19 redirects hang off it; linking them now would answer it silently.
- Content is extracted, not rewritten. Em dashes inside `content/*.ts` are the client's own copy and are left alone; the no-em-dash rule applies to what we write.
- No contact form. The live one posts to WPForms and there is no backend decision yet; a form that drops enquiries is worse than an address.

## Open

- The five open decisions in CLAUDE.md are all still open. Phase 7 (person pages) stays blocked on decision 4.
- **19 partner logos cannot be labelled.** Files are named `Picture1.png` to `Picture24.png` and nothing on the live page identifies the company, so there is no honest alt text. They are excluded from `content/partners.ts` and need naming by someone who knows the account list.
- **The live /financials page links the same PDF twice**, for both the FY2025 and FY2024 audited statements. Reproduced as-is; only WOS knows which year is missing.
- `/donate` is prose only. The live payment flow has `payment-success` and `payment-cancel` endpoints and no processor is identified in the mirror.
- The live footer carries a USFCR Verified Vendor badge, not yet carried over.
- **Not verified in a browser.** The Chrome extension was not connected, so §9's visual pass at 375/768/1440 and the manual keyboard walk through all three menu levels have not been run. Everything checkable from the built HTML was checked.
