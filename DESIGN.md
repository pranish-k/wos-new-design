# Design System
## wforce.org

The main Workforce Opportunity Services site.

This file is the single source of truth for all visual decisions on this site.
Before writing any component, check here.
Before making a judgment call, add it here.

The site runs in the **colour-chapter** direction.
It was developed as `/alternate-home`, compared side by side with the original homepage on the real site, and adopted for the whole site by the client on 2026-11-15.
The original editorial direction is preserved in git: `main` holds it, and the `alternate-home` branch holds both homepages side by side.

The tokens, the type, the anti-pattern list and the reasoning behind the rejected colours were ported from the center site at `/Users/pranish/Documents/wos-new-center/proposed_center/site/`.
That reasoning is kept verbatim where it still holds: re-deriving it means repeating the mistakes.

For the rules of the rebuild rather than its appearance, see [CLAUDE.md](CLAUDE.md).

---

## 0. Brand hierarchy

**WOS is the only brand on this site.**

There is no co-brand and no partnership line anywhere in the chrome.
Teachers College and Columbia belong to the center site this design system came from, not to this one.
Carrying either across is the most likely brand error here, because the components were written for a site that credits them.

Practically:
- The WOS lockup is the only logo, in both the header and the footer.
- Corporate and academic partners are content, on `/corporate-partners/` and `/academic-partners/`. They are not chrome.
- Northeastern is a real page on this site (the WOS-Northeastern Talent Pipeline Program). The center site's rule against mentioning it does not apply here.

Brand name strings live in `lib/brand.ts` and nowhere else.

### One sanctioned Teachers College credit

The chrome carries no co-brand, and that part of the rule is unchanged.
The single exception is the homepage panel for the Center for Strategic Learning and Leadership for the Digital Age, a WOS sub-brand center, which states that it runs in partnership with Teachers College, Columbia University.

The compliant version was to name the Center without its institution.
A center with no institution behind it reads as a marketing label rather than as a thing that exists, which is the opposite of the reason for listing it at all.

Two conditions on the exception.

**The Center is the subject of the sentence, never WOS.**
"A WOS center, in partnership with Teachers College, Columbia University" is the sanctioned form.
"Workforce Opportunity Services, in partnership with Teachers College" is the sentence that must never be written, and §9 check 5b exists to catch precisely that.

**It appears on the homepage and nowhere else.**
§9 check 5a fails if the phrase reaches any other built route, which is what a co-branded header or footer would do.

---

## 1. Design philosophy

Every page is a run of **chapters**.
A chapter is a full-bleed field of one brand colour that meets its neighbours edge to edge, so the page reads as a sequence of distinct rooms rather than as text on a white sheet.

That means:
- **Colour carries structure.** Where the old direction separated sections with hairlines, tints and a ladder of rule weights, a chapter's field does that job. Change of field is change of subject.
- **Typography is still the design.** Large Montserrat headings, a reading measure for prose, and no ornament standing in for hierarchy. If the fields were removed the page would still read in order.
- **Dense copy is set as structure, never cut.** Lists inside sentences become lists, figures inside a paragraph become a statement, a definition becomes a label over its body. No copy is invented to fill a layout.
- **One shape.** The O from the WOS mark, the two conversion arrows, is the site's only graphic device (§6, `Motif`). It is the brand's own picture of what WOS does.
- **Every page has the same frame.** It opens on the signature gradient and, when it has a closing instruction, closes on it. Between them the fields vary.

What we are explicitly **not** doing:
- Rounded corners, drop shadows, glassmorphism, gradient overlays on photographs
- Decorative motion: anything that loops for attention, parallax, motion on chrome
- Uniform rhythm where every chapter is the same field, the same padding and the same heading-then-grid
- A second accent hue. Red, slate and the neutrals are the whole palette.

This is still a deliberate divergence from the WOS Branding Guide's campaign cards (p.10-12), which use rounded corners, drop shadows and campaign-colour tiles.
The site takes the guide's **palette and typography** and builds the colour fields from them.

---

## 2. Colour

### Tokens

All colour lives in `app/globals.css` as a Tailwind v4 `@theme inline` block.
**Never write a hex literal in a component.**
If you need a colour that is not a token, the answer is almost always an existing token, and if it genuinely is not, add one here first.

