# Project rulebook

A rebuild of wforce.org, the Workforce Opportunity Services site.
The live site runs on WordPress with the Kubio page builder.
We are rebuilding it as a modern Next.js app with the same content and the same information architecture, and a new front end.

This repo is the rebuild.
What is still open, and what only WOS can supply, is in [PROGRESS.md](PROGRESS.md).

## The workspace

| Directory | What it is | Editable |
| --- | --- | --- |
| `.` (this repo) | The rebuild. All new work happens here. | Yes |
| `../wforce-mirror/` | HTTrack mirror of the live site, plus three verified inventory files. | **Never** |
| `../sources/` | Material WOS supplied: the overview film, the Center proposal, the Hunter overview, the Fantasy Arc deck, logos, video briefs. | Read only |

Both sit outside this repo on purpose: they are large, they are reference, and they must never be committed here.
**Keep the repo self contained.** A build-time read of `../anything` works in development and fails on deploy, so tools read the outside material once and commit their output.

The reference center site (a separate private repo) is the visual source this design system was ported from.
It is **read only**.

### `../wforce-mirror/` is never edited

This is a hard rule, not a preference.
It is a mirror of a live production site and the only record of what that site currently contains.
An error found in it is a finding to report, never a file to correct.
If something in it looks wrong, say so and leave it alone.

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

Two remain unresolved.
Do not silently resolve either of them.
If a task depends on one, raise it.

- **Program pages have no consistent home.**
  Cohorts and College Co-ops are reachable through a hub.
  The WOS-Northeastern pipeline program has no path at all.
- **College CO-OP and Internship sits under Managed Service Centers.**
  A student program filed under an IT service line looks like an accident of page building rather than a decision.

Settled, and not to be reopened by accident:

- **The four boards** all have landing pages and header placement.
  HR Advisory Board has no intro copy in the mirror; **that copy has to come from WOS. Do not write it here.**
- **Person pages live at the nested paths** the sitemap treats as canonical, and the top-level duplicates redirect there (`legacyPaths`).
- **The Services menu is two levels below the bar.**
  The live "Other Services" wrapper label was flattened away; all 33 hrefs are unchanged.
  **This is the one structural departure from the live menu.**

### Four pages are built but deliberately unlinked

The live site has 15 pages with no path to them.
Eleven now have one: the people engine reached nine, and `/consulting-to-hire-services/` and `/managedservices/` are in the Services menu.

`/talent-acquisition/`, `/direct-hire/`, `/staff-augmentation/` and `/wos-northeastern-talent-pipeline-program/` exist at their live URLs with their live copy, and nothing links to them.
That is the live site's state, held on purpose: what remains is a placement decision, not a content job.
They stay out of `app/sitemap.ts` while unlinked, since a sitemap entry would be their only discovery path.
**Placing one means adding it to the nav or a hub grid and to the sitemap in the same change.**

`/staff-augmentation/` shares about 90% of its copy with `/on-site-remote-staffing/`, which is in the header.
If both are ever linked, they compete for the same search result.

## Design

`DESIGN.md` is the source of truth for colour, type, components, and the anti-pattern list.
Read it before writing any component.
Before making a visual judgment call, add it there.

The site runs in the colour-chapter direction, adopted site-wide on 2026-11-15.
The original editorial direction is in git history: `main` up to commit `11df318`, before the redesign was merged.

The rules below are the ones most often broken.

**Never write a hex literal in a component.**
Every colour is a token in `app/globals.css`.
If the colour you want is not a token, the answer is almost always an existing token.

**Inside a chapter, every colour comes from the field.**
Pages are runs of full-bleed chapters (`components/Chapter.tsx`), and each field sets its own ink, link, button, rule and accent as `var(--field-*)`.
Use those, never `border-wos-red`, `bg-action-deep` or `text-white`: a red rule vanishes on the red field and a red button vanishes on crimson.
No component takes a `dark` prop.

**Two neighbouring chapters never share a field, and a page never ends on slate or deep.**
The first reads as one oversized block; the second merges into the slate footer.
Both throw at build time, in `Chapters` and `ContentSections`. Fix the field, not the check.

