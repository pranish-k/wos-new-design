import type { Metadata } from "next";
import { ArrowLink, Eyebrow } from "@/components/Brand";
import { ContentSections } from "@/components/ContentPage";
import page from "@/content/center-for-imagination";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
          {/* "Proposed" rather than "Research". The eyebrow is the first thing read and
              it has to say what this is before the title implies an institution. */}
          <Eyebrow label={page.eyebrow} dark />
          <h1 className="max-w-4xl font-heading text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[50px]">
            {page.title}
          </h1>
        </div>
      </header>

      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6">
          {page.lead.map((block, i) =>
            block.kind === "para" ? (
              <p key={i} className="mt-6 text-[17px] leading-[1.7] text-ink-muted first:mt-0">
                {block.text}
              </p>
            ) : null,
          )}
        </div>
      </section>

      <ContentSections sections={page.sections} offset={1} />

      <section className="bg-surface-tint py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-heading text-[24px] font-semibold leading-[1.2] text-ink">
            The research this builds on
          </h2>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink-muted">
            The Fantasy Arc extends the developmental research behind the Langer Workforce
            Maturity Arc, the framework WOS already uses to measure workplace readiness.
          </p>
          <div className="mt-6">
            <ArrowLink href="/langer-arc">Langer Workforce Maturity Arc</ArrowLink>
          </div>
        </div>
      </section>
    </article>
  );
}
