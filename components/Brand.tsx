import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Design primitives.
 *
 * Colour rules that are easy to get wrong here:
 * - Red is the only accent. Teal was tried and removed: it read as a second competing
 *   accent, and its hue leaked into the neutrals, tinting every card toward cyan.
 * - Red is 4.47:1 on white and 2.8:1 on slate. So red marks rules and fills, but never
 *   small text on either surface. Label text is muted ink on light, white on slate.
 * - Red fills use action-deep (5.42:1 with white) because every button label is 13-15px.
 * - Cards have no border: a light border between a white card and a white page divides
 *   nothing. Separation comes from the neutral fill and the photo.
 */

/**
 * Rule + label. DESIGN.md requires the rule: an uppercase label must never float alone.
 *
 * mb-4, not mb-8. It was mb-8, and 43 of the 55 call sites cancelled 16px of it back off
 * with a `-mt-4` on the next element, which is the spacing they all actually wanted.
 * The gap belongs in the primitive; a caller that genuinely needs more air adds a
 * positive margin, which reads as a decision rather than as a fight with the component.
 */
export function Eyebrow({
  label,
  dark = false,
  className = "",
}: {
  label: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`mb-4 ${className}`.trim()}>
      <span className="block h-0.5 w-6 bg-accent" />
      <p
        className={`mt-3 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] ${
          dark ? "text-white/75" : "text-ink-muted"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

export function InteriorHero({
  eyebrow,
  title,
  subtitle,
  actions,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: string;
  /** ReactNode so callers can emphasise parts of a multi-line subtitle. */
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Optional portrait beside the text. Omitted, the hero stays purely typographic. */
  image?: string;
  imageAlt?: string;
}) {
  const text = (
    <>
      <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
        {eyebrow}
      </p>
      {/* Short accent rule under the eyebrow, matching the Eyebrow component used in
          body sections so interior heroes carry the same mark. */}
      <span className="mb-6 block h-0.5 w-8 bg-accent" />
      <h1 className="max-w-2xl font-heading text-[42px] font-semibold leading-[1.08] tracking-[-0.025em] md:text-[52px]">
        {title}
      </h1>
      {/* whitespace-pre-line so a subtitle can carry its own line breaks (e.g. a title
          and an appointment on separate lines) without callers needing JSX. */}
      {subtitle ? (
        <p className="mt-6 max-w-xl whitespace-pre-line text-[15px] leading-[1.7] text-white/80">
          {subtitle}
        </p>
      ) : null}
      {actions ? <div className="mt-10 flex flex-wrap gap-4">{actions}</div> : null}
    </>
  );

  return (
    <section className="relative bg-surface-dark text-white">
      {/* Red signature bar, mirroring the rule under the logo on Branding Guide p.9. */}
      <span className="absolute left-0 top-0 h-[3px] w-20 bg-action" />
      {image ? (
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-[1.4fr_auto] md:gap-14 md:py-24">
          <div>{text}</div>
          <div className="relative h-[240px] w-[240px] flex-shrink-0 md:h-[300px] md:w-[300px]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              className="object-cover"
              sizes="300px"
            />
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">{text}</div>
      )}
    </section>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`my-16 border-0 border-t border-hairline ${className}`.trim()} />;
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1 text-sm text-action-deep underline hover:no-underline"
    >
      {children}
      <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]">
        &rarr;
      </span>
    </Link>
  );
}

/**
 * The one filled CTA. `size="lg"` is the loud variant that used to be GoldButton -
 * kept as a size rather than a colour, since after the rebrand both were the same red
 * and two identically-styled primitives is how the old drift started. Still one per page.
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
      className={`inline-block bg-action-deep font-heading font-semibold tracking-[0.02em] text-white transition-colors hover:bg-action-deeper ${
        size === "lg" ? "px-8 py-4 text-[15px]" : "px-7 py-3 text-sm"
      }`}
    >
      {children}
    </Link>
  );
}

/**
 * Outlined in the brand red rather than slate: a slate outline read as a plain black
 * box. It stays distinct from PrimaryButton by being outlined rather than filled.
 */
export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block border border-action-deep bg-transparent px-7 py-3 font-heading text-sm font-semibold text-action-deep transition-colors hover:bg-action-deep hover:text-white"
    >
      {children}
    </Link>
  );
}

/** Large interior hero with an overlapping photo card on the right (program detail pages). */
export function ProgramHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  meta = [],
  actions,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  meta?: { label: string; value: string }[];
  actions?: ReactNode;
}) {
  return (
    <section className="relative bg-surface-dark pb-20 text-white">
      <span className="absolute left-0 top-0 h-[3px] w-20 bg-action" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-14 px-8 pt-20 md:grid-cols-2 md:pt-24">
        <div className="pb-8">
          <p className="mb-5 font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
            {eyebrow}
          </p>
          <h1 className="m-0 font-heading text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] md:text-[52px]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 max-w-md text-[16px] leading-[1.6] text-white/85">{subtitle}</p>
          ) : null}
          {meta.length > 0 ? (
            <div className="mt-9 flex flex-wrap gap-9 border-t border-white/15 pt-5">
              {meta.map((m) => (
                <div key={m.label}>
                  <p className="m-0 font-heading text-[10px] font-semibold uppercase tracking-[0.15em] text-white/85">
                    {m.label}
                  </p>
                  <p className="m-0 mt-1 text-sm font-medium text-white">{m.value}</p>
                </div>
              ))}
            </div>
          ) : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
        </div>
        <div className="relative -mb-20 h-[380px] md:h-[480px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

/** Marquee card. Photo top, tinted content block. */
export function PhotoLedCard({
  href,
  image,
  imageAlt = "",
  tag,
  title,
  description,
  ratio = 0.62,
}: {
  href: string;
  image: string;
  imageAlt?: string;
  tag: string;
  title: string;
  description: string;
  ratio?: number;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col bg-surface-tint text-ink no-underline transition-transform duration-[250ms] ease-out hover:-translate-y-[3px]"
    >
      <div
        className="relative w-full overflow-hidden bg-wos-slate"
        style={{ paddingTop: `${ratio * 100}%` }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        {/* Red rule is the only accent mark; the label stays muted ink. */}
        <span className="mb-2.5 block h-0.5 w-6 bg-accent" />
        <p className="mb-2 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
          {tag}
        </p>
        <h3 className="m-0 mb-3 font-heading text-[21px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
          {title}
        </h3>
        <p className="m-0 flex-1 text-sm leading-[1.55] text-ink-muted">{description}</p>
        <p className="mt-5 font-heading text-[13px] font-semibold tracking-[0.02em] text-action-deep">
          Learn more{" "}
          <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]">
            &rarr;
          </span>
        </p>
      </div>
    </Link>
  );
}

/** Uniform certificate/topic grid item. */
export function TintedCard({
  href,
  image,
  imageAlt = "",
  tag = "Certificate",
  name,
  line,
}: {
  href: string;
  image?: string;
  imageAlt?: string;
  tag?: string;
  name: string;
  line?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden bg-surface-tint text-ink no-underline transition-transform duration-[250ms] ease-out hover:-translate-y-[3px]"
    >
      {image ? (
        <div className="relative w-full overflow-hidden bg-wos-slate" style={{ paddingTop: "62%" }}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ) : null}
      <div
        className={`relative flex flex-1 flex-col px-6 py-5 ${
          image ? "border-t-2 border-accent" : ""
        }`}
      >
        {!image ? <span className="absolute left-6 right-6 top-0 h-0.5 bg-accent" /> : null}
        <p className="mb-3 mt-2 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
          {tag}
        </p>
        <h4 className="m-0 mb-2.5 font-heading text-[18px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
          {name}
        </h4>
        {line ? <p className="m-0 flex-1 text-[13px] leading-[1.55] text-ink-muted">{line}</p> : null}
        <p className="mt-5 font-heading text-xs font-semibold tracking-[0.02em] text-action-deep">
          Read syllabus{" "}
          <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]">
            &rarr;
          </span>
        </p>
      </div>
    </Link>
  );
}

/** Four numbers across. Numerals stay slate on light - red would read as an alert. */
export function StatsBar({
  stats,
  dark = false,
}: {
  stats: { value: string; label: string }[];
  dark?: boolean;
}) {
  return (
    <div className={dark ? "bg-surface-dark text-white" : "text-ink"}>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className={`m-0 font-heading text-[42px] font-semibold leading-none tracking-[-0.02em] ${
                  dark ? "text-white" : "text-surface-dark"
                }`}
              >
                {s.value}
              </p>
              <p
                className={`m-0 mt-3 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] ${
                  dark ? "text-white/75" : "text-ink-muted"
                }`}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PullQuote({
  quote,
  name,
  role,
  large = false,
}: {
  quote: string;
  name?: string;
  role?: string;
  large?: boolean;
}) {
  return (
    <blockquote className="m-0 border-l-[3px] border-accent pl-6">
      <p
        className={`m-0 max-w-2xl font-normal italic leading-[1.5] text-ink ${
          large ? "text-2xl md:text-[26px]" : "text-xl"
        }`}
      >
        &ldquo;{quote}&rdquo;
      </p>
      {name ? (
        <p className="mt-4 text-[13px] text-ink-muted">
          - <strong className="font-semibold text-ink">{name}</strong>
          {role ? `, ${role}` : null}
        </p>
      ) : null}
    </blockquote>
  );
}
