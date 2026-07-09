import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { NewsList } from "@/components/news/NewsList";
import { CategoryTabs } from "@/components/news/CategoryTabs";
import { buildMetadata } from "@/lib/seo";
import {
  NEWS_CATEGORIES,
  getCategory,
  getPostsByCategory,
  type CategorySlug,
} from "@/lib/news";

export const revalidate = 3600;

export function generateStaticParams() {
  return NEWS_CATEGORIES.map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.label} | お知らせ`,
    description: `${cat.label} に関するお知らせ・情報の一覧です。`,
    path: `/news/${cat.slug}`,
  });
}

export default async function NewsCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const posts = await getPostsByCategory(cat.slug as CategorySlug);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-[#DCDCDC]">
        <Container className="pb-14 pt-10 sm:pb-16 sm:pt-12">
          <Breadcrumbs
            items={[
              { label: "お知らせ", href: "/news" },
              { label: cat.label, href: `/news/${cat.slug}` },
            ]}
          />
          <div className="mt-10">
            <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-ink/40">
              News
            </p>
            <h1 className="mt-3 text-[3rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-[4rem]">
              {cat.label}
            </h1>
            <p className="mt-5 text-[1rem] leading-8 text-ink/60">
              {cat.label} に関するお知らせ・情報の一覧です。
            </p>
          </div>
        </Container>
      </section>

      <Section background="surface">
        <CategoryTabs active={cat.slug} />
        <div className="mt-10">
          <NewsList posts={posts} />
        </div>
      </Section>
    </>
  );
}
