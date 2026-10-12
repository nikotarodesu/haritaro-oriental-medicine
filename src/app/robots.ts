import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/auth/",
          "/account/",
        ],
      },
      // 検索用・学習用クローラーの既存の公開範囲を維持。用途は同一ではない。
      // OAI-SearchBot（検索）は上の * で許可。GPTBot はモデル学習用。
      {
        userAgent: [
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/api/", "/auth/", "/account/"],
      },
    ],
    sitemap: "https://www.haritaro.jp/sitemap.xml",
    host: "https://www.haritaro.jp",
  };
}
