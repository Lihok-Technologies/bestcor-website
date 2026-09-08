import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/metadata";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bestcor Phils., Inc. | Built on Integrity. Driven by Quality.",
    template: "%s | Bestcor Phils., Inc.",
  },
  description:
    "Bestcor Phils., Inc. — civil-electromechanical contractor in San Jose del Monte, Bulacan. Electrical, mechanical, electromechanical and civil services: preventive maintenance, testing & diagnostics, distribution and pole-line works, and construction — since November 2005.",
  applicationName: "Bestcor Phils., Inc.",
  keywords: [
    "Bestcor Phils Inc",
    "civil-electromechanical contractor Philippines",
    "electrical contractor San Jose del Monte",
    "mechanical services pumps motors generator sets",
    "preventive maintenance",
    "electrical testing and diagnostics",
    "pole-line and distribution works",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "Bestcor Phils., Inc.",
    url: SITE_URL,
    title: "Bestcor Phils., Inc. | Built on Integrity. Driven by Quality.",
    description:
      "Civil-electromechanical contractor. Electrical, mechanical and civil services — preventive maintenance, testing & diagnostics, distribution and pole-line construction since November 2005.",
    images: [{ url: `${SITE_URL}/images/og-home.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bestcor Phils., Inc. | Built on Integrity. Driven by Quality.",
    description:
      "Civil-electromechanical contractor. Electrical, mechanical and civil services — preventive maintenance, testing & diagnostics, distribution and pole-line construction since November 2005.",
    images: [`${SITE_URL}/images/og-home.jpg`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060a08",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${oswald.variable}`}>
      <body className="flex min-h-svh flex-col antialiased">
        <a
          href="#main"
          className="sr-only z-[60] bg-signal px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
