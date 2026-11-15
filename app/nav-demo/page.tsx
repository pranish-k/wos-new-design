import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import Switcher from "@/components/nav-demo/Switcher";
import { parseVariant } from "@/components/nav-demo/variants";

/**
 * /nav-demo: the real homepage under the chosen header, in each of its variations,
 * switchable, so they can be compared on the page they would ship on. A demo, not a
 * page: unlinked, out of the sitemap, not indexed. DESIGN.md §11.
 *
 * `?v=<key>` picks the variation; the keys are in components/nav-demo/variants.ts. The
 * header itself renders in the @header slot, above <main>, where the real one lives.
 */
export const metadata: Metadata = {
  title: "Header options",
  robots: { index: false, follow: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const v = parseVariant((await searchParams).v);
  return (
    <>
      <HomePage />
      <Switcher current={v} />
    </>
  );
}
