import Image from "next/image";
import WosMark from "@/components/WosMark";
import Reel from "@/components/Reel";

/** A frame from the overview film, or the one tile carrying the WOS logo. */
type Tile = { still: number } | { logo: true };

/**
 * Twelve portrait stills cut from the WOS overview film (public/images/film): people at
 * work and in interview, the WOS sign on an office wall among them. The logo tile is the
 * real lockup in full colour on white, as the header shows it; a brand tile in crimson
 * was tried and read as filler next to the faces.
 *
 * Arranged so no column repeats a face and no two columns line up.
 */
const COLUMNS: Tile[][] = [
  [{ still: 1 }, { still: 4 }, { still: 11 }, { still: 7 }, { still: 12 }],
  [{ still: 6 }, { still: 2 }, { still: 10 }, { still: 5 }],
  [{ still: 3 }, { still: 8 }, { still: 9 }, { logo: true }],
];

/** Each column's drift time. Different, so the columns never fall into step. */
const DRIFT = ["70s", "58s", "82s"];

function TileView({ tile }: { tile: Tile }) {
  if ("logo" in tile) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center bg-white px-[12%]">
        <WosMark decorative className="h-auto w-full" />
      </div>
    );
  }
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-surface-dark">
      <Image src={`/images/film/still-${tile.still}.jpg`} alt="" fill sizes="(min-width: 768px) 15vw, 33vw" className="object-cover" />
    </div>
  );
}

/**
 * The homepage opening's picture: three columns of real moments from the WOS film
 * drifting slowly, the middle one against the other two. DESIGN.md §10, reel drift.
 *
 * Decorative, so hidden from assistive technology: the stills carry no information the
 * copy beside them does not. Each column's list is rendered twice and drifts by exactly
 * half its length, so the loop has no seam. Under reduced motion the columns stand still,
 * staggered, which is also what the server sends.
 */
export default function FacesReel({ className = "" }: { className?: string }) {
  return (
    <Reel label="photographs" className={className}>
      {/* Absolute, so the doubled columns never size the row and push the copy down. */}
      <div aria-hidden="true" className="reel-fade absolute inset-0 grid grid-cols-3 gap-2 overflow-hidden px-2 md:px-0">
        {COLUMNS.map((column, c) => (
          <div key={c} className={c === 1 ? "-mt-24" : ""}>
            <div className="reel-col" style={{ ["--reel" as string]: DRIFT[c] }} data-reverse={c === 1 ? "" : undefined}>
              {[...column, ...column].map((tile, n) => (
                // Padding, not a flex gap: a gap would make the doubled list half a gap
                // longer than two copies, and the loop would jump at the seam.
                <div key={n} className="pb-2">
                  <TileView tile={tile} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Reel>
  );
}
