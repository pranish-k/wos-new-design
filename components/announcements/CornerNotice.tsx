"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Announcement } from "@/content/announcements";
import { CloseButton, useDismissal } from "./dismissal";

/**
 * A small slate panel that arrives in the corner once the visitor is past the hero.
 *
 * Waiting for the scroll is the point of it. Someone still reading the hero already has
 * the announcement in front of them in the other patterns; someone three sections down
 * has shown they are staying, and that is when an aside is welcome rather than in the way.
 *
 * White with a hairline edge, the nav panel's treatment and its §4 exception: it floats
 * over whatever section is behind it. Slate was tried first and vanished into the slate
 * news band and closing band on a phone, where the notice spans the width. No shadow.
 * The arrival is §10's section-arrival gesture (opacity and a 12px rise on --ease-fade),
 * and the global reduced-motion rule collapses it.
 *
 * It ships hidden and `invisible`, so it is out of the tab order and the accessibility
 * tree until it has actually arrived.
 */
const THRESHOLD = 600;

export default function CornerNotice({ item }: { item: Announcement }) {
  const [dismissed, dismiss] = useDismissal("corner", item.id, false);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    if (dismissed || arrived) return;
    const check = () => {
      if (window.scrollY > THRESHOLD) setArrived(true);
    };
    // A reload mid-page restores the scroll position without firing a scroll event.
    const frame = requestAnimationFrame(check);
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
    };
  }, [dismissed, arrived]);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Announcement"
      className={`fixed bottom-4 left-4 right-4 z-40 border border-hairline bg-white text-ink md:left-auto md:right-6 md:bottom-6 md:w-[380px] ${
        arrived ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
      }`}
      style={{
        transition:
          "opacity var(--duration-fade) var(--ease-fade), transform var(--duration-fade) var(--ease-fade), visibility var(--duration-fade)",
      }}
    >
      <span className="block h-[3px] w-14 bg-action" />
      <div className="relative px-6 pb-6 pt-5">
        <CloseButton
          label="Dismiss announcement"
          onClick={dismiss}
          className="absolute right-2 top-2 text-ink-muted hover:bg-surface-tint hover:text-ink"
        />
        <p className="m-0 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
          {item.label}
        </p>
        <p className="m-0 mt-2 pr-8 font-heading text-[18px] font-semibold leading-[1.3]">
          {item.title}
        </p>
        <Link
          href={item.href}
          className="mt-4 inline-block font-heading text-[14px] font-semibold text-action-deep underline underline-offset-[5px] hover:text-action-deeper hover:no-underline"
        >
          {item.cta}
        </Link>
      </div>
    </aside>
  );
}
