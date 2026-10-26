import { useId } from "react";

/**
 * The motif: the O from the WOS mark, two arrows chasing each other round a ring.
 *
 * The one shape on /alternate-home, chosen because it is the brand's own picture of
 * what WOS does: talent goes round, and comes back converted. Drawn after the mark:
 *
 * - the arrows run anticlockwise: the left one down to a head at the bottom pointing
 *   right, the right one up to a head at the top pointing left;
 * - they are heavy, so the ring reads as a letter, and they do not touch: the same
 *   small gap separates each tip from the next tail;
 * - the left arrow carries four stars, the flag reference in the mark, cut out so that
 *   whatever is behind the ring shows through them.
 *
 * Each arrow is one filled outline (band, straight-cut tail and arrowhead together), not
 * a stroked line with a triangle stuck on the end: that is what keeps the head's back
 * flush with the band and the gaps even. The draw-on is a stroke inside a mask running
 * along each arrow's centre line, so the whole arrow, head included, draws in one
 * motion (see .alt-motif-stroke in alternate-home.css).
 */

const C = 120;
const R = 76; // centre line of the band
const W = 46; // band width: heavy, so the hole is about half the ring, as in the mark
const RI = R - W / 2;
const RO = R + W / 2;
const BARB = 13; // how far each barb reaches past the band, in and out
const HEAD = 32; // degrees from the head's back to its tip
const GAP = 7; // degrees between one tip and the next tail

/*
 * Angles run clockwise from three o'clock, as SVG's do, and each arrow runs
 * anticlockwise from its tail to its tip, so its angles decrease. The tips sit just past
 * six and twelve o'clock, so each head points straight across the ring.
 */
const TIP_A = 84;
const TIP_B = TIP_A - 180;
const TAIL_A = TIP_B - GAP + 360;
const TAIL_B = TIP_A - GAP;
const STARS = [234, 204, 174, 144];

function point(deg: number, r: number) {
  const t = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(t), y: C + r * Math.sin(t) };
}

const f = (n: number) => n.toFixed(2);
const at = (deg: number, r: number) => {
  const p = point(deg, r);
  return `${f(p.x)} ${f(p.y)}`;
};

/**
 * One arrow as a single closed outline: along the outer edge from the tail to the
 * head's back, straight out to the outer barb, in to the tip on the centre line, out to
 * the inner barb, and home along the inner edge to the tail. The barbs sit square on
 * the head's back: swept back, they thinned into needles at the sizes this is used.
 */
function arrow(tail: number, tip: number) {
  const back = tip + HEAD;
  return [
    `M ${at(tail, RO)}`,
    `A ${RO} ${RO} 0 0 0 ${at(back, RO)}`,
    `L ${at(back, RO + BARB)}`,
    `L ${at(tip, R)}`,
    `L ${at(back, RI - BARB)}`,
    `L ${at(back, RI)}`,
    `A ${RI} ${RI} 0 0 1 ${at(tail, RI)}`,
    "Z",
  ].join(" ");
}

/** The centre line an arrow is drawn along, tail to tip. */
function spine(tail: number, tip: number) {
  return `M ${at(tail, R)} A ${R} ${R} 0 0 0 ${at(tip, R)}`;
}

/** A five-pointed star centred on the band at `deg`, standing upright. */
function star(deg: number, size: number) {
  const c = point(deg, R);
  const pts = Array.from({ length: 10 }, (_, k) => {
    const r = k % 2 === 0 ? size : size * 0.42;
    const a = (-90 + k * 36) * (Math.PI / 180);
    return `${f(c.x + r * Math.cos(a))} ${f(c.y + r * Math.sin(a))}`;
  });
  return `M ${pts.join(" L ")} Z`;
}

/** Wide enough that the reveal stroke covers both barbs. */
const REVEAL_WIDTH = 2 * (W / 2 + BARB) + 6;

export default function Motif({
  className = "",
  firstFill = "fill-wos-slate",
  secondFill = "fill-wos-red",
  draw = true,
}: {
  className?: string;
  /** Fill class for the left arrow, the one that carries the stars. */
  firstFill?: string;
  secondFill?: string;
  /** Draw on load. Off when an InView ancestor reveals it on scroll instead. */
  draw?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const arrows = [
    { tail: TAIL_A, tip: TIP_A, fill: firstFill, stars: true },
    { tail: TAIL_B, tip: TIP_B, fill: secondFill, stars: false },
  ];

  return (
    <svg
      viewBox="0 0 240 240"
      aria-hidden="true"
      focusable="false"
      className={`${draw ? "alt-motif-draw" : ""} ${className}`.trim()}
    >
      <defs>
        {arrows.map((a, n) => (
          <mask key={n} id={`${id}-m${n}`} maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="240">
            <path
              d={spine(a.tail, a.tip)}
              pathLength={1}
              fill="none"
              stroke="white"
              strokeWidth={REVEAL_WIDTH}
              className="alt-motif-stroke"
              style={{ ["--i" as string]: n }}
            />
            {a.stars && STARS.map((deg) => <path key={deg} d={star(deg, 14)} fill="black" />)}
          </mask>
        ))}
      </defs>
      {arrows.map((a, n) => (
        <path key={n} d={arrow(a.tail, a.tip)} mask={`url(#${id}-m${n})`} className={a.fill} />
      ))}
    </svg>
  );
}

/** The ring as a progress track, for the journey scene. Starts at twelve, runs clockwise. */
export function MotifRing({ className = "" }: { className?: string }) {
  const d = `M ${C} ${C - R} A ${R} ${R} 0 1 1 ${C - 0.01} ${C - R}`;
  return (
    <svg viewBox="0 0 240 240" aria-hidden="true" focusable="false" className={className}>
      <path d={d} fill="none" strokeWidth={14} className="stroke-white/15" />
      <path
        d={d}
        pathLength={1}
        fill="none"
        strokeWidth={14}
        strokeDasharray={1}
        strokeDashoffset={0}
        data-ring-progress
        className="stroke-wos-red"
      />
    </svg>
  );
}
