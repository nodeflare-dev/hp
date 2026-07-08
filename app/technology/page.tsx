import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { TECH_DETAILS } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "技術",
  description:
    "NodeFlare が保有する技術。Cloudflare / WebAssembly / Rust / Go / Next.js / セキュリティ / パフォーマンス最適化などをご紹介します。",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="技術"
        description="信頼性とパフォーマンスを両立するために、私たちが保有・活用する技術をご紹介します。"
        crumbs={[{ label: "技術", href: "/technology" }]}
      />

      <Section background="surface">
        <SectionHeading
          eyebrow="Our Technology"
          title="保有する技術"
          description="用途に応じて最適な技術を選定し、確かな品質で組み合わせます。"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {TECH_DETAILS.map((tech) => (
            <div
              key={tech.name}
              className="border border-line bg-background p-7"
            >
              <div>
                <h3 className="text-lg font-normal text-ink">{tech.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section background="muted">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            align="center"
            eyebrow="Contact"
            title="技術に関するご相談"
            description="技術選定や実装のご相談など、お気軽にお問い合わせください。"
          />
          <div className="mt-8 flex justify-center">
            <Button href="/contact" variant="primary" withArrow>
              お問い合わせ
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