```
LITERAL PALETTE  (the two guide colours this site is built on)
  --color-wos-red          #d44530
  --color-wos-slate        #2c3441

NOT DECLARED, deliberately  (guide p.6 colours this site does not tokenise)
  teal        #78a7b2   see "teal is gone" below
  blue        #1f628e
  green       #86b16b
  gray-light  #e5e9ea   hue 192, a desaturated cyan - it tinted the neutrals
  gray-mid    #879299   3.18:1, cannot carry text at these sizes

SEMANTIC ROLES
  --color-action           wos-red     rules, active nav, large display emphasis
  --color-action-deep      #bf3b28     button fills, small red text          5.42:1
  --color-action-deeper    #a63321     hover on the above, the crimson field
  --color-accent           wos-red     decorative rules
  --color-surface-dark     wos-slate   the slate field, the footer
  --color-surface-deep     #1b212a     the deep field, the gradient's dark side
  --color-surface-tint     #f7f7f7     the tint field (neutral, zero saturation)
  --color-ink              wos-slate   headings and body                    12.54:1
  --color-ink-muted        #6a6a6a     captions, metadata, descriptions      5.41:1
  --color-hairline         #e3e3e3     1px dividers
  --color-hairline-strong  #d0d0d0     seams between cells
```

### Fields

A field is a class (`field field-<name>`) that sets a background and **every colour that has to change with it**.
Components never take a `dark` prop and never hard-code a surface colour; they read the field's variables.

```
FIELD     BACKGROUND        INK     WHAT CHANGES ON IT
paper     white             slate   (the root values: red button, red rule, red link)
tint      surface-tint      slate   panels inside it are white, not tint
slate     wos-slate         white   numerals and accent marks are white: red is 2.8:1 here
deep      surface-deep      white   red numerals legal at 24px+ (3.62:1)
crimson   action-deeper     white   button turns white with slate label; rules turn white
red       wos-red           white   as crimson; large type only (white is 4.47:1)
gradient  the signature     white   reads as deep; reserved for openings and closes
```

```
VARIABLE              WHAT IT IS
--field-bg            the field's background
--field-ink           headings and body
--field-muted         secondary copy
--field-link          link colour, and SecondaryButton's outline and label
--field-btn / -hover  PrimaryButton fill
--field-btn-ink       PrimaryButton label
--field-rule          the red rule above a list item or a card
--field-accent        numerals and icons
--field-panel         a cell or frame inside the field
--field-seam          the gap colour in a gap-px grid
--field-ring          the focus ring
```

The root carries the paper values, so the nav, a dialog, and anything not inside a chapter read as paper.
Base `a` and `:focus-visible` read the field too, so a link or a focus ring dropped into a red chapter does not vanish into it.

**Why the variables exist at all.**
The first version of this direction lived on one page and hard-coded `border-wos-red` and `bg-action-deep`.
On the crimson and red fields both vanish: a red rule on red is invisible and a red button on crimson is 1.3:1.
Making the colour a property of the field rather than of the component is what lets the same list, button or card sit on any chapter.

**The gradient.**
The site's one gradient: deep slate holding the left side, where type sits, with red and crimson drifting at the right edge.
White text is measured against deep (16:1) and never against red.
It drifts over 24 seconds, with no JavaScript, and freezes under reduced motion.
**Below `md` it holds still and the red gathers in the bottom corner**, because full-width copy on a phone runs into the top-right red, and white body copy on red is 4.47:1.
Axe cannot measure text over a gradient, so this one was found by eye; check it by eye.

### Five deviations from the guide, and why

The guide's palette does not survive contact with WCAG AA at the sizes this site uses.
Each deviation is recorded in `globals.css` with its measured ratio.

| Token | Value | Why the guide colour could not be used |
|---|---|---|
| `action-deep` | `#bf3b28` | Guide red is 4.47:1 on white. Every button label here is 15-16px and needs 4.5:1. |
| `action-deeper` | `#a63321` | Hover state for the above, and the crimson field: white body copy on it is 6.74:1. |
| `ink-muted` | `#6a6a6a` | Guide gray-mid is 3.18:1. It cannot carry body text. |
| `hairline` | `#e3e3e3` | Neutral, to match the fill. |
| `surface-tint` | `#f7f7f7` | See "the tint" below. |

### Teal is gone

Teal was tried as the decorative accent and removed.
Two reasons, both worth knowing before anyone reintroduces it:

1. It read as a **second competing accent** alongside red. One accent used sparingly is stronger than two.
2. Its hue leaked into the neutrals. The guide's `gray-light` is **hue 192, a desaturated cyan**, so using it as a card fill tinted every surface on the site toward teal without anyone naming why the greys looked dingy.

For a while the token stayed declared "for brand-audit completeness", with a note saying it shipped in zero bytes.
That note was wrong on both counts.
`@theme` emits every `--color-*` into `:root` whether a component consumes it or not, so it did ship.
And a declared token is an invitation: `bg-wos-teal` worked, so the rule against it was something each person had to know rather than something the system enforced.

