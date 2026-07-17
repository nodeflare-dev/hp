/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { PositionCard } from "@/components/recruit/PositionCard";
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
          <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECRUIT.positions.map((p, i) => {
              const imgs = [IMG.recruitBackend, IMG.recruitWasm, IMG.recruitSecurity, IMG.recruitPerf];
              return (
                <PositionCard key={p.title} position={p} img={imgs[i]} />
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
