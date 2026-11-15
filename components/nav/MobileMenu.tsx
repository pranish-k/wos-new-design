"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/nav";
import { Donate, isActive, MenuLink, unitsOf, UnitView } from "./parts";

/**
 * The menu below lg, where a bar of five items and Donate does not fit: one button, and
 * a full-screen menu on the gradient. Each section opens in place under its name, and
 * inside it the tree is drawn exactly as on the desktop panel: bold headings, a group's
 * pages indented on the red guide line. Sections start closed, so the first thing a
 * visitor sees is five names rather than the whole site.
 */
export default function MobileMenu() {
  // Open on one page only, so navigating closes it by derivation rather than by an
  // effect that resets state after the fact.
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = useCallback((next: boolean) => setOpenOn(next ? pathname : null), [pathname]);
  const [section, setSection] = useState<string | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  // Page scroll locks while the menu is up, and Escape closes it and returns focus.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      requestAnimationFrame(() => button.current?.focus());
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div className="lg:hidden">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        // Above the overlay, so the same button closes it.
        className={`relative z-[60] flex cursor-pointer items-center ${open ? "text-white" : "text-ink"}`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.6}>
          {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <div
        id="mobile-menu"
        className={`field field-deep field-gradient fixed inset-0 z-50 overflow-y-auto transition-[opacity,visibility] duration-[250ms] ease-out ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <nav aria-label="Main" className="mx-auto w-full max-w-[1320px] px-5 pb-16 pt-24 md:px-8">
          <ul className="m-0 list-none p-0">
            {NAV.map((node) =>
              node.kind === "link" ? (
                <li key={node.label} className="border-b border-white/15">
                  <MenuLink
                    link={node}
                    onNavigate={close}
                    className={`block py-4 font-heading text-[30px] font-semibold leading-tight tracking-[-0.02em] text-white no-underline hover:text-white ${
                      isActive(pathname, node) ? "underline decoration-wos-red decoration-4 underline-offset-[10px]" : ""
                    }`}
                  />
                </li>
              ) : (
                <li key={node.label} className="border-b border-white/15">
                  <button
                    type="button"
                    aria-expanded={section === node.label}
                    aria-controls={`mobile-section-${node.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    onClick={() => setSection(section === node.label ? null : node.label)}
                    className="flex w-full cursor-pointer items-center justify-between py-4 text-left font-heading text-[30px] font-semibold leading-tight tracking-[-0.02em] text-white"
                  >
                    {node.label}
                    <span aria-hidden="true" className="text-[26px] font-medium text-wos-red">
                      {section === node.label ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    id={`mobile-section-${node.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    hidden={section !== node.label}
                    className="space-y-8 pb-8 pt-2"
                  >
                    {unitsOf(node).map((unit, i) => (
                      <UnitView key={i} unit={unit} onNavigate={close} />
                    ))}
                  </div>
                </li>
              ),
            )}
          </ul>
          <Donate onNavigate={close} className="mt-10 px-7 py-3.5 text-[18px]" />
        </nav>
      </div>
    </div>
  );
}
