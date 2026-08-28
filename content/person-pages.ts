// Individual person pages, from the nested paths in the mirror.
//
// The sitemap treats these nested URLs as canonical and the index cards link to
// top-level duplicates; see PROGRESS.md. These are the canonical ones.

export type PersonPage = {
  slug: string;
  parent: string;
  name: string;
  photo: string | null;
  blocks: { kind: "heading" | "para"; text: string }[];
};

export const PERSON_PAGES: PersonPage[] = [
  {
    slug: "addie-m-rimmer",
    parent: "team",
    name: "Addie M. Rimmer",
    photo: "/images/Addie-Rimmer-Headshot.jpg",
    blocks: [
      {
        kind: "heading",
        text: "Dr. Addie M. Rimmer"
      },
      {
        kind: "para",
        text: "Director, Student Learning"
      },
      {
        kind: "para",
        text: "Dr. Addie M. Rimmer, Director of Student Learning, has designed and taught interpersonal skills courses for WOS since 2008. She previously served as a newspaper editor and journalism faculty member. She has a bachelor’s degree from The City College of New York, a master’s in journalism from Columbia University, and a doctorate in Adult Learning and Leadership from Teachers College, Columbia University."
      }
    ]
  },
  {
    slug: "amy-dolph",
    parent: "team",
    name: "Amy Dolph",
    photo: "/images/Amy-Dolph-1_cropped-1.png",
    blocks: [
      {
        kind: "para",
        text: "Educational Services Coordinator"
      },
      {
        kind: "para",
        text: "Amy Dolph has a stron background in nonprofit program coordination, educational services, and small business management. With a strong commitment to community engagement and a passion for creating impactful programming that supports underserved populations and veterans, impactful programming, she brings over a decade of experience supporting initiatives that serve and uplift others. In her current role as Educational Services Coordinator with Workforce Opportunity Services (WOS), she assists in the delivery of virtual training programs, coordinates outreach, and has managed participant progress for over 700 learners, and develops user-friendly course content using the Canvas LMS. Her facilitation of cultural exploration sessions has reached more than 1,200 participants, reflecting her ability to plan and execute meaningful, accessible programming."
      }
    ]
  },
  {
    slug: "andrew-champion",
    parent: "team",
    name: "Andrew Champion",
    photo: "/images/Andrew-Champion_cropped.jpg",
    blocks: [
      {
        kind: "para",
        text: "IT Manager"
      },
      {
        kind: "para",
        text: "Andrew Champion joined WOS in May 2023 as the Systems Administrator, where he oversees the organization’s network and cloud infrastructure, information systems, and cybersecurity posture. In this role, Andrew is responsible for maintaining secure and efficient data environments, developing technology solutions aligned with organizational needs, and managing key software and vendor relationships. He also plays a vital role in ensuring seamless and secure communication between WOS and its enterprise clients across the globe. Based in Dallas, Texas, Andrew brings over 20 years of IT and leadership experience, including 16 years of joint service in the United States Marine Corps and United States Army. His civilian career includes time at Amazon as an Operations Manager, further honing his expertise in large-scale systems and operational efficiency. Andrew holds a Bachelor of Science degree from the University of North Texas and several industry-recognized certifications, including ITIL, reflecting his commitment to excellence and continued professional growth."
      }
    ]
  },
  {
    slug: "andrew-gold-2",
    parent: "team",
    name: "Andrew Gold",
    photo: "/images/Andrew-Gold-scaled-1-1.jpg",
    blocks: [
      {
        kind: "para",
        text: "Payroll Manager"
      },
      {
        kind: "para",
        text: "Andrew Gold joined WOS in September 2012. He works on all aspects of finance and human resources, including special projects. Before joining WOS, Andrew spent many years as a corporate tax accountant for Mercer Consulting Group, a subsidiary of Marsh & McLennan Insurance Company. He graduated from Rider University with a bachelor’s degree in marketing and a minor in accounting. He also has a master’s degree in education."
      }
    ]
  },
  {
    slug: "danilo-gutierrez-2",
    parent: "team",
    name: "Danilo Gutierrez",
    photo: "/images/Danilo-Gutierrez_cropped.png",
    blocks: [
      {
        kind: "para",
        text: "Senior Director of Client Services & Operations"
      },
      {
        kind: "para",
        text: "Danilo Gutierrez Halder joined Workforce Opportunity Services (WOS) in February 2022 and currently serves as Senior Director of Client Services & Operations. In this role, he leads service delivery programs across technical support centers and global delivery teams. He also drives the organization’s strategic recruitment, staffing, and professional development initiatives, aligning high-potential talent with the evolving needs of enterprise clients, and works towards advancing WOS’s mission to create sustainable career pathways for veterans and underserved communities. Based in Naples, Florida, Danilo brings over 25 years of experience in Operations, Client Services, and Technology-Enabled Service Delivery, supporting Fortune 500 companies across North and Latin America. His background includes designing and leading global service organizations, building scalable support ecosystems supporting more than 60,000 users worldwide, and managing infrastructure and service operations across Latin America. He has successfully directed multi-region service desk operations, integrating international teams to deliver consistent, high-quality user experience with a strategic focus on performance, resilience, and business continuity. Under his leadership, organizations have achieved measurable improvements in SLA compliance, user satisfaction, and workforce efficiency, while reducing cost, operational redundancies, and accelerating time-to-productivity across support teams. He received his education in Business Management from Universidad Latina in Costa Rica and is fluent in English, Spanish, and Portuguese. Danilo also holds multiple industry-recognized certifications, including ITIL, ITIL SOA (Service Offerings and Agreements), COBIT5, and Salesforce Administration, among others."
      }
    ]
  },
  {
    slug: "dr-bruce-hedin",
    parent: "team",
    name: "Dr. Bruce Hedin",
    photo: "/images/Dr.-Bruce-Hedin2_cropped.png",
    blocks: [
      {
        kind: "para",
        text: "Principal Scientist"
      },
      {
        kind: "para",
        text: "Dr. Hedin, a leading expert in the assessment of the effectiveness of advanced search and analytics technologies, brings expertise in gathering the evidence that allows an assessment of the trustworthiness of a technology. In his consulting practice, he supports clients in the design and oversight of sampling and measurement protocols to validate the results of AI-enabled review technologies; he also provides guidance to clients seeking the most efficient, and scientifically sound, methods to demonstrate the trustworthiness of the technologies they have adopted. Dr. Hedin has contributed to several initiatives in keeping with his expertise, including a model ESI protocol, manifestos on the rule of law in the age of artificial intelligence, the IEEE’s Ethically Aligned Design, and US NIST’s Text Retrieval Conference (TREC) Legal Track."
      }
    ]
  },
  {
    slug: "james-wolf-2",
    parent: "team",
    name: "James Wolf",
    photo: "/images/James-Wolf_crop.png",
    blocks: [
      {
        kind: "para",
        text: "Principal Architect"
      },
      {
        kind: "para",
        text: "Mr. Wolf brings over 30 years of experience in leading software engineering, product management, Information Technology, Information Security, Technology Architecture, Quality Assurance and Project Management to the Advisory Services leadership team. Mr. Wolf is a creative innovator, and passionate problem solver. He is an early pioneer in analytics and BI space, being named as the inventor of 10 patents related to Oracle Discoverer, on which Mr. Wolf was the Principal Engineer. Mr. Wolf is an expert in eDiscovery having led the creation of H5’s Information Retrieval and AI platforms, then led the enterprise architecture of H5’s eDiscovery Services. Mr. Wolf advises clients on the architecture, security, technical infrastructure, be it on site or in the cloud, applications, and application architecture needed to meet their objectives."
      }
    ]
  },
  {
    slug: "jose-cabrera",
    parent: "team",
    name: "Jose Cabrera",
    photo: "/images/Jose-Cabrera-1-1.jpg",
    blocks: [
      {
        kind: "para",
        text: "Associate Director of Talent Acquisition"
      },
      {
        kind: "para",
        text: "Jose Cabrera joined the WOS team in February of 2016 as a Talent Acquisition Associate and is currently serving as the Associate Director of Talent Acquisition. Jose joined the Marine Corp Reserve after the tragic events of 9/11. During this time, he deployed to Iraq twice in 2003 and 2005. Jose then used his Post 9/11 G.I. Bill to complete his Bachelor’s of Arts in History, while also completing a Teacher Certification Program at Hunter College."
      }
    ]
  },
  {
    slug: "julie-l-brickell",
    parent: "team",
    name: "Julie L. Brickell",
    photo: "/images/Julie-Brickell_cropped.png",
    blocks: [
      {
        kind: "heading",
        text: "Julie L. Brickell, Esquire"
      },
      {
        kind: "para",
        text: "General Counsel for Artificial Intelligence"
      },
      {
        kind: "para",
        text: "Ms. Brickell, a lawyer, brings expertise garnered as in-house counsel and courtroom lawyer. Having served as general counsel of a technology company which deployed search and measurement expertise and technology to address eDiscovery, data management, and compliance challenges, and deputy general counsel of a top consumer products company, Brickell has worked closely with business units on data security, privacy, data management, compliance, contracting, intellectual property, eDiscovery, and litigation. As faculty teaching the implications of the law to technology executives for well over a decade, Brickell communicates effectively with technology teams, advises on business processes, elucidates ethical issues in the use of artificial intelligence, and speaks and writes frequently on these topics."
      }
    ]
  },
  {
    slug: "mayela-montano",
    parent: "team",
    name: "Mayela Montano",
    photo: "/images/Mayela-cropped.jpg",
    blocks: [
      {
        kind: "para",
        text: "HR Generalist | Office Manager"
      },
      {
        kind: "para",
        text: "Mayela Montano joined WOS as an HR Generalist/Office Manager in October of 2024. Mayela brings with her 15 years of HR leadership experience from both Non-profit and Corporate America. Mayela began her HR career working for the Texas Workforce Commission and with her most recent position in HR Operations for Corporate America."
      }
    ]
  },
  {
    slug: "mike-keizur-2",
    parent: "team",
    name: "Mike Keizur",
    photo: "/images/Mike-Keizur-1.jpg",
    blocks: [
      {
        kind: "para",
        text: "VP Client Success"
      },
      {
        kind: "para",
        text: "Mike Keizur joined the WOS team in October 2009. Mike has been involved in the technology industry for over 20 years. Prior to joining WOS, he was the Program Director for the CIO Institute, an exclusive educational program designed to train and mentor future Fortune 1000 CIOs. From 1999 through 2005 Mike served as VP of Infrastructure and Architecture at Nike, Inc. in Portland, Oregon, where he provided back-end services and project leadership in a $400M SAP BW implementation."
      }
    ]
  },
  {
    slug: "ming-wu-2",
    parent: "team",
    name: "Ming Wu",
    photo: "/images/Ming-Wu-1.jpg",
    blocks: [
      {
        kind: "para",
        text: "Bookkeeper"
      },
      {
        kind: "para",
        text: "Ming Wu joined WOS in December, 2018 as a Bookkeeper working alongside with the Executive Administrator and CFO to create a more effective and efficient way of data management. Before joining WOS, Ming worked as a staff accountant in Professional Bookkeeping Services, where he managed multiple clients’ bookkeeping services to ensure all data recorded are accurate in accordance with Generally Accepted Accounting Principles (GAAP)."
      }
    ]
  },
  {
    slug: "patrick-spurgeon-2",
    parent: "team",
    name: "Patrick Spurgeon",
    photo: "/images/Patrick-Spurgeon-1.jpg",
    blocks: [
      {
        kind: "para",
        text: "Client Service Manager | Talent Acquisition, Systems Administrator"
      },
      {
        kind: "para",
        text: "Patrick Spurgeon is the Systems Administrator for Talent Acquisition and is responsible for a wide variety of programs and systems used to identify and recruit diverse talent from local communities. He previously served as a Client Service Manager responsible for managing WOS programs in Connecticut, New York, and New Jersey. Patrick is a 27-year veteran of the United States Navy Submarine Force, retiring as a Senior Chief Petty Officer before joining the WOS team in February 2013. He served on five different nuclear submarines, one tour with the Navy’s Ceremonial Guard in Washington, DC and two tours as a Navy Instructor at Naval Submarine Base, New London."
      }
    ]
  },
  {
    slug: "philip-curry-2",
    parent: "team",
    name: "Philip Curry",
    photo: "/images/Philip-Curry-1-1.jpg",
    blocks: [
      {
        kind: "para",
        text: "Chief Financial & Administrative Office"
      },
      {
        kind: "para",
        text: "Philip Curry joined WOS as Chief Financial Officer in March 2013. Philip is a seasoned financial professional with experience in global financial services, social entrepreneurship, and consulting. He trained as an accountant with Touche Ross in London; serving a broad cross-section of financial service clients as an auditor and a consultant. Philip spent 15 years with ICAP, the world’s leading interdealer broker and market infrastructure group, most recently as CFO for the Americas, where he was responsible for the finance function in the United States, Latin America, and Israel. He was a member of the senior management team that rebuilt the North American operations, whose offices were destroyed in the September 11th terrorist attacks. He has recently returned from the Bay Area, where he advised a number of start-up social enterprises, including Credibles and Carbon Offsets to Alleviate Poverty. Philip received his B.S. in Mathematics and Business from the University of Warwick and is a Chartered Accountant."
      }
    ]
  },
  {
    slug: "sandy-kelton",
    parent: "team",
    name: "Sandy Kelton",
    photo: "/images/Sandy-cropped-new.jpg",
    blocks: [
      {
        kind: "para",
        text: "Service Desk Manager"
      },
      {
        kind: "para",
        text: "Sandy Kelton joined WOS as Service Desk Manager in September of 2024. Sandy brings over 20 years of experience in IT Service Desk Management. Sandy has successfully lead teams in global 24/7 environments, supporting thousands of end-users. Sandy has a proven track record in implementing process improvements, achieving cost savings, and enhancing customer satisfaction. Sandy is a driven Leader with a Customer Service mindset. Her experience includes incident management, change management, ITIL best practices, software licensing and team leadership."
      }
    ]
  },
  {
    slug: "steve-petruk",
    parent: "team",
    name: "Steve Petruk",
    photo: "/images/Steve-Petruk_cropped.png",
    blocks: [
      {
        kind: "para",
        text: "Managed Services Strategy, Sales, & Marketing"
      },
      {
        kind: "para",
        text: "Steve Petruk joined WOS on January 1, 2024, after twenty-seven highly successful years in the technical support sales and delivery industry. He served in multiple roles with IBM, starting as an advisory project leader, project executive, Director of Sales, West Region VP of Maintenance and finally Vice President Professional Services before retiring to join Toshiba Global Commerce. At Toshiba, Steve was responsible for global delivery of warrant and post warrant delivery as Global Senior Vice President delivery. Prior to joining WOS, Steve spent four years at Computer Generated Solutions, Inc. as President of the outsourcing division. Steve’s deep experience in sales and delivery, will establish a solid foundation for success in his new role as Head of Managed Services Strategy, Sales and Marketing. He will report directly to Dr. Arthur M. Langer, Chief Executive Officer. Steve resides in Little Rock, Arkansas. He is a proud parent of a daughter and son, and an even prouder grandfather of six grandchildren (2 boys and 4 girls). He is passionate about supporting homeless ministries, mentoring/coaching teenagers and young adults and dog training."
      }
    ]
  },
  {
    slug: "wendy-laplaca",
    parent: "team",
    name: "Wendy LaPlaca",
    photo: "/images/Wendy-crop-new.jpg",
    blocks: [
      {
        kind: "para",
        text: "Senior Client Service Manager"
      },
      {
        kind: "para",
        text: "Wendy LaPlaca joined WOS in January 2018 as a Client Service Manager in Lincolnshire, IL. Prior to joining WOS, Wendy served as a Program Director for CASA Lake County, a non-profit organization dedicated to providing advocacy for abused and neglected children in the juvenile court system. In this role, she managed a professional staff and was responsible for overseeing the work of over 200 trained volunteer advocates. Previously Wendy worked on a national sales team at the IBM Corporation. Wendy earned a master’s in educational administration from Illinois State University and a Bachelor of Arts in Special Education and Psychology from Mac Murray College."
      }
    ]
  },
  {
    slug: "arthur-m-langer",
    parent: "board-of-directors",
    name: "Arthur M. Langer",
    photo: "/images/Art-Langer-1_bw.jpg",
    blocks: [
      {
        kind: "heading",
        text: "Board of Directors"
      },
      {
        kind: "heading",
        text: "Dr. Arthur M. Langer"
      },
      {
        kind: "para",
        text: "Chairman and Founder, Workforce Opportunity Services"
      },
      {
        kind: "para",
        text: "Dr. Arthur M. Langer is the Chairman and Founder of Workforce Opportunity Services. He serves in a number of roles at Northeastern University including Assoc. Vice-Provost and Director of the Center for Technology Management and Digital Leadership as well as Professor of Professional Practice at the Department of Entrepreneurship and Innovation at the D-Amore-McKim School of Business. Dr. Langer also is Professor of Practice and Director of the Workforce Education and Development Advanced Certificate Program in the Department of Organization and Leadership at Columbia University’s Graduate School of Education (Teachers College). He also serves on the faculty of the Department of Organization and Leadership at the Graduate School of Education (Teachers College) and is the faculty director of the Workforce Education and Development Advanced Certificate Program. Previously, Dr. Langer held multiple positions at Columbia University where he was Professor of Professional Practice, Director of the Center for Technology Management, and Academic Director of the M.S. in Technology Management programs at Columbia University. Dr. Langer is the author of Analysis and Design of Next Generation Software Architecture (2020), Strategic Information Technology: Best Practices to Drive Digital Transformation (2nd Ed., 2018 with Lyle Yorks), Information Technology and Organizational Learning (3rd Ed., 2018), Guide to Software Development: Designing and Managing the Life Cycle (2nd Ed., 2016), Analysis and Design of Information Systems (2007), Applied Ecommerce (2002), and The Art of Analysis (1997) and has published numerous articles and papers relating to service learning for underserved populations, IT organizational integration, mentoring and staff development. Dr. Langer consults with corporations and universities on information technology, staff development, management transformation, and curriculum development around the globe. Prior to joining the full-time faculty at Columbia University, Dr. Langer was Executive Director of Computer Support Services at Coopers and Lybrand, General Manager and Partner of Software Plus, and President of Macco Software."
      }
    ]
  },
  {
    slug: "bob-king-2",
    parent: "board-of-directors",
    name: "Bob King",
    photo: "/images/Bob-King.png",
    blocks: [
      {
        kind: "heading",
        text: "Board of Directors"
      },
      {
        kind: "para",
        text: "Consultant, Connecticut Assoc. Board of Education"
      },
      {
        kind: "para",
        text: "A retired IBM executive, Robert (Bob) King is a former chair and officer of the Stamford Board of Education where, during his tenure, he served on committees focused on curriculum, community engagement and more. A member of the NAACP, Bob is a veteran of the US Army and graduate of the University of Connecticut. He has served in leadership positions for organizations throughout the community and he and his wife, Beverly, reside in Stamford and have three children."
      }
    ]
  },
  {
    slug: "camille-j-bryant",
    parent: "board-of-directors",
    name: "Camille J. Bryant",
    photo: "/images/Camille-Bryant-BW_crop.jpg",
    blocks: [
      {
        kind: "para",
        text: "Chief Human Resource Officer at Walker-Miller Energy Services"
      },
      {
        kind: "para",
        text: "A native of Flint, Michigan, Camille is a visionary and intuitive Human Resources Executive with extensive experience leading the full scope of HR programs and initiatives including, but not limited to organizational design, employee engagement, and capability building. She attended Michigan State University where she graduated with a BA in Political Theory & Constitutional Democracy and Master of Arts in Labor Relations & Human Resources. After graduate school, Camille joined General Electric’s Human Resource Leadership Program (HRLP) within the Plastics business unit, where she held various roles including HR Integration Specialist, Human Resource Manager, and Marketing Specialist, eventually moving on to GE Water where she held a variety of HR roles before leaving GE in 2007 to focus on family. In 2007, she and her husband became entrepreneurs as they launched their family business, Alden Oils. In 2009 Camille began working with Catalyst Community Partners where she served as the Director of Business Development to revitalize distressed urban markets by recruiting companies and helping neighborhood entrepreneurs launch businesses. Camille was a primary contributor to the business plan for Kindred Kitchens, an incubator kitchen in North Minneapolis for food entrepreneurs to launch and grow their businesses. In 2011 Camille returned to GE holding a variety of HR leadership roles when in 2016, she took on her most recent role as the Executive HR Business Partner for GE Digital’s Global Digital Hub Transformation. In this capacity, she was responsible for the culture, talent management, collaboration, learning & development and facilitating the restructuring and creation of horizontal organizations. Camille enjoys spending time with her children (Kennedi, Isaiah & Payton), life coaching, hiking, reading and watching movies. She also loves to spend time with her husband, Donny."
      }
    ]
  },
  {
    slug: "cindy-r-jebb",
    parent: "board-of-directors",
    name: "Cindy R. Jebb",
    photo: "/images/Cindy-Jebb_cropped.png",
    blocks: [
      {
        kind: "heading",
        text: "Board of Directors"
      },
      {
        kind: "heading",
        text: "Cindy R. Jebb, Ph.D."
      },
      {
        kind: "para",
        text: "President of Ramapo College of New Jersey"
      },
      {
        kind: "para",
        text: "Cindy Jebb became Ramapo College of New Jersey’s fifth president on July 6, 2021. In her first few months as president of the state’s premier liberal arts college, Ramapo developed its Fall Operations Plan with the priority of ensuring a healthy, well, safe, and vibrant student experience, while embracing a culture of dignity and respect marked by empathy and support for veterans and underserved communities. Moreover, under her leadership, the College has launched its 2021-2022 Strategic Planning process through a set of campus-wide summits known as The Future Series, a Needs Statement Process, and Campus Master Planning. Dr. Jebb joined Ramapo College following her retirement from the U.S. military after 39 years of service at the rank of Brigadier General, Professor Emerita, and as the first woman Dean of the Academic Board at the U.S. Military Academy at West Point. Prior to her appointment as Dean, Dr. Jebb served as Professor and Head of the Department of Social Sciences. Additionally, she has served at home and abroad; conducted human security research in Africa; and completed study projects in Iraq and Afghanistan to include serving as a senior advisor to the Chief, Office of Security Cooperation-Iraq during the Summer of 2015. Dr. Jebb earned a B.S. from the United States Military Academy at West Point, a M.A. in Political Science from Duke, an M.A. in National Security and Strategic Studies from the Naval War College, and a Ph.D. in Political Science from Duke University. She is a member of the Council on Foreign Relations and holds an honorary doctorate from Bard College. Dr. Jebb and her husband, who reside in Mahwah, have four grown children (including their daughter-in-law) and one grandchild."
      }
    ]
  },
  {
    slug: "craig-cuyar",
    parent: "board-of-directors",
    name: "Craig Cuyar",
    photo: "/images/Craig-Cuyar-new1.png",
    blocks: [
      {
        kind: "heading",
        text: "Board of Directors"
      },
      {
        kind: "para",
        text: "SVP & Global CIO for Omincom Group"
      },
      {
        kind: "para",
        text: "Craig Cuyar serves as the SVP & Global CIO for Omnicom Group (NYSE: OMC), a Fortune 200 media and communications company operating in 70+ countries. He interacts with the board frequently, and owns P&L Management of a $500M budget after reducing annual operating costs by $100M while still introducing new technology capabilities and partnerships. As a strategist who plays chess, not checkers, Craig leverages his global experience to “see around corners.”"
      },
      {
        kind: "para",
        text: "In advance of current M&A activity, Craig developed and implemented Omnicom’s standardized global M&A IT integration framework, expediting due diligence, board communication, rapid onboarding, and technology harmonization across multiple acquisitions. He successfully leveraged this approach to acquire and integrate 12 companies ranging up to $1B in size within a two-year time period across North America, EMEA, and APAC, driving operational synergies, cost savings, and scalable growth. Craig has guided organizations through acquisitions, divestitures, complex restructurings, and journeys from public to private and vice versa."
      },
      {
        kind: "para",
        text: "Craig’s strategic global expertise also includes navigating complex geopolitical landscapes—including Russia, China, and Ukraine—where he proactively assesses risk, ensures regulatory compliance, and adapts IT operations to evolving international policies and sanctions. He’s cultivated strong cross-border partnerships, safeguarded data sovereignty, and developed robust contingency plans to bolster resilience and business continuity in advance of and amid global uncertainty."
      },
      {
        kind: "para",
        text: "As risk is a key factor in business, Craig advised his organization on creating a proactive risk management strategy by building and leading a dedicated IT risk function, integrating advanced risk assessment tools, and establishing robust governance frameworks. Similarly, he drove continuous innovation by aligning security strategy with business objectives and implementing key frameworks, resulting in a 50% reduction in security incidents and accelerated digital transformation worldwide."
      },
      {
        kind: "para",
        text: "Understanding the power of data and emerging technology, Craig built relationships with Google, Meta and Microsoft designed to enable new revenue-generating capabilities, leveraging AI/ML, RPA and driving millions in additional revenue and cost reductions. He developed a global Data Strategy and programs designed to ensure proper governance, privacy, security, and classification of owned and third-party data inclusive of text/video analytics, sentiment analysis, machine learning and programmatic placement of advertisements. In addition, Craig built a global Information Security program in two organizations to properly position over 500 separate companies for European Union Data Privacy Regulations and ISO 27001 certifications, including the development and establishment of global policies to support the efforts."
      },
      {
        kind: "para",
        text: "A true collaborator, natural mentor, and life-long learner, since 2009 Craig has been an Adjunct Faculty member and taught Master’s Degree candidates in the Executive Technology Management programs at Columbia University and now Northeastern University. Teachings include Enterprise Architecture, Transformational CIO Leadership, Business Value of IT, Ethical and Legal issues of IT, Artificial Intelligence, and Data Monetization and Governance."
      },
      {
        kind: "para",
        text: "Craig lives with his wife and three daughters in northern New Jersey"
      }
    ]
  },
  {
    slug: "michael-garrett-2",
    parent: "board-of-directors",
    name: "Michael Garrett",
    photo: "/images/Michael-Garrett.jpg",
    blocks: [
      {
        kind: "heading",
        text: "Board of Directors"
      },
      {
        kind: "para",
        text: "Columbia Univ., Dir. Law School Association & Exec. Mentor, Business"
      },
      {
        kind: "para",
        text: "Michael Garrett is a seasoned legal and business advisor with diverse experience in global financial services, corporate, nonprofit, consulting and coaching. After earning his Bachelor’s, MBA and JD degrees at Columbia University, Michael received his basic training in corporate and international legal practice as an associate with prominent law firms in New York City. He then served for many years as a partner and associate general counsel of Coopers and Lybrand, with responsibility for human resource policies and claims, management and benefits consulting, enterprise and industry technology, intellectual property, professional practice problems and diverse regulatory matters. He then became general counsel of the global investments division of the Swiss Reinsurance Company. In the wake of the September 11th terrorist attacks, Michael created, managed and grew The Gift of New York, one of the most successful nonprofit initiatives to benefit family survivors of the attack victims. Returning to legal matters, Michael served as general counsel in residence of a 700-attorney national law firm. Currently, Michael is an independent attorney, executive coach, and business and nonprofit strategy advisor. Michael is also a very active Columbia alumnus, serving as executive mentor in the Business School, president of the Society of Columbia Graduates, a director of the Law School Association and of the Stephen Whitney Phoenix Society, and a member of the Advisory Committee for the Columbia Libraries."
      }
    ]
  },
  {
    slug: "robert-e-farina",
    parent: "board-of-directors",
    name: "Robert E. Farina",
    photo: "/images/Robert-Farina.jpg",
    blocks: [
      {
        kind: "heading",
        text: "Board of Directors"
      },
      {
        kind: "para",
        text: "Chief Executive Officer at Magna5"
      },
      {
        kind: "para",
        text: "Robert (Bob) Farina is an experienced CEO of Private Equity and Venture Capital backed technology companies with over 30 years of experience leading start-ups, turnarounds and high growth enterprises in the managed services (MS), software-as-a-service (SaaS) and business process outsourcing (BPO) business segments. In addition to his experience successfully running multiple businesses backed by professional investors, Farina has served on a number of Boards of Directors, started and successfully exited his own business, and ran a division of a publicly held company. He has been a finalist for the Ernst & Young Entrepreneur of the Year award for the State of New Jersey three times in his career and serves on the Advisory Board of the Columbia University Master’s Degree program for Information Technology Management. Farina is a graduate of the Wharton School of the University of Pennsylvania."
      }
    ]
  },
  {
    slug: "stuart-kippelman",
    parent: "board-of-directors",
    name: "Stuart Kippelman",
    photo: "/images/Stuart_Kippelman-2.jpg",
    blocks: [
      {
        kind: "heading",
        text: "Board of Directors"
      },
      {
        kind: "para",
        text: "Chief Information Officer"
      },
      {
        kind: "para",
        text: "Stuart Kippelman is a global Chief Information Officer, strategic advisor, and technology executive recognized for turning technology from a cost center into a source of revenue, innovation, efficiency, and competitive advantage. He has led digital and business transformations across some of the world’s most complex organizations spanning defense, healthcare, manufacturing, energy, and consumer sectors. Most recently at Xerox Corporation, Stuart served as Chief Information and AI Officer, repositioning the company from a legacy hardware provider into a competitive AI and professional services business. Previously, Stuart served as Chief Digital and Information Officer at Parsons Corporation, a leading defense and intelligence technology company, where he drove enterprise-wide digital transformation and modernization, deployed AI solutions including automation and digital twins directly into customer operations to enable predictive modeling and operational insight, and commercialized enterprise cybersecurity capabilities into a market-leading services business. Earlier in his career, he served as CIO at Platform Specialty Products, Covanta Holdings, and Biotest Pharmaceuticals, and held progressive leadership roles at Johnson and Johnson including Chief Technology Officer, across corporate IT, R&D, supply chain, manufacturing, and scientific computing. He holds multiple U.S. and EU patents in AI, machine learning, and data mining. Stuart serves as an independent CxO advisor across AI strategy, cybersecurity, and digital transformation for organizations ranging from Fortune 500 enterprises to early-stage startups. He is a Distinguished Fellow at Avasant, speaks at industry forums on AI, cybersecurity, digital transformation, and leadership. He is a recent recipient of the HMG Strategy CIO of the Year award and Computerworld’s Premier 100 IT Leader recognition."
      }
    ]
  },
  {
    slug: "warren-kudman",
    parent: "board-of-directors",
    name: "Warren Kudman",
    photo: "/images/Warren-Kudman.jpg",
    blocks: [
      {
        kind: "heading",
        text: "Board of Directors"
      },
      {
        kind: "para",
        text: "CIO of Turner Construction"
      },
      {
        kind: "para",
        text: "​Previously, he was the Chief Information Officer of Sealed Air Corporation, a $7.8 billion global manufacturer and world leader in food and industrial packaging and cleaning and hygiene solutions. As CIO, Warren was responsible for delivering information services that enabled the execution of the Sealed Air’s strategic objectives, improved customers’ ease of doing business with the company, and supported continuous improvement in Sealed Air’s day-to-day operations. During his time as CIO, Warren was also selected to lead the Integration Program for Sealed Air’s acquisition of Diversey, a $3 billion global entity."
      },
      {
        kind: "para",
        text: "Prior to joining Sealed Air, Warren spent six years with McKinsey & Company in the New York, New Jersey, and Copenhagen offices. During this time, he advised clients in market strategy, information technology strategy and management, operations improvement, and sales force productivity in the transportation, financial services, telecommunications, and pharmaceutical industries."
      },
      {
        kind: "para",
        text: "Warren is on the Advisory Board of IT Central Station, a social network where IT professionals share their experience and expertise on a wide range of IT products and services."
      }
    ]
  },
  {
    slug: "alan-mandell",
    parent: "academic-advisory-board",
    name: "Alan Mandell",
    photo: "/images/Alan-Mandell_bw.jpg",
    blocks: [
      {
        kind: "para",
        text: "SUNY Distinguished Service Professor and College Professor of Adult Learning and Mentoring at SUNY Empire State College"
      },
      {
        kind: "para",
        text: "Alan Mandell is SUNY Distinguished Service Professor and College Professor of Adult Learning and Mentoring at SUNY Empire State College. In his more than four decades at Empire State College, he has served as administrator, mentor in the social sciences and director of the college’s Mentoring Institute. Mandell edits the college’s journal, All About Mentoring and co-edits (with colleague Nan Travers) the first international on-line journal on prior learning assessment, PLA Insideout . Mandell regularly makes presentations at conferences; facilitates workshops; and serves as a consult/reviewer on many projects on adult learning, mentoring and experiential learning. Together with Elana Michelson, he is the author of Portfolio Development and the Assessment of Prior Learning (2nd edition) (2004) and co-edited the collection of essays, “Adult Education in the Age of Trump and Brexit” (2020). Together with Lee Herman, he has written many essays and book chapters, and has co-authored the book, From Teaching to Mentoring: Principle and Practice, Dialogue and Life in Adult Education (2004), and with Katherine Jelly, he co-edited the book, Principles, Practices, and Creative Tensions in Progressive Higher Education (2017). Over the last several years, Mandell and colleague Xenia Coulter have regularly published on the state of adult learning today, including a recent edited volume on John Dewey in the New Directions for Adult and Continuing Education series. Recognition of his work includes the Eugene Sullivan Award for Leadership given by the Adult Higher Education Alliance (2009), the SUNY Chancellor’s award for Excellence in Teaching (2001) and for Professional Services (1991), and the Empire State College Foundation Award in Mentoring (2000). Mandell held the first Susan Turben Chair in Adult Learning and Mentoring (2008-2009)."
      }
    ]
  },
  {
    slug: "charles-snow",
    parent: "academic-advisory-board",
    name: "Charles Snow",
    photo: "/images/Charles-Snow-BW.jpg",
    blocks: [
      {
        kind: "para",
        text: "Mellon Foundation Professor of Business Administration in the Smeal College of Business at Penn State University"
      },
      {
        kind: "para",
        text: "Charles Snow is the Mellon Foundation Professor of Business Administration in the Smeal College of Business at Penn State University. He brings extensive knowledge and experience related to innovation management, organization design, and new organizational forms to WOS. Over the course of his career in academia, he has taught management subjects to executives and MBA students in more than 25 countries. Snow has been a visiting professor at The Amos Tuck School (Dartmouth College), Norwegian School of Management, and the University of Oregon. Snow co-founded OrgDesign.com, which is a community created to improve the practice of organizational design to accelerate the development of new designs that can meet the opportunities and challenges of the 21st-century global economy. He has co-authored books that include Organizational Strategy, Structure, and Process (McGraw-Hill, 1978) , Fit, Failure, and the Hall of Fame: How Firms Succeed or Fail (Free Press, 1994), and Collaborative Entrepreneurship: How Communities of Networked Firms Use Continuous Innovation to Create Economic Wealth (Stanford University Press, 2005). He serves on the editorial board of the Strategic Management Journal, Journal of Management, Journal of Engineering and Technology Management, Journal of World Business, and several other academic journals."
      }
    ]
  },
  {
    slug: "david-thomas",
    parent: "academic-advisory-board",
    name: "David Thomas",
    photo: "/images/David-Thomas-BW.jpg",
    blocks: [
      {
        kind: "para",
        text: "President, Morehouse College"
      },
      {
        kind: "para",
        text: "Dr. David Thomas serves as the President of Morehouse College. Prior to being appointed to the helm of Morehouse, he was the H. Naylor Fitzhugh Professor of Business Administration at Harvard Business School. His research addresses issues related to executive development, workforce representation, leadership, and organizational change. He served as a professor of management at Georgetown University’s McDonough School of Business, where he served as dean from 2011 to 2016. While at McDonough, Thomas was a member of the Federal City Council, and in 2014, the Washington Business Journal recognized him as a top Minority Business Leader. Prior to Georgetown, Thomas spent two decades at Harvard Business School (HBS). While he had multiple responsibilities during his tenure, he launched new research initiatives and increased research funding, grew Executive Education program revenues by 400 percent. His efforts lead to the growth of HBS’ endowment and increased philanthropic giving, ending the school’s capital campaign $30 million above its $100 million fundraising goal. Thomas received a bachelor’s degree, as well as masters and doctoral degrees in Organizational Behavior, from Yale University. He also holds a master’s in Organizational Psychology from Columbia University. He currently is a member of the Board of Governors for the American Red Cross, the Board of Directors of DTE Energy, and the Estoril Conferences Advisory Board. He also is an industry advisor for Brightwood Capital Advisors."
      }
    ]
  },
  {
    slug: "peter-cappelli-2",
    parent: "academic-advisory-board",
    name: "Peter Cappelli",
    photo: "/images/Peter-Cappelli.jpg",
    blocks: [
      {
        kind: "para",
        text: "George W. Taylor Professor of Management, The Wharton School"
      },
      {
        kind: "para",
        text: "Peter Cappelli currently serves as a George W. Taylor Professor of Management at The Wharton School and Director of Wharton’s Center for Human Resources. He is also a Research Associate at the National Bureau of Economic Research in Cambridge, MA. Cappelli brings knowledge and expertise in areas surrounding human resource practices, public policy related to employment, and talent and performance management to WOS. He formerly served as a Senior Advisor to the Kingdom of Bahrain for Employment Policy and was appointed to serve on the U.S. Secretary of Labor’s Commission on Workforce Quality and Labor Market Efficiency, the U.S. Department of Education’s National Center on the Educational Quality of the Workforce, and the U.S. Department of Education’s National Center on Post-Secondary Improvement. Cappelli—who has authored several best-selling books that cover emerging workforce development trends—is currently conducting research that examines employment relations in the U.S. and their implications."
      }
    ]
  }
];
