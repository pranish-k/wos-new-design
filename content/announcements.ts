// The announcement the homepage promotes, for /announcements-demo.
//
// One record, not a list. Every pattern on the demo shows the same announcement, because
// a site that announces three things at once in a bar, a hero line and a dialog has
// announced nothing. News is the blog archive in content/posts.ts and is not repeated here.
//
// `id` is what a dismissal is remembered against. Change it when the announcement
// changes, and everyone who closed the old one sees the new one; leave it alone when
// correcting a typo, and nobody is shown it twice.
//
// The copy is the Institute's own, from content/partnerships.ts and the announcement
// draft at /introducing-workforce-ai-institute. It links to /ai-institute rather than to
// that draft, which is a temporary preview marked for deletion.

export type Announcement = {
  id: string;
  /** Short label set before the title. "New" in the bar, the eyebrow elsewhere. */
  label: string;
  title: string;
  /** One sentence. The bar drops it; the dialog and the band carry it. */
  summary: string;
  href: string;
  cta: string;
};

export const ANNOUNCEMENT: Announcement = {
  id: "workforce-ai-institute-2026",
  label: "Announcement",
  title: "Introducing the Institute for Imagination, Reflective Development, and AI Futures",
  summary:
    "Studying how people develop imagination, ethical foresight and innovation in the age of AI.",
  href: "/ai-institute",
  cta: "Read about the Institute",
};
