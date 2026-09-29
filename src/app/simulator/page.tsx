import { Metadata } from "next";
import Link from "next/link";
import SimulatorHub from "@/components/SimulatorHub";

export const metadata: Metadata = {
  title: "臨床弁証推論シミュレーター｜八綱・気血水・臓腑の連動分析",
  description:
    "患者の自覚症状・身体サインから八綱・気血水・臓腑弁証を推論。2案比較検討機能により、病態の鑑別と本治・標治の配穴根拠を臨床的に整理。",
  alternates: {
    canonical: "https://www.haritaro.jp/simulator",
  },
  openGraph: {
    title: "臨床弁証推論シミュレーター｜八綱・気血水・臓腑の連動分析｜はり太郎",
    description:
      "患者の自覚症状・身体サインから八綱・気血水・臓腑弁証を推論。2案比較検討機能により、病態の鑑別と本治・標治の配穴根拠を臨床的に整理。",
    url: "https://www.haritaro.jp/simulator",
  },
};

export default function SimulatorPage() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-14 space-y-6 sm:space-y-8">
      {/* パンくずリスト */}
      <nav className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6]">
        <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
          ホーム
        </Link>
        <span>/</span>
        <span className="text-[#232826] dark:text-[#FAF8F5] font-semibold">
          臨床弁証シミュレーター
        </span>
      </nav>

      {/* シミュレーター統合ハブ */}
      <SimulatorHub />
    </div>
  );
}