The declaration is now removed, along with blue, green, gray-light and gray-mid.
A colour that should not be used is best represented by a token that does not exist.

### The tint

The tint field is `#f7f7f7`, a true neutral at zero saturation.
All three channels drop 8 from white, so the fill carries lightness but no hue.

Three approaches were tried before this one, and none should be revisited without reading why they failed.

**Derived from the red accent, at 3%.**
Delta from white was 2/6/6 out of 255.
That is not a subtle fill, it is no fill.

**Derived from the red accent, at 8%.**
It read as pink.
Red dilutes to blush before it dilutes to warm and there is no usable band in between.

**A warm cream, `#f7f5ee`, hue 47.**
Its blue channel drops 17 against red's 8, and that skew is the warmth.
On a surface meant to read as neutral it registers as yellow.

If the tint ever needs to be more present, go **darker on all three channels equally**: `#f6f6f6`, `#f4f4f4`, `#f2f2f2` all still clear AA.
Do not reintroduce a hue.

### Contrast rules that are easy to get wrong

- **Red is 4.47:1 on white and 2.8:1 on slate.** Red text appears only at 24px and up (the impact figures, step numerals), and never on slate at any size. `--field-accent` encodes this.
- **White on the red field is 4.47:1.** The red field takes large type only: a statement, never a paragraph. Body copy on a red-family field goes on crimson.
- **Label text is the field's muted ink.** Not red, on any field.

### Approved and banned pairings (Branding Guide p.8)

Approved: red + slate + light-gray · teal + slate + blue · green + slate + mid-gray
Banned: red + green · green + orange · dark-green + yellow · teal + green

Campaign colours (yellow `#edbd11`, orange `#e5753a`, dark-green `#52893e`) are for campaign material only and must not appear in core UI.

---

## 3. Typography

### Fonts

Montserrat for headings, Lato for body, both self-hosted via `next/font/google` in `app/layout.tsx`.
No external requests are made to Google.

```
--font-heading   Montserrat   headings, nav, labels, buttons, list items set as names
--font-sans      Lato         body copy, descriptions
```

- **Montserrat is variable**, so omitting `weight` ships one file covering 100-900. Do not enumerate weights.
- **Lato is not variable and has no 500 or 600.** It loads 400/700 in normal and italic. `font-medium` and `font-semibold` on body copy will snap or synthesise, so keep 500/600 on Montserrat.

### Scale

The scale is `TYPE` in `components/Brand.tsx`, as class strings, so a page sets an element without a wrapper.

```
Homepage tagline   clamp(34px, 5vw, 72px)    bold, UPPERCASE, -0.02em   the homepage only
TYPE.title         clamp(36px, 4.8vw, 64px)  semibold, -0.025em         every interior h1
TYPE.h2            32px -> 46px md            semibold, -0.02em          a chapter's heading
TYPE.h3            22px -> 26px md            semibold
TYPE.statement     set per use, ~30-60px      semibold                   a sentence as display type
TYPE.lead          20px -> 22px md            Lato, 1.55                 the first paragraph
TYPE.body          18px / 1.65                Lato
TYPE.small         16px / 1.6                 Lato                       card bodies, descriptions
TYPE.label         16px -> 18px md            Montserrat semibold, muted
```

Body copy is 18px, not 16px.
At chapter scale, with headings at 46px, 16px body read as a caption.

Headings carry `text-balance`, so a two-line heading does not strand one word on the second line.

### Labels, not eyebrows

**The eyebrow is retired.**
The old pattern was an 11px uppercase label with a red rule above it, on every section.
In this direction it competed with the field for the job of saying "new section", and lost.

What a group of things is, above the group, is a **label**: `TYPE.label`, sentence case, the field's muted ink, no rule.
"Consulting to Hire Services" over its bands, "The framework" over "The Fantasy Arc", the date over a post's title.
A label never stands in for a heading; the outline is the headings.

---

## 4. Navigation

The one place this site diverges from the center site by more than a detail.
The center has four flat links; this site has five top-level items and a two-level tree beneath three of them.
The tree is data, in `lib/nav.ts`, not nested JSX.

**§2 to §8 are written for page content, and a menu is chrome.**
The bar is white with ink, which is the root's values; the panels are on the deep field.

### How it was chosen

The header was rebuilt five times, and the record matters more than the rules, because the first three all followed the rules and all were rejected.

