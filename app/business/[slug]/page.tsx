/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { BUSINESSES, getBusiness, SITE } from "@/lib/site";
import { IMG } from "@/lib/images";

const BIZ_IMAGES: Record<string, string> = {
  nodeflare: IMG.bizNodeflare,
  webassembly: IMG.bizWasm,
  security: IMG.bizSecurity,
  performance: IMG.bizPerformance,
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

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-ink text-white">
        {img && (
          <div aria-hidden className="absolute inset-0">
            <img
              src={img}
              alt=""
              className="h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/40" />
          </div>
        )}
        <Container className="relative pb-20 pt-3 sm:pb-24 sm:pt-4">
          <Breadcrumbs
            items={[
              { label: "事業内容", href: "/business" },
              { label: business.title, href: `/business/${business.id}` },
            ]}
          />
          <div className="mt-12 max-w-2xl">
            <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-white/40">
              {business.subtitle}
            </p>
            <h1 className="mt-4 text-[2.8rem] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-[4rem]">
              {business.title}
            </h1>
            <div aria-hidden className="my-8 h-px w-12 bg-primary" />
            <p className="text-[1rem] leading-8 text-white/65">{business.summary}</p>
          </div>
        </Container>
      </section>

      {/* ─── 概要 ─── */}
      <section className="bg-surface py-24 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
            <div>
              <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-muted">
                Overview
              </p>
              <h2 className="mt-4 text-[1.9rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.35rem]">
                サービス概要
              </h2>
              <div aria-hidden className="my-7 h-px w-10 bg-primary" />
              <p className="text-[1rem] leading-9 text-muted">{business.description}</p>
            </div>
            <Placeholder ratio="4/3" tone="dark" />
          </div>
        </Container>
      </section>

      {/* ─── 提供内容 ─── */}
      <section className="bg-ink py-24 text-white sm:py-28">
        <Container>
          <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-8">
            <h2 className="text-[1.9rem] font-medium tracking-[-0.02em] text-white sm:text-[2.35rem]">
              提供内容
            </h2>
            <span className="shrink-0 text-[0.68rem] font-normal uppercase tracking-[0.26em] text-white/25">
              Features
            </span>
          </div>
          <ul className="mt-2">
            {business.features.map((f, i) => (
              <li
                key={f}
                className="flex items-start gap-8 border-b border-white/10 py-8 last:border-0"
              >
                <span className="shrink-0 pt-1 font-mono text-[0.62rem] font-normal text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[1rem] leading-8 text-white/80">{f}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <Button href="/contact" variant="invert" withArrow>
              この事業について相談する
            </Button>
          </div>
        </Container>
      </section>

      {/* ─── 他事業 ─── */}
      <section className="bg-background py-24 sm:py-28">
        <Container>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-[1.9rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.35rem]">
              その他の事業
            </h2>
            <Link
              href="/business"
              className="group shrink-0 inline-flex items-center gap-2 text-sm font-normal text-ink"
            >
              一覧を見る
              <span
                aria-hidden
                className="text-muted transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
          <div className="mt-10 grid gap-px sm:grid-cols-3">
            {others.map((b) => {
              const bImg = BIZ_IMAGES[b.id];
              return (
                <Link
                  key={b.id}
                  href={`/business/${b.id}`}
                  className="group block overflow-hidden bg-surface"
                >
                  <div className="overflow-hidden">
                    <div className="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                      {bImg ? (
                        <div className="aspect-[16/9]">
                          <img
                            src={bImg}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <Placeholder ratio="16/9" tone="dark" />
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[0.62rem] font-normal uppercase tracking-[0.18em] text-muted">
                      {b.subtitle}
                    </p>
                    <h3 className="mt-2 text-[1.05rem] font-medium text-ink transition-colors group-hover:text-primary">
                      {b.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[0.85rem] leading-6 text-muted">
                      {b.summary}
                    </p>
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
