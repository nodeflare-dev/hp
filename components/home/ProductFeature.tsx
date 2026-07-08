import { Container } from "@/components/ui/Container";

/** 自社プロダクト NodeFlare の動画セクション（動画がメイン）。 */
export function ProductFeature() {
  return (
    <section className="bg-surface pt-12 pb-24 sm:pt-16 sm:pb-32">
      <Container size="wide">
        <div className="mx-auto max-w-5xl text-center">
          {/* 上のタイトル */}
          <h2 className="text-[1.35rem] font-medium tracking-tight text-[#333333] sm:text-[1.7rem]">
            MCP特化のホスティングサービス
          </h2>

          {/* 動画（YouTube 埋め込み。本番は NodeFlare の動画IDに差し替え） */}
          <div className="mx-auto mt-5 max-w-4xl overflow-hidden border border-line">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/aqz-KE-bpKQ"
                title="NodeFlare — MCP ホスティングサービス"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* 動画下の説明（2行） */}
          <p className="mx-auto mt-8 max-w-2xl text-[1rem] leading-8 text-ink-soft">
            MCP サーバーのデプロイ・スケーリング・監視・アクセス制御を、ワンストップで提供。
            <br className="hidden sm:block" />
            AI エージェント時代のバックエンド基盤を、本番品質で支えるマネージドホスティングです。
          </p>
        </div>
      </Container>
    </section>
  );
}
