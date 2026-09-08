# Progress

What is built, what was decided and why, what is still open.
Terse on purpose.
Plan in [BUILD-PLAN.md](BUILD-PLAN.md), rules in [CLAUDE.md](CLAUDE.md).

## Built

Next 16.3.3 / React 19 / TS strict / Tailwind v4, zero runtime dependencies.
Design system ported from the reference site so tokens needed no translation.

- **Chrome.** `lib/nav.ts` drives a rebuilt three-level `Nav.tsx`, plus `Footer.tsx` and `WosMark.tsx`.
- **Content pipeline.** `tools/extract.py` to `build_content.py` to `harvest.py`, mirror to `content/*.ts` to `public/images/`. Runs once, output committed; the build never reads the mirror.
- **~50 routes.** Prose pages through `ContentPage`, the Managed Service Centers hub, `/financials` with 9 PDFs, both partner walls, five people groups, `/blog` plus 9 posts at their live slugs, `sitemap.ts`, `robots.ts`.
- **People engine.** One JSON record per person, an image pipeline, and a dev-only admin. See below.
- **`tools/audit.py`.** Compares the built site against the mirror route by route: copy carried, images carried, every internal link resolves. It has caught missing heroes, dropped homepage copy, a footer link to a page that had stopped generating, and its own percent-encoding blind spot.
- **Shipping chrome.** A styled 404 and a route-level error boundary, the live site's own
  512px WOS icon as `app/icon.png`, and a 1200x630 share card at `app/opengraph-image.png`
  composed by `tools/og-image.mjs`. `robots.ts` disallows `/admin/` and `/api/`.
- **The site origin is derived, not hardcoded.** `SITE_URL` in `lib/brand.ts` resolves to
  `wforce.org` in production and to `VERCEL_URL` on a preview, so a preview link's share
  card and sitemap point at the deployment rather than at the live WordPress site.

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

## Partnerships, and the homepage that holds them

Three things WOS is doing that the mirror has no record of, plus the homepage recomposition they forced.

- **WOS-Hunter College AI & Digital Operations Partnership.** Hand-authored from the executive overview WOS supplied, at `/wos-hunter-college-partnership/`, in the header under About > Partners and in the sitemap in the same change. The Hunter mark joins the academic partner wall. It is the one entry there not from the live site.
- **Center for Imagination, Reflective Development, and AI Futures**, at `/center-for-imagination/`, eyebrow "Proposed". **Every funder name, every dollar figure and the whole five-year budget table are deliberately absent.** The source is a fundraising document naming roughly twenty foundations, technology and entertainment companies and federal agencies as *targets*; none has agreed, and publishing the list would state an intention as a fact and tell each named party the size of the ask before it is made. The proposed organisational divisions are out for a related reason: five named laboratories imply an institution that does not exist.
- **Center for Strategic Learning and Leadership for the Digital Age** is named on the homepage and links out to its own deployment at `https://new-center-pi.vercel.app/`. External, `noopener noreferrer`, new tab, following the `CAREERS_URL` convention. The link goes there rather than to a summary page here: two pages describing one center would compete for the same search result, which is the problem recorded below for `/staff-augmentation/`. Note that deployment's chrome is Teachers College branded, which is consistent with the credit on the card and is why the card carries it.
- **`Research` became a nav grouping** under Services, holding the Langer Arc, the Institute of Workforce Policy & Practice and the new Center. The Institute was previously reachable only from `FOOTER_LEGAL`. This does not reopen decision 5, which was about depth: Research sits level with Consulting to Hire, so Services is still two levels below the bar.

### The homepage was recomposed, not decorated

Eight of nine sections were `py-20`, the fills alternated mechanically, there was no photograph above the partner logos, and the proof of the organisation sat at position seven of nine.

- **Our impact moved to position two** and flipped from slate to tint, so it reads as a proof strip and gives the dark hero a light section to land on. Numerals dropped 64/76 to 52/64 for a `py-12` band. `CountUp` is unchanged.
- **Our History moved down to introduce the partner wall.** Its copy names Parsons, J&J, GE, HP, Prudential, BNY Mellon, American Airlines and JetBlue and the wall shows those marks, so the wall is evidence rather than a logo dump. "Founded in 2005 as a 501(c)(3) social enterprise." moved with it, from the impact band where it read as a footnote to nothing.
- **The hero carries a photograph**, a WOS panel discussion, under a `surface-deep/85` overlay with the section keeping its slate fill. A failed image load lands on exactly the previous design, so the h1's contrast is a floor rather than a hope.
- Fill sequence is now dark, tint, white, tint, white, dark, white, tint, dark, verified in the built HTML. Padding runs 12 to 32 rather than nine `py-20`s.
- **A live AA failure was fixed on the way through.** `SecondaryButton` resolves to `text-action-deep`, which is **2.31:1 on `surface-dark`** - the §8 "red text on slate" row - and the homepage hero was the one place it sat on a dark surface. It has a `dark` prop now. This was not caused by this change; it shipped with the original homepage.

