import Link from "next/link";
import type { Announcement } from "@/content/announcements";

/**
 * One line under the hero buttons, set off by a hairline rather than a box.
 *
 * It lives in the hero because that is the one place every visitor is guaranteed to
 * look, and it is a line rather than a third button because three actions in a hero is
 * no primary action. Not closable: it is part of the page, not something over it.
 *
 * The "New" chip is an action-deep fill with white type, the button pairing at 5.42:1.
 * It is solid, so it reads the same over whatever part of the photograph it lands on.
 */
export default function HeroNotice({ item }: { item: Announcement }) {
  return (
    <Link
      href={item.href}
      className="group mt-12 flex max-w-2xl items-start gap-4 border-t border-white/25 pt-6 no-underline md:items-center"
    >
      <span className="mt-0.5 flex-shrink-0 bg-action-deep px-2.5 py-1 font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-white md:mt-0">
        New
      </span>
      <span className="font-heading text-[16px] font-semibold leading-[1.4] text-white underline decoration-white/40 underline-offset-[5px] transition-colors group-hover:decoration-white">
        {item.title}
      </span>
    </Link>
  );
}
