import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { buildMetadata } from "@/lib/seo";
import { RECRUIT } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "採用情報",
  description:
    "NodeFlare の採用情報。募集職種・働く環境・福利厚生・開発環境をご紹介します。",
  path: "/recruit",
});

export default function RecruitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recruit"
        title="採用情報"
        description={RECRUIT.intro}
        crumbs={[{ label: "採用情報", href: "/recruit" }]}
      />

      {/* 募集一覧 */}
      <Section background="surface" id="positions">
        <SectionHeading
          eyebrow="Positions"
          title="募集職種"
          description="現在、以下の職種を募集しています。"
        />
        <div className="mt-12 space-y-4">
          {RECRUIT.positions.map((p) => (
            <div
              key={p.title}
              className="grid gap-4 border border-line bg-background p-7 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-normal text-ink">{p.title}</h3>
                  <Tag variant="primary">{p.type}</Tag>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {p.description}
                </p>
              </div>
              <Button href="/contact" variant="outline" className="shrink-0">
                応募・相談する
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* 働く環境 */}
      <Section background="muted" id="environment">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Environment"
              title={RECRUIT.environment.heading}
              description={RECRUIT.environment.body}
            />
          </div>
          <Placeholder ratio="4/3" />
        </div>
      </Section>

      {/* 福利厚生 */}
      <Section background="surface" id="benefits">
        <SectionHeading eyebrow="Benefits" title="福利厚生" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {RECRUIT.benefits.map((b) => (
            <li
              key={b}
              className="flex items-start gap-4 border border-line bg-background p-6"
            >
              <span
                aria-hidden
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12.5l4 4 10-10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-sm leading-7 text-ink/80">{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 開発環境 */}
      <Section background="muted" id="dev-environment">
        <SectionHeading
          eyebrow="Development"
          title="開発環境"
          description="以下の技術スタックで開発しています。"
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {RECRUIT.devEnvironment.map((d) => (
            <li
              key={d}
              className="border border-line bg-surface px-6 py-5 text-sm font-normal text-ink"
            >
              {d}
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-ink">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <h2 className="text-3xl font-medium text-white sm:text-4xl">
            話を聞いてみませんか？
          </h2>
          <p className="mt-5 text-base leading-8 text-white/70">
            カジュアル面談も歓迎しています。まずはお気軽にお問い合わせください。
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="/contact" variant="invert" withArrow>
              エントリー・お問い合わせ
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
