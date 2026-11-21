import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/config/seo";
import { BRAND_INK, BRAND_PAPER } from "@/config/brand";
import { PLATFORM_DESCRIPTION, SERIES } from "@/config/series";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "はり太郎",
    description: PLATFORM_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: BRAND_PAPER,
    theme_color: BRAND_INK,
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "講義の復習",
        short_name: "復習",
        description: "講義の確認問題を、復習時期と回答履歴に合わせて解き直す",
        url: "/learn/review",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "弁証の練習",
        short_name: "シミュレーター",
        description: "模擬症例の手がかりから、体の状態をどう考えるか練習します。",
        url: "/simulator",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "症状から探す",
        short_name: "症状ガイド",
        description: "12の症状ガイドと受診の目安",
        url: "/symptoms",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: SERIES.dictionary.name,
        short_name: SERIES.dictionary.shortName,
        description: "WHO標準361穴の部位・解剖・取穴法・臨床主治",
        url: "/tsubo",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
