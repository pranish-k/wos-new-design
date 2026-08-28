import Link from "next/link";
import { Eyebrow, PrimaryButton, SecondaryButton } from "@/components/Brand";
import PartnerWall from "@/components/PartnerWall";
import CountUp from "@/components/CountUp";
import ServiceCard from "@/components/ServiceCard";
import { CONSULTING_TO_HIRE, IMPACT, OTHER_SERVICES } from "@/content/home-sections";
import { HOME_PROSE } from "@/content/home-prose";
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

export default function Home() {
  return (
    <>
      <section className="relative bg-surface-dark text-white">
        <span className="absolute left-0 top-0 h-[3px] w-20 bg-action" />
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-24 md:pb-32 md:pt-32">
          <p className="mb-4 font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
            {ORG}
          </p>
          <h1 className="max-w-4xl font-heading text-[42px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[68px]">
            {TAGLINE}
          </h1>
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton href="/contact">Schedule a free consultation</PrimaryButton>
            <SecondaryButton href="/our-story">Our story</SecondaryButton>
          </div>
        </div>
      </section>

      {/* The live page's four prose sections, word for word. Alternating fill gives
          them rhythm; the live page runs all four as one undifferentiated column. */}
      {HOME_PROSE.filter((s) => s.heading !== "Our Services").map((section, i) => (
        <section
          key={section.heading}
          className={i % 2 === 1 ? "bg-surface-tint py-20" : "py-20"}
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.4fr]">
            <div>
              <Eyebrow label={section.heading} />
              <h2 className="font-heading text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] text-ink md:text-[38px]">
                {section.heading}
              </h2>
            </div>
            <div className="text-[17px] leading-[1.65] text-ink-muted">
              {section.body.map((para, j) => (
                <p key={j} className={j === 0 ? "" : "mt-5"}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Our services" />
          <h2 className="max-w-3xl font-heading text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] text-ink md:text-[38px]">
            Our Services
          </h2>
          {HOME_PROSE.find((s) => s.heading === "Our Services")?.body.map((para, i) => (
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
        </div>
      </section>

      <section className="bg-surface-tint py-20">
        <div className="mx-auto max-w-6xl px-6">
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
        </div>
      </section>

      <section className="bg-surface-dark py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Our impact" dark />
          {/* The live page frames each figure in a bordered white card with a clip-art
              icon above it, which makes three unrelated objects. On slate with no boxes
              the numbers are the section, and the icons are not needed to carry it. */}
          <ul className="m-0 grid list-none grid-cols-1 gap-12 p-0 md:grid-cols-3 md:gap-16">
            {IMPACT.map((stat) => (
              <li key={stat.label}>
                <CountUp
                  value={stat.value}
                  className="block font-heading text-[64px] font-semibold leading-none tracking-[-0.03em] text-white md:text-[76px]"
                />
                <span className="mt-5 block h-0.5 w-10 bg-accent" />
                <p className="mt-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-white">
                  {stat.label}
                </p>
                {stat.note && (
                  <p className="mt-2 text-[14px] leading-[1.5] text-white/70">{stat.note}</p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-14 max-w-xl text-[15px] leading-[1.6] text-white/70">
            Founded in 2005 as a 501(c)(3) social enterprise.
          </p>
        </div>
      </section>

      <section className="bg-surface-tint py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Corporate partners served" />
          <div className="mt-2">
            <PartnerWall limit={16} />
          </div>
          <div className="mt-8">
            <Link
              href="/corporate-partners"
              className="font-heading text-[15px] font-semibold text-action-deep no-underline hover:text-action-deeper"
            >
              See all corporate partners
            </Link>
          </div>
        </div>
      </section>

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
