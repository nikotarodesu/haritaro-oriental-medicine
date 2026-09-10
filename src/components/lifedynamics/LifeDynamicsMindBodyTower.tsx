"use client";

import React, { useState } from "react";
import { Sparkles, Brain, Shield, Heart, Compass, Cpu, Zap, Activity } from "lucide-react";

export default function LifeDynamicsMindBodyTower() {
  const [activeTab, setActiveTab] = useState<"tower" | "spirit">("tower");

  const towerLevels = [
    {
      level: 6,
      name: "皮膚・毛髪（腠理・外壁バリア）",
      role: "衛気と津液が張り巡らされ、外気・病原体から守る最表層の物理化学シールド。",
      tag: "最外層：防衛",
      color: "#546E7A",
    },
    {
      level: 5,
      name: "肌肉・皮下組織（肉質・器官）",
      role: "脾胃が産生した営気と血が満ち、エネルギーを蓄え運動を可能にする肉体実体。",
      tag: "中外層：活動",
      color: "#FFA000",
    },
    {
      level: 4,
      name: "経脈・絡脈（通信・流通ネットワーク）",
      role: "気血が巡り、全身の臓腑と四肢末端をリアルタイムに同期させる超高速伝導路。",
      tag: "中間層：伝導",
      color: "#2E7D32",
    },
    {
      level: 3,
      name: "骨格・関節（物理的支柱・器）",
      role: "腎精によって強度が保たれ、重力に対抗して内臓を保護するフレームワーク。",
      tag: "深部層：支持",
      color: "#795548",
    },
    {
      level: 2,
      name: "髄海（脳・中枢神経系）",
      role: "腎精が満たされて形成される思考と知覚のセンター。五神（精神）が宿る舞台。",
      tag: "深層核：制御",
      color: "#7B1FA2",
    },
    {
      level: 1,
      name: "精（生命の根源・遺伝的核）",
      role: "両親から受け継いだ先天の精。生命の設計図であり、あらゆる組織分化の源泉。",
      tag: "最深根：プログラム",
      color: "#D32F2F",
    },
  ];

  const spirits = [
    {
      organ: "心（しん）",
      spirit: "神（しん）",
      role: "統括司令塔・自己認識・明晰な意識",
      desc: "生命全体の君主。すべての感情・思考・身体感覚を統合し、「私」という主体的意識を保つ最高中枢。",
      color: "#D32F2F",
    },
    {
      organ: "肝（かん）",
      spirit: "魂（こん）",
      role: "直感・ひらめき・夢・想像力・企画力",
      desc: "「陽の霊」。夜間に身体を離れて夢を見、昼間に閃きや新しいアイデアをもたらす無意識のクリエイティビティ。",
      color: "#2E7D32",
    },
    {
      organ: "脾（ひ）",
      spirit: "意・思（い・し）",
      role: "情報処理・論理的思考・記憶・集中力",
      desc: "外から入ってきた情報（飲食物・知識）を咀嚼・分解し、自分の中で意味づけして記憶に定着させる知性。",
      color: "#FFA000",
    },
    {
      organ: "肺（はい）",
      spirit: "魄（はく）",
      role: "本能的反射・運動感覚・自律神経機能",
      desc: "「陰の霊」。生まれた瞬間の産声、呼吸反射、熱いものに触れたときに手を引っ込める動物的・肉体的な知性。",
      color: "#546E7A",
    },
    {
      organ: "腎（じん）",
      spirit: "志（し）",
      role: "持続的な意志力・根気・生命への執着",
      desc: "目標に向かって何年も粘り強く努力を続ける力。逆境に耐え、種族を後世へ残そうとする生命の本源的意志。",
      color: "#1565C0",
    },
  ];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑦：生命の多層発生と五神・知性アーキテクチャ図</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            精から皮膚までの多層発生 ＆ 五臓に宿る「心の知性」マップ
          </h4>
        </div>

        {/* タブ切り替え */}
        <div className="flex items-center gap-1 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs">
          <button
            onClick={() => setActiveTab("tower")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === "tower" ? "bg-[#1E3D34] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            身体発生の多層タワー
          </button>
          <button
            onClick={() => setActiveTab("spirit")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === "spirit" ? "bg-[#7B1FA2] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            五神（精神の知性）マップ
          </button>
        </div>
      </div>

      {activeTab === "tower" ? (
        /* 身体発生の多層タワー */
        <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6">
          <div className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-4">
            生命の発生プロセス：深部の「精（プログラム）」から外周の「外壁」へと展開する階層性
          </div>

          <div className="space-y-2.5">
            {towerLevels.map((lvl) => (
              <div
                key={lvl.level}
                className="bg-white dark:bg-[#17212A] rounded-xl p-3.5 border border-[#E5DEC9] dark:border-[#2A3B4A] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-mono font-bold shrink-0"
                    style={{ backgroundColor: lvl.color }}
                  >
                    0{lvl.level}
                  </span>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                      {lvl.name}
                    </h5>
                    <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-0.5">
                      {lvl.role}
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-[10px] px-2 py-0.5 rounded font-bold bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-[#737C77] dark:text-[#94A3B8] shrink-0">
                  {lvl.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
            <strong>発生の真髄：</strong>
            東洋医学において、肉体はバラバラの部品の寄せ集めではなく、「精（生体エネルギーの種）」という核から同心円状に外側へ花開いた有機的統一体です。最外層の皮膚トラブルも、根本は最深部の精や経脈と分かちがたく結ばれています。
          </div>
        </div>
      ) : (
        /* 五神（心の知性）マップ */
        <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#2A3B4A] p-5 sm:p-6">
          <div className="text-xs font-bold text-[#7B1FA2] dark:text-[#CE93D8] mb-4">
            「心身一如」の正体：精神・認知・感情は五臓の生理機能と不可分に同期している
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {spirits.map((sp, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#17212A] rounded-xl p-4 border border-[#E5DEC9] dark:border-[#2A3B4A] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                      {sp.organ} ➜ 【{sp.spirit}】
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: sp.color }}
                    />
                  </div>
                  <div className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-1.5">
                    {sp.role}
                  </div>
                  <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                    {sp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
            <strong>五神の協調システム：</strong>
            「意志が続かない（腎志の弱り）」「優柔不断で決められない（肝胆の不調）」「くよくよ悩んでしまう（脾意の停滞）」。東洋医学では、これらを「心の弱さ」と断じるのではなく、五臓の気血不足・鬱滞という<strong>肉体の生理的乱れ</strong>として捉え、ツボや漢方で治療します。
          </div>
        </div>
      )}
    </figure>
  );
}
