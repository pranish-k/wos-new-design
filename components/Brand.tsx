import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Arrow, Chapter, fieldClass, type Field } from "@/components/Chapter";
import InView from "@/components/InView";
import Motif from "@/components/Motif";

/**
 * Design primitives. DESIGN.md §3, §5 and §6.
 *
 * Nothing here takes a `dark` prop. Every colour that has to change with its surface -
 * ink, muted ink, link, button, rule, accent numeral - is read from the field the
 * component sits on (var(--field-*), set in globals.css), so the same button is correct
 * on paper, on slate and on red without the caller saying which.
 */

/** The page grid. Every chapter's content, the header and the footer share this edge. */
export const WRAP = "mx-auto w-full max-w-[1320px] px-5 md:px-8";

/** Chapter padding. Standard, and tight for a chapter carrying one short block. */
export const PAD = "py-20 md:py-28";
export const PAD_TIGHT = "py-14 md:py-20";

/**
 * The type scale as class strings, so a page can set an element without a wrapper. The
 * sizes are tokens in globals.css (text-small up to text-display) and DESIGN.md §3 says
 * why they are what they are. Pick by role, never by eye: if nothing here fits, the
 * answer is a role that is missing from DESIGN.md, not a new size.
 */
export const TYPE = {
  /** Interior page title, and the close's one line. */
  title: "font-heading text-title font-semibold",
  h2: "font-heading text-h2 font-semibold",
  h3: "font-heading text-h3 font-semibold",
  /** Card, step, list and person headings. */
  h4: "font-heading text-h4 font-semibold",
  /** A sentence set as display type: a quote, an address, a claim. */
  statement: "font-heading text-statement font-semibold",
  lead: "text-lead",
  body: "text-body",
  small: "text-small",
  /** A short heading at reading size: a list of names, a fact, a link in a list. */
  item: "font-heading text-body font-semibold leading-snug",
  /** Buttons, text links and small headings: the interface voice. */
  ui: "font-heading text-small font-semibold",
  /** What a group of things is, above the group: muted, sentence case, no rule. */
  label: "font-heading text-body font-semibold leading-snug text-[var(--field-muted)]",
} as const;

/** The stagger index a `.reveal` element reads. */
export const stagger = (n: number): CSSProperties => ({ ["--i" as string]: n });

function external(href: string) {
  return /^https?:\/\//.test(href);
}

const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * The one filled call to action. Red on paper, tint and the dark fields; white with slate
 * type on crimson and red, where a red fill would vanish. One per distinct action.
 */
export function PrimaryButton({
  href,
  children,
  size = "md",
}: {
  href: string;
  children: ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <Link
      href={href}
      {...(external(href) ? NEW_TAB : {})}
      className={`inline-block bg-[var(--field-btn)] ${TYPE.ui} text-[var(--field-btn-ink)] no-underline transition-colors hover:bg-[var(--field-btn-hover)] hover:text-[var(--field-btn-ink)] ${
        size === "lg" ? "px-8 py-4" : "px-7 py-3.5"
      }`}
    >
      {children}
    </Link>
  );
}

/**
 * Outlined, in the field's link colour, so it never competes with PrimaryButton. Hover
 * fills it with that colour and drops the label into the field's own background, which
 * inverts correctly on every field.
 */
export function SecondaryButton({
  href,
  children,
  size = "md",
}: {
  href: string;
  children: ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <Link
      href={href}
      {...(external(href) ? NEW_TAB : {})}
      className={`inline-block border-2 border-[var(--field-link)] bg-transparent ${TYPE.ui} text-[var(--field-link)] no-underline transition-colors hover:bg-[var(--field-link)] hover:text-[var(--field-bg)] ${
        size === "lg" ? "px-8 py-[14px]" : "px-7 py-3"
      }`}
    >
      {children}
    </Link>
  );
}

/** A text link with the arrow: the site's one link shape outside running copy. */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const ext = external(href);
  return (
    <Link
      href={href}
      {...(ext ? NEW_TAB : {})}
      className={`inline-flex w-fit items-center gap-3 ${TYPE.ui} text-[var(--field-link)] underline underline-offset-[6px] transition-colors hover:text-[var(--field-link)] hover:no-underline ${className}`.trim()}
    >
      {children}
      {ext && <span className="sr-only">(opens in a new tab)</span>}
    </Link>
  );
}

/**
 * A chapter's heading, with an optional intro beneath it.
 *
 * `as` keeps the outline right: a section that is itself under an h2 passes "h3" and
 * keeps the same visual size, because the size marks a chapter, not an outline depth.
 */
