import type { Metadata } from "next";
import { ArrowLink, Eyebrow, SectionHeading } from "@/components/Brand";
import ContentPage from "@/components/ContentPage";
import FadeIn from "@/components/FadeIn";
import { mapLink, mapSrc, OFFICES, type Office } from "@/content/offices";
import page from "@/content/locations";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

/**
 * Address beside its map, one band per office.
 *
 * The map is the larger half: on a locations page it is the content, and an address a
 * visitor cannot place is the thing the page exists to fix. The frame is square-edged
 * and sits on a tint fill, so a blocked or slow iframe leaves a panel rather than a hole.
 *
 * `loading="lazy"` is doing privacy work as well as performance work. Three eager frames
 * would hand Google a request for every visitor who lands on the page, including the
 * ones who never scroll to Dallas or Costa Rica.
 */
function OfficeBand({ office, tint }: { office: Office; tint: boolean }) {
  return (
    <section className={tint ? "bg-surface-tint py-16" : "py-16"}>
      <FadeIn className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-6 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="block h-0.5 w-6 bg-accent" />
          <h2 className="mt-3 font-heading text-[24px] font-semibold leading-[1.2] text-ink md:text-[28px]">
            {office.name}
          </h2>

          {/* not-italic: the browser default for <address> is italic, which reads as a
              quotation rather than as somewhere you can go. */}
          <address className="mt-5 not-italic text-[17px] leading-[1.65] text-ink-muted">
            {office.street.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block">{office.locality}</span>
            {office.country && <span className="block">{office.country}</span>}
          </address>

          {/* Email above phone, unlabelled, continuing the address block. Both are
              self-evident from their shape, and "Tel" as a label is a line of chrome
              between a visitor and the thing they came to copy. */}
          {(office.email || office.tel) && (
            <p className="mt-5 border-t border-hairline pt-5 text-[16px] leading-[1.7]">
              {office.email && (
                <a href={`mailto:${office.email}`} className="block">
                  {office.email}
                </a>
              )}
              {office.tel && (
                <a
                  href={`tel:+1${office.tel.replace(/\D/g, "")}`}
                  className="block"
                >
                  {office.tel}
                </a>
              )}
            </p>
          )}

          <div className="mt-6">
            <ArrowLink href={mapLink(office.mapQuery)}>
              Open in Google Maps
            </ArrowLink>
          </div>
        </div>

        <div className="bg-surface-tint">
          <iframe
            src={mapSrc(office.mapQuery)}
            title={office.mapLabel}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[320px] w-full border-0 md:h-[400px]"
          />
        </div>
      </FadeIn>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <ContentPage page={page} />

      <section className="pt-16">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow label="Where we are" />
          <SectionHeading>Our offices</SectionHeading>
        </div>
      </section>

      {OFFICES.map((office, i) => (
        <OfficeBand key={office.id} office={office} tint={i % 2 === 1} />
      ))}
    </>
  );
}
