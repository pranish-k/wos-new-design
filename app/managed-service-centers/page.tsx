import type { Metadata } from "next";
import { Eyebrow, PhotoLedCard } from "@/components/Brand";
import ContentPage, { ContentSections } from "@/components/ContentPage";
import { MSC_CARDS } from "@/content/managed-service-centers-hub";
import page from "@/content/managed-service-centers";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

/**
 * A hub, not a leaf. The card grid below is the only path to six live pages, so it
 * comes before the prose rather than after it.
 */
export default function Page() {
  const { sections, ...rest } = page;
  return (
    <>
      <ContentPage page={{ ...rest, sections: [] }} />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow label="WOS Managed Services" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MSC_CARDS.map((card) => (
              <PhotoLedCard
                key={card.href}
                href={card.href}
                image={card.image}
                imageAlt={card.imageAlt}
                tag="Managed service"
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Offset by one: the card grid above is untinted, so the first prose section
          takes the tint rather than stacking two plain blocks. */}
      <ContentSections sections={sections} offset={1} />
    </>
  );
}
