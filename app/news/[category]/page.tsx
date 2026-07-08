import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
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
      <PageHeader
        eyebrow="News"
        title={cat.label}
        description={`${cat.label} に関するお知らせ・情報の一覧です。`}
        crumbs={[
          { label: "お知らせ", href: "/news" },
          { label: cat.label, href: `/news/${cat.slug}` },
        ]}
      />

      <Section background="surface">
        <CategoryTabs active={cat.slug} />
        <div className="mt-10">
          <NewsList posts={posts} />
        </div>
      </Section>
    </>
  );
}
