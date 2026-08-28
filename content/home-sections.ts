// Homepage imagery, from the live page.
//
// The six service photographs and the three Our Impact figures. The live cards put the
// label in red on slate, which is 2.8:1 and fails AA; the label is white here for that
// reason. Red is kept for the large numerals, which clear the large-text threshold.
// See DESIGN.md §2.

export type ServiceCard = {
  href: string;
  label: string;
  image: string;
  imageAlt: string;
};

export const CONSULTING_TO_HIRE: ServiceCard[] = [
  {
    href: "/managed-service-centers",
    label: "Managed Service Center",
    image: "/images/managed-service-center.webp",
    imageAlt: "Support agents working at desks wearing headsets",
  },
  {
    href: "/facilities-management",
    label: "Facilities Management",
    image: "/images/managed-services-2.webp",
    imageAlt: "An open plan office with workstations and meeting space",
  },
  {
    href: "/on-site-remote-staffing",
    label: "On-Site & Remote Staffing",
    image: "/images/hiring.webp",
    imageAlt: "Three colleagues talking across a meeting table",
  },
];

export const OTHER_SERVICES: ServiceCard[] = [
  {
    href: "/educational-services",
    label: "Educational Services",
    image: "/images/educational.webp",
    imageAlt: "An instructor working through material with a small group",
  },
  {
    href: "/advisory-services",
    label: "Advisory Services",
    image: "/images/talent-acquisition-1.webp",
    imageAlt: "Two people in conversation across a desk during an interview",
  },
  {
    href: "/langer-arc",
    label: "Research",
    image: "/images/research-2.webp",
    imageAlt: "A researcher reviewing printed findings at a desk",
  },
];

/**
 * The three Our Impact figures, counted up from zero as on the live page.
 *
 * The live version sets each one in a bordered white card behind a piece of clip art.
 * The icons are dropped: at this size the number is the content, and an illustration
 * above it adds a third object to look at without adding meaning.
 */
export const IMPACT = [
  { value: "65+", label: "Corporate partners" },
  { value: "4", label: "Locations", note: "U.S, France, Costa Rica & The Netherlands" },
  { value: "8,000+", label: "Careers impacted" },
];
