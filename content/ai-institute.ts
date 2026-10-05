// The Workforce AI Institute: the Center for Imagination, Reflective Development, and AI
// Futures (CIRDAF), from "Proposal for the Center for Imagination".
//
// The Institute is established. The page first went up as a proposal under a "Proposed"
// eyebrow, and that label came off when WOS confirmed the Institute is real.
//
// The source document is a fundraising document. Everything to do with funding is
// deliberately absent here: the five-year budget, every dollar figure, and every named
// target funder and prospective corporate or international partner. None of them have
// agreed to anything, and publishing a list of intended asks states an intention as a
// fact and tells each named party the size of the ask before it is made.
//
// The five divisions were held back on the earlier /center-for-imagination page, when the
// Institute was still a proposal and naming laboratories implied one that did not exist.
//
// Data rather than PageContent: this page is built from tiles, a diagram and disclosures,
// none of which the prose block vocabulary in lib/content.ts can express.

import type { LucideIcon } from "lucide-react";
import {
  Atom,
  BookOpen,
  Brain,
  BrainCircuit,
  Briefcase,
  Building2,
  Compass,
  FlaskConical,
  GraduationCap,
  Landmark,
  Lightbulb,
  Network,
  Palette,
  Scale,
  School,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export type IconItem = { label: string; icon: LucideIcon };

export type Pillar = {
  title: string;
  objective: string;
  icon: LucideIcon;
  questions: string[];
  /** The source heads this list differently per pillar, so the heading travels with it. */
  workLabel: string;
  work: string[];
};

export type Division = { name: string; icon: LucideIcon; focus: string[] };

export type Audience = { name: string; icon: LucideIcon; items: string[] };

export type Outcome = { area: string; icon: LucideIcon; items: string[] };

const page = {
  route: "/ai-institute",
  eyebrow: "Research institute",
  title: "Workforce AI Institute",
  subtitle: "Center for Imagination, Reflective Development, and AI Futures",
  description:
    "An interdisciplinary research laboratory studying how people develop imagination, abstract thinking, ethical foresight, and innovation in the age of artificial intelligence.",
  lead: "An interdisciplinary research laboratory dedicated to understanding how individuals develop the capacity for imagination, abstract thinking, ethical foresight, and innovation in the Age of Artificial Intelligence.",

  vision:
    "To create the world’s leading research and development laboratory dedicated to cultivating human imagination, ethical reflection, and creative consciousness in the era of artificial intelligence.",
  visionMission:
    "The long-term mission is to build evidence-based educational and organizational systems capable of preparing future generations to thrive in what Langer defines as the",

  mission: [
    "Develop scientifically validated models of imaginative and reflective development",
    "Investigate how individuals and societies generate transformative ideas",
    "Design scalable educational frameworks that accelerate movement toward advanced imaginative maturity",
    "Integrate humanities, creativity, ethics, and STEM into future learning systems",
    "Prepare future generations to responsibly shape technological, economic, and social transformation",
  ],

  hub: [
    { label: "Cognitive development research", icon: Brain },
    { label: "AI-enhanced education", icon: BrainCircuit },
    { label: "Humanities and STEM integration", icon: Atom },
    { label: "Creativity and imagination science", icon: Sparkles },
    { label: "Reflective practice and leadership", icon: Compass },
    { label: "Organizational innovation studies", icon: Network },
    { label: "Ethics and democratic resilience", icon: Scale },
  ] satisfies IconItem[],

  arc: {
    intro:
      "Grounded in Dr. Arthur Langer’s Fantasy Arc framework, the Institute investigates how people progress from indoctrinated knowledge toward “Abstracts of New Possibilities,” the highest stage of imaginative and reflective maturity, across the lifespan from K-12 through adult and executive education.",
    // Every word here comes from the proposal, the only Langer source this page has. It
    // describes the starting point, Stage 3 and Stage 5 and says nothing about Stages 1, 2
    // and 4, so those carry their number and nothing else. Names for them come from
    // Dr. Langer or not at all: a borrowed scheme was tried and taken out.
    steps: [
      { tag: "Start", name: "Indoctrinated knowledge", detail: "Where the arc begins" },
      { tag: "Stage 1" },
      { tag: "Stage 2" },
      { tag: "Stage 3", detail: "Where institutions become trapped" },
      { tag: "Stage 4" },
      {
        tag: "Stage 5",
        name: "Abstracts of New Possibilities",
        detail: "Generating transformative ideas",
      },
    ],
    principle: "Reflection-Before-Action",
    principleBody:
      "The capacity to envision and evaluate future possibilities prior to implementation. Future societies require it, and it is what Stage 5 makes possible.",
  },

  foundationSource:
    "Revisiting Piaget’s 4 Stages of Development with Creative Fantasy in the Era of AI",
  foundation: [
    {
      title: "Imagination is underdeveloped",
      body: "Modern education overemphasizes technical rationality and STEM while underdeveloping imagination, ethics, and reflective consciousness.",
    },
    {
      title: "Reflection before action",
      body: "Future societies require the capacity to envision and evaluate future possibilities prior to implementation.",
    },
    {
      title: "Stage 5 is the goal",
      body: "Individuals must progress toward Stage 5 of the Fantasy Arc to become fully capable of generating transformative ideas and imaginations.",
    },
    {
      title: "AI as a developmental aid",
      body: "AI systems and “World Models” may eventually support cognitive and reflective development if integrated responsibly into educational systems.",
    },
    {
      title: "Education needs reinvention",
      body: "K-12 and higher education systems require reinvention through integrated humanities, STEM, and creativity curricula.",
    },
  ],

  pillars: [
    {
      title: "The Science of Imaginative Development",
      objective:
        "Develop validated developmental models measuring progression toward imaginative maturity.",
      icon: Brain,
      questions: [
        "How do individuals progress through the Fantasy Arc stages?",
        "What educational experiences accelerate imaginative development?",
        "Can reflective maturity be measured longitudinally?",
        "How does imagination correlate with innovation outcomes?",
      ],
      workLabel: "Activities",
      work: [
        "Longitudinal developmental studies",
        "Cross-cultural cognitive research",
        "AI-supported developmental analytics",
        "Fantasy Arc psychometric instrument development",
        "Neurocognitive studies of imagination and creativity",
      ],
    },
    {
      title: "AI and Reflection-Before-Action",
      objective:
        "Investigate how AI systems can support reflective, ethical, and imaginative cognition.",
      icon: BrainCircuit,
      questions: [
        "How can AI augment imagination rather than replace it?",
        "What AI environments best support Stage 5 development?",
        "Can AI-driven simulations improve foresight and ethical reasoning?",
        "How should “World Models” be integrated into education?",
      ],
      workLabel: "Activities",
      work: [
        "AI tutoring systems",
        "Simulation-based reflective learning",
        "Ethical imagination laboratories",
        "Human-AI collaborative creativity studies",
        "Future scenario generation environments",
      ],
    },
    {
      title: "K-12 Imagination Development",
      objective:
        "Develop educational interventions that begin imaginative development at earlier ages.",
      icon: School,
      questions: [
        "At what developmental stages should imagination curricula begin?",
        "How can fantasy, storytelling, arts, and ethics accelerate abstract thinking?",
        "How do STEM-only environments inhibit creativity?",
        "What school structures best support imaginative maturity?",
      ],
      workLabel: "Initiatives",
      work: [
        "Fantasy Arc K-12 curriculum pilots",
        "Creativity-centered classrooms",
        "AI-assisted storytelling systems",
        "Reflective learning assessments",
        "Arts-humanities-STEM integration models",
        "Pilots in urban public school districts, rural innovation academies, charter and independent schools, and international comparative education sites",
      ],
    },
    {
      title: "Organizational and Societal Innovation Systems",
      objective:
        "Study how societies, governments, universities, and corporations cultivate imagination and innovation.",
      icon: Building2,
      questions: [
        "Why do some societies generate more breakthrough ideas?",
        "How do innovative organizations structure imagination?",
        "What leadership models support future-oriented thinking?",
        "How do institutions become trapped in “Stage 3” development?",
      ],
      workLabel: "Areas of study",
      work: [
        "Innovation ecosystems",
        "National education systems",
        "Corporate creativity cultures",
        "Research university models",
        "Democratic resilience and imagination",
        "Ethical governance of AI",
      ],
    },
    {
      title: "Humanities, Consciousness, and Creativity",
      objective:
        "Explore philosophical, psychological, and artistic foundations of imagination, extending Langer’s mapping of Jung, Rubin, Einstein, and Pythagoreanism onto the Fantasy Arc.",
      icon: Palette,
      questions: [],
      workLabel: "Research areas",
      work: [
        "Jungian active imagination",
        "Reflective practice theory",
        "Pythagorean and cosmic spirituality",
        "Mythology and symbolic cognition",
        "Artistic creativity and transformation",
        "Narrative intelligence",
        "Ethics and meaning-making",
      ],
    },
  ] satisfies Pillar[],

  divisions: [
    {
      name: "Laboratory for Cognitive and Imaginative Development",
      icon: FlaskConical,
      focus: ["Developmental psychology", "Learning sciences", "Reflective maturity measurement"],
    },
    {
      name: "AI Futures and Human Development Institute",
      icon: BrainCircuit,
      focus: ["AI-enhanced cognition", "Human-AI creativity systems", "Ethical foresight"],
    },
    {
      name: "K-12 Innovation Studio",
      icon: School,
      focus: ["Curriculum development", "Teacher training", "School transformation"],
    },
    {
      name: "Organizational Imagination Lab",
      icon: Lightbulb,
      focus: ["Leadership development", "Corporate innovation", "Institutional redesign"],
    },
    {
      name: "Humanities and Consciousness Research Center",
      icon: BookOpen,
      focus: ["Philosophy", "Creativity", "Ethics", "Consciousness studies"],
    },
  ] satisfies Division[],

  audiences: [
    {
      name: "K-12",
      icon: School,
      items: [
        "Fantasy Arc curriculum modules",
        "Creativity assessments",
        "AI-enhanced reflective learning systems",
        "Teacher certification programs",
      ],
    },
    {
      name: "Higher education",
      icon: GraduationCap,
      items: [
        "Graduate degrees in Imagination Studies",
        "Executive education",
        "AI and reflective leadership programs",
      ],
    },
    {
      name: "Corporate education",
      icon: Briefcase,
      items: [
        "Innovation leadership programs",
        "Reflective decision-making systems",
        "Creativity acceleration labs",
      ],
    },
  ] satisfies Audience[],

  outcomes: [
    {
      area: "Scientific",
      icon: FlaskConical,
      items: [
        "Validated Fantasy Arc assessment systems",
        "New developmental theories",
        "Longitudinal imagination studies",
        "AI-human creativity frameworks",
      ],
    },
    {
      area: "Educational",
      icon: GraduationCap,
      items: [
        "Improved abstract reasoning",
        "Enhanced creativity metrics",
        "Better interdisciplinary thinking",
        "Increased innovation capacity",
      ],
    },
    {
      area: "Economic",
      icon: TrendingUp,
      items: [
        "Future workforce development",
        "Entrepreneurial acceleration",
        "Innovation ecosystem growth",
        "AI-era leadership pipelines",
      ],
    },
    {
      area: "Societal",
      icon: Landmark,
      items: [
        "Greater democratic resilience",
        "Stronger ethical reasoning",
        "Reduced susceptibility to manipulation",
        "Enhanced civic imagination",
      ],
    },
  ] satisfies Outcome[],

  closing:
    "The emergence of AI and accelerated technological change requires a transformation in how societies educate human beings. Current systems optimized primarily for technical proficiency are insufficient for cultivating the imaginative, ethical, and reflective capacities required in the “Imagination Age.”",
};

export default page;
