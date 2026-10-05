"use client";
import { useEffect, useRef, useState } from "react";

/**
 * The Fantasy Arc, drawn once when it scrolls into view.
 *
 * DESIGN.md section 10 gestures 6 and 7. It follows the same SSR rule as FadeIn: the
 * finished diagram is what the server renders, and it is only rewound after mount, only
 * when it sits below the fold, and never under reduced motion. With JavaScript off the
 * arc is simply there.
 *
 * Positions are computed from the curve rather than hand-placed, so moving a control
 * point moves the nodes and their labels with it.
 */

export type ArcStep = { tag: string; name?: string; detail?: string };

const W = 1000;
const H = 320;
const BASE = 300;
// Six equal columns, so the HTML label grid under the drawing lines up with the nodes
// without either side knowing the other's pixel width.
const COL = W / 6;
const P0 = [COL / 2, BASE];
const P3 = [W - COL / 2, 40];
// Rises slowly, then steeply: most people stall in the lower stages, and the shape says
// that before any label does.
const P1 = [460, BASE];
const P2 = [640, 50];
const PATH = `M ${P0} C ${P1} ${P2} ${P3}`;

function bezier(t: number, i: 0 | 1) {
  const u = 1 - t;
  return u * u * u * P0[i] + 3 * u * u * t * P1[i] + 3 * u * t * t * P2[i] + t * t * t * P3[i];
}

/** The point on the curve at a given x. x(t) is monotonic here, so bisection is exact enough. */
function atX(x: number) {
  let lo = 0;
  let hi = 1;
  for (let k = 0; k < 30; k++) {
    const mid = (lo + hi) / 2;
    if (bezier(mid, 0) < x) lo = mid;
    else hi = mid;
  }
  return { x, y: bezier(lo, 1), t: lo };
}

const DRAW_MS = 1100;

/** Length along the curve from its start to parameter t, by sampling. */
function lengthTo(t: number, steps = 200) {
  let len = 0;
  let prev = { x: P0[0], y: P0[1] };
  for (let k = 1; k <= steps; k++) {
    const u = (k / steps) * t;
    const pt = { x: bezier(u, 0), y: bezier(u, 1) };
    len += Math.hypot(pt.x - prev.x, pt.y - prev.y);
    prev = pt;
  }
  return len;
}

/**
 * The moment the stroke reaches a given fraction of its length.
 *
 * --ease-fade is cubic-bezier(0.16, 1, 0.3, 1), which covers most of the distance in the
 * first third of the time. A plain stagger let the line run three nodes ahead of the
 * dots, so each node instead waits for exactly the time the easing takes to get there.
 */
function timeToReach(progress: number) {
  const [x1, y1, x2, y2] = [0.16, 1, 0.3, 1];
  const axis = (s: number, a: number, b: number) =>
    3 * (1 - s) * (1 - s) * s * a + 3 * (1 - s) * s * s * b + s * s * s;
  let lo = 0;
  let hi = 1;
  for (let k = 0; k < 30; k++) {
    const mid = (lo + hi) / 2;
    if (axis(mid, y1, y2) < progress) lo = mid;
    else hi = mid;
  }
  return axis(lo, x1, x2);
}

export default function ArcDraw({ steps }: { steps: ArcStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  // "shown" is the server state and the reduced-motion state. "rewound" exists only in a
  // browser that will animate, and "drawing" is the single trip back to "shown".
  const [phase, setPhase] = useState<"shown" | "rewound" | "drawing">("shown");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight - 40) return;

    setPhase("rewound");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("drawing");
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden = phase === "rewound";
  const points = Array.from({ length: steps.length }, (_, i) => atX(COL / 2 + i * COL));
  const total = lengthTo(1);
  const fade = (i: number) => ({
    opacity: hidden ? 0 : 1,
    transition:
      phase === "drawing"
        ? `opacity 250ms ease-out ${Math.round(DRAW_MS * timeToReach(lengthTo(points[i].t) / total))}ms`
        : "none",
  });
  const last = points.length - 1;

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-hidden="true">
        <line x1={0} y1={BASE} x2={W} y2={BASE} className="stroke-white/20" strokeWidth={1} />
        {points.map((p, i) =>
          i === 0 ? null : (
            <line
              key={i}
              x1={p.x}
              y1={p.y}
              x2={p.x}
              y2={BASE}
              className="stroke-white/20"
              strokeWidth={1}
              strokeDasharray="3 5"
              style={fade(i)}
            />
          ),
        )}
        <path
          d={PATH}
          pathLength={1}
          fill="none"
          className="stroke-white/80"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={1}
          style={{
            strokeDashoffset: hidden ? 1 : 0,
            transition:
              phase === "drawing" ? `stroke-dashoffset ${DRAW_MS}ms var(--ease-fade)` : "none",
          }}
        />
        {points.map((p, i) => {
          const top = i === last;
          return (
            <g key={i} style={fade(i)}>
              {top && <circle cx={p.x} cy={p.y} r={22} className="fill-action/25" />}
              <circle
                cx={p.x}
                cy={p.y}
                r={top ? 11 : i === 0 ? 5 : 7}
                className={top ? "fill-action" : "fill-surface-dark stroke-white"}
                strokeWidth={top ? 0 : 2.5}
              />
            </g>
          );
        })}
      </svg>

      {/* Labels are HTML in a grid that shares the drawing's six columns, so they stay real
          text at every width rather than scaling with the viewBox. */}
      {/* Every step gets the same three sizes, so no stage outranks another by type alone.
          A step the source says something about has its tag in full white; the rest are
          muted, so the eye goes to the stages that mean something. */}
      {/* Subgrid rows, so a name that wraps to two lines does not push its detail below
          its neighbours'. */}
      <ol className="m-0 mt-5 grid list-none grid-cols-6 gap-x-3 p-0">
        {steps.map((step, i) => (
          <li key={step.tag} className="row-span-3 grid grid-rows-subgrid text-center" style={fade(i)}>
            <span
              className={`block font-heading text-[11px] font-semibold uppercase tracking-[0.15em] ${
                step.name || step.detail ? "text-white" : "text-white/50"
              }`}
            >
              {step.tag}
            </span>
            {/* Rendered only when present, so a step with a detail but no name (Stage 3)
                lifts its detail up under the tag instead of leaving a gap. */}
            {step.name && (
              <span className="mt-2 block font-heading text-[15px] font-semibold leading-[1.25] text-white">
                {step.name}
              </span>
            )}
            {step.detail && (
              <span className={`${step.name ? "mt-1.5" : "mt-2"} block text-[13px] leading-[1.4] text-white/75`}>
                {step.detail}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
