// The variations /nav-demo shows, in the order the switcher lists them.
//
// The header is chosen: the three-column panel (components/nav-demo/Mega.tsx). These are
// variations of that one design only. The other candidates it was picked from are in
// git history (8a9d29b and before).
//
// A plain module rather than part of the switcher, because the @header slot is a server
// component and reads this to decide what to render. A value exported from a
// "use client" file reaches a server component as a reference, not as the array.

export const VARIANTS = [
  {
    key: "picked",
    name: "As picked",
    note: "Three columns, every top-level entry a bold heading, a group's pages indented on a thin guide line, one red rule over each column.",
  },
  {
    key: "red-guide",
    name: "Red guide line",
    note: "The guide line is red and the column rules go, so the red marks what belongs to what and nothing else.",
  },
  {
    key: "hover-guide",
    name: "Guide lights up",
    note: "The guide line is quiet until you point at a group, then turns red, so the group you are reading stands out.",
  },
  {
    key: "roomy",
    name: "Roomier",
    note: "Larger headings (21px) and links (19px) with more space between groups. Easiest to read; the panel is taller.",
  },
  {
    key: "divided",
    name: "Divided columns",
    note: "Thin lines between the three columns instead of red rules over them. Calmer, with less red.",
  },
  {
    key: "light",
    name: "Light",
    note: "The same panel on white with slate type, for the highest contrast.",
  },
] as const;

export type VariantKey = (typeof VARIANTS)[number]["key"];

export function parseVariant(value: string | string[] | undefined): VariantKey {
  const v = Array.isArray(value) ? value[0] : value;
  return VARIANTS.some((x) => x.key === v) ? (v as VariantKey) : "picked";
}
