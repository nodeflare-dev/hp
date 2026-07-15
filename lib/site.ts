/**
 * サイト全体で共有する静的データ。
 * ロゴ・写真・実績は後から差し替え可能なプレースホルダー設計。
 */

export const SITE = {
  name: "NodeFlare, Inc.",
  nameJa: "株式会社NodeFlare",
  // 会社コピー / 企業説明（後で差し替え可能）
  copy: "技術で、社会の基盤をつくる。",
  tagline:
    "Web の速度・安全・信頼性を、エンタープライズ品質で。私たちは MCP ホスティング、WebAssembly、セキュリティ、パフォーマンスの領域で、事業を支えるソフトウェア基盤を提供します。",
  description:
    "NodeFlare は、MCP ホスティングプラットフォーム「NodeFlare」の提供を中核に、WebAssembly 開発、セキュリティ診断・修正、パフォーマンス診断・改善を手がける技術企業です。",
  // 公開 URL（本番ドメインに差し替え）
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nodeflare.example.com",
  locale: "ja_JP",
  email: "contact@nodeflare.example.com",
  telephone: "+81-3-0000-0000",
} as const;

/** 会社概要 */
export const COMPANY_PROFILE: { label: string; value: string }[] = [
  { label: "会社名", value: "株式会社NodeFlare / NodeFlare, Inc." },
  { label: "所在地", value: "〒100-0000 東京都千代田区（住所は後日掲載）" },
  { label: "設立", value: "2024年" },
  { label: "代表", value: "代表取締役 —（後日掲載）" },
  { label: "資本金", value: "—（後日掲載）" },
  {
    label: "事業内容",
    value:
      "MCP ホスティングプラットフォームの提供 / WebAssembly ソリューション開発 / セキュリティ診断・修正 / パフォーマンス診断・改善",
  },
];

/** グローバルナビゲーション */
export const NAV: { label: string; href: string }[] = [
  { label: "HOME", href: "/" },
  { label: "企業情報", href: "/company" },
  { label: "事業内容", href: "/business" },
  { label: "プロダクト", href: "/products" },
  { label: "技術", href: "/technology" },
  { label: "お知らせ", href: "/news" },
  { label: "採用情報", href: "/recruit" },
  { label: "お問い合わせ", href: "/contact" },
];

/** フッターのリンク構成 */
export const FOOTER_LINKS: { label: string; href: string }[] = [
  { label: "企業情報", href: "/company" },
  { label: "事業内容", href: "/business" },
  { label: "プロダクト", href: "/products" },
  { label: "採用", href: "/recruit" },
  { label: "お知らせ", href: "/news" },
  { label: "お問い合わせ", href: "/contact" },
  { label: "利用規約", href: "/terms" },
  { label: "プライバシーポリシー", href: "/privacy" },
];

/** メガメニュー（デスクトップナビの展開パネル） */
export type MegaItem = {
  label: string;
  href: string;
  lead?: string;
  children?: { label: string; href: string; desc?: string }[];
};

export const MEGA_MENU: MegaItem[] = [
  {
    label: "企業情報",
    href: "/company",
    lead: "技術で社会の基盤をつくる。私たちのミッション・ビジョン・沿革をご紹介します。",
    children: [
      { label: "会社概要", href: "/company#profile", desc: "会社名・所在地・事業内容" },
      { label: "代表メッセージ", href: "/company#message", desc: "経営トップからのご挨拶" },
      { label: "Mission / Vision / Value", href: "/company#philosophy", desc: "理念と価値観" },
      { label: "沿革", href: "/company#history", desc: "これまでの歩み" },
    ],
  },
  {
    label: "事業内容",
    href: "/business",
    lead: "MCP ホスティング・WebAssembly・セキュリティ・パフォーマンスの 4 領域で事業基盤を支えます。",
    children: [
      { label: "NodeFlare", href: "/business/nodeflare", desc: "MCP Hosting Platform" },
      { label: "WebAssembly開発", href: "/business/webassembly", desc: "高速な WebAssembly ソリューション" },
      { label: "セキュリティ診断・修正", href: "/business/security", desc: "脆弱性診断から修正対応まで" },
      { label: "パフォーマンス診断・改善", href: "/business/performance", desc: "Core Web Vitals・Next.js・インフラ" },
    ],
  },
  {
    label: "プロダクト",
    href: "/products",
    lead: "AI エージェント時代のバックエンドを支える、MCP ホスティングプラットフォーム。",
    children: [
      { label: "NodeFlare", href: "https://nodeflare.tech", desc: "MCP ホスティングプラットフォーム" },
    ],
  },
  {
    label: "技術",
    href: "/technology",
    lead: "Rust・Go・WebAssembly・Cloudflare など、信頼性とパフォーマンスを両立する技術スタック。",
    children: [
      { label: "技術一覧", href: "/technology", desc: "Cloudflare / WebAssembly / Rust / Go ほか" },
    ],
  },
  {
    label: "お知らせ",
    href: "/news",
    lead: "プレスリリースや技術トピックなど、NodeFlare からの最新情報をお届けします。",
    children: [
      { label: "すべてのお知らせ", href: "/news", desc: "プレスリリース・更新情報" },
      { label: "WebAssembly", href: "/news/webassembly", desc: "WebAssembly 関連トピック" },
      { label: "Security", href: "/news/security", desc: "セキュリティ関連トピック" },
      { label: "Performance", href: "/news/performance", desc: "パフォーマンス関連トピック" },
    ],
  },
  {
    label: "採用情報",
    href: "/recruit",
    lead: "基盤領域の難しさに面白さを見いだせるエンジニアを募集しています。",
    children: [
      { label: "募集職種", href: "/recruit#positions", desc: "現在募集中のポジション" },
      { label: "働く環境", href: "/recruit#environment", desc: "文化と働き方" },
      { label: "福利厚生", href: "/recruit#benefits", desc: "制度・サポート" },
      { label: "開発環境", href: "/recruit#dev-environment", desc: "技術スタック" },
    ],
  },
];

