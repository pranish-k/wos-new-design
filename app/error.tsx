"use client";

import { useEffect } from "react";
import { PAD_TIGHT, PageHero, SecondaryButton, WRAP } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";

/**
 * The route-level error boundary.
 *
 * Without one, a throw anywhere below the root layout renders Next's own error screen,
 * which on a static marketing site looks like the whole deploy fell over. This keeps
 * the chrome and offers the retry.
 *
 * The retry control is a button rather than PrimaryButton, which renders a Link: `reset`
 * re-renders the segment in place and has no href to point at. Its classes are
 * PrimaryButton's on purpose so the two read as the same control.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The digest is the only handle on the server-side stack, which Next withholds from
    // the browser in production. Without this line a production fault is unattributable.
    console.error(error);
  }, [error]);

  return (
    <article>
      <PageHero
        label="Error"
        title="Something went wrong"
        lead="This page failed to load. Trying again often clears it."
        actions={
          <>
            <button
              type="button"
              onClick={reset}
              className="inline-block cursor-pointer bg-[var(--field-btn)] px-7 py-3.5 font-heading text-small font-semibold text-[var(--field-btn-ink)] transition-colors hover:bg-[var(--field-btn-hover)]"
            >
              Try again
            </button>
            <SecondaryButton href="/">Return home</SecondaryButton>
          </>
        }
      />

      {error.digest && (
        <Chapter field="paper">
          <p className={`${WRAP} ${PAD_TIGHT} font-mono text-small text-[var(--field-muted)]`}>Reference: {error.digest}</p>
        </Chapter>
      )}
    </article>
  );
}
