"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Arrow } from "@/components/Chapter";
import WosMark from "@/components/WosMark";
import { ORG } from "@/lib/brand";
import { DONATE, NAV, type NavGroup, type NavLink, type NavNode } from "@/lib/nav";

/**
 * What every /nav-demo header shares: the nav tree reshaped for columns, the active
 * state, the menu behaviour, and the full-screen menu the bar variants fall back to
 * below lg. Each variant is only its own layout.
 */

export const HOME_ARIA = `${ORG}, home`;
export const GROUPS = NAV.filter((n): n is NavGroup => n.kind === "group");
export const LINKS = NAV.filter((n): n is NavLink => n.kind === "link");

/** Every href beneath a node. */
export function hrefsOf(node: NavNode): string[] {
  return node.kind === "link" ? [node.href] : node.children.flatMap(hrefsOf);
}

export function isActive(pathname: string, node: NavNode) {
  return hrefsOf(node).some((href) => {
    if (href.startsWith("http")) return false;
    const clean = href.replace(/\/$/, "");
    return pathname === clean || pathname === `${clean}/`;
  });
}

export type Column = { label: string | null; links: NavLink[] };

/**
 * A top-level group as columns: each subgroup is a labelled column and the loose links
 * collect into one unlabelled column, placed where the source order puts it. The same
 * rule the current panel uses, so every variant shows the same tree.
 */
export function columnsOf(group: NavGroup): Column[] {
  const loose = group.children.filter((c): c is NavLink => c.kind === "link");
  const groups = group.children
    .filter((c): c is NavGroup => c.kind === "group")
    .map((g) => ({ label: g.label, links: g.children.filter((n): n is NavLink => n.kind === "link") }));
  if (!loose.length) return groups;
  const looseColumn = { label: null, links: loose };
  return group.children[0]?.kind === "link" ? [looseColumn, ...groups] : [...groups, looseColumn];
}

/** A nav link, with the new-tab affordance in its accessible name when it leaves the site. */
export function MenuLink({
  link,
  className,
  onNavigate,
  children,
}: {
  link: NavLink;
  className: string;
  onNavigate?: () => void;
  children?: ReactNode;
}) {
  return (
    <Link
      href={link.href}
      className={className}
      onClick={onNavigate}
      {...(link.external
        ? { target: "_blank", rel: "noopener noreferrer", "aria-label": `${link.label} (opens in a new tab)` }
        : {})}
    >
      {children ?? link.label}
    </Link>
  );
}

export function Logo({ onDark = false, onNavigate }: { onDark?: boolean; onNavigate?: () => void }) {
  return (
    <Link href="/" aria-label={HOME_ARIA} className="flex flex-shrink-0 items-center" onClick={onNavigate}>
      <WosMark variant={onDark ? "onDark" : "color"} className="h-8 w-auto lg:h-9" decorative priority />
    </Link>
  );
}

export function Donate({ onNavigate, className = "" }: { onNavigate?: () => void; className?: string }) {
  return (
    <Link
      href={DONATE.href}
      onClick={onNavigate}
      className={`inline-block bg-action-deep px-5 py-2 font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:bg-action-deeper hover:text-white ${className}`}
    >
      {DONATE.label}
    </Link>
  );
}

