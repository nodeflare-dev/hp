import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { metadataBase } from "@/lib/seo";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${SITE.nameJa} | ${SITE.copy}`,
    template: `%s | ${SITE.nameJa}`,
  },
  description: SITE.description,
  applicationName: SITE.nameJa,
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.nameJa,
    title: `${SITE.nameJa} | ${SITE.copy}`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.nameJa,
    alternateName: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    slogan: SITE.copy,
  };

  return (
    <html
      lang="ja"
      data-scroll-behavior="smooth"
      className={notoSansJp.variable}
    >
      <body className="flex min-h-screen flex-col bg-background text-ink antialiased">
        <JsonLd data={orgJsonLd} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
