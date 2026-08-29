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

## People engine

One record per person at `content/people/<slug>.json`, read through `lib/people/store.ts`.
Replaces `content/people.ts` (cards), `content/person-pages.ts` (bios), the hand-written redirect table, and three near-identical group page files. Name and photo were duplicated across the first two with nothing keeping them in sync.

- `groups` decides which pages someone appears on; `groups[0]` owns their URL, so a person on two boards still has one page. `status: "hidden"` removes them without losing the record. Empty `bio` means a card with no page, replacing the old `href: null`. `legacyPaths` carries the redirects, which `next.config.ts` derives.
- `membership` holds per-group role and order overrides. A board portfolio ("On-Demand Initiatives") and a job title ("SVP and CIO at Turner Construction") are both true, and each board orders its own page. Absent on most records.
- Group landings are configuration in `content/groups.ts` and render from `app/[slug]/page.tsx`, beside blog posts. Next allows one dynamic segment name per path position and posts already owned `[slug]`; `[slug]/[person]` already resolved that segment as a group parent. A slug claimed by both a post and a group fails the build.
- The store validator throws on a malformed record rather than skipping it, so a typo fails the build naming the file instead of rendering a blank card. `next.config.ts` names the file too, since it parses these before the validator runs.
- In development the registry is re-read on every call rather than cached at module scope. Saving a record and not seeing it was the first thing that broke.
- One file per person rather than one array, because the admin writes them back: rewriting a 600-line TS array from a form is a parser problem, and the diff now names who changed.

**Photos.** `tools/people-image.mjs` normalises any input to a 1200x1200 WebP named after the slug: EXIF rotation applied and stripped, cropped square on the face with sharp's attention strategy. It deliberately does not generate responsive variants, which Next/Image already does; what Next/Image does not do is fix rotation, crop, and a 6MB ingest. 44 photos, about 53KB each. `sharp` is a devDependency, so nothing new ships to the browser.

**Admin** at `/admin/people`, development only, not linked from the site. Add, edit, hide, reorder, delete, drop a photo in. Publishing is a commit, so every change is in git history with an author. **This is a local convenience, not an authentication boundary**: with the guard removed and a writable filesystem it is an unauthenticated write endpoint. A new `legacyPath` needs the dev server restarted, because Next reads the redirect table once at startup.

**Data fixes found on the way through.**

- Arthur Langer existed as two records, one on the board with a page and one card-only on the team page. Merged; his team card now links.
- Camille Bryant's name field was `"Chair: Camille J. Bryant"`. The office moved to her role.
- Six board bios opened with a redundant "Board of Directors" heading, and two showed that heading where their job title should have been. Roles now come from a real field, so the heuristic that guessed a short first paragraph is gone.
- Names now carry their credentials consistently (Dr., Ph.D., Esquire), which the two old files disagreed about.
- Four staff photos had never been harvested into `public/images/`.
- The sitemap hand-listed three group paths and omitted every person page. Both are derived now. It was also missing `/institute-of-workforce-policy-practice`, which every footer links.

## Boards

Open decision 1 is settled: all four boards have pages and header placement.

- **Industry Advisory Board** carries its live intro copy, its four responsibilities, and 12 member cards. Three members were already in the registry and now hold the board as a second group rather than a second record. Their bios sit behind Popup Maker modals loaded over AJAX and are not in the mirror, so those members are card only.
- **HR Advisory Board** had four canonical member pages and no landing page in the mirror at all. The page is built from the group config and the four members, with their bios. **Its intro copy is missing and has to come from WOS** - a mission statement for a real board is not something to invent.
- Chrome on the HR member pages was stripped by frequency, since Kubio emits no landmarks. The consultation form seeds per-page scrambled word fragments as a spam trap that survive that pass, so bio paragraphs are length-filtered.

Nine of the 15 unreachable pages now have a path. Six remain: the four-page orphaned service island, `/managedservices/`, and `/wos-northeastern-talent-pipeline-program/`.

