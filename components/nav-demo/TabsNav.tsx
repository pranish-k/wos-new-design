"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { NAV, type NavGroup } from "@/lib/nav";
import { Chevron, columnsOf, Donate, GROUPS, isActive, Logo, MenuLink, MobileMenu, barItem, panelId, useMenu } from "./shared";

const WRAP = "mx-auto w-full max-w-[1320px] px-5 md:px-8";

/**
 * A photograph for each part of the tree, all already on the site. Keyed by the column
 * label, or by the top-level label for a column with none.
 */
const PHOTOS: Record<string, string> = {
  About: "/images/171206_4700_cropped-scaled-1-1.jpg",
  Boards: "/images/20160527_21_cropped-scaled-1-1.jpg",
  Partners: "/images/Cohort_2024.jpg",
  "Consulting to Hire Services": "/images/managed-service-center.webp",
  "Educational Services": "/images/educational.webp",
  "Advisory Services": "/images/talent-acquisition-1.webp",
  Services: "/images/managed-services-2.webp",
  Research: "/images/research-2.webp",
  "Join Us": "/images/hiring.webp",
};

/**
 * Photo panel: one wide white panel per section. Its labelled groups are tabs down the
 * left, the open tab's pages sit in the middle in large type, and a photograph of that
 * part of WOS fills the right. Loose pages sit under the tabs as plain links.
 */
export default function TabsNav() {
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
              <button key={node.label} {...triggerProps(node.label, panelId("tabs", node.label))} className={barItem(isActive(pathname, node) || open === node.label)}>
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
          id={panelId("tabs", group.label)}
          hidden={open !== group.label}
          className="absolute inset-x-0 top-full border-b border-hairline bg-white"
        >
          <TabPanel group={group} onNavigate={close} />
        </div>
      ))}
    </header>
  );
}

function TabPanel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const columns = columnsOf(group);
  const tabs = columns.filter((c) => c.label);
  const loose = columns.find((c) => !c.label);
  const [tab, setTab] = useState(tabs[0]?.label ?? null);
  const shown = tabs.find((t) => t.label === tab) ?? loose;
  const photo = PHOTOS[tab ?? group.label] ?? PHOTOS[group.label];

  return (
    <div className={`${WRAP} grid min-h-[340px] gap-10 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)_minmax(0,1.1fr)]`}>
      <div>
        <p className="font-heading text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink">{group.label}</p>
        {tabs.length > 0 && (
          <ul className="m-0 mt-6 list-none p-0">
            {tabs.map((t) => (
              <li key={t.label}>
                <button
                  type="button"
                  aria-pressed={tab === t.label}
                  onClick={() => setTab(t.label)}
                  onMouseEnter={() => setTab(t.label)}
                  onFocus={() => setTab(t.label)}
                  className={`flex w-full cursor-pointer items-center justify-between border-l-4 py-2 pl-4 text-left font-heading text-[17px] font-semibold transition-colors ${
                    tab === t.label ? "border-wos-red text-ink" : "border-transparent text-ink-muted hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        )}
        {loose && tabs.length > 0 && (
          <ul className="m-0 mt-6 list-none border-t border-hairline p-0 pt-4">
            {loose.links.map((link) => (
              <li key={link.href}>
                <MenuLink link={link} onNavigate={onNavigate} className="block py-1.5 pl-5 text-[16px] text-ink no-underline hover:text-action-deep" />
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul className="m-0 list-none self-start p-0">
        {(shown?.links ?? []).map((link) => (
          <li key={link.href} className="border-t-2 border-wos-red">
            <MenuLink
              link={link}
              onNavigate={onNavigate}
              className="block py-3 font-heading text-[22px] font-semibold leading-snug text-ink no-underline hover:text-action-deep"
            />
          </li>
        ))}
      </ul>

      {photo && (
        <div className="relative hidden aspect-[4/3] overflow-hidden bg-surface-tint lg:block">
          <Image key={photo} src={photo} alt="" fill sizes="30vw" className="object-cover" />
        </div>
      )}
    </div>
  );
}
