import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "プライバシーポリシー",
  description: `${SITE.nameJa} の個人情報保護方針（プライバシーポリシー）です。`,
  path: "/privacy",
});

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. 事業者情報",
    body: [
      `${SITE.nameJa}（以下「当社」といいます）は、当社が取り扱う個人情報の保護について、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。`,
    ],
  },
  {
    heading: "2. 個人情報の取得",
    body: [
      "当社は、お問い合わせフォームの送信、採用へのご応募等を通じて、お名前・会社名・メールアドレス・お問い合わせ内容等の個人情報を取得します。取得にあたっては、適法かつ公正な手段によるものとします。",
    ],
  },
  {
    heading: "3. 利用目的",
    body: [
      "取得した個人情報は、お問い合わせへの対応、サービスのご提供・ご案内、採用選考に関する連絡、及びこれらに付随する目的のために利用します。",
    ],
  },
  {
    heading: "4. 第三者提供",
    body: [
      "当社は、法令に定める場合を除き、あらかじめ本人の同意を得ることなく、個人情報を第三者に提供しません。",
    ],
  },
  {
    heading: "5. 個人情報の管理",
    body: [
      "当社は、個人情報の漏えい・滅失・毀損を防止するため、必要かつ適切な安全管理措置を講じます。",
    ],
  },
  {
    heading: "6. アクセス解析ツール等",
    body: [
      "本サイトでは、利用状況の把握・改善のために、アクセス解析ツールを利用する場合があります。これらのツールは Cookie 等を使用することがありますが、個人を特定する情報は含みません。ブラウザの設定により Cookie の利用を無効にすることができます。",
    ],
  },
  {
    heading: "7. 開示・訂正・削除等の請求",
    body: [
      "本人からの個人情報の開示・訂正・利用停止・削除等のご請求については、下記お問い合わせ窓口にて、本人であることを確認のうえ、法令に従い対応いたします。",
    ],
  },
  {
    heading: "8. お問い合わせ窓口",
    body: [
      `本ポリシーに関するお問い合わせは、${SITE.email} までご連絡ください。`,
    ],
  },
  {
    heading: "9. 本ポリシーの変更",
    body: [
      "当社は、法令の変更等に応じて、本ポリシーを改定することがあります。改定後の内容は、本サイトに掲載した時点から適用されます。",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="プライバシーポリシー"
        crumbs={[{ label: "プライバシーポリシー", href: "/privacy" }]}
      />
      <Container size="narrow" className="py-16">
        <p className="text-sm leading-8 text-muted">
          当社は、個人情報の重要性を認識し、その保護の徹底を図るとともに、適切な取り扱いに努めます。
        </p>
        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-normal text-ink">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 text-sm leading-8 text-ink/80">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
        <p className="mt-14 text-sm text-muted">制定日：2024年11月1日</p>
      </Container>
    </>
  );
}
