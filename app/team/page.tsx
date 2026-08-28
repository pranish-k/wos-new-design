import type { Metadata } from "next";
import { Eyebrow } from "@/components/Brand";
import PeopleGrid from "@/components/PeopleGrid";
import { TEAM } from "@/content/people";

export const metadata: Metadata = {
  title: "Management Team",
  description: "The people who run Workforce Opportunity Services.",
};

export default function Page() {
  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
          <Eyebrow label="About" dark />
          <h1 className="font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[56px]">
            Management Team
          </h1>
        </div>
      </header>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <PeopleGrid people={TEAM} />
        </div>
      </section>
    </article>
  );
}
