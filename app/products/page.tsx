/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { IMG } from "@/lib/images";

export const metadata: Metadata = buildMetadata({
  title: "プロダクト",
  description:
    "NodeFlare が提供するプロダクト。MCP ホスティングプラットフォーム「NodeFlare」をご紹介します。",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-ink text-white">
        <Container className="pb-20 pt-3 sm:pb-24 sm:pt-4">
          <Breadcrumbs items={[{ label: "プロダクト", href: "/products" }]} />
          <div className="mt-14">
            <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-white/40">
              Product
            </p>
            <h1 className="mt-3 text-[1.65rem] font-bold tracking-tight text-white sm:text-[2rem]">
              プロダクト
            </h1>
            <p className="mt-6 max-w-lg text-[1rem] leading-8 text-white/60">
              自社開発プロダクトをご紹介します。
            </p>
          </div>
        </Container>
      </section>

      {/* ─── NodeFlare ─── */}
      <section className="bg-surface py-24 sm:py-28">
        <Container>
          <Link href="/products/nodeflare" className="group block">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
              {/* 写真 */}
              <div className="overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
                  <img
                    src={IMG.product}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* テキスト */}
              <div>
                <p className="text-[0.7rem] font-normal uppercase tracking-[0.24em] text-muted">
                  MCP Hosting Platform
                </p>
                <h2 className="mt-4 text-[2.8rem] font-medium tracking-[-0.03em] text-ink transition-colors group-hover:text-primary sm:text-[3.5rem]">
                  NodeFlare
                </h2>
                <div aria-hidden className="my-6 h-px w-10 bg-primary" />
                <p className="text-[1rem] leading-8 text-muted">
                  MCP サーバーをスケーラブルかつ安全に運用するためのマネージドホスティングプラットフォーム。
                  デプロイ・スケーリング・監視・アクセス制御をワンストップで提供します。
                </p>
                <div className="mt-10">
                  <Button href="/products/nodeflare" variant="primary" withArrow>
                    詳細を見る
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </Container>
      </section>
    </>
  );
}
