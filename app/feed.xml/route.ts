import { SITE } from "@/lib/site";
import { getPosts, getCategory } from "@/lib/news";
import { toRfc822 } from "@/lib/format";

export const revalidate = 3600;

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** お知らせの RSS 2.0 フィード。 */
export async function GET() {
  const posts = await getPosts(50);
  const base = SITE.url;

  const items = posts
    .map((p) => {
      const url = `${base}/news/${p.category}/${p.slug}`;
      const cat = getCategory(p.category);
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(p.excerpt)}</description>
      ${cat ? `<category>${escapeXml(cat.label)}</category>` : ""}
      <pubDate>${toRfc822(p.publishedAt)}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.nameJa)} お知らせ</title>
    <link>${base}/news</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>ja</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
