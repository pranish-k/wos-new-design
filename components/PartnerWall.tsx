import Image from "next/image";
import { PARTNERS, type Partner } from "@/content/partners";

/**
 * Partner logos as white tiles on a tinted ground, four across at full width.
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
 *
 * The grid reflows on track width rather than on breakpoints. `auto-fill` with a 240px
 * minimum fits exactly four tracks in the 6xl container and drops to three, two and one
 * as the window narrows, continuously and at whatever width the content actually runs
 * out of room. Breakpoint columns would jump at three fixed sizes and leave a stranded
 * gap either side of each jump. `auto-fill` rather than `auto-fit` so a short final row
 * keeps its tile width instead of stretching to fill the line.
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
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))] gap-4 p-0">
      {shown.map((p) => (
        <li key={p.src} className="flex h-28 items-center justify-center bg-white p-6 shadow-sm">
          <Image
            src={p.src}
            // Around 30 of these files are named Picture1.png through Picture38.png and
            // nothing on the live page identifies the company. They are marked decorative
            // so a screen reader skips them rather than announcing a filename. Filling in
            // a name here is all it takes to expose one properly.
            alt={p.name}
            width={240}
            height={96}
            className="max-h-14 w-auto max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
