"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Arrow } from "@/components/Chapter";
import { NAV } from "@/lib/nav";
import {
  Chevron,
  columnsOf,
  Donate,
  GROUPS,
  isActive,
  Logo,
  MenuLink,
  MobileMenu,
  barItem,
  panelId,
  useMenu,
} from "./shared";

const WRAP = "mx-auto w-full max-w-[1320px] px-5 md:px-8";

/**
 * Full-width panel: the open menu is a deep chapter across the whole page, the section's
 * pages in ruled columns across it, and the consultation call on crimson at the right. The menu reads as part of the site rather than as a widget on it.
 */
export default function MegaNav() {
  const ref = useRef<HTMLElement>(null);
  const { open, close, triggerProps, containerProps } = useMenu(ref);
  const pathname = usePathname();

  return (
    <header ref={ref} {...containerProps} onMouseLeave={close} className="sticky top-0 z-50 border-b border-hairline bg-white">
      <div className={`${WRAP} flex h-16 items-center justify-between gap-4 lg:h-[72px]`}>
        <Logo onNavigate={close} />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map((node) =>
            node.kind === "link" ? (
              <MenuLink key={node.label} link={node} onNavigate={close} className={barItem(isActive(pathname, node))} />
            ) : (
              <button key={node.label} {...triggerProps(node.label, panelId("mega", node.label))} className={barItem(isActive(pathname, node) || open === node.label)}>
                {node.label}
                <Chevron open={open === node.label} />
              </button>
            ),
          )}
          <Donate onNavigate={close} />
        </nav>
        <MobileMenu />
      </div>

      {GROUPS.map((group) => (
        <div
          key={group.label}
          id={panelId("mega", group.label)}
          hidden={open !== group.label}
          className="field field-deep absolute inset-x-0 top-full"
        >
          {/* The columns take the width and the call takes a fixed share. A large section
              title was tried at the left and cost Services its fifth column, which then
              wrapped into a second row on its own. */}
          <div className={`${WRAP} grid gap-12 py-12 lg:grid-cols-[minmax(0,3.2fr)_minmax(0,1fr)]`}>
            <div className="grid grid-flow-col auto-cols-fr gap-x-8">
              {columnsOf(group).map((col, i) => (
                <div key={col.label ?? `loose-${i}`}>
                  <p className="mb-2 min-h-[1.5em] font-heading text-[14px] font-semibold text-white/65">{col.label}</p>
                  <ul className="m-0 list-none p-0">
                    {col.links.map((link) => (
                      <li key={link.href} className="border-t-2 border-wos-red">
                        <MenuLink
                          link={link}
                          onNavigate={close}
                          className="block py-2.5 font-heading text-[16px] font-semibold leading-snug text-white no-underline underline-offset-[5px] hover:text-white hover:underline"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              onClick={close}
              className="field field-crimson group flex flex-col justify-between gap-8 p-7 no-underline hover:text-white"
            >
              <span className="font-heading text-[24px] font-semibold leading-[1.15]">Schedule a free consultation</span>
              <span className="inline-flex items-center gap-3 font-heading text-[15px] font-semibold underline-offset-[5px] group-hover:underline">
                Get in touch <Arrow />
              </span>
            </Link>
          </div>
        </div>
      ))}
    </header>
  );
}
