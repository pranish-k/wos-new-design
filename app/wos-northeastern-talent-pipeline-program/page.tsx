import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import page from "@/content/wos-northeastern-talent-pipeline-program";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <ContentPage page={page} />;
}
