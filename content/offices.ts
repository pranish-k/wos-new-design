// The three WOS offices, as structured records rather than as one line of prose each.
//
// The live page runs each address together on a single line - "475 Riverside Drive Suite
// 1350 New York, NY 10115 - info@wforce.org Tel: 212.870.2260" - which is neither a
// postal address a reader can scan nor something a phone can dial. Every string below is
// the live page's own; only the line breaks and the tel/mailto hrefs are added.
//
// `mapQuery` is what goes to Google Maps. It is written out rather than assembled from
// the parts because the Costa Rica office has no street number, and a query built from
// empty fields lands in the middle of the country.

export type Office = {
  id: string;
  name: string;
  /** Street and suite, one line each, in postal order. */
  street: string[];
  /** The locality line: city, region and postcode as one string. */
  locality: string;
  country?: string;
  tel?: string;
  email?: string;
  mapQuery: string;
  /** Named so a screen reader hears which office the map shows. */
  mapLabel: string;
};

export const OFFICES: Office[] = [
  {
    id: "new-york",
    name: "WOS Headquarters",
    street: ["475 Riverside Drive", "Suite 1350"],
    locality: "New York, NY 10115",
    tel: "212.870.2260",
    email: "info@wforce.org",
    mapQuery: "475 Riverside Drive Suite 1350, New York, NY 10115",
    mapLabel: "Map of the WOS headquarters at 475 Riverside Drive, New York",
  },
  {
    id: "dallas",
    name: "WOS Dallas Office",
    street: ["4101 McEwen Road", "Suite 800"],
    locality: "Farmers Branch, TX 75244",
    mapQuery: "4101 McEwen Road Suite 800, Farmers Branch, TX 75244",
    mapLabel: "Map of the WOS Dallas office at 4101 McEwen Road, Farmers Branch",
  },
  {
    id: "costa-rica",
    name: "WOS Costa Rica Office",
    street: ["Mata Grande"],
    locality: "Río Oro, San José Province",
    country: "Costa Rica",
    mapQuery: "Mata Grande, Río Oro, Santa Ana, San José Province, Costa Rica",
    mapLabel: "Map of the WOS Costa Rica office in Río Oro, San José Province",
  },
];

/**
 * The keyless Google Maps embed.
 *
 * The documented Maps Embed API wants a billed API key, which would have to exist in the
 * environment at build time and in Vercel, and a missing one renders a broken frame
 * rather than a map. This form needs no key and no account. It is the long-standing
 * `output=embed` endpoint rather than a documented API, so if Google retires it the
 * three frames go blank and this is the single place to change.
 */
export function mapSrc(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

/** Opens the same place in whatever map app the visitor actually uses. */
export function mapLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
