/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { IMG } from "@/lib/images";

type Promo = {
  href: string;
  label: string;
  description: string;
  image: string;
};

const PROMOS: Promo[] = [
  {
    href: "/company",
    label: "企業情報",
    description:
      "私たちのミッション・ビジョンから、会社概要・沿革・代表メッセージまで。技術で社会の基盤をつくるという姿勢と、これまでの歩みを詳しくご紹介します。",
    image: IMG.promoCompany,
  },
  {
    href: "/recruit",
    label: "採用情報",
    description:
      "基盤領域の難しさに面白さを見いだす仲間を募集しています。募集職種や働く環境、開発体制、福利厚生まで、私たちのチームについてご覧いただけます。",
    image: IMG.promoRecruit,
  },
  {
    href: "/contact",
    label: "お問い合わせ",
    description:
      "MCP ホスティングや WebAssembly 開発、セキュリティ・パフォーマンス改善のご相談から、お見積もり・協業のご提案まで。お気軽にお問い合わせください。",
    image: IMG.promoContact,
  },
];

/** 他ページへの誘導セクション（写真＋左下に白パネル＋CTA / a.png 参照）。 */
export function PromoTiles() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <Container size="wide">
        <div className="flex flex-col gap-12 sm:gap-16">
          {PROMOS.map((p, i) => {
            const reversed = i % 2 === 1; // 採用情報など奇数番は反対側
            return (
            <Link key={p.href} href={p.href} className="group relative block">
              {/* 写真（16:9） */}
              <div className={`overflow-hidden rounded-lg ${reversed ? "sm:mr-[38%]" : "sm:ml-[38%]"}`}>
                <div className="aspect-[16/10] sm:aspect-[16/9]">
                  <img
                    src={p.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
              </div>

              {/* 白パネル（写真の左下 or 右下に配置） */}
              <div className={`relative z-10 -mt-12 mx-4 overflow-hidden rounded-lg border border-[#BCC0C8] bg-surface/80 p-7 sm:absolute sm:bottom-4 sm:mx-0 sm:w-[42%] sm:p-9 ${reversed ? "sm:right-0" : "sm:left-0"}`}>
                {/* 下角の控えめなグラデーション */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 ${reversed ? "bg-gradient-to-tl" : "bg-gradient-to-tr"} from-primary/25 via-transparent to-transparent`}
                />
                <div className="relative">
                  <h3 className="text-[1.4rem] font-semibold tracking-tight text-[#333333] sm:text-[1.6rem]">
                    {p.label}
                  </h3>
                  <p className="mt-2.5 text-[0.9rem] leading-7 text-ink-soft">
                    {p.description}
                  </p>
                  <span className="mt-6 inline-flex w-fit items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-white transition-colors group-hover:bg-primary-dark">
                    詳細はこちら
                    <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
