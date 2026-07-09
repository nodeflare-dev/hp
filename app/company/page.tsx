/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { IMG } from "@/lib/images";
import { SITE, COMPANY_PROFILE, PHILOSOPHY, HISTORY, CEO_MESSAGE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "企業情報",
  description:
    "株式会社NodeFlare の会社概要・代表メッセージ・Mission / Vision / Value・沿革をご紹介します。",
  path: "/company",
});

export default function CompanyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "企業情報",
          url: `${SITE.url}/company`,
        }}
      />

      {/* ─── ページタイトル ─── */}
      <section className="border-b border-line bg-white pb-12 pt-3 sm:pb-16 sm:pt-4">
        <Container>
          <Breadcrumbs items={[{ label: "企業情報", href: "/company" }]} />
          <h1 className="mt-6 text-[1.65rem] font-bold tracking-tight text-[#333333] sm:text-[2rem]">
            企業情報
          </h1>
          <p className="mt-3 text-[1.05rem] leading-8 text-[#333333]">
            技術で、社会の基盤をつくる。私たちの理念と歩みをご紹介します。
          </p>
        </Container>
      </section>

      {/* ─── 会社概要 ─── */}
      <section id="profile" className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-[1.05rem] font-bold text-[#333333]">
            会社概要
          </h2>
          <dl>
            {COMPANY_PROFILE.map((row) => (
              <div
                key={row.label}
                className="grid border-b border-line py-4 first:border-t sm:grid-cols-[180px_1fr] sm:py-5"
              >
                <dt className="mb-1 text-[0.83rem] text-muted sm:mb-0">{row.label}</dt>
                <dd className="text-[0.93rem] leading-7 text-[#333333]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ─── 代表メッセージ ─── */}
      <section id="message" className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
            <div>
              <Placeholder ratio="3/4" tone="light" />
              <p className="mt-3 text-[0.8rem] text-muted">{CEO_MESSAGE.name}</p>
            </div>
            <div>
              <h2 className="mb-10 text-[1.05rem] font-bold text-ink">
                代表メッセージ
              </h2>
              {CEO_MESSAGE.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-[1.05rem] leading-[2.1] text-[#333333]${i > 0 ? " mt-8" : ""}`}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 経営理念 ─── */}
      <section id="philosophy">
        {/* 写真コンテナ：relative でカードの絶対配置基準になる */}
        <div className="relative">
          <img
            src={IMG.heroCompany}
            alt=""
            className="h-[260px] w-full object-cover object-center sm:h-[360px] lg:h-[420px]"
          />
          {/* sm以上: absolute bottom-0 + translate-y-1/2 で写真下端に半身はみ出す */}
          <div className="sm:absolute sm:inset-x-0 sm:bottom-0 sm:z-10 sm:translate-y-1/2">
            <Container>
              <div className="grid rounded-xl border border-ink/25 bg-white divide-y divide-ink/25 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {/* Mission */}
                <Link href="/company/philosophy/mission" className="group flex flex-col p-4 transition-colors hover:bg-surface sm:p-6">
                  <p className="text-[1.05rem] font-bold text-ink transition-colors group-hover:text-primary">Mission</p>
                  <p className="mt-3 flex-1 text-[0.92rem] leading-7 text-ink/90">
                    {PHILOSOPHY.mission.heading}{" "}{PHILOSOPHY.mission.body}
                  </p>
                  <div className="mt-5 flex justify-end">
                    <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-white transition-all duration-200 group-hover:bg-primary group-hover:translate-x-0.5">
                      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
                        <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
                {/* Vision */}
                <Link href="/company/philosophy/vision" className="group flex flex-col p-4 transition-colors hover:bg-surface sm:p-6">
                  <p className="text-[1.05rem] font-bold text-ink transition-colors group-hover:text-primary">Vision</p>
                  <p className="mt-3 flex-1 text-[0.92rem] leading-7 text-ink/90">
                    {PHILOSOPHY.vision.heading}{" "}{PHILOSOPHY.vision.body}
                  </p>
                  <div className="mt-5 flex justify-end">
                    <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-white transition-all duration-200 group-hover:bg-primary group-hover:translate-x-0.5">
                      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
                        <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
                {/* Value — 2列グリッド */}
                <Link href="/company/philosophy/value" className="group flex flex-col p-4 transition-colors hover:bg-surface sm:p-6">
                  <p className="text-[1.05rem] font-bold text-ink transition-colors group-hover:text-primary">Value</p>
                  <ul className="mt-3 flex-1 grid grid-cols-2 gap-x-4 gap-y-4">
                    {PHILOSOPHY.value.items.map((item) => (
                      <li key={item.title}>
                        <p className="text-[0.82rem] font-semibold text-ink">{item.title}</p>
                        <p className="mt-0.5 text-[0.82rem] leading-5 text-ink/75">{item.summary}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex justify-end">
                    <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-white transition-all duration-200 group-hover:bg-primary group-hover:translate-x-0.5">
                      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
                        <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            </Container>
          </div>
        </div>
        {/* 写真の下：白背景エリア。sm以上はカード下半分のスペース + CTA */}
        <div className="bg-white pb-10 sm:pb-14 sm:pt-40 lg:pt-44" />
      </section>

      {/* ─── 沿革 ─── */}
      <section id="history" className="bg-white py-16 sm:py-24">
        <Container>
          <h2 className="mb-8 text-[1.05rem] font-bold text-[#333333]">
            沿革
          </h2>
          <dl>
            {HISTORY.map((h, i) => (
              <div
                key={i}
                className="grid border-b border-line py-4 first:border-t sm:grid-cols-[140px_1fr] sm:py-5"
              >
                <dt className="mb-1 font-mono text-[0.8rem] text-muted sm:mb-0">{h.year}</dt>
                <dd className="text-[1.05rem] leading-[2.1] text-[#333333]">{h.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
