# Hygraph（CMS）連携ガイド

このサイトの「お知らせ」は **Hygraph** で管理します。
環境変数が **未設定でもサイトは完全に動作**します（`lib/news.ts` 内のサンプルデータにフォールバック）。
環境変数を設定すると、自動的に Hygraph からコンテンツを取得します。

> 環境変数はあとで設定します。設定後、コード変更は不要です（`lib/news.ts` がそのまま動きます）。

---

## 1. 設定する環境変数

プロジェクトルートに `.env.local` を作成し、以下を設定してください（`.env.example` をコピー）。

```bash
# Hygraph の Content API エンドポイント（必須）
# Hygraph 管理画面 → Project settings → Access → Endpoints → "Content API"
HYGRAPH_ENDPOINT="https://<region>.cdn.hygraph.com/content/<projectId>/master"

# 認証トークン（任意）
# 公開コンテンツ（Published + Public Content API 権限）だけなら不要。
# 下書き取得や、公開権限を絞っている場合は Permanent Auth Token を設定する。
# Hygraph 管理画面 → Project settings → Access → Permanent Auth Tokens
HYGRAPH_TOKEN="<permanent-auth-token>"

# 本番サイトの公開 URL（sitemap / OGP / canonical に使用。末尾スラッシュなし）
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

### 設定場所

- **ローカル開発**: `front/.env.local`
- **Vercel**: Project → Settings → Environment Variables に同じキーを追加

`HYGRAPH_TOKEN` はサーバー専用です（`NEXT_PUBLIC_` を付けない＝クライアントに漏れない）。

---

## 2. Hygraph 側で用意するスキーマ

**共通スキーマ**で「お知らせ / WebAssembly / Security / Performance」をすべて管理します
（要件どおり、カテゴリーで区別する単一モデル）。

### モデル名：`Post`（API ID: `post` / 複数形 `posts`）

| フィールド      | API ID        | 型                         | 必須 | 備考                                                                 |
| --------------- | ------------- | -------------------------- | ---- | -------------------------------------------------------------------- |
| Title           | `title`       | Single line text           | ✅   | 記事タイトル                                                         |
| Slug            | `slug`        | Slug（unique）             | ✅   | URL に使用（例：`nodeflare-launch`）                                 |
| Excerpt         | `excerpt`     | Multi line text            |      | 一覧・メタディスクリプション用の要約                                 |
| Content         | `content`     | Rich text                  |      | 本文。**`.html` を取得**して描画                                     |
| Category        | `category`    | Enumeration（`Category`）  | ✅   | 値：`News` / `WebAssembly` / `Security` / `Performance`              |
| Tags            | `tags`        | Single line text（**List**）|      | 複数タグ                                                             |
| Author          | `author`      | Single line text           |      | 著者名（未設定時は「NodeFlare 編集部」）                            |
| Cover Image     | `coverImage`  | Asset（single）            |      | カバー画像（任意）                                                   |
| Published At    | `publishedAt` | Date and time              | ✅   | 公開日（表示・並び順に使用）                                         |
| Updated At      | `updatedAt`   | Date and time              |      | 更新日（未設定時は publishedAt を使用）                              |

> Hygraph には システムフィールドの `publishedAt` / `updatedAt` も存在します。
> 表示用に**独自の日時フィールドを用意する**（上表のとおり）と、公開操作と表示日を分離できて安全です。
> システムフィールドをそのまま使いたい場合は、`lib/news.ts` の GraphQL クエリのフィールド名を合わせてください。

### Enumeration：`Category`

以下の値を定義します（**表示ラベルとの対応は `lib/news.ts` の `NEWS_CATEGORIES`**）。

| Hygraph の値   | サイト内 slug   | 表示ラベル     | URL              |
| -------------- | --------------- | -------------- | ---------------- |
| `News`         | `news`          | お知らせ       | `/news`          |
| `WebAssembly`  | `webassembly`   | WebAssembly    | `/news/webassembly` |
| `Security`     | `security`      | Security       | `/news/security` |
| `Performance`  | `performance`   | Performance    | `/news/performance` |

---

## 3. 権限（公開設定）

CDN の Content API で **Published** コンテンツを匿名取得できるようにします。

- Project settings → Access → **Public Content API**
- `Post` モデルの **Read**（Published stage）を許可

権限を絞って匿名読み取りを許可しない場合は、`HYGRAPH_TOKEN`（Permanent Auth Token, Read 権限）を設定してください。

---

## 4. コード側の対応状況（実装済み）

- `lib/news.ts`
  - `HYGRAPH_ENDPOINT` があれば Hygraph、なければサンプルデータを返す（フォールバック）。
  - GraphQL は `fetch` で送信し、**ISR（1 時間）+ タグ `news`** でキャッシュ。
  - フィールドのマッピング（`content.html`、`category` → slug 変換など）は実装済み。
- `next.config.ts`
  - Hygraph のメディアドメイン（`*.graphassets.com` 等）を `images.remotePatterns` に許可済み。
- 記事詳細・カテゴリー・一覧・RSS・sitemap・JSON-LD すべて Hygraph データに追従します。

### 記事更新後にキャッシュを即時反映したい場合（任意）

オンデマンド再検証用の Route Handler を追加し、Hygraph の Webhook から叩く構成が可能です。
（未実装。必要になったら `app/api/revalidate/route.ts` を作成し、`revalidateTag("news", "max")` を呼ぶ）

```ts
// 例：app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";
export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }
  revalidateTag("news", "max"); // Next.js 16 では第2引数が必須
  return Response.json({ revalidated: true });
}
```

その場合、環境変数 `REVALIDATE_SECRET` を追加し、Hygraph の Webhook URL を
`https://your-domain.com/api/revalidate?secret=<REVALIDATE_SECRET>` に設定します。

---

## 5. 動作確認

1. `.env.local` に `HYGRAPH_ENDPOINT` を設定
2. Hygraph で `Post` を 1 件作成し **Publish**
3. `npm run dev` → `/news` に記事が表示されれば連携成功
4. 環境変数を外すと、サンプルデータ表示に戻ります（フォールバック確認）
