"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MEGA_MENU, NAV } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
    setActive(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const activeItem = MEGA_MENU.find((m) => m.href === active);

  return (
    <>
      {/* トップユーティリティバー */}
      <div className="bg-white">
        <div className="relative mx-auto flex h-9 max-w-[90rem] items-center justify-end gap-4 px-5 sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block">
            <code className="whitespace-nowrap font-mono text-[0.85rem] font-bold">
              <span className="text-[#bf8700]">println!</span>
              <span className="text-[#24292e]">(</span>
              <span className="text-[#c4320a]">&quot;質を求めるならNodeFlare&quot;</span>
              <span className="text-[#24292e]">);</span>
            </code>
          </div>

          <div className="flex items-center gap-3 text-muted">
            <a href="#" aria-label="X (Twitter)" className="transition-colors hover:text-ink">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.9 1.5h3.7l-8 9.1L24 22.5h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.5h7.6l5.2 6.9 5.9-6.9Zm-1.3 18.7h2L6.5 3.6H4.3l13.3 16.6Z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="transition-colors hover:text-ink">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.5 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok" className="transition-colors hover:text-ink">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.08-.14 1.62.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07l3.34-.01Z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-ink">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-ink">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5v-9h3v9Zm-1.5-10.3a1.8 1.8 0 1 1 0-3.5 1.8 1.8 0 0 1 0 3.5ZM19 19h-3v-4.7c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5V19h-3v-9h2.9v1.2h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.7V19Z" />
              </svg>
            </a>
          </div>

          <span aria-hidden className="h-4 w-px bg-line" />

          <div className="flex items-center gap-1.5 text-[0.75rem]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-muted">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <button type="button" className="font-medium text-ink" aria-current="true">日本語</button>
            <span aria-hidden className="text-line-strong">/</span>
            <button type="button" className="text-muted transition-colors hover:text-ink">English</button>
          </div>
        </div>
      </div>

      {/* メインヘッダー */}
      <header
        onMouseLeave={() => setActive(null)}
        className={`sticky top-0 z-50 border-b-2 border-line bg-[#FAFAFA] transition-shadow duration-300 ${
          scrolled || active ? "shadow-[0_1px_0_rgba(0,0,0,0)]" : ""
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Logo />

          {/* デスクトップナビ */}
          <nav aria-label="グローバルナビゲーション" className="hidden h-full lg:block">
            <ul className="flex h-full items-stretch">
              {MEGA_MENU.map((item) => (
                <li
                  key={item.href}
                  className="flex items-stretch"
                  onMouseEnter={() => setActive(item.href)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 px-4 text-[0.92rem] font-normal tracking-wide text-[#323232] transition-colors hover:text-primary xl:px-5"
                    onFocus={() => setActive(item.href)}
                  >
                    {item.label}
                    <svg
                      width="14" height="14" viewBox="0 0 10 10" fill="none"
                      aria-hidden="true"
                      className={`transition-transform duration-300 ${active === item.href ? "rotate-180" : ""}`}
                    >
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden h-11 items-center gap-2 text-[0.92rem] font-normal tracking-wide text-[#323232] transition-colors hover:text-primary lg:inline-flex"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="16" height="12" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2.5 5l7.5 5.5L17.5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              お問い合わせ
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "メニューを閉じる" : "メニューを開く"}
              className="inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                {open ? (
                  <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.5" />
                ) : (
                  <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* メガメニュー・パネル */}
        {activeItem?.children && (
          <div className="absolute inset-x-0 top-full hidden border-t-2 border-b border-line bg-white shadow-[0_24px_40px_-24px_rgba(13,14,18,0.22)] lg:block">
            <div className="mx-auto flex max-w-[90rem]">
              {/* 左：グレーパネル（左画面端まで伸ばす） */}
              <div className="relative w-56 shrink-0 bg-[#FAFAFA] px-8 py-10 xl:w-64">
                {/* 左端まで塗りつぶす */}
                <div aria-hidden className="absolute inset-y-0 right-full w-[50vw] bg-[#FAFAFA]" />
                <div className="relative">
                  <p className="relative pl-3.5 text-[1.05rem] font-semibold leading-tight text-[#323232]">
                    <span aria-hidden className="absolute left-0 inset-y-[3px] w-[5px] bg-primary" />
                    {activeItem.label}
                  </p>
                  <p className="mt-3 text-[0.9rem] leading-6 text-[#323232]">
                    {activeItem.lead}
                  </p>
                </div>
              </div>

              {/* 右：リンク一覧 */}
              <div className="flex-1 px-10 py-8">
                {/* カテゴリ見出しリンク */}
                <Link
                  href={activeItem.href}
                  className="group mb-5 inline-flex items-center gap-1.5 border-b border-line pb-4"
                >
                  <span className="text-[1rem] font-semibold text-[#323232] transition-colors group-hover:text-primary">
                    {activeItem.label}
                  </span>
                  <span aria-hidden className="text-[#323232] transition-colors group-hover:text-primary">→</span>
                </Link>

                {/* 子項目グリッド */}
                <ul className="grid grid-cols-2 xl:grid-cols-3">
                  {activeItem.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="group flex w-full items-center justify-between py-4 pr-3 transition-colors hover:text-primary"
                      >
                        <span className="text-[0.9rem] font-normal text-[#323232] transition-colors group-hover:text-primary">
                          {c.label}
                        </span>
                        <svg
                          width="8" height="14" viewBox="0 0 8 14" fill="none"
                          aria-hidden className="ml-2 shrink-0 text-[#323232] transition-colors group-hover:text-primary"
                        >
                          <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* モバイルメニュー */}
        {open && (
          <nav
            id="mobile-menu"
            aria-label="モバイルナビゲーション"
            className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-line bg-[#FAFAFA] lg:hidden"
          >
            <ul className="px-5 py-2 sm:px-8">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between border-b border-line/70 py-4 text-[0.95rem] font-normal ${
                      isActive(item.href) ? "text-primary" : "text-[#323232]"
                    }`}
                  >
                    {item.label}
                    <span aria-hidden className="text-[1.15rem] leading-none text-faint">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
