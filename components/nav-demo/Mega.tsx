"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Arrow } from "@/components/Chapter";
import { NAV, type NavGroup, type NavLink } from "@/lib/nav";
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
import type { VariantKey } from "./variants";

/**
 * The chosen header: a full-width panel under the bar, the section packed into at most
 * three columns, every top-level entry a bold heading and a group's pages indented under
 * it on a guide line. /nav-demo now shows variations of this one design only, and each
 * is a row in VARIATIONS below rather than a component of its own, so they cannot drift.
 *
 * Shared by every variation:
 * - One fixed height for every section, so the edge below the menu never moves between
 *   About, Services and Join Us. Each height was set from measurement at 1440, 1280 and
 *   1024px.
 * - Reading-size type: 19px+ headings, 18px+ links, 17px bar items.
 * - The page dims behind an open panel, hover intent before a panel opens, and the
 *   consultation call as one line along the bottom.
 */

const WRAP = "mx-auto w-full max-w-[1320px] px-5 md:px-8";

type Tone = {
  panel: string;
  heading: string;
  link: string;
  divider: string;
  cta: string;
  /** The indent guide beside a group's pages, at rest. */
  guide: string;
  /** Vertical dividers between columns, for the divided variation. */
  columnDivide: string;
};

const DARK: Tone = {
  panel: "field field-deep",
  heading: "text-white hover:text-white",
  link: "text-white/80 hover:text-white",
  divider: "border-white/15",
  cta: "text-white/85 hover:text-white",
  guide: "border-white/25",
  columnDivide: "divide-white/15",
};

const LIGHT: Tone = {
  panel: "field field-paper border-b border-hairline",
  heading: "text-ink hover:text-ink",
  link: "text-ink hover:text-action-deep",
  divider: "border-hairline",
  cta: "text-action-deep hover:text-action-deeper",
  guide: "border-hairline-strong",
  columnDivide: "divide-hairline",
};

type Variation = {
  tone: Tone;
  /** How a column is marked: a red rule along its top, dividers between, or nothing. */
  columns: "rule" | "divided" | "none";
  /** The guide line: neutral, red, or neutral turning red under the pointer. */
  guide: "neutral" | "red" | "hover";
  size: "base" | "roomy";
  height: string;
};

const VARIATIONS: Record<VariantKey, Variation> = {
  picked: { tone: DARK, columns: "rule", guide: "neutral", size: "base", height: "lg:h-[440px] xl:h-[415px]" },
  "red-guide": { tone: DARK, columns: "none", guide: "red", size: "base", height: "lg:h-[420px] xl:h-[400px]" },
  "hover-guide": { tone: DARK, columns: "rule", guide: "hover", size: "base", height: "lg:h-[440px] xl:h-[415px]" },
  roomy: { tone: DARK, columns: "rule", guide: "neutral", size: "roomy", height: "lg:h-[475px] xl:h-[450px]" },
  divided: { tone: DARK, columns: "divided", guide: "neutral", size: "base", height: "h-[420px]" },
  light: { tone: LIGHT, columns: "rule", guide: "neutral", size: "base", height: "lg:h-[440px] xl:h-[415px]" },
};

/**
 * Spacing is set for Services, the densest section: two of its three columns stack two
 * groups each. At 24px between stacked groups and 8px between links they read as one
 * block ("packed"), so groups are now 40px apart and links 12px. Services sets every
 * variation's height, which is why About and Join Us have room to spare.
 */
const SIZES = {
  base: { head: "text-[19px]", link: "text-[18px] py-1.5", list: "mt-3", stack: "space-y-10", pages: "space-y-3" },
  roomy: { head: "text-[21px]", link: "text-[19px] py-2", list: "mt-3.5", stack: "space-y-12", pages: "space-y-4" },
} as const;

/**
 * A group's "Overview" link is the page its heading names, so the heading becomes that
 * link and the Overview row goes. Services listed "Overview" three times over.
 */
function split(col: Column): { heading: NavLink | null; links: NavLink[] } {
  const [first, ...rest] = col.links;
  if (col.label && first?.label === "Overview") return { heading: { ...first, label: col.label }, links: rest };
  return { heading: null, links: col.links };
}

/**
 * A section as units, in source order: each group is a unit, and the section's own pages
 * collect into one unit of headings where the first of them appears. About opens with
 * its pages; Services ends with Managed Services.
 */
type Unit = { kind: "pages"; links: NavLink[] } | { kind: "group"; col: Column };

function unitsOf(group: NavGroup): Unit[] {
  return columnsOf(group).map((col) => (col.label ? { kind: "group", col } : { kind: "pages", links: col.links }));
}

const weight = (u: Unit) => (u.kind === "pages" ? u.links.length : split(u.col).links.length + 1.5);

/**
 * Pack units into at most three columns, in order, balancing by rows. Services' five
 * become [Consulting to Hire] [Educational, Advisory] [Research, Managed Services], so
 * every link has room at reading size.
 */
