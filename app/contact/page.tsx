import type { Metadata } from "next";
import { Eyebrow, PrimaryButton } from "@/components/Brand";
import { ContentSections } from "@/components/ContentPage";
import { CAREERS_URL, HQ, ORG_SHORT } from "@/lib/brand";
import page from "@/content/contact";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

/**
 * No contact form yet.
 *
 * The live page posts to WPForms, which goes away with WordPress, and where those
 * submissions should land is not decided. A form that silently drops enquiries is worse
 * than an address, so the address is what this page gives until there is a backend.
 */
export default function Page() {
  return (
    <article>
      <header className="bg-surface-dark">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
          <Eyebrow label="Contact" dark />
          <h1 className="max-w-3xl font-heading text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[56px]">
            Keep in touch and connect with us today
          </h1>
        </div>
      </header>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div>
            <Eyebrow label={HQ.name} />
            <address className="not-italic text-[17px] leading-[1.7] text-ink-muted">
              {HQ.street}
              <br />
              {HQ.unit}
              <br />
              {HQ.city}
            </address>
            <p className="mt-5 text-[17px] leading-[1.7] text-ink-muted">
              <a href={HQ.phoneHref} className="text-ink no-underline hover:text-action-deep">
                {HQ.phone}
              </a>
              <br />
              <a
                href="mailto:info@wforce.org"
                className="text-ink no-underline hover:text-action-deep"
              >
                info@wforce.org
              </a>
            </p>
          </div>

          <div>
            <Eyebrow label="Looking for work?" />
            <p className="text-[17px] leading-[1.65] text-ink-muted">
              {ORG_SHORT} roles are posted and managed on our careers site, not here.
            </p>
            <div className="mt-6">
              <PrimaryButton href={CAREERS_URL}>View open roles</PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      <ContentSections sections={page.sections} offset={1} />
    </article>
  );
}
