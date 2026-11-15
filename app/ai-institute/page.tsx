import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { PAD, PageHero, SectionHeading, TextLink, TYPE, WRAP, stagger } from "@/components/Brand";
import ArcDraw from "@/components/ArcDraw";
import { Chapter, Chapters, fieldClass } from "@/components/Chapter";
import ChipTemple from "@/components/ChipTemple";
import InView from "@/components/InView";
import page from "@/content/ai-institute";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

/** Line icon at the site's one stroke weight. Decorative: the label beside it carries it. */
function Icon({ icon: I, className = "" }: { icon: LucideIcon; className?: string }) {
  return <I aria-hidden="true" strokeWidth={1.5} className={`h-7 w-7 ${className}`.trim()} />;
}

/** Icons take the field's accent: red on the light fields and on deep, white on slate. */
const ICON = "text-[var(--field-accent)]";

export default function Page() {
  return (
    <Chapters>
      {/* 1. Opening. The temple is decoration, so it gives way on a phone rather than
             pushing the page down. */}
      <PageHero
        label={page.eyebrow}
        title={page.title}
        lead={[page.subtitle, page.lead]}
        media={
          <div className="hidden md:block">
            <ChipTemple />
          </div>
        }
        mediaShape="free"
      />

      {/* 2. Vision. One statement, given the room a quote gets. */}
      <Chapter field="paper">
        <InView className={`${WRAP} ${PAD} grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16`}>
          <div>
            <p className={`reveal mb-4 ${TYPE.label}`}>Vision</p>
            <p className={`reveal ${TYPE.body}`} style={stagger(1)}>
              {page.visionMission} <strong className="font-semibold">“Imagination Age.”</strong>
            </p>
          </div>
          <p
            className={`reveal m-0 border-l-4 border-[var(--field-rule)] pl-6 ${TYPE.statement} text-[clamp(26px,3vw,40px)] md:pl-10`}
            style={stagger(2)}
          >
            {page.vision}
          </p>
        </InView>
      </Chapter>

      {/* 3. The hub: what it integrates, then what it sets out to do. */}
      <Chapter field="tint">
        <div className={`${WRAP} ${PAD}`}>
          <InView>
            <SectionHeading label="A national and international hub">Seven fields, one laboratory</SectionHeading>
          </InView>
          <InView as="ul" className="m-0 mt-12 grid list-none grid-cols-1 gap-px bg-[var(--field-seam)] p-0 sm:grid-cols-2 lg:grid-cols-4">
            {page.hub.map((h, i) => (
              <li key={h.label} className="reveal bg-[var(--field-panel)] p-6 md:p-7" style={stagger(i)}>
                <Icon icon={h.icon} className={ICON} />
                <p className="mt-5 font-heading text-[18px] font-semibold leading-[1.3]">{h.label}</p>
              </li>
            ))}
            {/* The eighth cell squares off the two- and four-column grids with the aim, so
                the band ends on a statement rather than a gap. */}
            <li className={`reveal ${fieldClass("crimson")} p-6 md:p-7`} style={stagger(page.hub.length)}>
              <p className="text-[15px] font-semibold text-[var(--field-muted)]">The aim</p>
              <p className="mt-3 font-heading text-[18px] font-semibold leading-[1.35]">
                Evidence-based systems that prepare future generations for the Imagination Age.
              </p>
            </li>
          </InView>

          <InView className="mt-20">
            <h3 className={`reveal ${TYPE.h3}`}>Mission</h3>
            <ol className="m-0 mt-8 grid list-none gap-x-10 gap-y-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {page.mission.map((m, i) => (
                <li
                  key={m}
                  className="reveal grid grid-cols-[2.5rem_1fr] gap-2 border-t-2 border-[var(--field-rule)] pt-4"
                  style={stagger(i + 1)}
                >
                  <span className="font-heading text-[24px] font-semibold leading-none text-[var(--field-accent)]">{i + 1}</span>
                  <span className={`${TYPE.small} md:text-[17px]`}>{m}</span>
                </li>
              ))}
            </ol>
          </InView>
        </div>
      </Chapter>

      {/* 4. The Fantasy Arc. The page's one strong visual move. */}
      <Chapter field="deep">
        <div className={`${WRAP} ${PAD}`}>
          <InView className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-end">
            <SectionHeading label="The framework" intro={page.arc.intro}>
              The Fantasy Arc
            </SectionHeading>
            <div className="reveal border-l-4 border-[var(--field-rule)] pl-6" style={stagger(2)}>
              <p className="font-heading text-[20px] font-semibold">{page.arc.principle}</p>
              <p className={`mt-2 ${TYPE.small} text-[var(--field-muted)]`}>{page.arc.principleBody}</p>
            </div>
          </InView>

          {/* Five columns of labels do not fit a phone, so below md the arc becomes the
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
                  {!top && <span className="absolute left-[7px] top-4 h-full w-0.5 bg-white/30" aria-hidden="true" />}
                  <span
                    className={`relative mt-1 h-4 w-4 flex-none rounded-full ${
                      top ? "bg-action" : "border-2 border-white bg-[var(--field-bg)]"
                    }`}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--field-muted)]">
                      {s.tag}
                    </span>
                    <span className="mt-1 block font-heading text-[18px] font-semibold">{s.name}</span>
                    <span className="mt-1 block text-[15px] leading-[1.5] text-[var(--field-muted)]">{s.detail}</span>
                  </span>
                </li>
              );
            })}
          </ol>

          {/* The arc's second axis: the stages measure how far, the sectors measure in what. */}
          <InView className="mt-20">
            <h3 className={`reveal ${TYPE.h3}`}>Five creative skill sectors</h3>
            {/* Subgrid rows, so a name that wraps does not push its line below its neighbours'. */}
            <ul className="m-0 mt-8 grid list-none gap-x-8 gap-y-6 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
              {page.arc.sectors.map((sector, i) => (
                <li
                  key={sector.name}
                  className="reveal border-t-2 border-[var(--field-rule)] pt-4 lg:row-span-2 lg:grid lg:grid-rows-subgrid"
                  style={stagger(i + 1)}
                >
                  <p className="font-heading text-[18px] font-semibold leading-[1.3]">{sector.name}</p>
                  <p className="mt-1.5 text-[15px] leading-[1.5] text-[var(--field-muted)]">{sector.detail}</p>
                </li>
              ))}
            </ul>
          </InView>
        </div>
      </Chapter>

      {/* 5. Foundation: five claims, each on the rule with its numeral. */}
      <Chapter field="paper">
        <div className={`${WRAP} ${PAD}`}>
          <InView>
            <SectionHeading
              label="Intellectual foundation"
              intro={
                <>
                  From <em>{page.foundationSource}</em> by Dr. Arthur Langer, founder of Workforce Opportunity Services.
                </>
              }
            >
              Five claims the Institute is built on
            </SectionHeading>
          </InView>
          {/* Subgrid rows, so every body starts on one line however its title wraps. */}
          <InView as="ul" className="m-0 mt-14 grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
            {page.foundation.map((f, i) => (
              <li
                key={f.title}
                className="reveal border-t-4 border-[var(--field-rule)] pt-6 lg:row-span-2 lg:grid lg:grid-rows-subgrid"
                style={stagger(i)}
              >
                <div>
                  <span className="block font-heading text-[30px] font-semibold leading-none text-[var(--field-accent)]">{i + 1}</span>
                  <h3 className="mt-4 font-heading text-[19px] font-semibold leading-[1.25]">{f.title}</h3>
                </div>
                <p className="mt-2 text-[16px] leading-[1.6] text-[var(--field-muted)]">{f.body}</p>
              </li>
            ))}
          </InView>
        </div>
      </Chapter>

      {/* 6. Research pillars. The questions and activities sit behind a disclosure so the
             agenda scans at a glance and the depth is one click away. */}
      <Chapter field="tint" id="pillars">
        <div className={`${WRAP} ${PAD}`}>
          <InView>
            <SectionHeading label="Core research agenda">Five research pillars</SectionHeading>
          </InView>
          <InView as="ul" className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
            {page.pillars.map((p, i) => (
              <li key={p.title} className="reveal flex flex-col bg-[var(--field-panel)] p-8" style={stagger(i)}>
                <div className="flex items-start justify-between">
                  <Icon icon={p.icon} className={ICON} />
                  <span className="font-heading text-[14px] font-semibold text-[var(--field-muted)]">Pillar {i + 1}</span>
                </div>
                <h3 className="mt-6 border-t-2 border-[var(--field-rule)] pt-5 font-heading text-[21px] font-semibold leading-[1.25]">
                  {p.title}
                </h3>
                <p className={`mt-3 ${TYPE.small} text-[var(--field-muted)]`}>{p.objective}</p>
                <details className="group/d mt-auto pt-6">
                  <summary className="cursor-pointer list-none font-heading text-[15px] font-semibold text-[var(--field-link)] underline underline-offset-[5px] hover:no-underline [&::-webkit-details-marker]:hidden">
                    <span className="group-open/d:hidden">Questions and {p.workLabel.toLowerCase()} +</span>
                    <span className="hidden group-open/d:inline">Hide detail -</span>
                  </summary>
                  {p.questions.length > 0 && (
                    <>
                      <p className="mt-5 font-heading text-[14px] font-semibold text-[var(--field-muted)]">Research questions</p>
                      <ul className="m-0 mt-2 list-none p-0">
                        {p.questions.map((q) => (
                          <li key={q} className="border-t border-hairline py-2 text-[15px] leading-[1.5]">
                            {q}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="mt-5 font-heading text-[14px] font-semibold text-[var(--field-muted)]">{p.workLabel}</p>
                  <ul className="m-0 mt-2 list-none p-0">
                    {p.work.map((w) => (
                      <li key={w} className="border-t border-hairline py-2 text-[15px] leading-[1.5]">
                        {w}
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
            {/* The sixth cell closes the two- and three-column grids rather than leaving a
                hole, with the one scope statement every pillar shares. */}
            <li className={`reveal hidden ${fieldClass("slate")} flex-col justify-end p-8 md:flex`} style={stagger(page.pillars.length)}>
              <p className="text-[15px] font-semibold text-[var(--field-muted)]">Across the lifespan</p>
              <p className="mt-3 font-heading text-[24px] font-semibold leading-[1.25]">
                From K-12 through adult and executive education.
              </p>
            </li>
          </InView>
        </div>
      </Chapter>

      {/* 7. Divisions: lighter than the pillars above, because each carries a name and
             three tags rather than a paragraph. */}
      <Chapter field="paper">
        <div className={`${WRAP} ${PAD}`}>
          <InView>
            <SectionHeading label="Structure">Five divisions</SectionHeading>
          </InView>
          <InView as="ul" className="m-0 mt-14 grid list-none gap-x-8 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
            {page.divisions.map((d, i) => (
              <li
                key={d.name}
                className="reveal border-t-4 border-[var(--field-rule)] pt-6 lg:row-span-2 lg:grid lg:grid-rows-subgrid"
                style={stagger(i)}
              >
                <div>
                  <Icon icon={d.icon} className={ICON} />
                  <h3 className="mt-4 font-heading text-[19px] font-semibold leading-[1.25]">{d.name}</h3>
                </div>
                <ul className="m-0 mt-4 list-none p-0">
                  {d.focus.map((f) => (
                    <li key={f} className="border-t border-hairline py-2 text-[15px] leading-[1.45] text-[var(--field-muted)]">
                      {f}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </InView>
        </div>
      </Chapter>

      {/* 8. Who it serves. */}
      <Chapter field="slate">
        <div className={`${WRAP} ${PAD}`}>
          <InView>
            <SectionHeading label="Educational deliverables">From the classroom to the boardroom</SectionHeading>
          </InView>
          <InView as="ul" className="m-0 mt-14 grid list-none gap-x-10 gap-y-12 p-0 md:grid-cols-3">
            {page.audiences.map((a, i) => (
              <li key={a.name} className="reveal border-t-4 border-[var(--field-rule)] pt-6" style={stagger(i)}>
                <Icon icon={a.icon} className={ICON} />
                <h3 className={`mt-5 ${TYPE.h3}`}>{a.name}</h3>
                <ul className="m-0 mt-5 list-none space-y-3 p-0">
                  {a.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] leading-[1.5] text-[var(--field-muted)]">
                      <span className="mt-[0.6em] h-1.5 w-1.5 flex-none bg-[var(--field-rule)]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </InView>
        </div>
      </Chapter>

      {/* 9. Outcomes. */}
      <Chapter field="tint">
        <div className={`${WRAP} ${PAD}`}>
          <InView>
            <SectionHeading label="Expected outcomes">What changes</SectionHeading>
          </InView>
          <InView as="ul" className="m-0 mt-12 grid list-none gap-px bg-[var(--field-seam)] p-0 sm:grid-cols-2 lg:grid-cols-4">
            {page.outcomes.map((o, i) => (
              <li key={o.area} className="reveal bg-[var(--field-panel)] p-7" style={stagger(i)}>
                <Icon icon={o.icon} className={ICON} />
                <h3 className="mt-5 font-heading text-[19px] font-semibold">{o.area}</h3>
                <ul className="m-0 mt-4 list-none space-y-2 p-0">
                  {o.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] leading-[1.5] text-[var(--field-muted)]">
                      <span className="mt-[0.6em] h-1.5 w-1.5 flex-none bg-[var(--field-rule)]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </InView>
        </div>
      </Chapter>

      {/* 10. Close, on crimson: the closing statement and the way on to the Arc's
              companion framework. */}
      <Chapter field="crimson">
        <InView className={`${WRAP} ${PAD}`}>
          <p className={`reveal max-w-[34ch] ${TYPE.statement} text-[clamp(24px,2.6vw,34px)]`}>{page.closing}</p>
          <div className="reveal mt-10" style={stagger(1)}>
            <TextLink href="/langer-arc">The Langer Workforce Maturity Arc</TextLink>
          </div>
        </InView>
      </Chapter>
    </Chapters>
  );
}
