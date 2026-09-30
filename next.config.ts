import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // セキュリティ向上と不要なHTTPレスポンスヘッダーの削減
  poweredByHeader: false,
  // 転送データ圧縮の最適化
  compress: true,
  // 次世代高圧縮画像フォーマット（AVIF / WebP）の自動配信（データ転送量20〜50%削減）
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // 本番環境における不要な console.log の自動除去（error, warnは維持）
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  // 恒久リダイレクト設定（旧URL・誤リンクの救済）
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/mynote",
        destination: "/notes",
        permanent: true,
      },
      {
        source: "/review",
        destination: "/kokushi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
