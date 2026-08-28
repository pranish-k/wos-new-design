import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import page from "@/content/privacy-policy";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <ContentPage page={page} />;
}
