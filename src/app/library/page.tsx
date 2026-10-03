import { pageSocialMetadata } from "@/config/seo";
import { Metadata } from "next";
import LibraryClient from "./LibraryClient";

export const metadata: Metadata = {
  title: "文献・古典・臨床実例アーカイブ",
  description:
    "古典条文、原典と書誌情報を照合した研究資料、症例教材の資料集。研究対象・限界・内容の確認状況を区別して学べます。",
  alternates: {
    canonical: "/library",
  },
  ...pageSocialMetadata(
    "文献・古典・臨床実例アーカイブ",
    "古典・書誌を照合した研究資料・症例教材。研究対象、限界、確認状況を公開する学習用資料集。",
    "/library",
  ),
};

export default function LibraryPage() {
  return <LibraryClient />;
}
