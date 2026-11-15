import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "@/components/Chapter";
import { DONATE, NAV, type NavGroup, type NavLink, type NavNode } from "@/lib/nav";

/**
 * The pieces the desktop panel and the phone menu share: the nav tree reshaped into
 * units, the active state, and how a unit is drawn. DESIGN.md §4.
 */

export const GROUPS = NAV.filter((n): n is NavGroup => n.kind === "group");

/** Every href beneath a node, used to decide whether a top-level item is active. */
function hrefsOf(node: NavNode): string[] {
  return node.kind === "link" ? [node.href] : node.children.flatMap(hrefsOf);
}

export function isActive(pathname: string, node: NavNode) {
  return hrefsOf(node).some((href) => {
    if (href.startsWith("http")) return false;
    const clean = href.replace(/\/$/, "");
    return pathname === clean || pathname === `${clean}/`;
  });
}

/**
 * A section as units, in source order. Each subgroup is a unit, and the section's own
 * pages collect into one unit where the first of them appears: About opens with its
 * pages, Services ends with Managed Services.
 */
export type Unit = { kind: "pages"; links: NavLink[] } | { kind: "group"; label: string; heading: NavLink | null; links: NavLink[] };

export function unitsOf(group: NavGroup): Unit[] {
  const loose = group.children.filter((c): c is NavLink => c.kind === "link");
  const groups: Unit[] = group.children
    .filter((c): c is NavGroup => c.kind === "group")
    .map((g) => {
      const links = g.children.filter((n): n is NavLink => n.kind === "link");
      // A group's "Overview" link is the page its heading names, so the heading becomes
      // that link and the Overview row goes. Services listed "Overview" three times.
      const [first, ...rest] = links;
      return first?.label === "Overview"
        ? { kind: "group", label: g.label, heading: { ...first, label: g.label }, links: rest }
        : { kind: "group", label: g.label, heading: null, links };
    });
  if (!loose.length) return groups;
  const pages: Unit = { kind: "pages", links: loose };
  return group.children[0]?.kind === "link" ? [pages, ...groups] : [...groups, pages];
}

const weight = (u: Unit) => (u.kind === "pages" ? u.links.length : u.links.length + 1.5);

/**
 * Pack units into at most three columns, in order, balancing by rows. Services' five
 * become [Consulting to Hire] [Educational, Advisory] [Research, Managed Services], so
 * every link has room at reading size.
 */
export function stacks(units: Unit[], n = 3): Unit[][] {
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

/** A nav link, with the new-tab affordance in its accessible name when it leaves the site. */
export function MenuLink({
  link,
  className,
  onNavigate,
  children,
}: {
  link: NavLink;
  className: string;
  onNavigate?: () => void;
  children?: ReactNode;
}) {
  return (
    <Link
      href={link.href}
      className={className}
      onClick={onNavigate}
      {...(link.external
        ? { target: "_blank", rel: "noopener noreferrer", "aria-label": `${link.label} (opens in a new tab)` }
        : {})}
    >
      {children ?? link.label}
    </Link>
  );
}

// Every top-level entry is a bold heading, whether it is a page on its own or a group.
// White on the deep field, which both menus sit on.
const HEAD =
  "block font-heading text-[21px] font-bold leading-snug text-white no-underline underline-offset-[5px] hover:text-white";

/**
 * One unit: a run of bold page headings, or a group's bold heading with its pages
 * indented beneath it on a red guide line. The indent says the pages belong to the
 * heading; the red line says it at a glance.
 */
export function UnitView({ unit, onNavigate }: { unit: Unit; onNavigate: () => void }) {
  if (unit.kind === "pages") {
    return (
      <ul className="m-0 list-none space-y-4 p-0">
        {unit.links.map((link) => (
          <li key={link.href}>
            <MenuLink link={link} onNavigate={onNavigate} className={`${HEAD} hover:underline`} />
          </li>
        ))}
      </ul>
    );
  }

  const words = unit.label.split(" ");
  return (
    <div>
      {unit.heading ? (
        <MenuLink link={unit.heading} onNavigate={onNavigate} className={`${HEAD} hover:underline`}>
          {/* The arrow is bound to the last word, so a wrap takes both. */}
          {words.slice(0, -1).join(" ")}{" "}
          <span className="whitespace-nowrap">
            {words.at(-1)}
            <Arrow className="ml-2 inline h-[11px] w-[14px] align-[0.02em]" />
          </span>
        </MenuLink>
      ) : (
        <p className={HEAD}>{unit.label}</p>
      )}
      <ul className="m-0 ml-0.5 mt-3.5 list-none border-l-2 border-wos-red p-0 pl-4">
        {unit.links.map((link) => (
          <li key={link.href}>
            <MenuLink
              link={link}
              onNavigate={onNavigate}
              className="block py-2 text-[19px] leading-snug text-white/80 no-underline underline-offset-[4px] hover:text-white hover:underline"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Donate({ onNavigate, className = "" }: { onNavigate?: () => void; className?: string }) {
  return (
    <Link
      href={DONATE.href}
      onClick={onNavigate}
      className={`inline-block bg-action-deep font-heading font-semibold text-white no-underline transition-colors hover:bg-action-deeper hover:text-white ${className}`}
    >
      {DONATE.label}
    </Link>
  );
}
