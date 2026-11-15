import type { Metadata } from "next";
import { PAD, PageHero, TextLink, TYPE, WRAP, stagger } from "@/components/Brand";
import { Chapter } from "@/components/Chapter";
import InView from "@/components/InView";
import { mapLink, mapSrc, OFFICES, type Office } from "@/content/offices";
import page from "@/content/locations";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

/**
 * Address beside its map, one chapter per office.
 *
 * The map is the larger half: on a locations page it is the content, and an address a
 * visitor cannot place is the thing the page exists to fix. The frame sits on the
 * field's panel colour, so a blocked or slow iframe leaves a panel rather than a hole.
 *
 * `loading="lazy"` is doing privacy work as well as performance work. Three eager frames
 * would hand Google a request for every visitor who lands on the page, including the
 * ones who never scroll to Dallas or Costa Rica.
 */
function OfficeChapter({ office, tint }: { office: Office; tint: boolean }) {
  return (
    <Chapter field={tint ? "tint" : "paper"}>
      <InView className={`${WRAP} ${PAD} grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16`}>
        <div>
          <h2 className={`reveal ${TYPE.h2}`}>{office.name}</h2>

          {/* not-italic: the browser default for <address> is italic, which reads as a
              quotation rather than as somewhere you can go. */}
          <address className={`reveal mt-6 not-italic ${TYPE.lead}`} style={stagger(1)}>
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
            <p className={`reveal mt-6 border-t-2 border-[var(--field-rule)] pt-5 ${TYPE.body}`} style={stagger(2)}>
              {office.email && (
                <a href={`mailto:${office.email}`} className="block w-fit">
                  {office.email}
                </a>
              )}
              {office.tel && (
                <a href={`tel:+1${office.tel.replace(/\D/g, "")}`} className="block w-fit">
                  {office.tel}
                </a>
              )}
            </p>
          )}

          <div className="reveal mt-8" style={stagger(3)}>
            <TextLink href={mapLink(office.mapQuery)}>Open in Google Maps</TextLink>
          </div>
        </div>

        <div className="reveal bg-[var(--field-panel)]" style={stagger(1)}>
          <iframe
            src={mapSrc(office.mapQuery)}
            title={office.mapLabel}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[320px] w-full border-0 md:h-[440px]"
          />
        </div>
      </InView>
    </Chapter>
  );
}

export default function Page() {
  return (
    <article>
      <PageHero label={page.eyebrow} title={page.title} />
      {OFFICES.map((office, i) => (
        <OfficeChapter key={office.id} office={office} tint={i % 2 === 1} />
      ))}
    </article>
  );
}