/** 事業内容（4事業） */
export type BusinessId = "nodeflare" | "webassembly" | "security" | "performance";

export type Business = {
  id: BusinessId;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  features: { stat: string; label: string }[];
};

export const BUSINESSES: Business[] = [
  {
    id: "security",
    title: "セキュリティ診断・修正",
    subtitle: "Security Assessment & Remediation",
    summary: "脆弱性診断から修正対応、セキュリティ改善まで伴走します。",
    description:
      "Web アプリケーション・インフラの脆弱性診断を行い、発見した問題の修正対応、そして継続的なセキュリティ改善までを支援します。診断して終わりではなく、直し切るところまで伴走します。セキュアコーディング・設計レビューを通じて、継続的に安全な開発体制を整えます。",
    features: [
      { stat: "100%", label: "修正まで一貫対応。発見だけで終わらせない" },
      { stat: "最短5日", label: "スピード診断で事業停滞を最小限に抑える" },
      { stat: "95%+", label: "診断後も継続支援でセキュリティ内製化を支える" },
      { stat: "200件+", label: "多業種の実績が根拠ある提言を可能にする" },
    ],
  },
  {
    id: "webassembly",
    title: "WebAssembly開発",
    subtitle: "High-performance WebAssembly Solutions",
    summary: "高速な WebAssembly ソリューションの設計・開発。Rust・Go を用いてブラウザ・エッジ・サーバーサイドを問わず、ネイティブに迫るパフォーマンスと高い移植性を両立する実装を提供します。既存アプリケーションへの段階的な組み込みにも対応します。",
    description:
      "Rust・Go を用いた WebAssembly ソリューションの設計から実装までを一貫して支援します。ブラウザ・エッジ・サーバーサイドを問わず、ネイティブに迫るパフォーマンスと高い移植性を両立する実装を提供します。",
    features: [
      { stat: "最大10倍", label: "ボトルネック処理をWasmへ移行した際の速度改善幅" },
      { stat: "40%減", label: "転送量を削減しモバイルでも高速な体験を実現" },
      { stat: "10ms以下", label: "エッジ実行でどの地域のユーザーにも即時応答" },
      { stat: "60%減", label: "段階移行で既存資産を活かしながらコストを抑制" },
    ],
  },
  {
    id: "nodeflare",
    title: "NodeFlare",
    subtitle: "MCP Hosting Platform",
    summary: "MCP サーバーを、本番品質でホスティングするプラットフォーム。デプロイ・スケーリング・監視・アクセス制御をワンストップで提供し、AI エージェント時代のバックエンド基盤を支えます。止まらない、崩れない、信頼できる基盤を届けることが私たちの使命です。",
    description:
      "NodeFlare は、Model Context Protocol（MCP）サーバーをスケーラブルかつ安全に運用するためのマネージドホスティングプラットフォームです。デプロイ、スケーリング、監視、アクセス制御をワンストップで提供し、AI エージェント時代のバックエンド基盤を支えます。",
    features: [
      { stat: "99.99%", label: "年間ダウンタイム52分以内のSLAで事業継続を保証" },
      { stat: "5分以内", label: "デプロイまで完結。本来の開発に集中できる" },
      { stat: "40ms以下", label: "世界中のユーザーへ低遅延でAIエージェントを届ける" },
      { stat: "30秒", label: "急増するリクエストに自動対応し機会損失をゼロに近づける" },
    ],
  },
  {
    id: "performance",
    title: "パフォーマンス診断・改善",
    subtitle: "Performance Assessment & Optimization",
    summary: "Core Web Vitals・Next.js・インフラを横断して速度を改善。計測・分析を起点にフロントエンドからインフラまで一貫して最適化します。体感速度とビジネス指標の両面から、確かな効果を出します。",
    description:
      "Core Web Vitals の計測・分析を起点に、フロントエンド（Next.js 最適化）からインフラまでを横断してパフォーマンスを改善します。体感速度とビジネス指標の両面から、確かな効果を出します。",
    features: [
      { stat: "平均40%", label: "LCP改善でファーストビューの体感速度を大幅に向上" },
      { stat: "25%減", label: "表示速度の改善が離脱を防ぎ滞在時間を伸ばす" },
      { stat: "18%増", label: "速さがそのままコンバージョン向上として売上に直結" },
      { stat: "30%減", label: "最適化されたインフラ設計で無駄なクラウド費用を削減" },
    ],
  },
];

