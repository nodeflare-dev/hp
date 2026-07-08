import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { BUSINESSES, getBusiness, SITE } from "@/lib/site";

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

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHeader
        eyebrow={business.subtitle}
        title={business.title}
        description={business.summary}
        crumbs={[
          { label: "事業内容", href: "/business" },
          { label: business.title, href: `/business/${business.id}` },
        ]}
      />

      {/* 概要 */}
      <Section background="surface">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow="Overview" title="サービス概要" />
            <p className="mt-7 text-[1rem] leading-9 text-muted">
              {business.description}
            </p>
          </div>
          <Placeholder label={`${business.title}`} ratio="4/3" tone="dark" />
        </div>
      </Section>

      {/* 提供内容 */}
      <Section background="muted">
        <SectionHeading
          eyebrow="Features"
          title="提供内容"
          description="お客様の課題に合わせて、以下の内容を提供します。"
        />
        <div className="mt-14 grid border-l border-t border-line sm:grid-cols-2">
          {business.features.map((f) => (
            <div
              key={f}
              className="flex items-start gap-4 border-b border-r border-line bg-surface p-8"
            >
              <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-primary" />
              <p className="text-[0.95rem] leading-8 text-ink-soft">{f}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 他事業 */}
      <Section background="surface">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Other Business" title="その他の事業" />
          <Link
            href="/business"
            className="group inline-flex items-center gap-2 text-sm font-normal text-ink"
          >
            <span className="inline-block">事業内容一覧</span>
            <span aria-hidden className="text-muted transition-transform duration-300 group-hover:translate-x-1">
              ›
            </span>
          </Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {others.map((b) => (
            <Link key={b.id} href={`/business/${b.id}`} className="group block">
              <div className="overflow-hidden">
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                  <Placeholder ratio="16/9" tone="dark" />
                </div>
              </div>
              <h3 className="mt-4 text-[1.05rem] font-normal text-ink transition-colors group-hover:text-primary">
                {b.title}
              </h3>
              <p className="mt-2 text-[0.88rem] leading-7 text-muted">{b.summary}</p>
            </Link>
          ))}
        </div>
        <div className="mt-14">
          <Button href="/contact" variant="primary" withArrow>
            この事業について相談する
          </Button>
        </div>
      </Section>
    </>
  );
}
