# Build plan

The wforce.org rebuild.
Same content, same information architecture, new front end.

Read [CLAUDE.md](CLAUDE.md) first.
It carries the rules; this file carries the work.

## Where things come from

Two sources, both read only, answering different questions.

**`../wforce-mirror/` answers "what does the site contain".**
A complete HTTrack mirror plus three verified inventory files.
Content, images, page copy, and the information architecture all come from here.

**`/Users/pranish/Documents/wos-new-center/proposed_center/site/` answers "how does it look".**
A Next.js 16 app for a WOS sub-brand center site with a mature design system.
Its `DESIGN.md` is 18KB and unusually complete: it records not just the rules but the rejected alternatives and why each failed.
Four card fill attempts, the teal removal, the Georgia and Trajan retirement.
That reasoning is worth porting verbatim rather than re-deriving, because re-deriving it means repeating the mistakes.

Neither source is copied wholesale.

## Stack

Match the reference site so the design system ports without translation.

- Next.js 16, React 19, TypeScript strict
- Tailwind v4, with all tokens in a single `@theme inline` block in `app/globals.css`
- App Router
- No other runtime dependencies

The reference ships zero UI libraries and this build should too.

## Layout

```
wos-new-design/          (this repo)
  CLAUDE.md              the rulebook
  BUILD-PLAN.md          this file
  DESIGN.md              ported from the reference, amended for this site
  AGENTS.md              the Next 16 warning, carried over
  app/
    globals.css          ALL colour and font tokens
    layout.tsx           fonts, metadata template, skip link
    page.tsx             homepage
    our-story/  team/  locations/  financials/  faqs/
    board-of-directors/  academic-advisory-board/
    corporate-partners/  academic-partners/
    managed-service-centers/  facilities-management/  on-site-remote-staffing/
    educational-services/  professional-development/  professional-development-fundamentals/
    advisory-services/  ai-services/  langer-arc/
    itsupport/  cyber-security/  legacy-application-support/
    data-analytics-and-ai/  shared-services/  college-co-ops-and-internships/
    cohorts/  become-a-partner/
    blog/  contact/  donate/  privacy-policy/
    sitemap.ts  robots.ts
  components/
    Brand.tsx            design primitives, ported
    Nav.tsx              REBUILT, see below
    Footer.tsx           adapted
    WosMark.tsx          the only file touching the logo asset
    FadeIn.tsx           ported
  lib/
    brand.ts             every brand name string
    nav.ts               the nav tree as data
  content/               extracted page copy, one file per route
  public/                images harvested from the mirror
  tools/                 extraction scripts, outside the deploy root
```

Keep this repo self contained.
Anything the build reads must live under it.
A build time read of `../wforce-mirror/anything` works in local dev and fails on deploy.
Extraction scripts run once and commit their output; the build never reads the mirror.

## Port, adapt, rebuild

### Port near-verbatim

These carry reasoning that would be lost by rewriting.
Change only what is center-specific.

- `app/globals.css`, including every comment explaining the five WCAG deviations
- `components/Brand.tsx`, the 11 primitives
- `components/FadeIn.tsx`, including the note on why it starts visible
- `DESIGN.md`
- The `next/font` setup in `layout.tsx`

Two font facts that will cause bugs if forgotten.
Montserrat is variable, so omitting `weight` ships one file covering 100 to 900.
Lato is not variable and has no 500 or 600, so `font-medium` and `font-semibold` on body copy will snap or synthesise.
Keep 500 and 600 on Montserrat headings only.

### Adapt: `Footer.tsx`

Same visual language.
Slate surface, `white/75` links, eyebrow labels, and no red text on slate, since red is 2.8:1 there.

Real content from `wforce-header-asis.txt`:

- Service column: Managed Service Centers, Facilities Management, On-Site & Remote Staffing, Educational Services, Advisory Services, Research, News & Events
- Contact block: WOS Headquarters, 475 Riverside Drive, Suite 1350, New York, NY 10115, and +1 (212) 870-2260
- Buttons: Careers (external iCIMS) and Donate
- Legal: Privacy Policy, Institute of Workforce Policy & Practice
- Five social icons: LinkedIn, Facebook, X, Instagram, YouTube

Drop the Teachers College partnership line.
That is the center site's brand.

The footer is the only surface for `/contact/`, `/privacy-policy/`, and `/institute-of-workforce-policy-practice/`.
It cannot be trimmed without relocating those three.

### Rebuild: `Nav.tsx`

The one component that cannot be ported, and the main chrome work.

| | Reference site | wforce.org |
| --- | --- | --- |
| Depth | 4 flat links plus a Contact button | 3 levels of nesting |
| Grouping labels | none | 6, all `href="#"` |
| Top level | About, Programs, Mentors, Leadership | About, Services, News & Events, Join Us, Donate |
| External links | none | 2 iCIMS careers URLs |

