#!/usr/bin/env node
/**
 * Trims every named partner logo to its mark, for the homepage partner marquee.
 *
 * The source files come from the live site as uploaded, and a third of them carry the
 * mark in a sea of empty canvas: American Airlines is a 1080 square with the logo in the
 * middle 14%, Forrester fills 9% of its frame. Laid in a row at one height, those read
 * as tiny next to logos that fill their file, which says something about the partners
 * that is not true. CSS cannot crop to content, so this does it once, at ingest.
 *
 * Writes public/images/logos/<name>.webp and lib/partner-logos.json, which maps each
 * original src to the trimmed file and its size. The marquee sizes every logo to the
 * same area from that size, so a wide wordmark and a square badge carry equal weight.
 * The output is committed, as tools/image-dims.mjs's is: sharp stays out of the
 * production bundle.
 *
 * Unnamed logos are skipped: the marquee leaves them out (see content/partners.ts).
 *
 * Re-run it after adding or replacing a partner logo.
 *
 * Usage: node tools/partner-logos.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { PARTNERS } from "../content/partners.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images", "logos");
const MANIFEST = path.join(ROOT, "lib", "partner-logos.json");

/** Wide enough for a retina tile at the marquee's largest logo, and no wider. */
const MAX_WIDTH = 480;

await fs.mkdir(OUT_DIR, { recursive: true });

const manifest = {};
for (const p of PARTNERS.filter((p) => p.name)) {
  const input = path.join(ROOT, "public", p.src);
  const name = `${path.parse(p.src).name}.webp`;
  // Flattened onto white first, so a transparent canvas and a white one trim alike;
  // the marquee shows every logo on a white tile anyway.
  const flat = await sharp(input).flatten({ background: "#ffffff" }).toBuffer();
  const { data, info } = await sharp(flat)
    .trim({ background: "#ffffff", threshold: 20 })
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toBuffer({ resolveWithObject: true });
  await fs.writeFile(path.join(OUT_DIR, name), data);
  manifest[p.src] = { src: `/images/logos/${name}`, width: info.width, height: info.height };
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`${Object.keys(manifest).length} logos trimmed -> public/images/logos, lib/partner-logos.json`);
