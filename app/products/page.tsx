import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "プロダクト",
  description:
    "NodeFlare が提供するプロダクト。MCP ホスティングプラットフォーム「NodeFlare」をご紹介します。",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="プロダクト"
        description="自社開発のプロダクトをご紹介します。"
        crumbs={[{ label: "プロダクト", href: "/products" }]}
      />

      <Section background="surface">
        <Link
          href="/products/nodeflare"
          className="group grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
        >
          <div className="overflow-hidden">
            <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
              <Placeholder ratio="4/3" tone="dark" />
            </div>
          </div>
          <div>
            <p className="text-[0.72rem] font-normal uppercase tracking-[0.16em] text-muted">
              MCP Hosting Platform
            </p>
            <h2 className="mt-3 text-[2rem] font-medium tracking-tight text-ink transition-colors group-hover:text-primary sm:text-[2.4rem]">
              NodeFlare
            </h2>
            <p className="mt-6 text-[1rem] leading-8 text-muted">
              MCP サーバーをスケーラブルかつ安全に運用するためのマネージドホスティングプラットフォーム。
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-[0.9rem] font-normal text-ink">
              Learn More
              <span aria-hidden className="text-muted transition-transform duration-300 group-hover:translate-x-1">
                ›
              </span>
            </span>
          </div>
        </Link>
      </Section>
    </>
  );
}
