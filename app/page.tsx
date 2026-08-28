import Link from "next/link";
import { Eyebrow, PrimaryButton, SecondaryButton, StatsBar, TintedCard } from "@/components/Brand";
import PartnerWall from "@/components/PartnerWall";
import { ORG, ORG_SHORT, TAGLINE } from "@/lib/brand";
import { NAV, type NavGroup, type NavLink } from "@/lib/nav";

// The Services dropdown and this section list the same pages, so they read from the
// same tree. Two hand-kept copies would drift the first time a service is renamed.
const services = NAV.find((n) => n.label === "Services") as NavGroup;
const consulting = services.children[0] as NavGroup;
const other = services.children[1] as NavGroup;

/** Flatten "Other Services", where two of the three children are themselves groups. */
const otherLinks: { label: string; href: string }[] = other.children.flatMap((child) =>
  child.kind === "link"
    ? [{ label: child.label, href: child.href }]
    : (child.children as NavLink[])
        // "Overview" is only meaningful under its own heading, so it takes the group name.
        .filter((leaf) => leaf.label === "Overview")
        .map((leaf) => ({ label: child.label, href: leaf.href })),
);

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

// The live page animates these from zero. The numbers are the counter widgets' targets.
const IMPACT = [
  { value: "65+", label: "Corporate partners" },
  { value: "4", label: "Countries" },
  { value: "8,000+", label: "Careers impacted" },
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

      <section className="bg-surface-tint py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Our services" />
          <p className="max-w-3xl text-[17px] leading-[1.65] text-ink-muted">
            WOS operates across many industries and roles, from information and AI
            technology to shared services, product support, and vocational trades. We also
            offer advisory and training services for HR and talent acquisition staff,
            based on our own research instruments and methods.
          </p>

          <h3 className="mt-12 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
            {consulting.label}
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {(consulting.children as NavLink[]).map((s) => (
              <TintedCard key={s.href} href={s.href} tag="Service" name={s.label} />
            ))}
          </div>

          <h3 className="mt-12 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
            {other.label}
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {otherLinks.map((s) => (
              <TintedCard key={s.href} href={s.href} tag="Service" name={s.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Our approach" />
          <ol className="m-0 grid list-none gap-8 p-0 md:grid-cols-4">
            {APPROACH.map((a, i) => (
              <li key={a.step} className="border-t-2 border-hairline-strong pt-4">
                <span className="font-heading text-[13px] font-semibold text-ink-muted">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-heading text-[19px] font-semibold leading-[1.2] text-ink">
                  {a.step}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-muted">{a.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface-dark py-14">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Our impact" dark />
          <StatsBar stats={IMPACT} dark />
          <p className="mt-6 text-sm text-white/75">
            Founded in 2005 as a 501(c)(3) social enterprise. WOS has operated in the
            United States, Costa Rica, France, and the Netherlands.
          </p>
        </div>
      </section>

      <section className="py-20">
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

      <section className="bg-surface-tint py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-heading text-[28px] font-semibold leading-[1.15] tracking-[-0.01em] text-ink md:text-[34px]">
            Schedule your free consultation
          </h2>
          <PrimaryButton href="/contact">Get in touch</PrimaryButton>
        </div>
      </section>
    </>
  );
}
