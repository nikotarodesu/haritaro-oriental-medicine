import { Metadata } from "next";
import Link from "next/link";
import { Layers } from "lucide-react";
import ThreeStageSimulator from "@/components/ThreeStageSimulator";

export const metadata: Metadata = {
  title: "三段階フィルタリング臨床弁証シミュレーター | はり太郎の東洋医学",
  description:
    "八綱（表裏・寒熱・虚実）➜ 気血水（運動動態）➜ 臓腑経絡（局在病位）の3段階で病態を絞り込み、自動で「一文の証」と最小構成のペアツボを導出する臨床家・学習者向けWebツール。",
};

export default function SimulatorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
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

      {/* ページヘッダー */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-semibold tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
          <span>臨床実践論・弁証論治ツール</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
          三段階フィルタリング<br className="hidden sm:inline" />
          臨床弁証シミュレーター
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          八綱（深浅・勢い） ➜ 気血水（動態） ➜ 臓腑経絡（局在病位）を段階的に選択することで、
          複雑な病態から<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「一文の証」</strong>を抽出し、
          最小手数で最大の効果を狙う<strong className="text-[#1E3D34] dark:text-[#74BA9E]">「最小構成のペアツボ」</strong>を瞬時に導き出します。
        </p>

        {/* 3ステップの解説ピル */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
            <span className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] block mb-1">
              STEP 1: 八綱フィルタ
            </span>
            <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
              表裏・寒熱・虚実
            </p>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
              病の深浅、温度傾向、生体反応の過不足と勢いを大枠で把握。
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
            <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
              STEP 2: 気血水動態
            </span>
            <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
              循環・過不足の動態
            </p>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
              気滞・気虚・血虚・瘀血・水滞など、生体因子の運動異常を特定。
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
            <span className="text-[10px] font-bold text-[#1E2D3D] dark:text-[#6FA0D6] block mb-1">
              STEP 3: 臓腑局在
            </span>
            <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-0.5">
              五臓五腑・経脈
            </p>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
              肝胆・心・脾胃・肺・腎の失調病位へフォーカスを決定。
            </p>
          </div>
        </div>
      </div>

      {/* シミュレーター本体 */}
      <ThreeStageSimulator />
    </div>
  );
}
