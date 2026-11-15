import type { Metadata } from "next";
import { ArrowLink, Eyebrow } from "@/components/Brand";

// Temporary preview of an announcement post, to be copied and then deleted.
export const metadata: Metadata = {
  title: "Introducing the Workforce AI Institute",
  robots: { index: false },
};

export default function Page() {
  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-20">
          <Eyebrow label="News & Events" dark />
          <h1 className="font-heading text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-white md:text-[48px]">
            Introducing the Workforce AI Institute
          </h1>
          <p className="mt-5 font-heading text-[18px] font-medium leading-[1.4] text-white/80">
            Home of the Center for Imagination, Reflective Development, and AI Futures
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-[17px] leading-[1.7] text-ink">
          <p>
            Workforce Opportunity Services is proud to introduce the Workforce AI Institute, an
            interdisciplinary research laboratory dedicated to understanding how people develop
            imagination, abstract thinking, ethical foresight, and innovation in the age of
            artificial intelligence.
          </p>
          <p className="mt-5">
            The Institute is grounded in the Fantasy Arc, a framework developed by WOS founder
            Dr. Arthur Langer. The Arc traces how people progress through five stages, from
            Indoctrinated Knowledge toward Abstracts of New Possibilities, the highest stage of
            imaginative and reflective maturity.
          </p>
          <h2 className="mt-10 font-heading text-[20px] font-semibold text-ink">
            What the Institute will focus on
          </h2>
          <ul className="m-0 mt-4 list-none space-y-3 p-0">
            {[
              "Studying how imagination and reflective maturity develop, and how to measure them",
              "Investigating how AI can support reflective, ethical, and imaginative thinking",
              "Bringing new learning models to K-12 classrooms, universities, and organizations",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-[0.7em] h-1.5 w-1.5 flex-none bg-accent" aria-hidden="true" />
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
          <div className="mt-8">
            <ArrowLink href="/ai-institute">Learn more about the Workforce AI Institute</ArrowLink>
          </div>
        </div>
      </section>
    </article>
  );
}
