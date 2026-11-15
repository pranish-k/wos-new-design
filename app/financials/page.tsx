import type { Metadata } from "next";
import { PAD, PageHero, TYPE, WRAP, stagger } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";
import InView from "@/components/InView";
import { AUDITED_STATEMENTS, FORM_990, type Filing } from "@/content/financial-documents";
import { LEGAL_STATUS } from "@/lib/brand";
import page from "@/content/financials";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

function Filings({ label, filings }: { label: string; filings: Filing[] }) {
  return (
    <InView>
      <h2 className={`reveal ${TYPE.h3}`}>{label}</h2>
      <ul className="m-0 mt-6 list-none p-0">
        {filings.map((f, n) => (
          <li key={`${label}-${f.year}`} className="reveal border-t-2 border-[var(--field-rule)]" style={stagger(n + 1)}>
            <a
              href={f.file}
              // A PDF is a download, not a page, and the reader deserves to know before
              // the click rather than after it.
              className="group flex items-baseline justify-between gap-4 py-4 font-heading text-[18px] font-semibold text-[var(--field-ink)] no-underline hover:text-[var(--field-ink)]"
            >
              <span className="underline-offset-[5px] group-hover:underline">Year Ending September 30th, {f.year}</span>
              <span className="text-[13px] font-semibold tracking-[0.08em] text-[var(--field-muted)]">PDF</span>
            </a>
          </li>
        ))}
      </ul>
    </InView>
  );
}

export default function Page() {
  return (
    <article>
      <PageHero
        label="About"
        title="Financials"
        lead={`${LEGAL_STATUS} Our annual filings and audited statements are published here.`}
      />

      <Chapter field="paper">
        <div className={`${WRAP} ${PAD} grid gap-14 md:grid-cols-2 md:gap-16`}>
          <Filings label="Form 990" filings={FORM_990} />
          <Filings label="Audited financial statements" filings={AUDITED_STATEMENTS} />
        </div>
      </Chapter>
    </article>
  );
}
