const edge = "stroke-white";
const line = "stroke-white/35";
const faint = "stroke-white/15";

// The building is drawn as two paths, not as a stack of shapes. Translucent strokes that
// overlap compound into brighter seams, and separate shapes meet with ragged ends; a single
// path paints its stroke once, so every join is clean and every overlap is invisible.

/** Roof, cornice and entablature as one closed silhouette plus its internal divisions. */
const ROOF_EDGES = [
  "M 56 128 L 300 36 L 544 128 V 138 H 534 V 160 H 530 V 174 H 70 V 160 H 66 V 138 H 56 Z",
  "M 56 128 H 544",
  "M 66 138 H 534",
  "M 70 160 H 530",
].join(" ");

function roofDetail() {
  const d = [
    // Inner raking moulding and the recessed tympanum.
    "M 80 122 L 300 48 L 520 122",
    "M 104 120 L 300 62 L 496 120 Z",
    // The architrave's two fasciae.
    "M 70 167 H 530",
  ];
  for (let x = 92; x <= 508; x += 52) {
    for (const dx of [-5, 0, 5]) d.push(`M ${x + dx} 142 V 156`);
  }
  return d.join(" ");
}

/** Three-step stylobate: one stepped silhouette and the two tread lines inside it. */
const STEP_EDGES = [
  "M 80 372 H 520 V 384 H 532 V 396 H 544 V 408 H 56 V 396 H 68 V 384 H 80 Z",
  "M 68 384 H 532",
  "M 56 396 H 544",
].join(" ");

/** A Doric column as one silhouette: plinth, torus, tapering shaft, echinus, abacus. */
function columnEdges(x: number) {
  return [
    `M ${x - 21} 372 V 364 H ${x - 18} V 358 H ${x - 15} L ${x - 13} 190 H ${x - 14} L ${x - 20} 180 H ${x - 22} V 174`,
    `H ${x + 22} V 180 H ${x + 20} L ${x + 14} 190 H ${x + 13} L ${x + 15} 358 H ${x + 18} V 364 H ${x + 21} V 372 Z`,
    `M ${x - 20} 180 H ${x + 20}`,
    `M ${x - 14} 190 H ${x + 14}`,
    `M ${x - 15} 358 H ${x + 15}`,
    `M ${x - 18} 364 H ${x + 18}`,
  ].join(" ");
}

function columnDetail(x: number) {
  return [-7, 0, 7].map((d) => `M ${x + d} 196 L ${x + d * 1.12} 352`).join(" ");
}

function Building({ columns = [] }: { columns?: number[] }) {
  return (
    <g fill="none" strokeLinejoin="miter" strokeLinecap="square">
      <path d={[roofDetail(), ...columns.map(columnDetail)].join(" ")} className={faint} strokeWidth={1.5} />
      {/* Solid and heavier than the detail: a translucent hairline outline read as a
          faint tracing rather than a drawn building. */}
      <path
        d={[ROOF_EDGES, STEP_EDGES, ...columns.map(columnEdges)].join(" ")}
        className={edge}
        strokeWidth={2.5}
      />
    </g>
  );
}

/**
 * The /ai-institute hero graphic: a classical temple with an AI chip standing in the bay
 * between its columns, every pin traced into the building. The institute and the AI in
 * one drawing.
 *
 * Static on purpose. It sits beside the h1, and the page's identity does not arrive
 * (DESIGN.md section 10). Decorative, so it is hidden from assistive technology.
 */
export default function ChipTemple() {
  // A 140px quad flat package centred in the bay, seven pins a side on an 18px pitch.
  const [x0, y0, size, pitch] = [230, 200, 140, 18];
  const pins = Array.from({ length: 7 }, (_, i) => i * pitch - 3 * pitch);
  const c = { x: x0 + size / 2, y: y0 + size / 2 };
  const grid = [];
  for (let g = 12; g < 84; g += 12) grid.push(g);
  return (
    <svg viewBox="0 0 600 440" shapeRendering="geometricPrecision" className="h-auto w-full" aria-hidden="true">
      <Building columns={[100, 165, 435, 500]} />

      {/* A continuous trace from every pin: out to the inner columns, up to the
          architrave and down to the stylobate, so the chip is wired into the building. */}
      <path
        d={pins
          .map((d) => {
            const y = c.y + d;
            // The inner shafts taper, so each side trace stops on the shaft's edge at its
            // own height rather than overrunning it.
            const reach = 13 + (2 * (y - 190)) / 168 + 0.75;
            return [
              `M ${165 + reach} ${y} H ${x0 - 12}`,
              `M ${x0 + size + 12} ${y} H ${435 - reach}`,
              `M ${c.x + d} 174.75 V ${y0 - 12}`,
              `M ${c.x + d} ${y0 + size + 12} V 371.25`,
            ].join(" ");
          })
          .join(" ")}
        fill="none"
        className={line}
        strokeWidth={1.5}
      />

      {/* Gull-wing pins on all four sides. */}
      <g className="fill-white/70">
        {pins.map((d) => (
          <g key={d}>
            <rect x={x0 - 12} y={c.y + d - 2.5} width={12} height={5} />
            <rect x={x0 + size} y={c.y + d - 2.5} width={12} height={5} />
            <rect x={c.x + d - 2.5} y={y0 - 12} width={5} height={12} />
            <rect x={c.x + d - 2.5} y={y0 + size} width={5} height={12} />
          </g>
        ))}
      </g>

      {/* Package with a chamfered pin-1 corner, then the die with its circuit grid. */}
      <path
        d={`M ${x0 + 14} ${y0} H ${x0 + size} V ${y0 + size} H ${x0} V ${y0 + 14} Z`}
        className="fill-surface-dark stroke-white"
        strokeWidth={2.5}
      />
      <rect x={c.x - 42} y={c.y - 42} width={84} height={84} className="fill-surface-dark stroke-white/45" />
      {grid.map((g) => (
        <g key={g} className="stroke-white/10">
          <line x1={c.x - 42 + g} y1={c.y - 42} x2={c.x - 42 + g} y2={c.y + 42} />
          <line x1={c.x - 42} y1={c.y - 42 + g} x2={c.x + 42} y2={c.y - 42 + g} />
        </g>
      ))}
      <text
        x={c.x}
        y={c.y + 14}
        textAnchor="middle"
        className="fill-white font-heading text-[40px] font-semibold tracking-[0.04em]"
      >
        AI
      </text>
      <circle cx={x0 + 16} cy={y0 + 16} r={3.5} className="fill-action" />
    </svg>
  );
}
