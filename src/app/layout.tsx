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
    default: "TurkVerse — Turkish Drama Urdu Recaps, Reviews, Episode Guide & Cast Bios",
    template: "%s | TurkVerse",
  },
  description:
    "Turkish dramas in Urdu — episode recaps, story summaries, cast biographies, where to watch legally, and release dates for Kurulus Osman, Kurulus Orhan, Dirilis Ertugrul, Alparslan, Teskilat, Kardeslerim, Yali Capkini and more. Pakistan ka #1 Turkish series guide.",
  keywords: [
    "turkish drama urdu",
    "turkish drama urdu recap",
    "kurulus osman urdu",
    "kurulus osman urdu recap",
    "kurulus osman episode recap urdu",
    "kurulus orhan urdu",
    "kurulus orhan episode guide",
    "dirilis ertugrul urdu",
    "ertugrul ghazi urdu",
    "alparslan buyuk selcuklu urdu",
    "teskilat urdu",
    "selahaddin eyyubi urdu",
    "barbaros hayreddin urdu",
    "kardeslerim urdu",
    "yali capkini urdu",
    "turkish series review urdu",
    "where to watch turkish drama urdu",
    "turkish drama netflix urdu",
    "turkish drama pakistan",
    "turkish historical drama urdu",
    "turkish romantic drama urdu",
    "episode story summary urdu",
    "cast biography urdu",
    "turkish actor biography",
    "esra bilgic",
    "burak ozcivit",
    "engin altan duzyatan",
    "turkish drama release date 2026",
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
    title: "TurkVerse — Turkish Drama Urdu Recaps, Reviews & Cast Bios",
    description: "Pakistan's #1 Turkish drama guide — episode recaps in Urdu, cast biographies, legal streaming options, release dates for Kurulus Osman, Ertugrul, Alparslan and more.",
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
    title: "TurkVerse — Turkish Drama Urdu Recaps & Reviews",
    description: "Kurulus Osman, Ertugrul, Alparslan — episode recaps in Urdu, cast bios and where to watch legally.",
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
