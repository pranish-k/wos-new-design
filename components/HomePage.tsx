import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  CloseChapter,
  FactList,
  PAD,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
  ServiceBands,
  TextLink,
  TYPE,
  WRAP,
  stagger,
} from "@/components/Brand";
import { Chapter, Chapters } from "@/components/Chapter";
import CountUp from "@/components/CountUp";
import FacesReel from "@/components/FacesReel";
import Globe from "@/components/Globe";
import InView from "@/components/InView";
import JourneyScene from "@/components/JourneyScene";
import Motif from "@/components/Motif";
import PartnerMarquee from "@/components/PartnerMarquee";
import VideoEmbed from "@/components/VideoEmbed";
import { HOME_FEATURE } from "@/content/ai-institute";
import { APPROACH, CONSULTING_TO_HIRE, IMPACT, OTHER_SERVICES } from "@/content/home-sections";
import { PARTNERSHIPS } from "@/content/partnerships";
import { POSTS } from "@/content/posts";
import { CHANNEL_URL, OVERVIEW, PARTNER_STORIES } from "@/content/videos";
import { DESCRIPTION } from "@/lib/brand";
import { CONVERSION, METHOD, SOLUTION, prose } from "@/lib/home-copy";

function impact(label: string) {
  const figure = IMPACT.find((s) => s.label === label);
  if (!figure) throw new Error(`content/home-sections.ts has no impact figure "${label}"`);
  return figure;
}

/**
 * All six services as one run of bands. The two groups they fall into are menu headings
 * and stay in the menu; without a label between them the run is one sequence of fields,
 * so bandFields keeps neighbours apart and ends it on crimson.
 */
const SERVICES = [...CONSULTING_TO_HIRE, ...OTHER_SERVICES].map((s) => ({
  href: s.href,
  title: s.label,
  image: s.image,
  imageAlt: s.imageAlt,
}));

const longDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

/**
 * The partnerships, then the newest posts, in one list beside the Institute. The
 * partnerships lead because the newest post is from May 2025, and a list that opened on
 * it would read as a site nobody updates. They carry their status rather than a date
 * because neither has one on record.
 */
const NEWS = [
  ...PARTNERSHIPS.map((p) => ({
    key: p.title,
    meta: p.status,
    date: null,
    title: p.title,
    body: p.body,
    href: p.href,
    external: Boolean(p.external),
  })),
  ...[...POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2)
    .map((p) => ({ key: p.slug, meta: null, date: p.date, title: p.title, body: null, href: `/${p.slug}`, external: false })),
];

type NewsItem = (typeof NEWS)[number];

/** A news item is a link when it has somewhere to go; a named, unlinked one is text. */
function NewsLink({ item, children }: { item: NewsItem; children: ReactNode }) {
  const box = "group block py-5 text-[var(--field-ink)] no-underline hover:text-[var(--field-ink)]";
  if (!item.href) return <div className="py-5">{children}</div>;
  return (
    <Link href={item.href} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={box}>
      {children}
    </Link>
  );
}

const i = stagger;

/**
 * Trims the first line's leading above the cap height and the last line's below the
 * baseline, so a paragraph beside a picture starts level with the picture's top edge.
 */
const TRIM = "[text-box:trim-both_cap_alphabetic]";

/**
 * The homepage, shared by `/` and `/announcements-demo` so the demo is the real page
 * rather than a copy of it that drifts.
 *
 * Two slots and no more, because they are the only two places the demo puts anything
 * inside the page; everything else it shows sits around it. `/` passes neither, and an
 * empty slot renders nothing.
 *
 * Every word, figure and photograph comes from the content files. Dense copy is set as
 * structure rather than cut: lists inside sentences become lists, and the impact figures
 * sit inside one sentence.
 */