export function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 10 6"
      aria-hidden="true"
      className={`ml-1.5 inline h-[6px] w-[10px] transition-transform duration-150 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/**
 * One open panel at a time, keyed by group label, with the behaviour every disclosure
 * menu here needs: Escape closes and returns focus to the trigger, a pointer down
 * outside or focus leaving the container closes, and a route change closes. ArrowDown on
 * a trigger opens its panel and moves into it.
 */
export function useMenu(containerRef: RefObject<HTMLElement | null>) {
  // The page a panel was opened on is kept with it, so a route change closes it by
  // derivation rather than by an effect that resets state after the fact.
  const pathname = usePathname();
  const [state, setState] = useState<{ label: string; path: string } | null>(null);
  const open = state && state.path === pathname ? state.label : null;
  const setOpen = useCallback((label: string | null) => setState(label ? { label, path: pathname } : null), [pathname]);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const hoverTimer = useRef<number | undefined>(undefined);
  const close = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    setState(null);
  }, []);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      triggers.current[open]?.focus();
      setOpen(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, containerRef, setOpen]);

  const triggerProps = (label: string, panelId: string, hover = true) => ({
    ref: (el: HTMLButtonElement | null) => {
      triggers.current[label] = el;
    },
    type: "button" as const,
    "aria-expanded": open === label,
    "aria-controls": panelId,
    onClick: () => setOpen(open === label ? null : label),
    // Hover intent. With nothing open, a pointer has to rest on a trigger briefly
    // before its panel opens, so a mouse crossing the bar on its way somewhere else
    // does not flash a panel over the page. Once one is open, moving between triggers
    // switches at once, which is the moment a visitor is actually browsing.
    ...(hover
      ? {
          onMouseEnter: () => {
            window.clearTimeout(hoverTimer.current);
            if (open !== null) setOpen(label);
            else hoverTimer.current = window.setTimeout(() => setOpen(label), 150);
          },
          onMouseLeave: () => window.clearTimeout(hoverTimer.current),
        }
      : {}),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key !== "ArrowDown") return;
      e.preventDefault();
      setOpen(label);
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${panelId} a, #${panelId} button`)?.focus());
    },
  });

  const containerProps = {
    onBlur: (e: React.FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
    },
  };

  return { open, setOpen, close, triggerProps, containerProps };
}

/** Locks page scroll while an overlay is up, and closes it on Escape and on navigation. */
export function useOverlay() {
  // As in useMenu: open on one page only, so navigating closes it without an effect.
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = useCallback((next: boolean) => setOpenOn(next ? pathname : null), [pathname]);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      // After the close has rendered: the button may be inert until then.
      requestAnimationFrame(() => button.current?.focus());
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return { open, setOpen, button };
}

export function MenuButton({
  open,
  onClick,
  buttonRef,
  controls,
  onDark = false,
  label = true,
}: {
  open: boolean;
  onClick: () => void;
  buttonRef?: RefObject<HTMLButtonElement | null>;
  controls: string;
  onDark?: boolean;
  /** Show the word as well as the icon. */
  label?: boolean;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={label ? undefined : open ? "Close menu" : "Open menu"}
      className={`relative z-[60] inline-flex cursor-pointer items-center gap-3 font-heading text-[15px] font-semibold ${
        onDark ? "text-white" : "text-ink"
      }`}
    >
      {/* Screen-reader only on a phone, where the logo, the word and the icon do not fit
          across 390px together. The button keeps the word as its name either way. */}
      {label && <span className="sr-only sm:not-sr-only">{open ? "Close" : "Menu"}</span>}
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6}>
        {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
      </svg>
    </button>
  );
}

/**
 * The full-screen menu: the top-level sections down the left, the selected section's
 * pages on the right. Variant `overlay` is this at every width; the bar variants use it
 * below lg, where a bar of five items does not fit.
 *
 * On a phone the two panes stack and each section opens in place, which is the same
 * tree with one less column.
 */
