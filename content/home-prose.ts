// The homepage prose, verbatim from the live page.
//
// Kept as data rather than as JSX so it stays word-for-word what the site says today.
// The rebuild changes the front end, not the copy.

export type HomeSection = { heading: string; body: string[] };

export const HOME_PROSE: HomeSection[] = [
  {
    heading: "The WOS Business Solution",
    body: [
      "Workforce Opportunity Services (WOS) addresses a major challenge faced by companies: how to balance the use of outside consultants and the hiring of more full-time staff. The decision typically comes down to a question of culture , cost , control , and continuity. WOS provides a unique consultant-to-employee transition process that ensures smooth knowledge transfer and cultural integration."
    ]
  },
  {
    heading: "Our Unique Method and Solution",
    body: [
      "WOS provides organizations with multiple types of consultancy services that can be used as a pipeline of new employees. Upon conversion to employment, our consultants already know your business and culture. Thus, WOS provides a bridge between consultancy services and a seamless pipeline of future talented employees developed specifically to fill open staff positions. WOS finds talent from many sources and experience levels typically from local communities, college graduates, and military veterans. We help our employees in special ways that include professional development and technical training , paid part-time college tuition , and special financial assistance where needed to help them succeed at work."
    ]
  },
  {
    heading: "Our History",
    body: [
      "WOS was established in 2005 as a social entrepreneurial charity (501 c 3). The company has served over 8,000 people in over 60 locations across the US and has operated in Costa Rica, France, and the Netherlands. We have over 85 clients including Parsons, J&J, GE, HP, Automobile Club, Prudential, Blue Cross, PSE&G, Eversource, Eaton Corp, BNY Mellon, Tel-Mex, United Rentals, American Airlines, and JetBlue."
    ]
  },
  {
    heading: "Our Services",
    body: [
      "WOS has many different consultancy options including Managed Services , Call Centers , Onsite and Remote Staffing , and Facilities Management . We operate across many industries and roles from information and AI technology , Shared Services , Product Support , and vocational trades . WOS also offers special advisory and training services for your professional HR and talent acquisition staff on finding and retaining talent based on our proven research instruments and methods."
    ]
  }
];
