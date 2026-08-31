import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The people admin builds in every environment and returns 404 outside development,
      // so this is not what protects it. It is here so a crawler does not publish the
      // existence of the path, and so the 404s stay out of Search Console.
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
