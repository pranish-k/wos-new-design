# Project rulebook

A rebuild of wforce.org, the Workforce Opportunity Services site.
The live site runs on WordPress with the Kubio page builder.
We are rebuilding it as a modern Next.js app with the same content and the same information architecture, and a new front end.

This repo is the rebuild.
The full build plan is at [BUILD-PLAN.md](BUILD-PLAN.md), and it is worth reading before starting work.

## The three directories

| Directory | What it is | Editable |
| --- | --- | --- |
| `.` (this repo) | The rebuild. All new work happens here. | Yes |
| `../wforce-mirror/` | HTTrack mirror of the live site, plus three verified inventory files. | **Never** |
| `../screenshot/` | Screen captures of the live site used to verify the nav. | **Never** |

`../wforce-mirror/` and `../screenshot/` sit outside this repo on purpose.
They are large, they are reference, and they must never be committed here.

There is a fourth directory, also outside this repo:

`/Users/pranish/Documents/wos-new-center/proposed_center/site/` is a Next.js app for a WOS sub-brand center site.
It is the visual reference for this rebuild and is **read only**.
Its `DESIGN.md` is the source of truth for how the rebuild looks.

### `../wforce-mirror/` is never edited

This is a hard rule, not a preference.
It is a mirror of a live production site and the only record of what that site currently contains.
An error found in it is a finding to report, never a file to correct.
If something in it looks wrong, say so and leave it alone.

The same applies to `../screenshot/`.

## What the site actually contains

Three files in `../wforce-mirror/` record this, and all three are verified against the live markup and the screenshots.
Read them before building any route.
Do not infer structure from the mirror's directory tree, and never invent structure.

| File | What it holds |
| --- | --- |
| `wforce-header-asis.txt` | The live navigation as observed. The factual baseline. |
| `wforce-tree-futurebuild.txt` | The proposed navigation. Every node tagged against the baseline. |
| `wforce-pages-clean.txt` | Flat inventory of all 117 pages, classified. |

Two further files, `wforce-tree-clean-old.txt` and `wforce-tree-old.txt`, are superseded
and named accordingly.
They still hold the raw URL hierarchy if you need it, but the three files above are the
current record and disagreements resolve in their favour.

An earlier version of `wforce-tree-futurebuild.txt` drifted badly.
It invented sections and pages that do not exist, dropped three of the five real top level nav items, and presented all of it as observed fact.
It had to be rebuilt from the screenshots.
That is why the as-is file and the proposal file are now separate, and why every node in the proposal carries a tag.
Keep them separate.

### The site has three navigation tiers

Recording only the header understates reachability badly.

```
tier 1  header nav      the menu bar and its dropdowns
tier 2  in-page hubs    card grids on landing pages, the only path to tier 3
tier 3  detail pages    reachable only through a tier-2 card
```

`/managed-service-centers/` is the clearest example.
It is not a leaf page.
Its six-card grid is the only route to six other pages.
Hub pages are load bearing: empty one and everything it links to becomes unreachable.

## Open decisions

Five questions are unresolved.
Do not silently resolve any of them.
If a task depends on one, raise it.

1. **The four boards are handled four different ways.**
   Board of Directors and Academic Advisory Board are in the header.
   Industry Advisory Board is a live page nobody can reach.
   HR Advisory Board has four live member pages and no landing page at all.
2. **Program pages have no consistent home.**
   Cohorts and College Co-ops are reachable through a hub.
   The WOS-Northeastern pipeline program has no path at all.
3. **College CO-OP and Internship sits under Managed Service Centers.**
   A student program filed under an IT service line looks like an accident of page building rather than a decision.
4. **Person page URLs are inconsistent.**
   19 of 29 person cards link to top level duplicate slugs while the sitemap treats the nested paths as canonical.
   This governs 19 redirects and must be settled before person pages are built.
5. **The Services menu is four levels deep** including the top bar.
   Preserved for parity, but deep enough to be a usability problem on touch devices.

### The 15 unreachable pages are launch blockers

A breadth-first crawl from `/` reaches 95 URLs and misses 35 canonical pages.
Eighteen of those are person pages whose content is reachable at a duplicate URL, and two are payment endpoints.
The remaining 15 are live content with no path to them at any URL.

They are listed in `wforce-header-asis.txt`.
Each needs an explicit decision: give it a path, or retire it with a redirect.
Carrying them over untouched reproduces the problem in the new site.

