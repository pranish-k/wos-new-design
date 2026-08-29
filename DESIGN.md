# Design System
## wforce.org

The main Workforce Opportunity Services site.

This file is the single source of truth for all visual decisions on this site.
Before writing any component, check here.
Before making a judgment call, add it here.

Colour, type, components, and the anti-pattern list are ported from the center site at
`/Users/pranish/Documents/wos-new-center/proposed_center/site/`, including the reasoning
for the rejected alternatives.
That reasoning is worth keeping verbatim: re-deriving it means repeating the mistakes.
Sections 0 and 4 are the ones rewritten for this site, because brand and navigation are
where the two differ.

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
- Northeastern is a real page on this site (the WOS-Northeastern Talent Pipeline Program) and one of the 15 unreachable pages awaiting a decision. The center site's rule against mentioning it does not apply here.

Brand name strings live in `lib/brand.ts` and nowhere else.

---

## 1. Design philosophy

The reference bar is **Columbia GSAPP, MIT Media Lab, Harvard GSD**, not a SaaS startup or a Squarespace template.

That means:
- **Editorial, not promotional.** Space, type, and restraint do the work, not gradients, shadows, or animations.
- **Typographic hierarchy is the design.** If the layout collapsed and you only had text, it should still communicate authority.
- **Images support the content.** They are never decoration. Every image earns its space or it does not appear.
- **Earned complexity.** A page should feel considered, not busy. One strong visual move per section, then get out of the way.

What we are explicitly **not** doing:
- Glassmorphism, gradient overlays on every image, drop shadows on everything
- Uniform section rhythm where every section is eyebrow → h2 → 3 cards → CTA
- A dark hero block, white content block, and dark CTA block on every single page

Note this is a deliberate divergence from the WOS Branding Guide.
The guide's own marketing cards (p.10-12) use rounded corners, drop shadows, and solid campaign-colour tiles.
Those are right for a campaign deck and wrong for an executive-education site, so this site takes the guide's **palette and typography** and keeps the editorial layout discipline above.

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

SEMANTIC ROLES  (what components actually consume)
  --color-action           wos-red     rules, active nav, large display emphasis
  --color-action-deep      #bf3b28     button fills, small red text          5.42:1
  --color-action-deeper    #a63321     hover on the above
  --color-accent           wos-red     decorative rules
  --color-surface-dark     wos-slate   heroes, footer, dark panels
  --color-surface-deep     #1b212a     photo overlays
  --color-surface-tint     #f7f7f7     card fill (neutral, zero saturation)
  --color-ink              wos-slate   headings and body                    12.54:1
  --color-ink-muted        #6a6a6a     captions, metadata, descriptions      5.41:1
  --color-hairline         #e3e3e3     1px dividers
  --color-hairline-strong  #d0d0d0     hover borders
```

### Five deviations from the guide, and why

The guide's palette does not survive contact with WCAG AA at the sizes this site uses.
Each deviation is recorded in `globals.css` with its measured ratio.

| Token | Value | Why the guide colour could not be used |
|---|---|---|
| `action-deep` | `#bf3b28` | Guide red is 4.47:1 on white. Every button label here is 13-15px and needs 4.5:1. |
| `action-deeper` | `#a63321` | Hover state for the above. |
| `ink-muted` | `#6a6a6a` | Guide gray-mid is 3.18:1. It cannot carry 90+ body-text sites. |
| `hairline` | `#e3e3e3` | Neutral, to match the fill. |
| `surface-tint` | `#f7f7f7` | See "the card fill" below. |

### Teal is gone

Teal was tried as the decorative accent and removed.
Two reasons, both worth knowing before anyone reintroduces it:

1. It read as a **second competing accent** alongside red. One accent used sparingly is stronger than two.
2. Its hue leaked into the neutrals. The guide's `gray-light` is **hue 192, a desaturated cyan**, so using it as a card fill tinted every surface on the site toward teal without anyone naming why the greys looked dingy.

For a while the token stayed declared "for brand-audit completeness", with a note saying it shipped in zero bytes.
That note was wrong on both counts.
`@theme` emits every `--color-*` into `:root` whether a component consumes it or not, so it did ship.
And a declared token is an invitation: `bg-wos-teal` worked, so the rule against it was something each person had to know rather than something the system enforced.

