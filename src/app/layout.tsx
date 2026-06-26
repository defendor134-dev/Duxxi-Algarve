import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { siteName, siteUrl, siteLogoPng, siteOgImage, claqueInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${claqueInfo.fullName}`,
  },
  description: claqueInfo.description,
  keywords: [
    "Directivo Algarve",
    "Claque Sporting CP",
    "Sporting Algarve",
    "Sporting Clube de Portugal",
    "Claque Algarvia",
    "Futebol",
    "Sporting",
    "Leões",
    "Apoio ao Sporting",
    "Deslocações Sporting",
    "Sporting CP Algarve",
  ],
  authors: [{ name: claqueInfo.fullName }],
  creator: claqueInfo.fullName,
  publisher: claqueInfo.fullName,
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: claqueInfo.fullName,
    title: siteName,
    description: claqueInfo.description,
    url: siteUrl,
    images: [
      { url: siteOgImage, width: 1200, height: 630, alt: siteName },
      { url: siteLogoPng, width: 512, height: 512, alt: `${siteName} logo` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: claqueInfo.description,
    images: [siteOgImage],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  category: "sports",
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
  description: claqueInfo.description,
  areaServed: "Algarve, Portugal",
  sport: "Football (Soccer)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo-maskable.png" />
        <Script id="json-ld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ScrollToTop />
          <CookieConsent />
        </ErrorBoundary>
      </body>
    </html>
  );
}