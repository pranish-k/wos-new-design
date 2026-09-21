// Page copy is data, extracted from the mirror by tools/extract.py and shaped by
// tools/build_content.py. The build never reads the mirror: these files are generated
// once, committed, and hand-edited from there.

export type Block =
  | { kind: "heading"; text: string }
  | { kind: "para"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "steps"; items: Step[] }
  | { kind: "cards"; items: Card[] }
  | { kind: "cta"; text: string; href: string; label: string }
  | { kind: "image"; src: string; alt: string };

/** One stage of an ordered process. The number is positional, never in the title. */
export type Step = { title: string; body?: string };

/**
 * A titled block of copy in a grid. Unlike Step, order carries no meaning.
 *
 * `image` is optional and decorative: it is the stock art the live pages already carry
 * beside these titles. A card with an image is still not a PhotoLedCard, which links
 * somewhere and needs a real destination.
 */
export type Card = { title: string; body: string; image?: string; imageAlt?: string };

/**
 * The lead is paragraphs and nothing else, enforced by the type rather than by review.
 *
 * It renders inside the dark header, where only `p` is recoloured. A heading block put
 * here used to render text-ink on bg-surface-dark, and those two tokens resolve to the
 * same value, so the text was invisible at 1:1 contrast. 112 headings across 15 pages
 * were in that state, because tools/build_content.py splits sections at h2 and the
 * Kubio source pages mostly have none, so whole page bodies landed in the lead.
 *
 * Narrowing the type is what stops it coming back: a heading, list or image in a lead
 * is now a compile error naming the content file, not a page that looks almost right.
 */
export type LeadBlock = { kind: "para"; text: string };

/** How much vertical room a section gets. Set it by how much is in the block. */
export type SectionDensity = "tight" | "normal" | "feature";

/**
 * Explicit fill, overriding the alternating default.
 *
 * Only set this where the default gets it wrong. Two tinted or two dark sections in a
 * row read as one oversized block, so ContentSections throws on that rather than
 * rendering it - see DESIGN.md section 8.
 */
export type SectionFill = "white" | "tint" | "dark";

/** A section starts at each h2 in the source. Everything before the first one is lead. */
export type Section = {
  heading?: string;
  blocks: Block[];
  density?: SectionDensity;
  fill?: SectionFill;
};

export type PageImage = { src: string; alt: string };

export type PageContent = {
  /** Live URL, for checking a page against the mirror. */
  route: string;
  title: string;
  eyebrow: string;
  /** The live meta description, reused as the page description. */
  description: string;
  /** The Kubio hero background. Absent on the pages that never had one. */
  hero: PageImage | null;
  /** Intro paragraphs only. Everything with structure belongs in a section. */
  lead: LeadBlock[];
  sections: Section[];
};
