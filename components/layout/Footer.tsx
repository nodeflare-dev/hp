import Link from "next/link";
import { SITE, NAV } from "@/lib/site";
import { NEWS_CATEGORIES } from "@/lib/news";
import { Logo } from "./Logo";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "企業情報",
    links: [
      { label: "会社概要", href: "/company" },
      { label: "代表メッセージ", href: "/company#message" },
      { label: "沿革", href: "/company#history" },
      { label: "採用情報", href: "/recruit" },
    ],
  },
  {
    title: "事業・プロダクト",
    links: [
      { label: "事業内容", href: "/business" },
      { label: "NodeFlare", href: "/products/nodeflare" },
      { label: "プロダクト", href: "/products" },
      { label: "技術", href: "/technology" },
    ],
  },
  {
    title: "お知らせ",
    links: NEWS_CATEGORIES.map((c) => ({
      label: c.label,
      href: c.slug === "news" ? "/news" : `/news/${c.slug}`,
    })),
  },
];

/** リンク（先頭に › を付ける）。 */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-[1rem] text-ink-soft transition-colors hover:text-primary"
    >
      <span aria-hidden className="text-2xl leading-none text-muted transition-colors group-hover:text-primary">
        ›
      </span>
      {label}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#EFEFEF] text-ink">
      <div className="mx-auto max-w-[88rem] px-6 pb-14 pt-20 sm:px-8 lg:px-12">
        {/* 中段：リンク */}
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <ul className="space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <FooterLink href={l.href} label={l.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 下段：法務・コピーライト */}
        <div className="flex flex-col gap-6 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="フッターナビゲーション">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8rem] text-ink-soft">
              {NAV.filter((n) => n.href !== "/").map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-primary">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/terms" className="transition-colors hover:text-primary">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-primary">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </nav>
          <p className="index-num text-[0.7rem] text-muted">
            © {year} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
