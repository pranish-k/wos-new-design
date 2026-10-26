import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./alternate-home.css";
import { PrimaryButton, SecondaryButton } from "@/components/Brand";
import CountUp from "@/components/CountUp";
import { Arrow, Chapter, Chapters, type Field } from "@/components/alternate-home/Chapter";
import InView from "@/components/alternate-home/InView";
import JourneyScene from "@/components/alternate-home/JourneyScene";
import Motif from "@/components/alternate-home/Motif";
import { HOME_PROSE } from "@/content/home-prose";
import { APPROACH, CONSULTING_TO_HIRE, IMPACT, OTHER_SERVICES, type ServiceCard } from "@/content/home-sections";
import { PARTNERS } from "@/content/partners";
import { PARTNERSHIPS } from "@/content/partnerships";
import { DESCRIPTION } from "@/lib/brand";

/**
 * /alternate-home: the homepage's content in the colour-chapter direction, kept beside
 * the real homepage so the two can be compared on the live site. A design exploration,
 * not a page: it is unlinked, out of the sitemap and not indexed. DESIGN.md §11.
 *
 * Every word, figure and photograph comes from the same content files as `/`.
 */
export const metadata: Metadata = {
  title: "Alternate home",
  robots: { index: false, follow: false },
};

function prose(heading: string) {
  const section = HOME_PROSE.find((s) => s.heading === heading);
  if (!section) throw new Error(`content/home-prose.ts has no section "${heading}"`);
  return section.body.join(" ");
}

/** Split `text` at `marker`, failing the build if the copy no longer contains it. */
function cut(text: string, marker: string): [string, string] {
  const at = text.indexOf(marker);
  if (at < 0) throw new Error(`/alternate-home expected "${marker}" in: ${text.slice(0, 60)}...`);
  return [text.slice(0, at).trim(), text.slice(at + marker.length).trim()];
}

function impact(label: string) {
  const figure = IMPACT.find((s) => s.label === label);
  if (!figure) throw new Error(`content/home-sections.ts has no impact figure "${label}"`);
  return figure;
}

/**
 * Each service is a band of its own colour, assigned here rather than on the records,
 * in an order where no two neighbours match.
 */
const GROUPS: { title: string; items: ServiceCard[]; fields: Field[] }[] = [
  { title: "Consulting to Hire Services", items: CONSULTING_TO_HIRE, fields: ["slate", "crimson", "deep"] },
  { title: "Other Services", items: OTHER_SERVICES, fields: ["deep", "slate", "crimson"] },
];

const PANEL_FIELDS: Field[] = ["slate", "crimson", "tint"];

/** Clients Our History names, or their neighbours on the partner wall, with a logo on file. */
const CLIENT_NAMES = [
  "HP", "BNY Mellon", "American Airlines", "Eaton Corporation", "Eversource", "Bristol Myers Squibb",
  "Chubb", "Guardian Life Insurance", "HBO", "Mount Sinai Health System", "Panasonic", "Fannie Mae",
];
const CLIENT_LOGOS = CLIENT_NAMES.map((name) => {
  const logo = PARTNERS.find((p) => p.name === name);
  if (!logo) throw new Error(`content/partners.ts has no partner "${name}"`);
  return logo;
});

const WRAP = "mx-auto max-w-[1320px] px-5 md:px-8";
const PAD = "py-20 md:py-28";
const H2 = "font-heading text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[48px]";
const STATEMENT = "font-heading font-semibold leading-[1.15] tracking-[-0.02em]";
const LINK_SHAPE = "inline-flex items-center gap-3 font-heading text-[16px] font-semibold underline-offset-[6px]";
// Links take their field's ink: the site's base link colour is action-deep, which is
// unreadable on the crimson and red fields.
const LINK = `${LINK_SHAPE} text-[var(--field-ink)]`;
const LEAD = "text-[22px] leading-[1.5]";
const BODY = "text-[18px] leading-[1.65]";
const i = (n: number) => ({ ["--i" as string]: n });

