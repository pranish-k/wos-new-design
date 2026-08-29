# Progress

What is built, what was decided and why, what is still open.
Terse on purpose.
Plan in [BUILD-PLAN.md](BUILD-PLAN.md), rules in [CLAUDE.md](CLAUDE.md).

## Built

Next 16.2.4 / React 19 / TS strict / Tailwind v4, zero runtime dependencies.
Design system ported from the reference site so tokens needed no translation.

- **Chrome.** `lib/nav.ts` drives a rebuilt three-level `Nav.tsx`, plus `Footer.tsx` and `WosMark.tsx`.
- **Content pipeline.** `tools/extract.py` to `build_content.py` to `harvest.py`, mirror to `content/*.ts` to `public/images/`. Runs once, output committed; the build never reads the mirror.
- **~50 routes.** Prose pages through `ContentPage`, the Managed Service Centers hub, `/financials` with 9 PDFs, both partner walls, five people groups, `/blog` plus 9 posts at their live slugs, `sitemap.ts`, `robots.ts`.
- **People engine.** One JSON record per person, an image pipeline, and a dev-only admin. See below.
- **`tools/audit.py`.** Compares the built site against the mirror route by route: copy carried, images carried, every internal link resolves. It has caught missing heroes, dropped homepage copy, a footer link to a page that had stopped generating, and its own percent-encoding blind spot.

**Green:** build, lint, types. All six DESIGN.md §9 checks including check 6 (14 `--color-*` in built CSS). Zero broken internal links, zero `<img>` without alt, one h1 per page, no two same-fill sections adjacent. Mirror byte-identical.

## People engine

One record per person at `content/people/<slug>.json`, read through `lib/people/store.ts`.
Replaced `content/people.ts`, `content/person-pages.ts`, a hand-written redirect table, and three near-identical page files, which duplicated name and photo with nothing keeping them in sync.

- `groups` decides which pages someone appears on and `groups[0]` owns their URL. `status: "hidden"` removes them without losing the record. Empty `bio` means a card with no page. `legacyPaths` carries their old URLs, which `next.config.ts` derives the redirect table from.
- `membership` holds per-group role and order. A board portfolio and a job title are both true, and each board orders its own page.
- One file per person, not one array, because the admin writes them back and the diff should name who changed.
- Group landings are configuration in `content/groups.ts`, rendered from `app/[slug]/page.tsx` beside blog posts. Next allows one dynamic segment name per path position. A slug claimed by both fails the build.
- The validator throws on a malformed record so a typo fails the build naming the file, rather than rendering a blank card.
- Development re-reads the registry per call instead of caching at module scope, or saving a record would not show up.
- **Photos:** `tools/people-image.mjs` normalises any input to a 1200x1200 WebP named by slug, EXIF rotation applied and stripped, cropped square on the face. It deliberately makes no responsive variants, which Next/Image already does; what it fixes is rotation, crop and ingest size, which Next/Image does not. `sharp` is a devDependency.
- **Admin** at `/admin/people`, development only, unlinked. **A local convenience, not an auth boundary**: with the guard removed and a writable filesystem it is an unauthenticated write endpoint. A new `legacyPath` needs a dev restart, since Next reads redirects once at startup.

Fixed on the way through: Arthur Langer existed as two records; Camille Bryant's name field was `"Chair: Camille J. Bryant"`; six board bios opened with a redundant heading and two showed it where the job title belonged; credentials disagreed between the two old files; four staff photos were never harvested; the sitemap omitted every person page.

## Boards and unreachable pages

Open decision 1 settled: all four boards have pages and header placement.

- **Industry Advisory Board** carries its live copy and 12 members. Three were already in the registry and now hold the board as a second group. Their bios sit behind Popup Maker modals loaded over AJAX and are not in the mirror, so they are card only.
- **HR Advisory Board** had four member pages and no landing page in the mirror at all. Built from the group config and the four members. **Intro copy missing; only WOS can supply it.**
- **Nine of the 15 unreachable pages now have a path.** The other six are built at their live URLs with their live copy.
- **Two of those six are in the Services menu:** `/consulting-to-hire-services/` as the Overview child of its own grouping, matching Educational and Advisory Services; `/managedservices/` beside the two groupings as an umbrella offering. Both joined the sitemap in the same change.
- **Four remain built and linked from nothing:** `/talent-acquisition/`, `/direct-hire/`, `/staff-augmentation/`, `/wos-northeastern-talent-pipeline-program/`. Held out of the sitemap too, since that would be their only discovery path. Placing one means nav or hub grid plus sitemap together.
- Measured with chrome stripped: `/staff-augmentation/` shares ~90% of its copy with `/on-site-remote-staffing/` and is a real duplicate, built on instruction. `/managedservices/` shares 0% with `/managed-service-centers/` despite the name. `/consulting-to-hire-services/` was an unfinished wireframe whose opening line read "Introduction to the COnsuling to Hire service goes her" with four paragraphs of literal "text…". The placeholders were dropped rather than carried into the header and nothing was written to replace them.

