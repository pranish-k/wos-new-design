"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import WosMark from "@/components/WosMark";
import { DONATE, NAV, type NavGroup, type NavNode } from "@/lib/nav";
import { ORG } from "@/lib/brand";

// Read aloud by a screen reader, so a comma rather than a dash: a comma gets a pause,
// a hyphen gets nothing.
const HOME_ARIA = `${ORG}, home`;

/** Every href beneath a node, used to decide whether a top-level item is active. */
function hrefsOf(node: NavNode): string[] {
  return node.kind === "link" ? [node.href] : node.children.flatMap(hrefsOf);
}

function isActive(pathname: string, href: string) {
  if (href.startsWith("http")) return false;
  const clean = href.replace(/\/$/, "");
  return pathname === clean || pathname === `${clean}/`;
}

// No hover fill. A tint band behind the item competed with the column dividers, which
// are what carry the structure in the desktop card.
const ITEM_LINK =
  "block py-[7px] text-[15px] leading-[1.35] text-ink no-underline transition-colors hover:text-action-deep";

/**
 * Head of a column in the desktop card.
 *
 * A bare uppercase label, which §8 bans as something that floats. It does not float
 * here: the column divider beside it is what anchors it, and that is the whole reason
 * the dividers exist rather than being decoration. An `Eyebrow` with its accent rule
 * was tried in an earlier pass and the red rules read as decoration in a menu.
 * Recorded as an exception in DESIGN.md §4.
 */
const SECTION_LABEL =
  "font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted";

/** Mobile only. The overlay is an accordion, not a card, so it keeps a plain heading. */
const GROUP_HEADING =
  "mt-3 pb-0.5 font-heading text-[13px] font-semibold text-ink first:mt-0";

/** External links carry the affordance in the accessible name rather than in a glyph. */
function externalProps(external?: boolean) {
  return external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}

function PanelLink({
  node,
  onNavigate,
}: {
  node: Extract<NavNode, { kind: "link" }>;
  onNavigate: () => void;
}) {
  const label = node.external ? `${node.label} (opens in a new tab)` : undefined;
  return (
    <Link
      href={node.href}
      aria-label={label}
      className={ITEM_LINK}
      onClick={onNavigate}
      {...externalProps(node.external)}
    >
      {node.label}
    </Link>
  );
}

/**
 * The mobile accordion list: links, and groups as a heading over an indented list.
 *
 * Desktop uses Panel below instead. This stays recursive because the mobile overlay
 * renders a whole top-level item's subtree in place with no columns to put it in.
 */
function PanelNodes({
  nodes,
  onNavigate,
}: {
  nodes: NavNode[];
  onNavigate: () => void;
}) {
  return (
    <ul className="m-0 list-none p-0">
      {nodes.map((node) =>
        node.kind === "link" ? (
          <li key={node.href}>
            <PanelLink node={node} onNavigate={onNavigate} />
          </li>
        ) : (
          <li key={node.label}>
            <p className={GROUP_HEADING}>{node.label}</p>
            <div className="pl-3">
              <PanelNodes nodes={node.children} onNavigate={onNavigate} />
            </div>
          </li>
        ),
      )}
    </ul>
  );
}

/**
 * One column of the desktop card.
 *
 * min-w is a floor, not the width: each column sizes to its longest label, and
 * "Professional Development Fundamentals" is the one that sets the card's width.
 * Services runs four columns, which at px-8 and a 190px floor came to ~1153px against
 * 1104px of container and spilled past the left edge. These values fit with room.
 */