1. **Columns with an accent rule per column head on a tint fill.** Rejected as "pretty but impractical".
2. **A conventional single-column white dropdown.** Rejected too.
3. **A bordered white card of columns divided by vertical rules**, to a reference the client chose. Shipped, then rejected after the colour-chapter redesign as the weakest part of the site.
4. **`/nav-demo`, eleven candidates over the real homepage.** The client chose the full-width panel, then rejected its first cut on three counts: its height changed between sections, it showed too much at once, and its 15-16px type was too small for an audience that skews past 35.
5. **The full-width panel in three columns**, refined over three rounds and then chosen from six variations: the roomier type with the red guide line. This is what ships. The candidates and variations are in git history (8db7124 to eab6bd1).

### The bar

- Sticky, white, 76px tall at `lg`, with a 1px `hairline` border across the full width of the header.
- Content on the page grid (`max-w-[1320px]`, `px-5 md:px-8`), so the logo lines up with every chapter's left edge.
- The full WOS lockup at 36px. No adjacent name text: the wordmark is in the asset.
- Five items at **17px** Montserrat medium, then Donate in `action-deep`. About, Services and Join Us open panels; AI Institute and News & Events are links.
- Active state is a 2px `border-action` underline, and a top-level item counts as active when any page beneath it is.

### The panels

- **Full width, on the deep field**, directly under the bar. The page below dims (`surface-deep` at 45%) while one is open, so the panel is the one thing on screen and its edge shows over the dark homepage opening. The dim takes no pointer events, so moving onto the page closes the menu.
- **One fixed height for every section**, so the edge below the menu never moves between About, Services and Join Us. Services is the tallest and sets it: `lg:h-[460px] xl:h-[435px]`, measured at 1440, 1280 and 1024px. **Change the tree and re-measure**: a taller Services overflows silently.
- **At most three columns.** A section's groups, and its own pages as one unit, are packed in source order and balanced by rows (`stacks` in `components/nav/parts.tsx`). Services' five become [Consulting to Hire] [Educational, Advisory] [Research, Managed Services]. Five narrow columns wrapped long names onto three lines at 1024px.
- **Every top-level entry is a bold 21px heading**, whether it is a page on its own ("Managed Services", "Our Story") or a group ("Boards"). The client asked for the rank to be visible regardless of what sits beneath.
- **A group's pages are indented under its heading on a 2px red guide line**, at 19px. The indent says they belong to it; the red line says so at a glance. Without the line the hierarchy read by position alone; with a red rule over every column as well, there was more red than meaning.
- **A group's "Overview" link becomes its heading.** The tree gives Consulting to Hire, Educational and Advisory Services an "Overview" child; the heading links there, with an arrow bound to its last word, and the Overview row goes.
- **Groups stacked in one column are 48px apart.** At 24px, Educational and Advisory read as one block.
- **"Schedule a free consultation"** is one line along the bottom edge, not a block.
- **Hover intent.** With nothing open, a pointer has to rest on a trigger for 150ms before its panel opens, so a mouse crossing the bar does not flash one over the page. With one open, moving between triggers switches at once.
- **No grouping label is a dead link.** The live site gives its grouping labels `href="#"`. A heading here either links to a real page or is plain text.

### Keyboard

This is the part most likely to ship broken, and type checking catches none of it.

- The APG **disclosure navigation** pattern, not a menubar: panel links stay in normal tab order.
- Left and right arrows walk the whole bar, links included, and wrap. With a panel open they switch to the next section's panel.
- Down opens a panel and moves into it. Escape closes and returns focus to the trigger.
- **Each panel sits directly after its trigger in the DOM** (a `static` wrapper keeps it positioned against the header), so Tab goes from a trigger into its open panel and Shift+Tab comes back. Rendered after Donate, Shift+Tab out of a panel landed on Donate.
- Focus leaving the header closes the open panel, as does a pointer down anywhere outside it, and a route change closes it by derivation.

### Mobile

- Below `lg`, one button opens a full-screen menu on the gradient, with page scroll locked and Escape wired. Five bar items and Donate need about 930px at 17px.
- The five sections are 30px names that start closed, so the first thing a visitor sees is five names rather than the whole site. A section opens in place, and inside it the tree is drawn exactly as on the desktop panel: bold headings, pages indented on the red guide line.

All logo references go through `components/WosMark.tsx`.

---

## 5. Layout

### The grid

```
WRAP        mx-auto w-full max-w-[1320px] px-5 md:px-8
```

Every chapter's content, the header and the footer share this edge.
The old site had four widths (`3xl`, `6xl`, `7xl`, full); there is now one grid, and a reading measure inside it for prose (`max-w-3xl`, or a `ch` cap on the element).

