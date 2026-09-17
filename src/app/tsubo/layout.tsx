import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "経穴辞典｜人体図・経絡・要穴から探す（WHO標準361穴） | はり太郎の東洋医学",
  description:
    "WHO標準361経穴に対応する図解データベース。人体図セレクター、14経脈流注、要穴分類マトリクス、浅深連動の断面解剖図、取穴手順、はり太郎の臨床知見を完全網羅。",
  alternates: {
    canonical: "/tsubo",
  },
  openGraph: {
    title: "経穴辞典｜人体図・経絡・要穴から探す | はり太郎の東洋医学",
    description: "WHO標準361経穴に対応する図解データベース。人体図や断面解剖図から直感的に探せます。",
    url: "https://www.haritaro.jp/tsubo",
  },
};

export default function TsuboLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
