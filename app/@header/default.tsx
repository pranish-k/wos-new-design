import Nav from "@/components/Nav";

/**
 * The @header slot holds the site header, so /nav-demo can swap in a different one.
 * Every other route gets the real Nav.
 *
 * Three files render it, not one, for the same reason as @banner: this one covers a full
 * page load of any route, and `page.tsx` and `[...rest]/page.tsx` cover client-side
 * navigation to `/` and to everything else. On a soft navigation Next keeps a slot's last
 * page when nothing in the slot matches the new URL, so without them the demo's header
 * would follow a visitor out of the demo.
 */
export default function Default() {
  return <Nav />;
}
