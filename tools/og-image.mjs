/**
 * Composes the site-wide social share card into app/opengraph-image.png.
 *
 * Run once; the output is committed. Re-run only if the lockup or the tokens change.
 *
 *   node tools/og-image.mjs
 *
 * A static PNG rather than next/og's ImageResponse, which would render this at build
 * time from JSX. ImageResponse cannot reach the Montserrat that next/font downloads, so
 * it would set the type in a fallback face and the card would be off-brand in the one
 * place we never see it. The lockup already carries the org name as artwork, so the card
 * needs no type at all, and composing it here keeps the fonts out of the problem.
 *
 * White field rather than slate: the lockup's wordmark is slate ink on transparent and
 * disappears on a dark ground.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOCKUP = path.join(ROOT, "public", "brand", "wos-lockup.png");
const OUT = path.join(ROOT, "app", "opengraph-image.png");

// Facebook, LinkedIn, X and Slack all crop to roughly 1.91:1.
const WIDTH = 1200;
const HEIGHT = 630;
const MARGIN = 90;

// From app/globals.css. Duplicated as literals because sharp cannot read the token file,
// which is the one place in the repo a hex is unavoidable.
const WOS_RED = "#d44530";
const WOS_SLATE = "#2c3441";

const LOCKUP_WIDTH = 780;
// The red rule is Eyebrow's 2px bar scaled to the card: same idea, same proportion.
const RULE_WIDTH = 150;
const RULE_HEIGHT = 8;
const RULE_GAP = 44;
// A slate band along the bottom edge, so the card still reads as ours when a client
// crops the top or renders it against a white chat background.
const BAND_HEIGHT = 16;

async function main() {
  const lockup = await sharp(LOCKUP).resize({ width: LOCKUP_WIDTH }).toBuffer();
  const { height: lockupHeight } = await sharp(lockup).metadata();

  // The rule sits above the lockup and the pair is centred as one block.
  const blockHeight = RULE_HEIGHT + RULE_GAP + lockupHeight;
  const blockTop = Math.round((HEIGHT - BAND_HEIGHT - blockHeight) / 2);

  const rule = Buffer.from(
    `<svg width="${RULE_WIDTH}" height="${RULE_HEIGHT}"><rect width="${RULE_WIDTH}" height="${RULE_HEIGHT}" fill="${WOS_RED}"/></svg>`,
  );
  const band = Buffer.from(
    `<svg width="${WIDTH}" height="${BAND_HEIGHT}"><rect width="${WIDTH}" height="${BAND_HEIGHT}" fill="${WOS_SLATE}"/></svg>`,
  );

  await sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 4, background: "#ffffff" },
  })
    .composite([
      { input: rule, left: MARGIN, top: blockTop },
      { input: lockup, left: MARGIN, top: blockTop + RULE_HEIGHT + RULE_GAP },
      { input: band, left: 0, top: HEIGHT - BAND_HEIGHT },
    ])
    .png()
    .toFile(OUT);

  console.log(`wrote ${path.relative(ROOT, OUT)} (${WIDTH}x${HEIGHT})`);
  if (!fs.existsSync(OUT)) throw new Error("output missing");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
