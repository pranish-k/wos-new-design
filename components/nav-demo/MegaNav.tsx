"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Arrow } from "@/components/Chapter";
import { NAV, type NavLink } from "@/lib/nav";
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
  type Column,
} from "./shared";

const WRAP = "mx-auto w-full max-w-[1320px] px-5 md:px-8";

/**
 * A column's "Overview" link is the page its heading names, so the heading becomes that
 * link and the Overview row goes. Services showed "Overview" three times over, which is
 * three rows saying nothing new.
 */
function split(col: Column): { heading: NavLink | null; links: NavLink[] } {
  const [first, ...rest] = col.links;
  if (col.label && first?.label === "Overview") {
    return { heading: { ...first, label: col.label }, links: rest };
  }
  return { heading: null, links: col.links };
}

/**
 * Full-width panel: the open menu is a deep chapter across the whole page.
 *
 * Every panel is one fixed height, so moving between About, Services and Join Us never
 * moves the edge the page shows below. The first version sized each panel to its
 * content and the bottom edge jumped by more than 150px between them.
 *
 * Kept quiet on purpose. The first version set every link bold on its own red rule
 * beside a large crimson block, and a menu of twenty items read as twenty headlines. Now
 * one rule heads each column, the links are body weight, and the consultation call is a
 * single line along the bottom edge. The page below dims while a panel is open.
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
          {/* The page below dims while a panel is open: the panel reads as the one thing
              on screen, and its edge stays visible over the dark homepage opening. It
              takes no pointer events, so moving onto the page still closes the menu. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full h-screen bg-surface-deep/45" />
          {/* No section-name column: the section is already the highlighted item in the
              bar, and a 28px title beside the columns was one more thing to read. The
              columns take the whole grid, and the consultation call is one line along the
              bottom edge. */}
          <div className={`${WRAP} flex h-[320px] flex-col py-10`}>
            {/* Five tracks for every section, the most any has, so a column sits in the
                same place whichever panel is open and a short section does not stretch
                one rule across the page. */}
            <div className="grid grid-cols-5 gap-x-6 xl:gap-x-10">
              {columnsOf(group).map((col, i) => {
                const { heading, links } = split(col);
                return (
                  <div key={col.label ?? `loose-${i}`} className="min-w-0 border-t-2 border-wos-red pt-3">
                    {heading ? (
                      <MenuLink
                        link={heading}
                        onNavigate={close}
                        className="mb-2 block font-heading text-[15px] font-semibold leading-snug text-white no-underline underline-offset-[5px] hover:text-white hover:underline"
                      >
                        {/* The arrow is bound to the last word, so a wrap takes them both
                            to the next line rather than leaving the arrow there alone. */}
                        {heading.label.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="whitespace-nowrap">
                          {heading.label.split(" ").at(-1)}
                          <Arrow className="ml-2 inline h-[10px] w-[13px] align-[0.02em]" />
                        </span>
                      </MenuLink>
                    ) : (
                      col.label && <p className="mb-2 font-heading text-[15px] font-semibold leading-snug text-white">{col.label}</p>
                    )}
                    <ul className="m-0 list-none p-0">
                      {links.map((link) => (
                        <li key={link.href}>
                          <MenuLink
                            link={link}
                            onNavigate={close}
                            className="block py-1.5 text-[15px] leading-snug text-white/75 xl:text-[16px] no-underline underline-offset-[4px] hover:text-white hover:underline"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="mt-auto border-t border-white/15 pt-5">
              <Link
                href="/contact"
                onClick={close}
                className="inline-flex w-fit items-center gap-3 font-heading text-[15px] font-semibold text-white/75 no-underline underline-offset-[5px] hover:text-white hover:underline"
              >
                Schedule a free consultation <Arrow />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </header>
  );
}
