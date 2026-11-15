import type { Metadata } from "next";
import { HeroImage, PAD, PageHero, PrimaryButton, TYPE, WRAP, stagger } from "@/components/Brand";
import { Chapter, fieldClass } from "@/components/Chapter";
import { ContentSections } from "@/components/ContentPage";
import InView from "@/components/InView";
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
 *
 * The address is set as display type because it is the content of the page, and the
 * careers line sits on its own crimson panel: it is a different audience with a
 * different destination, and it should not read as part of the address.
 */
export default function Page() {
  const contact = "font-heading text-[22px] font-semibold leading-snug text-[var(--field-ink)] no-underline underline-offset-[6px] hover:text-[var(--field-ink)] hover:underline md:text-[26px]";

  return (
    <article>
      <PageHero
        label="Contact"
        title="Keep in touch and connect with us today"
        media={page.hero ? <HeroImage src={page.hero.src} alt="" /> : undefined}
      />

      <Chapter field="paper">
        <InView className={`${WRAP} ${PAD} grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16`}>
          <div>
            <h2 className={`reveal ${TYPE.label}`}>{HQ.name}</h2>
            <address className={`reveal mt-4 not-italic ${TYPE.statement} text-[clamp(28px,3.2vw,42px)]`} style={stagger(1)}>
              {HQ.street}
              <br />
              {HQ.unit}
              <br />
              {HQ.city}
            </address>
            <div className="reveal mt-8 flex flex-col gap-2 border-t-2 border-[var(--field-rule)] pt-6" style={stagger(2)}>
              <a href={HQ.phoneHref} className={contact}>
                {HQ.phone}
              </a>
              <a href="mailto:info@wforce.org" className={contact}>
                info@wforce.org
              </a>
            </div>
          </div>

          <div className={`reveal ${fieldClass("crimson")} flex flex-col justify-between gap-10 p-8 md:p-10`} style={stagger(2)}>
            <div>
              <h2 className={TYPE.h3}>Looking for work?</h2>
              <p className={`mt-4 ${TYPE.body} text-[var(--field-muted)]`}>
                {ORG_SHORT} roles are posted and managed on our careers site, not here.
              </p>
            </div>
            <div>
              <PrimaryButton href={CAREERS_URL}>View open roles</PrimaryButton>
            </div>
          </div>
        </InView>
      </Chapter>

      {/* The section's heading is the page title the opening already carries, so it is
          dropped here rather than set twice. Its paragraph stays. */}
      <ContentSections sections={page.sections.map((section) => ({ ...section, heading: undefined }))} after="paper" />
    </article>
  );
}
