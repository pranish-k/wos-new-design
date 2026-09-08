import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow, PrimaryButton } from "@/components/Brand";
import { ContentSections } from "@/components/ContentPage";
import page from "@/content/hunter-partnership";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
          <Eyebrow label={page.eyebrow} dark />
          <h1 className="max-w-4xl font-heading text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[50px]">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-[1.5] text-white/80">
            Building New York City’s next-generation technology workforce.
          </p>
        </div>
      </header>

      {/* The Hunter logo is purple and reads only on white, so it sits on a white
          section of its own rather than on the slate header above it. Same reasoning as
          the partner wall in DESIGN.md §7, minus the tile: one mark needs no grid. */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <Image
            src="/images/Hunter-College.png"
            alt="Hunter College, The City University of New York"
            width={2082}
            height={578}
            className="h-auto w-full max-w-[320px]"
            priority
          />
          {page.lead.map((block, i) =>
            block.kind === "para" ? (
              <p key={i} className="mt-8 text-[17px] leading-[1.7] text-ink-muted">
                {block.text}
              </p>
            ) : null,
          )}
        </div>
      </section>

      {/* offset 1: the lead section above is untinted, so the first section here tints. */}
      <ContentSections sections={page.sections} offset={1} />

      <section className="bg-surface-dark py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-heading text-[28px] font-semibold leading-[1.15] text-white">
            Interested in partnering with WOS?
          </h2>
          <PrimaryButton href="/become-a-partner">Become a partner</PrimaryButton>
        </div>
      </section>
    </article>
  );
}
