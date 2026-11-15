"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
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

/**
 * Option 2 and its variations: the menu as a full-width panel under the bar.
 *
 * What every variation shares lives in MegaShell, so the four differ only in how a
 * section's pages are laid out:
 *
 * - One fixed height per variation, the same for every section, so the edge below the
 *   menu never moves between About, Services and Join Us.
 * - Type sized for reading, not for fitting: 18px links and 17px bar items. The first
 *   cut set links at 15-16px, which is small for the many visitors past 35.
 * - Quiet: one rule per group rather than per link, body-weight links, the page dimmed
 *   behind, and the consultation call as one line along the bottom.
 */

const WRAP = "mx-auto w-full max-w-[1320px] px-5 md:px-8";

export type Tone = {
  panel: string;
  /** The indent guide line beside a group's pages. */
  guide: string;
  heading: string;
  link: string;
  rule: string;
  divider: string;
  cta: string;
  muted: string;
};

const DARK: Tone = {
  panel: "field field-deep",
  guide: "border-white/25",
  heading: "text-white hover:text-white",
  link: "text-white/80 hover:text-white",
  rule: "border-wos-red",
  divider: "border-white/15",
  cta: "text-white/85 hover:text-white",
  muted: "text-white/60",
};

const LIGHT: Tone = {
  panel: "field field-paper border-b border-hairline",
  guide: "border-hairline-strong",
  heading: "text-ink hover:text-ink",
  link: "text-ink hover:text-action-deep",
  rule: "border-wos-red",
  divider: "border-hairline",
  cta: "text-action-deep hover:text-action-deeper",
  muted: "text-ink-muted",
};

/**
 * A group's "Overview" link is the page its heading names, so the heading becomes that
 * link and the Overview row goes. Services listed "Overview" three times over.
 */
export function split(col: Column): { heading: NavLink | null; links: NavLink[] } {
  const [first, ...rest] = col.links;
  if (col.label && first?.label === "Overview") return { heading: { ...first, label: col.label }, links: rest };
  return { heading: null, links: col.links };
}

/** A group heading: a link with the arrow bound to its last word, or plain text. */
function GroupHeading({ col, tone, onNavigate, size = "text-[18px]" }: { col: Column; tone: Tone; onNavigate: () => void; size?: string }) {
  const { heading } = split(col);
  const cls = `mb-2 block font-heading ${size} font-semibold leading-snug no-underline underline-offset-[5px]`;
  if (heading) {
    const words = heading.label.split(" ");
    return (
      <MenuLink link={heading} onNavigate={onNavigate} className={`${cls} ${tone.heading} hover:underline`}>
        {words.slice(0, -1).join(" ")}{" "}
        <span className="whitespace-nowrap">
          {words.at(-1)}
          <Arrow className="ml-2 inline h-[11px] w-[14px] align-[0.02em]" />
        </span>
      </MenuLink>
    );
  }
  return col.label ? <p className={`${cls} ${tone.heading}`}>{col.label}</p> : null;
}

