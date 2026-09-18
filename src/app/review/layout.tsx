import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "忘却曲線スマート復習｜エビングハウスの間隔反復による知識定着演習",
  description:
    "受講したカリキュラムの確認問題や症例演習の回答履歴から、最適なインターバルで自動出題。短時間の反復演習で東洋医学の重要知識を着実に定着させます。",
  alternates: {
    canonical: "/review",
  },
  openGraph: {
    title: "忘却曲線スマート復習｜エビングハウスの間隔反復による知識定着演習",
    description: "学習履歴に基づき、最適なタイミングで重要問題を再出題するスマート復習機能。",
    url: "https://www.haritaro.jp/review",
  },
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
