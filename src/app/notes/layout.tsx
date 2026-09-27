import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "鍼灸の臨床ノート・配穴記録｜マイノート｜はり太郎",
  description:
    "弁証・配穴・施術後の変化をまとめ、次の施術で振り返るための臨床ノート。完成見本と無料で使える範囲、保存方法を確認できます。",
  alternates: {
    canonical: "/notes",
  },
  openGraph: {
    title: "鍼灸の臨床ノート・配穴記録｜マイノート｜はり太郎",
    description:
      "弁証・配穴・施術後の変化をまとめ、次の施術で振り返るための臨床ノート。完成見本と無料で使える範囲、保存方法を確認できます。",
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
