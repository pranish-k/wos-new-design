"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MotifRing } from "@/components/Motif";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type JourneyStep = { step: string; body: string };

/**
 * The WOS approach, tied to the scroll as the visitor passes it.
 *
 * The server renders the finished state: the whole ring drawn and all four stages
 * readable as a list. On a wide screen with motion allowed, the ring fills and the stage
 * at the middle of the screen is lit while the visitor scrolls past. The page never
 * stops: this used to pin for 1.8 screens of scrolling, and a page that stops moving
 * halfway down reads as stuck rather than as a journey. Narrow screens and reduced motion
 * keep the plain list, which is the same content with nothing hidden.
 */
export default function JourneyScene({ steps }: { steps: JourneyStep[] }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const caption = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
        const el = root.current!;
        const items = gsap.utils.toArray<HTMLElement>("[data-step]", el);
        const ring = el.querySelector<SVGPathElement>("[data-ring-progress]");
        const n = items.length;
        const setStage = (k: number) => {
          if (counter.current) counter.current.textContent = String(k);
        };

        gsap.set(items.slice(1), { opacity: 0.22 });
        if (ring) gsap.set(ring, { strokeDashoffset: 1 - 1 / n });
        setStage(1);
        if (caption.current) caption.current.textContent = `stage of ${n}`;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            // The stages, not the section: the first is lit as it reaches the middle
            // of the screen and the last as it leaves it.
            trigger: el.querySelector("ol"),
            start: "top 60%",
            end: "bottom 45%",
            scrub: 0.5,
            onUpdate: (self) => setStage(Math.min(n, Math.floor(self.progress * n) + 1)),
          },
        });

        if (ring) tl.to(ring, { strokeDashoffset: 0, duration: n - 1 }, 0);
        items.forEach((item, i) => {
          if (i === 0) return;
          tl.to(items[i - 1], { opacity: 0.22, duration: 0.3 }, i - 0.3);
          tl.to(item, { opacity: 1, duration: 0.3 }, i - 0.3);
        });
        // Hand back a finished list as the stages scroll on.
        tl.to(items, { opacity: 1, duration: 0.3 }, n - 0.6);

        // matchMedia reverts the tweens but not text, so restore the static caption when
        // the window narrows out of the scroll-linked layout.
        return () => {
          setStage(n);
          if (caption.current) caption.current.textContent = "stages";
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-14 px-5 md:px-8 min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[900px]:gap-20">
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <MotifRing className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span
              ref={counter}
              className="font-heading text-numeral font-semibold text-[var(--field-accent)]"
            >
              {steps.length}
            </span>
            <span ref={caption} className="mt-2 font-heading text-small font-medium text-[var(--field-muted)]">
              stages
            </span>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-h2 font-semibold">
            Our approach
          </h2>
          <p className="mt-5 max-w-[46ch] text-body text-[var(--field-muted)]">
            One path, four stages, from the first conversation to a professional who stays.
          </p>
          <ol className="m-0 mt-10 grid list-none gap-7 p-0">
            {steps.map((s, i) => (
              <li key={s.step} data-step className="grid grid-cols-[3.2rem_1fr] gap-4">
                <span className="font-heading text-h3 font-semibold leading-none text-[var(--field-accent)]">{i + 1}</span>
                <div>
                  <h3 className="font-heading text-h4 font-semibold">{s.step}</h3>
                  <p className="mt-2 max-w-[52ch] text-body text-[var(--field-muted)]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
