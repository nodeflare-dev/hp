/**
 * 画像 URL の集約。現状は差し替え可能なプレースホルダー写真（Unsplash）。
 * 本番では自社の実写に差し替える（この定数を書き換えるだけでよい）。
 */
const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

export const IMG = {
  heroCompany: U("1522071820081-009f0129c71c", 2000),
  heroProduct: U("1518770660439-4636190af475", 2000),
  heroRecruit: U("1531973576160-7125cd663d86", 2000),

  bizNodeflare: U("1558494949-ef010cbdcc31", 1000),
  bizWasm: U("1526374965328-7f61d4dc18c5", 1000),
  bizSecurity: U("1451187580459-43490279c0fa", 1000),
  bizPerformance: U("1460925895917-afdab827c52f", 1000),

  product: U("1454165804606-c3d57bc86b40", 1400),

  // 社内・オフィスの人物写真（差し替え可能なプレースホルダー）
  promoCompany: U("1577415124269-fc1140a69e91", 1000),
  promoRecruit: U("1565350897149-38dfafa81d83", 1000),
  promoContact: U("1531537571171-a707bf2683da", 1000),

  // 提供内容カード用（テーマカラーに合う抽象系テック写真）
  feat1: U("1518770660439-4636190af475", 800),
  feat2: U("1558494949-ef010cbdcc31", 800),
  feat3: U("1451187580459-43490279c0fa", 800),
  feat4: U("1526374965328-7f61d4dc18c5", 800),

  // 提供内容セクション背景（紫系）
  featBg: U("1519389950473-47ba0277781c", 2000),

  // 採用ポジション（人物入りエンジニア写真）
  recruitBackend: U("1629904853893-c2c8981a1dc5", 800),
  recruitWasm: U("1549692520-acc6669e2f0c", 800),
  recruitSecurity: U("1620825937374-87fc7d6bddc2", 800),
  recruitPerf: U("1581091226825-a6a2a5aee158", 800),
} as const;
