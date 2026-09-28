import { Metadata } from "next";
import LibraryClient from "./LibraryClient";

export const metadata: Metadata = {
  title: "文献・古典・臨床実例アーカイブ",
  description:
    "数千年の知恵が凝縮された古典医典（素問・霊枢・難経）から国際学術誌のRCT論文エビデンス、運動器疾患・自律神経の臨床実例まで。臨床判断と学術的探求を支える統合ナレッジベース。",
  alternates: {
    canonical: "/library",
  },
  openGraph: {
    title: "文献・古典・臨床実例アーカイブ | はり太郎の東洋医学",
    description:
      "古典医典条文、現代RCT論文エビデンス、運動器臨床実例をシームレスに統合した学術ナレッジベース。",
    url: "https://www.haritaro.jp/library",
  },
};

export default function LibraryPage() {
  return <LibraryClient />;
}
