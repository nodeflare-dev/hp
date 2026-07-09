import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
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
      {/* ─── HERO ─── */}
      <section className="bg-ink text-white">
        <Container className="pb-20 pt-10 sm:pb-24 sm:pt-12">
          <Breadcrumbs items={[{ label: "技術", href: "/technology" }]} />
          <div className="mt-14">
            <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-white/40">
              Technology
            </p>
            <h1 className="mt-3 text-[3rem] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-[4rem]">
              技術
            </h1>
            <p className="mt-6 max-w-lg text-[1rem] leading-8 text-white/60">
              信頼性とパフォーマンスを両立するために、私たちが保有・活用する技術をご紹介します。
            </p>
          </div>
          {/* テックタグ */}
          <div className="mt-12 flex flex-wrap gap-2">
            {TECH_DETAILS.map((t) => (
              <span
                key={t.name}
                className="border border-white/15 px-4 py-2 font-mono text-[0.7rem] font-normal text-white/40"
              >
                {t.name}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Tech grid ─── */}
      <section className="bg-surface py-24 sm:py-28">
        <Container>
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-8">
            <h2 className="text-[1.9rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.35rem]">
              保有する技術
            </h2>
            <span className="shrink-0 text-[0.68rem] font-normal uppercase tracking-[0.26em] text-muted">
              Our Technology
            </span>
          </div>
          <div className="mt-2 grid sm:grid-cols-2">
            {TECH_DETAILS.map((tech, i) => (
              <div
                key={tech.name}
                className="border-b border-line py-9 pr-0 sm:pr-12 last:border-0"
              >
                <div className="flex items-start gap-6">
                  <span className="shrink-0 pt-1 font-mono text-[0.62rem] font-normal text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-medium text-ink">
                      {tech.name}
                    </h3>
                    <p className="mt-3 text-[0.88rem] leading-7 text-muted">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#DCDCDC] py-24 sm:py-28">
        <Container size="narrow">
          <div className="text-center">
            <p className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-ink/40">
              Contact
            </p>
            <h2 className="mt-4 text-[1.9rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.35rem]">
              技術に関するご相談
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[0.97rem] leading-8 text-ink/65">
              技術選定や実装のご相談など、お気軽にお問い合わせください。
            </p>
            <div className="mt-10 flex justify-center">
              <Button href="/contact" variant="primary" withArrow>
                お問い合わせ
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
