// The six cards on /managed-service-centers/.
//
// This grid is the only route to all six of these pages: none is in the header, and
// nothing else links to them. Emptying it strands six live pages, so treat it as
// navigation rather than as page decoration.
//
// Descriptions are the opening sentence of each target page. The live cards carry a
// title and an image only, which gives a reader nothing to choose between them with.

export type HubCard = {
  href: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const MSC_CARDS: HubCard[] = [
  {
    href: "/itsupport",
    title: "Customer Service & IT Support Desk",
    description:
      "A right-sized service desk handling customer care and end user IT support across phone, email, chat, and self-service.",
    image: "/images/customer-service.png",
    imageAlt: "A support agent at a desk wearing a headset",
  },
  {
    href: "/cyber-security",
    title: "Cybersecurity Monitoring",
    description:
      "Continuous monitoring that reduces noise and speeds response.",
    image: "/images/cybersecurity-monitoring.webp",
    imageAlt: "An analyst reviewing security dashboards on screen",
  },
  {
    href: "/legacy-application-support",
    title: "Legacy Applications",
    description:
      "Sustain and evolve the systems you rely on while you plan the next step.",
    image: "/images/customized-solutions.png",
    imageAlt: "Developers working through code together at a workstation",
  },
  {
    href: "/data-analytics-and-ai",
    title: "Data Analytics & AI",
    description:
      "Teams hired, trained, and managed to deliver data and AI-enabled technologies and the workflows around them.",
    image: "/images/data-ai.webp",
    imageAlt: "A data dashboard showing charts and metrics",
  },
  {
    href: "/shared-services",
    title: "Shared Services",
    description:
      "Process support that clears the busywork without sacrificing accuracy.",
    image: "/images/scalable-services.png",
    imageAlt: "A shared services team working in an open office",
  },
  {
    href: "/college-co-ops-and-internships",
    title: "College CO-OP and Internship",
    description:
      "Co-op and internship placements for college students across our onsite and offsite service programs.",
    image: "/images/expert-teams.png",
    imageAlt: "Early-career team members collaborating at a table",
  },
];
