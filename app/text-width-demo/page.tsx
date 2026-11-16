import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PAD, PAD_TIGHT, TYPE, WRAP } from "@/components/Brand";
import { Chapter, Chapters } from "@/components/Chapter";
import { getGroup, getPerson, roleIn } from "@/lib/people/store";

/**
 * /text-width-demo: four ways to set a group intro and a bio across the page instead
 * of in a narrow left column, on the real Industry Advisory Board intro and Arthur
 * Langer's bio. A demo, not a page: unlinked, out of the sitemap, not indexed.
 */
export const metadata: Metadata = {
  title: "Text width demo",
  robots: { index: false, follow: false },
};

type Mode = "wide" | "columns" | "split" | "full";

type Para = { kind: string; text?: string; items?: string[] };

function Paras({ blocks, lead = true }: { blocks: Para[]; lead?: boolean }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.kind === "heading" ? (
          <h2 key={i} className={`mt-10 break-after-avoid first:mt-0 ${TYPE.h3}`}>
            {b.text}
          </h2>
        ) : (
          <p key={i} className={`mt-5 first:mt-0 ${lead && i === 0 ? TYPE.lead : TYPE.body}`}>
            {b.text}
          </p>
        ),
      )}
    </>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="m-0 mt-10 grid list-none gap-x-10 gap-y-4 p-0 md:grid-cols-2">
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3.5 ${TYPE.body}`}>
          <span aria-hidden="true" className="mt-[calc(0.5lh-5px)] h-2.5 w-2.5 flex-none bg-[var(--field-accent)]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** The same text in each of the four arrangements. `side` is what the split puts on the left. */
function Text({ mode, blocks, side }: { mode: Mode; blocks: Para[]; side: ReactNode }) {
  const paras = blocks.filter((b) => b.kind !== "list");
  const lists = blocks.filter((b) => b.kind === "list");
  const body = (
    <>
      {mode === "columns" ? (
        // Two columns from md up: the text fills the page while each line keeps a
        // readable length. A single long paragraph flows from one column into the next.
        <div className="gap-16 md:columns-2 [&>*:first-child]:mt-0">
          <Paras blocks={paras} />
        </div>
      ) : (
        <Paras blocks={paras} />
      )}
      {lists.map((l, i) => (
        <List key={i} items={l.items ?? []} />
      ))}
    </>
  );
  if (mode === "split") {
    return (
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] md:gap-16">
        <div className={TYPE.label}>{side}</div>
        <div>{body}</div>
      </div>
    );
  }
  return <div className={mode === "wide" ? "max-w-[72ch]" : ""}>{body}</div>;
}

const OPTIONS: { mode: Mode; name: string; note: string }[] = [
  { mode: "wide", name: "A - Wider column", note: "Still starts on the left, but about 40% wider than now, so far less empty space on the right." },
  { mode: "columns", name: "B - Two columns", note: "The text fills left to right in two newspaper columns, so every line stays easy to read." },
  { mode: "split", name: "C - Label beside", note: "A small label holds the left third; the text runs from there to the right edge." },
  { mode: "full", name: "D - Full width", note: "Edge to edge, as asked. About 150 characters a line on a laptop." },
];

export default function Page() {
  const board = getGroup("industry-advisory-board");
  const person = getPerson("board-of-directors", "arthur-m-langer");
  if (!board || !person) throw new Error("text-width-demo needs the Industry Advisory Board and Arthur Langer");
  const role = roleIn(person, person.groups[0]);

  return (
    <Chapters>
      {OPTIONS.flatMap(({ mode, name, note }, n) => [
        <Chapter key={`${mode}-label`} field="slate" label={name}>
          <div className={`${WRAP} py-8`}>
            {n === 0 ? <h1 className={TYPE.h4}>{name}</h1> : <p className={TYPE.h4}>{name}</p>}
            <p className={`mt-1 ${TYPE.small} text-[var(--field-muted)]`}>{note}</p>
          </div>
        </Chapter>,
        <Chapter key={`${mode}-intro`} field="tint" label={`${name}: group intro`}>
          <div className={`${WRAP} ${PAD_TIGHT}`}>
            <Text mode={mode} blocks={board.intro as Para[]} side={board.title} />
          </div>
        </Chapter>,
        <Chapter key={`${mode}-bio`} field="paper" label={`${name}: bio`}>
          <div className={`${WRAP} ${PAD}`}>
            <Text mode={mode} blocks={person.bio} side={`${person.name}${role ? `, ${role}` : ""}`} />
          </div>
        </Chapter>,
      ])}
    </Chapters>
  );
}
