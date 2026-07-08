import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
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
      <PageHeader
        eyebrow="MCP Hosting Platform"
        title="NodeFlare"
        description="MCP サーバーを、本番品質でホスティングする。"
        crumbs={[
          { label: "プロダクト", href: "/products" },
          { label: "NodeFlare", href: "/products/nodeflare" },
        ]}
      />

      <Section background="surface">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Overview" title="NodeFlare とは" />
            <p className="mt-6 text-base leading-8 text-muted">
              {nodeflare?.description}
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" withArrow>
                導入について相談する
              </Button>
            </div>
          </div>
          <Placeholder label="NodeFlare 製品イメージ" ratio="4/3" />
        </div>
      </Section>

      <Section background="muted">
        <SectionHeading
          eyebrow="Features"
          title="主な機能"
          description="AI エージェント時代のバックエンドに求められる要件を、標準で満たします。"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="border border-line bg-surface p-8"
            >
              <div className="grid h-11 w-11 place-items-center border border-primary/30 text-ink">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 15.5L12 4l8 11.5-8 4.5-8-4.5z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-normal text-ink">{f.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-ink">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <h2 className="text-3xl font-medium text-white sm:text-4xl">
            NodeFlare を導入しませんか？
          </h2>
          <p className="mt-5 text-base leading-8 text-white/70">
            要件のヒアリングから導入まで、専任の担当者がサポートします。まずはお気軽にご相談ください。
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="/contact" variant="invert" withArrow>
              お問い合わせ
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
