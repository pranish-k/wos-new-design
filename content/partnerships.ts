// The partnerships and centers shown on the homepage, in What's new: they lead its list
// beside the Institute (HOME_FEATURE in content/ai-institute.ts), ahead of the newest posts.
//
// They are not equals and the page must not present them as equals: Hunter is a live
// partnership with a page behind it, and the Center for Strategic Learning is an existing
// WOS center with its own deployment. `status` carries that difference. It heads each
// item, so the distinction is stated rather than inferred from the copy.
//
// `href: null` means the item is named but not linked. A card that links nowhere is
// honest; a card that links to a page which does not exist is not.
//
// `external` leaves this site. The Center has its own deployment and its own chrome, so
// the link goes there rather than to a summary of it here: duplicating its copy would
// put two pages describing one center in competition for the same search result, which
// is the problem PROGRESS.md records for /staff-augmentation/.
//
// They had a photograph each when they were panels of their own. The list carries none:
// the Hunter mark sat on its own purple, the one colour on the page outside the palette.

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
];
