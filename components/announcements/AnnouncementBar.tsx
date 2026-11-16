"use client";
import Link from "next/link";
import type { Announcement } from "@/content/announcements";
import { CloseButton, useDismissal } from "./dismissal";

/**
 * The strip above the header.
 *
 * Above rather than under it. Under it, the strip met the hero's red signature rule
 * edge to edge and the two reds read as a rendering fault. Above, the white header sits
 * between them, and the strip scrolls away while the sticky header stays.
 *
 * action-deep, not the guide red, because the title is 14px and white on wos-red is
 * 4.47:1. On action-deep it is 5.42:1.
 *
 * It ships open and closes after hydration for a visitor who already closed it. The
 * inline script the page sets right after it hides it before first paint, so that visitor
 * never sees it flash in and jump the hero up the page. `suppressHydrationWarning` is
 * for the `hidden` attribute that script adds, and covers this element only.
 */
export default function AnnouncementBar({ item }: { item: Announcement }) {
  const [dismissed, dismiss] = useDismissal("bar", item.id, false);
  if (dismissed) return null;

  return (
    <div
      id="announcement-bar"
      role="region"
      aria-label="Announcement"
      className="bg-action-deep text-white"
      suppressHydrationWarning
    >
      <div className="mx-auto flex w-full max-w-[1320px] items-center gap-3 px-5 py-1.5 md:px-8">
        <p className="m-0 flex-1 py-1.5 text-small">
          <span className="mr-3 font-heading font-bold">
            New
          </span>
          <Link
            href={item.href}
            className="font-heading font-semibold text-white underline underline-offset-[4px] hover:no-underline"
          >
            {item.title}
          </Link>
        </p>
        <CloseButton
          label="Dismiss announcement"
          onClick={dismiss}
          className="-mr-2 text-white hover:bg-action-deeper"
        />
      </div>
    </div>
  );
}
