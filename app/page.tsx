import Image from "next/image";
import Link from "next/link";
import { Eyebrow, PrimaryButton, SecondaryButton } from "@/components/Brand";
import CountUp from "@/components/CountUp";
import FadeIn from "@/components/FadeIn";
import PartnerWall from "@/components/PartnerWall";
import ServiceCard from "@/components/ServiceCard";
import { HOME_PROSE } from "@/content/home-prose";
import { CONSULTING_TO_HIRE, IMPACT, OTHER_SERVICES } from "@/content/home-sections";
import { PARTNERSHIPS } from "@/content/partnerships";
import { ORG, TAGLINE } from "@/lib/brand";

const APPROACH = [
  {
    step: "Recruit the best",
    body: "We identify high-potential individuals using a rigorous, research-backed screening process.",
  },
  {
    step: "Train & mentor",
    body: "Our programs develop both the hard and soft skills needed to thrive, with dedicated mentorship.",
  },
  {
    step: "Employ & manage",
    body: "We provide a supportive structure and a dedicated Client Service Manager for a seamless transition.",
  },
  {
    step: "Deliver value",
    body: "The result is a fully prepared professional who integrates faster and delivers lasting value.",
  },
];

/**
 * The four HOME_PROSE blocks are now placed individually rather than mapped, because
 * they no longer sit in one run: Our History moved down to introduce the partner wall.
 *
 * Throws rather than returning undefined. A heading renamed in content/home-prose.ts
 * should fail the build naming the heading, not render a section with no copy in it.
 */
function prose(heading: string) {
  const section = HOME_PROSE.find((s) => s.heading === heading);
  if (!section) throw new Error(`content/home-prose.ts has no section "${heading}"`);
  return section;
}

