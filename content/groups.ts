// The people groups, as configuration.
//
// A group is a landing page plus the URL parent of its members' pages. Adding a sixth
// board is one entry here and a `groups` tag on the records, with no new route file.

import type { Group } from "@/lib/people/types";

export const GROUPS: Group[] = [
  {
    id: "team",
    path: "team",
    title: "Management Team",
    eyebrow: "About",
    description: "The people who run Workforce Opportunity Services.",
    intro: [],
    order: 1,
  },
  {
    id: "board-of-directors",
    path: "board-of-directors",
    title: "Board of Directors",
    eyebrow: "About",
    description: "The Workforce Opportunity Services board of directors.",
    intro: [],
    order: 2,
  },
  {
    id: "academic-advisory-board",
    path: "academic-advisory-board",
    title: "Academic Advisory Board",
    eyebrow: "About",
    description: "The Workforce Opportunity Services academic advisory board.",
    intro: [],
    order: 3,
  },
  {
    id: "industry-advisory-board",
    path: "industry-advisory-board",
    title: "Industry Advisory Board",
    eyebrow: "About",
    description:
      "Current partners and executive business leaders advising WOS on strategic planning, oversight, and fundraising.",
    intro: [
      {
        kind: "para",
        text: "The Workforce Opportunity Services (WOS) Advisory Board’s mission is to provide expertise on strategic planning, oversight, and fundraising. The Board is made up of current partners and executive business leaders with responsibilities associated with their professional skills, experience, and passion.",
      },
      {
        kind: "para",
        text: "The WOS Advisory Board is actively involved in all aspects of WOS’s strategic plan. It provides insight, recommendations, and guidance to further advance the WOS mission to recruit, educate, train and provide career opportunities from local communities and to place them as WOS employed consultants with partner companies, thereby providing access to good jobs and career pathways for full-time, long-term employment.",
      },
      { kind: "para", text: "The Advisory Board has 4 primary responsibilities:" },
      {
        kind: "list",
        items: [
          "Program Creation and Planning",
          "Public Relations and Outreach Strategies",
          "Product Marketing Support",
          "Funding Leadership",
        ],
      },
    ],
    order: 4,
  },
  {
    id: "hr-advisory-board",
    path: "hr-advisory-board",
    title: "HR Advisory Board",
    eyebrow: "About",
    description: "The Workforce Opportunity Services HR advisory board.",
    // The live site has four member pages under /hr-advisory-board/ and no landing page
    // at all, so there is no published copy to carry over. Left empty rather than
    // written here: a mission statement for a real board has to come from WOS.
    intro: [],
    order: 5,
  },
];
