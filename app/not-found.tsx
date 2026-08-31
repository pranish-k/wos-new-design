import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, PrimaryButton, SecondaryButton } from "@/components/Brand";

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
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
          <Eyebrow label="404" dark />
          <h1 className="max-w-3xl font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[56px]">
            We could not find that page
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-white/75">
            The address may be mistyped, or the page may have moved since it was linked.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap gap-4">
            <PrimaryButton href="/">Return home</PrimaryButton>
            <SecondaryButton href="/contact">Contact us</SecondaryButton>
          </div>

          <Eyebrow label="Or start from" className="mt-16" />
          <ul className="m-0 grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Our Story", href: "/our-story/" },
              { label: "Managed Service Centers", href: "/managed-service-centers/" },
              { label: "Management Team", href: "/team" },
              { label: "News & Events", href: "/blog/" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[17px] text-ink no-underline hover:text-action-deep"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
