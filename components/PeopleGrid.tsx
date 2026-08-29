import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { personHref, type PersonRecord } from "@/lib/people/store";

function Card({ person }: { person: PersonRecord }) {
  return (
    <>
      {person.photo && (
        <Image
          src={person.photo}
          alt={person.name}
          width={480}
          height={480}
          className="aspect-square w-full bg-surface-tint object-cover"
        />
      )}
      <h3 className="mt-4 font-heading text-[18px] font-semibold leading-[1.25] text-ink transition-colors group-hover:text-action-deep">
        {person.name}
      </h3>
      <p className="mt-1 text-[15px] leading-[1.5] text-ink-muted">{person.role}</p>
    </>
  );
}

/**
 * Person cards, linked where the person has a bio.
 *
 * Someone with no bio has no page, so their card stays a plain card rather than becoming
 * a link to a 404. That is one field on the record now, not two files agreeing.
 */
export default function PeopleGrid({ people }: { people: PersonRecord[] }) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person): ReactNode => {
        const href = personHref(person);
        return (
          <li key={person.slug}>
            {href ? (
              <Link href={href} className="group block no-underline">
                <Card person={person} />
              </Link>
            ) : (
              <Card person={person} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
