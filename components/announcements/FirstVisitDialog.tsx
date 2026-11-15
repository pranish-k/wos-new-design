"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Announcement } from "@/content/announcements";
import { CloseButton, useDismissal } from "./dismissal";

/**
 * Opens once, on the first page view after an announcement goes up, and never again.
 *
 * "Seen" is recorded when it opens, not when it closes. A visitor who follows the link
 * leaves the page without closing anything, and should not meet the same dialog on the
 * way back.
 *
 * A native <dialog> opened with showModal(), which supplies the focus trap, Escape, the
 * inert page behind it and the return of focus, none of which a hand-built overlay gets
 * right for free. A click on the backdrop closes it too; the backdrop is the dialog's
 * own box, so a click that lands on the dialog element itself rather than its content
 * is a click outside the panel.
 *
 * Focus goes to the panel, not to the first control. showModal() would otherwise land
 * on the close button and draw a focus ring round it before the visitor has touched
 * anything, which reads as a selected X. The panel is labelled, so a screen reader still
 * announces the dialog, and the next Tab reaches the close button.
 *
 * It ships closed (`serverValue` true), so the server HTML never has a modal over it.
 */
export default function FirstVisitDialog({ item }: { item: Announcement }) {
  const ref = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [seen, markSeen] = useDismissal("dialog", item.id, true);

  useEffect(() => {
    const dialog = ref.current;
    if (seen || !dialog || dialog.open) return;
    dialog.showModal();
    panel.current?.focus();
    markSeen();
  }, [seen, markSeen]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="first-visit-heading"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg border-0 bg-white p-0 text-ink backdrop:bg-surface-deep/70"
    >
      <span className="block h-[3px] w-20 bg-action" />
      <div ref={panel} tabIndex={-1} className="relative px-8 pb-9 pt-8 outline-none md:px-10">
        <CloseButton
          label="Close"
          onClick={close}
          className="absolute right-3 top-3 text-ink-muted hover:bg-surface-tint hover:text-ink"
        />
        <p className="mb-3 font-heading text-[15px] font-semibold text-ink-muted">{item.label}</p>
        <h2
          id="first-visit-heading"
          className="pr-8 font-heading text-[26px] font-semibold leading-[1.15] tracking-[-0.015em] text-ink md:text-[30px]"
        >
          {item.title}
        </h2>
        <p className="mt-4 text-[16px] leading-[1.65] text-ink-muted">{item.summary}</p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          {/* Hand-rolled to PrimaryButton's md classes rather than PrimaryButton itself,
              because it has to close the dialog on the way out. */}
          <Link
            href={item.href}
            onClick={close}
            className="inline-block bg-action-deep px-7 py-3.5 font-heading text-[15px] font-semibold tracking-[0.01em] text-white no-underline transition-colors hover:bg-action-deeper hover:text-white"
          >
            {item.cta}
          </Link>
          <button
            type="button"
            onClick={close}
            className="font-heading text-sm font-semibold text-ink-muted underline underline-offset-[4px] transition-colors hover:text-ink"
          >
            Not now
          </button>
        </div>
      </div>
    </dialog>
  );
}
