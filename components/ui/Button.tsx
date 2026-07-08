import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "invert";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 text-[0.9rem] font-normal tracking-wide transition-colors duration-300";

// 角は鋭く（rounded なし）。エンタープライズらしい硬質さ。
const variants: Record<Variant, string> = {
  primary:
    "h-13 px-8 bg-ink text-white hover:bg-primary",
  outline:
    "h-13 px-8 border border-line-strong text-ink hover:border-ink bg-transparent",
  invert: "h-13 px-8 bg-white text-ink hover:bg-primary hover:text-white",
  ghost: "text-ink hover:text-primary",
};

const Arrow = () => (
  <svg
    width="18"
    height="10"
    viewBox="0 0 18 10"
    fill="none"
    aria-hidden="true"
    className="overflow-visible"
  >
    <line
      x1="0"
      y1="5"
      x2="16"
      y2="5"
      stroke="currentColor"
      strokeWidth="1.25"
      className="origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-x-110"
    />
    <path
      d="M12 1L16 5L12 9"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1"
    />
  </svg>
);

/** リンクとして動作するボタン。矩形・細字トラッキングで硬質に。 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  withArrow = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  external?: boolean;
}) {
  const isGhost = variant === "ghost";
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {isGhost ? (
        <span className="inline-block">{children}</span>
      ) : (
        children
      )}
      {withArrow && <Arrow />}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
