// The headers /nav-demo can show, in the order the switcher lists them.
//
// A plain module rather than part of the switcher, because the @header slot is a server
// component and reads this to decide what to render. A value exported from a
// "use client" file reaches a server component as a reference, not as the array.

export const VARIANTS = [
  {
    key: "current",
    name: "Current",
    note: "What ships today: a white bar and a bordered card of columns under it.",
  },
  {
    key: "mega",
    name: "Full-width panel",
    note: "The menu opens as a deep band across the whole width, at one fixed height for every section, with quiet links and one rule per column.",
  },
  {
    key: "dark",
    name: "On the gradient",
    note: "The bar sits on the opening gradient in white, and turns solid deep once you scroll. Dark panels.",
  },
  {
    key: "overlay",
    name: "Full-screen menu",
    note: "One Menu button at every width. The whole screen becomes the menu: sections on the left, their pages on the right.",
  },
  {
    key: "utility",
    name: "Two-tier bar",
    note: "A slim strip for Careers, Contact and Donate above a simpler bar. Each dropdown is one short column under its own label.",
  },
  {
    key: "drawer",
    name: "Side drawer",
    note: "The three most-used links stay in the bar; everything else is in a drawer that slides in from the right.",
  },
  {
    key: "tabs",
    name: "Photo panel",
    note: "A wide panel with the groups as tabs on the left, their pages in the middle, and a photograph of that area on the right.",
  },
  {
    key: "centered",
    name: "Centered logo",
    note: "The logo in the middle, sections split either side, and a light full-width band of columns underneath.",
  },
] as const;

export type VariantKey = (typeof VARIANTS)[number]["key"];

export function parseVariant(value: string | string[] | undefined): VariantKey {
  const v = Array.isArray(value) ? value[0] : value;
  return VARIANTS.some((x) => x.key === v) ? (v as VariantKey) : "current";
}