/** A ruled group: heading, then its pages. The unit every columns layout is built from. */
function Group({ col, tone, onNavigate }: { col: Column; tone: Tone; onNavigate: () => void }) {
  return (
    <div className={`min-w-0 border-t-2 pt-3 ${tone.rule}`}>
      <GroupHeading col={col} tone={tone} onNavigate={onNavigate} />
      <ul className="m-0 list-none p-0">
        {split(col).links.map((link) => (
          <li key={link.href}>
            <MenuLink
              link={link}
              onNavigate={onNavigate}
              className={`block py-1.5 text-[18px] leading-snug no-underline underline-offset-[4px] hover:underline ${tone.link}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MegaShell({
  variant,
  tone,
  height,
  body,
}: {
  variant: string;
  tone: Tone;
  /** One height for every section of this variation. */
  height: string;
  body: (group: NavGroup, close: () => void) => ReactNode;
}) {
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
        <div key={group.label} id={panelId(variant, group.label)} hidden={open !== group.label} className={`absolute inset-x-0 top-full ${tone.panel}`}>
          {/* The page below dims while a panel is open, so the panel is the one thing on
              screen and its edge shows over any page. No pointer events, so moving onto
              the page still closes the menu. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full h-screen bg-surface-deep/45" />
          <div className={`${WRAP} flex flex-col py-10 ${height}`}>
            <div className="min-h-0 flex-1">{body(group, close)}</div>
            <div className={`mt-6 border-t pt-5 ${tone.divider}`}>
              <Link
                href="/contact"
                onClick={close}
                className={`inline-flex w-fit items-center gap-3 font-heading text-[17px] font-semibold no-underline underline-offset-[5px] hover:underline ${tone.cta}`}
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

/**
 * Five tracks for every section, the most any has, so a group sits in the same place
 * whichever panel is open and a short section does not stretch one rule across the page.
 */
function Columns({ group, tone, close }: { group: NavGroup; tone: Tone; close: () => void }) {
  return (
    <div className="grid grid-cols-5 gap-x-6 xl:gap-x-10">
      {columnsOf(group).map((col, i) => (
        <Group key={col.label ?? `loose-${i}`} col={col} tone={tone} onNavigate={close} />
      ))}
    </div>
  );
}

/** 2A: dark columns. */
export function MegaDark() {
  return <MegaShell variant="mega" tone={DARK} height="lg:h-[425px] xl:h-[370px]" body={(g, close) => <Columns group={g} tone={DARK} close={close} />} />;
}

/** 2B: the same columns on white, the highest-contrast reading of the panel. */
export function MegaLight() {
  return <MegaShell variant="mega-light" tone={LIGHT} height="lg:h-[425px] xl:h-[370px]" body={(g, close) => <Columns group={g} tone={LIGHT} close={close} />} />;
}

/**
 * The three-column family (2D to 2F) treats a section's contents as entries of one rank.
 *
 * Every top-level entry is a bold heading, whether it is a page on its own ("Managed
 * Services", "Our Story") or a group with pages beneath it ("Boards"). A page that
 * belongs to a group is indented under it, so what sits under what is visible at a
 * glance rather than inferred from spacing.
 */
type Unit = { kind: "pages"; links: NavLink[] } | { kind: "group"; col: Column };

/**
 * A section as units, in source order: each group is a unit, and the section's own
 * pages collect into one unit of headings where the first of them appears. About opens
 * with its pages; Services ends with Managed Services.
 */
function unitsOf(group: NavGroup): Unit[] {
  return columnsOf(group).map((col) => (col.label ? { kind: "group", col } : { kind: "pages", links: col.links }));
}

const weight = (u: Unit) => (u.kind === "pages" ? u.links.length : split(u.col).links.length + 1.5);

/**
 * Pack units into at most three stacks, in order, balancing by rows. Services' five
 * become [Consulting to Hire] [Educational, Advisory] [Research, Managed Services], so
 * every link has room at 18px.
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

/** Bold, 19px: the rank every top-level entry shares. */
const HEAD = "font-heading text-[19px] font-bold leading-snug no-underline underline-offset-[5px]";

type Indent = "guide" | "plain";

function WideUnit({ unit, tone, indent, onNavigate }: { unit: Unit; tone: Tone; indent: Indent; onNavigate: () => void }) {
  if (unit.kind === "pages") {
    return (
      <ul className="m-0 list-none space-y-3 p-0">
        {unit.links.map((link) => (
          <li key={link.href}>
            <MenuLink link={link} onNavigate={onNavigate} className={`block ${HEAD} hover:underline ${tone.heading}`} />
          </li>
        ))}
      </ul>
    );
  }
  const { heading, links } = split(unit.col);
  const words = (heading?.label ?? unit.col.label ?? "").split(" ");
  return (
    <div>
      {heading ? (
        <MenuLink link={heading} onNavigate={onNavigate} className={`block ${HEAD} hover:underline ${tone.heading}`}>
          {words.slice(0, -1).join(" ")}{" "}
          <span className="whitespace-nowrap">
            {words.at(-1)}
            <Arrow className="ml-2 inline h-[11px] w-[14px] align-[0.02em]" />
          </span>
        </MenuLink>
      ) : (
        <p className={`${HEAD} ${tone.heading}`}>{unit.col.label}</p>
      )}
      {/* The indent is what says these belong to the heading above. The guide line is
          the stronger version of the same signal. */}
      <ul className={`m-0 mt-2 list-none p-0 ${indent === "guide" ? `ml-0.5 border-l-2 pl-4 ${tone.guide}` : "pl-5"}`}>
        {links.map((link) => (
          <li key={link.href}>
            <MenuLink
              link={link}
              onNavigate={onNavigate}
              className={`block py-1 text-[18px] leading-snug no-underline underline-offset-[4px] hover:underline ${tone.link}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Never more than three columns, each headed by one red rule rather than a rule per
 * group: with every entry bold, a rule on each as well was one signal too many.
 */
function Wide({ group, tone, indent, close }: { group: NavGroup; tone: Tone; indent: Indent; close: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-x-10 xl:gap-x-16">
      {stacks(unitsOf(group)).map((stack, i) => (
        <div key={i} className={`space-y-6 border-t-2 pt-4 ${tone.rule}`}>
          {stack.map((unit, j) => (
            <WideUnit key={j} unit={unit} tone={tone} indent={indent} onNavigate={close} />
          ))}
        </div>
      ))}
    </div>
  );
}

const WIDE_HEIGHT = "lg:h-[405px] xl:h-[380px]";

/** 2D: three columns, bold headings, pages indented on a guide line. */
export function MegaWide() {
  return <MegaShell variant="mega-wide" tone={DARK} height={WIDE_HEIGHT} body={(g, close) => <Wide group={g} tone={DARK} indent="guide" close={close} />} />;
}

/** 2E: the same, indented without the line. */
export function MegaWidePlain() {
  return (
    <MegaShell variant="mega-wide-plain" tone={DARK} height={WIDE_HEIGHT} body={(g, close) => <Wide group={g} tone={DARK} indent="plain" close={close} />} />
  );
}

/** 2F: 2D on the light panel. */
export function MegaWideLight() {
  return (
    <MegaShell variant="mega-wide-light" tone={LIGHT} height={WIDE_HEIGHT} body={(g, close) => <Wide group={g} tone={LIGHT} indent="guide" close={close} />} />
  );
}

/**
 * 2C: two steps. The section's groups are one short list on the left; the group under the
 * pointer shows its pages, large, on the right. Loose pages sit in the list as links.
 * The fewest things on screen at once of any variation.
 */
function Steps({ group, close }: { group: NavGroup; close: () => void }) {
  const cols = columnsOf(group);
  const groups = cols.filter((c) => c.label);
  const loose = cols.find((c) => !c.label)?.links ?? [];
  const [selected, setSelected] = useState(groups[0]?.label ?? null);
  const shown = groups.find((g) => g.label === selected);
  const looseFirst = group.children[0]?.kind === "link";

  const looseItems = loose.map((link) => (
    <li key={link.href}>
      <MenuLink
        link={link}
        onNavigate={close}
        className="block py-1.5 font-heading text-[18px] font-semibold text-white/85 no-underline underline-offset-[5px] hover:text-white hover:underline"
      />
    </li>
  ));

  return (
    <div className="grid h-full grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] gap-10 xl:gap-16">
      <ul className="m-0 list-none border-r border-white/15 p-0 pr-8">
        {looseFirst && looseItems}
        {groups.map((g) => (
          <li key={g.label}>
            <button
              type="button"
              aria-pressed={selected === g.label}
              onMouseEnter={() => setSelected(g.label)}
              onFocus={() => setSelected(g.label)}
              onClick={() => setSelected(g.label)}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 py-1.5 text-left font-heading text-[18px] font-semibold transition-colors ${
                selected === g.label ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {g.label}
              <Arrow className={`h-[12px] w-[16px] flex-none ${selected === g.label ? "text-wos-red" : "opacity-0"}`} />
            </button>
          </li>
        ))}
        {!looseFirst && looseItems}
      </ul>
      {/* A section with no groups (Join Us) is all list; the right side stays empty. */}
      <div>
        {shown ? (
          <>
            <GroupHeading col={shown} tone={DARK} onNavigate={close} size="text-[22px]" />
            <ul className="m-0 mt-3 grid list-none gap-x-10 p-0 sm:grid-cols-2">
              {split(shown).links.map((link) => (
                <li key={link.href} className="border-t-2 border-wos-red">
                  <MenuLink
                    link={link}
                    onNavigate={close}
                    className="block py-3 text-[19px] leading-snug text-white/85 no-underline underline-offset-[4px] hover:text-white hover:underline"
                  />
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}

export function MegaSteps() {
  return <MegaShell variant="mega-steps" tone={DARK} height="h-[450px]" body={(g, close) => <Steps group={g} close={close} />} />;
}
