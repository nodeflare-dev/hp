import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { buildMetadata } from "@/lib/seo";
import { BUSINESSES } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "事業内容",
  description:
    "NodeFlare の 4 事業（MCP ホスティング / WebAssembly 開発 / セキュリティ診断・修正 / パフォーマンス診断・改善）をご紹介します。",
  path: "/business",
});

export default function BusinessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Business"
        title="事業内容"
        description="事業を支えるソフトウェア基盤を、4 つの領域で提供します。"
        crumbs={[{ label: "事業内容", href: "/business" }]}
      />

      <Section background="surface">
        <div className="grid gap-x-10 gap-y-16 lg:grid-cols-2">
          {BUSINESSES.map((b) => (
            <Link
              key={b.id}
              href={`/business/${b.id}`}
              className="group grid gap-6 sm:grid-cols-[1fr_1.1fr] sm:items-center"
            >
              <div className="overflow-hidden">
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                  <Placeholder ratio="4/3" tone="dark" />
                </div>
              </div>
              <div>
                <h2 className="text-[1.4rem] font-medium tracking-tight text-ink transition-colors group-hover:text-primary">
                  {b.title}
                </h2>
                <p className="mt-1 text-[0.72rem] font-normal uppercase tracking-[0.16em] text-muted">
                  {b.subtitle}
                </p>
                <p className="mt-4 text-[0.92rem] leading-7 text-muted">
                  {b.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[0.82rem] font-normal text-ink">
                  詳細を見る
                  <span aria-hidden className="text-muted transition-transform duration-300 group-hover:translate-x-1">
                    ›
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
