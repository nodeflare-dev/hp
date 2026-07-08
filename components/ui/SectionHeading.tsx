import type { ReactNode } from "react";

/**
 * セクション見出し。日本語の大見出し + （必要なら）短い説明。
 * 装飾の英字ラベルは使わない。
 */
export function SectionHeading({
  title,
  description,
  align = "left",
  invert = false,
}: {
  /** 互換用（未使用） */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  /** 互換用（未使用） */
  index?: string;
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <h2
        className={`text-[1.9rem] font-medium leading-tight tracking-[-0.02em] sm:text-[2.35rem] ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-[0.98rem] leading-8 ${
            invert ? "text-white/65" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
