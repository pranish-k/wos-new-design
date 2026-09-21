#!/usr/bin/env node
/**
 * Stamp the real pixel dimensions of every public image into a committed manifest.
 *
 * ContentPage used to declare `width={1200} height={800}` for every image block, which
 * is wrong for almost all of them. Two consequences, both visible:
 *
 *   - A 100x87 icon (Managed-Implementation-and-Operations-Services-1.png) was declared
 *     1200 wide and given `w-full`, so it upscaled 7.7x to fill the column.
 *   - With no true aspect ratio, next/image reserves a 3:2 box for a 2560x2367 source,
 *     so the page reflows once the real image lands.
 *
 * Reading dimensions at request time is not an option: sharp is a devDependency held
 * out of the production bundle by serverExternalPackages. So this runs once and its
 * output is committed, the same contract as the rest of the content pipeline.
 *
 * Re-run it after adding or replacing anything in public/images.
 *
 * Usage: node tools/image-dims.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, "..");
const OUT = path.join(ROOT, "lib", "image-dims.json");

// Every directory under public/ that a content image can point at.
const DIRS = ["images", "brand", "logos"];
const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);

/**
 * SVG has no intrinsic pixel size worth trusting - sharp reports the viewBox, which is
 * authoring units, not a rendered size. They are held back to a max width in the
 * renderer instead, so recording a number here would only invite someone to use it.
 */
async function dimensions(file) {
  const { width, height } = await sharp(file).metadata();
  return width && height ? [width, height] : null;
}

const manifest = {};
let skipped = 0;

for (const dir of DIRS) {
  const abs = path.join(ROOT, "public", dir);
  let entries;
  try {
    entries = await fs.readdir(abs);
  } catch {
    continue; // Not every install has every directory.
  }

  for (const name of entries.sort()) {
    if (!RASTER.has(path.extname(name).toLowerCase())) continue;
    const dims = await dimensions(path.join(abs, name));
    if (!dims) {
      skipped += 1;
      console.warn(`  no dimensions: ${dir}/${name}`);
      continue;
    }
    manifest[`/${dir}/${name}`] = dims;
  }
}

await fs.writeFile(OUT, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `${Object.keys(manifest).length} images measured${skipped ? `, ${skipped} skipped` : ""} -> lib/image-dims.json`,
);
