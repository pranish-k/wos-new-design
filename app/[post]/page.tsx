import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/Brand";
import { POSTS } from "@/content/posts";

// Posts sit at the top level on the live site (/talent-symposium/), so they do here
// too: those URLs are indexed and moving them would cost nine redirects for nothing.
// Static routes win over this dynamic one, so the service pages are unaffected.
export function generateStaticParams() {
  return POSTS.map((post) => ({ post: post.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ post: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { post: slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  return post
    ? { title: post.title, description: post.excerpt }
    : {};
}

export default async function Page({ params }: Props) {
  const { post: slug } = await params;
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
