// The three partnerships and centers shown on the homepage.
//
// One homepage SECTION each, not three columns of one band. They were a band under an
// invented heading, which put a marketing line on a page whose every other heading is
// the client's own words.
//
// They are not equals and the page must not present them as equals: Hunter is a live
// partnership with a page behind it, the Center for Strategic Learning is an existing WOS
// center with its own deployment, and CIRDAF is a proposal. `status` is what carries that
// difference. It renders as each section's eyebrow, so the distinction is the first thing
// read rather than something inferred from the copy.
//
// `href: null` means the item is named but not linked. A card that links nowhere is
// honest; a card that links to a page which does not exist is not.
//
// `external` leaves this site. The Center has its own deployment and its own chrome, so
// the link goes there rather than to a summary of it here: duplicating its copy would
// put two pages describing one center in competition for the same search result, which
// is the problem PROGRESS.md records for /staff-augmentation/.

export type Partnership = {
  status: string;
  title: string;
  body: string;
  href: string | null;
  external?: boolean;
};

export const PARTNERSHIPS: Partnership[] = [
  {
    status: "Partnership",
    title: "WOS-Hunter College AI & Digital Operations",
    body: "Hunter College supplies one of New York City’s strongest and most diverse technology pipelines. WOS recruits, trains, employs and manages the people, and delivers them as a scalable team against your own KPIs.",
    href: "/wos-hunter-college-partnership",
  },
  {
    status: "WOS Center",
    title: "Center for Strategic Learning and Leadership for the Digital Age",
    // The Teachers College credit is deliberate and is the one place on this site that
    // carries it. See CLAUDE.md, Brand: WOS itself is not co-branded, but this Center is,
    // and naming it without its partner would misname it.
    body: "Executive programs and topic certificates preparing experienced leaders to navigate and drive digital transformation. A WOS center, in partnership with Teachers College, Columbia University.",
    // https, not the http the URL was given as: that 308-redirects, and shipping the
    // redirect costs every visitor a round trip.
    href: "https://new-center-pi.vercel.app/",
    external: true,
  },
  {
    status: "Proposed",
    title: "Center for Imagination, Reflective Development, and AI Futures",
    body: "A proposed research laboratory studying how people develop imagination, ethical foresight and innovation in the age of AI, grounded in Dr. Arthur Langer’s Fantasy Arc framework.",
    href: "/center-for-imagination",
  },
];
