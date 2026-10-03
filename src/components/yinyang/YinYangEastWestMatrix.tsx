"use client";

import React from "react";
import { Sparkles, Cog, Check, Shield, HeartPulse } from "lucide-react";

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
            必要な医療評価と補完的ケアの併用を考える
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          方法・症状ごとの根拠と安全性を確認
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
                  現代医学による診療
                </h5>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FCF4EB] text-[#C45A4A]">
                診断・治療・経過観察
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#59615D] dark:text-[#A0B0BC]">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C45A4A] shrink-0" />
                <span><strong>アプローチ：</strong>病歴・診察・検査と研究に基づく評価</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C45A4A] shrink-0" />
                <span><strong>検査例：</strong>必要に応じた血液検査・画像診断・生検</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#C45A4A] shrink-0" />
                <span><strong>対応例：</strong>救急医療・感染症の診療・手術・慢性疾患の管理</span>
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
              情報共有して検討
            </span>
          </div>

          {/* 東洋医学ギア（陰） */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#1A2530] border-2 border-[#1E3A5F]/50 dark:border-[#60A5FA]/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#1E3A5F] dark:text-[#60A5FA]" />
                <h5 className="font-serif font-bold text-base text-[#1E3A5F] dark:text-[#60A5FA]">
                  伝統医学・補完的ケア
                </h5>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF1F6] text-[#1E3A5F] dark:text-[#60A5FA]">
                伝統分類・施術・養生
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#59615D] dark:text-[#A0B0BC]">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1E3A5F] dark:text-[#60A5FA] shrink-0" />
                <span><strong>伝統的な枠組み：</strong>陰陽・気血・臓腑等による証の分類</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1E3A5F] dark:text-[#60A5FA] shrink-0" />
                <span><strong>観察法：</strong>四診・脈診・舌診・腹診等（医学的診断とは区別）</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1E3A5F] dark:text-[#60A5FA] shrink-0" />
                <span><strong>施術の評価：</strong>方法・症状ごとに有効性と安全性を検討</span>
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
              <th className="p-3.5 font-serif text-[#C45A4A] dark:text-[#F87171]">現代医学による評価・治療</th>
              <th className="p-3.5 font-serif text-[#1E3A5F] dark:text-[#60A5FA]">補完的ケアを検討する条件</th>
              <th className="p-3.5 font-serif">併用時の考え方</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5DEC9]/60 dark:divide-[#2A3B4A]/60 bg-white dark:bg-[#17212A]">
            <tr className="hover:bg-[#FAF8F5] dark:hover:bg-[#1C2834]">
              <td className="p-3.5 font-bold text-[#232826] dark:text-[#FAF8F5]">
                <span className="px-2 py-0.5 rounded bg-[#FCF4EB] text-[#C45A4A] font-mono text-[10px] block w-fit mb-1">医療評価を優先</span>
                急性期・救急<br />（骨折・心筋梗塞・高熱感染症など）
              </td>
              <td className="p-3.5 text-[#333835] dark:text-[#C5D2DB]">
                <strong className="text-[#C45A4A] block mb-0.5">【優先】</strong>
                緊急症状が疑われる場合は救急の医療評価を受け、原因と状態に応じて必要な処置・治療を選ぶ。
              </td>
              <td className="p-3.5 text-[#333835] dark:text-[#C5D2DB]">
                <strong className="text-[#1E3A5F] dark:text-[#60A5FA] block mb-0.5">【評価後に検討】</strong>
                術後の補助的な施術も、担当医と適応・安全性を確認する。急性期の診断や救急処置に代わる方法としては扱わない。
              </td>
              <td className="p-3.5 text-[#59615D] dark:text-[#96A6B2]">
                必要な救急対応を遅らせず、使用する施術や薬の情報を医療者間で共有する。
              </td>
            </tr>

            <tr className="hover:bg-[#FAF8F5] dark:hover:bg-[#1C2834]">
              <td className="p-3.5 font-bold text-[#232826] dark:text-[#FAF8F5]">
                <span className="px-2 py-0.5 rounded bg-[#EBF1F6] text-[#1E3A5F] dark:text-[#60A5FA] font-mono text-[10px] block w-fit mb-1">継続的な評価</span>
                慢性期・不定愁訴<br />（自律神経失調・慢性疲労・冷え・PMS）
              </td>
              <td className="p-3.5 text-[#333835] dark:text-[#C5D2DB]">
                <strong className="text-[#C45A4A] block mb-0.5">【原因・状態を評価】</strong>
                症状に応じた診察・検査・治療・経過観察を行う。慢性期も必要な医学的評価と治療を継続する。
              </td>
              <td className="p-3.5 text-[#333835] dark:text-[#C5D2DB]">
                <strong className="text-[#1E3A5F] dark:text-[#60A5FA] block mb-0.5">【併用の可否を検討】</strong>
                鍼灸等を希望する場合は、症状・方法ごとの根拠、負担、安全性、併用する治療を確認する。伝統分類だけで効果を保証しない。
              </td>
              <td className="p-3.5 text-[#59615D] dark:text-[#96A6B2]">
                検査で異常が見つからなくても、症状の持続・変化に応じて再評価し、目標と効果を共有する。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <figcaption className="mt-4 text-[11px] leading-relaxed text-[#737C77] dark:text-[#96A6B2]">
        歯車は連携を考えるための比喩です。医療体系を陰・陽へ固定分類せず、病期だけで担当や効果を決めません。
        参考：<a href="https://www.nccih.nih.gov/health/complementary-alternative-or-integrative-health-whats-in-a-name" className="underline">NIH / NCCIH の併用の説明</a>、<a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" className="underline">鍼灸の有効性と安全性</a>。
      </figcaption>
    </figure>
  );
}
