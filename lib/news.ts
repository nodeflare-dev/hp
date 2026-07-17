/**
 * お知らせ（News）— Hygraph 連携レイヤー。
 *
 * 必要な環境変数・スキーマは HYGRAPH.md を参照。
 */

export const NEWS_CATEGORIES = [
  { slug: "news", label: "お知らせ", hygraph: "news" },
  { slug: "webassembly", label: "WebAssembly", hygraph: "webassembly" },
  { slug: "security", label: "Security", hygraph: "security" },
  { slug: "performance", label: "Performance", hygraph: "performance" },
] as const;

export type CategorySlug = (typeof NEWS_CATEGORIES)[number]["slug"];

export function getCategory(slug: string) {
  return NEWS_CATEGORIES.find((c) => c.slug === slug);
}

/** Hygraph の category 値（"NEWS" 等）→ サイト内 slug */
export function categorySlugFromHygraph(value: string): CategorySlug {
  const found = NEWS_CATEGORIES.find(
    (c) => c.hygraph.toLowerCase() === value.toLowerCase(),
  );
  return (found?.slug ?? "news") as CategorySlug;
}

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  category: CategorySlug;
  tags: string[];
  publishedAt: string; // ISO
  updatedAt: string; // ISO
  coverImageUrl?: string;
};

const ENDPOINT = process.env.HYGRAPH_ENDPOINT;
const TOKEN = process.env.HYGRAPH_TOKEN;

const REVALIDATE_SECONDS = 3600;

type HygraphPost = {
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: { html?: string | null } | null;
  category?: string | null;
  tags?: string[] | null;
  postDate?: string | null;
  updatedAt?: string | null;
};

function mapPost(p: HygraphPost): Post {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    contentHtml: p.content?.html ?? "",
    category: categorySlugFromHygraph(p.category ?? "NEWS"),
    tags: p.tags ?? [],
    publishedAt: p.postDate ?? new Date(0).toISOString(),
    updatedAt: p.updatedAt ?? p.postDate ?? new Date(0).toISOString(),
  };
}

async function hygraphFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T | null> {
  if (!ENDPOINT) return null;
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: REVALIDATE_SECONDS, tags: ["news"] },
    });
    if (!res.ok) {
      console.error(`[hygraph] HTTP ${res.status}`);
      return null;
    }
    const json = (await res.json()) as { data?: T; errors?: unknown };
    if (json.errors) {
      console.error("[hygraph] GraphQL errors:", json.errors);
      return null;
    }
    return json.data ?? null;
  } catch (err) {
    console.error("[hygraph] fetch failed:", err);
    return null;
  }
}

const POST_FIELDS = `
  slug
  title
  excerpt
  content { html }
  category
  tags
  postDate
  updatedAt
`;

/** 全お知らせを公開日の新しい順で取得。limit で件数制限。 */
export async function getPosts(limit?: number): Promise<Post[]> {
  const data = await hygraphFetch<{ posts: HygraphPost[] }>(
    `query Posts($first: Int) {
      posts(orderBy: postDate_DESC, first: $first) { ${POST_FIELDS} }
    }`,
    { first: limit ?? 100 },
  );

  const posts = (data?.posts?.map(mapPost) ?? []).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}

/** カテゴリー別に取得。 */
export async function getPostsByCategory(
  slug: CategorySlug,
  limit?: number,
): Promise<Post[]> {
  const category = getCategory(slug);
  if (!category) return [];

  const data = await hygraphFetch<{ posts: HygraphPost[] }>(
    `query PostsByCategory($category: Category!, $first: Int) {
      posts(where: { category: $category }, orderBy: postDate_DESC, first: $first) {
        ${POST_FIELDS}
      }
    }`,
    { category: category.hygraph, first: limit ?? 100 },
  );

  let posts = (data?.posts?.map(mapPost) ?? []).filter(
    (p) => p.category === slug,
  );
  posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}

/** スラッグから 1 件取得。 */
export async function getPost(slug: string): Promise<Post | null> {
  const data = await hygraphFetch<{ post: HygraphPost | null }>(
    `query Post($slug: String!) {
      post(where: { slug: $slug }) { ${POST_FIELDS} }
    }`,
    { slug },
  );

  return data?.post ? mapPost(data.post) : null;
}

/** 全スラッグ（generateStaticParams 用）。 */
export async function getAllPostSlugs(): Promise<
  { category: CategorySlug; slug: string }[]
> {
  const posts = await getPosts();
  return posts.map((p) => ({ category: p.category, slug: p.slug }));
}
