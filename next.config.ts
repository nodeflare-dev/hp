import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hygraph（GraphCMS）のメディア配信ドメインを許可。
    // 別の CDN を使う場合はここに追記する。
    remotePatterns: [
      { protocol: "https", hostname: "media.graphassets.com" },
      { protocol: "https", hostname: "**.graphassets.com" },
      { protocol: "https", hostname: "**.hygraph.com" },
    ],
  },
};

export default nextConfig;
