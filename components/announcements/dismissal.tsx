"use client";
import { useCallback, useSyncExternalStore } from "react";

/**
 * Remembers which announcement a visitor has closed, per surface.
 *
 * Per surface because closing the bar is not the same as having read the announcement:
 * the band further down is page content and stays, and the dialog is its own "seen once".
 * The stored value is the announcement's id, so a new announcement reopens every surface
 * without anyone clearing anything.
 *
 * localStorage can throw (private windows, blocked site data), so every access is
 * guarded and a dismissal also lands in memory. Without that, a visitor whose storage is
 * blocked would close the bar and watch it come straight back.
 *
 * `serverValue` is what the HTML ships with. The bar and the corner notice ship open, per
 * DESIGN.md §10's SSR rule, so the page is complete with scripts off. The dialog ships
 * closed, because a modal in the server HTML would cover the page for every visitor
 * whose script never arrives.
 */
const PREFIX = "wos.announcement.";
const memory = new Map<string, string>();
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function read(key: string): string | null {
  if (memory.has(key)) return memory.get(key)!;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function useDismissal(surface: string, id: string, serverValue: boolean) {
  const key = PREFIX + surface;
  const dismissed = useSyncExternalStore(
    subscribe,
    () => read(key) === id,
    () => serverValue,
  );
  const dismiss = useCallback(() => {
    memory.set(key, id);
    try {
      window.localStorage.setItem(key, id);
    } catch {
      // Memory already holds it for this page view; see the docblock.
    }
    notify();
  }, [key, id]);
  return [dismissed, dismiss] as const;
}

/** The nav's own close glyph, so the site has one X rather than two. */
export function CloseButton({
  label,
  onClick,
  className = "",
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center transition-colors ${className}`.trim()}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}