The declaration is now removed, along with blue, green, gray-light and gray-mid, which were unused for the same kind of reason.
A colour that should not be used is best represented by a token that does not exist.

### The card fill

The card fill is `#f7f7f7`, a true neutral at zero saturation.
All three channels drop 8 from white, so the fill carries lightness but no hue.
The card separates from the page without the surface itself having a colour.

Three approaches were tried before this one, and none should be revisited without reading why they failed.

**Derived from the red accent, at 3%.**
Delta from white was 2/6/6 out of 255.
That is not a subtle fill, it is no fill.

**Derived from the red accent, at 8%.**
It read as pink.
Red dilutes to blush before it dilutes to warm and there is no usable band in between, which is why deriving surfaces from this particular accent does not work even though it is better systems thinking.

**A warm cream, `#f7f5ee`, hue 47.**
Its blue channel drops 17 against red's 8, and that skew is the warmth.
On a card meant to read as a neutral surface it registers as yellow rather than as neutral, which is the wrong kind of visible.

Ceiling on any card fill is roughly 12% of a mid-tone, past which `ink-muted` drops below 4.5:1.
At `#f7f7f7` there is a lot of headroom: muted ink is 5.05:1 and the link red is 5.06:1.

If the fill ever needs to be more present, go **darker on all three channels equally**: `#f6f6f6`, `#f4f4f4`, `#f2f2f2` all still clear AA.
Do not reintroduce a hue.

### Contrast rules that are easy to get wrong

- **Red is 4.47:1 on white and 2.8:1 on slate.** So red marks rules and fills, but never small text on either surface.
- **Label text is `ink-muted` on light surfaces and white on dark.** Not red, on either.
- **Teal was 2.64:1 on white.** The token is gone; if it ever returns it is decorative only, never text.
- `gray-mid` and `green` are non-text colours at these sizes, which is part of why neither is declared.

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
--font-heading   Montserrat   headings, nav, labels, buttons, eyebrows
--font-sans      Lato         body copy, descriptions, quotes
```

Two things to know:

- **Montserrat is variable**, so omitting `weight` ships one file covering 100-900. Do not enumerate weights.
- **Lato is not variable and has no 500 or 600.** It loads 400/700 in normal and italic. `font-medium` and `font-semibold` on body copy will snap or synthesise, so keep 500/600 on Montserrat headings only.

Georgia and Trajan Pro are both gone.
Trajan was also an Adobe font shipping as downloadable `.ttf`/`.otf` from `public/`, which was a licensing exposure as well as a brand mismatch.

**Montserrat sets roughly 15% wider than Georgia.** Display sizes inherited from the old design will overflow their columns. Budget a size pass rather than a find-and-replace when converting a page.

### Scale

```
Homepage H1        44px → 64px md      font-semibold, tracking -0.03em
Interior hero H1   42px → 52px md      font-semibold, tracking -0.025em
Section H2         30px → 44px         font-semibold
Card H3            21px                font-semibold, tracking -0.01em
Body               16px / 1.65         Lato 400
Small / caption    12-13px
Eyebrow label      11px uppercase, tracking 0.15em, font-semibold
```

Base sets `h1`-`h4` to weight 600.
Do not add `font-normal` to a heading; it fights the base and leaves Montserrat looking thin.

### Eyebrow pattern

**An uppercase label never floats alone.** It always carries a rule.

```tsx
<span className="block h-0.5 w-6 bg-accent" />
<p className="mt-3 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
  Label
