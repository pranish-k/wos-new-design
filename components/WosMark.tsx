import Image from "next/image";
import { ORG } from "@/lib/brand";

/**
 * The single seam for the WOS logo. Every reference to the brand asset goes through
 * here so that swapping the raster lockup for a proper SVG is a one-file change.
 *
 * This is the full horizontal lockup with the wordmark, taken from the live site where
 * it appears on all 117 pages. Because the wordmark is in the image, nothing needs to
 * set the org name as adjacent text to make the header read.
 *
 * `onDark` derives the white version with brightness-0 (crush every opaque pixel to
 * black) then invert (flip to white). This is safe only because the PNG has a real
 * alpha channel; on an asset with a baked background it would render a solid block.
 */
export default function WosMark({
  variant = "color",
  className = "h-10 w-auto",
  decorative = false,
  priority = false,
}: {
  variant?: "color" | "onDark";
  className?: string;
  /** True when an ancestor link already announces the destination, to avoid double-reading. */
  decorative?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/wos-lockup.png"
      width={800}
      height={163}
      alt={decorative ? "" : ORG}
      priority={priority}
      className={`${className} object-contain ${
        variant === "onDark" ? "brightness-0 invert" : ""
      }`}
    />
  );
}