export function getBusiness(id: string): Business | undefined {
  return BUSINESSES.find((b) => b.id === id);
}

/** 技術スタック */
export const TECHNOLOGIES: string[] = [
  "Rust",
  "Go",
  "TypeScript",
  "Next.js",
  "Cloudflare",
  "WebAssembly",
  "Docker",
  "AWS",
  "Kubernetes",
];

/** 技術ページ用：保有技術の紹介 */
export type TechDetail = {
  name: string;
  description: string;
};

export const TECH_DETAILS: TechDetail[] = [
  {
    name: "Cloudflare",
    description:
      "エッジコンピューティングと CDN を活用し、世界中のユーザーへ低レイテンシで安全にコンテンツとアプリケーションを届けます。",
  },
  {
    name: "WebAssembly",
    description:
      "ネイティブに迫る実行速度と高い移植性を実現。ブラウザからエッジ・サーバーまで、同じロジックを高速に動かします。",
  },
  {
    name: "Rust",
    description:
      "メモリ安全性と高いパフォーマンスを両立するシステムプログラミング言語。信頼性が求められる基盤の実装に用います。",
  },
  {
    name: "Go",
    description:
      "シンプルさと並行処理性能を武器に、スケーラブルなバックエンド・ネットワークサービスを構築します。",
  },
  {
    name: "Next.js",
    description:
      "App Router と Server Components を主体に、SEO・表示速度・開発生産性を高い水準で両立するフロントエンドを構築します。",
  },
  {
    name: "Three.js",
    description:
      "必要な場面では WebGL による表現も扱いますが、コーポレートサイトでは情報の探しやすさを最優先しています。",
  },
  {
    name: "Security",
    description:
      "脆弱性診断・セキュアコーディング・監査ログなど、エンタープライズ水準のセキュリティを設計段階から組み込みます。",
  },
  {
    name: "Performance Optimization",
    description:
      "Core Web Vitals を指標に、フロントエンドからインフラまで横断的に計測・改善を行います。",
  },
  {
    name: "TypeScript",
    description:
      "静的型付けによりバグを早期発見し、大規模コードベースでも安全かつ高速に開発を進めます。",
  },
];

