import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/Brand";
import { PERSON_PAGES } from "@/content/person-pages";

// Nested paths, because the sitemap treats those as canonical. The 19 top-level
// duplicate slugs the index cards use on the live site redirect here, in next.config.ts.
export function generateStaticParams() {
  return PERSON_PAGES.map((p) => ({ slug: p.parent, person: p.slug }));
}

export const dynamicParams = false;

const PARENT_LABEL: Record<string, string> = {
  team: "Management Team",
  "board-of-directors": "Board of Directors",
  "academic-advisory-board": "Academic Advisory Board",
};

type Props = { params: Promise<{ slug: string; person: string }> };

function find(parent: string, person: string) {
  return PERSON_PAGES.find((p) => p.parent === parent && p.slug === person);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: parent, person } = await params;
  const p = find(parent, person);
  if (!p) return {};
  const role = p.blocks.find((b) => b.kind === "para")?.text ?? "";
  return { title: p.name, description: `${p.name}. ${role}`.trim() };
}

export default async function Page({ params }: Props) {
  const { slug: parent, person } = await params;
  const p = find(parent, person);
  if (!p) notFound();

  // The first paragraph on every one of these pages is the job title, so it is set as
  // a subtitle rather than as the opening line of the biography.
  const [role, ...rest] = p.blocks;
  const hasRole = role?.kind === "para" && role.text.length < 120;
  const body = hasRole ? rest : p.blocks;

  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-20">
          <Eyebrow label={PARENT_LABEL[p.parent] ?? "WOS"} dark />
          <h1 className="font-heading text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-white md:text-[50px]">
            {p.name}
          </h1>
          {hasRole && (
            <p className="mt-4 text-[18px] leading-[1.5] text-white/80">{role.text}</p>
          )}
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
          {body.map((block, i) =>
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
            href={`/${p.parent}`}
            className="mt-10 inline-block font-heading text-[15px] font-semibold text-action-deep no-underline hover:text-action-deeper"
          >
            Back to {PARENT_LABEL[p.parent] ?? "the list"}
          </Link>
        </div>
      </div>
    </article>
  );
}
