import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { SITE, getBusiness } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "NodeFlare | プロダクト",
  description:
    "MCP サーバーをスケーラブルかつ安全に運用するマネージドホスティングプラットフォーム「NodeFlare」の詳細をご紹介します。",
  path: "/products/nodeflare",
});

const FEATURES = [
  {
    title: "マネージドホスティング",
    body: "MCP サーバーのデプロイから運用までを、フルマネージドで提供します。インフラ運用の負担を最小化します。",
  },
  {
    title: "オートスケーリング",
    body: "トラフィックに応じて自動でスケール。高負荷時でも安定した応答を維持します。",
  },
  {
    title: "エンタープライズ・セキュリティ",
    body: "アクセス制御・監査ログ・暗号化により、エンタープライズ水準のセキュリティ要件に対応します。",
  },
  {
    title: "エッジ配信で低レイテンシ",
    body: "エッジネットワークを活用し、世界中のユーザーへ低レイテンシで応答します。",
  },
  {
    title: "監視・可観測性",
    body: "メトリクス・ログ・アラートを標準提供。問題の早期検知と迅速な対応を支援します。",
  },
  {
    title: "シンプルな料金体系",
    body: "使った分だけのわかりやすい料金体系で、コストを最適化できます。",
  },
];

export default function NodeFlareProductPage() {
  const nodeflare = getBusiness("nodeflare");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NodeFlare",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cloud",
    description:
      "MCP サーバーをスケーラブルかつ安全に運用するためのマネージドホスティングプラットフォーム。",
    url: `${SITE.url}/products/nodeflare`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    publisher: { "@type": "Organization", name: SITE.nameJa, url: SITE.url },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ─── HERO ─── */}
      <section className="bg-ink text-white">
        <Container className="pb-20 pt-10 sm:pb-24 sm:pt-12">
          <Breadcrumbs
            items={[
              { label: "プロダクト", href: "/products" },
              { label: "NodeFlare", href: "/products/nodeflare" },
            ]}
          />
          <div className="mt-14 max-w-3xl">
            <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-white/40">
              MCP Hosting Platform
            </p>
            <h1 className="mt-3 text-[3.5rem] font-medium leading-[1.02] tracking-[-0.04em] text-white sm:text-[5rem] lg:text-[6rem]">
              NodeFlare
            </h1>
            <div aria-hidden className="my-8 h-px w-14 bg-primary" />
            <p className="text-[1.05rem] leading-9 text-white/65">
              MCP サーバーを、本番品質でホスティングする。
            </p>
          </div>
        </Container>
      </section>

      {/* ─── 概要 + 動画 ─── */}
      <section className="bg-surface py-24 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
            <div>
              <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-muted">
                Overview
              </p>
              <h2 className="mt-4 text-[1.9rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.35rem]">
                NodeFlare とは
              </h2>
              <div aria-hidden className="my-7 h-px w-10 bg-primary" />
              <p className="text-[0.97rem] leading-9 text-muted">
                {nodeflare?.description}
              </p>
              <div className="mt-10">
                <Button href="/contact" variant="primary" withArrow>
                  導入について相談する
                </Button>
              </div>
            </div>
            <div className="overflow-hidden border border-line">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/aqz-KE-bpKQ"
                  title="NodeFlare — MCP ホスティングサービス"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 機能 ─── */}
      <section className="bg-ink py-24 text-white sm:py-28">
        <Container>
          <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-8">
            <h2 className="text-[1.9rem] font-medium tracking-[-0.02em] text-white sm:text-[2.35rem]">
              主な機能
            </h2>
            <span className="shrink-0 text-[0.68rem] font-normal uppercase tracking-[0.26em] text-white/25">
              Features
            </span>
          </div>
          <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="border-b border-white/10 py-10 pr-8 last:border-b-0"
              >
                <span className="font-mono text-[0.62rem] font-normal text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[1.05rem] font-medium text-white">
                  {f.title}
                </h3>
                <p className="mt-3 text-[0.87rem] leading-7 text-white/55">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#DCDCDC] py-24 sm:py-28">
        <Container size="narrow">
          <div className="text-center">
            <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-ink/40">
              Get Started
            </p>
            <h2 className="mt-4 text-[1.9rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.35rem]">
              NodeFlare を導入しませんか？
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[0.97rem] leading-8 text-ink/65">
              要件のヒアリングから導入まで、専任の担当者がサポートします。まずはお気軽にご相談ください。
            </p>
            <div className="mt-10 flex justify-center">
              <Button href="/contact" variant="primary" withArrow>
                お問い合わせ
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