/** Mission / Vision / Value */
export const PHILOSOPHY = {
  mission: {
    title: "Mission",
    heading: "技術で、社会の基盤をつくる。",
    body: "私たちは、速く・安全で・信頼できるソフトウェア基盤を通じて、事業と社会の成長を下支えします。派手さではなく、長く使われ続ける確かな品質を追求します。",
  },
  vision: {
    title: "Vision",
    heading: "選ばれ続ける、技術のパートナーへ。",
    body: "MCP ホスティングをはじめとする基盤領域で、エンタープライズから信頼される技術パートナーになること。10年後も選ばれ続ける企業を目指します。",
  },
  value: {
    title: "Value",
    heading: "私たちが大切にする、4つの価値観。",
    body: "NodeFlare が日々の仕事の中で判断の軸とする価値観です。技術的な意思決定から顧客との向き合い方まで、すべてこの4つに立ち返ります。",
    items: [
      {
        title: "品質第一",
        summary: "動くだけでなく、直し切る。長く使える品質にこだわります。",
        body: "動くだけでなく、直し切る。表面上の完成ではなく、長く使われ続けることを品質の基準に置きます。バグを先送りせず、技術的負債を積み上げず、後から読んでも理解できるコードを書く。それが私たちの品質へのこだわりです。",
      },
      {
        title: "誠実さ",
        summary: "できること・できないことを正直に伝え、期待を握ってから進めます。",
        body: "できること・できないことを正直に伝え、期待を握ってから前に進みます。都合の悪いことも隠さず共有し、問題が起きたときほど誠実に向き合う。信頼は誠実さの積み重ねによってのみ築かれると考えています。",
      },
      {
        title: "技術への探究",
        summary: "一次情報とドキュメントを重んじ、確かな理解に基づいて実装します。",
        body: "一次情報とドキュメントを重んじ、確かな理解に基づいて実装します。「なんとなく動いた」で終わらせず、なぜ動くのかを問い続ける。技術的な好奇心と謙虚さを持ち、変化する技術環境に誠実に向き合います。",
      },
      {
        title: "顧客の成功",
        summary: "納品ではなく、顧客のビジネス成果をゴールに置きます。",
        body: "納品ではなく、顧客のビジネス成果をゴールに置きます。要件を満たすことがゴールではなく、その先にある顧客の事業が成長することがゴールです。だから私たちは、完成した後も一緒に考え、改善し続けます。",
      },
    ],
  },
} as const;

/** 沿革（タイムライン） */
export const HISTORY: { year: string; text: string }[] = [
  { year: "2024", text: "株式会社NodeFlare 設立。" },
  { year: "2024", text: "MCP ホスティングプラットフォーム「NodeFlare」開発開始。" },
  { year: "2025", text: "WebAssembly 開発・セキュリティ・パフォーマンス支援を事業化。" },
  { year: "2025", text: "「NodeFlare」提供開始。" },
];

/** 代表メッセージ */
export const CEO_MESSAGE = {
  name: "代表取締役 —",
  title: "Message from the CEO",
  paragraphs: [
    "私たちが向き合っているのは、事業を支える「基盤」の領域です。基盤は目立ちませんが、止まれば事業が止まります。だからこそ、私たちは派手さより確かさを、その場しのぎより長く使える品質を大切にしています。",
    "AI エージェントの普及により、ソフトウェアの前提は大きく変わりつつあります。MCP ホスティング「NodeFlare」をはじめ、WebAssembly・セキュリティ・パフォーマンスの各領域で、変化の時代にこそ求められる「速く・安全で・信頼できる」基盤を提供してまいります。",
    "技術を通じて、お客様の事業と社会の基盤を、確かに支え続けること。それが私たちの約束です。",
  ],
} as const;

/** 採用情報 */
export const RECRUIT = {
  intro:
    "私たちは、基盤領域の難しさに面白さを見いだせる仲間を探しています。技術力・品質・エンタープライズ対応を大切にしながら、長く価値を出し続けられるチームを目指しています。",
  positions: [
    {
      title: "ソフトウェアエンジニア（バックエンド / プラットフォーム）",
      type: "正社員",
      description:
        "MCP ホスティング「NodeFlare」の設計・開発・運用を担っていただきます。Rust / Go / TypeScript を用いた基盤開発が中心です。",
    },
    {
      title: "WebAssembly エンジニア",
      type: "正社員",
      description:
        "Rust / Go を用いた WebAssembly ソリューションの設計・実装・最適化を担当していただきます。",
    },
    {
      title: "セキュリティエンジニア",
      type: "正社員 / 業務委託",
      description:
        "脆弱性診断から修正対応、セキュリティ改善までを一貫して手がけていただきます。",
    },
    {
      title: "パフォーマンスエンジニア",
      type: "正社員 / 業務委託",
      description:
        "Core Web Vitals を起点に、Next.js からインフラまで横断的な性能改善を担当していただきます。",
    },
  ],
  environment: {
    heading: "働く環境",
    body: "リモートを前提とした柔軟な働き方。ドキュメントと一次情報を重んじる文化のもと、落ち着いて技術と向き合える環境を用意しています。",
  },
  benefits: [
    "フルリモート・フレックスタイム制",
    "書籍・学習・カンファレンス参加支援",
    "最新スペックの開発機材支給",
    "各種社会保険完備",
    "副業・技術発信の推奨",
  ],
  devEnvironment: [
    "言語：Rust / Go / TypeScript",
    "フロントエンド：Next.js（App Router）",
    "インフラ：Cloudflare / AWS / Kubernetes / Docker",
    "その他：WebAssembly / セキュリティ / パフォーマンス最適化",
  ],
} as const;