### Motion: the port was finished, not invented

`--duration-fade` and `--ease-fade` had been declared in `globals.css` since the token port **with zero call sites**, and `PhotoLedCard` carried three hover gestures the homepage never used. The rule and the code disagreed.

- `components/FadeIn.tsx` ported from the reference site verbatim, docblock included. It starts visible and hides only after mount, only below the fold, only when reduced motion is not set. Zero `opacity:0` in the built homepage HTML, which is the regression that docblock exists to prevent.
- `ServiceCard` gained the lift and the growing rule. **It was not replaced by `PhotoLedCard`**, which needs a `description` per card, and the six service pages' meta descriptions are unusable as one: `/on-site-remote-staffing/` is literally "Our Expertise". Same wall the nav's third tier hit. Six one-line descriptions would close both at once.
- The partner wall desaturates on the homepage only, via an opt-in `muted` prop. On the two partner pages the logos are the content and greying out the content is not a treatment.
- **DESIGN.md §10 is new** and records the five gestures, the reduced-motion guarantee, the SSR rule and what stays banned. §1's "not animations" line now points at it.

### The one Teachers College credit

**Decided deliberately, overriding two written rules, both amended in the same change.**

The homepage names the Center and credits its Teachers College partnership, because a center named without its institution reads as a marketing label. The Center is the subject of that sentence and WOS never is.

`DESIGN.md` §9 check 5 is now 5a and 5b. 5a asserts the phrase reaches the homepage and no other route, which catches a co-branded header or footer harder than the original did, because chrome renders everywhere and 5a names the offending files. 5b asserts that on the homepage the phrase is preceded by "A WOS center,". Do not remove the credit as a brand error.

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
- 52 orphaned images were removed in the audit: superseded WordPress headshots, duplicate
  logo variants, and four `Picture*.png` that appear on no live partner page.
  `public/images` went 45M to 27M, and the partner walls still measure 87/87 and 27/27.

- **The header dropdown took three attempts.** The faults in `screenshot/header ss.png`
  were real: one `GROUP_HEADING` style at every depth, so a grouping and the grouping
  inside it were identical, and a panel anchored to the viewport rather than its trigger.
  Version 1 fixed both with `Eyebrow`-headed columns on a `surface-tint` fill and was
  rejected as "pretty but impractical". Version 2 was a plain single-column dropdown and
  was rejected too. Version 3 was built to a reference the client supplied
  (`screenshot/image.png`): a bordered white card of columns divided by vertical rules.
  **All three were built without ever seeing them render**, because the Chrome extension
  has never connected. That is the actual reason it took three passes, not the design.
  The flattened two-level tree was kept throughout and all 33 hrefs are unchanged.
  The reference's third tier, a one-line description per item, was declined for lack of
  copy; it remains the single biggest available improvement if WOS supplies ~20 lines.

## Open

**Needs WOS or Pranish:**

- **The Hunter 92% figure needs a source.** The overview claims "approximately 92% of WOS revenue is reinvested in participant wages, tuition assistance, and workforce development". It is carried on the page as written. On a 501(c)(3) site with `/financials/` and nine filed PDFs one click away, an unsourced tilde-prefixed percentage is the highest-risk line in that copy. Either tie it to a named year and a filing, or drop the figure and keep the claim.
- **Six one-line service descriptions** would promote the homepage service grid from `ServiceCard` to `PhotoLedCard`. The same twenty-odd lines would give the nav its third tier.
- **A Hunter photograph.** The partnership page has no image of its own, and the homepage hero photo is now on three pages.

- **HR Advisory Board intro copy** is missing.
- **Consulting to Hire Services needs real copy.** It is in the header carrying one paragraph, a heading and three photographs.
- **30 partner logos are shown but unlabelled** (`Picture1.png` to `Picture38.png`, `RR-logo.png`, `images.png`, `logo-primary.svg`). They carry `name: ""` so a screen reader skips them rather than announcing a filename. **Those 30 partners do not exist for anyone using assistive technology** until the account list arrives. One word each to fix.
- **The homepage hero video is not in the mirror.** HTTrack never fetched `WOS-Overview-Video-comp.mp4` and there are zero video files on disk. The hero is typographic until the file is supplied.
- `/donate` is prose only; no payment processor is identified in the mirror.
- The live `/financials` page links the same PDF twice, for FY2025 and FY2024. Reproduced as-is; only WOS knows which year is missing.
- A live typo carried over: Craig Cuyar's title reads "Cheif Information Officer".

**Still to do:**

- Open decisions 2 and 3 in CLAUDE.md, now only about where the four unlinked pages go, since their content exists. Decision 5 is settled.
- The USFCR Verified Vendor footer badge is not carried over.
- **Not verified in a browser.** The Chrome extension has never connected, so §9's visual pass at 375/768/1440 and the keyboard walk through all three menu levels have not been run. Everything checkable from the built HTML was checked.
