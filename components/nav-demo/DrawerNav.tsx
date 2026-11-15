"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/nav";
import { columnsOf, Donate, isActive, Logo, MenuButton, MenuLink, barItem, useOverlay } from "./shared";

const QUICK = NAV.filter((n) => n.kind === "link");

/**
 * Side drawer: the bar keeps the two direct links and Donate, and everything with pages
 * beneath it lives in a drawer from the right, an accordion on paper. The page stays in
 * view behind it, dimmed, so the visitor keeps their place.
 */
export default function DrawerNav() {
  const { open, setOpen, button } = useOverlay();
  const [expanded, setExpanded] = useState<string | null>("Services");
  const pathname = usePathname();
  const closeButton = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  // Focus moves into the drawer when it opens, so a keyboard user is inside the thing
  // they just opened rather than behind it. Escape returns focus to the Menu button.
  useEffect(() => {
    if (open) requestAnimationFrame(() => closeButton.current?.focus());
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white">
      {/* Inert while the drawer is open: the bar sits dimmed under the scrim, and Tab
          should stay in the drawer rather than walk back out behind it. */}
      <div inert={open} className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 md:px-8 lg:h-[72px]">
        <Logo onNavigate={close} />
        <div className="flex items-center gap-4 sm:gap-8">
          <nav aria-label="Quick links" className="hidden items-center gap-8 lg:flex">
            {QUICK.map((node) => (
              <MenuLink key={node.label} link={node} className={barItem(isActive(pathname, node))} />
            ))}
          </nav>
          <Donate className="hidden sm:inline-block" />
          <MenuButton open={open} onClick={() => setOpen(!open)} buttonRef={button} controls="drawer-menu" />
        </div>
      </div>

      {/* The scrim closes the drawer on a click, as Escape does. */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-40 bg-surface-deep/60 transition-opacity duration-[250ms] ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <nav
        id="drawer-menu"
        aria-label="Main"
        // Closed, it waits off-screen and inert, which takes it out of the tab order and
        // the accessibility tree. Hiding it with visibility instead raced the focus call
        // above: under reduced motion it was still hidden on the frame it opened, and
        // focus silently stayed behind on the page.
        inert={!open}
        className={`field field-paper fixed inset-y-0 right-0 z-[70] w-full max-w-[460px] overflow-y-auto px-8 pb-12 pt-6 transition-transform duration-300 ease-[var(--ease-fade)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <MenuButton open={open} onClick={close} buttonRef={closeButton} controls="drawer-menu" />
        </div>
        <ul className="m-0 mt-8 list-none p-0">
          {NAV.map((node) =>
            node.kind === "link" ? (
              <li key={node.label} className="border-t-2 border-wos-red">
                <MenuLink
                  link={node}
                  onNavigate={close}
                  className="block py-4 font-heading text-[24px] font-semibold text-ink no-underline hover:text-action-deep"
                />
              </li>
            ) : (
              <li key={node.label} className="border-t-2 border-wos-red">
                <button
                  type="button"
                  aria-expanded={expanded === node.label}
                  onClick={() => setExpanded(expanded === node.label ? null : node.label)}
                  className="flex w-full cursor-pointer items-center justify-between py-4 text-left font-heading text-[24px] font-semibold text-ink"
                >
                  {node.label}
                  <span aria-hidden="true" className="text-[20px] text-action-deep">
                    {expanded === node.label ? "−" : "+"}
                  </span>
                </button>
                {expanded === node.label && (
                  <div className="space-y-5 pb-6">
                    {columnsOf(node).map((col, i) => (
                      <div key={col.label ?? `loose-${i}`}>
                        {col.label && <p className="mb-1 font-heading text-[14px] font-semibold text-ink-muted">{col.label}</p>}
                        <ul className="m-0 list-none p-0">
                          {col.links.map((link) => (
                            <li key={link.href}>
                              <MenuLink
                                link={link}
                                onNavigate={close}
                                className="block py-1.5 text-[17px] text-ink no-underline hover:text-action-deep"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ),
          )}
        </ul>
        <Donate onNavigate={close} className="mt-8 px-6 py-3 text-[17px] sm:hidden" />
      </nav>
    </header>
  );
}