export function SectionHeading({
  children,
  label,
  intro,
  as: H = "h2",
  className = "",
}: {
  children: ReactNode;
  /** What the chapter is, above its heading, when the heading alone does not say. */
  label?: string;
  intro?: ReactNode;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={className}>
      {label && <p className={`reveal mb-4 ${TYPE.label}`}>{label}</p>}
      <H className={`reveal ${TYPE.h2} max-w-[24ch] text-balance`}>{children}</H>
      {intro && (
        <p className={`reveal mt-6 max-w-measure ${TYPE.body} text-[var(--field-muted)]`} style={stagger(1)}>
          {intro}
        </p>
      )}
    </div>
  );
}

/**
 * Every interior page opens here: the signature gradient, the title, and what the page
 * is in a sentence or two. With `media` the copy and the media share the row, as on the
 * homepage; without, the copy holds a reading measure and the field runs on.
 *
 * `label` names where the page sits (its nav group, or the board a person is on). With
 * `labelHref` it is a way back up, which is the only reason to make it a link.
 */
export function PageHero({
  label,
  labelHref,
  title,
  lead,
  actions,
  media,
  mediaShape = "wide",
  children,
}: {
  label?: string;
  labelHref?: string;
  title: ReactNode;
  lead?: ReactNode | string[];
  actions?: ReactNode;
  media?: ReactNode;
  /** `square` for a portrait, `wide` for a photograph, `free` for a drawing. */
  mediaShape?: "wide" | "square" | "free";
  children?: ReactNode;
}) {
  const leads = Array.isArray(lead) ? lead : lead ? [lead] : [];
  const copy = (
    <div>
      {label &&
        (labelHref ? (
          <Link
            href={labelHref}
            className={`${TYPE.label} mb-5 inline-flex items-center gap-2 no-underline hover:underline hover:underline-offset-[5px] md:mb-6`}
          >
            <Arrow className="h-[11px] w-[14px] flex-none rotate-180" />
            {label}
          </Link>
        ) : (
          <p className={`${TYPE.label} mb-5 md:mb-6`}>{label}</p>
        ))}
      <h1 className={`${TYPE.title} max-w-[22ch] text-balance`}>{title}</h1>
      {leads.length > 0 && (
        <div className="rise-in mt-7 max-w-[56ch] space-y-4 md:mt-8">
          {leads.map((p, i) => (
            <p key={i} className={`${i === 0 ? TYPE.lead : TYPE.body} text-[var(--field-muted)]`}>
              {p}
            </p>
          ))}
        </div>
      )}
      {actions && (
        <div className="rise-in mt-9 flex flex-wrap gap-4" style={{ ["--delay" as string]: "360ms" }}>
          {actions}
        </div>
      )}
      {children}
    </div>
  );

  return (
    <Chapter field="gradient" className="overflow-clip">
      <div className={`${WRAP} pb-16 pt-14 md:pb-24 md:pt-20`}>
        {media ? (
          <div
            className={`grid items-center gap-10 md:gap-14 ${
              mediaShape === "square"
                ? "md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]"
                : "md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            }`}
          >
            {copy}
            <div className="rise-in" style={{ ["--delay" as string]: "160ms" }}>
              {media}
            </div>
          </div>
        ) : (
          copy
        )}
      </div>
    </Chapter>
  );
}

PageHero.field = "gradient" as const;