function Column({
  label,
  reserveLabel,
  links,
  onNavigate,
}: {
  label: string | null;
  /** Hold an empty label line so every column's first link shares a baseline. */
  reserveLabel: boolean;
  links: Extract<NavNode, { kind: "link" }>[];
  onNavigate: () => void;
}) {
  return (
    <div className="min-w-[170px] px-6 first:pl-0 last:pr-0">
      {label ? (
        <p className={SECTION_LABEL}>{label}</p>
      ) : (
        reserveLabel && (
          // aria-hidden: an empty heading announces as an empty heading.
          <p className={SECTION_LABEL} aria-hidden="true">
            &nbsp;
          </p>
        )
      )}
      <ul className="m-0 mt-2 list-none p-0">
        {links.map((node) => (
          <li key={node.href}>
            <PanelLink node={node} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The desktop panel: a bordered card of columns divided by vertical rules.
 *
 * Two earlier versions came off. Columns with an accent rule per head on a tinted fill
 * read as a designed object rather than a menu; a plain single-column dropdown was too
 * plain. This follows the reference the client chose (screenshot/image.png), minus its
 * per-item description line, which we have no copy for.
 *
 * Groups become labelled columns and every loose link collects into one unlabelled
 * column. Its position follows source order rather than being pinned: About opens with
 * a link so its loose column leads with Our Story, and Services opens with a group so
 * Managed Services and Research trail. One rule, and it happens to be right both times.
 */
function Panel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const groups = group.children.filter((c) => c.kind === "group");
  const loose = group.children.filter((c) => c.kind === "link");
  const looseFirst = group.children[0]?.kind === "link";

  // Join Us is all loose links, so there is no labelled column to line up with and the
  // reserved label line would just be an empty row at the top of the card.
  const looseColumn =
    loose.length > 0 ? (
      <Column
        key="__loose"
        label={null}
        reserveLabel={groups.length > 0}
        links={loose}
        onNavigate={onNavigate}
      />
    ) : null;

  return (
    <div className="flex divide-x divide-hairline">
      {looseFirst && looseColumn}
      {groups.map((child) => (
        <Column
          key={child.label}
          label={child.label}
          reserveLabel
          links={child.children.filter((n) => n.kind === "link")}
          onNavigate={onNavigate}
        />
      ))}
      {!looseFirst && looseColumn}
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  // The header survives a route change, so nothing closes a menu on navigation for
  // free. Every link that can navigate closes it on click instead.
  const close = useCallback(() => setOpen(null), []);

  // A dropdown that cannot be dismissed from the keyboard, and an overlay that lets the
  // page scroll behind it, are the usual pair of bugs in a menu built this way.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) setMobileOpen(false);
      else if (open !== null) {
        triggers.current[open]?.focus();
        setOpen(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  // A click anywhere else dismisses. Pointerdown rather than click so the menu is gone
  // before the click lands on whatever is underneath it.
  useEffect(() => {
    if (open === null) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Left and right move along the top bar, down enters the open panel. This is the
  // APG disclosure navigation pattern: panel contents stay in normal tab order rather
  // than becoming a menubar, which is what makes a three-level menu operable at all.
  const onTriggerKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = NAV.length - 1;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next =
        e.key === "ArrowRight"
          ? index === last
            ? 0
            : index + 1
          : index === 0
            ? last
            : index - 1;
      triggers.current[next]?.focus();
      if (open !== null) setOpen(NAV[next].kind === "group" ? next : null);
    } else if (e.key === "ArrowDown" && NAV[index].kind === "group") {
      e.preventDefault();
      setOpen(index);
      // The panel has to exist before its first link can take focus.
      requestAnimationFrame(() => {
        barRef.current
          ?.querySelectorAll<HTMLAnchorElement>(`#nav-panel-${index} a`)[0]
          ?.focus();
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div
        ref={barRef}
        className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-b border-hairline px-6 py-3 md:min-h-[72px] md:py-0"
        onMouseLeave={close}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
        }}
      >
        <Link
          href="/"
          aria-label={HOME_ARIA}
          className="flex min-w-0 flex-shrink-0 items-center"
          onClick={() => {
            close();
            setMobileOpen(false);
          }}
        >
          <WosMark className="h-8 w-auto md:h-9" decorative priority />
        </Link>

        <nav
          aria-label="Main"
          className="hidden flex-shrink-0 items-center gap-6 md:flex lg:gap-8"
        >
          {NAV.map((node, i) => {
            const active = hrefsOf(node).some((h) => isActive(pathname, h));
            const underline = `border-b-2 pb-0.5 font-heading text-[15px] font-medium text-ink transition-colors hover:text-action-deep ${
              active ? "border-action" : "border-transparent"
            }`;

            if (node.kind === "link") {
              return (
                <Link
                  key={node.label}
                  href={node.href}
                  className={underline}
                  onClick={close}
                  onMouseEnter={close}
                  ref={(el) => {
                    // Kept in the same list as the buttons so the arrow keys walk the
                    // whole bar, including News & Events.
                    triggers.current[i] = el as unknown as HTMLButtonElement | null;
                  }}
                  onKeyDown={(e) => onTriggerKeyDown(e, i)}
                >
                  {node.label}
                </Link>
              );
            }

            return (
              <div key={node.label} className="static">
                <button
                  type="button"
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  aria-expanded={open === i}
                  aria-controls={`nav-panel-${i}`}
                  className={`${underline} cursor-pointer`}
                  onClick={() => setOpen(open === i ? null : i)}
                  onMouseEnter={() => setOpen(i)}
                  onKeyDown={(e) => onTriggerKeyDown(e, i)}
                >
                  {node.label}
                  <span aria-hidden="true" className="ml-1 text-[10px]">
                    ▾
                  </span>
                </button>

                {/* Positioned against the bar, not the trigger, so all three panels
                    share one position. right-6 matches the bar's px-6, putting the
                    card's right edge where Donate ends; a three-column card is about
                    700px against 1104px of content width, so it still covers its own
                    trigger and cannot overflow. mt-px clears the bar's bottom border.

                    White with a 1px hairline border, no shadow. §8 bans a border around
                    a card in a section, but this is not that: a menu floating over page
                    content needs an edge, and the tinted fill that rule prescribes was
                    tried here and read as a grey slab. Recorded as an exception in §4. */}
                <div
                  id={`nav-panel-${i}`}
                  hidden={open !== i}
                  className="absolute right-6 top-full mt-px w-max max-w-[calc(100vw-3rem)] border border-hairline bg-white p-6"
                >
                  <Panel group={node} onNavigate={close} />
                </div>
              </div>
            );
          })}

          <Link
            href={DONATE.href}
            className="bg-action-deep px-5 py-2 font-heading text-[15px] font-semibold text-white transition-colors hover:bg-action-deeper"
            onClick={close}
            onMouseEnter={close}
          >
            {DONATE.label}
          </Link>
        </nav>

        <button
          type="button"
          className="flex-shrink-0 text-ink md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg
            className="h-[30px] w-[30px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Full-screen overlay, not a dropdown. One accordion level only: the nested
          groups render expanded, because three taps to reach a service page on a phone
          is the usability problem open decision 5 is about. */}
      <nav
        aria-label="Mobile"
        className={`fixed inset-0 z-40 flex flex-col gap-6 overflow-y-auto bg-white px-8 pb-16 pt-24 md:hidden
          transition-[opacity,visibility] duration-[250ms] ease-out
          ${mobileOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"}`}
      >
        {NAV.map((node) =>
          node.kind === "link" ? (
            <Link
              key={node.label}
              href={node.href}
              className="font-heading text-[26px] font-semibold text-ink no-underline"
              onClick={() => setMobileOpen(false)}
            >
              {node.label}
            </Link>
          ) : (
            <div key={node.label}>
              <button
                type="button"
                aria-expanded={expanded === node.label}
                className="flex w-full items-center justify-between font-heading text-[26px] font-semibold text-ink"
                onClick={() =>
                  setExpanded(expanded === node.label ? null : node.label)
                }
              >
                {node.label}
                <span aria-hidden="true" className="text-[16px]">
                  {expanded === node.label ? "−" : "+"}
                </span>
              </button>
              {expanded === node.label && (
                <div className="mt-3 border-l border-hairline pl-4">
                  <PanelNodes
                    nodes={node.children}
                    onNavigate={() => setMobileOpen(false)}
                  />
                </div>
              )}
            </div>
          ),
        )}
        <Link
          href={DONATE.href}
          className="w-fit bg-action-deep px-6 py-2.5 font-heading text-[22px] font-semibold text-white no-underline"
          onClick={() => setMobileOpen(false)}
        >
          {DONATE.label}
        </Link>
      </nav>
    </header>
  );
}
