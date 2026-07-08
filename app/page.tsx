import { Hero } from "@/components/home/Hero";
import { ProductFeature } from "@/components/home/ProductFeature";
import { NewsSection } from "@/components/home/NewsSection";
import { PromoTiles } from "@/components/home/PromoTiles";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

// お知らせを含むため ISR（1時間）
export const revalidate = 3600;

export default function HomePage() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.nameJa,
    url: SITE.url,
    inLanguage: "ja",
  };

  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <Hero />
      <NewsSection />
      <ProductFeature />
      <PromoTiles />
    </>
  );
}
