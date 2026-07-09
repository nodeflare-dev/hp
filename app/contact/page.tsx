import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "お問い合わせ",
  description:
    "事業・プロダクト・採用に関するご相談やお見積もりなど、NodeFlare へのお問い合わせはこちらから。",
  path: "/contact",
});

const AREAS = [
  "MCP ホスティング",
  "WebAssembly 開発",
  "セキュリティ診断・修正",
  "パフォーマンス診断・改善",
  "採用・カジュアル面談",
] as const;

export default function ContactPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-[#DCDCDC]">
        <Container className="pb-20 pt-3 sm:pb-24 sm:pt-4">
          <Breadcrumbs items={[{ label: "お問い合わせ", href: "/contact" }]} />
          <div className="mt-10">
            <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-ink/40">
              Contact
            </p>
            <h1 className="mt-3 text-[3rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-[4rem]">
              お問い合わせ
            </h1>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-ink/60">
              事業・プロダクト・採用に関するご相談やお見積もりなど、お気軽にお問い合わせください。
            </p>
          </div>
        </Container>
      </section>

      {/* ─── Form + Info ─── */}
      <section className="bg-surface py-24 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
            {/* 補足情報 */}
            <div>
              <h2 className="text-[1.3rem] font-medium text-ink">
                お問い合わせについて
              </h2>
              <p className="mt-5 text-[0.92rem] leading-7 text-muted">
                いただいたお問い合わせには、担当者より 2〜3 営業日以内にご返信いたします。
                内容によってはお時間をいただく場合がございます。
              </p>

              <div className="mt-10 space-y-8 border-l border-line pl-6">
                <div>
                  <p className="text-[0.65rem] font-normal uppercase tracking-[0.22em] text-muted">
                    Email
                  </p>
                  <p className="mt-2 text-[0.95rem] text-ink/80">{SITE.email}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] font-normal uppercase tracking-[0.22em] text-muted">
                    対応領域
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {AREAS.map((area) => (
                      <li
                        key={area}
                        className="flex items-center gap-3 text-[0.9rem] text-ink/70"
                      >
                        <span aria-hidden className="h-px w-5 shrink-0 bg-primary" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.65rem] font-normal uppercase tracking-[0.22em] text-muted">
                    返信について
                  </p>
                  <p className="mt-2 text-[0.87rem] leading-7 text-ink/65">
                    平日 9:00–18:00 を目安に対応しています。
                    週末・祝日のお問い合わせは翌営業日以降のご返信となります。
                  </p>
                </div>
              </div>
            </div>

            {/* フォーム */}
            <div className="border border-line bg-background p-8 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
