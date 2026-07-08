import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "お問い合わせ",
  description:
    "事業・プロダクト・採用に関するご相談やお見積もりなど、NodeFlare へのお問い合わせはこちらから。",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="お問い合わせ"
        description="事業・プロダクト・採用に関するご相談やお見積もりなど、お気軽にお問い合わせください。"
        crumbs={[{ label: "お問い合わせ", href: "/contact" }]}
      />

      <Section background="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* 補足情報 */}
          <div>
            <h2 className="text-lg font-normal text-ink">お問い合わせについて</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              いただいたお問い合わせには、担当者より 2〜3 営業日以内にご返信いたします。内容によってはお時間をいただく場合がございます。
            </p>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-xs font-normal uppercase tracking-wide text-muted">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-ink/80">{SITE.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-normal uppercase tracking-wide text-muted">
                  対応領域
                </dt>
                <dd className="mt-1 text-sm leading-7 text-ink/80">
                  MCP ホスティング / WebAssembly 開発 / セキュリティ診断・修正 / パフォーマンス診断・改善
                </dd>
              </div>
            </dl>
          </div>

          {/* フォーム */}
          <div className="border border-line bg-background p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
