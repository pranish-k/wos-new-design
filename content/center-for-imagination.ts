// The Center for Imagination, Reflective Development, and AI Futures (CIRDAF).
//
// A proposal, not a program, and the page says so in its first line. The eyebrow reads
// "Proposed" for the same reason.
//
// The source document is a fundraising document. Everything to do with funding is
// deliberately absent here: the five-year budget, every dollar figure, and every named
// target funder and prospective corporate or international partner. None of them have
// agreed to anything, and publishing a list of intended asks states an intention as a
// fact and tells each named party the size of the ask before it is made.
//
// The proposed organisational divisions are out for a related reason: naming five
// laboratories with faculty and directors implies an institution that does not exist yet.
//
// If WOS wants any of that public later it is a decision for WOS, not a formatting job.

import type { PageContent } from "@/lib/content";

const page: PageContent = {
  route: "/center-for-imagination",
  title: "Center for Imagination, Reflective Development, and AI Futures",
  eyebrow: "Proposed",
  description:
    "A proposed interdisciplinary research laboratory studying how people develop imagination, abstract thinking, ethical foresight, and innovation in the age of artificial intelligence.",
  hero: null,
  lead: [
    {
      kind: "para",
      text: "The Center for Imagination, Reflective Development, and AI Futures (CIRDAF) is proposed as an interdisciplinary research laboratory dedicated to advancing the scientific, educational, and societal understanding of how individuals develop the capacity for imagination, abstract thinking, ethical foresight, and innovation in the Age of Artificial Intelligence.",
    },
    {
      kind: "para",
      text: "Grounded in Dr. Arthur Langer’s “Fantasy Arc” framework, the Center would investigate how human beings progress from indoctrinated knowledge toward “Abstracts of New Possibilities,” the highest stage of imaginative and reflective maturity. The laboratory would study how educational systems, organizational structures, mentorship models, creativity practices, and AI-enhanced learning environments can cultivate advanced imagination and innovation capabilities across the lifespan, from K-12 through adult and executive education.",
    },
  ],
  sections: [
    {
      heading: "Vision",
      blocks: [
        {
          kind: "para",
          text: "To create the world’s leading research and development laboratory dedicated to cultivating human imagination, ethical reflection, and creative consciousness in the era of artificial intelligence.",
        },
        {
          kind: "para",
          text: "The long-term mission is to build evidence-based educational and organizational systems capable of preparing future generations to thrive in what Langer defines as the “Imagination Age.”",
        },
      ],
    },
    {
      heading: "Mission",
      blocks: [
        { kind: "para", text: "The mission of CIRDAF is to:" },
        {
          kind: "list",
          items: [
            "Develop scientifically validated models of imaginative and reflective development",
            "Investigate how individuals and societies generate transformative ideas",
            "Design scalable educational frameworks that accelerate movement toward advanced imaginative maturity",
            "Integrate humanities, creativity, ethics, and STEM into future learning systems",
            "Prepare future generations to responsibly shape technological, economic, and social transformation",
          ],
        },
        {
          kind: "para",
          text: "As a hub, the Center would integrate cognitive development research, AI-enhanced education, humanities and STEM integration, creativity and imagination science, reflective practice and leadership, organizational innovation studies, and ethics and democratic resilience.",
        },
      ],
    },
    {
      heading: "Intellectual foundation",
      blocks: [
        {
          kind: "para",
          text: "The Center is grounded in the theoretical work presented in Revisiting Piaget’s 4 Stages of Development with Creative Fantasy in the Era of AI by Dr. Arthur Langer, founder of Workforce Opportunity Services. It builds on several foundational claims:",
        },
        {
          kind: "list",
          items: [
            "Modern education overemphasizes technical rationality and STEM while underdeveloping imagination, ethics, and reflective consciousness.",
            "Future societies require “Reflection-Before-Action,” the capacity to envision and evaluate future possibilities prior to implementation.",
            "Individuals must progress toward Stage 5 of the Fantasy Arc, “Abstracts of New Possibilities,” to become fully capable of generating transformative ideas.",
            "AI systems and “World Models” may eventually support cognitive and reflective development if integrated responsibly into educational systems.",
            "K-12 and higher education systems require reinvention through integrated humanities, STEM, and creativity curricula.",
          ],
        },
      ],
    },
    {
      heading: "Research agenda",
      blocks: [
        { kind: "heading", text: "The science of imaginative development" },
        {
          kind: "para",
          text: "Develop validated developmental models measuring progression toward imaginative maturity: how individuals move through the Fantasy Arc stages, which educational experiences accelerate that development, whether reflective maturity can be measured longitudinally, and how imagination correlates with innovation outcomes.",
        },
        { kind: "heading", text: "AI and Reflection-Before-Action" },
        {
          kind: "para",
          text: "Investigate how AI systems can support reflective, ethical, and imaginative cognition: how AI can augment imagination rather than replace it, which AI environments best support Stage 5 development, whether AI-driven simulations improve foresight and ethical reasoning, and how “World Models” should be integrated into education.",
        },
        { kind: "heading", text: "K-12 imagination development" },
        {
          kind: "para",
          text: "Develop educational interventions that begin imaginative development at earlier ages: at what developmental stages imagination curricula should begin, how fantasy, storytelling, arts, and ethics accelerate abstract thinking, how STEM-only environments inhibit creativity, and what school structures best support imaginative maturity.",
        },
        { kind: "heading", text: "Organizational and societal innovation systems" },
        {
          kind: "para",
          text: "Study how societies, governments, universities, and corporations cultivate imagination and innovation: why some societies generate more breakthrough ideas, how innovative organizations structure imagination, what leadership models support future-oriented thinking, and how institutions become trapped at earlier stages of development.",
        },
        { kind: "heading", text: "Humanities, consciousness, and creativity" },
        {
          kind: "para",
          text: "Explore the philosophical, psychological, and artistic foundations of imagination, including Jungian active imagination, reflective practice theory, mythology and symbolic cognition, narrative intelligence, artistic creativity and transformation, and ethics and meaning-making. This research extends Langer’s mapping of Jung, Rubin, Einstein, and Pythagoreanism onto the Fantasy Arc developmental model.",
        },
      ],
    },
    {
      heading: "Educational deliverables",
      blocks: [
        {
          kind: "list",
          items: [
            "K-12: Fantasy Arc curriculum modules, creativity assessments, AI-enhanced reflective learning systems, and teacher certification programs",
            "Higher education: graduate degrees in Imagination Studies, executive education, and AI and reflective leadership programs",
            "Corporate education: innovation leadership programs, reflective decision-making systems, and creativity acceleration labs",
          ],
        },
      ],
    },
    {
      heading: "Expected outcomes",
      blocks: [
        {
          kind: "para",
          text: "Scientifically, validated Fantasy Arc assessment systems, new developmental theories, longitudinal imagination studies, and AI-human creativity frameworks. Educationally, improved abstract reasoning, enhanced creativity metrics, better interdisciplinary thinking, and increased innovation capacity.",
        },
        {
          kind: "para",
          text: "Economically, future workforce development, entrepreneurial acceleration, innovation ecosystem growth, and AI-era leadership pipelines. Societally, greater democratic resilience, stronger ethical reasoning, reduced susceptibility to manipulation, and enhanced civic imagination.",
        },
        {
          kind: "para",
          text: "The emergence of AI and accelerated technological change requires a transformation in how societies educate human beings. Current systems optimized primarily for technical proficiency are insufficient for cultivating the imaginative, ethical, and reflective capacities required in the “Imagination Age.”",
        },
      ],
    },
  ],
};

export default page;
