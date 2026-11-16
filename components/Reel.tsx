"use client";

import { Pause, Play } from "lucide-react";
import { useState, type ReactNode } from "react";

/**
 * Holds something that drifts on its own, and the control that stops it. Anything that
 * moves for more than five seconds needs a way to stop it (WCAG 2.2.2); the drift also
 * stops while the pointer rests on it, and never starts under reduced motion
 * (globals.css). Used by the faces reel and the partner marquee.
 */
export default function Reel({
  children,
  label,
  className = "",
  controlClassName = "absolute bottom-4 right-4 z-20 border-white/40 bg-surface-deep/60 text-white hover:border-white",
}: {
  children: ReactNode;
  /** What moves, for the control's name: "Pause the moving <label>". */
  label: string;
  className?: string;
  /** Where the control sits and its colours. Defaults to over a photograph, bottom right. */
  controlClassName?: string;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`reel ${className}`} data-paused={paused ? "" : undefined}>
      {children}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={`${paused ? "Play" : "Pause"} the moving ${label}`}
        className={`flex h-11 w-11 items-center justify-center border-2 transition-colors ${controlClassName}`}
      >
        {paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
      </button>
    </div>
  );
}
