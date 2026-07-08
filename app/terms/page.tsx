import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "利用規約",
  description: `${SITE.nameJa} のウェブサイト利用規約です。`,
  path: "/terms",
});

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "第1条（適用）",
    body: [
      `本規約は、${SITE.nameJa}（以下「当社」といいます）が運営する本ウェブサイト（以下「本サイト」といいます）の利用に関する条件を、本サイトを利用するすべての方（以下「利用者」といいます）と当社との間で定めるものです。`,
    ],
  },
  {
    heading: "第2条（著作権・知的財産権）",
    body: [
      "本サイトに掲載されている文章・画像・ロゴ・デザイン等の著作権その他の知的財産権は、当社または正当な権利者に帰属します。利用者は、権利者の許諾なくこれらを複製・転用・改変することはできません。",
    ],
  },
  {
    heading: "第3条（禁止事項）",
    body: [
      "利用者は、本サイトの利用にあたり、法令または公序良俗に反する行為、当社もしくは第三者の権利を侵害する行為、本サイトの運営を妨げる行為を行ってはなりません。",
    ],
  },
  {
    heading: "第4条（免責事項）",
    body: [
      "当社は、本サイトに掲載する情報の正確性・完全性・有用性等について、可能な限り注意を払いますが、これらを保証するものではありません。本サイトの利用により生じた損害について、当社は一切の責任を負わないものとします。",
    ],
  },
  {
    heading: "第5条（本規約の変更）",
    body: [
      "当社は、必要と判断した場合には、利用者に通知することなく本規約を変更することができるものとします。変更後の規約は、本サイトに掲載した時点から効力を生じるものとします。",
    ],
  },
  {
    heading: "第6条（準拠法・裁判管轄）",
    body: [
      "本規約の解釈にあたっては日本法を準拠法とします。本サイトに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="利用規約"
        crumbs={[{ label: "利用規約", href: "/terms" }]}
      />
      <Container size="narrow" className="py-16">
        <p className="text-sm leading-8 text-muted">
          本規約は、本サイトのご利用条件を定めるものです。本サイトをご利用いただく際は、本規約に同意いただいたものとみなします。
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
