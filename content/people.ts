// People, from /team/, /board-of-directors/ and /academic-advisory-board/.
//
// Links go to the nested paths, which is what the sitemap treats as canonical. The live
// index cards point at top-level duplicates instead; those 19 slugs redirect here from
// next.config.ts. That fixes the redirect direction in open decision 4 and is recorded
// in PROGRESS.md.
//
// The live /team/ page also carries one photograph with no caption and no name in the
// markup. It is not here, because there is nothing to label it with.
//
// `href` points at the nested canonical path. A few people on these index pages have no
// individual page on the live site at all, and those keep href: null and render as a
// card rather than a link.

export type Person = {
  name: string;
  role: string;
  photo?: string;
  /** Canonical person page, or null when the live site has no page for them. */
  href: string | null;
};

export const TEAM: Person[] = [
  {
    name: "Julie L. Brickell, Esquire",
    role: "General Counsel for Artificial Intelligence",
    photo: "/images/Julie-Brickell_cropped.png",
    href: "/team/julie-l-brickell"
  },
  {
    name: "Jose Cabrera",
    role: "Associate Director of Talent Acquisition",
    photo: "/images/Jose-Cabrera-1-1.jpg",
    href: "/team/jose-cabrera"
  },
  {
    name: "Andrew Champion",
    role: "IT Manager",
    photo: "/images/Andrew-Champion_cropped.jpg",
    href: "/team/andrew-champion"
  },
  {
    name: "Philip Curry",
    role: "Chief Financial & Administrative Officer",
    photo: "/images/Philip-Curry-1-1.jpg",
    href: "/team/philip-curry-2"
  },
  {
    name: "Danilo Gutierrez",
    role: "Senior Director of Client Services & Operations",
    photo: "/images/Danilo-Gutierrez_cropped.png",
    href: "/team/danilo-gutierrez-2"
  },
  {
    name: "Dr. Bruce Hedin",
    role: "Principal Scientist",
    photo: "/images/Dr.-Bruce-Hedin2_cropped.png",
    href: "/team/dr-bruce-hedin"
  },
  {
    name: "Harriet Hope",
    role: "VP Human Resources & Office Operations",
    photo: "/images/Harriet-Hope-scaled-1-1.jpg",
    href: null
  },
  {
    name: "Sandy Kelton",
    role: "Service Desk Manager",
    photo: "/images/SK.png",
    href: "/team/sandy-kelton"
  },
  {
    name: "Wendy LaPlaca",
    role: "Senior Client Service Manager",
    photo: "/images/Wendy-crop-new.jpg",
    href: "/team/wendy-laplaca"
  },
  {
    name: "Dr. Arthur M. Langer",
    role: "Chairman and Founder, Workforce Opportunity Services",
    photo: "/images/Art-Langer-1_bw-1.jpg",
    href: null
  },
  {
    name: "Mayela Montano",
    role: "HR Generalist | Office Manager",
    photo: "/images/MM.png",
    href: "/team/mayela-montano"
  },
  {
    name: "Steve Petruk",
    role: "Managed Services Strategy, Sales, & Marketing",
    photo: "/images/Steve-Petruk_cropped.png",
    href: "/team/steve-petruk"
  },
  {
    name: "Patrick Spurgeon",
    role: "Client Service Manager | Talent Acquisition, Systems Administrator",
    photo: "/images/Patrick-Spurgeon-1.jpg",
    href: "/team/patrick-spurgeon-2"
  },
  {
    name: "James Wolf",
    role: "Principal Architect",
    photo: "/images/James-Wolf_crop.png",
    href: "/team/james-wolf-2"
  },
  {
    name: "Ming Wu",
    role: "Bookkeeper",
    photo: "/images/Ming-Wu-1.jpg",
    href: "/team/ming-wu-2"
  }
];

export const BOARD_OF_DIRECTORS: Person[] = [
  {
    name: "Chair: Camille J. Bryant",
    role: "Chief Human Resource Officer at Walker-Miller Energy Services",
    photo: "/images/Camille-Bryant-BW_crop.jpg",
    href: "/board-of-directors/camille-j-bryant"
  },
  {
    name: "Robert E. Farina",
    role: "Chief Executive Officer at Magna5",
    photo: "/images/Robert-Farina.jpg",
    href: "/board-of-directors/robert-e-farina"
  },
  {
    name: "Michael Garrett",
    role: "Columbia Univ., Dir. Law School Association & Exec. Mentor, Business",
    photo: "/images/Michael-Garrett.jpg",
    href: "/board-of-directors/michael-garrett-2"
  },
  {
    name: "Cindy R. Jebb, Ph.D.",
    role: "President of Ramapo College of New Jersey",
    photo: "/images/Cindy-Jebb_cropped.png",
    href: "/board-of-directors/cindy-r-jebb"
  },
  {
    name: "Bob King",
    role: "Consultant, Connecticut Assoc. Board of Education",
    photo: "/images/Bob-King.png",
    href: "/board-of-directors/bob-king-2"
  },
  {
    name: "Dr. Arthur M. Langer",
    role: "Chairman and Founder, Workforce Opportunity Services",
    photo: "/images/Art-Langer-1_bw-1.jpg",
    href: "/board-of-directors/arthur-m-langer"
  },
  {
    name: "Warren Kudman",
    role: "Senior Vice President and Chief Information Officer at Turner Construction Company",
    photo: "/images/Warren-Kudman.jpg",
    href: "/board-of-directors/warren-kudman"
  },
  {
    name: "Craig Cuyar",
    role: "Senior Vice President and Cheif Information Officer for Omnicom Group",
    photo: "/images/Craig-Cuyar-new1.png",
    href: "/board-of-directors/craig-cuyar"
  },
  {
    name: "Stuart Kippelman",
    role: "Chief Information Officer",
    photo: "/images/Stuart_Kippelman-2.jpg",
    href: "/board-of-directors/stuart-kippelman"
  }
];

export const ACADEMIC_ADVISORY_BOARD: Person[] = [
  {
    name: "Peter Cappelli",
    role: "George W. Taylor Professor of Management, The Wharton School",
    photo: "/images/Peter-Cappelli.jpg",
    href: "/academic-advisory-board/peter-cappelli-2"
  },
  {
    name: "Alan Mandell",
    role: "SUNY Distinguished Service Professor and College Professor of Adult Learning and Mentoring, SUNY Empire State College",
    photo: "/images/Alan-Mandell_bw.jpg",
    href: "/academic-advisory-board/alan-mandell"
  },
  {
    name: "Charles Snow",
    role: "Mellon Foundation Professor of Business Administration, Smeal College of Business at Penn State University",
    photo: "/images/Charles-Snow_cropped-new.jpg",
    href: "/academic-advisory-board/charles-snow"
  },
  {
    name: "David Thomas",
    role: "President, Morehouse College",
    photo: "/images/David-Thomas-BW.jpg",
    href: "/academic-advisory-board/david-thomas"
  }
];