export function FullScreenMenu({
  id,
  open,
  onNavigate,
}: {
  id: string;
  open: boolean;
  onNavigate: () => void;
}) {
  const [section, setSection] = useState<string>(GROUPS[0].label);
  const pathname = usePathname();
  const current = GROUPS.find((g) => g.label === section)!;

  return (
    <div
      id={id}
      className={`field field-deep field-gradient fixed inset-0 z-50 overflow-y-auto transition-[opacity,visibility] duration-[250ms] ease-out ${
        open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
    >
      <nav aria-label="Main" className="mx-auto grid min-h-full w-full max-w-[1320px] gap-10 px-5 pb-16 pt-28 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20 lg:pt-36">
        <ul className="m-0 list-none p-0">
          {NAV.map((node) =>
            node.kind === "link" ? (
              <li key={node.label}>
                <MenuLink
                  link={node}
                  onNavigate={onNavigate}
                  className={`block py-2 font-heading text-[34px] font-semibold leading-tight tracking-[-0.02em] no-underline hover:text-white md:text-[48px] ${
                    isActive(pathname, node)
                      ? "text-white underline decoration-wos-red decoration-4 underline-offset-[10px]"
                      : "text-white/55"
                  }`}
                />
              </li>
            ) : (
              <li key={node.label}>
                <button
                  type="button"
                  aria-expanded={section === node.label}
                  onClick={() => setSection(node.label)}
                  onMouseEnter={() => setSection(node.label)}
                  className={`flex w-full cursor-pointer items-center gap-4 py-2 text-left font-heading text-[34px] font-semibold leading-tight tracking-[-0.02em] md:text-[48px] ${
                    section === node.label ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {node.label}
                  {section === node.label && <Arrow className="hidden h-[18px] w-[26px] text-wos-red lg:block" />}
                </button>
                {/* Below lg the section's pages open under it, in place. */}
                {section === node.label && (
                  <div className="pb-4 pt-2 lg:hidden">
                    <SectionLinks group={node} onNavigate={onNavigate} />
                  </div>
                )}
              </li>
            ),
          )}
          <li className="mt-8">
            <Donate onNavigate={onNavigate} className="px-6 py-3 text-[17px]" />
          </li>
        </ul>
        <div className="hidden border-l border-white/15 pl-12 lg:block">
          <p className="font-heading text-[16px] font-semibold text-white/70">{current.label}</p>
          <div className="mt-6">
            <SectionLinks group={current} onNavigate={onNavigate} large />
          </div>
        </div>
      </nav>
    </div>
  );
}

function SectionLinks({ group, onNavigate, large = false }: { group: NavGroup; onNavigate: () => void; large?: boolean }) {
  return (
    <div className={`grid gap-x-10 gap-y-8 ${large ? "sm:grid-cols-2" : ""}`}>
      {columnsOf(group).map((col, i) => (
        <div key={col.label ?? `loose-${i}`}>
          {col.label && <p className="mb-2 font-heading text-[14px] font-semibold text-white/60">{col.label}</p>}
          <ul className="m-0 list-none p-0">
            {col.links.map((link) => (
              <li key={link.href} className="border-t-2 border-wos-red">
                <MenuLink
                  link={link}
                  onNavigate={onNavigate}
                  className={`block py-2.5 font-heading font-semibold text-white no-underline underline-offset-[5px] hover:text-white hover:underline ${
                    large ? "text-[20px]" : "text-[17px]"
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** The bar variants' small-screen menu: a Menu button and the full-screen menu. */
export function MobileMenu({ onDark = false }: { onDark?: boolean }) {
  const { open, setOpen, button } = useOverlay();
  return (
    <div className="lg:hidden">
      <MenuButton
        open={open}
        onClick={() => setOpen(!open)}
        buttonRef={button}
        controls="nav-demo-mobile"
        onDark={onDark || open}
        label={false}
      />
      <FullScreenMenu id="nav-demo-mobile" open={open} onNavigate={() => setOpen(false)} />
    </div>
  );
}

/** A top-level item in a bar: medium Montserrat, a 2px red underline when active. */
export function barItem(active: boolean, onDark = false) {
  return `inline-flex cursor-pointer items-center border-b-2 pb-0.5 font-heading text-[15px] font-medium no-underline transition-colors ${
    onDark ? "text-white hover:text-white/75" : "text-ink hover:text-action-deep"
  } ${active ? "border-action" : "border-transparent"}`;
}

export const panelId = (variant: string, label: string) => `${variant}-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
