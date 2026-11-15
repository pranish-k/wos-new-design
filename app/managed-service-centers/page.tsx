import type { Metadata } from "next";
import { HeroImage, PageHero, SectionHeading, ServiceBands, WRAP } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";
import { ContentSections } from "@/components/ContentPage";
import InView from "@/components/InView";
import { MSC_CARDS } from "@/content/managed-service-centers-hub";
import page from "@/content/managed-service-centers";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

/**
 * A hub, not a leaf. The bands below are the only path to six live pages, so they come
 * straight after the opening, before the prose.
 */
export default function Page() {
  return (
    <article>
      <PageHero
        label={page.eyebrow}
        title={page.title}
        lead={page.lead.map((b) => b.text)}
        media={page.hero ? <HeroImage src={page.hero.src} alt="" /> : undefined}
      />

      <Chapter field="paper">
        <InView className={`${WRAP} pb-12 pt-20 md:pb-14 md:pt-28`}>
          <SectionHeading>WOS Managed Services</SectionHeading>
        </InView>
        <ServiceBands items={MSC_CARDS} />
      </Chapter>

      {/* after="crimson": the chapter above ends on its last band, which is crimson. */}
      <ContentSections sections={page.sections} after="crimson" />
    </article>
  );
}
