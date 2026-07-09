/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { BUSINESSES } from "@/lib/site";
import { IMG } from "@/lib/images";

const BIZ_IMAGES: Record<string, string> = {
  nodeflare: IMG.bizNodeflare,
  webassembly: IMG.bizWasm,
  security: IMG.bizSecurity,
  performance: IMG.bizPerformance,
};

export const metadata: Metadata = buildMetadata({
  title: "事業内容",
  description:
    "NodeFlare の 4 事業（MCP ホスティング / WebAssembly 開発 / セキュリティ診断・修正 / パフォーマンス診断・改善）をご紹介します。",
  path: "/business",
});

export default function BusinessPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-ink text-white">
        <Container className="pb-20 pt-10 sm:pb-24 sm:pt-12">
          <Breadcrumbs items={[{ label: "事業内容", href: "/business" }]} />
          <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-white/40">
                Business
              </p>
              <h1 className="mt-3 text-[3rem] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-[4rem]">
                事業内容
              </h1>
              <p className="mt-6 max-w-lg text-[1rem] leading-8 text-white/60">
                事業を支えるソフトウェア基盤を、4 つの領域で提供します。
              </p>
            </div>
            <div className="pb-1 text-right">
              <p className="font-mono text-[5rem] font-medium leading-none tracking-[-0.05em] text-white/8 sm:text-[7rem]">
                4
              </p>
              <p className="text-[0.62rem] font-normal uppercase tracking-[0.3em] text-white/25">
                Domains
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Business list ─── */}
      <section className="bg-surface">
        {BUSINESSES.map((b, i) => {
          const even = i % 2 === 0;
          const num = String(i + 1).padStart(2, "0");
          const img = BIZ_IMAGES[b.id];
          return (
            <div key={b.id} className="border-b border-line last:border-0">
              <Link href={`/business/${b.id}`} className="group block">
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                  <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-center">
                    {/* 写真 */}
                    <div
                      className={`overflow-hidden py-8 sm:py-10 ${
                        !even ? "lg:order-2" : ""
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="aspect-[16/10] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
                          {img ? (
                            <img
                              src={img}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div
                              className="h-full w-full"
                              style={{
                                background:
                                  "linear-gradient(135deg, #16171d 0%, #1e1f28 50%, #2a2333 100%)",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* テキスト */}
                    <div
                      className={`pb-10 lg:py-16 ${
                        even ? "lg:pl-16" : "lg:order-1 lg:pr-16"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[0.62rem] font-normal text-muted">
                          {num}
                        </span>
                        <div aria-hidden className="h-px w-5 bg-line" />
                        <span className="text-[0.62rem] font-normal uppercase tracking-[0.2em] text-muted">
                          {b.subtitle}
                        </span>
                      </div>
                      <h2 className="mt-5 text-[2rem] font-medium tracking-[-0.02em] text-ink transition-colors group-hover:text-primary sm:text-[2.5rem]">
                        {b.title}
                      </h2>
                      <div aria-hidden className="my-6 h-px w-10 bg-primary" />
                      <p className="text-[0.97rem] leading-8 text-muted">{b.summary}</p>
                      <span className="mt-8 inline-flex items-center gap-3 text-[0.85rem] font-normal text-ink">
                        詳細を見る
                        <span
                          aria-hidden
                          className="text-primary transition-transform duration-300 group-hover:translate-x-1.5"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </>
  );
}
