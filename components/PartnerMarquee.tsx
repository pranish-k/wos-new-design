import Image from "next/image";
import { TYPE } from "@/components/Brand";
import Reel from "@/components/Reel";
import { PARTNERS, type Partner } from "@/content/partners";
import TRIMMED from "@/lib/partner-logos.json";

/**
 * Every named corporate partner in one row, four at a time on a laptop and two on a
 * phone, sliding slowly sideways, on the homepage. DESIGN.md §10, partner marquee.
 *
 * Four at a time because a wall of them read as noise: at that width each logo is read
 * as a name rather than scanned as texture. Tiles are a quarter of the row (cqw, against
 * the strip's own width), so exactly four fill it whatever the screen.
 *
 * The logos are the trimmed set from tools/partner-logos.mjs, cropped to the mark, and
 * each is sized to the same area rather than the same height: at one height a wide
 * wordmark towers over a square badge, at one area they carry the same weight. The
 * unnamed logos are left out; a mark nobody can name is not proof of anything.
 *
 * The list is rendered twice and slides by exactly half its length, so the loop has no
 * seam. The second copy is hidden from assistive technology, so a screen reader hears
 * each partner once. Under reduced motion the row stands still, which is also what the
 * server sends.
 */

const AREA = 6400;
const MAX_HEIGHT = 72;
const MAX_WIDTH = 200;

type Logo = { name: string; src: string; width: number; height: number };

function logo(p: Partner): Logo {
  const t = (TRIMMED as Record<string, { src: string; width: number; height: number }>)[p.src];
  if (!t) throw new Error(`No trimmed logo for ${p.src}. Run \`node tools/partner-logos.mjs\`.`);
  const ratio = t.width / t.height;
  let height = Math.min(Math.sqrt(AREA / ratio), MAX_HEIGHT);
  let width = height * ratio;
  if (width > MAX_WIDTH) {
    width = MAX_WIDTH;
    height = width / ratio;
  }
  return { name: p.name, src: t.src, width: Math.round(width), height: Math.round(height) };
}

const LOGOS = PARTNERS.filter((p) => p.name).map(logo);

/** Eight seconds a logo: slow enough that the row reads as names passing, not a scroll. */
const DRIFT = `${LOGOS.length * 8}s`;

export default function PartnerMarquee({ className = "" }: { className?: string }) {
  return (
    <Reel
      label="partner logos"
      className={`relative ${className}`}
      controlClassName="absolute right-0 top-0 border-hairline-strong bg-[var(--field-panel)] text-[var(--field-ink)] hover:border-[var(--field-ink)]"
    >
      <div className="flex min-h-11 items-center pr-16">
        <h3 className={TYPE.label}>Corporate partners</h3>
      </div>
      <div className="reel-fade-x @container mt-6 overflow-hidden">
        <ul className="reel-row m-0 flex w-max list-none p-0" style={{ ["--reel" as string]: DRIFT }}>
          {[...LOGOS, ...LOGOS].map((l, n) => {
            const copy = n >= LOGOS.length;
            return (
              // Padding, not a flex gap: a gap would make the doubled list half a gap
              // longer than two copies, and the loop would jump at the seam.
              <li key={n} aria-hidden={copy || undefined} className="w-[50cqw] pr-2 md:w-[25cqw]">
                <div className="flex h-32 items-center justify-center bg-white px-6">
                  <Image
                    src={l.src}
                    alt={copy ? "" : l.name}
                    width={l.width}
                    height={l.height}
                    style={{ width: l.width, height: "auto", maxWidth: "100%" }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Reel>
  );
}
