import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { BUSINESSES } from "@/lib/site";
import { IMG } from "@/lib/images";

const IMAGES: Record<string, string> = {
  nodeflare: IMG.bizNodeflare,
  webassembly: IMG.bizWasm,
  security: IMG.bizSecurity,
  performance: IMG.bizPerformance,
};

export function BusinessGrid() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-[2rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.6rem]">
            事業内容
          </h2>
          <Link
            href="/business"
            className="group inline-flex items-center gap-2 text-sm font-normal text-ink transition-colors hover:text-primary"
          >
            すべて見る
            <span aria-hidden className="text-muted transition-transform duration-300 group-hover:translate-x-1">
              ›
            </span>
          </Link>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {BUSINESSES.map((b) => (
            <Link key={b.id} href={`/business/${b.id}`} className="group block">
              <div className="overflow-hidden">
                <div className="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                  <Placeholder src={IMAGES[b.id]} alt={b.title} ratio="4/3" />
                </div>
              </div>
              <h3 className="mt-5 text-[1.15rem] font-normal tracking-tight text-ink transition-colors group-hover:text-primary">
                {b.title}
              </h3>
              <p className="mt-1 text-[0.82rem] text-muted">{b.subtitle}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
