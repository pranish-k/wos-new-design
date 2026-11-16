"use client";

import Image from "next/image";
import { useState } from "react";
import { watchUrl, type Video } from "@/content/videos";

/**
 * A YouTube video that loads only when asked for.
 *
 * Until it is played it is the video's own poster frame with a play button, which costs
 * one image rather than YouTube's player and its cookies on every page view. Played, it
 * becomes the privacy-enhanced (youtube-nocookie) player, already running.
 *
 * The poster is a real link to the video on YouTube, so with scripts off, or opened in a
 * new tab, it still goes somewhere; with scripts on, the click is taken over and the
 * video plays in place.
 */
export default function VideoEmbed({
  video,
  sizes,
  priority = false,
}: {
  video: Video;
  sizes: string;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full bg-surface-deep">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <a
      href={watchUrl(video.id)}
      onClick={(e) => {
        // A modified click (new tab, new window) keeps its meaning.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        setPlaying(true);
      }}
      className="group relative block aspect-video w-full overflow-hidden bg-surface-deep"
    >
      <Image
        src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-[var(--ease-fade)] group-hover:scale-[1.03]"
      />
      {/* A scrim along the bottom edge only, under the duration, so the frame itself
          is left as filmed. */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-surface-deep/70 to-transparent" />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-action-deep text-white transition-colors group-hover:bg-action-deeper md:h-20 md:w-20"
      >
        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 md:h-8 md:w-8" focusable="false">
          <path d="M6 4.5v15L19.5 12z" fill="currentColor" />
        </svg>
      </span>
      {/* The name is the link's own text, not an aria-label: a label that leaves out the
          duration printed on the frame fails WCAG 2.5.3, since a voice user who says what
          they see would not match it. */}
      <span className="sr-only">Play video: {video.title}, </span>
      <span className="absolute bottom-3 left-4 font-heading text-small font-semibold text-white">
        {video.duration}
      </span>
    </a>
  );
}
