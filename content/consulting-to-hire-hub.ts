// The three cards on /consulting-to-hire-services/.
//
// That page is the Overview of a four-item nav group and carried 46 words and three
// stock photographs, which told a reader nothing about the three real pages beside it.
// The grid is those three siblings, so the Overview does the job its position implies.
//
// Descriptions are the opening sentence of each target page, the same rule MSC_CARDS
// follows. Nothing here is written: every string is already on the live site.
//
// The photographs are the three that were already on this page, kept with the alt text
// they already had rather than swapped for the targets' own heroes - two of the three
// targets have no hero of their own.

import type { HubCard } from "@/content/managed-service-centers-hub";

export const CONSULTING_CARDS: HubCard[] = [
  {
    href: "/managed-service-centers/",
    title: "Managed Service Centers",
    description:
      "Our Managed Service Center provides a comprehensive solution designed to optimize your business and drive growth.",
    image: "/images/20160527_21_cropped-scaled-1-1.jpg",
    imageAlt:
      "WOS consultants at work along a row of desktop workstations in a training lab.",
  },
  {
    href: "/facilities-management/",
    title: "Facilities Management",
    description:
      "Keeping operations running takes skilled people who show up, solve problems, and work safely.",
    image: "/images/shared-image_blur_crop.jpg",
    imageAlt:
      "A WOS training session in progress, seen from outside the room through a glass wall.",
  },
  {
    href: "/on-site-remote-staffing/",
    title: "On-Site & Remote Staffing",
    description:
      "At WOS, we go beyond traditional hiring and placement programs by offering a risk-free, flexible staffing solution tailored to your business needs.",
    image: "/images/171206_4700_cropped-scaled-1-1.jpg",
    imageAlt:
      "Three panellists seated at a WOS event, one speaking into a microphone.",
  },
];
