import type { MetadataRoute } from "next";
import { POSTS } from "@/content/posts";

// Kept as an explicit list rather than a filesystem walk: the routes here are the ones
// that should be indexed, which is not the same as the ones that happen to build.
const ROUTES = [
  "", "our-story", "team", "board-of-directors", "academic-advisory-board",
  "corporate-partners", "academic-partners", "locations", "financials", "faqs",
  "managed-service-centers", "facilities-management", "on-site-remote-staffing",
  "educational-services", "professional-development-fundamentals",
  "professional-development", "advisory-services", "ai-services", "langer-arc",
  "itsupport", "cyber-security", "legacy-application-support",
  "data-analytics-and-ai", "shared-services", "college-co-ops-and-internships",
  "cohorts", "become-a-partner", "blog", "contact", "donate", "privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wforce.org";
  return [
    ...ROUTES.map((route) => ({
      url: `${base}/${route}`,
      lastModified: new Date(),
    })),
    ...POSTS.map((post) => ({
      url: `${base}/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00`),
    })),
  ];
}
