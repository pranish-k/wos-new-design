import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroImage, PAD, PageHero, TextLink, TYPE, WRAP } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";
import { getGroup, getPerson, listPeople, listGroups, personHref, roleIn } from "@/lib/people/store";

// Nested paths, because the sitemap treats those as canonical. The top-level duplicate
// slugs the live index cards use redirect here; those live on each person's record as
// `legacyPaths` and next.config.ts builds the redirect table from them.
//
// A person's first group owns their URL. Someone on two boards also has a page under the
// second, so a visitor who came from that board sees that role and goes back to it; that
// page names the first as canonical, so search engines see one page, not two.
export function generateStaticParams() {
  return listGroups().flatMap((g) =>
    listPeople(g.id)
      .filter((p) => p.bio.length > 0)
      .map((p) => ({ slug: g.path, person: p.slug })),
  );
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string; person: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, person } = await params;
  const p = getPerson(slug, person);
  if (!p) return {};
  const canonical = personHref(p);
  return {
    title: p.name,
    description: `${p.name}. ${roleIn(p, getGroup(slug)!.id) || p.role}`.trim(),
    ...(canonical && canonical !== `/${slug}/${person}` ? { alternates: { canonical } } : {}),
  };
}

/** The portrait opens the page beside the name, as the photograph does on every page. */
export default async function Page({ params }: Props) {
  const { slug, person } = await params;
  const p = getPerson(slug, person);
  if (!p) notFound();
  const group = getGroup(slug)!;
  const role = roleIn(p, group.id);

  return (
    <article>
      <PageHero
        label={group.title}
        labelHref={`/${group.path}`}
        title={p.name}
        lead={role || undefined}
        media={p.photo ? <HeroImage src={p.photo} alt={p.name} shape="square" /> : undefined}
        mediaShape="square"
      />

      <Chapter field="paper">
        <div className={`${WRAP} ${PAD}`}>
          <div className="max-w-measure">
            {p.bio.map((block, i) =>
              block.kind === "heading" ? (
                <h2 key={i} className={`mt-12 first:mt-0 ${TYPE.h3}`}>
                  {block.text}
                </h2>
              ) : (
                <p key={i} className={`mt-5 first:mt-0 ${i === 0 ? TYPE.lead : TYPE.body}`}>
                  {block.text}
                </p>
              ),
            )}
            <TextLink href={`/${group.path}`} className="mt-14">
              Back to {group.title}
            </TextLink>
          </div>
        </div>
      </Chapter>
    </article>
  );
}