## Decisions

- Rulebook lives in `wos-new-design/CLAUDE.md`, not the parent, because only this directory is a git repo.
- Logo is the mirror's 800x163 full lockup, not the reference site's mark-only crop.
- DESIGN.md §9 checks 1, 4 and 5 rewritten: they returned hits on a clean tree, and a check that always returns noise gets ignored. Check 5 looks for "in partnership with" rather than for Columbia, Northeastern or Teachers College, all of which appear legitimately in WOS history and two board biographies.
- Only the first background image on a page is carried, as the hero. The rest are Kubio fills laid under body text and are the main source of contrast problems on the live site.
- Grouping labels render as headings, not links; the live site gives all six `href="#"`. Where one has a real page it is linked as an "Overview" child.
- Nav uses the APG disclosure pattern, not a menubar, so panel links stay in normal tab order. Panels span the full bar width. Mobile has one accordion level. The header survives navigation, so each link closes the menu on click; an effect on `pathname` is what the React lint rule forbids.
- **Person pages live at the nested paths**, which the sitemap treats as canonical, with the duplicates redirecting there. Settles the *direction* of open decision 4. Whether the duplicates should exist at all in WordPress is still open.
- Content is extracted, not rewritten. Em dashes inside `content/*.ts` are the client's own copy; the no-em-dash rule applies to what we write.
- No contact form. The live one posts to WPForms and no backend is chosen; a form that drops enquiries is worse than an address.
- **Homepage:** partner logos on whitespace not in a grid, no arrow glyphs anywhere, service groupings as eyebrows under the Our Services h2, Approach numerals in red at 34px (red never carries small text on slate at 2.8:1, but 34px clears the large-text threshold), Our Impact as three counted figures on slate with no cards or icons. The final values are in the DOM from first paint, so they are correct with JavaScript off and a screen reader never sees the intermediate numbers; `prefers-reduced-motion` skips the animation.
- **Partner walls show every logo:** corporate 87/87, academic 27/27, up from 67 and 13. White tiles with `shadow-sm` on a `surface-tint` section, four across at full width. **The one sanctioned exception to DESIGN.md's no-box and no-shadow rules**, recorded in §7 with its conditions: a logo wall is not content in a container, and on bare tint the darker marks read as heavier partners, which is not true. The section must be tinted or the tiles vanish, so both partner pages tint the wall and leave the CTA below it plain.
- The wall grid reflows on track width, not breakpoints: `repeat(auto-fill,minmax(min(240px,100%),1fr))`. It steps down where content runs out of room rather than at three fixed sizes.

## Open

**Needs WOS or Pranish:**

- **HR Advisory Board intro copy** is missing.
- **Consulting to Hire Services needs real copy.** It is in the header carrying one paragraph, a heading and three photographs.
- **30 partner logos are shown but unlabelled** (`Picture1.png` to `Picture38.png`, `RR-logo.png`, `images.png`, `logo-primary.svg`). They carry `name: ""` so a screen reader skips them rather than announcing a filename. **Those 30 partners do not exist for anyone using assistive technology** until the account list arrives. One word each to fix.
- **The homepage hero video is not in the mirror.** HTTrack never fetched `WOS-Overview-Video-comp.mp4` and there are zero video files on disk. The hero is typographic until the file is supplied.
- `/donate` is prose only; no payment processor is identified in the mirror.
- The live `/financials` page links the same PDF twice, for FY2025 and FY2024. Reproduced as-is; only WOS knows which year is missing.
- A live typo carried over: Craig Cuyar's title reads "Cheif Information Officer".

**Still to do:**

- Open decisions 2, 3 and 5 in CLAUDE.md. Decisions 2 and 3 are now only about where the four unlinked pages go, since their content exists.
- The USFCR Verified Vendor footer badge is not carried over.
- `npm audit` reports a high-severity libvips advisory against the sharp bundled inside Next 16.2.4, not the one added here. Clearing it means Next 16.3.3.
- **Not verified in a browser.** The Chrome extension has never connected, so §9's visual pass at 375/768/1440 and the keyboard walk through all three menu levels have not been run. Everything checkable from the built HTML was checked.
