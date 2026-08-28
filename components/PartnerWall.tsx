import Image from "next/image";
import { PARTNERS, type Partner } from "@/content/partners";

/**
 * A logo wall of 68 marks in one grid.
 *
 * Every logo is a different shape, colour, and aspect ratio, which is what makes these
 * walls read as clutter. A fixed cell with the logo contained inside it, on
 * surface-tint, gives them a shared footprint without drawing a box around each one.
 */
export default function PartnerWall({ limit }: { limit?: number }) {
  const shown: Partner[] = limit ? PARTNERS.slice(0, limit) : PARTNERS;
  return (
    <ul className="m-0 grid list-none grid-cols-2 gap-px bg-hairline p-0 sm:grid-cols-3 lg:grid-cols-4">
      {shown.map((p) => (
        <li key={p.src} className="flex h-28 items-center justify-center bg-white px-6">
          <Image
            src={p.src}
            alt={p.name}
            width={200}
            height={80}
            className="max-h-12 w-auto object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
