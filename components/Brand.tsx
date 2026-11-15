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

/** The type scale, as class strings so a page can set an element without a wrapper. */
export const TYPE = {
  /** Interior page title. The homepage tagline is its own, larger, uppercase setting. */
  title: "font-heading text-[clamp(36px,4.8vw,64px)] font-semibold leading-[1.05] tracking-[-0.025em]",
  h2: "font-heading text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[46px]",
  h3: "font-heading text-[22px] font-semibold leading-[1.2] tracking-[-0.015em] md:text-[26px]",
  /** A sentence set as display type: a claim, a figure, a closing line. */
  statement: "font-heading font-semibold leading-[1.15] tracking-[-0.02em]",
  lead: "text-[20px] leading-[1.55] md:text-[22px]",
  body: "text-[18px] leading-[1.65]",
  small: "text-[16px] leading-[1.6]",
  /** What a group of things is, above the group: muted, sentence case, no rule. */
  label: "font-heading text-[16px] font-semibold leading-snug text-[var(--field-muted)] md:text-[18px]",
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
      className={`inline-block bg-[var(--field-btn)] font-heading font-semibold tracking-[0.01em] text-[var(--field-btn-ink)] no-underline transition-colors hover:bg-[var(--field-btn-hover)] hover:text-[var(--field-btn-ink)] ${
        size === "lg" ? "px-8 py-4 text-[16px]" : "px-7 py-3.5 text-[15px]"
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
      className={`inline-block border-2 border-[var(--field-link)] bg-transparent font-heading font-semibold tracking-[0.01em] text-[var(--field-link)] no-underline transition-colors hover:bg-[var(--field-link)] hover:text-[var(--field-bg)] ${
        size === "lg" ? "px-8 py-[14px] text-[16px]" : "px-7 py-3 text-[15px]"
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
      className={`inline-flex w-fit items-center gap-3 font-heading text-[16px] font-semibold text-[var(--field-link)] underline underline-offset-[6px] transition-colors hover:text-[var(--field-link)] hover:no-underline ${className}`.trim()}
    >
      {children}
      <Arrow />
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
        <p className={`reveal mt-6 max-w-[62ch] ${TYPE.body} text-[var(--field-muted)]`} style={stagger(1)}>
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
          <h2 className={`reveal ${TYPE.statement} max-w-[22ch] text-balance text-[clamp(34px,4.4vw,60px)]`}>
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
          draw={false}
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
              <H className="max-w-[18ch] font-heading text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] lg:text-[40px]">
                {s.title}
              </H>
              {s.description && (
                <p className={`max-w-[46ch] ${TYPE.small} text-[var(--field-muted)] md:text-[17px]`}>
                  {s.description}
                </p>
              )}
              <span className="inline-flex items-center gap-3 font-heading text-[16px] font-semibold underline-offset-[6px] group-hover:underline">
                Explore <Arrow />
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

/** A titled set of short facts, each on the field's rule. */
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
    <div>
      {title && (
        <H className={`reveal ${TYPE.label}`} style={stagger(start)}>
          {title}
        </H>
      )}
      <ul className={`m-0 list-none p-0 ${title ? "mt-3" : ""}`}>
        {items.map((item, n) => (
          <li
            key={item}
            className="reveal border-t-2 border-[var(--field-rule)] py-3 font-heading text-[19px] font-semibold leading-snug md:text-[20px]"
            style={stagger(start + n + 1)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
