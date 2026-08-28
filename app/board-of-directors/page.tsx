import type { Metadata } from "next";
import { Eyebrow } from "@/components/Brand";
import PeopleGrid from "@/components/PeopleGrid";
import { BOARD_OF_DIRECTORS } from "@/content/people";

export const metadata: Metadata = {
  title: "Board of Directors",
  description: "The Workforce Opportunity Services board of directors.",
};

export default function Page() {
  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
          <Eyebrow label="About" dark />
          <h1 className="font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[56px]">
            Board of Directors
          </h1>
        </div>
      </header>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <PeopleGrid people={BOARD_OF_DIRECTORS} />
        </div>
      </section>
    </article>
  );
}
