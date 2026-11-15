import type { ComponentType } from "react";
import Nav from "@/components/Nav";
import CenteredNav from "@/components/nav-demo/CenteredNav";
import DarkNav from "@/components/nav-demo/DarkNav";
import DrawerNav from "@/components/nav-demo/DrawerNav";
import { MegaDark, MegaLight, MegaSteps, MegaWide, MegaWideLight, MegaWidePlain } from "@/components/nav-demo/Mega";
import OverlayNav from "@/components/nav-demo/OverlayNav";
import TabsNav from "@/components/nav-demo/TabsNav";
import UtilityNav from "@/components/nav-demo/UtilityNav";
import { parseVariant, type VariantKey } from "@/components/nav-demo/variants";

const HEADERS: Record<VariantKey, ComponentType> = {
  current: Nav,
  mega: MegaDark,
  "mega-light": MegaLight,
  "mega-steps": MegaSteps,
  "mega-wide": MegaWide,
  "mega-wide-plain": MegaWidePlain,
  "mega-wide-light": MegaWideLight,
  dark: DarkNav,
  overlay: OverlayNav,
  utility: UtilityNav,
  drawer: DrawerNav,
  tabs: TabsNav,
  centered: CenteredNav,
};

/** The demo's header, chosen by `?v=`. The rest of the demo is app/nav-demo. */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const Header = HEADERS[parseVariant((await searchParams).v)];
  return <Header />;
}
