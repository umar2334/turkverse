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
    default: "TurkVerse — Turkish Drama Reviews, News & Cast Biographies",
    template: "%s | TurkVerse",
  },
  description:
    "Independent Turkish series review site. Read reviews, cast bios, release dates and news for Kurulus Osman, Ertugrul, Kardeslerim and more. We do not host or stream videos.",
  keywords: [
    "turkish dramas",
    "kurulus osman",
    "ertugrul",
    "turkish series reviews",
    "turkish drama urdu",
    "pakistan turkish drama",
    "kardeslerim",
    "yali capkini",
  ],
  authors: [{ name: "TurkVerse Editorial Team" }],
  creator: "TurkVerse",
  publisher: "TurkVerse",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.turkdrama.live",
    siteName: "TurkVerse",
    title: "TurkVerse — Turkish Drama Reviews & News",
    description: "Your ultimate guide to Turkish series, cast biographies and release dates.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TurkVerse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TurkVerse — Turkish Drama Reviews",
    description: "Reviews, cast bios and news for Turkish dramas.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.turkdrama.live",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {ADSENSE_PUB_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TurkVerse",
              url: "https://www.turkdrama.live",
              description: "Turkish drama reviews, news and cast biographies",
              publisher: {
                "@type": "Organization",
                name: "TurkVerse",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.turkdrama.live/logo.png",
                },
              },
            }),
          }}
        />
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
        <ReadingProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