Requirements:

- Drive it from `lib/nav.ts` so the tree is data, not JSX.
  It is three levels deep and will change; hand-maintained nested JSX will rot.
- Hover **and** keyboard operable.
  Arrow keys between items, Escape to close, focus visible throughout.
  A three-level hover-only menu is unusable without a mouse and is the most likely thing to ship broken.
- Grouping labels render as non-interactive headings, not as dead links.
  Six of them point at `href="#"` on the live site.
  Do not reproduce that.
- Mobile keeps the reference site's full screen white overlay, with an accordion for the nested levels.
  The reference `Nav.tsx` already handles Escape and body scroll locking; keep both.

`DESIGN.md` §4 describes the center's 4-link header and its 310px Center-name box.
Amend that section, do not copy it.

### `WosMark.tsx`

Point it at the mirror's full horizontal lockup, `wp-content/uploads/2024/09/WOS-Logo_Transparent.png`, 800x163, used on all 117 live pages.

This is better than the reference site has.
Its `public/brand/README.md` documents having only a mark-only 441x163 crop with no wordmark, and works around the gap by setting the org name as adjacent text.
That workaround is unnecessary here.
Keep the single-file seam so swapping in a real SVG later stays a one-file change.

## Content pipeline

A script in `tools/` extracts per-route copy from the mirror into `content/*.ts` as typed objects.

Kubio wraps everything in deep div nests, so extraction targets heading tags and paragraph text.
Expect to hand-clean the output.
Budget for editing, not just running it.

Two things extraction must surface rather than silently carry over.

**Alt text.**
The mirror has 6,099 `<img>` tags with no alt against 351 with it.
Much of that is chrome repeated across 117 pages, but the real per-page count is still large.
Every image needs alt text written during extraction.
This is a genuine accessibility fix the rebuild delivers and it will not happen by itself.

**Image variants.**
Copy only the 234 originals.
The other 563 files are WordPress resize variants and Next/Image regenerates those.
Of the 234, 223 are actually referenced by a page.

## Phases

**1. Scaffold and design system.**
Next 16 app, ported tokens and primitives.
Verify the `DESIGN.md` §9 checks pass on an empty build.
Nothing visual yet.

**2. Chrome.**
`lib/nav.ts`, the three-level `Nav.tsx`, adapted `Footer.tsx`, `WosMark.tsx`.
Test keyboard navigation before building any page.
Everything downstream depends on this being right.

**3. Homepage.**
Its real section structure, already extracted from the mirror:
The WOS Business Solution, Our Unique Method and Solution, Our History, Our Services, Our Approach, Our Impact, Corporate Partners Served, Schedule Your FREE Consultation.
Apply the weight ladder and vary the section rhythm rather than giving every section `py-20`.

**4. About cluster.**
Our Story, Management Team, Locations, Financials, FAQs, Corporate Partners, Academic Partners.
Financials carries 9 PDF links to 990s and financial statements; those assets migrate with the page.

**5. Services cluster.**
The header service pages, plus `/managed-service-centers/` as a hub with its six-card grid, plus the six detail pages behind it.
`PhotoLedCard` from `Brand.tsx` is already the right component for that grid.

**6. News & Events.**
The `/blog/` archive plus 9 posts.

**7. Person pages.**
Blocked on open decision 4, the canonical URL question.
Do not start this until it is settled.

Scope for the first pass is phases 1 through 6: the 26 header-reachable pages plus the 9 hub-reached pages.

## Verification

1. `npm run build` and `npm run lint` clean.

2. All six `DESIGN.md` §9 checks.
   **Check 6 matters most and is the one that gets skipped.**
   It greps the built CSS for `--color-*` to prove tokens actually shipped.
   A misspelled Tailwind v4 token produces no error, so checks 1 through 5 all pass on a completely broken build.

3. **Route parity.**
   Every route in the built app maps to a line in `../wforce-mirror/wforce-header-asis.txt`, and every header and hub page in that file has a route.
   Script it as a set difference and expect empty in both directions.

4. **Nav parity.**
   Extract nav labels and hrefs from the built HTML and diff against the header block of the as-is file.
   Expect zero differences.

5. **Keyboard navigation.**
   Tab through all three menu levels.
   Confirm Escape closes, focus is visible on every interactive element, and the skip link works.

6. **No missing alt.**
   Grep the built HTML for `<img` without `alt` and expect zero.

7. **Visual check** at 375px, 768px, and 1440px.
   No rounded corners on photos, no drop shadows, no two `surface-tint` blocks adjacent, no two dark sections adjacent.

8. **The mirror is untouched.**
   Checksum `../wforce-mirror/` against its state before the work started.
