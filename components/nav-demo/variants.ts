// The headers /nav-demo can show, in the order the switcher lists them.
//
// A plain module rather than part of the switcher, because the @header slot is a server
// component and reads this to decide what to render. A value exported from a
// "use client" file reaches a server component as a reference, not as the array.
//
// `family` groups the switcher: option 2's variations on one row, everything else on
// the other. `num` is what the switcher shows, so the variations read as 2A to 2D.

export const VARIANTS = [
  {
    key: "mega",
    num: "2A",
    family: "two",
    name: "Dark columns",
    note: "Option 2 with reading-size type: a deep panel at one fixed height, a column per group, one rule each.",
  },
  {
    key: "mega-light",
    num: "2B",
    family: "two",
    name: "Light panel",
    note: "The same columns on white with slate type. The highest contrast of the set, and it feels lighter.",
  },
  {
    key: "mega-steps",
    num: "2C",
    family: "two",
    name: "Two-step",
    note: "The section's groups as a short list on the left; point at one and its pages show large on the right. The least on screen at once.",
  },
  {
    key: "mega-wide",
    num: "2D",
    family: "two",
    name: "Three columns, guide line",
    note: "Never more than three columns. Every top-level entry is a bold heading; pages under a group are indented on a thin guide line.",
  },
  {
    key: "mega-wide-plain",
    num: "2E",
    family: "two",
    name: "Three columns, indent only",
    note: "As 2D, with the indent alone and no guide line. Quieter, with the hierarchy carried by position.",
  },
  {
    key: "mega-wide-light",
    num: "2F",
    family: "two",
    name: "Three columns, light",
    note: "2D on a white panel with slate type: bold headings, indented pages on a guide line.",
  },
  {
    key: "current",
    num: "1",
    family: "other",
    name: "Current",
    note: "What ships today: a white bar and a bordered card of columns under it.",
  },
  {
    key: "dark",
    num: "3",
    family: "other",
    name: "On the gradient",
    note: "The bar sits on the opening gradient in white, and turns solid deep once you scroll. Dark panels.",
  },
  {
    key: "overlay",
    num: "4",
    family: "other",
    name: "Full-screen menu",
    note: "One Menu button at every width. The whole screen becomes the menu: sections on the left, their pages on the right.",
  },
  {
    key: "utility",
    num: "5",
    family: "other",
    name: "Two-tier bar",
    note: "A slim strip for Careers, Contact and Donate above a simpler bar. Each dropdown is one short column under its own label.",
  },
  {
    key: "drawer",
    num: "6",
    family: "other",
    name: "Side drawer",
    note: "The two direct links stay in the bar; everything else is in a drawer that slides in from the right.",
  },
  {
    key: "tabs",
    num: "7",
    family: "other",
    name: "Photo panel",
    note: "A wide panel with the groups as tabs on the left, their pages in the middle, and a photograph of that area on the right.",
  },
  {
    key: "centered",
    num: "8",
    family: "other",
    name: "Centered logo",
    note: "The logo in the middle, sections split either side, and a light full-width band of columns underneath.",
  },
] as const;

export type VariantKey = (typeof VARIANTS)[number]["key"];

/** With no `?v=`, the demo opens on the option under review. */
export function parseVariant(value: string | string[] | undefined): VariantKey {
  const v = Array.isArray(value) ? value[0] : value;
  return VARIANTS.some((x) => x.key === v) ? (v as VariantKey) : "mega-wide";
}
