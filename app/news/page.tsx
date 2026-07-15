import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { NewsFilter } from "@/components/news/NewsFilter";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/news";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "お知らせ",
  description:
    "NodeFlare からのお知らせ・WebAssembly・Security・Performance に関する情報をお届けします。",
  path: "/news",
});

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "お知らせ",
          url: `${SITE.url}/news`,
        }}
      />

      <div className="bg-surface">
        <Container className="py-4">
          <Breadcrumbs items={[{ label: "お知らせ", href: "/news" }]} />
        </Container>
      </div>

      <section className="bg-surface pb-24 pt-6 sm:pb-28 lg:pb-36">
        <Container>
          <NewsFilter posts={posts} activeCategory="" />
        </Container>
      </section>
    </>
  );
}
