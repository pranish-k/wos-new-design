import { Eyebrow, Divider, PrimaryButton, PullQuote } from "@/components/Brand";
import { ORG, TAGLINE } from "@/lib/brand";

/**
 * Phase 1 scaffold.
 *
 * This is not the homepage. It exercises one primitive from each layer of the design
 * system so that the DESIGN.md §9 checks have something real to verify: a token that
 * is declared but never consumed still lands in :root via @theme, but a token that is
 * consumed through a misspelled utility produces no rule and no error, and only a page
 * that actually uses the utilities can surface that.
 *
 * Replaced wholesale in phase 3.
 */
export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Eyebrow label="Scaffold" />
      <h1 className="font-heading text-[44px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink md:text-[64px]">
        {ORG}
      </h1>
      <p className="mt-6 text-lg leading-[1.65] text-ink-muted">{TAGLINE}</p>

      <Divider />

      <PullQuote quote="Design system ported. Tokens, primitives, and fonts are in place; navigation and page content come next." />

      <div className="mt-10 bg-surface-tint p-8">
        <p className="m-0 text-sm leading-[1.55] text-ink-muted">
          This block is <code>surface-tint</code>, the neutral card fill. If it reads as
          pink, cream, or teal rather than as a plain light grey, a token has regressed.
        </p>
      </div>

      <div className="mt-8">
        <PrimaryButton href="/">Primary action</PrimaryButton>
      </div>
    </div>
  );
}
