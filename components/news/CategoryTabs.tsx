import Link from "next/link";
import { NEWS_CATEGORIES } from "@/lib/news";

/** お知らせのカテゴリー切り替えタブ（矩形・下線基調）。 */
export function CategoryTabs({ active }: { active: string }) {
  const tabs = [
    { slug: "", label: "すべて", href: "/news" },
    ...NEWS_CATEGORIES.map((c) => ({
      slug: c.slug,
      label: c.label,
      href: c.slug === "news" ? "/news/news" : `/news/${c.slug}`,
    })),
  ];

  return (
    <nav aria-label="カテゴリー" className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line">
      {tabs.map((t) => {
        const isActive = active === t.slug;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative -mb-px border-b-2 pb-4 text-sm font-normal transition-colors ${
              isActive
                ? "border-primary text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
