import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { ArrowLink, Eyebrow, SectionHeading } from "@/components/Brand";
import ArcDraw from "@/components/ArcDraw";
import ChipTemple from "@/components/ChipTemple";
import FadeIn from "@/components/FadeIn";
import page from "@/content/ai-institute";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

/** Line icon at the site's one stroke weight. Decorative: the label beside it carries it. */
function Icon({ icon: I, className = "" }: { icon: LucideIcon; className?: string }) {
  return <I aria-hidden="true" strokeWidth={1.5} className={`h-7 w-7 ${className}`.trim()} />;
}

export default function Page() {
  return (
    <article>
      {/* 1. Hero. Holds the h1, so nothing here fades. */}
      <header className="relative bg-surface-dark">
        <span className="absolute left-0 top-0 h-1.5 w-24 bg-accent" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-20 md:grid-cols-[1.1fr_0.9fr] md:pb-24 md:pt-24">
          <div>
            <Eyebrow label={page.eyebrow} dark />
            <h1 className="font-heading text-[40px] font-semibold leading-[1.04] tracking-[-0.02em] text-white md:text-[60px]">
              {page.title}
            </h1>
            <p className="mt-5 max-w-xl text-balance font-heading text-[18px] font-medium leading-[1.4] text-white/85 md:text-[20px]">
              {page.subtitle}
            </p>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-white/75">{page.lead}</p>
          </div>
          {/* Decoration, so it gives way on a phone rather than pushing the page down. */}
          <div className="hidden md:block">
            <ChipTemple />
          </div>
        </div>
      </header>

      {/* 2. Vision. One statement, given the room a quote gets. */}
      <section className="py-24">
        <FadeIn className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow label="Vision" />
              <p className="text-[17px] leading-[1.7] text-ink-muted">
                {page.visionMission}{" "}
                <strong className="font-semibold text-ink">“Imagination Age.”</strong>
              </p>
            </div>
            <p className="m-0 border-l-[3px] border-accent pl-6 font-heading text-[26px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink md:pl-10 md:text-[34px]">
              {page.vision}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* 3. The hub: what it integrates, then what it sets out to do. */}
      <section className="bg-surface-tint py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <Eyebrow label="A national and international hub" />
            <SectionHeading>Seven fields, one laboratory</SectionHeading>
          </FadeIn>
          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-px bg-hairline-strong p-0 sm:grid-cols-2 lg:grid-cols-4">
            {page.hub.map((h, i) => (
              <li key={h.label} className="bg-white">
                <FadeIn delay={i * 60} className="h-full p-6">
                  <Icon icon={h.icon} className="text-action" />
                  <p className="mt-5 font-heading text-[16px] font-semibold leading-[1.3] text-ink">
                    {h.label}
                  </p>
                </FadeIn>
              </li>
            ))}
            {/* The eighth cell squares off the two- and four-column grids with the aim, so
                the band ends on a statement rather than a gap. */}
            <li className="bg-surface-dark">
              <FadeIn delay={page.hub.length * 60} className="h-full p-6">
                <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-white/75">
                  The aim
                </p>
                <p className="mt-3 text-[15px] leading-[1.55] text-white">
                  Evidence-based systems that prepare future generations for the Imagination Age.
                </p>
              </FadeIn>
            </li>
          </ul>

          <FadeIn className="mt-16">
            <h3 className="font-heading text-[20px] font-semibold text-ink">Mission</h3>
            <ol className="m-0 mt-6 grid list-none gap-x-10 gap-y-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {page.mission.map((m, i) => (
                <li key={m} className="flex gap-4 border-t border-hairline-strong pt-4">
                  <span className="font-heading text-[13px] font-semibold text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-[1.55] text-ink">{m}</span>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      {/* 4. The Fantasy Arc. The page's one strong visual move. */}
      <section className="bg-surface-dark py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <Eyebrow label="The framework" dark />
              <SectionHeading dark>The Fantasy Arc</SectionHeading>
              <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-white/80">
                {page.arc.intro}
              </p>
            </div>
            <div className="border-l-[3px] border-accent pl-6">
              <p className="font-heading text-[18px] font-semibold text-white">
                {page.arc.principle}
              </p>
              <p className="mt-2 text-[15px] leading-[1.6] text-white/75">
                {page.arc.principleBody}
              </p>
            </div>
          </FadeIn>

          {/* Six columns of labels do not fit a phone, so below md the arc becomes the
              ordered list it is underneath. */}
          <div className="mt-16 hidden md:block">
            <ArcDraw steps={page.arc.steps} />
          </div>
          <ol className="m-0 mt-12 list-none p-0 md:hidden">
            {page.arc.steps.map((s, i, all) => {
              const top = i === all.length - 1;
              return (
                <li key={s.tag} className="relative flex gap-5 pb-7 last:pb-0">
                  {/* The arc's spine, drawn as the line between this marker and the next. */}
                  {!top && (
                    <span className="absolute left-[7px] top-4 h-full w-0.5 bg-white/30" aria-hidden="true" />
                  )}
                  <span
                    className={`relative mt-1 h-4 w-4 flex-none rounded-full ${
                      top ? "bg-action" : "border-2 border-white bg-surface-dark"
                    }`}
                    aria-hidden="true"
                  />
                  <span>
                    <span
                      className={`block font-heading text-[11px] font-semibold uppercase tracking-[0.15em] ${
                        s.name || s.detail ? "text-white" : "text-white/50"
                      }`}
                    >
                      {s.tag}
                    </span>
                    {s.name && (
                      <span className="mt-1 block font-heading text-[16px] font-semibold text-white">
                        {s.name}
                      </span>
                    )}
                    {s.detail && (
                      <span className="mt-1 block text-[14px] leading-[1.45] text-white/75">{s.detail}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 5. Foundation. Level 3 of the weight ladder: title and body, red rule above. */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="max-w-3xl">
            <Eyebrow label="Intellectual foundation" />
            <SectionHeading>Five claims the Institute is built on</SectionHeading>
            <p className="mt-5 text-[17px] leading-[1.65] text-ink-muted">
              From <em className="text-ink">{page.foundationSource}</em> by Dr. Arthur Langer,
              founder of Workforce Opportunity Services.
            </p>
          </FadeIn>
          {/* Subgrid rows, so every body starts on one line however its title wraps. */}
          <ol className="m-0 mt-12 grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
            {page.foundation.map((f, i) => (
              <li key={f.title} className="lg:row-span-2 lg:grid lg:grid-rows-subgrid">
                <FadeIn
                  delay={i * 60}
                  className="h-full border-t-2 border-accent pt-6 lg:row-span-2 lg:grid lg:grid-rows-subgrid"
                >
                  <div>
                    <span className="block font-heading text-[28px] font-semibold leading-none text-action">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 font-heading text-[17px] font-semibold leading-[1.3] text-ink">
                      {f.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[15px] leading-[1.6] text-ink-muted">{f.body}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Research pillars. Level 4 cards; the questions and activities sit behind a
          disclosure so the agenda scans at a glance and the depth is one click away. */}
      <section id="pillars" className="bg-surface-tint py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <Eyebrow label="Core research agenda" />
            <SectionHeading>Five research pillars</SectionHeading>
          </FadeIn>
          <ol className="m-0 mt-10 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
            {page.pillars.map((p, i) => (
              <li key={p.title}>
                <FadeIn delay={i * 60} className="h-full">
                  <div className="group flex h-full flex-col bg-white p-8 transition-transform duration-[250ms] ease-out hover:-translate-y-[3px]">
                    <div className="flex items-start justify-between">
                      <Icon icon={p.icon} className="text-action" />
                      <span className="font-heading text-[13px] font-semibold tracking-[0.15em] text-ink-muted">
                        PILLAR {i + 1}
                      </span>
                    </div>
                    <span className="mt-6 block h-0.5 w-8 bg-accent transition-[width] duration-300 ease-out group-hover:w-14" />
                    <h3 className="mt-4 font-heading text-[20px] font-semibold leading-[1.25] text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-ink-muted">{p.objective}</p>
                    <details className="group/d mt-auto pt-6">
                      <summary className="cursor-pointer list-none font-heading text-[13px] font-semibold text-action-deep transition-colors hover:text-action-deeper [&::-webkit-details-marker]:hidden">
                        <span className="group-open/d:hidden">Questions and {p.workLabel.toLowerCase()} +</span>
                        <span className="hidden group-open/d:inline">Hide detail -</span>
                      </summary>
                      {p.questions.length > 0 && (
                        <>
                          <p className="mt-5 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                            Research questions
                          </p>
                          <ul className="m-0 mt-2 list-none p-0">
                            {p.questions.map((q) => (
                              <li key={q} className="border-t border-hairline py-2 text-[14px] leading-[1.5] text-ink">
                                {q}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      <p className="mt-5 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                        {p.workLabel}
                      </p>
                      <ul className="m-0 mt-2 list-none p-0">
                        {p.work.map((w) => (
                          <li key={w} className="border-t border-hairline py-2 text-[14px] leading-[1.5] text-ink">
                            {w}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </FadeIn>
              </li>
            ))}
            {/* The sixth cell closes the two- and three-column grids rather than leaving a
                hole, with the one scope statement every pillar shares. */}
            <li className="hidden md:block">
              <FadeIn delay={page.pillars.length * 60} className="flex h-full flex-col justify-end bg-surface-dark p-8">
                <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-white/75">
                  Across the lifespan
                </p>
                <p className="mt-3 font-heading text-[22px] font-semibold leading-[1.25] text-white">
                  From K-12 through adult and executive education.
                </p>
              </FadeIn>
            </li>
          </ol>
        </div>
      </section>

      {/* 7. Divisions. Level 3 columns: lighter than the pillar cards above,
          because each carries a name and three tags rather than a paragraph. */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="max-w-3xl">
            <Eyebrow label="Structure" />
            <SectionHeading>Five divisions</SectionHeading>
          </FadeIn>
          <ul className="m-0 mt-12 grid list-none gap-x-8 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
            {page.divisions.map((d, i) => (
              <li key={d.name} className="lg:row-span-2 lg:grid lg:grid-rows-subgrid">
                <FadeIn
                  delay={i * 60}
                  className="h-full border-t-2 border-accent pt-6 lg:row-span-2 lg:grid lg:grid-rows-subgrid"
                >
                  <div>
                    <Icon icon={d.icon} className="text-action" />
                    <h3 className="mt-4 font-heading text-[17px] font-semibold leading-[1.3] text-ink">
                      {d.name}
                    </h3>
                  </div>
                  <ul className="m-0 mt-4 list-none p-0">
                    {d.focus.map((f) => (
                      <li key={f} className="border-t border-hairline py-2 text-[14px] leading-[1.45] text-ink-muted">
                        {f}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Who it serves. */}
      <section className="bg-surface-dark py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <Eyebrow label="Educational deliverables" dark />
            <SectionHeading dark>From the classroom to the boardroom</SectionHeading>
          </FadeIn>
          <ul className="m-0 mt-12 grid list-none gap-px bg-white/20 p-0 md:grid-cols-3">
            {page.audiences.map((a, i) => (
              <li key={a.name} className="bg-surface-dark md:first:*:pl-0">
                <FadeIn delay={i * 60} className="h-full py-8 md:px-8">
                  <Icon icon={a.icon} className="text-white" />
                  <h3 className="mt-5 font-heading text-[22px] font-semibold text-white">{a.name}</h3>
                  <ul className="m-0 mt-5 list-none space-y-3 p-0">
                    {a.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-[1.5] text-white/80">
                        <span className="mt-[0.55em] h-1.5 w-1.5 flex-none bg-accent" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Outcomes. */}
      <section className="bg-surface-tint py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <Eyebrow label="Expected outcomes" />
            <SectionHeading>What changes</SectionHeading>
          </FadeIn>
          <ul className="m-0 mt-10 grid list-none gap-px bg-hairline-strong p-0 sm:grid-cols-2 lg:grid-cols-4">
            {page.outcomes.map((o, i) => (
              <li key={o.area} className="bg-white">
                <FadeIn delay={i * 60} className="h-full p-7">
                  <Icon icon={o.icon} className="text-action" />
                  <h3 className="mt-5 font-heading text-[18px] font-semibold text-ink">{o.area}</h3>
                  <ul className="m-0 mt-4 list-none space-y-2 p-0">
                    {o.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-[1.5] text-ink-muted">
                        <span className="mt-[0.55em] h-1.5 w-1.5 flex-none bg-accent" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. Close. Plain white with a level 1 rule: the outcomes band above is tinted,
          and a tinted panel under it would merge into one block. */}
      <section className="py-24">
        <FadeIn className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl border-l-[3px] border-accent pl-6 md:pl-10">
            <p className="m-0 font-heading text-[20px] font-semibold leading-[1.45] text-ink md:text-[22px]">
              {page.closing}
            </p>
            <div className="mt-6">
              <ArrowLink href="/langer-arc">The Langer Workforce Maturity Arc</ArrowLink>
            </div>
          </div>
        </FadeIn>
      </section>
    </article>
  );
}
