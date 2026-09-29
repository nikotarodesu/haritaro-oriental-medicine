import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "臨床ノート・配穴ストック｜鍼灸臨床の記録・振り返り・養生シート印刷",
  description:
    "施術記録（主訴・弁証・採用配穴・術後変化・次回課題）を蓄積・検索できる臨床ノート。重要配穴のストック機能、患者にお渡しするA4養生シート印刷に対応。",
  alternates: {
    canonical: "/notes",
  },
  openGraph: {
    title: "臨床ノート・配穴ストック｜鍼灸臨床の記録・振り返り・養生シート印刷｜はり太郎",
    description:
      "施術記録（主訴・弁証・採用配穴・術後変化・次回課題）を蓄積・検索できる臨床ノート。重要配穴のストック機能、患者にお渡しするA4養生シート印刷に対応。",
    url: "https://www.haritaro.jp/notes",
  },
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