/** The two-column prose block, used by sections 3 and 4. */
function ProseSection({ heading, tint }: { heading: string; tint?: boolean }) {
  const section = prose(heading);
  return (
    <section className={tint ? "bg-surface-tint py-20" : "py-20"}>
      <FadeIn className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow label={section.heading} />
          <h2 className="font-heading text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] text-ink md:text-[38px]">
            {section.heading}
          </h2>
        </div>
        <div className="text-[17px] leading-[1.65] text-ink-muted">
          {section.body.map((para, i) => (
            <p key={i} className={i === 0 ? "" : "mt-5"}>
              {para}
            </p>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* 1. Hero. The section keeps its slate fill under the photograph, so a failed
             image load lands on exactly the design this page had before, and the white
             text is measured against slate rather than against whatever the photo does.
             §7 sanctions bg-surface-deep/85 for legibility over an image, and at 85 the
             photograph is not legible content, it is invisible: the band rendered
             indistinguishable from the flat slate it replaced. 70 was measured rather
             than eyeballed. Sampling the composited pixels behind the text block, the
             99th percentile brightest gives white 4.99:1 at /70 and 4.47:1 at /65, so 70
             is the last stop that clears 4.5:1 for the 11px eyebrow, which is the
             smallest text here and therefore the binding constraint.
             object-top because the faces sit in the upper half and a centre crop cuts
             them, which is the same crop-anchoring note §7 records for this photograph. */}
      <section className="relative bg-surface-dark text-white">
        <Image
          src="/images/171206_4700_cropped-scaled-1-1.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-surface-deep/70" />
        <span className="absolute left-0 top-0 z-10 h-[3px] w-20 bg-action" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-28 md:pb-32 md:pt-32">
          <p className="mb-4 font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
            {ORG}
          </p>
          <h1 className="max-w-4xl font-heading text-[42px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[68px]">
            {TAGLINE}
          </h1>
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton href="/contact">Schedule a free consultation</PrimaryButton>
            <SecondaryButton href="/our-story" dark>
              Our story
            </SecondaryButton>
          </div>
        </div>
      </section>

      {/* 2. Our impact, moved up from position seven. It is the strongest thing the page
             has and it used to sit below six screens of prose. As a tight band directly
             under the hero it reads as proof, and it gives the dark hero a light section
             to land on. Not wrapped in FadeIn: it is above the fold.
             On tint the labels go to ink and the notes to ink-muted; red stays on the
             rules only, since it never carries small text on either surface. */}
      <section className="bg-surface-tint py-12">
        <div className="mx-auto max-w-6xl px-6">
          <ul className="m-0 grid list-none grid-cols-1 gap-10 p-0 md:grid-cols-3 md:gap-16">
            {IMPACT.map((stat) => (
              <li key={stat.label}>
                <CountUp
                  value={stat.value}
                  className="block font-heading text-[52px] font-semibold leading-none tracking-[-0.03em] text-ink md:text-[64px]"
                />
                <span className="mt-4 block h-0.5 w-10 bg-accent" />
                <p className="mt-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
                  {stat.label}
                </p>
                {stat.note && (
                  <p className="mt-2 text-[14px] leading-[1.5] text-ink-muted">{stat.note}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 and 4. */}
      <ProseSection heading="The WOS Business Solution" />
      <ProseSection heading="Our Unique Method and Solution" tint />

      {/* 5. Our Services. py-24 rather than py-20: it is the largest block on the page
             and DESIGN.md §5 asks for a rhythm rather than a uniform one. */}
      <section className="py-24">
        <FadeIn className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Our services" />
          <h2 className="max-w-3xl font-heading text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] text-ink md:text-[38px]">
            Our Services
          </h2>
          {prose("Our Services").body.map((para, i) => (
            <p key={i} className="mt-6 max-w-3xl text-[17px] leading-[1.65] text-ink-muted">
              {para}
            </p>
          ))}

          {/* Subordinate to "Our Services": these are the two groupings inside it, not
              two more sections. An eyebrow with the accent rule sets them a clear level
              below the h2 without shrinking them into captions. */}
          <div className="mt-16">
            <Eyebrow label="Consulting to Hire Services" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {CONSULTING_TO_HIRE.map((card) => (
              <ServiceCard key={card.href} card={card} />
            ))}
          </div>

          <div className="mt-14">
            <Eyebrow label="Other Services" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {OTHER_SERVICES.map((card) => (
              <ServiceCard key={card.href} card={card} />
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 6. Partnerships and centers. Three unlike things: a live partnership with a page
             behind it, a center whose site is not deployed, and a proposal. The status
             label above each one is what keeps that honest, and it is why these are three
             columns of type rather than three identical cards.
             No Hunter logo here. It is purple and would not read on slate; it lives
             on the white tiles of the academic partner wall and on its own page. */}
      <section className="bg-surface-dark py-24">
        <FadeIn className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Partnerships and centers" dark />
          <h2 className="max-w-3xl font-heading text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] text-white md:text-[38px]">
            What we are building next
          </h2>
          <ul className="m-0 mt-14 grid list-none grid-cols-1 gap-12 p-0 md:grid-cols-3 md:gap-10">
            {PARTNERSHIPS.map((item) => (
              <li key={item.title}>
                <span className="block h-0.5 w-6 bg-accent" />
                <p className="mt-3 font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
                  {item.status}
                </p>
                <h3 className="mt-3 font-heading text-[20px] font-semibold leading-[1.25] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-white/75">{item.body}</p>
                {/* Red is 2.8:1 on slate, so the link is white and carries an underline
                    to stay distinguishable from the body copy without colour. */}
                {item.href && (
                  <Link
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={
                      item.external ? `${item.title} (opens in a new tab)` : undefined
                    }
                    className="mt-5 inline-block font-heading text-[15px] font-semibold text-white underline underline-offset-[5px] hover:no-underline"
                  >
                    {item.external ? "Visit the Center" : "Read more"}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      {/* 7. Our approach. White rather than tint: its tiles are slate, and a tinted
             section holding dark tiles directly under the dark section above would read
             as two dark blocks with a grey seam between them. */}
      <section className="py-20">
        <FadeIn className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Our approach" />
          {/* One continuous slate band split by hairlines, as on the live page. Four
              separate cards would read as four unrelated things rather than a sequence. */}
          <ol className="m-0 grid list-none grid-cols-1 gap-px bg-hairline-strong p-0 md:grid-cols-4">
            {APPROACH.map((a, i) => (
              <li key={a.step} className="bg-surface-dark px-6 py-8">
                {/* Red on slate is 2.8:1, so it never carries text. A numeral at 34px
                    is well past the large-text threshold and reads cleanly. */}
                <span className="block font-heading text-[34px] font-semibold leading-none text-action">
                  {i + 1}
                </span>
                <span className="mt-3 block h-0.5 w-6 bg-white/25" />
                <h3 className="mt-4 font-heading text-[14px] font-semibold uppercase tracking-[0.08em] text-white">
                  {a.step}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-white/75">{a.body}</p>
              </li>
            ))}
          </ol>
        </FadeIn>
      </section>

      {/* 8. Our History, merged with the partner wall it used to sit six sections away
             from. The copy names Parsons, J&J, GE, HP, Prudential, BNY Mellon, American
             Airlines and JetBlue, and the wall below shows those marks, so running one
             into the other makes the wall evidence rather than decoration.
             Tinted because the wall's white tiles need a ground; see PartnerWall. */}
      <section className="bg-surface-tint py-20">
        <FadeIn className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Our history" />
          <h2 className="font-heading text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] text-ink md:text-[38px]">
            Our History
          </h2>
          {prose("Our History").body.map((para, i) => (
            <p key={i} className="mt-6 max-w-3xl text-[17px] leading-[1.65] text-ink-muted">
              {para}
            </p>
          ))}
          {/* This line closed the impact band before it moved up. It is a history fact
              rather than an impact figure, and under three numerals it read as a
              footnote to nothing, so it lands here rather than being dropped. */}
          <p className="mt-5 max-w-3xl text-[17px] leading-[1.65] text-ink-muted">
            Founded in 2005 as a 501(c)(3) social enterprise.
          </p>

          <div className="mt-14">
            <Eyebrow label="Corporate partners served" />
          </div>
          <PartnerWall limit={16} muted />
          <div className="mt-8">
            <Link
              href="/corporate-partners"
              className="font-heading text-[15px] font-semibold text-action-deep no-underline hover:text-action-deeper"
            >
              See all corporate partners
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* 9. */}
      <section className="bg-surface-dark py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-heading text-[28px] font-semibold leading-[1.15] tracking-[-0.01em] text-white md:text-[34px]">
            Schedule your free consultation
          </h2>
          <PrimaryButton href="/contact">Get in touch</PrimaryButton>
        </div>
      </section>
    </>
  );
}
