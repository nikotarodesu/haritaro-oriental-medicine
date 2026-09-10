"use client";

import React, { useState } from "react";
import { Sparkles, Brain, ArrowDown, Activity, AlertTriangle, ShieldCheck, HeartPulse, Stethoscope } from "lucide-react";

export default function PathomechanismEmotionCascade() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      name: "【第1段階】気滞（機能的緊張）",
      badge: "自律神経の収縮",
      color: "#FFA000",
      sign: "呼吸が浅い、ため息、胸や喉のつかえ（梅核気）、イライラ",
      desc: "感情の我慢や過密スケジュールにより交感神経が持続興奮。横隔膜が硬直して呼吸が浅くなり、気のハイウェイが渋滞を起こす。",
      modern: "自律神経トーンのアンバランス、筋筋膜の緊張拘縮、胃腸蠕動の低下",
    },
    {
      step: 2,
      name: "【第2段階】痰湿（流体の濁り）",
      badge: "消化代謝の停止",
      color: "#689F38",
      sign: "頭が重い、めまい、下肢のむくみ、口の粘り、泥状便",
      desc: "「肝木剋脾土」。肝の緊張が胃腸（脾胃）を直撃し、消化酵素や腸内フローラが乱れ、未消化の水分・脂質がヘドロとなって全身間質に沈殿する。",
      modern: "リンパ流うっ滞、間質浮腫、慢性低悪性度炎症、インスリン抵抗性",
    },
    {
      step: 3,
      name: "【第3段階】瘀血（循環の閉塞）",
      badge: "微小血管の破綻",
      color: "#D32F2F",
      sign: "針で刺すような固定痛、夜間の痛み悪化、肌のくすみ、唇の暗紫",
      desc: "気の推動停止と痰湿の物理的圧迫により、毛細血管網（絡脈）が次々と閉塞。赤血球が連鎖凝集し、局所組織が持続的な酸欠・壊死に直面する。",
      modern: "微小循環不全、血液粘度上昇、血管内皮障害、組織線維化の開始",
    },
    {
      step: 4,
      name: "【第4段階】虚実錯雑（器質的固定化）",
      badge: "構造のロック",
      color: "#7B1FA2",
      sign: "慢性不眠、自律神経失調症、線維筋痛、月経困難症、内臓下垂",
      desc: "表面はゴミだらけ（標実：気滞・痰湿・瘀血）なのに、生命エネルギーのタンクは空っぽ（本虚：脾腎虚）。感情の歪みが肉体の硬化として固定化された状態。",
      modern: "中枢性感作（痛みの脳記憶化）、HPA軸（視床下部-下垂体-副腎系）の完全疲弊",
    },
  ];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑦：情志内傷から器質化への4段階ドミノ倒しチャート</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            感情の抑圧は肉体へ物理沈殿する ── ストレスが組織変質へと転化するドミノ倒し
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          各ステップをタップして進行度を確認
        </span>
      </div>

      {/* 起点ボックス */}
      <div className="bg-[#FFF8E1] dark:bg-[#FFA000]/15 border border-[#FFE082]/60 rounded-2xl p-4 mb-6 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#E65100] shrink-0" />
          <div>
            <strong className="text-[#5D4037] dark:text-[#FFE082]">【すべての起点】情報過多 ＆ 感情の持続的抑圧：</strong>
            <span className="text-[#59615D] dark:text-[#CBD5E1] ml-1">
              思慮過多（脾気停滞） ＋ 肝気鬱結（自律神経拘束）
            </span>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-[#17212A] border border-[#FFE082] text-[#E65100] font-bold self-start sm:self-auto shrink-0">
          トリガー入力
        </span>
      </div>

      {/* ドミノ4ステップ（縦並び連鎖） */}
      <div className="space-y-3 mb-6">
        {steps.map((s) => {
          const isSelected = activeStep === s.step;
          return (
            <div
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all ${
                isSelected
                  ? "bg-white dark:bg-[#17212A] shadow-md scale-[1.01]"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-80 hover:opacity-100"
              }`}
              style={{
                borderColor: isSelected ? s.color : undefined,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-mono font-bold"
                    style={{ backgroundColor: s.color }}
                  >
                    0{s.step}
                  </span>
                  <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    {s.name}
                  </h5>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]" style={{ color: s.color }}>
                  {s.badge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-3">
                {s.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                <div>
                  <span className="text-[#8C9691] dark:text-[#64748B] block text-[10px]">
                    現れる自覚サイン：
                  </span>
                  <span className="font-bold text-[#D32F2F] dark:text-[#EF5350]">
                    {s.sign}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C9691] dark:text-[#64748B] block text-[10px]">
                    現代医学の生理的符合：
                  </span>
                  <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                    {s.modern}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 身体操作による臨床介入コールアウト */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 text-xs">
        <div className="flex items-center gap-2 font-bold text-sm text-[#1E3D34] dark:text-[#74BA9E] mb-2">
          <Stethoscope className="w-4 h-4" />
          <span>精神論ではなく「身体介入」から解体する東洋医学のアプローチ</span>
        </div>
        <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-3">
          感情がすでに肉体の緊張や血流不全としてロックされている場合、「ポジティブに考えよう」という意識の努力だけでは自律神経は緩みません。東洋医学では、以下の<strong>3つの身体操作</strong>によって物理的にドミノ倒しを逆回転させます。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-3 bg-white dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <strong className="text-[#1E3D34] dark:text-[#74BA9E] block mb-1">① 呼吸の再教育</strong>
            <span>横隔膜と肋間筋を鍼や温灸で解放し、深い呼気によって迷走神経（副交感神経）を物理的に刺激する。</span>
          </div>
          <div className="p-3 bg-white dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <strong className="text-[#B86924] dark:text-[#E6C387] block mb-1">② 気の沈降（引火帰元）</strong>
            <span>頭部に突き上がった熱と過緊張を、「湧泉・太衝・照海」などの下肢穴に誘導して頭を冷やす。</span>
          </div>
          <div className="p-3 bg-white dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <strong className="text-[#D32F2F] dark:text-[#EF5350] block mb-1">③ 肝脾の調和</strong>
            <span>「太衝（肝）」と「足三里（脾）」の配穴により、自律神経の緊張が胃腸を攻撃する悪循環を遮断する。</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
