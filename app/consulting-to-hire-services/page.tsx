import type { Metadata } from "next";
import { PhotoLedCard, SectionHeading } from "@/components/Brand";
import ContentPage from "@/components/ContentPage";
import { CONSULTING_CARDS } from "@/content/consulting-to-hire-hub";
import page from "@/content/consulting-to-hire-services";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

/**
 * The Overview of a four-item nav group, so it is a hub rather than a leaf.
 *
 * Same shape as /managed-service-centers/: header, then the grid that is the reason to
 * be on this page at all. There is no prose below it because the live page has none
 * that is not a placeholder.
 */
export default function Page() {
  return (
    <>
      <ContentPage page={page} />

      <section className="bg-surface-tint py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading>Consulting to Hire Services</SectionHeading>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {CONSULTING_CARDS.map((card) => (
              <PhotoLedCard
                key={card.href}
                href={card.href}
                image={card.image}
                imageAlt={card.imageAlt}
                tag="Service"
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
