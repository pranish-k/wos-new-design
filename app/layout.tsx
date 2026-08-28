import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import { ORG, DESCRIPTION } from "@/lib/brand";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Montserrat is a variable font on Google Fonts: omitting `weight` ships one file
// covering 100-900, which is smaller than enumerating the weights we use.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Lato is NOT variable and has no 500 or 600 (100/300/400/700/900 only), so weights
// must be listed. Italic is required by PullQuote.
// Note: `font-medium`/`font-semibold` on body copy will snap to 400/700 under Lato,
// so keep 500/600 on Montserrat headings.
const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  // Pages set a bare title and the template supplies the org suffix. Pages must not
  // append it themselves or the template double-suffixes it.
  title: {
    default: ORG,
    template: `%s | ${ORG}`,
  },
  description: DESCRIPTION,
  // Without metadataBase, Next cannot resolve relative image paths and drops og:image
  // entirely, which is the failure mode where a share renders as a bare link.
  metadataBase: new URL("https://wforce.org"),
  // No title or description here on purpose. Setting them would pin every page to the
  // homepage's, so sharing a service page would show the generic one. Left unset, Next
  // fills og:title and og:description from whatever each page resolved.
  openGraph: {
    type: "website",
    siteName: ORG,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${montserrat.variable} ${lato.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        {/* Visible only on focus. The nav is three levels deep and every page repeats
            it, so keyboard users need the bypass more here than on a flat nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-action-deep focus:px-5 focus:py-3 focus:font-heading focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
