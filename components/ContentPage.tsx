import Image from "next/image";
import { CloseChapter, HeroImage, PageHero, PAD, PAD_TIGHT, SectionHeading, TYPE, WRAP, stagger } from "@/components/Brand";
import { assertNoRepeats, Chapter, type Field } from "@/components/Chapter";
import InView from "@/components/InView";
import DIMS from "@/lib/image-dims.json";
import type { Block, PageContent, Section, SectionFill } from "@/lib/content";

/** The reading column: max-w-3xl (768px) less the gutters. */
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
        className="reveal mt-10 h-auto w-full max-w-[420px] object-contain"
      />
    );
  }

  // JSON widens the pairs to number[], so the length is checked rather than asserted.
  const dims = (DIMS as Record<string, number[]>)[src];
  // An unmeasured file is a missing manifest entry, not a reason to guess: 1200x800 for
  // everything is exactly the bug this replaced. Run tools/image-dims.mjs.
  if (!dims || dims.length !== 2) {
    throw new Error(`No dimensions for ${src}. Run \`node tools/image-dims.mjs\` after adding an image.`);
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
        className="aspect-[4/3] w-full bg-[var(--field-panel)] object-cover"
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
      className="reveal mt-10 h-auto w-full object-contain"
    />
  );
}

/**
 * The content block vocabulary, rendered for whatever field it lands on. Every colour is
 * the field's (var(--field-*)), so a list on slate and a list on paper are one branch.
 *
 * `level` keeps the outline intact. A section with its own heading renders that as the
 * h2 and everything inside it as h3; a section without one would otherwise put h3s
 * directly under the page h1 and skip a level.
 */
