import type { Metadata } from "next";
import { Mail } from "lucide-react";
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

export default function ContactPage() {
  return (
    <section className="bg-white pb-16 pt-3 sm:pb-24 sm:pt-4">
      <Container size="narrow">
        <Breadcrumbs items={[{ label: "お問い合わせ", href: "/contact" }]} />
        <h1 className="mt-8 flex items-center gap-2 text-[1.1rem] font-bold tracking-tight text-[#333] sm:text-[1.3rem]">
          <Mail size={20} className="text-[#333]" />
          お問い合わせ
        </h1>

        {/* フォーム */}
        <div className="mt-8">
          <ContactForm />
        </div>

        {/* 補足情報 */}
        <div className="mt-12 flex flex-col gap-6 border-t border-[#e5e5e5] pt-8 sm:flex-row sm:gap-16">
          <div>
            <p className="text-[0.65rem] font-normal uppercase tracking-[0.22em] text-muted">Email</p>
            <p className="mt-1.5 text-[0.9rem] text-[#333]">{SITE.email}</p>
          </div>
          <div>
            <p className="text-[0.65rem] font-normal uppercase tracking-[0.22em] text-muted">返信について</p>
            <p className="mt-1.5 text-[0.87rem] leading-7 text-[#555]">
              平日 9:00–18:00 を目安に対応しています。2〜3 営業日以内にご返信いたします。
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
