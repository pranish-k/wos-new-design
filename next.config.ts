import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/**
 * Legacy person URLs, derived from the registry rather than hand-listed.
 *
 * The live index cards link to top-level duplicate slugs while the sitemap treats the
 * nested paths as canonical. Both sets are live and both are indexed, so dropping either
 * without a redirect breaks links that exist in the wild. See PROGRESS.md, decision 4.
 *
 * Read here with fs rather than imported: next.config.ts is loaded by Node before the
 * TypeScript path aliases exist, so `@/lib/people/store` would not resolve.
 */
function personRedirects() {
  const dir = path.join(process.cwd(), "content", "people");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .flatMap((f) => {
      let p;
      try {
        p = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      } catch (e) {
        // This runs before the store's validator, so an unnamed SyntaxError here would
        // be the only thing a broken record produced.
        throw new Error(`content/people/${f}: ${(e as Error).message}`);
      }
      // A hidden person keeps their redirect pointing at a page that no longer builds,
      // so their legacy URLs are dropped with them.
      if (p.status !== "published" || p.bio.length === 0) return [];
      return (p.legacyPaths as string[]).map((source) => ({
        source,
        destination: `/${p.groups[0]}/${p.slug}`,
        permanent: true,
      }));
    })
    .sort((a, b) => a.source.localeCompare(b.source));
}

const nextConfig: NextConfig = {
  // sharp is a native module used by the dev-only people admin. Bundling it breaks the
  // binary lookup, and it must never be traced into a production build.
  serverExternalPackages: ["sharp"],
  async redirects() {
    return personRedirects();
  },
};

export default nextConfig;
