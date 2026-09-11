"use client";

import React from "react";
import { Sparkles, Cog, Check, ArrowRightLeft, Shield, HeartPulse } from "lucide-react";

export default function YinYangEastWestMatrix() {
  return (
    <figure className="my-6 sm:my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-6 md:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 mb-4 sm:mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑧：東西医学の相補マトリクス</span>
          </span>
          <h4 className="font-serif font-bold text-base sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            歯車のように噛み合う「西洋医学（陽）× 東洋医学（陰）」の統合医療
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          対立ではなく「相互補完」の最適解
        </span>
      </div>

      {/* 噛み合うギア（歯車）ビジュアル */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-3 sm:p-6 mb-4 sm:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
          {/* 西洋医学ギア（陽） */}
          <div className="md:col-span-5 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#1A2530] border-2 border-[#C45A4A]/50 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#C45A4A]" />
                <h5 className="font-serif font-bold text-base text-[#C45A4A] dark:text-[#F87171]">
                  西洋医学（陽の医療）
                </h5>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FCF4EB] text-[#C45A4A]">
                構造・局所・救急
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#59615D] dark:text-[#A0B0BC]">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C45A4A] shrink-0" />
                <span><strong>アプローチ：</strong>要素還元論・局所解剖・病因特定</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C45A4A] shrink-0" />
                <span><strong>診断武器：</strong>血液検査・画像診断（CT/MRI）・生検</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C45A4A] shrink-0" />
                <span><strong>得意領域：</strong>感染症撲滅・救急蘇生・外科手術・急性期</span>
              </li>
            </ul>
          </div>

          {/* 中央：噛み合いアニメーションアイコン */}
          <div className="md:col-span-2 flex flex-col items-center justify-center py-2">
            <div className="relative flex items-center justify-center">
              <Cog className="w-10 h-10 text-[#C45A4A] animate-spin" style={{ animationDuration: "12s" }} />
              <Cog className="w-8 h-8 text-[#1E3A5F] dark:text-[#60A5FA] -ml-2.5 -mt-3 animate-spin" style={{ animationDuration: "9s", animationDirection: "reverse" }} />
            </div>
            <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] mt-2 text-center">
              シームレスに連動
            </span>
          </div>

          {/* 東洋医学ギア（陰） */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#1A2530] border-2 border-[#1E3A5F]/50 dark:border-[#60A5FA]/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#1E3A5F] dark:text-[#60A5FA]" />
                <h5 className="font-serif font-bold text-base text-[#1E3A5F] dark:text-[#60A5FA]">
                  東洋医学（陰の医療）
                </h5>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF1F6] text-[#1E3A5F] dark:text-[#60A5FA]">
                機能・全体・未病
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#59615D] dark:text-[#A0B0BC]">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1E3A5F] dark:text-[#60A5FA] shrink-0" />
                <span><strong>アプローチ：</strong>複雑系全体論・生体情報ネットワーク・証診断</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1E3A5F] dark:text-[#60A5FA] shrink-0" />
                <span><strong>診断武器：</strong>四診（望聞問切）・脈診・舌診・腹診</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1E3A5F] dark:text-[#60A5FA] shrink-0" />
                <span><strong>得意領域：</strong>自律神経失調・慢性疼痛・冷え・不定愁訴・未病治</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 急性期 vs 慢性期 役割分担マトリクス表 */}
      <div className="overflow-x-auto rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-bold border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
            <tr>
              <th className="p-3.5 font-serif w-28">病期ステージ</th>
              <th className="p-3.5 font-serif text-[#C45A4A] dark:text-[#F87171]">西洋医学（主導 / 支援）</th>
              <th className="p-3.5 font-serif text-[#1E3A5F] dark:text-[#60A5FA]">東洋医学（主導 / 支援）</th>
              <th className="p-3.5 font-serif">理想の統合医療モデル</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5DEC9]/60 dark:divide-[#2A3B4A]/60 bg-white dark:bg-[#17212A]">
            <tr className="hover:bg-[#FAF8F5] dark:hover:bg-[#1C2834]">
              <td className="p-3.5 font-bold text-[#232826] dark:text-[#FAF8F5]">
                <span className="px-2 py-0.5 rounded bg-[#FCF4EB] text-[#C45A4A] font-mono text-[10px] block w-fit mb-1">陽の病期</span>
                急性期・救急<br />（骨折・心筋梗塞・高熱感染症など）
              </td>
              <td className="p-3.5 text-[#333835] dark:text-[#C5D2DB]">
                <strong className="text-[#C45A4A] block mb-0.5">【主導】</strong>
                画像診断・抗生剤投与・外科的切除・心肺蘇生による速やかな生命維持。
              </td>
              <td className="p-3.5 text-[#333835] dark:text-[#C5D2DB]">
                <strong className="text-[#1E3A5F] dark:text-[#60A5FA] block mb-0.5">【支援】</strong>
                術後の麻酔・嘔気緩和、体力回復（補気）、局所浮腫の早期軽減。
              </td>
              <td className="p-3.5 text-[#59615D] dark:text-[#96A6B2]">
                まず西洋医学で危険を除外（レッドフラッグ鑑別）し、安全を確保。
              </td>
            </tr>

            <tr className="hover:bg-[#FAF8F5] dark:hover:bg-[#1C2834]">
              <td className="p-3.5 font-bold text-[#232826] dark:text-[#FAF8F5]">
                <span className="px-2 py-0.5 rounded bg-[#EBF1F6] text-[#1E3A5F] dark:text-[#60A5FA] font-mono text-[10px] block w-fit mb-1">陰の病期</span>
                慢性期・不定愁訴<br />（自律神経失調・慢性疲労・冷え・PMS）
              </td>
              <td className="p-3.5 text-[#333835] dark:text-[#C5D2DB]">
                <strong className="text-[#C45A4A] block mb-0.5">【支援】</strong>
                重大疾患の潜伏スクリーニング、定期的な血液生化学モニタリング。
              </td>
              <td className="p-3.5 text-[#333835] dark:text-[#C5D2DB]">
                <strong className="text-[#1E3A5F] dark:text-[#60A5FA] block mb-0.5">【主導】</strong>
                経絡・臓腑調整、気血水の動的平衡回復、体質改善・生活指導。
              </td>
              <td className="p-3.5 text-[#59615D] dark:text-[#96A6B2]">
                「検査で異常なし」と言われた不調を東洋医学が丸ごと引き受けて改善。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </figure>
  );
}
