import type { Block } from "@/lib/content";

// The people registry.
//
// One record per person, and one record is the only place a person exists. Before this,
// a person lived in content/people.ts (the card), content/person-pages.ts (the bio), and
// next.config.ts (their legacy URL), with name and photo duplicated across the first two
// and nothing keeping them in sync.

export type GroupId =
  | "team"
  | "board-of-directors"
  | "academic-advisory-board"
  | "industry-advisory-board"
  | "hr-advisory-board";

export type BioBlock = { kind: "heading" | "para"; text: string };

export type PersonRecord = {
  /** URL segment and photo filename. Stable: renaming it breaks a live URL. */
  slug: string;
  name: string;
  role: string;
  /**
   * Which pages this person appears on. More than one is allowed; `groups[0]` owns the
   * canonical URL, so a person in both boards still has exactly one page.
   */
  groups: GroupId[];
  /** `hidden` removes them from every page and from the build, without losing the record. */
  status: "published" | "hidden";
  /** `null` sorts by surname, which is how the live site orders every group. */
  order: number | null;
  photo: string | null;
  /** Empty means card only. The card does not link and no page is generated. */
  bio: BioBlock[];
  /** Old URLs that 301 to this person. They travel with the record, not with the config. */
  legacyPaths: string[];
};

export type Group = {
  id: GroupId;
  /** Top-level path segment. Also the parent segment of every member's page. */
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  /**
   * Copy above the grid, reusing the site-wide Block type so a group can carry a list
   * as well as prose. Empty renders no intro, which is a valid page: three of the five
   * groups have no intro copy on the live site.
   */
  intro: Block[];
  order: number;
};

/** The canonical page for a person, or null when they have no bio to put on one. */
export function personHref(p: PersonRecord): string | null {
  return p.bio.length > 0 ? `/${p.groups[0]}/${p.slug}` : null;
}

/**
 * Surname, because that is how every group is ordered on the live site. An explicit
 * `order` wins so a board chair can be pinned to the top.
 */
export function comparePeople(a: PersonRecord, b: PersonRecord): number {
  if (a.order !== null || b.order !== null) {
    if (a.order === null) return 1;
    if (b.order === null) return -1;
    if (a.order !== b.order) return a.order - b.order;
  }
  return surname(a.name).localeCompare(surname(b.name));
}

function surname(name: string): string {
  // Titles are part of the name string on the live site ("Dr. Bruce Hedin"), and the
  // last word is the surname in every case in the registry, including "Julie L.
  // Brickell, Esquire" once the suffix is dropped.
  const parts = name.replace(/,\s*(Esquire|Esq\.?|Ph\.?D\.?|Jr\.?|Sr\.?|III?|IV)$/i, "").trim().split(/\s+/);
  return parts[parts.length - 1] ?? name;
}
