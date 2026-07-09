/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { buildMetadata } from "@/lib/seo";
import { RECRUIT } from "@/lib/site";
import { IMG } from "@/lib/images";

export const metadata: Metadata = buildMetadata({
  title: "採用情報",
  description:
    "NodeFlare の採用情報。募集職種・働く環境・福利厚生・開発環境をご紹介します。",
  path: "/recruit",
});

export default function RecruitPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden className="absolute inset-0">
          <img
            src={IMG.heroRecruit}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink/90" />
        </div>
        <Container className="relative pb-24 pt-10 sm:pb-28 sm:pt-12">
          <Breadcrumbs items={[{ label: "採用情報", href: "/recruit" }]} />
          <div className="mt-16 max-w-2xl sm:mt-20">
            <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-white/40">
              Recruit
            </p>
            <h1 className="mt-3 text-[3rem] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-[4rem]">
              採用情報
            </h1>
            <div aria-hidden className="my-8 h-px w-12 bg-primary" />
            <p className="text-[1rem] leading-8 text-white/65">{RECRUIT.intro}</p>
          </div>
        </Container>
      </section>

      {/* ─── 募集職種 ─── */}
      <section id="positions" className="bg-surface py-24 sm:py-28">
        <Container>
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-8">
            <h2 className="text-[1.9rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.35rem]">
              募集職種
            </h2>
            <span className="shrink-0 text-[0.68rem] font-normal uppercase tracking-[0.26em] text-muted">
              Positions
            </span>
          </div>
          <div className="mt-2 divide-y divide-line">
            {RECRUIT.positions.map((p, i) => (
              <div key={p.title} className="py-10">
                <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[0.62rem] font-normal text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Tag variant="primary">{p.type}</Tag>
                    </div>
                    <h3 className="mt-4 text-[1.15rem] font-medium text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[0.92rem] leading-7 text-muted">
                      {p.description}
                    </p>
                  </div>
                  <Button href="/contact" variant="outline" className="shrink-0 self-start">
                    応募・相談する
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 働く環境 ─── */}
      <section id="environment" className="bg-ink py-24 text-white sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-white/40">
                Environment
              </p>
              <h2 className="mt-4 text-[1.9rem] font-medium tracking-[-0.02em] text-white sm:text-[2.35rem]">
                {RECRUIT.environment.heading}
              </h2>
              <div aria-hidden className="my-7 h-px w-10 bg-primary" />
              <p className="text-[0.97rem] leading-9 text-white/70">
                {RECRUIT.environment.body}
              </p>
            </div>
            <Placeholder ratio="4/3" tone="dark" />
          </div>
        </Container>
      </section>

      {/* ─── 福利厚生 ─── */}
      <section id="benefits" className="bg-background py-24 sm:py-28">
        <Container>
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-8">
            <h2 className="text-[1.9rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.35rem]">
              福利厚生
            </h2>
            <span className="shrink-0 text-[0.68rem] font-normal uppercase tracking-[0.26em] text-muted">
              Benefits
            </span>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {RECRUIT.benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-5 border-b border-line pb-6 pt-2"
              >
                <span aria-hidden className="mt-[0.45em] h-px w-6 shrink-0 bg-primary" />
                <span className="text-[0.95rem] leading-7 text-ink/80">{b}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─── 開発環境 ─── */}
      <section id="dev-environment" className="bg-[#DCDCDC] py-24 sm:py-28">
        <Container>
          <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 pb-8">
            <h2 className="text-[1.9rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.35rem]">
              開発環境
            </h2>
            <span className="shrink-0 text-[0.68rem] font-normal uppercase tracking-[0.26em] text-ink/35">
              Development
            </span>
          </div>
          <ul className="mt-6 grid gap-px sm:grid-cols-2">
            {RECRUIT.devEnvironment.map((d) => (
              <li
                key={d}
                className="bg-surface/80 px-8 py-6 font-mono text-[0.85rem] text-ink/70"
              >
                {d}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-ink py-24 text-white sm:py-28">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-[2.5rem] font-medium tracking-[-0.02em] text-white sm:text-[3rem]">
              話を聞いてみませんか？
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[0.97rem] leading-8 text-white/65">
              カジュアル面談も歓迎しています。まずはお気軽にお問い合わせください。
            </p>
            <div className="mt-10 flex justify-center">
              <Button href="/contact" variant="invert" withArrow>
                エントリー・お問い合わせ
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
