import { HOME_PROSE } from "@/content/home-prose";

/**
 * The homepage's prose, cut into the pieces its layout sets as structure.
 *
 * Every cut fails the build if the copy it relies on changes, rather than shipping a
 * sentence split in the wrong place.
 */

export function prose(heading: string) {
  const section = HOME_PROSE.find((s) => s.heading === heading);
  if (!section) throw new Error(`content/home-prose.ts has no section "${heading}"`);
  return section.body.join(" ");
}

/** Split `text` at `marker`, failing the build if the copy no longer contains it. */
export function cut(text: string, marker: string): [string, string] {
  const at = text.indexOf(marker);
  if (at < 0) throw new Error(`Expected "${marker}" in: ${text.slice(0, 60)}...`);
  return [text.slice(0, at).trim(), text.slice(at + marker.length).trim()];
}

/** The sentence the conversion chapter states, lifted out of the method paragraph. */
export const CONVERSION = "Upon conversion to employment, our consultants already know your business and culture.";

// The Method paragraph is three ideas run together. The first stays prose; the other
// two are lists inside a sentence, and are set as lists. Its middle sentence is the
// conversion chapter's statement, so it is said there, once.
const [methodProse, methodLists] = cut(prose("Our Unique Method and Solution"), "WOS finds talent");

const TALENT = ["Local communities", "College graduates", "Military veterans"];
const SUPPORT = [
  "Professional development and technical training",
  "Paid part-time college tuition",
  "Special financial assistance where needed",
];
for (const item of [...TALENT, ...SUPPORT]) {
  if (!methodLists.toLowerCase().includes(item.toLowerCase())) {
    throw new Error(`The method paragraph no longer says "${item}": ${methodLists.slice(0, 60)}...`);
  }
}

/** The Business Solution paragraph, whole. Its four words were tried as tiles and read as a slogan. */
export const SOLUTION = prose("The WOS Business Solution");

export const METHOD = {
  lead: cut(methodProse, CONVERSION).join(" "),
  talent: { title: "Where our talent comes from", items: TALENT },
  support: { title: "How we help our employees succeed", items: SUPPORT },
  photo: {
    src: "/images/171206_4700_cropped-scaled-1-1.jpg",
    alt: "Three people on a panel at a WOS event, one speaking into a microphone",
  },
};
