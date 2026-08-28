// People, from /team/, /board-of-directors/ and /academic-advisory-board/.
//
// Names, roles, and photographs only. There are no links to individual profiles here
// and that is deliberate: 19 of the 29 person cards on the live site point at top-level
// duplicate slugs while the sitemap treats the nested paths as canonical, and which set
// is canonical is open decision 4. Person pages are phase 7 and stay blocked on it.
//
// The live /team/ page also carries one photograph with no caption and no name in the
// markup. It is not here, because there is nothing to label it with.

export type Person = { name: string; role: string; photo?: string };

export const TEAM: Person[] = [
  {
    name: "Julie L. Brickell, Esquire",
    role: "General Counsel for Artificial Intelligence",
    photo: "/images/Julie-Brickell_cropped.png"
  },
  {
    name: "Jose Cabrera",
    role: "Associate Director of Talent Acquisition",
    photo: "/images/Jose-Cabrera-1-1.jpg"
  },
  {
    name: "Andrew Champion",
    role: "IT Manager",
    photo: "/images/Andrew-Champion_cropped.jpg"
  },
  {
    name: "Philip Curry",
    role: "Chief Financial & Administrative Officer",
    photo: "/images/Philip-Curry-1-1.jpg"
  },
  {
    name: "Danilo Gutierrez",
    role: "Senior Director of Client Services & Operations",
    photo: "/images/Danilo-Gutierrez_cropped.png"
  },
  {
    name: "Dr. Bruce Hedin",
    role: "Principal Scientist",
    photo: "/images/Dr.-Bruce-Hedin2_cropped.png"
  },
  {
    name: "Harriet Hope",
    role: "VP Human Resources & Office Operations",
    photo: "/images/Harriet-Hope-scaled-1-1.jpg"
  },
  {
    name: "Sandy Kelton",
    role: "Service Desk Manager",
    photo: "/images/SK.png"
  },
  {
    name: "Wendy LaPlaca",
    role: "Senior Client Service Manager",
    photo: "/images/Wendy-crop-new.jpg"
  },
  {
    name: "Dr. Arthur M. Langer",
    role: "Chairman and Founder, Workforce Opportunity Services",
    photo: "/images/Art-Langer-1_bw-1.jpg"
  },
  {
    name: "Mayela Montano",
    role: "HR Generalist | Office Manager",
    photo: "/images/MM.png"
  },
  {
    name: "Steve Petruk",
    role: "Managed Services Strategy, Sales, & Marketing",
    photo: "/images/Steve-Petruk_cropped.png"
  },
  {
    name: "Patrick Spurgeon",
    role: "Client Service Manager | Talent Acquisition, Systems Administrator",
    photo: "/images/Patrick-Spurgeon-1.jpg"
  },
  {
    name: "James Wolf",
    role: "Principal Architect",
    photo: "/images/James-Wolf_crop.png"
  },
  {
    name: "Ming Wu",
    role: "Bookkeeper",
    photo: "/images/Ming-Wu-1.jpg"
  }
];

export const BOARD_OF_DIRECTORS: Person[] = [
  {
    name: "Chair: Camille J. Bryant",
    role: "Chief Human Resource Officer at Walker-Miller Energy Services",
    photo: "/images/Camille-Bryant-BW_crop.jpg"
  },
  {
    name: "Robert E. Farina",
    role: "Chief Executive Officer at Magna5",
    photo: "/images/Robert-Farina.jpg"
  },
  {
    name: "Michael Garrett",
    role: "Columbia Univ., Dir. Law School Association & Exec. Mentor, Business",
    photo: "/images/Michael-Garrett.jpg"
  },
  {
    name: "Cindy R. Jebb, Ph.D.",
    role: "President of Ramapo College of New Jersey",
    photo: "/images/Cindy-Jebb_cropped.png"
  },
  {
    name: "Bob King",
    role: "Consultant, Connecticut Assoc. Board of Education",
    photo: "/images/Bob-King.png"
  },
  {
    name: "Dr. Arthur M. Langer",
    role: "Chairman and Founder, Workforce Opportunity Services",
    photo: "/images/Art-Langer-1_bw-1.jpg"
  },
  {
    name: "Warren Kudman",
    role: "Senior Vice President and Chief Information Officer at Turner Construction Company",
    photo: "/images/Warren-Kudman.jpg"
  },
  {
    name: "Craig Cuyar",
    role: "Senior Vice President and Cheif Information Officer for Omnicom Group",
    photo: "/images/Craig-Cuyar-new1.png"
  },
  {
    name: "Stuart Kippelman",
    role: "Chief Information Officer",
    photo: "/images/Stuart_Kippelman-2.jpg"
  }
];

export const ACADEMIC_ADVISORY_BOARD: Person[] = [
  {
    name: "Peter Cappelli",
    role: "George W. Taylor Professor of Management, The Wharton School",
    photo: "/images/Peter-Cappelli.jpg"
  },
  {
    name: "Alan Mandell",
    role: "SUNY Distinguished Service Professor and College Professor of Adult Learning and Mentoring, SUNY Empire State College",
    photo: "/images/Alan-Mandell_bw.jpg"
  },
  {
    name: "Charles Snow",
    role: "Mellon Foundation Professor of Business Administration, Smeal College of Business at Penn State University",
    photo: "/images/Charles-Snow_cropped-new.jpg"
  },
  {
    name: "David Thomas",
    role: "President, Morehouse College",
    photo: "/images/David-Thomas-BW.jpg"
  }
];