The `wrap` breakpoint (`82.5rem`, in `globals.css`) is where WRAP stops growing.
**Use it, not `min-[1320px]:`.** Tailwind emits arbitrary breakpoint variants before the named ones, so `md:pl-8` silently overrides anything set at `min-[1320px]:`.
That shipped once: the service bands' text sat on the gutter instead of the grid at every desktop width.

### Chapters

`Chapter` in `components/Chapter.tsx` renders one field as a full-bleed `<section>`.
`Chapters` wraps a hand-built page's run of them.

**Two neighbouring chapters never share a field.**
Two chapters of one colour read as one oversized block with a seam in it.
`Chapters` throws at build time naming the pair, and so does `ContentSections` over its own run, so this cannot ship.
`PageHero` and `CloseChapter` declare their field statically (`PageHero.field = "gradient"`), which is how `Chapters` sees inside them.

**A page's last chapter is never slate or deep.**
The footer is slate.
`ContentSections` throws when a page would end on either, and a step sequence that would otherwise go deep stays light when it is the last thing before the footer.

The footer has no top margin.
Every page ends on a full-bleed chapter, and a white strip between it and the footer reads as a gap.

### Padding

```
PAD         py-20 md:py-28    a standard chapter
PAD_TIGHT   py-14 md:py-20    a chapter carrying one short block
```

A one-paragraph chapter given the room of a six-block one is the flat rhythm this direction exists to break.

### The frame: open, chapters, close

**Every page opens with `PageHero`** on the gradient: an optional label (where the page sits), the title, a lead, optional actions, and optional media beside them.
With media (a hero photograph, a portrait, a drawing) copy and media share the row, as on the homepage.
Without, the copy holds a reading measure and the gradient runs on.
The label is a link back up only where there is somewhere to go back to: a person's board, the News & Events index.

**A page with a closing instruction ends on `CloseChapter`**, on the gradient: one line, one button, and the motif opposite.
`ContentSections` lifts a final `cta`-only section into it automatically.
A page with no closing instruction ends on its last chapter; it does not get an invented one.

### How content sections choose a field

`ContentSections` resolves every section's field before anything renders:

```
fill set in content     white -> paper, tint -> tint, dark -> slate
steps, no fill          deep  (unless the chapter above is deep, or the footer is next)
anything else           alternates paper / tint from the chapter above
```

A step sequence is the one block that reads better as a scene than as copy, which is why it goes deep: it breaks the light run the way the homepage's approach chapter does.

Within a chapter:
- A section with a heading and only prose sets the heading left and the copy right on `lg`, on a `0.85fr / 1.15fr` split.
- A section carrying structure (steps, cards, a list of more than four) puts the heading on top and gives the structure the full grid.
- A section with no heading holds a reading measure.

### Lists

How a list item is set follows **how long it is, not how many there are**:

- Every item eight words or fewer, no definition: **names**. Montserrat 18px, each on the field's rule, two across, three once there are five or more.
- "Label : body": **definitions**. The label as a Montserrat heading over its body, two across.
- Anything longer: **sentences**. Body copy on the rule, two across.

The rule is the field's (`--field-rule`): red on the light fields and on slate and deep, white on crimson and red.

---

## 6. Components

All primitives live in `components/Brand.tsx`, except `Chapter`/`Chapters`/`Arrow` (`components/Chapter.tsx`).
None takes a `dark` prop: each reads its field.

| Component | What it is |
|---|---|
| `PageHero` | Every interior page's opening, on the gradient. §5. |
| `HeroImage` | A photograph or portrait for `PageHero`'s `media`, `wide` (16:10) or `square`. |
| `CloseChapter` | A page's last chapter, on the gradient: one line, one button, the motif. |
| `SectionHeading` | A chapter's h2, with an optional `label` above and `intro` below. |
| `ServiceBands` | Links to other pages as full-bleed bands of colour, the picture alternating sides. |
| `FactList` | A titled set of short facts, each on the field's rule. |
| `PrimaryButton` | The one filled call to action. `size="lg"` for openings and closes. |
| `SecondaryButton` | Outlined in the field's link colour; hover fills it and drops the label into the field's own background. |
| `TextLink` | A text link with the arrow: the site's one link shape outside running copy. |
| `Motif` | The O from the WOS mark. The site's one shape. |
| `JourneyScene` | The homepage approach, pinned and scrubbed on wide screens. |
| `VideoEmbed` | A YouTube video as its poster frame until played. §7. |
| `PeopleGrid` | Person cards, linked where the person has a bio. |
| `PartnerWall` | Logo tiles. The one shadow on the site, §7. |

### Service bands

