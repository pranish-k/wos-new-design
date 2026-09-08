import Image from "next/image";
import Link from "next/link";
import type { ServiceCard as Card } from "@/content/home-sections";

/**
 * Photo above a slate caption bar, as on the live site.
 *
 * The live label is red on slate, which is 2.8:1 and fails AA at any size. White keeps
 * the same shape and reads; red stays on the rule above the bar.
 *
 * The lift and the growing rule are the same two gestures PhotoLedCard uses, at the same
 * durations. Swapping this component for PhotoLedCard outright was the obvious move and
 * was rejected: it requires a `description` per card, and the six service pages' meta
 * descriptions are unusable as one - /on-site-remote-staffing/ is literally "Our
 * Expertise". That is the same wall the nav's third tier hit. Rather than invent copy,
 * this card gets the gestures and keeps the live site's photo-over-caption shape.
 */
export default function ServiceCard({ card }: { card: Card }) {
  return (
    <Link
      href={card.href}
      className="group block no-underline transition-transform duration-[250ms] ease-out hover:-translate-y-[3px]"
    >
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
        <span className="block h-0.5 w-6 bg-accent transition-[width] duration-300 ease-out group-hover:w-14" />
        <p className="mt-3 font-heading text-[14px] font-semibold uppercase tracking-[0.08em] text-white">
          {card.label}
        </p>
      </div>
    </Link>
  );
}
