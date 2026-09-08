// The header navigation, as data.
//
// Verbatim from ../wforce-mirror/wforce-header-asis.txt, which is the verified record of
// the live nav. Labels and hrefs are copied from it exactly, trailing slashes included:
// the live site is inconsistent about them (/team and /financials have none, everything
// else does) and normalising here would silently change 30 URLs.
//
// The tree is data rather than nested JSX because the grouping under Services has been
// reorganised twice already and nested JSX would rot. It is two levels below the bar:
// open decision 5 was about Services being four deep including the bar, and flattening
// it away is what settled that. Every href below is still the live one.
//
// Order matters. The panel is a single column that renders these in source order, so
// this list is the menu's reading order rather than just its contents.

import { CAREERS_URL, TALENT_COMMUNITY_URL } from "@/lib/brand";

export type NavLink = {
  kind: "link";
  label: string;
  href: string;
  /** Leaves the domain. Call sites add rel="noopener" and an external affordance. */
  external?: boolean;
};

/**
 * A heading with children and no page of its own.
 *
 * The live markup gives these href="#", which reads to a screen reader as a link that
 * goes nowhere and traps a keyboard user on a dead target. We render them as headings.
 * Where a grouping does have a real page at the matching slug, it is linked as an
 * "Overview" child rather than by making the heading itself a link. Educational Services
 * and Advisory Services already worked that way; Consulting to Hire Services now does
 * too. The live menu links none of them, which is a gap we are closing rather than
 * copying.
 */
export type NavGroup = {
  kind: "group";
  label: string;
  children: NavNode[];
};

export type NavNode = NavLink | NavGroup;

export const NAV: NavNode[] = [
  {
    kind: "group",
    label: "About",
    children: [
      // Live order, and in a single-column panel the source order is the reading order,
      // so this is what puts Our Story and Management Team at the top of the menu.
      { kind: "link", label: "Our Story", href: "/our-story/" },
      { kind: "link", label: "Management Team", href: "/team" },
      {
        kind: "group",
        label: "Boards",
        children: [
          { kind: "link", label: "Board of Directors", href: "/board-of-directors/" },
          { kind: "link", label: "Academic Advisory Board", href: "/academic-advisory-board/" },
          { kind: "link", label: "Industry Advisory Board", href: "/industry-advisory-board/" },
          { kind: "link", label: "HR Advisory Board", href: "/hr-advisory-board/" },
        ],
      },
      {
        kind: "group",
        label: "Partners",
        children: [
          { kind: "link", label: "Corporate Partners", href: "/corporate-partners/" },
          { kind: "link", label: "Academic Partners", href: "/academic-partners/" },
          // Not on the live site. The partnership post-dates it, and this is the only
          // path to the page, so it is here and in app/sitemap.ts together.
          {
            kind: "link",
            label: "Hunter College Partnership",
            href: "/wos-hunter-college-partnership",
          },
        ],
      },
      { kind: "link", label: "Locations", href: "/locations/" },
      { kind: "link", label: "Financials", href: "/financials" },
      { kind: "link", label: "FAQs", href: "/faqs/" },
    ],
  },
  {
    kind: "group",
    label: "Services",
    children: [
      // The live menu wraps the last three of these in an "Other Services" grouping,
      // which put Educational and Advisory Services a level below Consulting to Hire
      // and made the two heading levels indistinguishable in the panel. Dropping the
      // wrapper makes all three peers. It is the only structural departure from the
      // live menu here, and it is what settled open decision 5.
      {
        kind: "group",
        label: "Consulting to Hire Services",
        children: [
          { kind: "link", label: "Overview", href: "/consulting-to-hire-services/" },
          { kind: "link", label: "Managed Service Center", href: "/managed-service-centers/" },
          { kind: "link", label: "Facilities Management", href: "/facilities-management/" },
          { kind: "link", label: "On-Site & Remote Staffing", href: "/on-site-remote-staffing/" },
        ],
      },
      {
        kind: "group",
        label: "Educational Services",
        children: [
          { kind: "link", label: "Overview", href: "/educational-services/" },
          {
            kind: "link",
            label: "Professional Development Fundamentals",
            href: "/professional-development-fundamentals",
          },
          { kind: "link", label: "Professional Development", href: "/professional-development/" },
        ],
      },
      {
        kind: "group",
        label: "Advisory Services",
        children: [
          { kind: "link", label: "Overview", href: "/advisory-services/" },
          { kind: "link", label: "AI Solutions", href: "/ai-services/" },
        ],
      },
      // Neither belongs under any of the three headings above. Note "Managed Services"
      // sits a column away from "Managed Service Center", which is a different page
      // with 0% shared copy.
      { kind: "link", label: "Managed Services", href: "/managedservices/" },
      // Research was a single link to /langer-arc/. It is a grouping now because there
      // are three of them, and because the Institute page was reachable only from the
      // footer, which is not a home for a research programme.
      {
        kind: "group",
        label: "Research",
        children: [
          { kind: "link", label: "Langer Workforce Maturity Arc", href: "/langer-arc/" },
          {
            kind: "link",
            label: "Institute of Workforce Policy & Practice",
            href: "/institute-of-workforce-policy-practice/",
          },
          { kind: "link", label: "Center for Imagination", href: "/center-for-imagination" },
        ],
      },
    ],
  },
  { kind: "link", label: "News & Events", href: "/blog/" },
  {
    kind: "group",
    label: "Join Us",
    children: [
      { kind: "link", label: "WOS Careers", href: CAREERS_URL, external: true },
      {
        kind: "link",
        label: "Join Our Talent Community",
        href: TALENT_COMMUNITY_URL,
        external: true,
      },
    ],
  },
];

/** Donate sits outside NAV: it is a right-aligned button, not a menu item. */
export const DONATE: NavLink = { kind: "link", label: "Donate", href: "/donate" };

/** Footer service column, from the FOOTER block of wforce-header-asis.txt. */
export const FOOTER_SERVICES: NavLink[] = [
  { kind: "link", label: "Managed Service Centers", href: "/managed-service-centers/" },
  { kind: "link", label: "Facilities Management", href: "/facilities-management/" },
  { kind: "link", label: "On-Site & Remote Staffing", href: "/on-site-remote-staffing/" },
  { kind: "link", label: "Educational Services", href: "/educational-services" },
  { kind: "link", label: "Advisory Services", href: "/advisory-services" },
  { kind: "link", label: "Research", href: "/langer-arc/" },
  { kind: "link", label: "News & Events", href: "/blog/" },
];

/**
 * The footer is the only surface for these three. Trimming it strands them, so they
 * cannot be removed without giving each a path elsewhere first.
 */
export const FOOTER_LEGAL: NavLink[] = [
  { kind: "link", label: "Privacy Policy", href: "/privacy-policy/" },
  {
    kind: "link",
    label: "Institute of Workforce Policy & Practice",
    href: "/institute-of-workforce-policy-practice/",
  },
];