</p>
```

Use the `Eyebrow` component in body sections.
Interior heroes carry the same mark with the rule *below* the label. See `InteriorHero`.

---

## 4. Navigation

The one place this site diverges from the center site by more than a detail.
The center has four flat links; this site has five top-level items, three levels of nesting, and six grouping labels.

### The bar

- Sticky, white, 72px tall, 1px `hairline` bottom border, `max-w-6xl`.
- The full WOS lockup at 36px. No adjacent name text: the wordmark is in the asset.
- Five top-level items plus a right-aligned Donate button in `action-deep`.
- Active state is a 2px `border-action` underline, and a top-level item counts as active when any page beneath it is.

### The dropdowns

- The tree is data, in `lib/nav.ts`, not nested JSX. It is three levels deep and open decision 5 may change it.
- A panel spans the full width of the bar rather than sitting under its trigger, because the Services panel is wider than the word "Services" and would otherwise run off the right edge.
- Grouping labels render as headings in `ink-muted` uppercase, never as links. The live site gives all six `href="#"`, which lands a keyboard user on a target that does nothing. Do not reproduce that.
- Nesting is shown with a 1px `hairline` left rule and 12px of padding, not with indentation alone.
- Columns only when every direct child of a top-level item is a group, which is true of Services and of nothing else. About mixes plain links with Boards and Partners, and splitting it into columns would break the reading order of the links either side of them.

### Keyboard

This is the part most likely to ship broken, and type checking catches none of it.

- The APG **disclosure navigation** pattern, not a menubar: panel links stay in normal tab order. A menubar would make a three-level menu require arrow keys to reach any leaf.
- Left and right arrows walk the top bar, down opens a panel and enters it, Escape closes and returns focus to the trigger.
- Focus leaving the bar closes the open panel, as does a pointer down anywhere outside it.
- Verify by tabbing to every leaf under Services with no mouse.

### Mobile

- Full-screen white overlay, not a dropdown, with body scroll locked and Escape wired.
- One accordion level. Nested groups render already expanded, because three taps to reach a service page is the usability problem, not the solution to it.

All logo references go through `components/WosMark.tsx`.
It is the only file that touches the asset, so swapping in a real SVG lockup is a one-file change.

---

## 5. Layout and spacing

### Max widths
```
Text-heavy content pages     max-w-3xl    768px
Standard page sections       max-w-6xl    1152px
Wide feature sections        max-w-7xl    1280px
Full-bleed panels            no max-w, inner content still constrained
```

### Section rhythm
Not every section gets `py-20`.
Use contrast to create rhythm:
```
Tight (stats bar, banners)          py-8  – py-12
Standard section                    py-16 – py-20
Feature (hero, quote, big visual)   py-24 – py-32
```

### Grid
- 2-col content: `gap-12`
- Card grids: `gap-4` to `gap-6`
- Max 3 content-heavy cards per row on desktop; certificate tiles go 4-across

---

## 6. Components

All primitives live in `components/Brand.tsx`.

| Component | Notes |
|---|---|
| `Eyebrow` | Red rule + muted label. `dark` variant for slate backgrounds. |
| `InteriorHero` | Slate band, red signature bar top-left, red rule under the eyebrow. Optional `image` prop renders a square portrait beside the text. `subtitle` accepts `ReactNode` so parts can be emphasised. |
| `ProgramHero` | Slate band with an overlapping photo, for program detail pages. |
| `PrimaryButton` | The one filled CTA. `size="lg"` is the loud variant. One per page. |
| `SecondaryButton` | Slate outline, so it never competes with the primary. |
| `ArrowLink` | Underlined red inline link with a nudging arrow. |
| `PhotoLedCard` | Photo top, tinted block below. No border. |
| `TintedCard` | Smaller certificate tile, same language. |
| `StatsBar` | Four numbers. Numerals stay slate on light; red reads as an alert. No boxes or borders. |
| `PullQuote` | 3px red left rule, Lato italic. |
| `Divider` | `border-t border-hairline my-16`. |

### The weight ladder

Separation is chosen by **how much content is in the block**, not by eye.
A section must never carry a heavier treatment than a richer section beside it.

| Level | Content | Treatment |
|---|---|---|
| 1 | Standfirst, pull quote, short labelled item | `border-l-[3px] border-accent pl-6`, or a `w-0.5 bg-accent` bar in a flex row |
| 2 | Single-line list items (topics, roles, audiences) | `border-t border-hairline pt-3` |
| 3 | Title + body grid ("Why this course", objectives) | `border-t-2 border-accent pt-6` |
| 4 | Content-heavy card (agenda day, instructor, creator) | `bg-surface-tint p-6` to `p-8`, no border |
| 5 | Closing CTA panel | `bg-surface-tint p-10 md:p-12`, no border |

Level 2 exists because its absence caused a real problem.
Single-line lists had nothing lighter than level 3 available, so a full box got reached for instead, and on every program page "Topics covered" ended up outranking the richer "Why this course" grid directly below it.
1px neutral reads clearly below 2px red, which puts the hierarchy back the right way round.

**Never put two filled blocks in a row.**
Levels 4 and 5 both carry `surface-tint`, and with only `space-y-20` between them they merge into one oversized block.
Put a level 2 or level 3 section between them.
This is the light-surface version of the two-dark-sections anti-pattern in §8.

### Cards have no border

A 1px light border between a white card and a white page divides nothing: inside and outside are the same colour, so it reads as a faint outline rather than an edge.
Separation comes from the tinted fill and the photo.

If a card ever needs more definition, the answer is a stronger fill or a colour-blocked text area, not a border.

Borders that remain are the ones doing real work: an outlined button, where the outline *is* the button, and form controls, where an input with no boundary is not recognisably an input.

### Buttons must match

`PrimaryButton size="lg"` is `px-8 py-4`.
Any hand-rolled button sitting beside it needs the same padding, or they render at different heights on a shared baseline and look misaligned.

---

## 7. Imagery

### Rules
- Session photos: full width or large panels only. Never shrunk into small card insets.
- Art Langer headshot: Leadership hero only.
- Art Langer collage: Leadership "In action" section only.
- Course/stock images: program detail pages, where no real photo exists.

### Treatment
- **No rounded corners.** Straight edges read as authoritative.
- **No drop shadows,** with exactly one exception: the partner logo wall. See below.
- Dark overlays for legibility: `bg-surface-deep/85`, never a flat opaque colour.
- Image placeholders behind loading photos are `bg-wos-slate`, not a colour.
- Crop anchoring matters: the homepage hero uses `object-top` because the container runs taller than the 4:3 source and a centre crop cuts off heads.

### The partner logo wall is the one exception to no-box and no-shadow
`components/PartnerWall.tsx` lays logos as white tiles with `shadow-sm` on a
`surface-tint` section, four across at full width. This breaks two rules on purpose and nothing else on the site may.

The reasoning: a logo wall is not content in a container. Every mark is a different shape,
colour, weight and aspect ratio, and most are drawn to sit on white. On bare tint they
fight each other and the darker marks read as heavier than the lighter ones, which says
something about the partners that is not true. A uniform tile is what makes eighty-odd
unrelated logos scan as one set.

Two conditions on the exception:
- **The section behind it must be `surface-tint`.** On white the tiles disappear and the
  shadow becomes the only separation, which is the cheap look the rule exists to prevent.
  Both partner pages therefore tint the wall section and leave the CTA below it plain, so
  no two tinted blocks end up adjacent.
- **`shadow-sm` and no more.** Anything heavier reads as a SaaS card.

The grid reflows on track width, not on breakpoints:
`grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))]`. Four tracks fit the 6xl
container, and it steps down to three, two and one wherever the content actually runs out
of room rather than at three fixed sizes. The inner `min(240px,100%)` is what stops the
track overflowing a viewport narrower than 240px. Prefer this to breakpoint columns for
any grid of same-shaped items.

### Portraits
- Every person photo is a 1200x1200 WebP at `/images/people/<slug>.webp`, written by `tools/people-image.mjs`. Never reference a portrait by its original filename.
- Square, and cropped on the face rather than on the centre of the frame. These are shot for a landscape card, so a centre crop lands on the chest.
- The pipeline deliberately produces one file per person, not a set of responsive variants. Next/Image generates those already. What it does not do is fix EXIF rotation, aspect ratio, and ingest size, which is the whole job here.
- Alt text is the person's name. On the group grid the name is also the visible heading, so the card link is already labelled and the photo carries no extra burden.

### Group landing pages
- The intro block above a member grid is `surface-tint`, and the grid below it is plain. Three of the five groups have no intro copy at all, and a page that opens straight into the grid under the dark header is correct rather than unfinished.
- Responsibility lists use a 2px `accent` left rule per item. A bulleted list of four items reads as filler; the rule gives them weight without drawing a box.

---

## 8. Anti-patterns

| Pattern | Why | Replace with |
|---|---|---|
| Any hex literal in a component | Defeats the token system; this is the mess the rebrand existed to fix | A semantic token |
| `text-accent` on a white surface | Red is 4.47:1 and fails AA for small text | `text-ink-muted`, with the red in the rule above |
| Red text on slate | 2.8:1, fails AA | `text-white/85` |
| Reaching for a guide colour that is not a token | It was removed on purpose; see §2 | An existing semantic token |
| Campaign yellow/orange/green in core UI | Guide reserves them for campaign material | Palette colours |
| Red + green, or teal + green | Banned pairings, Guide p.8 | An approved trio |
| A 1px light border around a white card | Divides nothing, reads as unfinished | Tinted fill, no border |
| `font-normal` on a heading | Fights the base 600 and reads thin in Montserrat | Let the base weight stand |
| Uppercase label with no rule | Floats, reads as an afterthought | The eyebrow pattern |
| `rounded-*` or `shadow-*` on photos | Softens everything, loses authority | Straight edges, no shadow |
| Emoji in body copy | Unprofessional on a graduate institution site | Small typographic labels |
| Every section `py-20` | Flat rhythm | Vary per §5 |
| A full box drawn around content | Decoration pretending to be structure | The weight ladder, §6 |
| Two `surface-tint` blocks in a row | They merge into one oversized block | Put a level 2 or 3 section between |
| A drop shadow anywhere but the partner wall | Reads as a SaaS card; the wall earns it, nothing else does | Separate with fill, spacing and type |
| Two dark sections back to back | Reads as one oversized block with a gap in it | Break with a light section |


**`/admin/people` is outside this document on purpose.**
It is a development-only tool that never reaches a visitor, so it uses plain form controls
and borrowed tokens rather than the design system. Do not spend design effort on it, and do
not let its input and select styling leak into the site.

---

## 9. Verification

Colour and type regressions are invisible to the type-checker, so check them explicitly.
All of these must return empty except the last.

```bash
cd wos-new-design

