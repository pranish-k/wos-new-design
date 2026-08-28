import Image from "next/image";
import { Eyebrow } from "@/components/Brand";
import type { Block, PageContent, Section } from "@/lib/content";

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.kind === "heading" ? (
          <h3
            key={i}
            className="mt-10 font-heading text-[20px] font-semibold leading-[1.25] text-ink first:mt-0"
          >
            {b.text}
          </h3>
        ) : b.kind === "para" ? (
          <p key={i} className="mt-4 text-[17px] leading-[1.65] text-ink-muted">
            {b.text}
          </p>
        ) : (
          <ul key={i} className="mt-4 list-none p-0">
            {b.items.map((item) => (
              <li
                key={item}
                className="border-l border-hairline py-1 pl-4 text-[17px] leading-[1.55] text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        ),
      )}
    </>
  );
}

/**
 * The prose sections on their own, for pages that put something else above them.
 *
 * `offset` shifts which sections take the tint, so a page that has already used a
 * tinted block above these does not end up with two of them touching.
 */
export function ContentSections({
  sections,
  offset = 0,
}: {
  sections: Section[];
  offset?: number;
}) {
  return (
    <>
      {sections.map((section, i) => (
        <section
          key={i}
          className={(i + offset) % 2 === 1 ? "bg-surface-tint py-16" : "py-16"}
        >
          <div className="mx-auto max-w-3xl px-6">
            {section.heading && (
              <h2 className="font-heading text-[28px] font-semibold leading-[1.15] tracking-[-0.01em] text-ink md:text-[34px]">
                {section.heading}
              </h2>
            )}
            <div className={section.heading ? "mt-6" : ""}>
              <Blocks blocks={section.blocks} />
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

/**
 * The shared layout for the prose pages, which is most of the site.
 *
 * Rhythm comes from alternating fill rather than from spacing alone: every other
 * section takes surface-tint, so no two tinted blocks are ever adjacent. Uniform py-20
 * on twenty pages is the failure this avoids.
 */
export default function ContentPage({ page }: { page: PageContent }) {
  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
          <Eyebrow label={page.eyebrow} dark />
          <h1 className="max-w-3xl font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[56px]">
            {page.title}
          </h1>
          {page.lead.length > 0 && (
            <div className="mt-6 max-w-2xl [&_p]:text-white/80">
              <Blocks blocks={page.lead} />
            </div>
          )}
        </div>
      </header>

      {/* Full-bleed under the header rather than behind the title. The live heroes are
          Kubio background images with text laid over them, which is where the contrast
          problems live; a strip keeps the title on a solid surface.
          alt is empty on purpose: the heading above already says what the page is, so
          describing the stock photograph again is noise to a screen reader. */}
      {page.hero && (
        <Image
          src={page.hero.src}
          alt=""
          width={1600}
          height={600}
          className="aspect-[8/3] w-full bg-surface-tint object-cover"
          priority
        />
      )}

      <ContentSections sections={page.sections} offset={page.hero ? 1 : 0} />
    </article>
  );
}
