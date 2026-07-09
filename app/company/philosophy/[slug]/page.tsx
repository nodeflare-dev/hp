import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { PHILOSOPHY, SITE } from "@/lib/site";
const SLUGS = ["mission", "vision", "value"] as const;
type Slug = (typeof SLUGS)[number];

const labelMap: Record<Slug, string> = {
  mission: "Mission",
  vision: "Vision",
  value: "Value",
};

function getData(slug: string) {
  if (!SLUGS.includes(slug as Slug)) return null;
  return PHILOSOPHY[slug as Slug];
}

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getData(slug);
  if (!data) return {};
  return buildMetadata({
    title: `${labelMap[slug as Slug]} | 経営理念`,
    description:
      slug === "value"
        ? "NodeFlare が大切にする 4 つの価値観をご紹介します。"
        : (data as typeof PHILOSOPHY.mission).body,
    path: `/company/philosophy/${slug}`,
  });
}


export default async function PhilosophyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getData(slug);
  if (!data) notFound();

  const s = slug as Slug;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: labelMap[s],
          url: `${SITE.url}/company/philosophy/${slug}`,
        }}
      />

      {/* ─── HERO ─── */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }}
      >

        <Container className="relative z-10 flex min-h-[420px] flex-col pt-3 sm:min-h-[500px] sm:pt-4">
          <Breadcrumbs
            items={[
              { label: "企業情報", href: "/company" },
              { label: "経営理念", href: "/company#philosophy" },
              { label: labelMap[s], href: `/company/philosophy/${slug}` },
            ]}
          />
          <div className="flex flex-1 items-center pb-8">
            <div className="max-w-[52%]">
              <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[2.6rem]">
                {s === "value"
                  ? "私たちが大切にする価値観"
                  : (data as typeof PHILOSOPHY.mission).heading}
              </h1>
              <p className="mt-5 text-[1.05rem] leading-8 text-ink">
                {s === "value"
                  ? (data as typeof PHILOSOPHY.value).body
                  : (data as typeof PHILOSOPHY.mission).body}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 本文 ─── */}
      {s === "value" ? (
        <section className="bg-surface py-20 sm:py-24">
          <Container>
            <ul className="grid gap-px sm:grid-cols-2">
              {(data as typeof PHILOSOPHY.value).items.map((item) => (
                <li key={item.title} className="bg-white p-10">
                  <h2 className="text-[1.4rem] font-bold text-ink">{item.title}</h2>
                  <p className="mt-6 text-[1.05rem] leading-[2.1] text-ink">{item.body}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : (
        <section className="bg-surface py-20 sm:py-24">
          <Container size="narrow">
            <h2 className="text-[1.6rem] font-bold tracking-[-0.02em] text-ink sm:text-[2rem]">
              {s === "mission" ? "私たちのミッション" : "私たちのビジョン"}
            </h2>
            <div className="space-y-8 mt-10 text-[1.1rem] leading-[2.2] text-ink">
              {s === "mission" ? (
                <>
                  <p>
                    社会を支えるソフトウェアは、速く、安全で、信頼できなければなりません。
                    NodeFlare は MCP ホスティング・WebAssembly・セキュリティ・パフォーマンスの各領域で、
                    そのような基盤を提供することを使命としています。
                  </p>
                  <p>
                    私たちが追求するのは「派手さ」ではなく「長く使われ続ける確かな品質」です。
                    動くだけでなく、直し切る。ドキュメントを読み、一次情報に当たる。
                    その積み重ねが、社会の基盤を支えるソフトウェアをつくります。
                  </p>
                  <p>
                    技術を通じてお客様の事業成長を下支えし、ひいては社会のインフラを確かなものにすること。
                    それが私たちの存在意義です。
                  </p>
                </>
              ) : (
                <>
                  <p>
                    10 年後も選ばれ続ける企業でありたい——それが NodeFlare のビジョンです。
                    MCP ホスティングをはじめとする基盤領域で、エンタープライズから信頼される
                    技術パートナーになることを目指しています。
                  </p>
                  <p>
                    「選ばれ続ける」とは、一度受注して終わりではなく、成果を出し続けることで
                    長期的なパートナーシップを築くことを意味します。納品ではなく顧客の成功を
                    ゴールに置き、共に事業を成長させることにコミットします。
                  </p>
                  <p>
                    変化の速い技術環境においても、確かな理解と誠実さをもって向き合い続けること。
                    それが、選ばれ続けるための唯一の道だと考えています。
                  </p>
                </>
              )}
            </div>
          </Container>
        </section>
      )}

    </>
  );
}
