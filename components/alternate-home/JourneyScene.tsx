"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MotifRing } from "@/components/alternate-home/Motif";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type JourneyStep = { step: string; body: string };

/**
 * The WOS approach as /alternate-home's one pinned scene.
 *
 * The server renders the finished state: the whole ring drawn and all four stages
 * readable as a list. Only on a wide screen with motion allowed does the section pin
 * and scrub: the ring fills as the visitor scrolls and the stage under way is lit while
 * the others wait. Narrow screens and reduced motion keep the plain list, which is the
 * same content with nothing hidden.
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
            trigger: el,
            start: "top top",
            end: `+=${n * 45}%`,
            pin: true,
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
        // Hold the last stage, then hand back a finished list as the pin releases.
        tl.to(items, { opacity: 1, duration: 0.3 }, n - 0.6);

        // matchMedia reverts the tweens but not text, so restore the static caption when
        // the window narrows out of the pinned layout.
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
    <div ref={root} className="flex items-center py-20 md:py-24 min-[900px]:min-h-[100svh]">
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-14 px-5 md:px-8 min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[900px]:gap-20">
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <MotifRing className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span
              ref={counter}
              className="font-heading text-[112px] font-semibold leading-[0.9] tracking-[-0.03em] text-wos-red md:text-[144px]"
            >
              {steps.length}
            </span>
            <span ref={caption} className="mt-2 font-heading text-[16px] font-medium text-white/70">
              stages
            </span>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[48px]">
            Our approach
          </h2>
          <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.6] text-[var(--field-muted)]">
            One path, four stages, from the first conversation to a professional who stays.
          </p>
          <ol className="m-0 mt-10 grid list-none gap-7 p-0">
            {steps.map((s, i) => (
              <li key={s.step} data-step className="grid grid-cols-[3.2rem_1fr] gap-4">
                <span className="font-heading text-[26px] font-semibold leading-none text-wos-red">{i + 1}</span>
                <div>
                  <h3 className="font-heading text-[22px] font-semibold leading-tight md:text-[26px]">{s.step}</h3>
                  <p className="mt-2 max-w-[52ch] text-[18px] leading-[1.6] text-[var(--field-muted)]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
