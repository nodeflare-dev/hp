/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
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

      {/* ─── HERO ─── */}
      <section className="bg-[#DCDCDC]">
        <Container className="pb-0 pt-10 sm:pt-12">
          <Breadcrumbs items={[{ label: "企業情報", href: "/company" }]} />
          <div className="mt-10 sm:mt-14">
            <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-ink/40">
              Company
            </p>
            <h1 className="mt-3 text-[3rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-[4.5rem] lg:text-[5.5rem]">
              企業情報
            </h1>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-ink/60">
              技術で、社会の基盤をつくる。私たちの理念と歩みをご紹介します。
            </p>
          </div>
          <div className="mt-12 overflow-hidden">
            <img
              src={IMG.heroCompany}
              alt=""
              className="h-[30vw] min-h-[200px] max-h-[400px] w-full object-cover object-center"
            />
          </div>
        </Container>
      </section>

      {/* ─── 会社概要 ─── */}
      <section id="profile" className="bg-surface py-24 sm:py-28">
        <Container>
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-8">
            <h2 className="text-[1.9rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.35rem]">
              会社概要
            </h2>
            <span className="shrink-0 text-[0.68rem] font-normal uppercase tracking-[0.26em] text-muted">
              Profile
            </span>
          </div>
          <dl className="divide-y divide-line">
            {COMPANY_PROFILE.map((row) => (
              <div
                key={row.label}
                className="grid gap-3 py-6 sm:grid-cols-[200px_1fr] sm:gap-10"
              >
                <dt className="text-[0.73rem] font-normal uppercase tracking-[0.14em] text-muted">
                  {row.label}
                </dt>
                <dd className="text-[0.95rem] leading-7 text-ink/80">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ─── 代表メッセージ ─── */}
      <section id="message" className="bg-ink py-24 text-white sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[360px_1fr] lg:gap-20">
            <div>
              <Placeholder ratio="3/2" tone="dark" />
              <div className="mt-5 border-l border-white/20 pl-5">
                <p className="text-[0.68rem] font-normal uppercase tracking-[0.22em] text-white/40">
                  Message from CEO
                </p>
                <p className="mt-1 text-sm text-white/55">{CEO_MESSAGE.name}</p>
              </div>
            </div>
            <div>
              <h2 className="text-[1.9rem] font-medium tracking-[-0.02em] text-white sm:text-[2.35rem]">
                代表メッセージ
              </h2>
              <div aria-hidden className="my-8 h-px w-10 bg-primary" />
              <div className="space-y-7">
                {CEO_MESSAGE.paragraphs.map((p, i) => (
                  <p key={i} className="text-[0.97rem] leading-9 text-white/70">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Mission / Vision ─── */}
      <section id="philosophy" className="bg-background py-24 sm:py-28">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            {[PHILOSOPHY.mission, PHILOSOPHY.vision].map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden bg-surface p-10 sm:p-14"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"
                />
                <div className="relative">
                  <p className="text-[0.68rem] font-normal uppercase tracking-[0.26em] text-primary">
                    {item.title}
                  </p>
                  <h3 className="mt-5 text-[1.65rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[2rem]">
                    {item.heading}
                  </h3>
                  <div aria-hidden className="my-6 h-px w-10 bg-primary" />
                  <p className="text-[0.95rem] leading-8 text-muted">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Value ─── */}
      <section id="value" className="bg-[#DCDCDC] py-24 sm:py-28">
        <Container>
          <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 pb-8">
            <h2 className="text-[1.9rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.35rem]">
              私たちの価値観
            </h2>
            <span className="shrink-0 text-[0.68rem] font-normal uppercase tracking-[0.26em] text-ink/35">
              Value
            </span>
          </div>
          <div className="mt-6 grid gap-px sm:grid-cols-2">
            {PHILOSOPHY.value.items.map((item, i) => (
              <div
                key={item.title}
                className="relative overflow-hidden bg-surface/90 p-10 sm:p-12"
              >
                <p
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-4 font-mono text-[5rem] font-medium leading-none text-ink/5 sm:text-[6rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="relative">
                  <div aria-hidden className="mb-5 h-px w-8 bg-primary" />
                  <h4 className="text-[1.05rem] font-medium text-ink">{item.title}</h4>
                  <p className="mt-4 text-sm leading-7 text-muted">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 沿革 ─── */}
      <section id="history" className="bg-ink py-24 text-white sm:py-28">
        <Container>
          <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-8">
            <h2 className="text-[1.9rem] font-medium tracking-[-0.02em] text-white sm:text-[2.35rem]">
              沿革
            </h2>
            <span className="shrink-0 text-[0.68rem] font-normal uppercase tracking-[0.26em] text-white/25">
              History
            </span>
          </div>
          <ol className="mt-2">
            {HISTORY.map((h, i) => (
              <li
                key={i}
                className="grid grid-cols-[80px_1fr] gap-6 border-b border-white/10 py-7 last:border-0 sm:grid-cols-[120px_1fr] sm:gap-12"
              >
                <span className="pt-0.5 font-mono text-sm font-normal text-white/35">
                  {h.year}
                </span>
                <span className="text-[0.97rem] leading-7 text-white/75">{h.text}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
