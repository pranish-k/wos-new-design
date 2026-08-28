import type { Metadata } from "next";
import { Eyebrow } from "@/components/Brand";
import { AUDITED_STATEMENTS, FORM_990, type Filing } from "@/content/financial-documents";
import { LEGAL_STATUS } from "@/lib/brand";
import page from "@/content/financials";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

function Filings({ label, filings }: { label: string; filings: Filing[] }) {
  return (
    <div>
      <h2 className="font-heading text-[24px] font-semibold leading-[1.2] text-ink">
        {label}
      </h2>
      <ul className="mt-5 list-none p-0">
        {filings.map((f) => (
          <li key={`${label}-${f.year}`} className="border-t border-hairline">
            <a
              href={f.file}
              // A PDF is a download, not a page, and the reader deserves to know
              // before the click rather than after it.
              className="flex items-baseline justify-between gap-4 py-4 text-[17px] text-ink no-underline transition-colors hover:text-action-deep"
            >
              <span>Year ending September 30th, {f.year}</span>
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                PDF
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Page() {
  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
          <Eyebrow label="About" dark />
          <h1 className="font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[56px]">
            Financials
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.65] text-white/80">
            {LEGAL_STATUS} Our annual filings and audited statements are published here.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <Filings label="Form 990" filings={FORM_990} />
          <Filings label="Audited financial statements" filings={AUDITED_STATEMENTS} />
        </div>
      </section>
    </article>
  );
}
