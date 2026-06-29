import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteUrl, siteLogoPng, siteOgImage, claqueInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: `${claqueInfo.shortName} | Claque Ultra Sporting CP Algarve`,
    template: `%s | ${claqueInfo.shortName}`,
  },
  description: "Directivo Algarve — Claque ultra do Sporting Clube de Portugal no Algarve. Directivo Ultras XXI. Deslocações, convívios e paixão leonina.",
  keywords: [
    "Directivo Algarve",
    "Claque Sporting CP",
    "Sporting Algarve",
    "Directivo Ultras XXI",
    "Claque Ultra",
    "Sporting Clube de Portugal",
    "Ultra Algarve",
    "Futebol",
    "Sporting",
    "Leões",
    "Deslocações Sporting",
    "Sporting CP Algarve",
  ],
  authors: [{ name: claqueInfo.fullName }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: claqueInfo.fullName,
    title: `${claqueInfo.shortName} | Claque Ultra Sporting CP Algarve`,
    description: "Directivo Algarve — Claque ultra do Sporting CP no Algarve. Directivo Ultras XXI.",
    url: siteUrl,
    images: [
      { url: siteOgImage, width: 1200, height: 630, alt: claqueInfo.shortName },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${claqueInfo.shortName} | Claque Ultra Sporting CP Algarve`,
    description: "Directivo Algarve — Claque ultra do Sporting CP no Algarve.",
    images: [siteOgImage],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: claqueInfo.fullName,
  alternateName: claqueInfo.shortName,
  url: siteUrl,
  logo: `${siteUrl}${siteLogoPng}`,
  foundingDate: `${claqueInfo.founded}-07-01`,
  description: "Claque ultra do Sporting Clube de Portugal no Algarve. Directivo Ultras XXI.",
  areaServed: "Algarve, Portugal",
  sport: "Football (Soccer)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className="bg-black">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo-maskable.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <Script id="json-ld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
      </head>
      <body className="bg-black text-gray-300 font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}