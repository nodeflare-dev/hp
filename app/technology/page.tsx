import type { Metadata } from "next";
import {
  SiCloudflare,
  SiWebassembly,
  SiRust,
  SiGo,
  SiNextdotjs,
  SiThreedotjs,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import { Shield, Gauge } from "lucide-react";
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

const ICON_MAP: Record<string, React.ReactElement> = {
  Cloudflare: <SiCloudflare className="h-9 w-9" color="#F38020" />,
  WebAssembly: <SiWebassembly className="h-9 w-9" color="#654FF0" />,
  Rust: <SiRust className="h-9 w-9" color="#CE412B" />,
  Go: <SiGo className="h-9 w-9" color="#00ADD8" />,
  "Next.js": <SiNextdotjs className="h-9 w-9" color="#333333" />,
  "Three.js": <SiThreedotjs className="h-9 w-9" color="#333333" />,
  Security: <Shield className="h-9 w-9" color="#333333" />,
  "Performance Optimization": <Gauge className="h-9 w-9" color="#333333" />,
  TypeScript: <SiTypescript className="h-9 w-9" color="#3178C6" />,
};

export default function TechnologyPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section
        className="relative text-white"
        style={{ backgroundImage: "url('/tech-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative">
          <Container className="pb-20 pt-3 sm:pb-24 sm:pt-4">
            <Breadcrumbs items={[{ label: "技術", href: "/technology" }]} light />
            <div className="mt-14 w-full text-center">
              <h1 className="text-[1.35rem] font-bold leading-[1.9] tracking-tight text-white sm:text-[1.6rem]">
                私たちは、速さと安全性を妥協なく両立するために、<br />
                Rust・Go・WebAssembly をはじめとした厳選された技術を活用しています。
              </h1>
            </div>
          </Container>
        </div>
      </section>

      {/* ─── Tech grid ─── */}
      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_DETAILS.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col rounded-md border border-[#e5e5e5] bg-white px-7 py-7 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  {ICON_MAP[tech.name] ?? <span className="block h-9 w-9" />}
                  <h3 className="text-[1rem] font-bold text-[#333333]">
                    {tech.name}
                  </h3>
                </div>
                <p className="mt-4 text-[0.88rem] leading-7 text-[#444]">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-surface py-14 sm:py-16">
        <Container>
          <div className="flex justify-center">
            <Button href="/contact" variant="primary" withArrow>
              お問い合わせ
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
