/**
 * Normalises a headshot into public/images/people/<slug>.webp.
 *
 * What it does NOT do is generate responsive variants. Next/Image already produces those
 * from a single source at build time, and duplicating that here would ship a second set
 * of files nothing reads. What Next/Image does not do, and what this exists for, is fix
 * the things that are wrong at ingest: rotation held only in EXIF, a non-square crop, an
 * odd colour profile, and a 6MB original.
 *
 * Usage:
 *   node tools/people-image.mjs <slug> <input-file>   one photo
 *   node tools/people-image.mjs --all                 re-run over every record
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images", "people");
const PEOPLE_DIR = path.join(ROOT, "content", "people");

export const SIZE = 1200;

/**
 * Writes the normalised file and returns its public path.
 *
 * `attention` rather than a centre crop: these are headshots framed for a landscape
 * card, so the middle of the frame is often the person's chest. Attention finds the
 * face in every one of the current photos.
 */
export async function processPhoto(slug, input) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = path.join(OUT_DIR, `${slug}.webp`);
  await sharp(input)
    .rotate() // applies the EXIF orientation, then drops it
    .resize(SIZE, SIZE, { fit: "cover", position: sharp.strategy.attention, withoutEnlargement: false })
    .webp({ quality: 82 })
    .toFile(out);
  return `/images/people/${slug}.webp`;
}

function records() {
  return fs
    .readdirSync(PEOPLE_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ file: path.join(PEOPLE_DIR, f), rec: JSON.parse(fs.readFileSync(path.join(PEOPLE_DIR, f), "utf8")) }));
}

async function all() {
  let done = 0;
  let skipped = [];
  for (const { file, rec } of records()) {
    if (!rec.photo) continue;
    // Already normalised, so the source is the output. Re-encoding it every run would
    // lose quality a little at a time.
    if (rec.photo === `/images/people/${rec.slug}.webp`) {
      done++;
      continue;
    }
    const src = path.join(ROOT, "public", rec.photo.replace(/^\//, ""));
    if (!fs.existsSync(src)) {
      skipped.push(`${rec.slug}: ${rec.photo} not on disk`);
      continue;
    }
    rec.photo = await processPhoto(rec.slug, src);
    fs.writeFileSync(file, JSON.stringify(rec, null, 2) + "\n");
    done++;
  }
  console.log(`${done} photos normalised`);
  if (skipped.length) {
    console.log("skipped:");
    for (const s of skipped) console.log("  " + s);
    process.exitCode = 1;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [a, b] = process.argv.slice(2);
  if (a === "--all") await all();
  else if (a && b) console.log(await processPhoto(a, b));
  else {
    console.error("usage: people-image.mjs <slug> <input> | --all");
    process.exit(1);
  }
}