/** A photograph for PageHero's `media`, cropped to the hero's frame. */
export function HeroImage({
  src,
  alt,
  shape = "wide",
  position = "object-center",
}: {
  src: string;
  alt: string;
  shape?: "wide" | "square";
  position?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-surface-deep ${
        shape === "square" ? "mx-auto aspect-square max-w-[420px] md:mr-0" : "aspect-[16/10]"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes={shape === "square" ? "420px" : "(min-width: 768px) 50vw, 100vw"}
        className={`object-cover ${position}`}
      />
    </div>
  );
}

/**
 * The close: a page's last chapter, on the gradient, meeting the footer. One line, one
 * button, and the motif opposite so the line has a partner rather than a void.
 */
export function CloseChapter({
  title,
  body,
  href,
  action,
}: {
  title: string;
  body?: string;
  href: string;
  action: string;
}) {
  return (
    <Chapter field="gradient" id="close" className="overflow-clip">
      <InView className={`${WRAP} grid items-center gap-10 py-20 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:py-28`}>
        <div>
          <h2 className={`reveal ${TYPE.title} max-w-[22ch] text-balance`}>
            {title}
          </h2>
          {body && (
            <p className={`reveal mt-6 max-w-[52ch] ${TYPE.lead} text-[var(--field-muted)]`} style={stagger(1)}>
              {body}
            </p>
          )}
          <div className="reveal mt-9" style={stagger(2)}>
            <PrimaryButton href={href} size="lg">
              {action}
            </PrimaryButton>
          </div>
        </div>
        <Motif
          className="pointer-events-none hidden h-auto w-full max-w-[240px] justify-self-end md:block"
          firstFill="fill-white"
        />
      </InView>
    </Chapter>
  );
}

CloseChapter.field = "gradient" as const;

export type Band = {
  href: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
};

/**
 * The colours a run of `count` bands takes: slate, crimson and deep in turn, so no two
 * neighbours match, started so the run ends on crimson. Crimson is the one dark field
 * that cannot merge with what usually follows a run, a slate chapter or the footer.
 */
export function bandFields(count: number): Field[] {
  const cycle: Field[] = ["slate", "crimson", "deep"];
  const start = (((1 - (count - 1)) % 3) + 3) % 3;
  return Array.from({ length: count }, (_, n) => cycle[(start + n) % 3]);
}

/**
 * Links to other pages as full-bleed bands of colour that alternate their picture side.
 *
 * Edge to edge rather than inset: inset, a run of coloured blocks reads as a stack of
 * cards; full bleed, they read as chapters inside the chapter. The text's outer edge
 * lines up with the page grid on wide screens, so the bands bleed while their words stay
 * on the grid.
 */
export function ServiceBands({
  items,
  fields = bandFields(items.length),
  headingLevel = "h3",
}: {
  items: Band[];
  /** One per item. Defaults to bandFields, which ends the run on crimson. */
  fields?: Field[];
  headingLevel?: "h2" | "h3" | "h4";
}) {
  if (fields.length !== items.length) {
    throw new Error(`ServiceBands got ${items.length} items and ${fields.length} fields.`);
  }
  const H = headingLevel;
  return (
    <ul className="m-0 list-none p-0">
      {items.map((s, n) => (
        <li key={s.href} className={fieldClass(fields[n])}>
          <Link
            href={s.href}
            className={`group grid items-stretch text-[var(--field-ink)] no-underline hover:text-[var(--field-ink)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${
              n % 2 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* From the wrap breakpoint the outer padding is the cell's half-width less 628px (half
                the 1320 grid, less its 32px gutter), which lands the text on WRAP's
                edge. In % of the grid cell, not vw: vw counts the scrollbar and would
                put the text 8px off the grid on any system that shows one. */}
            <div
              className={`flex flex-col justify-center gap-5 px-5 py-10 md:py-14 ${
                n % 2
                  ? "md:pl-14 md:pr-8 wrap:pr-[calc(100%-628px)]"
                  : "md:pl-8 md:pr-14 wrap:pl-[calc(100%-628px)]"
              }`}
            >
              <H className={`max-w-[18ch] ${TYPE.h3}`}>
                {s.title}
              </H>
              {s.description && (
                <p className={`max-w-[46ch] ${TYPE.body} text-[var(--field-muted)]`}>
                  {s.description}
                </p>
              )}
              <span className={`inline-flex items-center gap-3 ${TYPE.ui} underline-offset-[6px] group-hover:underline`}>
                Explore
              </span>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden bg-surface-deep md:aspect-auto md:min-h-[300px]">
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-fade)] group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * A titled set of short facts in a filled panel, each item marked with a small square in
 * the field's accent rather than set on a rule: two stacks of red rules beside a paragraph
 * read as lines to look past. The square is the impact chapter's country marker.
 */
export function FactList({
  title,
  items,
  start = 0,
  as: H = "h3",
}: {
  title?: string;
  items: string[];
  start?: number;
  as?: "h3" | "h4";
}) {
  return (
    <div className="reveal bg-[var(--field-panel)] p-6 md:p-8" style={stagger(start)}>
      {title && <H className={TYPE.label}>{title}</H>}
      <ul className={`m-0 grid list-none gap-4 p-0 ${title ? "mt-5" : ""}`}>
        {items.map((item) => (
          <li key={item} className={`flex items-start gap-3.5 ${TYPE.item}`}>
            {/* Centred on the first line at any type size: half a line down, less half the square. */}
            <span aria-hidden="true" className="mt-[calc(0.5lh-5px)] h-2.5 w-2.5 flex-none bg-[var(--field-accent)]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
