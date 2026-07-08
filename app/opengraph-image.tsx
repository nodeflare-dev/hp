import { ImageResponse } from "next/og";

export const alt = "NodeFlare, Inc. — Enterprise-grade Software Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 日本語フォントの埋め込みが必要になるため、OG 画像内は ASCII で構成する。
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(60% 60% at 85% 15%, rgba(124,58,237,0.12), transparent 70%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#7c3aed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#111111" }}>
            NodeFlare
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 68,
              fontWeight: 800,
              color: "#111111",
              lineHeight: 1.15,
              letterSpacing: -1,
            }}
          >
            <span>Enterprise-grade</span>
            <span>Software Infrastructure</span>
          </div>
          <div style={{ fontSize: 30, color: "#6b7280" }}>
            MCP Hosting · WebAssembly · Security · Performance
          </div>
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#7c3aed",
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          NODEFLARE, INC.
        </div>
      </div>
    ),
    { ...size },
  );
}
