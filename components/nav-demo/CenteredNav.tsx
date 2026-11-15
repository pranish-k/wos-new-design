"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { NAV, type NavNode } from "@/lib/nav";
import { Chevron, columnsOf, Donate, GROUPS, isActive, Logo, MenuLink, MobileMenu, barItem, panelId, useMenu } from "./shared";

const WRAP = "mx-auto w-full max-w-[1320px] px-5 md:px-8";
const LEFT = NAV.slice(0, 2);
const RIGHT = NAV.slice(2);

/**
 * Centered logo: the mark in the middle of the bar, About and Services to its left, the
 * rest and Donate to its right. The open menu is a light band across the full width,
 * its columns laid out on the page grid, so it reads as a shelf rather than a box.
 */
export default function CenteredNav() {
  const ref = useRef<HTMLElement>(null);
  const { open, close, triggerProps, containerProps } = useMenu(ref);
  const pathname = usePathname();

  const item = (node: NavNode) =>
    node.kind === "link" ? (
      <MenuLink key={node.label} link={node} onNavigate={close} className={barItem(isActive(pathname, node))} />
    ) : (
      <button key={node.label} {...triggerProps(node.label, panelId("centered", node.label))} className={barItem(isActive(pathname, node) || open === node.label)}>
        {node.label}
        <Chevron open={open === node.label} />
      </button>
    );

  return (
    <header ref={ref} {...containerProps} onMouseLeave={close} className="sticky top-0 z-50 border-b border-hairline bg-white">
      <div className={`${WRAP} flex h-16 items-center justify-between gap-4 lg:grid lg:h-[84px] lg:grid-cols-[1fr_auto_1fr]`}>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {LEFT.map(item)}
        </nav>
        <Logo onNavigate={close} />
        <nav aria-label="More" className="hidden items-center justify-end gap-8 lg:flex">
          {RIGHT.map(item)}
          <Donate onNavigate={close} />
        </nav>
        <MobileMenu />
      </div>

      {GROUPS.map((group) => (
        <div
          key={group.label}
          id={panelId("centered", group.label)}
          hidden={open !== group.label}
          className="field field-tint absolute inset-x-0 top-full border-b border-hairline"
        >
          <div className={`${WRAP} flex justify-center gap-14 py-10`}>
            {columnsOf(group).map((col, i) => (
              <div key={col.label ?? `loose-${i}`} className="min-w-[180px]">
                <p className="mb-3 min-h-[1.5em] font-heading text-[14px] font-semibold text-ink-muted">{col.label}</p>
                <ul className="m-0 list-none p-0">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <MenuLink
                        link={link}
                        onNavigate={close}
                        className="block py-2 font-heading text-[17px] font-semibold text-ink no-underline underline-offset-[5px] hover:text-ink hover:underline hover:decoration-wos-red hover:decoration-2"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </header>
  );
}
