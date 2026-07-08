/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { SITE } from "@/lib/site";

/**
 * ロゴ。画像はユーザーが用意する前提。
 * public/logo.png に差し替えるだけで表示される。
 * ここではロゴのデザインは行わない。
 */
export function Logo() {
  return (
    <Link
      href="/"
      aria-label={`${SITE.nameJa} ホームへ`}
      className="inline-flex items-center"
    >
      <img
        src="/logo.png"
        alt={SITE.nameJa}
        className="h-8 w-auto"
      />
    </Link>
  );
}
