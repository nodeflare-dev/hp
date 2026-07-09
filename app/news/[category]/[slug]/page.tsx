import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Tag } from "@/components/ui/Tag";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";
import {
  getPost,
  getPostsByCategory,
  getAllPostSlugs,
  getCategory,
} from "@/lib/news";

// 新規記事は ISR でオンデマンド生成（dynamicParams はデフォルト true）
export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.category}/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = await getPost(slug);
  // 記事が存在しない、または URL のカテゴリーが記事のカテゴリーと不一致なら 404
  if (!post || post.category !== category) notFound();

  const cat = getCategory(post.category);
  const related = (await getPostsByCategory(post.category, 4)).filter(
    (p) => p.slug !== post.slug,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE.nameJa,
      url: SITE.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/news/${post.category}/${post.slug}`,
    },
    ...(post.coverImageUrl ? { image: [post.coverImageUrl] } : {}),
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <article>
        {/* 記事ヘッダー */}
        <header className="border-b border-line bg-surface">
          <Container size="narrow" className="py-14 sm:py-16">
            <Breadcrumbs
              items={[
                { label: "お知らせ", href: "/news" },
                {
                  label: cat?.label ?? "お知らせ",
                  href: `/news/${post.category}`,
                },
                {
                  label: post.title,
                  href: `/news/${post.category}/${post.slug}`,
                },
              ]}
            />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {cat && <Tag variant="primary">{cat.label}</Tag>}
              <time
                dateTime={post.publishedAt}
                className="font-mono text-sm text-muted"
              >
                公開 {formatDate(post.publishedAt)}
              </time>
              {post.updatedAt !== post.publishedAt && (
                <time
                  dateTime={post.updatedAt}
                  className="font-mono text-sm text-muted"
                >
                  更新 {formatDate(post.updatedAt)}
                </time>
              )}
            </div>

            <h1 className="mt-5 text-3xl font-medium leading-snug tracking-tight text-ink sm:text-4xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="grid h-8 w-8 place-items-center rounded-full border border-line bg-background text-sm font-normal text-ink"
                >
                  {post.author.slice(0, 1)}
                </span>
                <span className="text-sm text-ink/80">{post.author}</span>
              </div>
              {post.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <li key={t}>
                      <Tag variant="outline">#{t}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Container>
        </header>

        {/* 本文 */}
        <Container size="narrow" className="py-14 sm:py-16">
          <Placeholder ratio="16/9" className="mb-12" />
          {post.contentHtml ? (
            <div
              className="prose max-w-none text-base leading-8 text-ink/85"
              // Hygraph の RichText.html を描画。信頼できる CMS ソースを前提。
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : (
            <p className="text-base leading-8 text-muted">{post.excerpt}</p>
          )}

          <div className="mt-14 border-t border-line pt-8">
            <Button href={`/news/${post.category}`} variant="outline">
              ← {cat?.label ?? "お知らせ"} の一覧へ
            </Button>
          </div>
        </Container>
      </article>

      {/* 関連記事 */}
      {related.length > 0 && (
        <section className="border-t border-line bg-background py-16">
          <Container size="narrow">
            <h2 className="text-xl font-normal text-ink">関連するお知らせ</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {related.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/news/${p.category}/${p.slug}`}
                    className="group flex items-center gap-4 py-5"
                  >
                    <time className="w-24 shrink-0 font-mono text-sm text-muted">
                      {formatDate(p.publishedAt)}
                    </time>
                    <span className="text-base font-normal text-ink transition-colors group-hover:text-primary">
                      {p.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
