import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { siteName, siteUrl, siteLogoPng, siteOgImage } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: "%s | Sporting CP",
  },
  description:
    "Projeto criado por um fã do Sporting Clube de Portugal. Acompanha todas as novidades, jogos, resultados, classificações e informações sobre o clube.",
  keywords: [
    "Sporting CP",
    "Sporting",
    "Sporting Clube de Portugal",
    "Futebol",
    "Liga Portugal",
    "Futsal",
    "Andebol",
    "Atletismo",
    "Leões",
    "José Alvalade",
    "Pavilhão João Rocha",
    "Liga dos Campeões",
    "Taça de Portugal",
  ],
  authors: [{ name: "Fã do Sporting CP" }],
  creator: "Fã do Sporting CP",
  publisher: "Fã do Sporting CP",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Sporting CP",
    title: `${siteName}`,
    description:
      "Site criado por um fã do Sporting Clube de Portugal. Acompanha todas as novidades!",
    url: siteUrl,
    images: [
      {
        url: siteOgImage,
        width: 1200,
        height: 630,
        alt: `${siteName}`,
      },
      {
        url: siteLogoPng,
        width: 512,
        height: 512,
        alt: `${siteName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName}`,
    description: "Site criado por um fã do Sporting Clube de Portugal.",
    images: [siteOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual code
  },
  category: "sports",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Sporting Clube de Portugal",
  alternateName: "Sporting CP",
  url: "https://sporting-cp.vercel.app",
  logo: `${siteUrl}${siteLogoPng}`,
  foundingDate: "1906-07-01",
  founder: {
    "@type": "Person",
    name: "José Alvalade",
  },
  location: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lisboa",
      addressCountry: "PT",
    },
  },
  arena: {
    "@type": "StadiumOrArena",
    name: "Estádio José Alvalade",
    capacity: 50095,
  },
  sport: "Football",
  memberOf: [
    {
      "@type": "SportsOrganization",
      name: "Liga Portugal",
    },
  ],
  sameAs: [
    "https://www.facebook.com/SportingCP",
    "https://www.instagram.com/sportingcp",
    "https://twitter.com/Sporting_CP",
    "https://www.youtube.com/user/SportingCP",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#006847" />
        <meta name="msapplication-TileColor" content="#006847" />
        <meta name="application-name" content="Sporting CP" />
        <meta name="apple-mobile-web-app-title" content="Sporting CP" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <Script
          type="module"
          src="https://widgets.api-sports.io/3.1.0/widgets.js"
          strategy="beforeInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <ErrorBoundary>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
          <CookieConsent />
        </ErrorBoundary>
      </body>
    </html>
  );
}