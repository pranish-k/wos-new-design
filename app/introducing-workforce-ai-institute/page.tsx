import type { Metadata } from "next";
import { PAD, PageHero, TextLink, TYPE, WRAP } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";

// Temporary preview of an announcement post, to be copied and then deleted.
export const metadata: Metadata = {
  title: "Introducing the Institute for Imagination, Reflective Development, and AI Futures",
  robots: { index: false },
};

export default function Page() {
  return (
    <article>
      <PageHero
        label="News & Events"
        labelHref="/blog"
        title="Introducing the Institute for Imagination, Reflective Development, and AI Futures"
      />

      <Chapter field="paper">
        <div className={`${WRAP} ${PAD}`}>
          <div className={`max-w-3xl ${TYPE.body}`}>
            <p className={TYPE.lead}>
              Workforce Opportunity Services is proud to introduce the Institute for Imagination,
              Reflective Development, and AI Futures, an interdisciplinary research laboratory
              dedicated to understanding how people develop imagination, abstract thinking, ethical
              foresight, and innovation in the age of artificial intelligence.
            </p>
            <p className="mt-5">
              The Institute is grounded in the Fantasy Arc, a framework developed by WOS founder
              Dr. Arthur Langer. The Arc traces how people progress through five stages, from
              Indoctrinated Knowledge toward Abstracts of New Possibilities, the highest stage of
              imaginative and reflective maturity.
            </p>
            <h2 className={`mt-12 ${TYPE.h3}`}>What the Institute will focus on</h2>
            <ul className="m-0 mt-5 list-none p-0">
              {[
                "Studying how imagination and reflective maturity develop, and how to measure them",
                "Investigating how AI can support reflective, ethical, and imaginative thinking",
                "Bringing new learning models to K-12 classrooms, universities, and organizations",
              ].map((item) => (
                <li key={item} className="border-t-2 border-[var(--field-rule)] py-3.5">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-10">
              Its vision is to become the world’s leading research and development laboratory
              dedicated to cultivating human imagination, ethical reflection, and creative
              consciousness in the era of AI, and to help prepare future generations for what
              Dr. Langer calls the “Imagination Age.”
            </p>
            <TextLink href="/ai-institute" className="mt-10">
              Learn more about the Institute
            </TextLink>
          </div>
        </div>
      </Chapter>
    </article>
  );
}
