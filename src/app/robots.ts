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
      // 生成AI検索クローラー（GEO）を明示的に歓迎
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