Hub pages (`/managed-service-centers/`, `/consulting-to-hire-services/`) and the homepage services use `ServiceBands`.
Edge to edge rather than inset: inset, a run of coloured blocks reads as a stack of cards; full bleed, they read as chapters inside the chapter.
The text's outer edge sits on the grid at every width, so the bands bleed while their words line up with the page.

By default a run's fields cycle slate, crimson, deep, **started so the run ends on crimson**.
Crimson is the one dark field that cannot merge with what usually follows a run: a slate chapter, or the footer.
A page that puts content after a run passes `after="crimson"` to `ContentSections`.

### Panels

A panel is a cell on the field's `--field-panel` colour (white inside tint, tint inside paper), or a nested field (`fieldClass("crimson")` on an element).
The contact page's careers block and the AI Institute's closing cells are nested fields.
A panel is filled, never outlined.

### Icons

Line icons from `lucide-react`, at `strokeWidth={1.5}` and 28px, and only on `/ai-institute`, where named fields, pillars and audiences needed a mark to scan by.
They are decorative and carry `aria-hidden`.
They take `--field-accent`: red on the light fields and deep, white on slate and the red family.
Never set one inside a filled circle or a tinted square, never use one in place of a label, never in body copy.

### Buttons must match

`PrimaryButton size="lg"` is `px-8 py-4`, and `SecondaryButton size="lg"` matches it with a 2px border inside.
A hand-rolled button beside either needs the same box, or they sit at different heights on a shared baseline.

---

## 7. Imagery