export default function AlternateHome() {
  // The Business Solution paragraph turns on four words. Set as type they carry the
  // argument, so the sentence that lists them is split around them.
  const [solutionLead, solutionRest] = cut(
    prose("The WOS Business Solution"),
    "The decision typically comes down to a question of culture, cost, control, and continuity.",
  );

  // The Method paragraph is three ideas run together. The first stays prose; the other
  // two are lists inside a sentence, and are set as lists.
  const [methodLead] = cut(prose("Our Unique Method and Solution"), "WOS finds talent");
  const [historyLead, historyClients] = cut(prose("Our History"), "We have over 85 clients including");

  const careers = impact("Careers impacted");
  const partners = impact("Corporate partners");
  const locations = impact("Locations");
  const countries = (locations.note ?? "").split(/,\s*|\s*&\s*/);

  return (
    <Chapters>
      {/* 1. Opening, on the signature gradient. The tagline runs the full width in
             capitals; the supporting copy and the photograph share the row beneath. */}
      <Chapter field="gradient" className="overflow-clip">
        <div className={`${WRAP} pt-14 md:pt-20`}>
          <h1 className="font-heading text-[clamp(34px,5vw,72px)] font-bold uppercase leading-[1.02] tracking-[-0.02em]">
            <span className="alt-mask-line" style={i(0)}>
              <span>We find, develop,</span>
            </span>
            <span className="alt-mask-line" style={i(1)}>
              <span>and convert talent</span>
            </span>
            <span className="alt-mask-line" style={i(2)}>
              <span className="text-wos-red">from local communities.</span>
            </span>
          </h1>
          <div className="mt-10 grid items-center gap-10 md:mt-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14">
            <div className="alt-rise-in md:pb-10" style={{ ["--delay" as string]: "480ms" }}>
              <p className={`max-w-[44ch] ${BODY} text-white/80`}>{DESCRIPTION}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryButton href="/contact" size="lg">
                  Schedule a free consultation
                </PrimaryButton>
                <SecondaryButton href="/our-story" dark>
                  Our story
                </SecondaryButton>
              </div>
            </div>
            <div className="relative">
              <Motif
                className="absolute -left-12 -top-14 z-10 hidden h-[120px] w-[120px] md:block"
                firstFill="fill-white"
              />
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/171206_4700_cropped-scaled-1-1.jpg"
                  alt="Three people on a panel at a WOS event, one speaking into a microphone"
                  fill
                  priority
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </Chapter>

      {/* 2. Impact, as one sentence with the figures inside it. */}
      <Chapter field="tint" label="Our impact">
        <div className={`${WRAP} grid gap-10 py-16 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:gap-16 md:py-20`}>
          <p className={`${STATEMENT} text-[clamp(30px,3.6vw,50px)]`}>
            Since 2005, <CountUp value={careers.value} className="text-action-deeper" /> careers impacted, with{" "}
            <CountUp value={partners.value} className="text-action-deeper" /> corporate partners, in{" "}
            <CountUp value={locations.value} className="text-action-deeper" /> countries.
          </p>
          <ul className="m-0 list-none p-0 font-heading text-[20px] font-semibold">
            {countries.map((c) => (
              <li key={c} className="border-t-2 border-wos-red py-2.5">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Chapter>

      {/* 3. The business solution and the method. Headings run the full width so they
             hold to two lines; the copy splits into two columns beneath. */}
      <Chapter field="paper" id="solution">
        <div className={`${WRAP} ${PAD}`}>
          <InView>
            <h2 className={`alt-reveal ${H2}`}>The WOS Business Solution</h2>
            <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-2 md:gap-16">
              <div>
                <p className={`alt-reveal max-w-[38ch] ${LEAD}`} style={i(1)}>
                  {solutionLead}
                </p>
                <p className={`alt-reveal mt-6 max-w-[52ch] ${BODY}`} style={i(2)}>
                  {solutionRest}
                </p>
              </div>
              <div>
                <p className={`alt-reveal ${BODY} text-ink-muted`} style={i(2)}>
                  The decision typically comes down to a question of
                </p>
                <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-x-6 gap-y-4 p-0">
                  {["Culture", "Cost", "Control", "Continuity"].map((w, n) => (
                    <li
                      key={w}
                      className="alt-reveal border-t-4 border-wos-red pt-3 font-heading text-[26px] font-semibold tracking-[-0.02em] lg:text-[34px]"
                      style={i(n + 3)}
                    >
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </InView>

          <InView className="mt-20 md:mt-28">
            <h2 className={`alt-reveal ${H2}`}>Our Unique Method and Solution</h2>
            <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
              <div className="alt-reveal relative aspect-[4/3] w-full overflow-hidden md:aspect-auto" style={i(1)}>
                <Image
                  src="/images/20160527_21_cropped-scaled-1-1.jpg"
                  alt="Participants working at computers in a WOS training classroom"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover object-[35%_50%]"
                />
              </div>
              <div>
                <p className={`alt-reveal max-w-[42ch] ${LEAD}`} style={i(2)}>
                  {methodLead}
                </p>
                <div className="mt-10 grid gap-10 lg:grid-cols-2">
                  <FactList
                    title="Where our talent comes from"
                    items={["Local communities", "College graduates", "Military veterans"]}
                    start={3}
                  />
                  <FactList
                    title="How we help our employees succeed"
                    items={[
                      "Professional development and technical training",
                      "Paid part-time college tuition",
                      "Special financial assistance where needed",
                    ]}
                    start={6}
                  />
                </div>
              </div>
            </div>
          </InView>
        </div>
      </Chapter>

      {/* 4. The one sentence that explains the model, given a chapter of its own, with
             the arrows on the other side so the statement has a partner, not a void. */}
      <Chapter field="red" className="overflow-clip" label="Why conversion works">
        <InView className={`${WRAP} grid items-center gap-10 py-20 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:py-24`}>
          <p className={`alt-reveal ${STATEMENT} text-[clamp(30px,3.8vw,54px)]`}>
            Upon conversion to employment, our consultants already know your business and culture.
          </p>
          <Motif
            draw={false}
            className="pointer-events-none mx-auto hidden h-auto w-full max-w-[300px] md:block"
            firstFill="fill-surface-deep"
            secondFill="fill-white"
          />
        </InView>
      </Chapter>

      {/* 5. Services, as full-width bands of colour that alternate their picture side.
             Edge to edge rather than inset: inset, six coloured blocks read as a stack
             of cards; full bleed, they read as chapters inside the chapter. */}
      <Chapter field="paper" id="services">
        <div className={`${WRAP} pb-12 pt-20 md:pb-14 md:pt-28`}>
          <InView>
            <h2 className={`alt-reveal ${H2}`}>Our Services</h2>
            <p className={`alt-reveal mt-6 max-w-[68ch] ${BODY}`} style={i(1)}>
              {prose("Our Services")}
            </p>
          </InView>
        </div>

        {GROUPS.map((group, g) => (
          <div key={group.title}>
            <h3 className={`${WRAP} pb-5 font-heading text-[20px] font-semibold text-ink-muted ${g ? "pt-12" : ""}`}>
              {group.title}
            </h3>
            <ul className="m-0 list-none p-0">
              {group.items.map((s, n) => (
                <li key={s.href} className={`alt-field alt-field-${group.fields[n]}`}>
                  <Link
                    href={s.href}
                    className={`group grid items-stretch text-[var(--field-ink)] no-underline md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${
                      n % 2 ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* The text's outer edge lines up with the page margin on wide
                        screens, so the bands bleed while their words stay in the grid. */}
                    <div
                      className={`flex flex-col justify-center gap-5 px-5 py-10 md:py-12 ${
                        n % 2
                          ? "md:pl-14 md:pr-8 xl:pr-[calc((100vw-1320px)/2+32px)]"
                          : "md:pl-8 md:pr-14 xl:pl-[calc((100vw-1320px)/2+32px)]"
                      }`}
                    >
                      <h4 className="font-heading text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] lg:text-[40px]">
                        {s.label}
                      </h4>
                      <span className={`${LINK} group-hover:underline`}>
                        Explore <Arrow />
                      </span>
                    </div>
                    <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[280px]">
                      <Image
                        src={s.image}
                        alt={s.imageAlt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-fade)] group-hover:scale-[1.03]"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Chapter>

      {/* 6. Partnerships and centers, side by side. What each one is (a partnership, a
             center, an institute) closes the panel rather than labelling it from above.
             The Center's Teachers College credit is the sanctioned one, DESIGN.md §0. */}
      <Chapter field="slate" id="partnerships" label="Partnerships and centers">
        <ul className="m-0 grid list-none p-0 lg:grid-cols-3">
          {PARTNERSHIPS.map((p, n) => (
            <li key={p.title} className={`alt-field alt-field-${PANEL_FIELDS[n]} flex`}>
              <InView className="flex w-full flex-col justify-between gap-10 px-5 py-14 md:px-10 md:py-16">
                <div>
                  <h2 className="alt-reveal font-heading text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[30px]">
                    {p.title}
                  </h2>
                  <p className={`alt-reveal mt-4 max-w-[46ch] ${BODY}`} style={i(1)}>
                    {p.body}
                  </p>
                </div>
                <div className="alt-reveal flex flex-wrap items-baseline justify-between gap-4" style={i(2)}>
                  <span className="text-[15px] text-[var(--field-muted)]">{p.status}</span>
                  {p.href && (
                    <Link
                      href={p.href}
                      {...(p.external
                        ? { target: "_blank", rel: "noopener noreferrer", "aria-label": `${p.title} (opens in a new tab)` }
                        : {})}
                      className={`${LINK} underline hover:no-underline`}
                    >
                      {p.external ? "Visit the Center" : "Read more"}
                    </Link>
                  )}
                </div>
              </InView>
            </li>
          ))}
        </ul>
      </Chapter>

      {/* 7. The approach, as the page's one pinned scene. */}
      <Chapter field="deep" id="approach">
        <JourneyScene steps={APPROACH} />
      </Chapter>

      {/* 8. History, beside the people it is about, with the partners it names below. */}
      <Chapter field="tint" id="history">
        <div className={`${WRAP} ${PAD}`}>
          <InView className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-center md:gap-16">
            <div>
              <h2 className={`alt-reveal ${H2}`}>Our History</h2>
              <p className={`alt-reveal mt-6 ${LEAD}`} style={i(1)}>
                {historyLead}
              </p>
              <p className={`alt-reveal mt-5 ${BODY}`} style={i(2)}>
                We have over 85 clients including {historyClients}
              </p>
            </div>
            <div className="alt-reveal relative aspect-[16/10] w-full overflow-hidden" style={i(1)}>
              <Image
                src="/images/Cohort_2024.jpg"
                alt="The 2024 WOS cohort standing together in front of a mural"
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover object-[50%_45%]"
              />
            </div>
          </InView>

          <InView as="ul" className="m-0 mt-12 grid list-none grid-cols-2 gap-1 p-0 sm:grid-cols-3 md:mt-16 lg:grid-cols-6">
            {CLIENT_LOGOS.map((logo, n) => (
              <li key={logo.src} className="alt-reveal flex h-24 items-center justify-center bg-white p-5" style={i(n % 6)}>
                <Image src={logo.src} alt={logo.name} width={200} height={80} className="max-h-11 w-auto max-w-full object-contain" />
              </li>
            ))}
          </InView>
          <Link href="/corporate-partners" className={`${LINK_SHAPE} mt-8 text-action-deeper hover:underline`}>
            See all corporate partners <Arrow />
          </Link>
        </div>
      </Chapter>

      {/* 9. The close, back on the gradient. -mb-20 cancels the Footer's mt-20 on this
             page only, so the gradient meets the footer instead of leaving a white strip:
             every chapter here runs edge to edge. */}
      <Chapter field="gradient" id="contact" className="-mb-20 overflow-clip">
        <InView className={`${WRAP} grid items-center gap-10 py-20 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:py-28`}>
          <div>
            <h2 className="alt-reveal font-heading text-[clamp(36px,4.6vw,64px)] font-semibold leading-[1.08] tracking-[-0.025em]">
              Schedule your free consultation
            </h2>
            <div className="alt-reveal mt-8" style={i(1)}>
              <PrimaryButton href="/contact" size="lg">
                Get in touch
              </PrimaryButton>
            </div>
          </div>
          <Motif
            draw={false}
            className="pointer-events-none hidden h-auto w-full max-w-[260px] justify-self-end md:block"
            firstFill="fill-white"
          />
        </InView>
      </Chapter>
    </Chapters>
  );
}

function FactList({ title, items, start }: { title: string; items: string[]; start: number }) {
  return (
    <div>
      <h3 className="alt-reveal font-heading text-[16px] font-semibold text-ink-muted" style={i(start)}>
        {title}
      </h3>
      <ul className="m-0 mt-3 list-none p-0">
        {items.map((item, n) => (
          <li
            key={item}
            className="alt-reveal border-t-2 border-wos-red py-3 font-heading text-[20px] font-semibold leading-snug"
            style={i(start + n + 1)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
