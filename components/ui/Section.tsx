import type { ReactNode } from "react";
import { Container } from "./Container";

/** 縦の余白を大きく取ったセクション。背景色を切り替え可能。 */
export function Section({
  children,
  className = "",
  background = "transparent",
  id,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  background?: "transparent" | "surface" | "muted" | "ink";
  id?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const bg =
    background === "surface"
      ? "bg-surface"
      : background === "muted"
        ? "bg-background"
        : background === "ink"
          ? "bg-ink text-white"
          : "";
  return (
    <section
      id={id}
      className={`py-24 sm:py-28 lg:py-36 ${bg} ${className}`}
    >
      <Container size={size}>{children}</Container>
    </section>
  );
}
