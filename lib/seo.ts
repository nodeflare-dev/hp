import type { Metadata } from "next";
import { SITE } from "./site";

export const metadataBase = new URL(SITE.url);

/** ページ共通のメタデータを組み立てるヘルパー。 */
export function buildMetadata(opts: {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  images?: string[];
  noIndex?: boolean;
}): Metadata {
  const { title, description, path = "/", type = "website" } = opts;
  const canonical = path;
  const desc = description ?? SITE.description;

  return {
    title,
    description: desc,
    alternates: { canonical },
    robots: opts.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      url: canonical,
      title: title ?? SITE.nameJa,
      description: desc,
      siteName: SITE.nameJa,
      locale: SITE.locale,
      // images 未指定時は app/opengraph-image.tsx（file convention）が自動適用される
      ...(opts.images ? { images: opts.images } : {}),
      ...(type === "article"
        ? {
            publishedTime: opts.publishedTime,
            modifiedTime: opts.modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? SITE.nameJa,
      description: desc,
      ...(opts.images ? { images: opts.images } : {}),
    },
  };
}
