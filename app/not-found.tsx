import type { Metadata } from "next";
import Link from "next/link";
import { PAD_TIGHT, PageHero, PrimaryButton, SecondaryButton, TYPE, WRAP } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * The 404.
 *
 * Next's default is unstyled body text inside our chrome, which reads as a broken
 * deploy rather than a wrong URL. The routes offered below are the four the live
 * analytics would call load bearing, and they are hardcoded rather than pulled from
 * NAV because NAV's top level is groupings, not destinations.
 */
export default function NotFound() {
  return (
    <article>
      <PageHero
        label="404"
        title="We could not find that page"
        lead="The address may be mistyped, or the page may have moved since it was linked."
        actions={
          <>
            <PrimaryButton href="/">Return home</PrimaryButton>
            <SecondaryButton href="/contact">Contact us</SecondaryButton>
          </>
        }
      />

      <Chapter field="paper">
        <div className={`${WRAP} ${PAD_TIGHT}`}>
          <h2 className={TYPE.label}>Or start from</h2>
          <ul className="m-0 mt-4 grid list-none gap-x-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Our Story", href: "/our-story/" },
              { label: "Managed Service Centers", href: "/managed-service-centers/" },
              { label: "Management Team", href: "/team" },
              { label: "News & Events", href: "/blog/" },
            ].map((item) => (
              <li key={item.href} className="border-t-2 border-[var(--field-rule)]">
                <Link
                  href={item.href}
                  className="block py-4 font-heading text-body font-semibold leading-snug text-[var(--field-ink)] no-underline underline-offset-[5px] hover:text-[var(--field-ink)] hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Chapter>
    </article>
  );
}
