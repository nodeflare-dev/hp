import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
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

      {/* ─── HERO ─── */}
      <section className="bg-[#DCDCDC]">
        <Container className="pb-14 pt-3 sm:pb-16 sm:pt-4">
          <Breadcrumbs items={[{ label: "お知らせ", href: "/news" }]} />
          <div className="mt-10">
            <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-ink/40">
              News
            </p>
            <h1 className="mt-3 text-[3rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-[4rem]">
              お知らせ
            </h1>
            <p className="mt-5 text-[1rem] leading-8 text-ink/60">
              プレスリリースや技術情報など、NodeFlare からの最新情報をお届けします。
            </p>
          </div>
        </Container>
      </section>

      <Section background="surface">
        <CategoryTabs active="" />
        <div className="mt-10">
          <NewsList posts={posts} />
        </div>
      </Section>
    </>
  );
}
