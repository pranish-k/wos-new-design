import Image from "next/image";
import { PARTNERS, type Partner } from "@/content/partners";

/**
 * Logos laid out on whitespace.
 *
 * The obvious approach is a grid of bordered cells, and it is wrong: the ruled boxes
 * read as a spreadsheet and each border competes with the mark inside it. Alignment
 * alone does the same work. Every logo is a different shape and aspect ratio, so a
 * shared max height keeps them from fighting each other without drawing a cell.
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
    <ul className="m-0 grid list-none grid-cols-2 gap-x-10 gap-y-12 p-0 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-16">
      {shown.map((p) => (
        <li key={p.src} className="flex items-center justify-center">
          <Image
            src={p.src}
            alt={p.name}
            width={240}
            height={96}
            className="max-h-10 w-auto max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