**Red is the only accent hue.**
It is 4.47:1 on white and 2.8:1 on slate, so red text appears only at 24px and up and never on slate.
White body copy goes on crimson, never on the red field.

**Teal does not exist as a token and that is deliberate.**
`bg-wos-teal` will not compile.
It read as a second accent competing with red, and its hue leaked into the neutrals and tinted every surface.
A colour that should not be used is best represented by a token that does not exist.

**No rounded corners, no drop shadows, no glassmorphism, no copy over photographs.**
The partner logo wall's `shadow-sm` is the one exception, and `DESIGN.md` §7 says why.

**Never invent copy to fill a layout.**
Restructure what the client wrote, as a list, a statement or a label, or leave the slot empty.

**Every font size is a step on the type scale.**
`text-small`, `text-body`, `text-lead`, `text-h4`, `text-h3`, `text-statement`, `text-h2`, `text-title`, `text-display`, through `TYPE` in `components/Brand.tsx`.
Never `text-[17px]`, `text-[clamp(...)]` or `text-sm`: the defaults are reset and do not compile, and `DESIGN.md` §9 check 8 catches the rest.
Pick by role, never by eye.
Sentences are body; small is for meta and the interface.
Body is the common modern size, 20px on a laptop and 18px on a phone, chosen for an audience past 35 after 24px read as oversized; `DESIGN.md` §3 has the reasoning.
Do not shrink a step to make something fit: use fewer columns.

**Use the `wrap:` breakpoint, never `min-[1320px]:`.**
Tailwind emits arbitrary breakpoints before the named ones, so `md:` silently overrides them.

**Motion is the gestures in `DESIGN.md` §10 and nothing else.**
Every hidden starting state sits inside `prefers-reduced-motion: no-preference` and is armed by script, so the server-rendered page is always complete.

## Verifying visual changes

Type checking catches none of this.
A misspelled Tailwind v4 token produces no error at all: `text-ink-mutedd` generates no rule, the element inherits, and the page looks almost right.

The check commands are in `DESIGN.md` §9.
**Check 6 is the one that matters and the one that gets skipped.**
It greps the built CSS to prove the tokens actually shipped.
Checks 1 through 5 all pass on a completely broken build.
Check 7 does the same for the `--field-*` variables, which fail just as silently, and check 8 holds every size to the type scale.

Grep the compiled CSS, not just the components.
A stale token can live in `globals.css` and reach every page without appearing in any component.

**After editing `globals.css`, run `rm -rf .next` and restart.**
Turbopack caches token values and will serve the old colour through a hot reload with no error.

## Brand

WOS leads.
Brand name strings live in `lib/brand.ts` and nowhere else.

**Teachers College and Columbia belong to the center site, not this one.**
The reference site is a WOS sub-brand in partnership with Teachers College, and its chrome credits that partnership.
This site is the main WOS site and its chrome must not carry it.

**There is exactly one sanctioned exception, and it is not the chrome.**
The homepage section for the Center for Strategic Learning and Leadership for the Digital Age names it and credits its Teachers College partnership, because that is the Center's real name and naming it without its institution reads as a marketing label rather than as something that exists.
The Center is the subject of that sentence and WOS never is.
The strings live in `content/partnerships.ts`, the rule is written out in `DESIGN.md` §0, and `DESIGN.md` §9 check 5 is split into 5a and 5b to enforce both halves: the phrase reaches the homepage and no other route, and on the homepage it is attached to the Center.
Do not remove that credit as a brand error. It was a decision.

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
- **People are one record each, in `content/people/`.**
  Read them through `lib/people/store.ts` and never reach for the files directly.
  A person's `groups` decides which pages they appear on and `groups[0]` owns their URL,
  `status: "hidden"` removes them without losing the record, an empty `bio` means a card
  with no page, and `legacyPaths` carries their old URLs.
  Group landing pages are configuration in `content/groups.ts`, not route files.
  `/admin/people` edits all of this and runs in development only.
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
