// Brand constants.
//
// Every brand name string lives here so a rename is a one-file change, and so no page
// hardcodes a variant spelling. The strings below are taken from the live site
// (wforce-mirror), not invented.
//
// This is the main WOS site. It is NOT co-branded. The reference design system this
// site borrows from belongs to a WOS sub-brand center in partnership with Teachers
// College, Columbia University, and that partnership is credited in that site's chrome.
// It must not appear here.

export const ORG = "Workforce Opportunity Services";
export const ORG_SHORT = "WOS";

/** Homepage hero line, verbatim from the live site. */
export const TAGLINE = "We find, develop, and convert talent from local communities.";

/** Live meta description. Also the fallback for pages that do not set their own. */
export const DESCRIPTION =
  "Workforce Opportunity Services (WOS) is a leading 501(c)(3) nonprofit dedicated to providing and developing talent from local communities.";

export const LEGAL_STATUS = "WOS is a tax-exempt 501(c)(3) nonprofit organization.";

export const HQ = {
  name: "WOS Headquarters",
  street: "475 Riverside Drive",
  unit: "Suite 1350",
  city: "New York, NY 10115",
  phone: "+1 (212) 870-2260",
  // tel: href needs the digits only.
  phoneHref: "tel:+12128702260",
} as const;

// Careers runs on iCIMS, not on this site. Both links leave the domain, so every call
// site needs rel="noopener" and an external affordance.
export const CAREERS_URL = "https://careers-wforce.icims.com/jobs/";
export const TALENT_COMMUNITY_URL =
  "https://c-13520-20250626-talent-wforce-org.i.icims.com/join/talentcommunity/form";

export const SOCIAL = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/workforce-opportunity-services/" },
  { name: "Facebook", href: "https://www.facebook.com/wforceorg" },
  { name: "X", href: "https://x.com/@wforceorg" },
  { name: "Instagram", href: "https://www.instagram.com/wforceorg/" },
  { name: "YouTube", href: "https://www.youtube.com/@workforceopportunityservic7284" },
] as const;
