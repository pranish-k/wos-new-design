import { Children, isValidElement, type ReactNode } from "react";

export type Field = "paper" | "tint" | "slate" | "deep" | "crimson" | "red" | "gradient";

/** The class pair that puts an element on a field. See the field block in globals.css. */
export function fieldClass(field: Field): string {
  return field === "gradient" ? "field field-deep field-gradient" : `field field-${field}`;
}

/**
 * One chapter: a full-bleed field of colour that meets its neighbours edge to edge.
 *
 * The field brings its own ink, link, button and rule colours, so nothing inside needs to
 * know what it sits on. `gradient` is the signature gradient, reserved for a page's
 * opening and for the closing band. DESIGN.md §5.
 */
export function Chapter({
  field,
  id,
  label,
  className = "",
  children,
}: {
  field: Field;
  id?: string;
  /** Accessible name for the region when it has no visible heading. */
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-label={label} className={`relative ${fieldClass(field)} ${className}`.trim()}>
      {children}
    </section>
  );
}

/**
 * Wraps a page's chapters and refuses two neighbours on the same field. Two chapters of
 * one colour in a row read as one oversized block, so it fails the build rather than
 * shipping.
 *
 * Only direct children are checked. A child is read as a `Chapter` (its `field` prop) or as
 * a component that always renders one field and says so with a static `field`, as
 * PageHero and CloseChapter do. A component that renders several chapters of its own
 * (ContentSections) runs the same check over its own run, through `assertNoRepeats`.
 */
export function Chapters({ children }: { children: ReactNode }) {
  const fields = Children.toArray(children)
    .filter(isValidElement)
    .map((child) => (child.props as { field?: Field }).field ?? (child.type as { field?: Field }).field)
    .filter((f): f is Field => Boolean(f));
  assertNoRepeats(fields);
  return <>{children}</>;
}

/** Throws naming the first pair of neighbouring chapters that share a field. */
export function assertNoRepeats(fields: (Field | undefined)[], where = "") {
  for (let i = 1; i < fields.length; i += 1) {
    if (fields[i] && fields[i] === fields[i - 1]) {
      throw new Error(
        `Chapters ${i - 1} and ${i}${where ? ` of ${where}` : ""} are both on the ${fields[i]} field. ` +
          `Two chapters of one colour in a row read as one block.`,
      );
    }
  }
}

/** The arrow on the site's text links. */
export function Arrow({ className = "h-[12px] w-[16px] flex-none" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 14" aria-hidden="true" focusable="false" className={className}>
      <path d="M0 7h15M10 1.5 15.5 7 10 12.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}
