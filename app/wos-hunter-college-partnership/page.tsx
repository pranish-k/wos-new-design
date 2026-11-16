import type { Metadata } from "next";
import Image from "next/image";
import { CloseChapter, PAD, PageHero, TYPE, WRAP, stagger } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";
import { ContentSections } from "@/components/ContentPage";
import InView from "@/components/InView";
import page from "@/content/hunter-partnership";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return (
    <article>
      <PageHero
        label={page.eyebrow}
        title={page.title}
        lead="Building New York City’s next-generation technology workforce."
      />

      {/* The Hunter logo is purple and reads only on white, so it opens the paper chapter
          rather than sitting on the gradient above. Same reasoning as the partner wall in
          DESIGN.md §7, minus the tile: one mark needs no grid. */}
      <Chapter field="paper">
        <InView className={`${WRAP} ${PAD} grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16`}>
          <div className="reveal">
            <Image
              src="/images/Hunter-College.png"
              alt="Hunter College, The City University of New York"
              width={2082}
              height={578}
              className="h-auto w-full max-w-[320px]"
              priority
            />
          </div>
          <div className="max-w-measure">
            {page.lead.map((block, i) => (
              <p key={i} className={`reveal mt-6 first:mt-0 ${i === 0 ? TYPE.lead : TYPE.body}`} style={stagger(i + 1)}>
                {block.text}
              </p>
            ))}
          </div>
        </InView>
      </Chapter>

      <ContentSections sections={page.sections} after="paper" last={false} />

      <CloseChapter title="Interested in partnering with WOS?" href="/become-a-partner" action="Become a partner" />
    </article>
  );
}