# 1. No hex literals in components. globals.css is excluded: it is the token
#    DEFINITION site, and the rule is "no hex in a component", not "no hex anywhere".
#    The reference repo's version of this check omitted the exclusion and therefore
#    returned ~20 hits on a clean tree, which is how a check gets ignored.
grep -rnoE '#[0-9A-Fa-f]{3,8}\b' app components lib --exclude=globals.css

# 2. Hex smuggled through rgb()/rgba()
grep -rnE 'rgba?\(' app components lib

# 3. Any arbitrary-value colour utility
grep -rnE '(bg|text|border[a-z-]*|fill|ring|placeholder|shadow)-\[(#|rgb|hsl|oklch)' app components

# 4. Retired typography. Excludes comment lines: globals.css documents that the
#    Georgia/Trajan shims were removed, and naming a thing in order to say it is gone
#    should not trip the check that looks for it.
grep -rniE 'font-serif|wordmark|trajan|georgia' app components lib \
  --exclude=globals.css | grep -vE '^\S+:[0-9]+: *(//|/\*|\*)'

# 5. Center-site brand language must not reach the PAGE. Grepped in the rendered
#    output rather than in source, because lib/brand.ts deliberately names these in a
#    comment to tell the next person not to add them. Source-grepping made the comment
#    that prevents the mistake indistinguishable from the mistake.
#
#    The chrome phrase, not the words. The reference site's version caught "Columbia",
#    "Northeastern", and any mention of Teachers College, and all three belong on this
#    site: the WOS model derives from Columbia research and /our-story/ says so, the
#    WOS-Northeastern Talent Pipeline Program is a real page, and two board biographies
#    name Teachers College as where their faculty post or doctorate is. What must never
#    appear is the co-branding line, which always reads "in partnership with".
#    A check that flags the site's own history gets ignored.
grep -riE 'in partnership with (teachers college|columbia)' \
  .next/server/app/*.html .next/server/app/*/*.html

# 6. POSITIVE control - tokens must exist in the BUILT css
npm run build
grep -oh -- '--color-[a-z-]*' .next/static/chunks/*.css | sort -u
```

All six must return empty except the last, which must list every token.

**Check 6 matters most and is the one that gets skipped.**
A misspelled token in Tailwind v4 produces no error: `text-ink-mutedd` generates no rule, the element inherits, and the page looks almost right.
Checks 1-5 all pass on a completely broken build.

Two further traps found the hard way:

- **Grep the compiled CSS, not just components.** The teal border on `.pull-quote` lived in `globals.css` and was used by all twelve program detail pages; no component-level search would have found it.
- **Turbopack's cache goes stale on token changes.** After editing `globals.css`, `rm -rf .next` and restart, then confirm the value in the CSS the browser actually receives. A hot reload will silently serve the old colour.
