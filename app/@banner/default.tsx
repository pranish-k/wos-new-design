/**
 * The @banner slot puts an announcement bar above the header, which no page can reach
 * on its own because the header lives in the root layout. Only /announcements-demo fills
 * it.
 *
 * Empty everywhere else takes three files, not one. This one covers a full page load of
 * any route. `page.tsx` and `[...rest]/page.tsx` cover client-side navigation to `/` and
 * to everything else: on a soft navigation Next keeps a slot's last page when nothing in
 * the slot matches the new URL, so without them the demo's bar would follow a visitor
 * out of the demo and onto the page they clicked through to.
 */
export default function Default() {
  return null;
}
