"use client";

import { useEffect, useMemo, useRef } from "react";
import { geoCentroid, geoDistance, geoGraticule10, geoInterpolate, geoOrthographic, geoPath, type GeoPermissibleObjects } from "d3-geo";
import type { Feature, MultiPolygon } from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-110m.json";

/*
 * The impact globe: the homepage's four countries. DESIGN.md §10, globe arrival and
 * globe pulse.
 *
 * Plain SVG from d3-geo's orthographic projection, redrawn by writing attributes on
 * refs inside one requestAnimationFrame loop, so React renders the markup once and
 * never reconciles mid-animation. The first render is the finished globe (Atlantic
 * view, four countries filled, four pins down), which is what the server sends, what a
 * reduced-motion visitor keeps, and what a globe already on screen at load keeps.
 *
 * On scroll-in it eases a third of a turn into the Atlantic while each country fills,
 * its pin drops and lands with a ripple, and its label slides out, west to east. Then
 * the globe stands still and only the ripples go on, passed from pin to pin, see `idle`.
 * It used to sway as well, and beside the drifting faces above it the page never sat still.
 */

type LonLat = [number, number];

const topo = world as unknown as Topology<{
  countries: GeometryCollection<{ name: string }>;
  land: GeometryCollection;
}>;
const LAND = feature(topo, topo.objects.land);
const COUNTRIES = feature(topo, topo.objects.countries).features;
const GRATICULE = geoGraticule10();

/**
 * Where each country named in content/home-sections.ts lives on the map. Keyed by the
 * name exactly as the content spells it, so a renamed country fails loudly rather than
 * dropping its pin. `pin` is the stem height and `side` where the label prefers to hang,
 * chosen so France and the Netherlands, a few degrees apart, never collide.
 *
 * `within` keeps only the parts of a country within that many degrees of its pin. France's
 * shape includes French Guiana, which lit up a patch of South America and read as a fifth
 * country; WOS's France is the European one.
 */
const PLACES: Record<string, { id: string; at: LonLat; pin: number; side: "left" | "right"; within?: number }> = {
  "U.S": { id: "840", at: [-98, 39.5], pin: 44, side: "left" },
  "Costa Rica": { id: "188", at: [-84.1, 9.9], pin: 30, side: "left" },
  France: { id: "250", at: [2.4, 46.6], pin: 24, side: "left", within: 20 },
  "The Netherlands": { id: "528", at: [5.4, 52.2], pin: 60, side: "right" },
};

const SIZE = 600;
const CX = SIZE / 2;
const CY = 322;
const R = 262;
/** The resting view: the Atlantic, with all four countries on the near side. */
const ATLANTIC: LonLat = [-45, 27];
const FROM: LonLat = [-150, 12];
const TURN_MS = 2600;
/** The gap between one pin's ripple and the next, once the pins have landed. */
const PULSE_GAP = 1700;

/** Keep only the polygons of `shape` whose centre lies within `deg` of `at`. */
function trimmed(shape: Feature, at: LonLat, deg?: number): Feature {
  if (!deg || shape.geometry.type !== "MultiPolygon") return shape;
  const near = shape.geometry.coordinates.filter(
    (coordinates) => geoDistance(geoCentroid({ type: "Polygon", coordinates }), at) < (deg * Math.PI) / 180,
  );
  const geometry: MultiPolygon = { type: "MultiPolygon", coordinates: near };
  return { ...shape, geometry };
}

type Place = { name: string; shape: Feature; at: LonLat; pin: number; side: "left" | "right" };

/** Per place, each from 0 to 1. `ring` is the landing ripple; 0 and 1 both draw nothing. */
type Frame = { center: LonLat; fill: number[]; drop: number[]; ring: number[]; label: number[] };

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const inOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const outCubic = (x: number) => 1 - Math.pow(1 - x, 3);
/** Out-back with a small overshoot: the pin dips past its point and settles, a landing. */
const land = (x: number) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2);

function settled(n: number): Frame {
  const one = Array(n).fill(1);
  return { center: ATLANTIC, fill: one, drop: one, ring: one, label: one };
}

/**
 * After the arrival, for as long as the globe is on screen: the globe holds the Atlantic
 * and a ripple is handed from pin to pin, west to east. Nothing else moves.
 */
function idle(t: number, rank: number[]): Frame {
  const cycle = PULSE_GAP * rank.length;
  return {
    center: ATLANTIC,
    fill: rank.map(() => 1),
    drop: rank.map(() => 1),
    label: rank.map(() => 1),
    ring: rank.map((r) => {
      const since = t - 1200 - r * PULSE_GAP;
      if (since < 0) return 1;
      const p = (since % cycle) / 1400;
      return p < 1 ? p : 1;
    }),
  };
}

