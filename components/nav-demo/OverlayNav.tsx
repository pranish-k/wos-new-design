"use client";

import { Donate, FullScreenMenu, Logo, MenuButton, useOverlay } from "./shared";

/**
 * Full-screen menu at every width: the bar carries only the logo, Donate and one Menu
 * button, and the menu itself is a whole screen on the gradient. The quietest bar of the
 * set, and the same menu on a phone as on a desktop.
 */
export default function OverlayNav() {
  const { open, setOpen, button } = useOverlay();
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white">
      {/* Above the overlay, so the logo and the close control stay where they were. */}
      <div className="relative z-[60] mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 md:px-8 lg:h-[72px]">
        <Logo onDark={open} onNavigate={close} />
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <Donate onNavigate={close} className="hidden sm:inline-block" />
          <MenuButton open={open} onClick={() => setOpen(!open)} buttonRef={button} controls="overlay-menu" onDark={open} />
        </div>
      </div>
      <FullScreenMenu id="overlay-menu" open={open} onNavigate={close} />
    </header>
  );
}
