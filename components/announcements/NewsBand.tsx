import Link from "next/link";
import { PAD, SecondaryButton, TextLink, TYPE, WRAP, stagger } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";
import InView from "@/components/InView";
import type { Announcement } from "@/content/announcements";
import { POSTS } from "@/content/posts";

const formatted = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/**
 * The announcement and the three newest posts, as a homepage chapter.
 *
 * Slate, because it lands between the tint impact chapter and the deep overview film,
 * and slate is the one field that differs from both.
 *
 * The announcement takes the wide column and the posts are a list, not cards. Three
 * photo cards would outweigh the announcement they are meant to sit under, and the
 * archive at /blog is already the card grid.
 *
 * SecondaryButton rather than PrimaryButton: the opening and the close already carry
 * the page's filled red, and a third would make none of them the primary action.
 */
export default function NewsBand({ item }: { item: Announcement }) {
  const latest = [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <Chapter field="slate" label={item.label}>
      <InView className={`${WRAP} ${PAD} grid gap-14 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-20`}>
        <div>
          <p className={`reveal ${TYPE.label}`}>{item.label}</p>
          <h2 className={`reveal mt-4 max-w-[22ch] ${TYPE.h2}`} style={stagger(1)}>
            {item.title}
          </h2>
          <p className={`reveal mt-6 max-w-[52ch] ${TYPE.lead} text-[var(--field-muted)]`} style={stagger(2)}>
            {item.summary}
          </p>
          <div className="reveal mt-9" style={stagger(3)}>
            <SecondaryButton href={item.href}>{item.cta}</SecondaryButton>
          </div>
        </div>

        <div>
          <h3 className={`reveal ${TYPE.label}`} style={stagger(1)}>
            Latest news
          </h3>
          <ul className="m-0 mt-3 list-none p-0">
            {latest.map((post, n) => (
              <li key={post.slug} className="reveal border-t-2 border-[var(--field-rule)]" style={stagger(n + 2)}>
                <Link href={`/${post.slug}`} className="group block py-5 text-[var(--field-ink)] no-underline hover:text-[var(--field-ink)]">
                  <p className="m-0 text-[15px] text-[var(--field-muted)]">
                    <time dateTime={post.date}>{formatted(post.date)}</time>
                  </p>
                  <p className="m-0 mt-1.5 font-heading text-[19px] font-semibold leading-[1.3] underline-offset-[5px] group-hover:underline">
                    {post.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <TextLink href="/blog" className="reveal mt-4">
            All news and events
          </TextLink>
        </div>
      </InView>
    </Chapter>
  );
}
