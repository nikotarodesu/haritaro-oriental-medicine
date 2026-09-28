import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "はり太郎の東洋医学｜東洋医学・鍼灸学習＆臨床支援",
    short_name: "はり太郎",
    description: "東洋医学の基礎から弁証・配穴推論、臨床カルテ記録、鍼灸国家試験対策までを網羅する総合プラットフォーム",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#1E3D34",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
