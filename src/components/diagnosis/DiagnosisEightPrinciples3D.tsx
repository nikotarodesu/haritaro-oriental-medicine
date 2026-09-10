"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Compass,
  Box,
  Layers,
  Flame,
  Snowflake,
  Shield,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function DiagnosisEightPrinciples3D() {
  const [biaoLi, setBiaoLi] = useState<"biao" | "li">("li");
  const [hanRe, setHanRe] = useState<"han" | "re">("han");
  const [xuShi, setXuShi] = useState<"xu" | "shi">("xu");
  const [showCaseCompare, setShowCaseCompare] = useState<boolean>(false);

  // 組み合わせに応じた陰陽・治療ベクトルの算出
  const isYang = (biaoLi === "biao" ? 1 : 0) + (hanRe === "re" ? 1 : 0) + (xuShi === "shi" ? 1 : 0) >= 2;
  const yinYangLabel = isYang ? "陽証優位（亢進・活動的・外向）" : "陰証優位（衰退・停滞・内向）";

  // 臨床パターンの導出
  const getTreatmentGuideline = () => {
    if (biaoLi === "biao" && hanRe === "han" && xuShi === "shi") {
      return {
        syndrome: "表寒実証（風寒束表）",
        principle: "辛温解表（温めて体表の毛穴を開き、発汗させる）",
        targetPoints: "風池・合谷・列缺",
        danger: "温めずに冷やすと邪気が裏（肺）へ直入する",
      };
    }
    if (biaoLi === "biao" && hanRe === "re" && xuShi === "shi") {
      return {
        syndrome: "表熱実証（風熱犯表）",
        principle: "辛涼解表・清熱（熱を冷ましつつ発散させる）",
        targetPoints: "大椎・曲池・外関",
        danger: "温性の強い生姜や灸を使うと火に油を注ぐ",
      };
    }
    if (biaoLi === "li" && hanRe === "han" && xuShi === "xu") {
      return {
        syndrome: "裏寒虚証（脾腎陽虚・陽気不足）",
        principle: "温補陽気（深部のボイラーを温めてエネルギーを補う）",
        targetPoints: "関元・気海・足三里・命門（施灸推奨）",
        danger: "抗炎症薬や瀉法を行うと生命の陽気が崩壊する",
      };
    }
    if (biaoLi === "li" && hanRe === "re" && xuShi === "shi") {
      return {
        syndrome: "裏熱実証（胃腸実熱・陽明腑実）",
        principle: "清熱瀉火・通腑瀉下（内部の熱毒を冷やし排出する）",
        targetPoints: "曲池・合谷・中脘・天枢",
        danger: "温める補剤を使うと狂燥・腹痛が悪化する",
      };
    }
    if (biaoLi === "li" && hanRe === "re" && xuShi === "xu") {
      return {
        syndrome: "裏熱虚証（陰虚内熱・冷却水枯渇）",
        principle: "滋陰降火（潤い・冷却水を補って微熱を引かせる）",
        targetPoints: "太渓・復溜・三陰交",
        danger: "実熱と勘違いして強烈に冷やすと胃腸と気血を破壊する",
      };
    }
    if (biaoLi === "li" && hanRe === "han" && xuShi === "shi") {
      return {
        syndrome: "裏寒実証（陰寒内盛・寒積停滞）",
        principle: "温中散寒・破積（芯を温めながら停滞を打ち破る）",
        targetPoints: "神闕（塩灸）・気海・中脘",
        danger: "単なる虚冷えと勘違いして補うだけでは頑固な停滞が解けない",
      };
    }
    // 表虚など
    return {
      syndrome: `${biaoLi === "biao" ? "表" : "裏"}${hanRe === "han" ? "寒" : "熱"}${xuShi === "xu" ? "虚" : "実"}証`,
      principle: `${xuShi === "xu" ? "正気を補い" : "邪気を排出し"}つつ、${hanRe === "han" ? "温法" : "清法"}を適用する`,
      targetPoints: "病態に合わせた本治・標治穴",
      danger: "虚実の取り違えに最大警戒する",
    };
  };

  const guideline = getTreatmentGuideline();

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑥：八綱弁証の4次元立体座標マップ（4D Coordinate Model）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            病態の「深度・性質・強度・統括」を固定するナビゲーション座標
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          X軸（寒熱）× Y軸（虚実）× Z軸（表裏）➜ 統括（陰陽）
        </span>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        八綱弁証とは、病名のレッテルを貼る前に<strong>「この病変は浅いのか深いのか（表裏）」「冷えているのか熱いのか（寒熱）」「足りないのか溢れているのか（虚実）」</strong>という3次元の座標を打つ作業です。最後に全体を「陰陽」で統括することで、治療の進行方向（ベクトル）が絶対狂わないよう安全圏を固定します。
      </p>

      {/* インタラクティブ座標シミュレーター */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 mb-6">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
              3次元スライサー：八綱パラメータを選択して座標をプロット
            </h5>
          </div>
          <span className="text-[11px] font-mono text-[#8C9691] dark:text-[#64748B]">
            COORDINATE: [{biaoLi.toUpperCase()}, {hanRe.toUpperCase()}, {xuShi.toUpperCase()}]
          </span>
        </div>

        {/* 3軸選択コントロール */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Z軸：表裏（深度） */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
                Z-AXIS（病変深度）
              </span>
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">表 ⇄ 裏</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setBiaoLi("biao")}
                className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                  biaoLi === "biao"
                    ? "bg-[#1E3D34] text-white shadow-xs"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] hover:bg-[#E8E1D1]"
                }`}
              >
                <div>表証（Biao）</div>
                <div className="text-[10px] font-normal opacity-80 mt-0.5">急性・皮毛・経絡</div>
              </button>
              <button
                onClick={() => setBiaoLi("li")}
                className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                  biaoLi === "li"
                    ? "bg-[#1E3D34] text-white shadow-xs"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] hover:bg-[#E8E1D1]"
                }`}
              >
                <div>裏証（Li）</div>
                <div className="text-[10px] font-normal opacity-80 mt-0.5">慢性・臓腑・骨髄</div>
              </button>
            </div>
          </div>

          {/* X軸：寒熱（性質） */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
                X-AXIS（エネルギー性質）
              </span>
              <span className="text-xs font-bold text-[#0288D1] dark:text-[#4FC3F7]">寒 ⇄ 熱</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setHanRe("han")}
                className={`p-2.5 rounded-lg text-xs font-bold transition-all flex flex-col items-center ${
                  hanRe === "han"
                    ? "bg-[#0288D1] text-white shadow-xs"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] hover:bg-[#E8E1D1]"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>寒証（Han）</span>
                </div>
                <div className="text-[10px] font-normal opacity-80 mt-0.5">冷え・遅脈・温法</div>
              </button>
              <button
                onClick={() => setHanRe("re")}
                className={`p-2.5 rounded-lg text-xs font-bold transition-all flex flex-col items-center ${
                  hanRe === "re"
                    ? "bg-[#D32F2F] text-white shadow-xs"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] hover:bg-[#E8E1D1]"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>熱証（Re）</span>
                </div>
                <div className="text-[10px] font-normal opacity-80 mt-0.5">ほてり・数脈・清法</div>
              </button>
            </div>
          </div>

          {/* Y軸：虚実（生体反応強度） */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
                Y-AXIS（反応強度・最重要）
              </span>
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387]">虚 ⇄ 実</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setXuShi("xu")}
                className={`p-2.5 rounded-lg text-xs font-bold transition-all flex flex-col items-center ${
                  xuShi === "xu"
                    ? "bg-[#B86924] text-white shadow-xs"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] hover:bg-[#E8E1D1]"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>虚証（Xu）</span>
                </div>
                <div className="text-[10px] font-normal opacity-80 mt-0.5">不足・弱脈・補法</div>
              </button>
              <button
                onClick={() => setXuShi("shi")}
                className={`p-2.5 rounded-lg text-xs font-bold transition-all flex flex-col items-center ${
                  xuShi === "shi"
                    ? "bg-[#B86924] text-white shadow-xs"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] hover:bg-[#E8E1D1]"
                }`}
              >
                <div className="flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>実証（Shi）</span>
                </div>
                <div className="text-[10px] font-normal opacity-80 mt-0.5">過密・強脈・瀉法</div>
              </button>
            </div>
          </div>
        </div>

        {/* 座標固定からの自動演繹（ディシジョンアウトプット） */}
        <div className="bg-white dark:bg-[#17212A] rounded-xl p-5 border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F2ECE0] dark:border-[#22303D]">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
                4D FIXED COORDINATE
              </span>
              <div className="text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2">
                <span>{guideline.syndrome}</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  isYang
                    ? "bg-[#FFF3E0] text-[#B86924] dark:bg-[#3D2817] dark:text-[#E6C387]"
                    : "bg-[#E0F2FE] text-[#0288D1] dark:bg-[#0C2D48] dark:text-[#38BDF8]"
                }`}>
                  {yinYangLabel}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B] block">
                治療の最優先指令（治則）
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                {guideline.principle}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-lg border border-[#E8E1D1] dark:border-[#22303D]">
              <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                代表的経穴配穴プラン
              </span>
              <p className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                {guideline.targetPoints}
              </p>
            </div>
            <div className="bg-[#FFF3E0] dark:bg-[#2C1F15] p-3 rounded-lg border border-[#FFE0B2] dark:border-[#3D2817]">
              <span className="text-[10px] font-bold text-[#D32F2F] dark:text-[#EF5350] block mb-1">
                誤治（誤った介入）の最大リスク
              </span>
              <p className="text-[#59615D] dark:text-[#E0D5C1] font-medium">
                {guideline.danger}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* なぜ臓腑より先に八綱なのか？（比較トグルカード） */}
      <div className="border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl p-5 bg-[#FAF8F5]/60 dark:bg-[#151F28]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
            <h5 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
              臨床の核心：なぜ「臓腑」より先に「八綱」を固定するのか？
            </h5>
          </div>
          <button
            onClick={() => setShowCaseCompare(!showCaseCompare)}
            className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
          >
            <span>{showCaseCompare ? "解説を閉じる" : "具体例で確認する"}</span>
          </button>
        </div>

        <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-3">
          たとえば「頭痛」を訴える患者に対し、いきなり『頭痛＝肝の病気だから太衝（肝経）を刺そう』と短絡的に臓腑へ飛びつくと致命的なミス（誤治）を犯します。
        </p>

        {showCaseCompare && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-3 border-t border-[#E5DEC9] dark:border-[#2A3B4A] text-xs">
            {/* NGケース */}
            <div className="p-4 rounded-xl bg-[#FFEBEE] dark:bg-[#2D1517] border border-[#FFCDD2] dark:border-[#4C1D24]">
              <div className="flex items-center gap-1.5 text-[#D32F2F] dark:text-[#EF5350] font-bold mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>失敗パターン：八綱を無視して「肝」へ直行</span>
              </div>
              <p className="text-[#59615D] dark:text-[#FFCDD2] leading-relaxed">
                もし患者の頭痛が「極度の血虚・寒冷（裏・寒・虚）」による脳血管の収縮だった場合、肝火実熱と思って強烈な瀉法を行うと、脳虚血がさらに悪化し激しいめまいや失神を引き起こす。
              </p>
            </div>

            {/* OKケース */}
            <div className="p-4 rounded-xl bg-[#E8F5E9] dark:bg-[#132A1C] border border-[#C8E6C9] dark:border-[#1E4D2B]">
              <div className="flex items-center gap-1.5 text-[#1E3D34] dark:text-[#74BA9E] font-bold mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>成功パターン：八綱で［裏・寒・虚］の座標を固定</span>
              </div>
              <p className="text-[#59615D] dark:text-[#C8E6C9] leading-relaxed">
                先に「裏・寒・虚」と座標が決まれば、治療法は<strong>絶対に「温補（温めて補う）」</strong>に固定される。その後で「肝血虚」と特定すれば、百会や足三里・三陰交を温灸・補法する正しい処方がブレずに導かれる。
              </p>
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}
