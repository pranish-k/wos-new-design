import Image from "next/image";
import { PARTNERS, type Partner } from "@/content/partners";

/**
 * Partner logos as white tiles on a tinted ground, six across, matching the live site.
 *
 * This is a deliberate exception to the no-box and no-shadow rules in DESIGN.md, and the
 * only one on the site. A logo wall is not content in a container: every mark is a
 * different shape, colour and aspect ratio, and many are drawn for a white background.
 * Laid on bare tint they fight each other and the darker marks read as heavier. A uniform
 * tile is what makes eighty-odd unrelated logos scan as one set, which is why almost every
 * logo wall is built this way.
 *
 * The section behind this must be tinted. On white the tiles vanish and the shadow is the
 * only thing separating them, which is exactly the cheap look the rule exists to prevent.
 */
export default function PartnerWall({
  partners = PARTNERS,
  limit,
}: {
  partners?: readonly Partner[];
  limit?: number;
}) {
  const shown: readonly Partner[] = limit ? partners.slice(0, limit) : partners;
  return (
    <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3 lg:grid-cols-6">
      {shown.map((p) => (
        <li key={p.src} className="flex h-24 items-center justify-center bg-white p-4 shadow-sm">
          <Image
            src={p.src}
            // Around 30 of these files are named Picture1.png through Picture38.png and
            // nothing on the live page identifies the company. They are marked decorative
            // so a screen reader skips them rather than announcing a filename. Filling in
            // a name here is all it takes to expose one properly.
            alt={p.name}
            width={240}
            height={96}
            className="max-h-12 w-auto max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
