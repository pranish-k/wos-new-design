import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/Brand";
import { getGroup, getPerson, listPeople, listGroups } from "@/lib/people/store";

// Nested paths, because the sitemap treats those as canonical. The top-level duplicate
// slugs the live index cards use redirect here; those live on each person's record as
// `legacyPaths` and next.config.ts builds the redirect table from them.
//
// A person's first group owns their URL, so someone on two boards still has one page.
export function generateStaticParams() {
  return listGroups().flatMap((g) =>
    listPeople(g.id)
      .filter((p) => p.groups[0] === g.id && p.bio.length > 0)
      .map((p) => ({ slug: g.path, person: p.slug })),
  );
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string; person: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, person } = await params;
  const p = getPerson(slug, person);
  if (!p) return {};
  return { title: p.name, description: `${p.name}. ${p.role}`.trim() };
}

export default async function Page({ params }: Props) {
  const { slug, person } = await params;
  const p = getPerson(slug, person);
  if (!p) notFound();
  const group = getGroup(slug)!;

  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-20">
          <Eyebrow label={group.title} dark />
          <h1 className="font-heading text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-white md:text-[50px]">
            {p.name}
          </h1>
          {p.role && <p className="mt-4 text-[18px] leading-[1.5] text-white/80">{p.role}</p>}
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-[320px_1fr]">
        {p.photo && (
          <Image
            src={p.photo}
            alt={p.name}
            width={640}
            height={640}
            className="aspect-square w-full bg-surface-tint object-cover"
            priority
          />
        )}
        <div>
          {p.bio.map((block, i) =>
            block.kind === "heading" ? (
              <h2
                key={i}
                className="mt-8 font-heading text-[20px] font-semibold leading-[1.25] text-ink first:mt-0"
              >
                {block.text}
              </h2>
            ) : (
              <p key={i} className="mt-4 text-[17px] leading-[1.7] text-ink-muted first:mt-0">
                {block.text}
              </p>
            ),
          )}
          <Link
            href={`/${group.path}`}
            className="mt-10 inline-block font-heading text-[15px] font-semibold text-action-deep no-underline hover:text-action-deeper"
          >
            Back to {group.title}
          </Link>
        </div>
      </div>
    </article>
  );
}
