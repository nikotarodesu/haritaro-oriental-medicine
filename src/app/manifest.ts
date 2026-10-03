import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/config/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "はり太郎",
    description: "東洋医学の基礎から弁証・配穴推論、臨床カルテ記録、鍼灸国家試験対策までを網羅する総合プラットフォーム",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F4EE",
    theme_color: "#184F49",
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
        name: "国家試験対策特設ハブ",
        short_name: "国試対策",
        description: "忘却曲線復習・日替わり特訓・本試験過去問アーカイブ",
        url: "/kokushi",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "臨床弁証シミュレーター",
        short_name: "シミュレーター",
        description: "八綱・気血水・臓腑経絡の3段階連動で証と配穴を導出",
        url: "/simulator",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "臨床カルテ・ノート",
        short_name: "カルテ・ノート",
        description: "患者カルテ、配穴ストック、A4養生処方せん印刷",
        url: "/notes",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "経穴辞典（361穴）",
        short_name: "経穴辞典",
        description: "WHO標準361穴の部位・解剖・取穴法・臨床主治",
        url: "/tsubo",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
