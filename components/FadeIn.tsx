"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered fade.
 *
 * Starts visible, and only hides itself after mount for elements that are already
 * below the fold. That ordering is the whole point: the previous version computed
 * `prefers-reduced-motion` during render, which is always false on the server, so
 * every wrapped section shipped in the SSR HTML at `opacity: 0`. Most of the homepage
 * and all of the leadership page are wrapped, so a failed or slow JS load rendered a
 * hero above blank space, and a reduced-motion visitor hydrated into a style mismatch.
 *
 * Hiding after paint is safe because it only ever applies off-screen, where there is
 * nothing for the visitor to see flash. The trade is that content already in view on
 * load does not animate, which is the correct default anyway - it is content the
 * visitor is looking at.
 */
export default function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // globals.css already collapses the transition under prefers-reduced-motion, so
    // this check exists to skip the hide entirely rather than to shorten the fade.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Matches the observer's own -40px bottom margin, so an element is only hidden if
    // it would not have counted as intersecting anyway.
    if (el.getBoundingClientRect().top < window.innerHeight - 40) return;

    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity var(--duration-fade) var(--ease-fade) ${delay}ms, transform var(--duration-fade) var(--ease-fade) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