export default function HomePage({
  heroNotice,
  afterImpact,
}: {
  /** Sits under the hero buttons, on the opening. */
  heroNotice?: ReactNode;
  /** A full chapter between the impact figures and the business solution. */
  afterImpact?: ReactNode;
}) {
  const careers = impact("Careers impacted");
  const partners = impact("Corporate partners");
  const locations = impact("Locations");
  const countries = (locations.note ?? "").split(/,\s*|\s*&\s*/);

  return (
    <Chapters>
      {/* 1. Opening, on deep. The copy holds the left column on solid field; the right
             is the faces reel, real moments from the WOS film drifting in three columns,
             so the first screen is full of people and no copy sits on a photograph.
             Deep rather than the gradient because the reel covers the side where the
             gradient's red would sit. The left padding lines the copy up with the page
             grid (WRAP) while the reel runs to the screen edge. */}
      <Chapter field="deep" className="overflow-clip">
        <div className="grid md:min-h-[min(46rem,calc(100svh-5rem))] md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="flex flex-col justify-center gap-10 px-5 pb-12 pt-14 md:py-20 md:pl-8 md:pr-12 wrap:pl-[calc((100vw-82.5rem)/2+2rem)]">
            <h1 className="font-heading text-display font-bold uppercase">
              <span className="mask-line" style={i(0)}>
                <span>We find, develop,</span>
              </span>
              <span className="mask-line" style={i(1)}>
                <span>and convert talent</span>
              </span>
              <span className="mask-line" style={i(2)}>
                <span className="text-wos-red">from local communities.</span>
              </span>
            </h1>
            <div className="rise-in" style={{ ["--delay" as string]: "480ms" }}>
              <p className={`max-w-[44ch] ${TYPE.body} text-[var(--field-muted)]`}>{DESCRIPTION}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryButton href="/contact" size="lg">
                  Schedule a free consultation
                </PrimaryButton>
                <SecondaryButton href="/our-story" size="lg">
                  Our story
                </SecondaryButton>
              </div>
              {heroNotice}
            </div>
          </div>
          <FacesReel className="relative h-[30rem] md:h-auto" />
        </div>
      </Chapter>

      {/* 2. Impact. The sentence set as three statements, each figure in red with what
             it counts, beside a globe of the four countries. Every word is the live
             sentence's own: the year becomes the label and each clause a line. The
             country list is what a screen reader gets, since the globe is hidden from
             it, and each name's square turns red as that country's pin lands. */}
      <Chapter field="tint" label="Our impact">
        <div className={`${WRAP} grid items-center gap-10 py-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:py-14`}>
          <InView>
            <p className={`reveal ${TYPE.label}`}>Since 2005</p>
            <ul className="m-0 mt-4 grid list-none gap-3 p-0">
              {[
                { figure: careers, words: "careers impacted" },
                { figure: partners, words: "corporate partners" },
                { figure: locations, words: "countries" },
              ].map(({ figure, words }, n) => (
                <li key={words} className={`reveal ${TYPE.h2}`} style={i(n + 1)}>
                  <CountUp value={figure.value} className="font-bold text-action-deeper" /> {words}
                </li>
              ))}
            </ul>
            <ul className={`reveal m-0 mt-10 flex list-none flex-wrap gap-x-8 gap-y-3 p-0 ${TYPE.item}`} style={i(4)}>
              {countries.map((c) => (
                <li key={c} data-globe-country={c} data-lit="" className="group flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 flex-none bg-hairline-strong transition-colors duration-500 group-data-lit:bg-wos-red"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </InView>
          <Globe countries={countries} />
        </div>
      </Chapter>

      {afterImpact}

      {/* 3. The business solution and the method. The overview film leads the solution
             at its largest, the paragraph beside it as written; the method's photograph
             leads it the other way, its paragraph and two lists beside. The paragraphs
             share one size, and each starts level with the top of its picture. The film
             carries no summary or title: both restated the opening. */}
      <Chapter field="paper" id="solution">
        <div className={`${WRAP} ${PAD}`}>
          <InView>
            <h2 className={`reveal ${TYPE.h2}`}>The WOS Business Solution</h2>
            <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16">
              <div className="reveal" style={i(1)}>
                <VideoEmbed video={OVERVIEW} sizes="(min-width: 768px) 55vw, 100vw" />
              </div>
              <p className={`reveal max-w-[42ch] ${TYPE.lead} ${TRIM}`} style={i(1)}>
                {SOLUTION}
              </p>
            </div>
          </InView>

          <InView className="mt-20 md:mt-28">
            <h2 className={`reveal ${TYPE.h2}`}>Our Unique Method and Solution</h2>
            <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
              <div
                className="reveal relative aspect-[16/10] w-full overflow-hidden bg-surface-tint md:aspect-auto md:h-full"
                style={i(1)}
              >
                <Image
                  src={METHOD.photo.src}
                  alt={METHOD.photo.alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className={`reveal max-w-[42ch] ${TYPE.lead} ${TRIM}`} style={i(2)}>
                  {METHOD.lead}
                </p>
                <div className="mt-10 grid gap-2 lg:grid-cols-2">
                  <FactList title={METHOD.talent.title} items={METHOD.talent.items} start={3} />
                  <FactList title={METHOD.support.title} items={METHOD.support.items} start={4} />
                </div>
              </div>
            </div>
          </InView>
        </div>
      </Chapter>

      {/* 4. The one sentence that explains the model, given a chapter of its own, with
             the arrows on the other side so the statement has a partner, not a void. It
             is lifted out of the method paragraph above rather than repeated from it. */}
      <Chapter field="red" className="overflow-clip" label="Why conversion works">
        <InView className={`${WRAP} grid items-center gap-10 py-20 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:py-24`}>
          <p className={`reveal ${TYPE.h2}`}>{CONVERSION}</p>
          <Motif
            className="pointer-events-none mx-auto hidden h-auto w-full max-w-[300px] md:block"
            firstFill="fill-surface-deep"
            secondFill="fill-white"
          />
        </InView>
      </Chapter>

      {/* 5. What a client can buy, straight after the promise: the conversion statement
             is why to buy, and these are the ways to buy it. Full-width bands of colour
             that alternate their picture side. */}
      <Chapter field="paper" id="services">
        <InView className={`${WRAP} pb-12 pt-20 md:pb-14 md:pt-28`}>
          <SectionHeading intro={prose("Our Services")}>Our Services</SectionHeading>
        </InView>
        <ServiceBands items={SERVICES} />
      </Chapter>

      {/* 6. How any of them runs, stage by stage. */}
      <Chapter field="deep" id="approach">
        <JourneyScene steps={APPROACH} />
      </Chapter>

      {/* 7. Who trusts WOS: every named partner drifting past, four at a time, then three
             of them in their own words. */}
      <Chapter field="tint" id="partners">
        <div className={`${WRAP} ${PAD}`}>
          <PartnerMarquee />

          <InView className="mt-20 md:mt-28">
            <h2 className={`reveal ${TYPE.h2}`}>Partner stories</h2>
          </InView>
          <InView as="ul" className="m-0 mt-10 grid list-none gap-10 p-0 md:mt-12 md:grid-cols-3 md:gap-8">
            {PARTNER_STORIES.map((video, n) => (
              <li key={video.id} className="reveal" style={i(n)}>
                <VideoEmbed video={video} sizes="(min-width: 768px) 33vw, 100vw" />
                <h3 className={`mt-5 ${TYPE.h4}`}>{video.title}</h3>
                <p className={`mt-2 ${TYPE.body} text-[var(--field-muted)]`}>{video.summary}</p>
              </li>
            ))}
          </InView>
          {/* Under the videos, where someone who wants more is looking. It opens the
              WOS YouTube channel in a new tab. */}
          <TextLink href={CHANNEL_URL} className="mt-10 md:mt-12">
            All Videos
          </TextLink>
        </div>
      </Chapter>

      {/* 8. What is new, as one thing: the Institute leads under its own name, then the
             partnerships and the newest posts as one list. The Center's Teachers College
             credit is the sanctioned one, DESIGN.md §0. */}
      <Chapter field="paper" id="whats-new">
        <div className={`${WRAP} ${PAD}`}>
          <InView>
            <h2 className={`reveal ${TYPE.h2}`}>What’s new at WOS</h2>
          </InView>
          <div className="mt-10 grid gap-12 md:mt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <InView className="self-start bg-[var(--field-panel)] px-6 py-10 md:px-12 md:py-14">
              <p className={`reveal ${TYPE.label}`}>{HOME_FEATURE.label}</p>
              <h3 className={`reveal mt-4 max-w-[22ch] text-balance ${TYPE.h2}`} style={i(1)}>
                {HOME_FEATURE.name}
              </h3>
              <p className={`reveal mt-6 max-w-[34ch] ${TYPE.lead}`} style={i(2)}>
                {HOME_FEATURE.headline}
              </p>
              <p className={`reveal mt-4 max-w-[52ch] ${TYPE.body} text-[var(--field-muted)]`} style={i(3)}>
                {HOME_FEATURE.body}
              </p>
              <div className="reveal mt-10" style={i(4)}>
                <TextLink href={HOME_FEATURE.href}>{HOME_FEATURE.cta}</TextLink>
              </div>
            </InView>
            <InView>
              <ul className="m-0 list-none p-0">
                {NEWS.map((item, n) => (
                  <li key={item.key} className="reveal border-t-2 border-[var(--field-rule)]" style={i(n + 1)}>
                    <NewsLink item={item}>
                      <p className={`m-0 ${TYPE.small} text-[var(--field-muted)]`}>
                        {item.date ? <time dateTime={item.date}>{longDate(item.date)}</time> : item.meta}
                      </p>
                      <p className={`m-0 mt-1.5 ${TYPE.item} underline-offset-[5px] group-hover:underline`}>
                        {item.title}
                        {item.external && <span className="sr-only"> (opens in a new tab)</span>}
                      </p>
                      {item.body && <p className={`m-0 mt-2 ${TYPE.body} text-[var(--field-muted)]`}>{item.body}</p>}
                    </NewsLink>
                  </li>
                ))}
              </ul>
              <div className="reveal mt-4 flex justify-end" style={i(NEWS.length + 1)}>
                <TextLink href="/blog">All news</TextLink>
              </div>
            </InView>
          </div>
        </div>
      </Chapter>

      {/* 9. The close, back on the gradient, meeting the footer. */}
      <CloseChapter title="Schedule your free consultation" href="/contact" action="Get in touch" />
    </Chapters>
  );
}
