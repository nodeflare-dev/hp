import type { ReactNode } from "react";

/** 中央寄せの最大幅コンテナ。大きな余白を確保する。 */
export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const max =
    size === "narrow"
      ? "max-w-3xl"
      : size === "wide"
        ? "max-w-7xl"
        : "max-w-6xl";
  return (
    <div className={`mx-auto w-full ${max} px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
