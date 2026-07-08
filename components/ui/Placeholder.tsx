/* eslint-disable @next/next/no-img-element */

/**
 * 画像枠。src があれば実写、無ければ中立的な面を表示する。
 * 写真は後から差し替え可能（lib/images.ts）。
 */
export function Placeholder({
  src,
  alt = "",
  ratio = "16/9",
  className = "",
  tone = "light",
  overlay = false,
}: {
  src?: string;
  alt?: string;
  ratio?: "16/9" | "4/3" | "1/1" | "3/2" | "21/9" | "4/5" | "3/4";
  className?: string;
  tone?: "light" | "dark";
  overlay?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: dark
              ? "linear-gradient(135deg, #16171d 0%, #1e1f28 50%, #2a2333 100%)"
              : "linear-gradient(135deg, #eef0f4 0%, #e6e8ee 50%, #edeaf6 100%)",
          }}
        />
      )}
      {overlay && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(8,9,12,0.55) 0%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}