/** The whole arrival as a function of time: the turn, and each place's fill, drop, ripple and label. */
function timeline(places: Place[]) {
  const order = places.map((_, i) => i).sort((a, b) => places[a].at[0] - places[b].at[0]);
  const at = places.map((_, i) => 1500 + order.indexOf(i) * 260);
  const turn = geoInterpolate(FROM, ATLANTIC);
  return {
    duration: Math.max(...at) + 1500,
    frame: (t: number): Frame => ({
      center: turn(inOut(clamp(t / TURN_MS))) as LonLat,
      fill: at.map((a) => clamp((t - a) / 450)),
      drop: at.map((a) => clamp((t - a - 120) / 520)),
      ring: at.map((a) => clamp((t - a - 520) / 760)),
      label: at.map((a) => clamp((t - a - 560) / 320)),
    }),
  };
}

function useGeometry(places: Place[]) {
  return useMemo(() => {
    const projection = geoOrthographic().scale(R).translate([CX, CY]).clipAngle(90).precision(0.4);
    const path = geoPath(projection).digits(1);
    return (frame: Frame) => {
      projection.rotate([-frame.center[0], -frame.center[1]]);
      const d = (o: GeoPermissibleObjects) => path(o) ?? "";
      return {
        graticule: d(GRATICULE),
        land: d(LAND),
        countries: places.map((p) => d(p.shape)),
        pins: places.map((p) => {
          const xy = projection(p.at) ?? [CX, CY];
          // Fade a pin out as its country turns to the far side, before the limb.
          const facing = clamp((Math.cos(geoDistance(p.at, frame.center)) - 0.08) / 0.18);
          return { x: xy[0], y: xy[1], facing };
        }),
      };
    };
  }, [places]);
}

type Drawn = ReturnType<ReturnType<typeof useGeometry>>;

const RING_MAX = 30;
const DROP_FROM = 96;

function pinStyle(frame: Frame, drawn: Drawn, i: number) {
  const pin = drawn.pins[i];
  const drop = frame.drop[i];
  const ring = frame.ring[i];
  return {
    opacity: drop > 0 ? pin.facing * Math.min(1, drop * 4) : 0,
    transform: `translate(${pin.x.toFixed(1)} ${pin.y.toFixed(1)})`,
    stem: `translate(0 ${(-(1 - land(drop)) * DROP_FROM).toFixed(1)})`,
    ringR: (4 + RING_MAX * outCubic(ring)).toFixed(1),
    ringOpacity: ring > 0 && ring < 1 ? (1 - ring) * pin.facing : 0,
  };
}

/**
 * A label hangs on its preferred side, out over the open column if need be, unless that
 * would run it off the screen. `box` is the globe's rendered box and `width` the
 * label's own, both unknown on the server, where the preferred side always holds.
 */
function labelStyle(frame: Frame, drawn: Drawn, place: Place, i: number, box?: DOMRect, width = 0) {
  const pin = drawn.pins[i];
  const slide = (1 - outCubic(frame.label[i])) * 10;
  let side = place.side;
  if (box && width) {
    const at = box.left + (pin.x / SIZE) * box.width;
    const edge = document.documentElement.clientWidth - 16;
    if (side === "right" && at + 10 + width > edge) side = "left";
    else if (side === "left" && at - 10 - width < 16) side = "right";
  }
  const x = side === "right" ? `calc(10px + ${slide}px)` : `calc(-100% - 10px - ${slide}px)`;
  return {
    left: `${(pin.x / SIZE) * 100}%`,
    top: `${((pin.y - place.pin - 6) / SIZE) * 100}%`,
    opacity: frame.label[i] * pin.facing,
    transform: `translate(${x}, -50%)`,
  };
}

/**
 * The globe. `countries` are the names from the content; each also lights its own entry
 * in any list in the same chapter marked `data-globe-country`, as its pin lands.
 */