function Blocks({ blocks, level = 3 }: { blocks: Block[]; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  let n = 0;
  const next = () => stagger(Math.min(n++, 6));

  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "heading":
            return (
              <H key={i} className={`reveal mt-12 max-w-[34ch] ${TYPE.h3} first:mt-0`} style={next()}>
                {b.text}
              </H>
            );

          case "para":
            return (
              <p key={i} className={`reveal mt-5 max-w-[66ch] ${TYPE.body} first:mt-0`} style={next()}>
                {b.text}
              </p>
            );

          // A set of things, each on the field's rule. How an item is set follows how
          // long it is, not how many there are: a short item is a name ("Okta", "Onsite,
          // Remote or Hybrid") and is set as one, in the heading face; a sentence stays
          // body copy. Short items run three across once there are enough to fill a row,
          // so eleven tool names are a block rather than a tall stack.
          // "Label : body" is how the source writes a definition, and setting the label
          // as a heading is the difference between a wall of bullets and a list you can scan.
          case "list": {
            const terse = b.items.every((item) => item.split(/\s+/).length <= 8 && !item.includes(" : "));
            return (
              <ul
                key={i}
                className={`m-0 mt-8 grid list-none p-0 first:mt-0 ${
                  terse
                    ? `grid-cols-1 gap-x-8 sm:grid-cols-2 ${b.items.length >= 5 ? "lg:grid-cols-3" : ""}`
                    : "grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2"
                }`}
              >
                {b.items.map((item, j) => {
                  const [, label, rest] = /^([^:]{2,60}?)\s+:\s+([\s\S]+)$/.exec(item) ?? [];
                  return terse ? (
                    <li
                      key={j}
                      className="reveal border-t-2 border-[var(--field-rule)] py-3 font-heading text-[18px] font-semibold leading-snug"
                      style={stagger(Math.min(j, 8))}
                    >
                      {item}
                    </li>
                  ) : (
                    <li
                      key={j}
                      className="reveal border-t-2 border-[var(--field-rule)] pt-4"
                      style={stagger(Math.min(j, 8))}
                    >
                      {label ? (
                        <>
                          <strong className="block font-heading text-[19px] font-semibold leading-snug">
                            {label}
                          </strong>
                          <span className={`mt-2 block ${TYPE.small} text-[var(--field-muted)] md:text-[17px]`}>
                            {rest}
                          </span>
                        </>
                      ) : (
                        <span className={`block ${TYPE.small} md:text-[17px]`}>{item}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            );
          }

          // An ordered process. The numeral is positional, so renumbering the data
          // renumbers the page and the two can never disagree. It is set in the field's
          // accent at 28px, which clears the large-text floor on every field it can land on.
          case "steps":
            return (
              <ol
                key={i}
                className="m-0 mt-10 grid list-none grid-cols-1 gap-x-12 gap-y-10 p-0 first:mt-0 md:grid-cols-2"
              >
                {b.items.map((step, j) => (
                  <li key={j} className="reveal grid grid-cols-[3rem_1fr] gap-4" style={stagger(Math.min(j, 8))}>
                    <span className="font-heading text-[30px] font-semibold leading-none text-[var(--field-accent)]">
                      {j + 1}
                    </span>
                    <div>
                      <H className="font-heading text-[21px] font-semibold leading-tight md:text-[23px]">{step.title}</H>
                      {step.body && (
                        <p className={`mt-2 max-w-[52ch] ${TYPE.small} text-[var(--field-muted)] md:text-[17px]`}>
                          {step.body}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            );

          // Unordered peers. With images they are panels on the field's panel colour;
          // without, titled blocks on the rule.
          case "cards": {
            const withImages = b.items.some((c) => c.image);
            const many = b.items.length >= 6;
            return (
              <ul
                key={i}
                className={`m-0 mt-10 grid list-none grid-cols-1 p-0 first:mt-0 sm:grid-cols-2 ${
                  withImages ? "gap-6 lg:grid-cols-3" : `gap-x-10 gap-y-10 ${many || b.items.length === 3 ? "lg:grid-cols-3" : ""}`
                }`}
              >
                {b.items.map((card, j) => (
                  <li
                    key={j}
                    className={`reveal ${withImages ? "flex flex-col bg-[var(--field-panel)]" : "border-t-4 border-[var(--field-rule)] pt-5"}`}
                    style={stagger(Math.min(j, 8))}
                  >
                    {card.image && <ContentImage src={card.image} alt={card.imageAlt ?? ""} frame />}
                    <div className={withImages ? "p-6 md:p-7" : ""}>
                      <H className="font-heading text-[21px] font-semibold leading-tight tracking-[-0.01em] md:text-[23px]">
                        {card.title}
                      </H>
                      <p className={`mt-3 ${TYPE.small} text-[var(--field-muted)] md:text-[17px]`}>{card.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }

          // A cta mid-page. The common case, a page's closing instruction, never reaches
          // here: ContentPage lifts it into the CloseChapter.
          case "cta":
            return (
              <p key={i} className={`reveal mt-8 max-w-[40ch] ${TYPE.h3}`} style={next()}>
                {b.text}
              </p>
            );

          case "image":
            return <ContentImage key={i} src={b.src} alt={b.alt} />;
        }
      })}
    </>
  );
}

/** A section's field when the content names one. `dark` is slate. */
const NAMED: Record<SectionFill, Field> = { white: "paper", tint: "tint", dark: "slate" };

/**
 * Resolve each section's field once, so adjacency can be checked before anything renders.
 *
 * A section with no explicit fill alternates paper and tint from whatever resolved above
 * it. A step sequence with no fill of its own goes to deep: an ordered process is the one
 * block that reads better as a scene than as copy, and it breaks the light run the way
 * the homepage's approach chapter does. Not when it is the last thing before the footer,
 * though, which is slate and would merge with it.
 */
function resolveFields(sections: Section[], after: Field, footerNext: boolean): Field[] {
  let prev = after;
  return sections.map((section, i) => {
    const beforeFooter = footerNext && i === sections.length - 1;
    let field: Field;
    if (section.fill) field = NAMED[section.fill];
    else if (section.blocks.some((b) => b.kind === "steps") && prev !== "deep" && !beforeFooter) field = "deep";
    else field = prev === "paper" ? "tint" : "paper";
    prev = field;
    return field;
  });
}

/** A section carrying structure gets the page grid; prose keeps a reading measure. */
function structured(section: Section) {
  return section.blocks.some((b) => b.kind === "steps" || b.kind === "cards" || (b.kind === "list" && b.items.length > 4));
}

/**
 * A page's last section, when all it holds is the closing instruction, is the close: it
 * becomes the CloseChapter, on the gradient, rather than a sentence over an empty band.
 */
function splitClose(sections: Section[]) {
  const last = sections.at(-1);
  const only = last?.blocks.length === 1 ? last.blocks[0] : undefined;
  if (only?.kind === "cta") return { body: sections.slice(0, -1), close: only };
  return { body: sections, close: undefined };
}

/**
 * The prose sections as chapters, for any page, closing on the CloseChapter when the
 * last section is the page's closing instruction.
 *
 * `after` is the field of the chapter directly above, so the first section here never
 * repeats it. Two chapters of one field in a row fail the build, DESIGN.md §5.
 *
 * `last` says nothing follows but the footer. The footer is slate, so a run that ends the
 * page must not end on slate or deep, where the two would merge into one block.
 */
export function ContentSections({
  sections,
  after = "gradient",
  last = true,
}: {
  sections: Section[];
  after?: Field;
  last?: boolean;
}) {
  const { body, close } = splitClose(sections);
  const fields = resolveFields(body, after, last && !close);
  const where = `ContentSections (first: "${body[0]?.heading ?? "untitled"}")`;
  assertNoRepeats([after, ...fields], where);
  const end = fields.at(-1);
  if (last && !close && (end === "slate" || end === "deep")) {
    throw new Error(`${where} ends the page on the ${end} field, which merges into the footer. Give the last section a light fill.`);
  }

  return (
    <>
      {body.map((section, i) => {
        const wide = structured(section);
        // Density follows how much is in the block: a single paragraph given the room of
        // a six-block section is the flat rhythm DESIGN.md §5 rules out.
        const pad = section.density === "feature" ? PAD : section.blocks.length <= 1 && !wide ? PAD_TIGHT : PAD;

        return (
          <Chapter key={i} field={fields[i]}>
            <InView className={`${WRAP} ${pad}`}>
              {section.heading ? (
                <div className={wide ? "" : "grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16"}>
                  <SectionHeading>{section.heading}</SectionHeading>
                  <div className={wide ? "mt-10 md:mt-12" : "lg:pt-2"}>
                    <Blocks blocks={section.blocks} level={3} />
                  </div>
                </div>
              ) : (
                <div className={wide ? "" : "max-w-3xl"}>
                  <Blocks blocks={section.blocks} level={2} />
                </div>
              )}
            </InView>
          </Chapter>
        );
      })}
      {close && <CloseChapter title={close.text} href={close.href} action={close.label} />}
    </>
  );
}

/**
 * The shared layout for the prose pages, which is most of the site: the gradient
 * opening, then the sections as chapters, then the close when the page has one.
 *
 * The lead is paragraphs only, enforced by LeadBlock in lib/content.ts.
 */
export default function ContentPage({ page }: { page: PageContent }) {
  return (
    <article>
      <PageHero
        label={page.eyebrow}
        title={page.title}
        lead={page.lead.map((b) => b.text)}
        // Empty alt: the title beside it already says what the page is, and describing
        // the stock photograph again is noise to a screen reader.
        media={page.hero ? <HeroImage src={page.hero.src} alt="" /> : undefined}
      />
      <ContentSections sections={page.sections} />
    </article>
  );
}
