import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/Brand";
import PeopleGrid from "@/components/PeopleGrid";
import { POSTS } from "@/content/posts";
import { getGroup, listGroups, listPeople } from "@/lib/people/store";

// Two kinds of thing live at the top level: blog posts and people-group landing pages.
//
// Posts sit at the top level on the live site (/talent-symposium/), so they do here too:
// those URLs are indexed and moving them would cost nine redirects for nothing. The
// groups sit beside them because /[slug]/[person] already resolves this same segment as
// a group parent, and Next allows only one dynamic segment name per position in a path.
//
// Static routes win over this dynamic one, so the service pages are unaffected.
export function generateStaticParams() {
  const groups = listGroups().map((g) => g.path);
  const posts = POSTS.map((p) => p.slug);
  const clash = posts.filter((s) => groups.includes(s));
  if (clash.length) {
    throw new Error(`slug claimed by both a post and a people group: ${clash.join(", ")}`);
  }
  return [...groups, ...posts].map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const group = getGroup(slug);
  if (group) return { title: group.title, description: group.description };
  const post = POSTS.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

function GroupLanding({ path }: { path: string }) {
  const group = getGroup(path)!;
  const people = listPeople(group.id);
  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
          <Eyebrow label={group.eyebrow} dark />
          <h1 className="font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[56px]">
            {group.title}
          </h1>
        </div>
      </header>

      {group.intro.length > 0 && (
        <section className="bg-surface-tint py-14">
          <div className="mx-auto max-w-3xl px-6">
            {group.intro.map((block, i) =>
              block.kind === "list" ? (
                <ul key={i} className="mt-5 list-none space-y-2 p-0">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="border-l-2 border-accent pl-4 text-[17px] leading-[1.6] text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : block.kind === "para" ? (
                <p key={i} className="mt-5 text-[17px] leading-[1.7] text-ink-muted first:mt-0">
                  {block.text}
                </p>
              ) : null,
            )}
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <PeopleGrid people={people} groupId={group.id} />
        </div>
      </section>
    </article>
  );
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (getGroup(slug)) return <GroupLanding path={slug} />;

  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const date = new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-3xl px-6 pb-14 pt-20">
          <Eyebrow label={date} dark />
          <h1 className="font-heading text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-white md:text-[46px]">
            {post.title}
          </h1>
        </div>
      </header>

      {post.image && (
        <Image
          src={post.image}
          alt=""
          width={1600}
          height={900}
          className="mx-auto aspect-[16/9] w-full max-w-5xl bg-surface-tint object-cover"
          priority
        />
      )}

      <div className="mx-auto max-w-3xl px-6 py-14">
        {post.blocks.map((block, i) =>
          block.kind === "heading" ? (
            <h2
              key={i}
              className="mt-10 font-heading text-[24px] font-semibold leading-[1.2] text-ink first:mt-0"
            >
              {block.text}
            </h2>
          ) : (
            <p key={i} className="mt-4 text-[17px] leading-[1.7] text-ink-muted">
              {block.text}
            </p>
          ),
        )}

        <Link
          href="/blog"
          className="mt-12 inline-block font-heading text-[15px] font-semibold text-action-deep no-underline hover:text-action-deeper"
        >
          All news &amp; events
        </Link>
      </div>
    </article>
  );
}
