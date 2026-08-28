// Academic partner logos, from /academic-partners/ on the live site.
//
// Same problem as the corporate wall: the live markup carries no alt text, so names are
// recovered from the filenames. 13 more logos on that page are named Picture3.png
// through Picture38.png with nothing on the page identifying the institution, so they
// are not here. See PROGRESS.md.

import type { Partner } from "@/content/partners";

export const ACADEMIC_PARTNERS: Partner[] = [
  {
    name: "Alfa-college",
    src: "/images/Alfa-college.jpg"
  },
  {
    name: "App Academy",
    src: "/images/App-Academy.svg"
  },
  {
    name: "Coding Dojo",
    src: "/images/coding_dojo_blue.svg"
  },
  {
    name: "Community College of Vermont",
    src: "/images/CCV_logo.png"
  },
  {
    name: "EC-Council",
    src: "/images/EC-Council-logo.webp"
  },
  {
    name: "El Paso Community College",
    src: "/images/El-Paso-CC.jpg"
  },
  {
    name: "Florida State College at Jacksonville",
    src: "/images/fscj-logo-stacked-color.png"
  },
  {
    name: "General Assembly",
    src: "/images/RGB-Red-Black_Small_GeneralAssembly-Stacked.png"
  },
  {
    name: "Louisiana State University",
    src: "/images/LSUGeauxPurp_sm2.png"
  },
  {
    name: "Northeastern University",
    src: "/images/Northeastern.png"
  },
  {
    name: "University of Akron",
    src: "/images/192px-University_of_Akron_logo.svg.png"
  },
  {
    name: "University of Groningen",
    src: "/images/University-of-Groningen.png"
  },
  {
    name: "University of Michigan-Dearborn",
    src: "/images/UMDearborn_vertical.png"
  }
];
