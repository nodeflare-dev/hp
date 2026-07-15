import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { NewsFilter } from "@/components/news/NewsFilter";
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
      <div className="bg-surface">
        <Container className="py-4">
          <Breadcrumbs
            items={[
              { label: "お知らせ", href: "/news" },
              { label: cat.label, href: `/news/${cat.slug}` },
            ]}
          />
        </Container>
      </div>

      <section className="bg-surface pb-24 pt-6 sm:pb-28 lg:pb-36">
        <Container>
          <NewsFilter posts={posts} activeCategory={cat.slug} />
        </Container>
      </section>
    </>
  );
}
