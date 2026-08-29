import type { MetadataRoute } from "next";
import { POSTS } from "@/content/posts";
import { listGroups, listPeople, personHref } from "@/lib/people/store";

// Kept as an explicit list rather than a filesystem walk: the routes here are the ones
// that should be indexed, which is not the same as the ones that happen to build.
//
// The people routes are the exception and are derived, because they change with the
// registry and a hand-list would go stale the first time someone is added or hidden.
const ROUTES = [
  "", "our-story",
  "corporate-partners", "academic-partners", "locations", "financials", "faqs",
  "managed-service-centers", "facilities-management", "on-site-remote-staffing",
  "educational-services", "professional-development-fundamentals",
  "professional-development", "advisory-services", "ai-services", "langer-arc",
  "itsupport", "cyber-security", "legacy-application-support",
  "data-analytics-and-ai", "shared-services", "college-co-ops-and-internships",
  "cohorts", "become-a-partner", "blog", "contact", "donate", "privacy-policy",
  "institute-of-workforce-policy-practice",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wforce.org";
  const groups = listGroups();
  const people = groups.flatMap((g) =>
    listPeople(g.id)
      .filter((p) => p.groups[0] === g.id)
      .map(personHref)
      .filter((href): href is string => href !== null),
  );
  return [
    ...[...ROUTES.map((r) => `/${r}`), ...groups.map((g) => `/${g.path}`), ...people].map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...POSTS.map((post) => ({
      url: `${base}/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00`),
    })),
  ];
}
