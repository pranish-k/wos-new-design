"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import MobileMenu from "@/components/nav/MobileMenu";
import { Donate, isActive, stacks, unitsOf, UnitView } from "@/components/nav/parts";
import WosMark from "@/components/WosMark";
import { ORG } from "@/lib/brand";
import { NAV, type NavGroup } from "@/lib/nav";

// Read aloud by a screen reader, so a comma rather than a dash: a comma gets a pause,
// a hyphen gets nothing.
const HOME_ARIA = `${ORG}, home`;

const WRAP = "mx-auto w-full max-w-[1320px] px-5 md:px-8";

const panelId = (label: string) => `nav-panel-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;

/**
 * The site header. DESIGN.md §4.
 *
 * A white bar; each section opens as a full-width deep panel beneath it. Chosen on
 * /nav-demo over ten other candidates and five variations, which are in git history.
 *
 * - Every panel is one fixed height, so the edge below the menu never moves between
 *   About, Services and Join Us. Services is the tallest and sets it; the height was
 *   measured at 1440, 1280 and 1024px.
 * - Reading-size type for an audience that skews past 35, from the site's scale: bold
 *   headings at h4, links at body, bar items at small.
 * - At most three columns. Every top-level entry is a bold heading, whether it is a
 *   page or a group, and a group's pages are indented beneath it on a red guide line.
 * - The page dims while a panel is open, a panel waits briefly before opening under a
 *   passing pointer, and the consultation call is one line along the bottom.
 */
export default function Nav() {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const triggers = useRef<Record<string, HTMLElement | null>>({});
  const hoverTimer = useRef<number | undefined>(undefined);

  // The page a panel was opened on is kept with it, so a route change closes it by
  // derivation rather than by an effect that resets state after the fact.
  const [state, setState] = useState<{ label: string; path: string } | null>(null);
  const open = state && state.path === pathname ? state.label : null;
  const setOpen = useCallback((label: string | null) => setState(label ? { label, path: pathname } : null), [pathname]);
  const close = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    setState(null);
  }, []);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  // Escape closes and returns focus to the trigger; a pointer down outside closes.
  // Pointerdown rather than click, so the panel is gone before the click lands.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      triggers.current[open]?.focus();
      setOpen(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (!header.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, setOpen]);

  // The APG disclosure navigation pattern: left and right walk the bar, down opens a
  // panel and enters it, and panel links stay in normal tab order. Moving along the bar
  // with a panel open switches to the next section's panel.
  const onBarKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = (index + (e.key === "ArrowRight" ? 1 : NAV.length - 1)) % NAV.length;
      triggers.current[NAV[next].label]?.focus();
      if (open !== null) setOpen(NAV[next].kind === "group" ? NAV[next].label : null);
    } else if (e.key === "ArrowDown" && NAV[index].kind === "group") {
      e.preventDefault();
      const id = panelId(NAV[index].label);
      setOpen(NAV[index].label);
      // The panel has to exist before its first link can take focus.
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${id} a`)?.focus());
    }
  };

  // Hover intent. With nothing open, a pointer has to rest on a trigger briefly before
  // its panel opens, so a mouse crossing the bar on its way somewhere else does not
  // flash a panel over the page. Once one is open, moving between triggers switches at
  // once, which is the moment a visitor is actually browsing.
  const onTriggerEnter = (label: string) => {
    window.clearTimeout(hoverTimer.current);
    if (open !== null) setOpen(label);
    else hoverTimer.current = window.setTimeout(() => setOpen(label), 150);
  };

  const barItem = (active: boolean) =>
    `inline-flex cursor-pointer items-center border-b-2 pb-0.5 font-heading text-small font-medium text-ink no-underline transition-colors hover:text-action-deep ${
      active ? "border-action" : "border-transparent"
    }`;

  return (
    <header
      ref={header}
      onMouseLeave={close}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
      }}
      className="sticky top-0 z-50 border-b border-hairline bg-white"
    >
      <div className={`${WRAP} flex h-16 items-center justify-between gap-4 lg:h-[76px]`}>
        <Link href="/" aria-label={HOME_ARIA} className="flex flex-shrink-0 items-center" onClick={close}>
          <WosMark className="h-8 w-auto lg:h-9" decorative priority />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-9">
          {NAV.map((node, i) =>
            node.kind === "link" ? (
              // A plain Link rather than MenuLink: it needs the ref and the key handler,
              // so the arrow keys walk the whole bar, links included.
              <Link
                key={node.label}
                href={node.href}
                ref={(el) => {
                  triggers.current[node.label] = el;
                }}
                onClick={close}
                onMouseEnter={close}
                onKeyDown={(e) => onBarKeyDown(e, i)}
                className={barItem(isActive(pathname, node))}
              >
                {node.label}
              </Link>
            ) : (
              // The panel sits right after its trigger in the DOM, so Tab goes from the
              // trigger into its open panel and Shift+Tab comes back to it. `static` keeps
              // the panel positioned against the header, so it still spans the page.
              <div key={node.label} className="static">
                <button
                  ref={(el) => {
                    triggers.current[node.label] = el;
                  }}
                  type="button"
                  aria-expanded={open === node.label}
                  aria-controls={panelId(node.label)}
                  onClick={() => setOpen(open === node.label ? null : node.label)}
                  onMouseEnter={() => onTriggerEnter(node.label)}
                  onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
                  onKeyDown={(e) => onBarKeyDown(e, i)}
                  className={barItem(isActive(pathname, node) || open === node.label)}
                >
                  {node.label}
                  <svg
                    viewBox="0 0 10 6"
                    aria-hidden="true"
                    className={`ml-1.5 inline h-[6px] w-[10px] transition-transform duration-150 ${open === node.label ? "rotate-180" : ""}`}
                  >
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </button>
                <Panel group={node} open={open === node.label} onNavigate={close} />
              </div>
            ),
          )}
          <Donate onNavigate={close} className="px-6 py-2.5 text-small" />
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}

/**
 * A section's panel: a full-width deep field at one fixed height (Services, the tallest,
 * sets it), at most three columns, and the consultation call along the bottom.
 */
function Panel({ group, open, onNavigate }: { group: NavGroup; open: boolean; onNavigate: () => void }) {
  return (
    <div id={panelId(group.label)} hidden={!open} className="field field-deep absolute inset-x-0 top-full">
      {/* The page below dims while a panel is open, so the panel is the one thing on
          screen and its edge shows over any page. No pointer events, so moving onto
          the page still closes the menu. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full h-screen bg-surface-deep/45" />
      {/* rem, not px, so the panel grows with the type when a visitor raises their
          browser's text size. Services needs 289px of columns at 1024 and 294px from
          1280; 29.5rem leaves it about 20px spare at both, plus the padding and the
          consultation row. */}
      <div className={`${WRAP} flex flex-col py-10 lg:h-[29.5rem]`}>
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-x-10 xl:gap-x-16">
          {stacks(unitsOf(group)).map((stack, i) => (
            <div key={i} className="space-y-12">
              {stack.map((unit, j) => (
                <UnitView key={j} unit={unit} onNavigate={onNavigate} />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-white/15 pt-5">
          <Link
            href="/contact"
            onClick={onNavigate}
            className="inline-flex w-fit items-center gap-3 font-heading text-small font-semibold text-white/85 no-underline underline-offset-[5px] hover:text-white hover:underline"
          >
            Schedule a free consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
