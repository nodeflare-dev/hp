/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { BUSINESSES } from "@/lib/site";

const BIZ_IMAGES: Record<string, string> = {
  nodeflare: "/nodeflare.png",
  webassembly: "/wasm.png",
  security: "/security.png",
  performance: "/performance.png",
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
      <section className="bg-white pb-12 pt-3 sm:pb-16 sm:pt-4">
        <Container>
          <Breadcrumbs items={[{ label: "事業内容", href: "/business" }]} />
          <h1 className="mt-6 text-[1.65rem] font-bold tracking-tight text-[#333333] sm:text-[2rem]">
            事業内容
          </h1>
          <p className="mt-3 text-[1.05rem] leading-8 text-[#333333]">
            事業を支えるソフトウェア基盤を、4 つの領域で提供します。
          </p>
        </Container>
      </section>

      {/* ─── Business list ─── */}
      <section className="bg-surface py-4">
        {BUSINESSES.map((b, i) => {
          const even = i % 2 === 0;
          const img = BIZ_IMAGES[b.id];
          return (
            <div key={b.id} className="mb-1 last:mb-0">
              <Link href={`/business/${b.id}`} className="group block">
                <div className="mx-auto max-w-7xl">
                  <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch">
                    {/* 写真 */}
                    <div
                      className={`overflow-hidden ${
                        !even ? "lg:order-2" : ""
                      }`}
                    >
                      <div className="h-full overflow-hidden">
                        <div className="h-full min-h-[180px]">
                          {img ? (
                            <img
                              src={img}
                              alt=""
                              className="h-full w-full object-cover object-center"
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
                      className={`flex flex-col justify-center bg-ink px-8 py-8 ${
                        even ? "lg:pl-12 lg:pr-8" : "lg:order-1 lg:pl-8 lg:pr-12"
                      }`}
                    >
                      <span className="text-[0.62rem] font-normal uppercase tracking-[0.2em] text-white/40">
                        {b.subtitle}
                      </span>
                      <h2 className="mt-4 text-[1.1rem] font-bold tracking-[-0.02em] text-white sm:text-[1.3rem]">
                        {b.title}
                      </h2>
                      <p className="mt-5 text-[1.1rem] leading-[2.0] text-white">{b.summary}</p>
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
