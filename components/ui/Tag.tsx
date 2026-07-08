import type { ReactNode } from "react";

/** カテゴリー・タグ用の小さなラベル（矩形・小さめ）。 */
export function Tag({
  children,
  variant = "muted",
}: {
  children: ReactNode;
  variant?: "muted" | "primary" | "outline";
}) {
  const cls =
    variant === "primary"
      ? "bg-primary/8 text-primary"
      : variant === "outline"
        ? "border border-line text-muted"
        : "bg-background text-muted";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[0.7rem] font-normal tracking-wide ${cls}`}
    >
      {children}
    </span>
  );
}
