import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "プレミアム料金・無料版との違い｜はり太郎の東洋医学",
  description:
    "臨床ノートの保存枠、症例演習、比較ツールなど、無料とプレミアムの違いをご案内。料金と利用条件を確認できます。",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "プレミアム料金・無料版との違い｜はり太郎の東洋医学",
    description:
      "臨床ノートの保存枠、症例演習、比較ツールなど、無料とプレミアムの違いをご案内。料金と利用条件を確認できます。",
    url: "https://www.haritaro.jp/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
