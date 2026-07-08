/**
 * お知らせ（News）— Hygraph 連携レイヤー。
 *
 * Hygraph の環境変数が未設定でもサイトが完全に動作するよう、
 * 未設定時は下部のサンプルデータ（FALLBACK_POSTS）を返すフォールバック設計。
 * 環境変数を設定すると自動的に Hygraph から取得する。
 *
 * 必要な環境変数・スキーマは HYGRAPH.md を参照。
 */

export const NEWS_CATEGORIES = [
  { slug: "news", label: "お知らせ", hygraph: "News" },
  { slug: "webassembly", label: "WebAssembly", hygraph: "WebAssembly" },
  { slug: "security", label: "Security", hygraph: "Security" },
  { slug: "performance", label: "Performance", hygraph: "Performance" },
] as const;

export type CategorySlug = (typeof NEWS_CATEGORIES)[number]["slug"];

export function getCategory(slug: string) {
  return NEWS_CATEGORIES.find((c) => c.slug === slug);
}

/** Hygraph の category 値（"News" 等）→ サイト内 slug */
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
  /** HTML 文字列（Hygraph の RichText.html を想定） */
  contentHtml: string;
  category: CategorySlug;
  tags: string[];
  author: string;
  publishedAt: string; // ISO
  updatedAt: string; // ISO
  coverImageUrl?: string;
};

const ENDPOINT = process.env.HYGRAPH_ENDPOINT;
const TOKEN = process.env.HYGRAPH_TOKEN;

// お知らせは更新頻度が低いため ISR（1時間）でキャッシュ。
const REVALIDATE_SECONDS = 3600;

type HygraphPost = {
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: { html?: string | null } | null;
  category?: string | null;
  tags?: string[] | null;
  author?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  coverImage?: { url?: string | null } | null;
};

