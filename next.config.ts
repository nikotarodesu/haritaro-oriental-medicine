import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // セキュリティ向上と不要なHTTPレスポンスヘッダーの削減
  poweredByHeader: false,
  // 転送データ圧縮の最適化
  compress: true,
  // 本番環境における不要な console.log の自動除去（error, warnは維持）
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
