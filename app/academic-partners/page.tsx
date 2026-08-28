import type { Metadata } from "next";
import { Eyebrow, PrimaryButton } from "@/components/Brand";
import PartnerWall from "@/components/PartnerWall";
import { ACADEMIC_PARTNERS } from "@/content/academic-partners-logos";
import page from "@/content/academic-partners";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
          <Eyebrow label="About" dark />
          <h1 className="font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[56px]">
            {page.title}
          </h1>
          {page.lead.map((b, i) =>
            b.kind === "para" ? (
              <p key={i} className="mt-6 max-w-2xl text-[17px] leading-[1.65] text-white/80">
                {b.text}
              </p>
            ) : null,
          )}
        </div>
      </header>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Academic partners" />
          <PartnerWall partners={ACADEMIC_PARTNERS} />
        </div>
      </section>

      <section className="bg-surface-tint py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-heading text-[28px] font-semibold leading-[1.15] text-ink">
            Interested in partnering with WOS?
          </h2>
          <PrimaryButton href="/become-a-partner">Become a partner</PrimaryButton>
        </div>
      </section>
    </article>
  );
}