function mapPost(p: HygraphPost): Post {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    contentHtml: p.content?.html ?? "",
    category: categorySlugFromHygraph(p.category ?? "News"),
    tags: p.tags ?? [],
    author: p.author ?? "NodeFlare 編集部",
    publishedAt: p.publishedAt ?? new Date(0).toISOString(),
    updatedAt: p.updatedAt ?? p.publishedAt ?? new Date(0).toISOString(),
    coverImageUrl: p.coverImage?.url ?? undefined,
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
  author
  publishedAt
  updatedAt
  coverImage { url }
`;

/** 全お知らせを公開日の新しい順で取得。limit で件数制限。 */
export async function getPosts(limit?: number): Promise<Post[]> {
  const data = await hygraphFetch<{ posts: HygraphPost[] }>(
    `query Posts($first: Int) {
      posts(orderBy: publishedAt_DESC, first: $first) { ${POST_FIELDS} }
    }`,
    { first: limit ?? 100 },
  );

  const posts = data?.posts?.map(mapPost) ?? [...FALLBACK_POSTS];
  posts.sort(
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
    `query PostsByCategory($category: String!, $first: Int) {
      posts(where: { category: $category }, orderBy: publishedAt_DESC, first: $first) {
        ${POST_FIELDS}
      }
    }`,
    { category: category.hygraph, first: limit ?? 100 },
  );

  let posts =
    data?.posts?.map(mapPost) ??
    FALLBACK_POSTS.filter((p) => p.category === slug);

  posts = posts.filter((p) => p.category === slug);
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

  if (data) return data.post ? mapPost(data.post) : null;
  return FALLBACK_POSTS.find((p) => p.slug === slug) ?? null;
}

/** 全スラッグ（generateStaticParams 用）。 */
export async function getAllPostSlugs(): Promise<
  { category: CategorySlug; slug: string }[]
> {
  const posts = await getPosts();
  return posts.map((p) => ({ category: p.category, slug: p.slug }));
}

/* ------------------------------------------------------------------ *
 * フォールバック用サンプルデータ（Hygraph 未設定時のみ使用）
 * ------------------------------------------------------------------ */
const FALLBACK_POSTS: Post[] = [
  {
    slug: "nodeflare-launch",
    title: "MCP ホスティングプラットフォーム「NodeFlare」を提供開始しました",
    excerpt:
      "AI エージェント時代のバックエンド基盤として、MCP サーバーを本番品質で運用できるプラットフォーム「NodeFlare」の提供を開始しました。",
    contentHtml:
      "<p>この度、MCP（Model Context Protocol）サーバーをスケーラブルかつ安全に運用できるマネージドホスティングプラットフォーム「NodeFlare」の提供を開始いたしました。</p><h2>NodeFlare とは</h2><p>デプロイ・スケーリング・監視・アクセス制御をワンストップで提供し、AI エージェント時代のバックエンドを支えます。</p>",
    category: "news",
    tags: ["プレスリリース", "NodeFlare", "MCP"],
    author: "NodeFlare 編集部",
    publishedAt: "2025-06-01T09:00:00.000Z",
    updatedAt: "2025-06-01T09:00:00.000Z",
  },
  {
    slug: "webassembly-edge-performance",
    title: "エッジで動く WebAssembly のパフォーマンス最適化事例",
    excerpt:
      "Rust で実装した WebAssembly モジュールをエッジで動かし、レイテンシを大幅に削減した事例を紹介します。",
    contentHtml:
      "<p>本記事では、Rust による WebAssembly モジュールをエッジ環境で動作させ、体感速度を改善した取り組みを解説します。</p><h2>背景</h2><p>ネイティブに迫る実行速度と高い移植性の両立が鍵でした。</p>",
    category: "webassembly",
    tags: ["WebAssembly", "Rust", "Edge"],
    author: "NodeFlare 編集部",
    publishedAt: "2025-05-20T09:00:00.000Z",
    updatedAt: "2025-05-22T09:00:00.000Z",
  },
  {
    slug: "security-assessment-checklist",
    title: "エンタープライズ向け脆弱性診断のチェックリスト",
    excerpt:
      "診断して終わりにしない。修正対応まで見据えた脆弱性診断の観点を整理しました。",
    contentHtml:
      "<p>脆弱性診断は「見つける」だけでなく「直し切る」ことが重要です。本記事では実務で用いている観点を共有します。</p><h2>主要な観点</h2><ul><li>認証・認可</li><li>入力値検証</li><li>依存ライブラリの管理</li></ul>",
    category: "security",
    tags: ["Security", "脆弱性診断"],
    author: "NodeFlare 編集部",
    publishedAt: "2025-05-10T09:00:00.000Z",
    updatedAt: "2025-05-10T09:00:00.000Z",
  },
  {
    slug: "core-web-vitals-nextjs",
    title: "Next.js で Core Web Vitals を改善する実践ポイント",
    excerpt:
      "Server Components とキャッシュ戦略を軸に、Core Web Vitals を改善する実践的な手順をまとめました。",
    contentHtml:
      "<p>Core Web Vitals の改善は、計測から始まります。本記事では Next.js における実践的なアプローチを紹介します。</p><h2>計測</h2><p>まずは現状を数値で把握することが第一歩です。</p>",
    category: "performance",
    tags: ["Performance", "Next.js", "Core Web Vitals"],
    author: "NodeFlare 編集部",
    publishedAt: "2025-04-28T09:00:00.000Z",
    updatedAt: "2025-04-28T09:00:00.000Z",
  },
  {
    slug: "company-established",
    title: "株式会社NodeFlare を設立しました",
    excerpt:
      "技術で社会の基盤をつくることを目指し、株式会社NodeFlare を設立しました。",
    contentHtml:
      "<p>この度、株式会社NodeFlare を設立いたしました。速く・安全で・信頼できるソフトウェア基盤の提供を通じて、社会に貢献してまいります。</p>",
    category: "news",
    tags: ["お知らせ", "会社設立"],
    author: "NodeFlare 編集部",
    publishedAt: "2024-11-01T09:00:00.000Z",
    updatedAt: "2024-11-01T09:00:00.000Z",
  },
  {
    slug: "wasm-rust-go-comparison",
    title: "Rust と Go で書く WebAssembly：使い分けの指針",
    excerpt:
      "WebAssembly を Rust と Go のどちらで実装するか。実務での使い分けの指針を整理しました。",
    contentHtml:
      "<p>WebAssembly モジュールの実装言語選定について、実務での判断基準を紹介します。</p><h2>指針</h2><p>要件・チームの習熟度・バイナリサイズなどを総合的に判断します。</p>",
    category: "webassembly",
    tags: ["WebAssembly", "Rust", "Go"],
    author: "NodeFlare 編集部",
    publishedAt: "2025-03-15T09:00:00.000Z",
    updatedAt: "2025-03-15T09:00:00.000Z",
  },
];
