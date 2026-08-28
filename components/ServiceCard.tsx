import Image from "next/image";
import Link from "next/link";
import type { ServiceCard as Card } from "@/content/home-sections";

/**
 * Photo above a slate caption bar, as on the live site.
 *
 * The live label is red on slate, which is 2.8:1 and fails AA at any size. White keeps
 * the same shape and reads; red stays on the rule above the bar.
 */
export default function ServiceCard({ card }: { card: Card }) {
  return (
    <Link href={card.href} className="group block no-underline">
      <div className="overflow-hidden">
        <Image
          src={card.image}
          alt={card.imageAlt}
          width={800}
          height={600}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="bg-surface-dark px-5 py-4">
        <span className="block h-0.5 w-6 bg-accent" />
        <p className="mt-3 font-heading text-[14px] font-semibold uppercase tracking-[0.08em] text-white">
          {card.label}
        </p>
      </div>
    </Link>
  );
}
