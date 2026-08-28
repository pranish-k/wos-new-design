import Image from "next/image";
import Link from "next/link";
import { Eyebrow, PrimaryButton, SecondaryButton } from "@/components/Brand";
import PartnerWall from "@/components/PartnerWall";
import ServiceCard from "@/components/ServiceCard";
import { CONSULTING_TO_HIRE, IMPACT, OTHER_SERVICES } from "@/content/home-sections";
import { ORG, ORG_SHORT, TAGLINE } from "@/lib/brand";

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

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow label="The WOS business solution" />
            <h2 className="font-heading text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] text-ink md:text-[38px]">
              A bridge between consultancy and a pipeline of future employees
            </h2>
          </div>
          <div className="text-[17px] leading-[1.65] text-ink-muted">
            <p>
              {ORG_SHORT} addresses a major challenge faced by companies: how to balance
              the use of outside consultants and the hiring of more full-time staff. The
              decision typically comes down to a question of culture, cost, control, and
              continuity. WOS provides a unique consultant-to-employee transition process
              that ensures smooth knowledge transfer and cultural integration.
            </p>
            <p className="mt-5">
              Upon conversion to employment, our consultants already know your business
              and culture. WOS finds talent from many sources and experience levels,
              typically from local communities, college graduates, and military veterans.
              We help our employees in ways that include professional development and
              technical training, paid part-time college tuition, and financial assistance
              where needed.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Our services" />
          <p className="max-w-3xl text-[17px] leading-[1.65] text-ink-muted">
            WOS operates across many industries and roles, from information and AI
            technology to shared services, product support, and vocational trades. We also
            offer advisory and training services for HR and talent acquisition staff,
            based on our own research instruments and methods.
          </p>

          <h3 className="mt-14 font-heading text-[24px] font-semibold leading-[1.15] tracking-[-0.01em] text-ink md:text-[30px]">
            Consulting to Hire Services
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {CONSULTING_TO_HIRE.map((card) => (
              <ServiceCard key={card.href} card={card} />
            ))}
          </div>

          <h3 className="mt-16 font-heading text-[24px] font-semibold leading-[1.15] tracking-[-0.01em] text-ink md:text-[30px]">
            Other Services
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
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
                <span className="inline-flex h-8 w-8 items-center justify-center bg-white font-heading text-[15px] font-semibold text-surface-dark">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-heading text-[14px] font-semibold uppercase tracking-[0.08em] text-white">
                  {a.step}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-white/75">{a.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Our impact" />
          <ul className="m-0 grid list-none grid-cols-1 gap-px bg-hairline p-0 md:grid-cols-3">
            {IMPACT.map((stat) => (
              <li key={stat.label} className="bg-white px-6 py-10 text-center">
                {/* Decorative: the number and label beneath say the same thing. */}
                <Image
                  src={stat.icon}
                  alt={stat.iconAlt}
                  width={220}
                  height={220}
                  className="mx-auto h-24 w-auto object-contain"
                />
                <p className="mt-6 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
                  {stat.label}
                </p>
                <p className="mt-2 font-heading text-[40px] font-semibold leading-none text-action-deep">
                  {stat.value}
                </p>
                {stat.note && (
                  <p className="mt-3 text-[13px] leading-[1.5] text-ink-muted">{stat.note}</p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-ink-muted">
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
