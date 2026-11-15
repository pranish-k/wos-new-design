import type { Metadata } from "next";
import { HeroImage, PageHero, SectionHeading, ServiceBands, WRAP } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";
import { ContentSections } from "@/components/ContentPage";
import InView from "@/components/InView";
import { CONSULTING_CARDS } from "@/content/consulting-to-hire-hub";
import page from "@/content/consulting-to-hire-services";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

/**
 * The Overview of a four-item nav group, so it is a hub rather than a leaf.
 *
 * Same shape as /managed-service-centers/: the opening, then the bands that are the
 * reason to be on this page at all. The live page has no prose that is not a
 * placeholder, so the bands are the page.
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
          <SectionHeading>Consulting to Hire Services</SectionHeading>
        </InView>
        <ServiceBands items={CONSULTING_CARDS} />
      </Chapter>

      {/* after="crimson": the chapter above ends on its last band, which is crimson. */}
      <ContentSections sections={page.sections} after="crimson" />
    </article>
  );
}
