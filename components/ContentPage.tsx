import Image from "next/image";
import { Eyebrow, PrimaryButton, SectionHeading } from "@/components/Brand";
import FadeIn from "@/components/FadeIn";
import DIMS from "@/lib/image-dims.json";
import type {
  Block,
  LeadBlock,
  PageContent,
  Section,
  SectionDensity,
  SectionFill,
} from "@/lib/content";

/** The prose column: max-w-3xl (768px) less px-6 on both sides. */
const COLUMN = 720;

const SIZES = `(max-width: 768px) 100vw, ${COLUMN}px`;

function ContentImage({
  src,
  alt,
  frame = false,
}: {
  src: string;
  alt: string;
  /** Card use: a fixed 4:3 crop, so a grid of mixed sources lines up. */
  frame?: boolean;
}) {
  // Vector files are the diagrams. sharp reports an SVG's viewBox rather than a
  // rendered size, so they are held to a max width instead of measured.
  if (src.endsWith(".svg")) {
    return (
      <Image
        src={src}
        alt={alt}
        width={420}
        height={420}
        className="mt-8 h-auto w-full max-w-[420px] object-contain"
      />
    );
  }

  // JSON widens the pairs to number[], so the length is checked rather than asserted.
  const dims = (DIMS as Record<string, number[]>)[src];
  // An unmeasured file is a missing manifest entry, not a reason to guess: 1200x800 for
  // everything is exactly the bug this replaced. Run tools/image-dims.mjs.
  if (!dims || dims.length !== 2) {
    throw new Error(
      `No dimensions for ${src}. Run \`node tools/image-dims.mjs\` after adding an image.`,
    );
  }
  const [width, height] = dims;

  if (frame) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="aspect-[4/3] w-full bg-surface-tint object-cover"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={SIZES}
      // Never upscale. Several of these are icons of 100px or so, and `w-full` on one
      // blew it up to the full column width.
      style={{ maxWidth: Math.min(width, COLUMN) }}
      className="mt-8 h-auto w-full object-contain"
    />
  );
}

/**
 * `level` keeps the outline intact. A section with its own heading renders that as the
 * h2 and everything inside it as h3; a section without one would otherwise put h3s
 * directly under the page h1 and skip a level, which is what nine pages were doing.
 */