### Treatment
- **No rounded corners.** Straight edges read as authoritative.
- **No drop shadows,** with exactly one exception: the partner logo wall.
- **No overlays.** A photograph sits beside type, never under it. The old homepage set its tagline over a darkened photo at 70%; the gradient opening exists so that no photograph has to be dimmed to carry text.
- Every image frame has a background (`surface-deep` in the dark fields, the field's panel colour in light ones), so a slow or failed image leaves a panel rather than a hole.
- Crop anchoring matters: the homepage photograph uses `object-top` because the faces sit in the upper half.

### The partner logo wall is the one exception to no-shadow
`components/PartnerWall.tsx` lays logos as white tiles with `shadow-sm` on a tint chapter, four across at full width.

A logo wall is not content in a container.
Every mark is a different shape, colour, weight and aspect ratio, and most are drawn to sit on white.
On bare tint they fight each other and the darker marks read as heavier than the lighter ones, which says something about the partners that is not true.
A uniform tile is what makes eighty-odd unrelated logos scan as one set.

Two conditions:
- **The chapter behind it must be tint.** On white the tiles disappear and the shadow becomes the only separation.
- **`shadow-sm` and no more.**

The grid reflows on track width, not on breakpoints: `grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))]`.

The homepage's twelve client logos are the same tiles without the shadow, in a gap-1 grid: twelve marks need no shadow to read as a set.

### Video
A video is its own poster frame and a play button until clicked, then becomes the youtube-nocookie player, so a page loads one image per video and no YouTube script.
Without scripts the poster is a plain link to the video.
`next.config.ts` allows `i.ytimg.com/vi/` for the posters and nothing else on that host.
Titles are the channel's own and summaries are cut from each video's own description (`content/videos.ts`).

### Portraits
- Every person photo is a 1200x1200 WebP at `/images/people/<slug>.webp`, written by `tools/people-image.mjs`. Never reference a portrait by its original filename.
- Square, and cropped on the face rather than on the centre of the frame.
- On a person page the portrait is the opening's media, square, beside the name.
- Alt text is the person's name.

### Group landing pages
- The intro is a tint chapter between the opening and the grid; the grid is on paper. Three of the five groups have no intro, and a page that opens straight into the grid is correct rather than unfinished.
- Responsibility lists sit on the rule like every other list.
- Names are h2 on a group landing (nothing sits between the h1 and the grid) and h3 anywhere the grid sits under a heading.

---

## 8. Anti-patterns

**Text on a surface that resolves to the same token.**
`--color-ink` and `--color-surface-dark` are both `--color-wos-slate`.
A `text-ink` heading on a slate surface is 1:1 and invisible, and 112 of them once shipped that way.
The fields make this unwriteable inside a chapter: read `--field-ink`, never `text-ink`.

| Pattern | Why | Replace with |
|---|---|---|
| Any hex literal in a component | Defeats the token system | A semantic token |
| `border-wos-red`, `bg-action-deep`, `text-white` inside a chapter | Correct on one field, invisible on another: a red rule on red, a red button on crimson | `var(--field-rule)`, `var(--field-btn)`, `var(--field-ink)` |
| A `dark` prop on a component | The field already knows | Read `var(--field-*)` |
| Two neighbouring chapters on one field | Reads as one block with a seam | A different field; `Chapters` throws |
| A page ending on slate or deep | Merges into the slate footer | A light field, crimson, or the CloseChapter |
| White body copy on the red field | 4.47:1, under the floor | Crimson for body copy; red for a statement |
| Red text under 24px, or red text on slate at any size | Fails AA | `--field-accent`, which already knows |
| `min-[1320px]:` for layout | Sorts before `md:` and is silently overridden | `wrap:` |
| Copy over a photograph, or an overlay to make it legible | The gradient exists so no photo is dimmed | Type beside the image |
| A 1px light border around a white card | Divides nothing | A panel fill |
| `rounded-*`, or `shadow-*` anywhere but the partner wall | Softens everything; reads as a SaaS card | Straight edges, fill and spacing |
| An 11px uppercase eyebrow | Retired, §3 | `TYPE.label`, or nothing |
| `font-normal` on a heading | Fights the base 600 | Let the base weight stand |
| A second accent hue, campaign colours, banned pairings | §2 | The palette |
| Invented copy to fill a layout | The site carries the client's words | Restructure what exists, or leave the slot empty |
| Emoji in body copy | Unprofessional | Typographic labels |
| Motion outside §10 | Motion is a state change or an arrival, not an effect | The gestures in §10, or nothing |

**`/admin/people` is outside this document on purpose.**
It is a development-only tool that never reaches a visitor, so it uses plain form controls and borrowed tokens.
Do not spend design effort on it, and do not let its styling leak into the site.

---

## 9. Verification

Colour and type regressions are invisible to the type-checker, so check them explicitly.
All of these must return empty except check 6.

```bash
cd wos-new-design

# 1. No hex literals in components. globals.css is excluded: it is the token
#    DEFINITION site, and the rule is "no hex in a component", not "no hex anywhere".
grep -rnoE '#[0-9A-Fa-f]{3,8}\b' app components lib --exclude=globals.css

# 2. Hex smuggled through rgb()/rgba()
grep -rnE 'rgba?\(' app components lib

# 3. Any arbitrary-value colour utility
grep -rnE '(bg|text|border[a-z-]*|fill|ring|placeholder|shadow)-\[(#|rgb|hsl|oklch)' app components

# 4. Retired typography. Excludes comment lines.
grep -rniE 'font-serif|wordmark|trajan|georgia' app components lib \
  --exclude=globals.css | grep -vE '^\S+:[0-9]+: *(//|/\*|\*)'

# 5. Center-site brand language must not reach the PAGE. Grepped in the rendered
#    output rather than in source, because lib/brand.ts deliberately names these in a
#    comment to tell the next person not to add them.
#
#    The chrome phrase, not the words. "Columbia", "Northeastern" and Teachers College
#    all legitimately appear on this site. What must never appear is the co-branding
#    line, which always reads "in partnership with".
#
# 5a. The phrase may appear on the homepage and nowhere else. A co-branded header or
#     footer would return every route, and name them.
grep -rl -iE 'in partnership with (teachers college|columbia)' \
  .next/server/app --include='*.html' \
  | grep -vE '^\.next/server/app/index\.html$'

# 5b. And on that page the sentence must be about the CENTER, never about WOS.
sed -e 's/<[^>]*>/ /g' .next/server/app/index.html \
  | grep -ioE '.{0,40}in partnership with (teachers college|columbia)' \
  | grep -ivE 'A WOS center, in partnership with'

# 6. POSITIVE control - tokens must exist in the BUILT css
npm run build
grep -oh -- '--color-[a-z-]*' .next/static/chunks/*.css | sort -u

# 7. Every field variable a component reads is one globals.css defines. A misspelled
#    var(--field-*) resolves to nothing, exactly as a misspelled token does.
comm -23 \
  <(grep -rhoE 'var\(--field-[a-z-]+\)' app components | sed 's/var(//;s/)//' | sort -u) \
  <(grep -oE '^\s*--field-[a-z-]+:' app/globals.css | tr -d ' :' | sort -u)
```

**Check 6 matters most and is the one that gets skipped.**
A misspelled token in Tailwind v4 produces no error: `text-ink-mutedd` generates no rule, the element inherits, and the page looks almost right.
Checks 1-5 all pass on a completely broken build.

Traps found the hard way:

- **Grep the compiled CSS, not just components.** A stale token can live in `globals.css` and reach every page without appearing in any component.
- **Turbopack's cache goes stale on token changes.** After editing `globals.css`, `rm -rf .next` and restart. A hot reload will silently serve the old value.
- **Axe cannot see text over a gradient.** It reports contrast on the gradient chapters as incomplete, not as a failure. Look at every opening at 390px wide.
- **The adjacency and footer rules are enforced at build time**, so a page that breaks them is a 500 in development and a failed build, never a page that ships.

---

## 10. Motion

Motion is a state change or an arrival.
It is never something a visitor has to wait through to read the page.

### The sanctioned gestures

There is no gesture without a row in this table.

| Gesture | Where | How |
|---|---|---|
| Colour swap | Links, buttons, nav items | `transition-colors`, 150ms |
| Image scale inside a fixed frame | Service bands, people cards, post cards, video posters | `scale-[1.03]` on hover, 700ms `--ease-fade` |
| Chapter arrival | `.reveal` elements inside an `InView` | opacity plus a 16px rise, 800ms `--ease-fade`, staggered 70ms by `--i` |
| Opening rise | `.rise-in`: an opening's lead, actions and media | opacity plus a 14px rise, 900ms, once on load |
| Headline mask rise | The homepage tagline only, line by line | `.mask-line`, 1000ms, once on load |
| Motif draw | `Motif` with `draw`: the homepage opening | a masked stroke along each arrow, 1800ms, once |
| Gradient drift | The signature gradient, md and up | registered custom properties, 24s alternate |
| Pinned scene | `JourneyScene`, the homepage approach, 900px and up | GSAP ScrollTrigger pin and scrub; the ring fills and the current stage is lit |
| Count | `CountUp`, the three homepage figures | 1100ms ease-out cubic, once |
| Arc draw and node sequence | `ArcDraw`, the Fantasy Arc on `/ai-institute` | stroke draws 1100ms; each node fades as the stroke reaches it |

Durations are vocabulary, not free values.
Prefer an explicit property list to `transition-all`.

**Two exceptions to "never a loop" and "never scroll-jacking", and why they stand.**
The gradient drift loops, but over 24 seconds at a pace nobody watches; it is a field that is alive rather than an animation that asks to be looked at, and it holds still on phones and under reduced motion.
The pinned scene holds the approach on screen while the visitor scrolls, but it never changes scroll speed or direction, releases with the list complete, and exists only where there is room for it.
Neither is a licence for a second.

### Reduced motion is a guarantee, not a courtesy

`globals.css` collapses every animation and transition duration to 0.01ms under `prefers-reduced-motion: reduce`.
Every hidden starting state (`.reveal`, `.rise-in`, `.mask-line`, the motif stroke) lives inside `prefers-reduced-motion: no-preference`, so under reduced motion the server-rendered page is the finished page.
JavaScript motion guards itself: `CountUp` and `ArcDraw` skip outright, and `JourneyScene` only arms inside a GSAP `matchMedia` that requires `no-preference`.

### The SSR rule

**The final state ships in the HTML.**
A scroll-triggered element renders its finished appearance on the server and departs from it only after mount, only in the browser, and only for elements the visitor cannot currently see.

`InView` sets `data-armed` only when its element starts below the fold, and `.reveal` hides only under `[data-armed]:not([data-inview])`.
A page whose scripts never run shows everything; nothing already on screen blinks out and back in.
`CountUp` holds the real figure in its initial state, so the page is correct with JavaScript off and a screen reader never announces an intermediate value.
`JourneyScene` server-renders the whole ring drawn and every stage readable.

### Where motion does not go

- Chrome. The header, the footer and the nav panels are furniture, and furniture does not arrive.
- An interior page's `h1`. The page's identity is there, not arriving; only what sits beside it rises in.
- A full-bleed field. Wrap the content, so the chapter stays put and only its content arrives.

### Still banned

Parallax.
Autoplaying carousels and video.
Changing scroll speed or direction.
Animated counters on any figure that is not a headline statistic.
Hover motion on a photograph that is not inside a link.
Any gesture whose duration was chosen so that it would be noticed.

---

## 11. Demo routes

**`/announcements-demo`** exists to compare options on the real page, and is not part of the site.
It is unlinked, out of `app/sitemap.ts`, and set to `noindex`.

It lays five ways of announcing something over the real homepage, chosen by `?show=bar,hero,band,dialog,corner`.
The bar sits above the header, which a page cannot reach, so it renders through the `@banner` slot.
That slot needs three files that render nothing (`default.tsx`, `page.tsx`, `[...rest]/page.tsx`), because on a client-side navigation Next keeps a slot's last page when nothing in it matches the new URL; without them the demo's bar would follow the visitor out of the demo.

`/nav-demo` was the same kind of route for the header. It came out once the header was chosen, §4, and is in git history.
