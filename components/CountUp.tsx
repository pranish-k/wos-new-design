"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure up when it scrolls into view, once.
 *
 * The value is parsed from the rendered string rather than passed as a number so the
 * suffix, the thousands separator, and the plain "4" all keep their exact live form.
 * The final text is in the DOM from the first paint, so it is correct with JavaScript
 * off and correct for a screen reader, which never sees the intermediate values.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const target = Number(value.replace(/[^0-9]/g, ""));
  const prefix = value.slice(0, value.search(/[0-9]/));
  const suffix = value.slice(value.search(/[0-9]/) + String(target).length + (value.includes(",") ? 1 : 0));

  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(target);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || started) return;
    // Respect a reduced-motion preference by simply never animating.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setStarted(true);

        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          // Ease out cubic: fast at first, settling rather than stopping dead.
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        setShown(0);
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, started]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