export default function Globe({ countries }: { countries: string[] }) {
  const places = useMemo<Place[]>(
    () =>
      countries.map((name) => {
        const place = PLACES[name];
        if (!place) throw new Error(`Globe has no map position for the country "${name}"`);
        const shape = COUNTRIES.find((c) => String(c.id) === place.id);
        if (!shape) throw new Error(`world-atlas has no country ${place.id} for "${name}"`);
        return { name, shape: trimmed(shape, place.at, place.within), at: place.at, pin: place.pin, side: place.side };
      }),
    [countries],
  );
  const geometry = useGeometry(places);

  const wrap = useRef<HTMLDivElement>(null);
  const graticule = useRef<SVGPathElement>(null);
  const landPath = useRef<SVGPathElement>(null);
  const countryPaths = useRef<(SVGPathElement | null)[]>([]);
  const pins = useRef<(SVGGElement | null)[]>([]);
  const stems = useRef<(SVGGElement | null)[]>([]);
  const rings = useRef<(SVGCircleElement | null)[]>([]);
  const labels = useRef<(HTMLSpanElement | null)[]>([]);

  const finished = useMemo(() => settled(places.length), [places]);
  const first = useMemo(() => geometry(finished), [geometry, finished]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const chapter = el.closest("section");
    const entries = places.map((p) => chapter?.querySelector<HTMLElement>(`[data-globe-country="${p.name}"]`) ?? null);

    let current = finished;
    const render = (frame: Frame) => {
      const drawn = geometry(frame);
      const box = el.getBoundingClientRect();
      graticule.current?.setAttribute("d", drawn.graticule);
      landPath.current?.setAttribute("d", drawn.land);
      places.forEach((place, i) => {
        const country = countryPaths.current[i];
        if (country) {
          country.setAttribute("d", drawn.countries[i]);
          country.setAttribute("fill-opacity", String(frame.fill[i]));
        }
        const s = pinStyle(frame, drawn, i);
        pins.current[i]?.setAttribute("transform", s.transform);
        pins.current[i]?.setAttribute("opacity", String(s.opacity));
        stems.current[i]?.setAttribute("transform", s.stem);
        rings.current[i]?.setAttribute("r", s.ringR);
        rings.current[i]?.setAttribute("opacity", String(s.ringOpacity));
        const label = labels.current[i];
        if (label) Object.assign(label.style, labelStyle(frame, drawn, place, i, box, label.offsetWidth));
        entries[i]?.toggleAttribute("data-lit", frame.ring[i] > 0);
      });
      current = frame;
    };
    // Labels pick their side from the rendered width, so a resize re-lays the frame.
    const relayout = () => render(current);
    window.addEventListener("resize", relayout);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      render(finished);
      return () => window.removeEventListener("resize", relayout);
    }

    // One loop with three phases. `wait`: armed below the fold, drawn at the arrival's
    // first frame. `arrive`: the turn, fills and pins. `idle`: the ripples. A globe
    // already on screen at load skips straight to idle, so nothing blinks.
    const armed = el.getBoundingClientRect().top > window.innerHeight * 0.85;
    const plan = timeline(places);
    const order = places.map((_, i) => i).sort((a, b) => places[a].at[0] - places[b].at[0]);
    const rank = places.map((_, i) => order.indexOf(i));
    let phase: "wait" | "arrive" | "idle" = armed ? "wait" : "idle";
    let clock = 0;
    let last = 0;
    let raf = 0;
    let visible = false;
    render(armed ? plan.frame(0) : finished);

    const tick = (now: number) => {
      clock += last ? Math.min(now - last, 64) : 0;
      last = now;
      if (phase === "arrive") {
        render(plan.frame(Math.min(clock, plan.duration)));
        if (clock >= plan.duration) {
          phase = "idle";
          clock = 0;
        }
      } else if (phase === "idle") {
        render(idle(clock, rank));
      }
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    // It only ever moves while on screen; off screen the loop stops where it is.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (phase === "wait" && visible && entry.intersectionRatio >= 0.45) {
          phase = "arrive";
          clock = 0;
        }
        if (visible && phase !== "wait" && !raf) {
          last = 0;
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: [0, 0.45] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", relayout);
    };
  }, [geometry, places, finished]);

  return (
    <div ref={wrap} aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[27rem] select-none">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="block h-full w-full overflow-visible">
        <circle cx={CX} cy={CY} r={R} className="fill-white stroke-hairline-strong" strokeWidth={1.5} />
        <path ref={graticule} d={first.graticule} className="fill-none stroke-hairline" strokeWidth={1} />
        <path ref={landPath} d={first.land} className="fill-hairline-strong" />
        {places.map((place, i) => (
          <path
            key={place.name}
            ref={(node) => {
              countryPaths.current[i] = node;
            }}
            d={first.countries[i]}
            fillOpacity={1}
            className="fill-wos-red stroke-white"
            strokeWidth={0.8}
          />
        ))}
        {places.map((place, i) => {
          const s = pinStyle(finished, first, i);
          return (
            <g
              key={place.name}
              ref={(node) => {
                pins.current[i] = node;
              }}
              transform={s.transform}
              opacity={s.opacity}
            >
              <circle
                ref={(node) => {
                  rings.current[i] = node;
                }}
                r={s.ringR}
                opacity={s.ringOpacity}
                className="fill-none stroke-wos-red"
                strokeWidth={2}
              />
              <g
                ref={(node) => {
                  stems.current[i] = node;
                }}
                transform={s.stem}
              >
                <rect x={-2.5} y={-2.5} width={5} height={5} className="fill-wos-slate" />
                <rect x={-1.25} y={-place.pin} width={2.5} height={place.pin} className="fill-wos-slate" />
                <rect x={-6.5} y={-place.pin - 13} width={13} height={13} className="fill-wos-slate" />
              </g>
            </g>
          );
        })}
      </svg>
      {places.map((place, i) => (
        <span
          key={place.name}
          ref={(node) => {
            labels.current[i] = node;
          }}
          style={labelStyle(finished, first, place, i)}
          className="pointer-events-none absolute whitespace-nowrap bg-action-deeper px-2.5 py-1 font-heading text-small font-semibold text-white"
        >
          {place.name}
        </span>
      ))}
    </div>
  );
}
