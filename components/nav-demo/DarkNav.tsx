"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/nav";
import { Chevron, columnsOf, Donate, isActive, Logo, MenuLink, MobileMenu, barItem, panelId, useMenu } from "./shared";

const WRAP = "mx-auto w-full max-w-[1320px] px-5 md:px-8";

/**
 * On the gradient: the bar has no background of its own at the top of the page, so the
 * opening gradient runs up behind it and the header and the hero read as one field.
 * Once the page scrolls it turns solid deep, so it stays legible over light chapters.
 *
 * It overlaps the page by its own height (the negative margin), and /nav-demo adds that
 * height back to the opening chapter's padding so nothing sits under it.
 */
export default function DarkNav() {
  const ref = useRef<HTMLElement>(null);
  const { open, close, triggerProps, containerProps } = useMenu(ref);
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={ref}
      {...containerProps}
      onMouseLeave={close}
      className={`sticky top-0 z-50 -mb-16 transition-colors duration-[250ms] lg:-mb-[72px] ${
        solid || open ? "bg-surface-deep" : "bg-transparent"
      }`}
    >
      <div className={`${WRAP} relative flex h-16 items-center justify-between gap-4 lg:h-[72px]`}>
        <Logo onDark onNavigate={close} />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map((node) =>
            node.kind === "link" ? (
              <MenuLink key={node.label} link={node} onNavigate={close} className={barItem(isActive(pathname, node), true)} />
            ) : (
              <div key={node.label}>
                <button {...triggerProps(node.label, panelId("dark", node.label))} className={barItem(isActive(pathname, node) || open === node.label, true)}>
                  {node.label}
                  <Chevron open={open === node.label} />
                </button>
                {/* Positioned against the bar, right edge on Donate's, as the current
                    header does: Services is five columns wide, and anchored under its
                    own trigger it ran off the right of the screen. */}
                <div
                  id={panelId("dark", node.label)}
                  hidden={open !== node.label}
                  className="field field-deep absolute right-5 top-full w-max max-w-[calc(100vw-4rem)] border-t-2 border-wos-red p-7 md:right-8"
                >
                  <div className="flex gap-10">
                    {columnsOf(node).map((col, i) => (
                      <div key={col.label ?? `loose-${i}`} className="min-w-[170px]">
                        {columnsOf(node).some((c) => c.label) && (
                          <p className="mb-2 min-h-[1.5em] font-heading text-[13px] font-semibold text-white/60">{col.label}</p>
                        )}
                        <ul className="m-0 list-none p-0">
                          {col.links.map((link) => (
                            <li key={link.href}>
                              <MenuLink
                                link={link}
                                onNavigate={close}
                                className="block py-[7px] text-[15px] leading-[1.35] text-white/85 no-underline hover:text-white hover:underline hover:underline-offset-[4px]"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
          )}
          <Donate onNavigate={close} />
        </nav>
        <MobileMenu onDark />
      </div>
    </header>
  );
}
