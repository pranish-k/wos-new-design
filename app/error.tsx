"use client";

import { useEffect } from "react";
import { Eyebrow, SecondaryButton } from "@/components/Brand";

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
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
          <Eyebrow label="Error" dark />
          <h1 className="max-w-3xl font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[56px]">
            Something went wrong
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-white/75">
            This page failed to load. Trying again often clears it.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={reset}
              className="inline-block bg-action-deep px-7 py-3 font-heading text-sm font-semibold tracking-[0.02em] text-white transition-colors hover:bg-action-deeper"
            >
              Try again
            </button>
            <SecondaryButton href="/">Return home</SecondaryButton>
          </div>

          {error.digest && (
            <p className="mt-10 font-mono text-sm text-ink-muted">
              Reference: {error.digest}
            </p>
          )}
        </div>
      </section>
    </article>
  );
}
