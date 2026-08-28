import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/Brand";
import { POSTS } from "@/content/posts";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "News, events, and announcements from Workforce Opportunity Services.",
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
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
          <Eyebrow label="News & Events" dark />
          <h1 className="font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[56px]">
            News &amp; Events
          </h1>
        </div>
      </header>

      <section className="py-16">
        <ul className="mx-auto m-0 grid max-w-6xl list-none grid-cols-1 gap-10 px-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <li key={post.slug}>
              <Link href={`/${post.slug}`} className="group block no-underline">
                {post.image && (
                  <Image
                    src={post.image}
                    alt=""
                    width={800}
                    height={500}
                    className="aspect-[8/5] w-full bg-surface-tint object-cover"
                  />
                )}
                <p className="mt-4 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                  {formatted(post.date)}
                </p>
                <h2 className="mt-2 font-heading text-[20px] font-semibold leading-[1.25] text-ink transition-colors group-hover:text-action-deep">
                  {post.title}
                </h2>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-muted">
                  {post.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
