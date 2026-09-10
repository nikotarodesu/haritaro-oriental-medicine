import { Metadata } from "next";
import Link from "next/link";
import SimulatorHub from "@/components/SimulatorHub";

export const metadata: Metadata = {
  title: "臨床弁証シミュレーター（八綱・気血水・臓腑経絡） | はり太郎の東洋医学",
  description:
    "東洋医学の臨床現場に基づく実践ツール。八綱（深浅・勢い）➜ 気血水（動態）➜ 臓腑経絡（局在病位）の3段階連動で一文の証と最小構成のペアツボを瞬時に導き出します。",
};

export default function SimulatorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
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