Four of them form an isolated island.
`/consulting-to-hire-services/` and `/talent-acquisition/` each link out to Cohorts, Direct Hire, and Staff Augmentation, and nothing links in.
Note that the live menu has a grouping label named "Consulting to Hire Services" pointing at `href="#"` while a real page of that exact name sits stranded.
The menu was reorganised and the old landing pages were left behind.

## Design

`DESIGN.md` is the source of truth for colour, type, components, and the anti-pattern list.
Read it before writing any component.
Before making a visual judgment call, add it there.

The rules below are the ones most often broken.

**Never write a hex literal in a component.**
Every colour is a token in `app/globals.css`.
If the colour you want is not a token, the answer is almost always an existing token.

**Red is the only accent.**
It is 4.47:1 on white and 2.8:1 on slate, so it marks rules and fills but never small text on either surface.
Label text is muted ink on light surfaces and white on dark.

**Teal does not exist as a token and that is deliberate.**
`bg-wos-teal` will not compile.
It read as a second accent competing with red, and its hue leaked into the neutrals and tinted every surface.
A colour that should not be used is best represented by a token that does not exist.

**No rounded corners, no drop shadows, no glassmorphism.**
The reference bar is Columbia GSAPP and MIT Media Lab, not a SaaS startup.
Straight edges read as authoritative.

**No full box drawn around content.**
A dark or high contrast box is the fastest way to make a page look cheap.
Separation comes from fill, spacing, and type hierarchy.
A 1px light border between a white card and a white page divides nothing and reads as unfinished: give the card a `surface-tint` fill instead.

**Vary the section rhythm.**
Not every section gets `py-20`.
Never put two `surface-tint` blocks in a row or two dark sections back to back; both read as one oversized block.

## Verifying visual changes

Type checking catches none of this.
A misspelled Tailwind v4 token produces no error at all: `text-ink-mutedd` generates no rule, the element inherits, and the page looks almost right.

The check commands are in `DESIGN.md` §9.
**Check 6 is the one that matters and the one that gets skipped.**
It greps the built CSS to prove the tokens actually shipped.
Checks 1 through 5 all pass on a completely broken build.

Grep the compiled CSS, not just the components.
A stale token can live in `globals.css` and reach every page without appearing in any component.

**After editing `globals.css`, run `rm -rf .next` and restart.**
Turbopack caches token values and will serve the old colour through a hot reload with no error.

## Brand

WOS leads.
Brand name strings live in `lib/brand.ts` and nowhere else.

**Teachers College and Columbia belong to the center site, not this one.**
The reference site is a WOS sub-brand in partnership with Teachers College, and its chrome credits that partnership.
This site is the main WOS site and must not carry it.

**Northeastern is a special case.**
The reference site's rules say never mention it.
That rule belongs to the reference site.
wforce.org has a real page for the WOS-Northeastern Talent Pipeline Program, and it is one of the 15 unreachable pages awaiting a decision.
Do not delete it on the strength of the reference site's rule.

## Writing

**No em dashes.**
Use a plain hyphen with spaces around it, or restructure the sentence.
This applies to code comments, docs, commit messages, and anything that reaches the page.

Prose in markdown files gets one sentence per line.
It keeps diffs readable.

## Code

Write it so it reads like the code already around it.
Match the existing naming, comment density, and idiom rather than importing a different house style.

- **Comment the why, not the what.**
  A comment earns its place by explaining a decision that is not visible in the code, especially one where the obvious alternative was rejected.
- **Reuse before inventing.**
  The design primitives are in `components/Brand.tsx`.
  A new component needs at least two call sites, or it is a one-off pretending to be a pattern.
- **Do not leave migration scaffolding behind.**
  A temporary shim with a comment saying it will be removed later will not be removed later.
- **Fix lint and type errors you touch,** including ones you did not cause.
- **Keep changes to the scope asked for.**
  If a cleanup would change how the site looks, say so and ask first.

## Next.js 16

This version has breaking changes against most training data.
APIs, conventions, and file structure may all differ.
Read the relevant guide in `node_modules/next/dist/docs/` before writing code, and heed deprecation notices.

## Git

- Commits are fine when explicitly asked.
- **Never `git push` without explicit confirmation in the current turn.**
  Past approval does not carry forward.
- Do not add yourself as a commit co-author.