function Blocks({
  blocks,
  dark = false,
  level = 3,
}: {
  blocks: Block[];
  dark?: boolean;
  level?: 2 | 3;
}) {
  const H = level === 2 ? "h2" : "h3";
  const heading = dark ? "text-white" : "text-ink";
  const body = dark ? "text-white/80" : "text-ink-muted";

  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "heading":
            return (
              <H
                key={i}
                className={`mt-10 font-heading font-semibold leading-[1.25] first:mt-0 ${
                  level === 2 ? "text-[24px] md:text-[28px]" : "text-[20px]"
                } ${heading}`}
              >
                {b.text}
              </H>
            );

          case "para":
            return (
              <p key={i} className={`mt-4 text-[17px] leading-[1.65] ${body}`}>
                {b.text}
              </p>
            );

          // Tiles, not a rule down the left.
          //
          // A hairline on the left edge of every item drew a long vertical line beside
          // a column of text and separated nothing; these are selling points and tool
          // names, and they want to read as a set of things. The band is split by its
          // own gaps rather than by borders on each cell, so it stays inside the "no
          // box drawn around content" rule in DESIGN.md section 8: the separation is
          // fill, not outline.
          case "list": {
            const terse =
              b.items.length >= 6 &&
              b.items.every((item) => item.split(/\s+/).length <= 4);
            const seam = dark ? "bg-white/20" : "bg-hairline-strong";
            const cell = dark ? "bg-surface-dark" : "bg-surface-tint";
            return (
              <ul
                key={i}
                className={`m-0 mt-6 grid list-none gap-px p-0 ${seam} ${
                  terse
                    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {b.items.map((item, j) => {
                  // "Label : body" is how the source writes a definition. Bolding the
                  // label is the difference between a wall of bullets and a list you
                  // can scan; the separator itself is noise once the weight carries it.
                  const [, label, rest] =
                    /^([^:]{2,60}?)\s+:\s+([\s\S]+)$/.exec(item) ?? [];
                  return (
                    <li
                      key={j}
                      className={`${cell} ${
                        terse ? "px-4 py-3 text-[15px]" : "px-6 py-5 text-[16px]"
                      } leading-[1.5] ${body}`}
                    >
                      {!terse && (
                        <span className="mb-3 block h-0.5 w-6 bg-accent" />
                      )}
                      {label ? (
                        <>
                          <strong className={`font-semibold ${heading}`}>
                            {label}
                          </strong>{" "}
                          {rest}
                        </>
                      ) : (
                        item
                      )}
                    </li>
                  );
                })}
              </ul>
            );
          }

          // An ordered process. The numeral is positional, so renumbering the data
          // renumbers the page and the two can never disagree.
          case "steps":
            return (
              <ol
                key={i}
                className={`m-0 mt-8 grid list-none grid-cols-1 gap-px p-0 sm:grid-cols-2 ${
                  dark ? "bg-white/20" : "bg-hairline-strong"
                }`}
              >
                {b.items.map((step, j) => (
                  <li
                    key={j}
                    className={dark ? "bg-surface-dark p-6" : "bg-surface-tint p-6"}
                  >
                    {/* Red on 28px clears the large-text threshold, which is the only
                        way it is legal on either surface. See DESIGN.md section 8. */}
                    <span className="block font-heading text-[28px] font-semibold leading-none text-action">
                      {j + 1}
                    </span>
                    <H
                      className={`mt-3 font-heading text-[17px] font-semibold leading-[1.3] ${heading}`}
                    >
                      {step.title}
                    </H>
                    {step.body && (
                      <p className={`mt-2 text-[15px] leading-[1.6] ${body}`}>
                        {step.body}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            );

          // Unordered peers. No photo and no link, so this is not PhotoLedCard: these
          // are titled blocks of copy, and inventing a stock image for each would be
          // decoration standing in for content.
          case "cards": {
            const withImages = b.items.some((c) => c.image);
            return (
              <ul
                key={i}
                className={`m-0 mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 ${
                  withImages ? "lg:grid-cols-3" : ""
                }`}
              >
                {b.items.map((card, j) => (
                  <li
                    key={j}
                    className={
                      withImages
                        ? dark
                          ? "flex flex-col bg-white/10"
                          : "flex flex-col bg-surface-tint"
                        : ""
                    }
                  >
                    {card.image && (
                      <ContentImage
                        src={card.image}
                        alt={card.imageAlt ?? ""}
                        frame
                      />
                    )}
                    <div className={withImages ? "p-6" : ""}>
                      <span className="block h-0.5 w-6 bg-accent" />
                      <H
                        className={`mt-3 font-heading text-[18px] font-semibold leading-[1.3] ${heading}`}
                      >
                        {card.title}
                      </H>
                      <p className={`mt-2 text-[15px] leading-[1.6] ${body}`}>
                        {card.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }

          // The closing line of a service page is an instruction to do something, and
          // it was rendering as an orphan h2 over an empty section on three pages.
          case "cta":
            return (
              <div key={i} className="mt-2">
                <p
                  className={`max-w-2xl font-heading text-[22px] font-semibold leading-[1.3] md:text-[26px] ${heading}`}
                >
                  {b.text}
                </p>
                <div className="mt-7">
                  <PrimaryButton href={b.href}>{b.label}</PrimaryButton>
                </div>
              </div>
            );

          case "image":
            return <ContentImage key={i} src={b.src} alt={b.alt} />;
        }
      })}
    </>
  );
}

const PADDING: Record<SectionDensity, string> = {
  tight: "py-12",
  normal: "py-16",
  feature: "py-24",
};

/**
 * Prose is capped at a reading measure, structure is not.
 *
 * A four-card grid or a step sequence inside max-w-3xl is the "text packed into one
 * space" complaint: the column is sized for line length, and a grid in it has nowhere
 * to go. Sections carrying structure get the standard page width instead.
 */
function widthFor(section: Section): string {
  const structured = section.blocks.some(
    (b) => b.kind === "steps" || b.kind === "cards",
  );
  return structured ? "max-w-6xl" : "max-w-3xl";
}

const FILL: Record<SectionFill, string> = {
  white: "",
  tint: "bg-surface-tint",
  dark: "bg-surface-dark",
};

/**
 * Resolve each section's fill once, so adjacency can be checked before anything renders.
 *
 * A section with no explicit fill takes the opposite of whatever resolved above it,
 * which is the old alternation generalised: it still produces white/tint/white with no
 * fills set, but it no longer breaks when one section opts out. White follows dark
 * rather than tint, because tint under a dark block reads as a grey seam on it.
 */
function resolveFills(sections: Section[], offset: number): SectionFill[] {
  // The fill the alternation behaves as though it just emitted, so section 0 lands the
  // same way the old `(i + offset) % 2` did.
  let prev: SectionFill = offset % 2 === 1 ? "white" : "tint";

  return sections.map((section) => {
    const fill =
      section.fill ?? (prev === "tint" ? "white" : prev === "dark" ? "white" : "tint");
    prev = fill;
    return fill;
  });
}

/**
 * The prose sections on their own, for pages that put something else above them.
 *
 * `offset` shifts which sections take the tint, so a page that has already used a
 * tinted block above these does not end up with two of them touching.
 */
export function ContentSections({
  sections,
  offset = 0,
}: {
  sections: Section[];
  offset?: number;
}) {
  const fills = resolveFills(sections, offset);

  // Two tinted or two dark blocks in a row read as one oversized block. Only an
  // explicit fill can produce that now, so it is an authoring mistake and should fail
  // the build rather than ship. DESIGN.md section 8.
  for (let i = 1; i < fills.length; i += 1) {
    if (fills[i] === fills[i - 1] && fills[i] !== "white") {
      throw new Error(
        `Two ${fills[i]} sections in a row (${i - 1} and ${i}: ` +
          `"${sections[i - 1].heading ?? "untitled"}" then "${sections[i].heading ?? "untitled"}"). ` +
          `Set fill on one of them.`,
      );
    }
  }

  return (
    <>
      {sections.map((section, i) => {
        const fill = fills[i];
        // Density follows how much is in the block, not the index. A one-block section
        // given the same room as a six-block one is the flat rhythm DESIGN.md section 5
        // rules out; `feature` stays opt-in because long prose does not want more air.
        const density = section.density ?? (section.blocks.length <= 1 ? "tight" : "normal");

        return (
          <section key={i} className={`${FILL[fill]} ${PADDING[density]}`.trim()}>
            <FadeIn className={`mx-auto ${widthFor(section)} px-6`}>
              {section.heading && (
                <SectionHeading dark={fill === "dark"}>
                  {section.heading}
                </SectionHeading>
              )}
              <div className={section.heading ? "mt-6" : ""}>
                <Blocks
                  blocks={section.blocks}
                  dark={fill === "dark"}
                  level={section.heading ? 3 : 2}
                />
              </div>
            </FadeIn>
          </section>
        );
      })}
    </>
  );
}

/**
 * The shared layout for the prose pages, which is most of the site.
 *
 * Rhythm comes from alternating fill and from density, not from spacing alone. Uniform
 * py-20 on twenty pages is the failure this avoids.
 *
 * The lead is paragraphs only, and that is enforced by LeadBlock rather than here: it
 * renders inside the dark header where only `p` is recoloured, so a heading put here
 * rendered slate on slate and disappeared. See lib/content.ts.
 */
export default function ContentPage({ page }: { page: PageContent }) {
  const hero = page.hero;

  return (
    <article>
      {/* The hero is a panel beside the title, not a full-bleed strip under it.
          A 1600x600 band of stock photography spanning the viewport was the loudest
          thing on every service page and said nothing; paired with the slate block it
          reads as one masthead instead of a banner followed by a picture. With no
          image the header keeps the full width, so nothing has a hole in it. */}
      <header className="relative bg-surface-dark text-white">
        <span className="absolute left-0 top-0 z-10 h-[3px] w-20 bg-action" />
        <div
          className={
            hero
              ? "mx-auto grid max-w-7xl grid-cols-1 items-stretch md:grid-cols-[1.05fr_0.95fr]"
              : "mx-auto max-w-6xl px-6 pb-16 pt-20"
          }
        >
          <div className={hero ? "px-6 py-16 md:py-24 lg:pl-10" : ""}>
            <Eyebrow label={page.eyebrow} dark />
            <h1 className="max-w-3xl font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[52px]">
              {page.title}
            </h1>
            {page.lead.length > 0 && (
              <div className="mt-6 max-w-xl">
                {page.lead.map((b: LeadBlock, i) => (
                  <p key={i} className="mt-4 text-[17px] leading-[1.65] text-white/80">
                    {b.text}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* alt is empty on purpose: the heading beside it already says what the page
              is, so describing the stock photograph again is noise to a screen reader. */}
          {hero && (
            <div className="relative min-h-[260px] md:min-h-0">
              <Image
                src={hero.src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </header>

      <ContentSections sections={page.sections} />
    </article>
  );
}
