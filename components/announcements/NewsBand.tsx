import Link from "next/link";
import { Eyebrow, SecondaryButton } from "@/components/Brand";
import FadeIn from "@/components/FadeIn";
import type { Announcement } from "@/content/announcements";
import { POSTS } from "@/content/posts";

const formatted = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/**
 * The announcement and the three newest posts, as a homepage section.
 *
 * Slate, because it lands between the tint impact band and the white Business Solution
 * section: tint would merge with the band above, and white would leave two white
 * sections running into one. Slate after tint after the slate hero is legal under §8,
 * since the tint sits between them.
 *
 * The announcement takes the wide column and the posts are a list, not cards. Three
 * photo cards would outweigh the announcement they are meant to sit under, and the
 * archive at /blog is already the card grid.
 *
 * SecondaryButton rather than PrimaryButton: the hero and the closing band already carry
 * the page's filled red, and a third would make none of them the primary action.
 */
export default function NewsBand({ item }: { item: Announcement }) {
  const latest = [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <section aria-labelledby="news-band-heading" className="bg-surface-dark py-16 md:py-20">
      <FadeIn className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[1.3fr_1fr] md:gap-20">
        <div>
          <Eyebrow label={item.label} dark />
          <h2
            id="news-band-heading"
            className="max-w-xl font-heading text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] text-white md:text-[40px]"
          >
            {item.title}
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-white/75">{item.summary}</p>
          <div className="mt-8">
            <SecondaryButton href={item.href} dark>
              {item.cta}
            </SecondaryButton>
          </div>
        </div>

        <div>
          <Eyebrow label="Latest news" dark />
          <ul className="m-0 list-none p-0">
            {latest.map((post) => (
              <li key={post.slug} className="border-t border-white/15 first:border-t-0">
                <Link href={`/${post.slug}`} className="group block py-5 no-underline">
                  <p className="m-0 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-white/75">
                    {formatted(post.date)}
                  </p>
                  <p className="m-0 mt-2 font-heading text-[17px] font-semibold leading-[1.35] text-white underline decoration-transparent underline-offset-[5px] transition-colors group-hover:decoration-white">
                    {post.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/blog"
            className="mt-2 inline-block font-heading text-[15px] font-semibold text-white underline underline-offset-[5px] hover:no-underline"
          >
            All news and events
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
