import type { Metadata } from "next";
import CornerNotice from "@/components/announcements/CornerNotice";
import FirstVisitDialog from "@/components/announcements/FirstVisitDialog";
import HeroNotice from "@/components/announcements/HeroNotice";
import NewsBand from "@/components/announcements/NewsBand";
import { parsePatterns, type PatternKey } from "@/components/announcements/patterns";
import HomePage from "@/components/HomePage";
import { ANNOUNCEMENT } from "@/content/announcements";

/**
 * /announcements-demo: the real homepage with ways of putting an announcement in front
 * of a visitor laid over it, each switchable, so they can be compared on the page they
 * would ship on. A demo, not a page: unlinked, out of the sitemap, not indexed.
 * DESIGN.md §12.
 *
 * `?show=bar,hero` picks the patterns; with no query it shows all five.
 * The bar is not rendered here: it sits above the header, which this page
 * cannot reach, so app/@banner/announcements-demo renders it from the same query.
 */
export const metadata: Metadata = {
  title: "Announcements demo",
  robots: { index: false, follow: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const show = parsePatterns((await searchParams).show);
  const on = (key: PatternKey) => show.includes(key);

  return (
    <>
      <HomePage
        heroNotice={on("hero") ? <HeroNotice item={ANNOUNCEMENT} /> : undefined}
        afterImpact={on("band") ? <NewsBand item={ANNOUNCEMENT} /> : undefined}
      />
      {on("dialog") && <FirstVisitDialog item={ANNOUNCEMENT} />}
      {on("corner") && <CornerNotice item={ANNOUNCEMENT} />}
    </>
  );
}
