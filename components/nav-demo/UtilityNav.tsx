"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { CAREERS_URL, HQ, TALENT_COMMUNITY_URL } from "@/lib/brand";
import { NAV } from "@/lib/nav";
import { Chevron, columnsOf, Donate, isActive, Logo, MenuLink, MobileMenu, barItem, panelId, useMenu } from "./shared";

const WRAP = "mx-auto w-full max-w-[1320px] px-5 md:px-8";

/** Join Us moves up into the strip, which is where a job seeker looks for it. */
const MAIN = NAV.filter((n) => n.label !== "Join Us");

const STRIP_LINK = "text-white/80 no-underline transition-colors hover:text-white hover:underline hover:underline-offset-[4px]";

/**
 * Two-tier bar: a slim slate strip for the things people come to do rather than to read
 * (careers, the talent community, contact, donate), above a simpler bar of four sections.
 * Each dropdown is one short column under its own label, so the eye never travels far.
 */
export default function UtilityNav() {
  const ref = useRef<HTMLElement>(null);
  const { open, close, triggerProps, containerProps } = useMenu(ref);
  const pathname = usePathname();

  return (
    <header ref={ref} {...containerProps} onMouseLeave={close} className="sticky top-0 z-50 border-b border-hairline bg-white">
      <div className="hidden bg-surface-dark md:block">
        <div className={`${WRAP} flex h-10 items-center justify-between text-[14px]`}>
          <a href={HQ.phoneHref} className={STRIP_LINK}>
            {HQ.phone}
          </a>
          <div className="flex items-center gap-6">
            <a href={CAREERS_URL} target="_blank" rel="noopener noreferrer" className={STRIP_LINK}>
              Careers<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={TALENT_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className={STRIP_LINK}>
              Join Our Talent Community<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/contact" className={STRIP_LINK}>
              Contact
            </Link>
            <Donate onNavigate={close} className="px-4 py-1 text-[14px]" />
          </div>
        </div>
      </div>

      <div className={`${WRAP} flex h-16 items-center justify-between gap-4 lg:h-[72px]`}>
        <Logo onNavigate={close} />
        <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
          {MAIN.map((node) =>
            node.kind === "link" ? (
              <MenuLink key={node.label} link={node} onNavigate={close} className={`${barItem(isActive(pathname, node))} text-[16px]`} />
            ) : (
              <div key={node.label} className="relative">
                <button
                  {...triggerProps(node.label, panelId("utility", node.label))}
                  className={`${barItem(isActive(pathname, node) || open === node.label)} text-[16px]`}
                >
                  {node.label}
                  <Chevron open={open === node.label} />
                </button>
                <div
                  id={panelId("utility", node.label)}
                  hidden={open !== node.label}
                  className="absolute -left-6 top-full mt-[22px] w-[300px] border border-hairline bg-white px-6 pb-6 pt-4"
                >
                  {columnsOf(node).map((col, i) => (
                    <div key={col.label ?? `loose-${i}`} className="mt-4 first:mt-0">
                      {col.label && <p className="mb-1 font-heading text-[13px] font-semibold text-ink-muted">{col.label}</p>}
                      <ul className="m-0 list-none p-0">
                        {col.links.map((link) => (
                          <li key={link.href}>
                            <MenuLink
                              link={link}
                              onNavigate={close}
                              className="block py-1.5 text-[16px] leading-[1.35] text-ink no-underline hover:text-action-deep"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
