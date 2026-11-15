import ThreeColumnNav from "@/components/nav-demo/Mega";
import { parseVariant } from "@/components/nav-demo/variants";

/** The demo's header, the chosen design in the variation `?v=` names. The rest of the demo is app/nav-demo. */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <ThreeColumnNav variant={parseVariant((await searchParams).v)} />;
}
