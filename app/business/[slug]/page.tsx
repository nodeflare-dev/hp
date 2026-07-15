/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { BUSINESSES, getBusiness, SITE } from "@/lib/site";
import { IMG } from "@/lib/images";

const FEAT_BG = IMG.featBg;

const BIZ_IMAGES: Record<string, string> = {
  nodeflare: "/nodeflare.png",
  webassembly: "/wasm.png",
  security: "/security.png",
  performance: "/performance.png",
};

const OVERVIEW_IMAGES: Record<string, string> = {
  security: "/security2.png",
  webassembly: "/wasm2.png",
  performance: "/performance2.png",
  nodeflare: "/nodeflare2.png",
};

export function generateStaticParams() {
  return BUSINESSES.map((b) => ({ slug: b.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) return {};
  return buildMetadata({
    title: `${business.title} | 事業内容`,
    description: business.description,
    path: `/business/${business.id}`,
  });
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: business.title,
    serviceType: business.subtitle,
    description: business.description,
    provider: { "@type": "Organization", name: SITE.nameJa, url: SITE.url },
    url: `${SITE.url}/business/${business.id}`,
  };

  const others = BUSINESSES.filter((b) => b.id !== business.id);
  const img = BIZ_IMAGES[business.id];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ─── HERO: タイトル ─── */}
      <section className="bg-white pb-12 pt-3 sm:pb-16 sm:pt-4">
        <Container>
          <Breadcrumbs
            items={[
              { label: "事業内容", href: "/business" },
              { label: business.title, href: `/business/${business.id}` },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <h1 className="text-[1.2rem] font-bold leading-tight tracking-[-0.02em] text-[#333333] sm:text-[1.4rem]">
              {business.title}
            </h1>
            <p className="mt-3 text-[0.95rem] leading-[1.9] text-[#333333]">{business.summary}</p>
          </div>
        </Container>
      </section>


      {/* ─── サービス概要 ─── */}
      <section className="bg-white pb-10 pt-0 sm:pb-14">
        <Container>
          {OVERVIEW_IMAGES[business.id] ? (
            <div className="grid items-center gap-10 sm:grid-cols-2 lg:gap-16">
              <div className="overflow-hidden">
                <img
                  src={OVERVIEW_IMAGES[business.id]}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[1.45rem] leading-[2.2] text-[#333333]">{business.description}</p>
              </div>
            </div>
          ) : (
            <p className="max-w-3xl text-[1.25rem] leading-[2.2] text-[#333333]">{business.description}</p>
          )}
        </Container>
      </section>

      {/* ─── 提供内容 ─── */}
      <div>
        {/* 背景写真エリア（縦幅短め） */}
        <div className="relative">
          <div className="relative h-[300px] w-full overflow-hidden bg-cover bg-center sm:h-[360px]" style={{ backgroundImage: "url('/bg2.png')" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pb-24 text-center sm:pb-32">
              <h2 className="text-[1.6rem] font-bold tracking-[-0.02em] text-white sm:text-[2rem]">
                What We Deliver
              </h2>
              <p className="max-w-6xl text-[1.3rem] font-bold leading-10 text-white">
                {business.title}が生み出す成果を、具体的な数字でお伝えします。<br />
                私たちは単なる技術提供にとどまらず、クライアントのビジネスに直接貢献する成果にコミットします。
              </p>
            </div>
          </div>

          {/* カード: 下端から半分はみ出し */}
          <div className="sm:absolute sm:inset-x-0 sm:bottom-0 sm:translate-y-1/2">
            <div className="mx-auto w-full max-w-7xl px-2 sm:px-4">
              <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {business.features.map((f) => (
                  <li key={f.stat} className="rounded-xl border border-[#aaa] bg-[#f4f4f5] px-8 py-10">
                    <p className="text-[2.2rem] font-bold leading-none text-[#333333]">{f.stat}</p>
                    <p className="mt-4 text-[1.1rem] font-medium leading-7 text-[#333333]">{f.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* カードの下半分分の余白 + CTA */}
        <div className="bg-surface pb-20 sm:pb-24 sm:pt-52">
          <Container>
            <div className="mt-6 sm:mt-0">
              <Button href="/contact" withArrow>
                この事業について相談する
              </Button>
            </div>
          </Container>
        </div>
      </div>

      {/* ─── 他事業 ─── */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-[1.6rem] font-bold tracking-[-0.02em] text-[#333333] sm:text-[2rem]">
              その他の事業
            </h2>
            <Link
              href="/business"
              className="group shrink-0 inline-flex items-center gap-2 text-sm font-normal text-[#333333]"
            >
              一覧を見る
              <span aria-hidden className="text-muted transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {others.map((b) => {
              const bImg = BIZ_IMAGES[b.id];
              return (
                <Link
                  key={b.id}
                  href={`/business/${b.id}`}
                  className="group block"
                >
                  {bImg && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={bImg}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="mt-4">
                    <h3 className="text-[1.05rem] font-bold text-[#333333]">{b.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-7 text-muted">{b.subtitle}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
