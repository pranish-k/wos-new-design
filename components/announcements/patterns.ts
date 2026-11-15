// The patterns /announcements-demo can show, in the order the controls list them.
//
// A plain module rather than part of the controls, because the page is a server
// component and reads this to decide what to render. A value exported from a
// "use client" file reaches a server component as a reference, not as the array.

export const PATTERNS = [
  {
    key: "bar",
    name: "Announcement bar",
    note: "A red strip above the header. Closable, and stays closed on later visits.",
  },
  {
    key: "hero",
    name: "Hero line",
    note: "One line under the hero buttons. Part of the first screen, never in the way.",
  },
  {
    key: "band",
    name: "News band",
    note: "The announcement and the latest three posts, under the impact figures.",
  },
  {
    key: "dialog",
    name: "First-visit dialog",
    note: "Opens once, on a visitor's first page view, then never again.",
  },
  {
    key: "corner",
    name: "Corner notice",
    note: "Arrives once the visitor scrolls past the hero. Closable.",
  },
] as const;

export type PatternKey = (typeof PATTERNS)[number]["key"];

/** What the demo shows with no query string: the three that never interrupt. */
export const DEFAULT_PATTERNS: PatternKey[] = ["bar", "hero", "band", "dialog", "corner"];

/**
 * `?show=` to the patterns it names. Shared by the page and the @banner slot, which
 * each read the query separately and must agree. An unknown key is dropped rather than
 * an error, since the URL is typed by people sharing combinations.
 */
export function parsePatterns(raw: string | string[] | undefined): PatternKey[] {
  if (typeof raw !== "string") return DEFAULT_PATTERNS;
  const asked = raw.split(",");
  return PATTERNS.map((p) => p.key).filter((k) => asked.includes(k));
}

/**
 * Hides the bar for a visitor who closed it, before first paint. A string because it
 * runs during HTML parsing, before React exists, so the page sets it directly after the
 * bar. Mirrors the key format in useDismissal. See AnnouncementBar.
 */
export function barPrepaintScript(id: string) {
  return `try{if(localStorage.getItem("wos.announcement.bar")===${JSON.stringify(id)}){var b=document.getElementById("announcement-bar");if(b)b.hidden=true}}catch(e){}`;
}
