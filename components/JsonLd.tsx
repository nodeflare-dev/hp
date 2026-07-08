/**
 * JSON-LD 構造化データを埋め込むサーバーコンポーネント。
 * XSS 対策として "<" をエスケープしてから出力する。
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