function stacks(units: Unit[], n = 3): Unit[][] {
  if (units.length <= n) return units.map((u) => [u]);
  const total = units.reduce((sum, u) => sum + weight(u), 0);
  const out: Unit[][] = [[]];
  let used = 0;
  units.forEach((u, i) => {
    const target = (total * out.length) / n;
    const remaining = units.length - i;
    const slotsLeft = n - out.length;
    if (out.at(-1)!.length && (used + weight(u) / 2 > target || remaining <= slotsLeft) && out.length < n) out.push([]);
    out.at(-1)!.push(u);
    used += weight(u);
  });
  return out;
}

function UnitView({ unit, v, onNavigate }: { unit: Unit; v: Variation; onNavigate: () => void }) {
  const size = SIZES[v.size];
  // Every top-level entry is this: bold, whether it is a page or a group.
  const head = `block font-heading ${size.head} font-bold leading-snug no-underline underline-offset-[5px] ${v.tone.heading}`;

  if (unit.kind === "pages") {
    return (
      <ul className={`m-0 list-none p-0 ${size.pages}`}>
        {unit.links.map((link) => (
          <li key={link.href}>
            <MenuLink link={link} onNavigate={onNavigate} className={`${head} hover:underline`} />
          </li>
        ))}
      </ul>
    );
  }

  const { heading, links } = split(unit.col);
  const words = (heading?.label ?? unit.col.label ?? "").split(" ");
  const guide =
    v.guide === "red"
      ? "border-wos-red"
      : v.guide === "hover"
        ? `${v.tone.guide} transition-colors duration-150 group-hover/unit:border-wos-red group-focus-within/unit:border-wos-red`
        : v.tone.guide;

  return (
    <div className="group/unit">
      {heading ? (
        <MenuLink link={heading} onNavigate={onNavigate} className={`${head} hover:underline`}>
          {/* The arrow is bound to the last word, so a wrap takes both. */}
          {words.slice(0, -1).join(" ")}{" "}
          <span className="whitespace-nowrap">
            {words.at(-1)}
            <Arrow className="ml-2 inline h-[11px] w-[14px] align-[0.02em]" />
          </span>
        </MenuLink>
      ) : (
        <p className={head}>{unit.col.label}</p>
      )}
      {/* The indent says these belong to the heading above; the guide line says it
          louder. */}
      <ul className={`m-0 ml-0.5 list-none border-l-2 p-0 pl-4 ${size.list} ${guide}`}>
        {links.map((link) => (
          <li key={link.href}>
            <MenuLink
              link={link}
              onNavigate={onNavigate}
              className={`block ${size.link} leading-snug no-underline underline-offset-[4px] hover:underline ${v.tone.link}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Columns({ group, v, close }: { group: NavGroup; v: Variation; close: () => void }) {
  const size = SIZES[v.size];
  const column =
    v.columns === "rule" ? "border-t-2 border-wos-red pt-4" : v.columns === "divided" ? "px-8 first:pl-0 last:pr-0 xl:px-12" : "";
  return (
    <div className={`grid grid-cols-3 ${v.columns === "divided" ? `divide-x ${v.tone.columnDivide}` : "gap-x-10 xl:gap-x-16"}`}>
      {stacks(unitsOf(group)).map((stack, i) => (
        <div key={i} className={`${size.stack} ${column}`}>
          {stack.map((unit, j) => (
            <UnitView key={j} unit={unit} v={v} onNavigate={close} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ThreeColumnNav({ variant }: { variant: VariantKey }) {
  const v = VARIATIONS[variant];
  const ref = useRef<HTMLElement>(null);
  const { open, close, triggerProps, containerProps } = useMenu(ref);
  const pathname = usePathname();

  return (
    <header ref={ref} {...containerProps} onMouseLeave={close} className="sticky top-0 z-50 border-b border-hairline bg-white">
      <div className={`${WRAP} flex h-16 items-center justify-between gap-4 lg:h-[76px]`}>
        <Logo onNavigate={close} />
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-9">
          {NAV.map((node) =>
            node.kind === "link" ? (
              <MenuLink key={node.label} link={node} onNavigate={close} className={`${barItem(isActive(pathname, node))} text-[17px]`} />
            ) : (
              <button
                key={node.label}
                {...triggerProps(node.label, panelId(variant, node.label))}
                className={`${barItem(isActive(pathname, node) || open === node.label)} text-[17px]`}
              >
                {node.label}
                <Chevron open={open === node.label} />
              </button>
            ),
          )}
          <Donate onNavigate={close} className="px-6 py-2.5 text-[16px]" />
        </nav>
        <MobileMenu />
      </div>

      {GROUPS.map((group) => (
        <div key={group.label} id={panelId(variant, group.label)} hidden={open !== group.label} className={`absolute inset-x-0 top-full ${v.tone.panel}`}>
          {/* The page below dims while a panel is open, so the panel is the one thing on
              screen and its edge shows over any page. No pointer events, so moving onto
              the page still closes the menu. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full h-screen bg-surface-deep/45" />
          <div className={`${WRAP} flex flex-col py-10 ${v.height}`}>
            <div className="min-h-0 flex-1">
              <Columns group={group} v={v} close={close} />
            </div>
            <div className={`mt-6 border-t pt-5 ${v.tone.divider}`}>
              <Link
                href="/contact"
                onClick={close}
                className={`inline-flex w-fit items-center gap-3 font-heading text-[17px] font-semibold no-underline underline-offset-[5px] hover:underline ${v.tone.cta}`}
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
