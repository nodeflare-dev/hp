import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import {
  SITE,
  COMPANY_PROFILE,
  PHILOSOPHY,
  HISTORY,
  CEO_MESSAGE,
} from "@/lib/site";

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
      <PageHeader
        eyebrow="Company"
        title="企業情報"
        description="技術で、社会の基盤をつくる。私たちの理念と歩みをご紹介します。"
        crumbs={[{ label: "企業情報", href: "/company" }]}
      />

      {/* 会社概要 */}
      <Section background="surface" id="profile">
        <SectionHeading eyebrow="Profile" title="会社概要" />
        <dl className="mt-12 divide-y divide-line border-y border-line">
          {COMPANY_PROFILE.map((row) => (
            <div
              key={row.label}
              className="grid gap-2 py-6 sm:grid-cols-[200px_1fr] sm:gap-8"
            >
              <dt className="text-sm font-normal text-ink">{row.label}</dt>
              <dd className="text-sm leading-7 text-muted">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* 代表メッセージ */}
      <Section background="muted" id="message">
        <SectionHeading eyebrow="Message" title="代表メッセージ" />
        <div className="mt-12 grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
          <div>
            <Placeholder label="代表写真スペース" ratio="3/2" />
            <p className="mt-4 text-sm font-normal text-ink">
              {CEO_MESSAGE.name}
            </p>
          </div>
          <div className="space-y-6">
            {CEO_MESSAGE.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-8 text-ink/80">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Mission / Vision */}
      <Section background="surface" id="philosophy">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="border-l-2 border-primary bg-background p-8 sm:p-10">
            <p className="text-sm font-normal uppercase tracking-[0.2em] text-muted">
              {PHILOSOPHY.mission.title}
            </p>
            <h3 className="mt-4 text-2xl font-medium text-ink">
              {PHILOSOPHY.mission.heading}
            </h3>
            <p className="mt-4 text-base leading-8 text-muted">
              {PHILOSOPHY.mission.body}
            </p>
          </div>
          <div className="border-l-2 border-primary bg-background p-8 sm:p-10">
            <p className="text-sm font-normal uppercase tracking-[0.2em] text-muted">
              {PHILOSOPHY.vision.title}
            </p>
            <h3 className="mt-4 text-2xl font-medium text-ink">
              {PHILOSOPHY.vision.heading}
            </h3>
            <p className="mt-4 text-base leading-8 text-muted">
              {PHILOSOPHY.vision.body}
            </p>
          </div>
        </div>
      </Section>

      {/* Value */}
      <Section background="muted" id="value">
        <SectionHeading
          eyebrow={PHILOSOPHY.value.title}
          title="私たちの価値観"
          description="日々の意思決定と行動の指針となる 4 つの価値観です。"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PHILOSOPHY.value.items.map((item) => (
            <div
              key={item.title}
              className="border border-line bg-surface p-8"
            >
              <h4 className="text-lg font-normal text-ink">{item.title}</h4>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 沿革 */}
      <Section background="surface" id="history">
        <SectionHeading eyebrow="History" title="沿革" />
        <ol className="mt-12 space-y-0 border-l border-line">
          {HISTORY.map((h, i) => (
            <li key={i} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-surface" />
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <span className="font-mono text-sm font-normal text-ink">
                  {h.year}
                </span>
                <span className="text-base leading-7 text-ink/80">{h.text}</span>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
