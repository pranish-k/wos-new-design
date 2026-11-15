import AnnouncementBar from "@/components/announcements/AnnouncementBar";
import { barPrepaintScript, parsePatterns } from "@/components/announcements/patterns";
import { ANNOUNCEMENT } from "@/content/announcements";

/**
 * The demo's bar, above the header. The rest of the demo is app/announcements-demo.
 *
 * The pre-paint script goes in as markup inside a hidden div rather than as a <script>
 * element. In the server HTML the browser runs it during parsing, which is the only
 * time it is needed. When a demo toggle brings the bar back by client navigation, React
 * would otherwise render a <script> it can never execute and warn about it; as
 * innerHTML it is inert, and useDismissal already has the answer by then.
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  if (!parsePatterns((await searchParams).show).includes("bar")) return null;
  return (
    <>
      <AnnouncementBar item={ANNOUNCEMENT} />
      <div
        hidden
        dangerouslySetInnerHTML={{ __html: `<script>${barPrepaintScript(ANNOUNCEMENT.id)}</script>` }}
      />
    </>
  );
}
