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

**Images.**
Hero images, service card photographs, and the Our Impact icons are carried over.
`tools/extract.py` now also reads CSS `background-image` from the page's `<style>` blocks, which is where Kubio puts every hero.

**Audit.**
`tools/audit.py` compares the built site against the mirror route by route: how much copy is carried, how many images, and whether every internal link resolves.
It is the thing that caught the missing hero images, the dropped homepage copy, and a footer link to a page that had silently stopped being generated.

**Verification.**
Build and lint clean.
All six DESIGN.md §9 checks pass, check 6 included (14 `--color-*` tokens in the built CSS).
Zero `<img>` without alt in the built HTML.
No rounded corners, shadows, or blur anywhere; no two tinted or two dark sections adjacent on any page.
Route parity: everything in `wforce-header-asis.txt` has a route except the launch blockers and the two payment endpoints.
Zero broken internal links.
Every page carries its live copy and its live images, one h1 each, and a unique title.
The three remaining gaps are the unnamed logos, the 16-of-68 logo strip on the homepage (deliberate), and the live "Form - 990 ." heading, rendered as "Form 990".

## Decisions

- Rulebook lives in `wos-new-design/CLAUDE.md`, not the parent, because only this directory is a git repo and the rules have to travel with it.
- Logo is the mirror's 800x163 full lockup with wordmark, not the reference site's mark-only crop.
- DESIGN.md §9 checks 1, 4, 5 rewritten: they returned hits on a clean tree, and a check that always returns noise gets ignored. Check 5 now looks for the co-branding phrase "in partnership with" rather than for the words Columbia, Northeastern, or Teachers College, all three of which appear legitimately in WOS's own history and in two board biographies.
- Kubio section background images behind body text are not reproduced. Only the first background image on a page is carried, as the hero. The rest are fills laid under text and are the main source of contrast problems on the live site.
- DESIGN.md title, §0 (brand) and §4 (navigation) rewritten for this site. The rest is the reference site's, verbatim.
- Grouping labels render as headings, not links. The live site gives all six `href="#"`.
- Nav uses the APG disclosure-navigation pattern, not a menubar, so panel links stay in normal tab order.
- Dropdown panels span the full bar width; the Services panel is wider than its trigger.
- Mobile has one accordion level, nested groups pre-expanded.
- The header does not unmount on navigation, so each link closes the menu on click. An effect on `pathname` is what the React lint rule forbids.
- Blog posts keep their live top-level slugs via a dynamic `app/[post]` route. Static routes win, so the service pages are unaffected.
- **Person pages are built at the nested paths** (`/team/jose-cabrera`), which is what the sitemap treats as canonical, and the 18 top-level duplicate slugs redirect there permanently from `next.config.ts`. This settles the redirect *direction* in open decision 4. What remains open is whether the duplicates should exist at all in WordPress.
- Blog posts and person pages share the `app/[slug]` segment. Next allows one dynamic name per path position, so `[post]` was renamed; `[slug]/[person]` sits beneath it.
- Content is extracted, not rewritten. Em dashes inside `content/*.ts` are the client's own copy and are left alone; the no-em-dash rule applies to what we write.
- No contact form. The live one posts to WPForms and there is no backend decision yet; a form that drops enquiries is worse than an address.

## Homepage and component revisions

- Partner logos sit on whitespace, not in a bordered grid. The ruled cells read as a spreadsheet and each border competed with the mark inside it; alignment and a shared max height do the same work.
- No arrow glyphs on links anywhere. `ArrowLink` is plain underlined text, and the two card primitives end on a short accent rule that widens on hover instead of a "Learn more" tail, which restated an affordance the whole-card link already carried.
- Consulting to Hire Services and Other Services are eyebrows under the Our Services h2, not sibling headings competing with it.
- Our Approach numerals are `action` red. Red never carries small text on slate at 2.8:1, but a 34px numeral clears the large-text threshold.
- Our Impact is three figures on slate, counting up on scroll, with no cards and no icons. The final value is in the DOM from first paint, so it is correct with JavaScript off and a screen reader never sees the intermediate numbers. `prefers-reduced-motion` skips the animation entirely.

## Open

- The five open decisions in CLAUDE.md are all still open. Phase 7 (person pages) stays blocked on decision 4.
- **19 corporate partner logos cannot be labelled.** Files are named `Picture1.png` to `Picture24.png` and nothing on the live page identifies the company, so there is no honest alt text. They are excluded from `content/partners.ts` and need naming by someone who knows the account list.
- **The live /financials page links the same PDF twice**, for both the FY2025 and FY2024 audited statements. Reproduced as-is; only WOS knows which year is missing.
- `/donate` is prose only. The live payment flow has `payment-success` and `payment-cancel` endpoints and no processor is identified in the mirror.
- The live footer carries a USFCR Verified Vendor badge, not yet carried over.
- **The homepage hero video is not in the mirror.** The live hero is `WOS-Overview-Video-comp.mp4`; HTTrack never fetched it, and there are zero video files in the mirror. The hero is typographic until the file is supplied. Its poster frame on the live site is a Kubio demo placeholder, not WOS footage.
- 14 academic partner logos are unnamed for the same reason as the corporate ones.
- **Not verified in a browser.** The Chrome extension was not connected, so §9's visual pass at 375/768/1440 and the manual keyboard walk through all three menu levels have not been run. Everything checkable from the built HTML was checked.