## The six unlinked pages

All six live pages that no visitor could reach are now built at their live URLs with their live copy and images. **Two are now in the header; four are still linked from nothing.**

- **In the Services menu:** `/consulting-to-hire-services/` as the Overview child of its own grouping, matching how Educational Services and Advisory Services already work. `/managedservices/` as a sibling of the two groupings, since it is an umbrella offering rather than a line under either. Its label sits one row from "Managed Service Center", a different page, which is a naming collision worth watching.
- **Still unlinked:** `/talent-acquisition/`, `/direct-hire/`, `/staff-augmentation/`, `/wos-northeastern-talent-pipeline-program/`.
- **`/consulting-to-hire-services/` was an unfinished wireframe on the live site.** Its opening line reads "Introduction to the COnsuling to Hire service goes her" and four body paragraphs are the literal strings "text…" and "more text…". The placeholders are dropped, because the page is now in the header. Nothing was written to replace them: what is left is the one real paragraph, a heading, and three photographs that now carry hand-written alt text. **The page is thin and wants real copy from WOS.** Its live meta description was the truncated placeholder, so it would have shipped as the search result; it now uses the real closing sentence.
- The four still-unlinked pages are held out of `app/sitemap.ts`. A sitemap entry would be the only discovery path for a page nothing links to, which is not the same as "not connected". Placing one means nav or hub grid plus sitemap in the same change.
- Measured against the built pages with chrome stripped by frequency: `/staff-augmentation/` shares about 90% of its copy with `/on-site-remote-staffing/` and is a real duplicate. `/managedservices/` shares 0% with `/managed-service-centers/` despite the name, and is a distinct page. `/consulting-to-hire-services/` is a 55-word stub named after a menu label. The other three carry 200 to 450 words of their own.
- Built on instruction to carry all six over. The duplicate is the one to watch: if it and On-Site & Remote Staffing are ever both linked, they compete for the same search result.
- Adding them to `tools/extract.py` shifted the chrome-frequency corpus from 32 pages to 38. No existing content file changed; the run was purely additive, plus five new images.

## Open

- Open decisions 2, 3 and 5 in CLAUDE.md are still open. Decisions 2 and 3 are now purely about where the six unlinked pages go, since their content exists. Decision 1 is settled and decision 4 is settled in favour of the sitemap's nested paths.
- **The HR Advisory Board intro copy is missing** and only WOS can supply it.
- **The Consulting to Hire Services page needs real copy.** It is in the header now and carries one paragraph, a heading and three photographs.
- `npm audit` reports a high-severity libvips advisory against the sharp bundled inside Next 16.2.4, not the one added here. Clearing it means Next 16.3.3.
- A live-content typo carried over as-is: Craig Cuyar's title reads "Cheif Information Officer".
- **19 corporate partner logos cannot be labelled.** Files are named `Picture1.png` to `Picture24.png` and nothing on the live page identifies the company, so there is no honest alt text. They are excluded from `content/partners.ts` and need naming by someone who knows the account list.
- **The live /financials page links the same PDF twice**, for both the FY2025 and FY2024 audited statements. Reproduced as-is; only WOS knows which year is missing.
- `/donate` is prose only. The live payment flow has `payment-success` and `payment-cancel` endpoints and no processor is identified in the mirror.
- The live footer carries a USFCR Verified Vendor badge, not yet carried over.
- **The homepage hero video is not in the mirror.** The live hero is `WOS-Overview-Video-comp.mp4`; HTTrack never fetched it, and there are zero video files in the mirror. The hero is typographic until the file is supplied. Its poster frame on the live site is a Kubio demo placeholder, not WOS footage.
- 14 academic partner logos are unnamed for the same reason as the corporate ones.
- **Not verified in a browser.** The Chrome extension is still not connected, so §9's visual pass at 375/768/1440 and the manual keyboard walk through all three menu levels have not been run. Everything checkable from the built HTML was checked, including one h1 per page and no two same-fill sections adjacent on any people page.
