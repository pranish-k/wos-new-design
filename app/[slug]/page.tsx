import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PAD, PAD_TIGHT, PageHero, TextLink, TYPE, WRAP, stagger } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";
import InView from "@/components/InView";
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

/**
 * A group's intro sits on tint between the gradient and the grid, which is on paper.
 * Three of the five groups have no intro copy at all, and a page that opens straight
 * into the grid is correct rather than unfinished.
 */
function GroupLanding({ path }: { path: string }) {
  const group = getGroup(path)!;
  const people = listPeople(group.id);
  return (
    <article>
      <PageHero label={group.eyebrow} title={group.title} />

      {group.intro.length > 0 && (
        <Chapter field="tint">
          <InView className={`${WRAP} ${PAD_TIGHT}`}>
            <div className="max-w-measure">
              {group.intro.map((block, i) =>
                block.kind === "list" ? (
                  <ul key={i} className="m-0 mt-8 grid list-none gap-x-10 p-0 md:grid-cols-2">
                    {block.items.map((item, j) => (
                      <li
                        key={item}
                        className={`reveal border-t-2 border-[var(--field-rule)] py-3 ${TYPE.body}`}
                        style={stagger(j)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : block.kind === "para" ? (
                  <p key={i} className={`reveal mt-5 first:mt-0 ${i === 0 ? TYPE.lead : TYPE.body}`} style={stagger(i)}>
                    {block.text}
                  </p>
                ) : null,
              )}
            </div>
          </InView>
        </Chapter>
      )}

      <Chapter field="paper" label="Members">
        <InView className={`${WRAP} ${PAD}`}>
          <PeopleGrid people={people} groupId={group.id} headingLevel="h2" />
        </InView>
      </Chapter>
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
      <PageHero label="News & Events" labelHref="/blog" title={post.title}>
        <p className={`rise-in mt-6 ${TYPE.label}`}>
          <time dateTime={post.date}>{date}</time>
        </p>
      </PageHero>

      <Chapter field="paper">
        <div className={`${WRAP} ${PAD}`}>
          {post.image && (
            <div className="relative mb-14 aspect-[16/9] w-full max-w-5xl overflow-hidden bg-surface-tint md:mb-16">
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(min-width: 1100px) 1024px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="max-w-measure">
            {post.blocks.map((block, i) =>
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

            <TextLink href="/blog" className="mt-14">
              All news &amp; events
            </TextLink>
          </div>
        </div>
      </Chapter>
    </article>
  );
}
