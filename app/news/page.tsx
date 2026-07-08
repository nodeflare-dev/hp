import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { NewsList } from "@/components/news/NewsList";
import { CategoryTabs } from "@/components/news/CategoryTabs";
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
      <PageHeader
        eyebrow="News"
        title="お知らせ"
        description="プレスリリースや技術情報など、NodeFlare からの最新情報をお届けします。"
        crumbs={[{ label: "お知らせ", href: "/news" }]}
      />

      <Section background="surface">
        <CategoryTabs active="" />
        <div className="mt-10">
          <NewsList posts={posts} />
        </div>
      </Section>
    </>
  );
}
