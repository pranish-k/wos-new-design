import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { stagger } from "@/components/Brand";
import { personHref, roleIn, type GroupId, type PersonRecord } from "@/lib/people/store";

function Card({
  person,
  groupId,
  linked,
  H,
}: {
  person: PersonRecord;
  groupId: GroupId;
  linked: boolean;
  H: "h2" | "h3";
}) {
  return (
    <>
      {person.photo && (
        <div className="relative aspect-square w-full overflow-hidden bg-[var(--field-panel)]">
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover ${
              linked ? "transition-transform duration-700 ease-[var(--ease-fade)] group-hover:scale-[1.03]" : ""
            }`}
          />
        </div>
      )}
      <H
        className={`mt-5 font-heading text-h4 font-semibold text-[var(--field-ink)] ${
          linked ? "underline-offset-[5px] group-hover:underline" : ""
        }`}
      >
        {person.name}
      </H>
      <p className="mt-1.5 text-small text-[var(--field-muted)]">{roleIn(person, groupId)}</p>
    </>
  );
}

/**
 * Person cards, linked where the person has a bio.
 *
 * Someone with no bio has no page, so their card stays a plain card rather than becoming
 * a link to a 404. That is one field on the record now, not two files agreeing.
 *
 * Every colour is the field's, so the grid reads on whichever chapter it is placed in.
 *
 * `headingLevel` follows the outline: a group landing has no heading between its h1 and
 * the grid, so there each name is an h2.
 */
export default function PeopleGrid({
  people,
  groupId,
  headingLevel = "h3",
}: {
  people: PersonRecord[];
  groupId: GroupId;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-4">
      {people.map((person, n): ReactNode => {
        const href = personHref(person);
        return (
          <li key={person.slug} className="reveal" style={stagger(n % 4)}>
            {href ? (
              <Link href={href} className="group block no-underline">
                <Card person={person} groupId={groupId} linked H={headingLevel} />
              </Link>
            ) : (
              <Card person={person} groupId={groupId} linked={false} H={headingLevel} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
