import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { siteUrl, siteLogoPng, siteOgImage, claqueInfo } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
  preload: true,
});

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
  alternates: {
    canonical: siteUrl,
    languages: {
      "pt-PT": siteUrl,
    },
  },
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
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
  colorScheme: "dark" as const,
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`bg-black ${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo-maskable.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script id="json-ld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
        <Script id="breadcrumb-json-ld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(breadcrumbJsonLd)}
        </Script>
      </head>
      <body className="bg-black text-gray-300 font-sans antialiased">
        {/* Skip to content - Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-ultra-green focus:text-white focus:font-heading focus:font-bold focus:text-sm focus:uppercase focus:tracking-wider"
        >
          Saltar para o conteúdo
        </a>

        <Header />
        <main id="main-content" className="min-h-screen" role="main">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}