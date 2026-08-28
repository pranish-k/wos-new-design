// Page copy is data, extracted from the mirror by tools/extract.py and shaped by
// tools/build_content.py. The build never reads the mirror: these files are generated
// once, committed, and hand-edited from there.

export type Block =
  | { kind: "heading"; text: string }
  | { kind: "para"; text: string }
  | { kind: "list"; items: string[] };

/** A section starts at each h2 in the source. Everything before the first one is lead. */
export type Section = {
  heading?: string;
  blocks: Block[];
};

export type PageContent = {
  /** Live URL, for checking a page against the mirror. */
  route: string;
  title: string;
  eyebrow: string;
  /** The live meta description, reused as the page description. */
  description: string;
  lead: Block[];
  sections: Section[];
};
