// The WOS-Hunter College AI & Digital Operations Partnership.
//
// Not extracted from the mirror: this partnership post-dates the live site and the copy
// comes from the executive overview WOS supplied. Two departures from that document are
// deliberate and are the only ones:
//
//   1. Its opening sentence collapsed two clauses into "with WOS is a nationally
//      recognized charity (501 (3) C) that has a unique managed workforce model". It is
//      rebuilt here, with the legal status written the way lib/brand.ts writes it.
//   2. The title uses a plain hyphen. The source uses an en dash.
//
// Everything else is the client's own wording.

import type { PageContent } from "@/lib/content";

const page: PageContent = {
  route: "/wos-hunter-college-partnership",
  title: "WOS-Hunter College AI & Digital Operations Partnership",
  eyebrow: "Partnership",
  description:
    "A partnership between Workforce Opportunity Services and Hunter College building New York City's next-generation technology workforce through managed AI and digital operations teams.",
  hero: null,
  lead: [
    {
      kind: "para",
      text: "The Workforce Opportunity Services (WOS)-Hunter College AI & Digital Operations Partnership creates a new model for developing and delivering enterprise technology talent. By combining Hunter College’s exceptional pipeline of students and graduates with the unique managed workforce model of WOS, a nationally recognized 501(c)(3) nonprofit, organizations gain access to scalable, professionally managed teams that support digital transformation while building a sustainable local workforce for hire.",
    },
    {
      kind: "para",
      text: "Unlike traditional staffing firms, outsourcing providers, or internship programs, the partnership offers a continuum of engagement options, from internships and co-op experiences to fully managed AI and technology service teams, allowing organizations to select the model that best aligns with their workforce strategy.",
    },
  ],
  sections: [
    {
      heading: "A partnership designed for enterprise performance",
      blocks: [
        {
          kind: "para",
          text: "Hunter College provides one of New York City’s strongest and most diverse pipelines of emerging talent across computer science, artificial intelligence, cybersecurity, data analytics, software engineering, business, and related disciplines.",
        },
        {
          kind: "para",
          text: "WOS recruits, assesses, trains, employs, mentors, and manages participants through senior staff who oversee delivery using client-defined Key Performance Indicators (KPIs), governance processes, and service-level expectations. Corporate partners define the work, establish performance objectives, and determine whether to convert a participant into permanent employment.",
        },
      ],
    },
    {
      heading: "The New York City Managed AI & Digital Operations Center",
      blocks: [
        {
          kind: "para",
          text: "Through its New York City Managed AI & Digital Operations Center, WOS provides organizations with scalable teams supporting:",
        },
        {
          kind: "list",
          items: [
            "Artificial Intelligence development, testing, Prompt Engineering, RAG, and AI Operations (AIOps)",
            "Software engineering and application development",
            "Level 1-3 Enterprise Service Desk and advanced IT support",
            "Cybersecurity operations and Security Operations Center (SOC) support",
            "Cloud operations, infrastructure, and enterprise application support",
            "Data engineering, analytics, and digital operations",
            "Shared services, customer support, business process operations, and facilities management support",
          ],
        },
        {
          kind: "para",
          text: "The model is adaptable across industries including financial services, healthcare, insurance, higher education, government, manufacturing, utilities, media, nonprofit organizations, and professional services.",
        },
      ],
    },
    {
      heading: "Why organizations partner with WOS and Hunter College",
      blocks: [
        {
          kind: "list",
          items: [
            "Senior WOS professionals manage day-to-day performance, mentoring, and delivery.",
            "Reduced recruiting, onboarding, and management costs.",
            "Faster deployment of AI, cybersecurity, software development, and IT support capabilities.",
            "Flexible workforce model with no hiring obligation and conversion to permanent employment.",
            "Approximately 92% of WOS revenue is reinvested in participant wages, tuition assistance, and workforce development, while participants receive affordable healthcare benefits that contribute to workforce stability and retention.",
            "WOS also provides services for trade industry skills and non-technology services.",
          ],
        },
      ],
    },
  ],
};

export default page;
