// Videos from the WOS YouTube channel, for /alternate-home.
//
// Titles are the channel's own. Each summary is taken from the video's description on
// YouTube, cut to its first sentence or two, so the page says what WOS says about the
// video rather than something written for it. All four were checked as embeddable.

export const CHANNEL_URL = "https://www.youtube.com/@WorkforceOpportunityServices";

export type Video = {
  id: string;
  title: string;
  summary: string;
  /** Running time, as m:ss. Shown on the poster so a visitor knows the ask. */
  duration: string;
};

export const OVERVIEW: Video = {
  id: "-qd6zEl1k9w",
  title: "WOS Overview",
  summary:
    "Workforce Opportunity Services (WOS) is a 501(c)(3) nonprofit that recruits, trains, and places talent from underserved communities with leading organizations.",
  duration: "2:46",
};

export const PARTNER_STORIES: Video[] = [
  {
    id: "J2uCdv0RIZI",
    title: "WOS-Prudential Partnership",
    summary:
      "WOS and Prudential Financial have partnered since 2005 to provide job training and opportunities for underserved, local populations. In 2010 the program expanded to include post-9/11 veterans and military spouses.",
    duration: "2:36",
  },
  {
    id: "HVHBTP18Dzk",
    title: "WOS/PSEG Graduation",
    summary:
      "WOS filled a total of 43 roles at PSEG's Newark, NJ, and Bethpage, NY locations, preparing candidates for full-time positions in software development, IT support, and network and database administration.",
    duration: "4:08",
  },
  {
    id: "I2BRGar9kPI",
    title: "WOS and Alight Solutions Veteran Partnership",
    summary:
      "In 2018, WOS partnered with Alight Solutions, spearheading the recruitment, training and onboarding of information security and project management talent.",
    duration: "2:37",
  },
];

export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
