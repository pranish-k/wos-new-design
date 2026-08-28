import Image from "next/image";
import type { Person } from "@/content/people";

/**
 * Person cards, not links.
 *
 * Open decision 4 governs whether the canonical person URL is the nested path or the
 * top-level duplicate, and 19 redirects hang off the answer. Linking these before it is
 * settled would bake one answer in silently.
 */
export default function PeopleGrid({ people }: { people: Person[] }) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((p) => (
        <li key={p.name}>
          {p.photo && (
            <Image
              src={p.photo}
              alt={p.name}
              width={480}
              height={480}
              className="aspect-square w-full bg-surface-tint object-cover"
            />
          )}
          <h3 className="mt-4 font-heading text-[18px] font-semibold leading-[1.25] text-ink">
            {p.name}
          </h3>
          <p className="mt-1 text-[15px] leading-[1.5] text-ink-muted">{p.role}</p>
        </li>
      ))}
    </ul>
  );
}
