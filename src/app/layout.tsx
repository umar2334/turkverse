import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";

const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.turkdrama.live"),
  title: {
    default: "TurkVerse — Turkish Series News, Reviews & Cast Biographies",
    template: "%s | TurkVerse",
  },
  description:
    "TurkVerse is your ultimate guide to Turkish dramas. Get the latest news, cast biographies, episode reviews, and release dates for all popular Turkish series.",
  keywords: ["Turkish series", "Turkish drama", "Kurulus Osman", "Dirilis Ertugrul", "Turkish cast", "episode review"],
  alternates: {
    canonical: "https://www.turkdrama.live",
  },
  openGraph: {
    siteName: "TurkVerse",
    type: "website",
    url: "https://www.turkdrama.live",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        {ADSENSE_PUB_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <ReadingProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
