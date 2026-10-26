"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Marks its wrapper `data-inview` the first time it scrolls into view.
 *
 * It owns no motion: alternate-home.css decides what changes. Content is hidden only
 * once this component has armed it (`data-armed`), and only if it starts below the
 * fold, so the server-rendered page is always complete and nothing already on screen
 * blinks out and back in.
 */
export default function InView({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "ul";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.setAttribute("data-inview", "");
      return;
    }
    el.setAttribute("data-armed", "");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-inview", "");
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement & HTMLUListElement>} data-observe="" className={className}>
      {children}
    </Tag>
  );
}
