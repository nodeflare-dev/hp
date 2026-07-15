/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
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
      {/* ─── ページタイトル ─── */}
      <section className="border-b border-line bg-white pb-12 pt-3 sm:pb-16 sm:pt-4">
        <Container>
          <Breadcrumbs items={[{ label: "採用情報", href: "/recruit" }]} />
          <h1 className="mt-6 text-[1.65rem] font-bold tracking-tight text-[#333333] sm:text-[2rem]">
            採用情報
          </h1>
          <p className="mt-3 text-[1.05rem] leading-8 text-[#333333]">
            {RECRUIT.intro}
          </p>
        </Container>
      </section>

      {/* ─── 募集職種 ─── */}
      <section id="positions" className="bg-surface py-16 sm:py-20">
        <Container>
          <h2 className="mb-10 text-[1.05rem] font-bold text-[#333333]">
            募集職種
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECRUIT.positions.map((p, i) => {
              const imgs = [IMG.recruitBackend, IMG.recruitWasm, IMG.recruitSecurity, IMG.recruitPerf];
              return (
              <div key={p.title} className="flex flex-col border border-line bg-white">
                {/* 上部画像 */}
                <img src={imgs[i]} alt="" className="aspect-[4/3] w-full object-cover" />

                {/* カード本文 */}
                <div className="flex flex-1 flex-col px-4 py-4">
                  <p className="text-[0.7rem] text-muted">{p.type}</p>
                  <h3 className="mt-1.5 text-[0.88rem] font-bold leading-5 text-[#333333]">
                    {p.title}
                  </h3>
                  <dl className="mt-3 grid grid-cols-[4.5rem_1fr] gap-y-1 text-[0.72rem]">
                    <dt className="text-muted">雇用形態</dt>
                    <dd className="text-[#333333]">{p.type}</dd>
                    <dt className="text-muted">勤務地</dt>
                    <dd className="text-[#333333]">フルリモート</dd>
                  </dl>
                </div>

                {/* 下部ボタンバー */}
                <Link
                  href="/contact"
                  className="group flex items-center justify-between bg-ink px-4 py-3 text-[0.75rem] tracking-wide text-white transition-colors hover:bg-primary"
                >
                  詳細・応募する
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── 働く環境 ─── */}
      <section id="environment" className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-[1.05rem] font-bold text-[#333333]">
            働く環境
          </h2>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Placeholder ratio="4/3" tone="light" />
            <p className="text-[1.05rem] leading-[2.1] text-[#333333]">
              {RECRUIT.environment.body}
            </p>
          </div>
        </Container>
      </section>

      {/* ─── 福利厚生 ─── */}
      <section id="benefits" className="bg-surface py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-[1.05rem] font-bold text-[#333333]">
            福利厚生
          </h2>
          <ul className="grid gap-px sm:grid-cols-2">
            {RECRUIT.benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-5 border-b border-line pb-6 pt-4 first:border-t"
              >
                <span aria-hidden className="mt-[0.45em] h-px w-6 shrink-0 bg-primary" />
                <span className="text-[0.95rem] leading-7 text-[#333333]">{b}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─── 開発環境 ─── */}
      <section id="dev-environment" className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-[1.05rem] font-bold text-[#333333]">
            開発環境
          </h2>
          <ul className="grid gap-px sm:grid-cols-2">
            {RECRUIT.devEnvironment.map((d) => (
              <li
                key={d}
                className="bg-surface px-8 py-6 font-mono text-[0.85rem] text-[#333333]/70"
              >
                {d}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-[1.65rem] font-bold tracking-tight text-[#333333] sm:text-[2rem]">
              話を聞いてみませんか？
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[1.05rem] leading-8 text-[#333333]">
              カジュアル面談も歓迎しています。まずはお気軽にお問い合わせください。
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" withArrow>
                エントリー・お問い合わせ
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
