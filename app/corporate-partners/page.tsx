import type { Metadata } from "next";
import { CloseChapter, PAD, PageHero, SectionHeading, WRAP } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";
import InView from "@/components/InView";
import PartnerWall from "@/components/PartnerWall";
import page from "@/content/corporate-partners";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return (
    <article>
      <PageHero label={page.eyebrow} title={page.title} lead={page.lead.map((b) => b.text)} />

      {/* Tinted on purpose: the white logo tiles need a ground to sit on. DESIGN.md §7. */}
      <Chapter field="tint">
        <div className={`${WRAP} ${PAD}`}>
          <InView>
            <SectionHeading>Corporate partners served</SectionHeading>
          </InView>
          <div className="mt-10 md:mt-12">
            <PartnerWall />
          </div>
        </div>
      </Chapter>

      <CloseChapter title="Interested in partnering with WOS?" href="/become-a-partner" action="Become a partner" />
    </article>
  );
}
