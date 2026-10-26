import { Children, isValidElement, type ReactNode } from "react";

export type Field = "paper" | "tint" | "slate" | "deep" | "crimson" | "red" | "gradient";

/**
 * One chapter of /alternate-home: a full-bleed field of colour that meets its neighbours
 * edge to edge. The field brings its own ink (see alternate-home.css), so nothing inside
 * needs to know what it sits on. `gradient` is the signature gradient, reserved for the
 * opening and the close.
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
  const fieldClass = field === "gradient" ? "alt-field alt-field-deep alt-gradient" : `alt-field alt-field-${field}`;
  return (
    <section id={id} aria-label={label} className={`relative ${fieldClass} ${className}`.trim()}>
      {children}
    </section>
  );
}

/**
 * Wraps the chapters and refuses two neighbours on the same field. Two chapters of one
 * colour in a row read as one oversized block, so it fails the build rather than
 * shipping, as ContentSections does for the rest of the site.
 */
export function Chapters({ children }: { children: ReactNode }) {
  const fields = Children.toArray(children)
    .filter(isValidElement)
    .map((child) => (child.props as { field?: Field }).field)
    .filter((f): f is Field => Boolean(f));

  for (let i = 1; i < fields.length; i += 1) {
    if (fields[i] === fields[i - 1]) {
      throw new Error(`/alternate-home: chapters ${i - 1} and ${i} are both on the ${fields[i]} field.`);
    }
  }
  return <>{children}</>;
}

/** The arrow on the page's text links. */
export function Arrow({ className = "h-[12px] w-[16px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 14" aria-hidden="true" focusable="false" className={className}>
      <path d="M0 7h15M10 1.5 15.5 7 10 12.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}
