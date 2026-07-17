import type { MetadataRoute } from "next";
import { SITE, BUSINESSES } from "@/lib/site";
import { NEWS_CATEGORIES, getPosts } from "@/lib/news";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/company`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/business`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/technology`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/news`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/recruit`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const businessRoutes: MetadataRoute.Sitemap = BUSINESSES.map((b) => ({
    url: `${base}/business/${b.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = NEWS_CATEGORIES.map((c) => ({
    url: `${base}/news/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const posts = await getPosts();
  const articleRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/news/${p.category}/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...businessRoutes,
    ...categoryRoutes,
    ...articleRoutes,
  ];
}
