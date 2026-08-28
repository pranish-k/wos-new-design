import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import page from "@/content/locations";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <ContentPage page={page} />;
}
