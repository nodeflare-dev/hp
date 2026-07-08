"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { BUSINESSES } from "@/lib/site";

const IMAGES: Record<string, string> = {
  nodeflare: "/nodeflare.png",
  webassembly: "/wasm.png",
  security: "/security.png",
  performance: "/performance.png",
};

const GAP = 4; // gap-1
const N = BUSINESSES.length;
// 無限ループ用に3周分を並べ、中央の周を基準にする
const LOOP = [...BUSINESSES, ...BUSINESSES, ...BUSINESSES];

export function Hero() {
  const scroller = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState(1); // 初期は2枚目

  const stepOf = (el: HTMLUListElement) => {
    const first = el.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + GAP : el.clientWidth;
  };

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const step = stepOf(el);
    const copyW = step * N;
    // 端の周に入ったら中央の周へ瞬間移動（カード単位なので継ぎ目なし）
    if (el.scrollLeft < copyW * 0.5) {
      el.scrollLeft += copyW;
    } else if (el.scrollLeft >= copyW * 2.5) {
      el.scrollLeft -= copyW;
    }
    const raw = Math.round(el.scrollLeft / step);
    setActive(((raw % N) + N) % N);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (el) {
      const step = stepOf(el);
      // 中央の周の2枚目を中央に
      el.scrollLeft = step * (N + 1);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const moveBy = (delta: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollLeft + delta * stepOf(el), behavior: "smooth" });
  };

  const goToReal = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    const raw = Math.round(el.scrollLeft / stepOf(el));
    const currentReal = ((raw % N) + N) % N;
    moveBy(i - currentReal);
  };

  return (
    <section aria-label="事業紹介" className="relative bg-[#DCDCDC]">
      {/* 写真の上下にグレーの隙間（4px）を出す */}
      <div className="py-1">
        <div className="relative w-full">
        {/* 左矢印（横） */}
        <button
          type="button"
          onClick={() => moveBy(-1)}
          aria-label="前へ"
          className="absolute left-[5%] top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-white/70 hover:text-primary sm:left-[18%] lg:left-[24%]"
        >
          <ChevronLeft className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </button>

        {/* 横スライドするカード */}
        <ul
          ref={scroller}
          onScroll={update}
          className="hero-scroller flex snap-x snap-mandatory gap-1 overflow-x-auto px-1"
        >
          {LOOP.map((b, i) => (
            <li
              key={i}
              className="w-[90%] shrink-0 snap-center sm:w-[64%] lg:w-[52%]"
            >
              <Link
                href={`/business/${b.id}`}
                className="group block focus:outline-none"
              >
                {/* 写真枠（16:9） */}
                <div className="relative overflow-hidden">
                  <div className="transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                    <Placeholder
                      src={IMAGES[b.id]}
                      alt={b.title}
                      ratio="16/9"
                      tone="dark"
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* 右矢印（横） */}
        <button
          type="button"
          onClick={() => moveBy(1)}
          aria-label="次へ"
          className="absolute right-[5%] top-1/2 z-10 flex h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-white/70 hover:text-primary sm:right-[18%] lg:right-[24%]"
        >
          <ChevronRight className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </button>
        </div>
      </div>

      {/* ドットインジケータ：白背景の上 */}
      <div className="flex items-center justify-center gap-3 bg-surface pt-6 pb-6 sm:pb-8">
        {BUSINESSES.map((b, i) => (
          <button
            key={b.id}
            type="button"
            onClick={() => goToReal(i)}
            aria-label={b.title}
            aria-current={i === active}
            className="p-1.5"
          >
            <span
              className={`block h-3 w-3 transition-colors ${
                i === active ? "bg-primary" : "bg-line-strong hover:bg-faint"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
