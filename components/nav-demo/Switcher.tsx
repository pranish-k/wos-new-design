"use client";

import Link from "next/link";
import { useState } from "react";
import { VARIANTS, type VariantKey } from "./variants";

/**
 * The control for /nav-demo: one button per header, and the selected one's note. Fixed
 * to the bottom of the screen so it is never under the header it is switching, and
 * collapsible so it is never in the way of judging one.
 */
export default function Switcher({ current }: { current: VariantKey }) {
  const [collapsed, setCollapsed] = useState(false);
  const index = VARIANTS.findIndex((v) => v.key === current);
  const variant = VARIANTS[index];

  return (
    <aside
      aria-label="Header options"
      className="field field-deep fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-[920px] border-t-2 border-wos-red md:inset-x-6 md:bottom-5"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-5">
        <p className="m-0 font-heading text-[15px] font-semibold">
          <span className="text-white/60">Header {index + 1} of {VARIANTS.length}:</span> {variant.name}
        </p>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-expanded={!collapsed}
          className="cursor-pointer font-heading text-[14px] font-semibold text-white/75 underline underline-offset-[4px] hover:text-white"
        >
          {collapsed ? "Show options" : "Hide"}
        </button>
      </div>
      {!collapsed && (
        <div className="border-t border-white/15 px-4 pb-4 pt-3 md:px-5">
          <p className="m-0 max-w-[70ch] text-[15px] leading-[1.5] text-white/80">{variant.note}</p>
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
            {VARIANTS.map((v, i) => (
              <li key={v.key}>
                <Link
                  href={`/nav-demo?v=${v.key}`}
                  scroll={false}
                  aria-current={v.key === current ? "true" : undefined}
                  className={`inline-block px-3 py-1.5 font-heading text-[14px] font-semibold no-underline transition-colors ${
                    v.key === current
                      ? "bg-action-deep text-white hover:text-white"
                      : "bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {i + 1}. {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
