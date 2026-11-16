import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAD, PageHero, TYPE, WRAP, stagger } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";
import InView from "@/components/InView";
import { POSTS } from "@/content/posts";

export const metadata: Metadata = {
  title: "News & Events",
  description: "News, events, and announcements from Workforce Opportunity Services.",
};

const formatted = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function Page() {
  return (
    <article>
      <PageHero title="News & Events" />

      <Chapter field="paper" label="Posts">
        <InView as="ul" className={`${WRAP} ${PAD} m-0 grid list-none grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3`}>
          {POSTS.map((post, n) => (
            <li key={post.slug} className="reveal" style={stagger(n % 3)}>
              <Link href={`/${post.slug}`} className="group block text-[var(--field-ink)] no-underline hover:text-[var(--field-ink)]">
                {post.image && (
                  <div className="relative aspect-[8/5] w-full overflow-hidden bg-surface-tint">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-fade)] group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <p className={`mt-5 ${TYPE.ui} text-[var(--field-muted)]`}>
                  <time dateTime={post.date}>{formatted(post.date)}</time>
                </p>
                <h2 className={`mt-2 ${TYPE.h4} underline-offset-[5px] group-hover:underline`}>
                  {post.title}
                </h2>
                <p className={`mt-3 ${TYPE.body} text-[var(--field-muted)]`}>{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </InView>
      </Chapter>
    </article>
  );
}
