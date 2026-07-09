import Link from "next/link";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export type Crumb = { label: string; href: string };

/**
 * パンくずリスト（表示 + 構造化データ）。
 * items にはトップ（HOME）を含めず、現在地までの階層を渡す。
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "HOME", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE.url}${c.href === "/" ? "" : c.href}`,
    })),
  };

  return (
    <nav aria-label="パンくずリスト" className="text-sm text-muted">
      <JsonLd data={jsonLd} />
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span className="text-ink" aria-current="page">
                  {c.label}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className="text-primary transition-colors hover:text-primary/70"
                >
                  {c.label}
                </Link>
              )}
              {!last && (
                <span aria-hidden="true" className="text-ink">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
