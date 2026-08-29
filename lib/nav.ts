// The header navigation, as data.
//
// Verbatim from ../wforce-mirror/wforce-header-asis.txt, which is the verified record of
// the live nav. Labels and hrefs are copied from it exactly, trailing slashes included:
// the live site is inconsistent about them (/team and /financials have none, everything
// else does) and normalising here would silently change 30 URLs.
//
// The tree is data rather than nested JSX because it is three levels deep and open
// decision 5 (menu depth) is unresolved, so it will change. Nested JSX would rot.

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
 * Two of the six ("Consulting to Hire Services", "Educational Services") do have a real
 * page at the matching slug, but the live menu does not link to it, so neither do we.
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
      {
        kind: "group",
        label: "Consulting to Hire Services",
        children: [
          { kind: "link", label: "Managed Service Center", href: "/managed-service-centers/" },
          { kind: "link", label: "Facilities Management", href: "/facilities-management/" },
          { kind: "link", label: "On-Site & Remote Staffing", href: "/on-site-remote-staffing/" },
        ],
      },
      {
        kind: "group",
        label: "Other Services",
        children: [
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
          { kind: "link", label: "Research", href: "/langer-arc/" },
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
