"use client";

import React, { useState } from "react";
import { Sparkles, Eye, Activity, Heart, Shield, Droplets, Mountain } from "lucide-react";

type WuxingRow = "all" | "wood" | "fire" | "earth" | "metal" | "water";

export default function WuxingBodyNetworkMap() {
  const [selectedRow, setSelectedRow] = useState<WuxingRow>("all");

  const rows = [
    {
      id: "wood",
      element: "木",
      name: "木（肝・胆系）",
      color: "#2E7D32",
      bgClass: "bg-[#2E7D32] text-white",
      badgeClass: "bg-[#EBF5EE] text-[#2E7D32] border-[#C8E6C9]",
      zang: "肝（将軍の官・疏泄・蔵血）",
      fu: "胆（決断・中精の府）",
      shu: "筋（腱・靭帯・関節の柔軟性）",
      ka: "爪（硬度・ツヤ・縦条）",
      kon: "目（視覚・明瞭さ・疲労）",
      summary: "全身の気の滞りを解除し、血液を貯蔵・配分。目の酷使やストレスで筋の引き攣りや爪の割れが起こる。"
    },
    {
      id: "fire",
      element: "火",
      name: "火（心・小腸系）",
      color: "#C62828",
      bgClass: "bg-[#C62828] text-white",
      badgeClass: "bg-[#FDECEC] text-[#C62828] border-[#FFCDD2]",
      zang: "心（君主の官・拍動と精神統括）",
      fu: "小腸（受盛化物・清濁分別）",
      shu: "脈（血管弾性・血流拍動）",
      ka: "面色（顔の血色・つや・生気）",
      kon: "舌（味覚・明瞭な言語・赤み）",
      summary: "全身への血液循環と、大脳皮質の意識・精神活動（神明）を主導。異常は動悸・不眠・舌のただれ・顔面蒼白に現れる。"
    },
    {
      id: "earth",
      element: "土",
      name: "土（脾・胃系）",
      color: "#F57F17",
      bgClass: "bg-[#F57F17] text-white",
      badgeClass: "bg-[#FFF9E6] text-[#B86924] border-[#FFE082]",
      zang: "脾（後天の本・消化と運化・統血）",
      fu: "胃（受納腐熟・降濁）",
      shu: "肌肉（肉質部のボリューム・ハリ）",
      ka: "唇（唇の赤み・潤い・乾燥）",
      kon: "口（食欲・口中感覚・味覚）",
      summary: "飲食物からエネルギー（気血）を生み出す生体工場。脾が弱ると手足の筋肉が痩せこけ、唇がカサカサになり口が苦くなる。"
    },
    {
      id: "metal",
      element: "金",
      name: "金（肺・大腸系）",
      color: "#78909C",
      bgClass: "bg-[#78909C] text-white",
      badgeClass: "bg-[#F0F4F8] text-[#455A64] border-[#CFD8DC]",
      zang: "肺（相傅の官・気と呼吸・宣発粛降）",
      fu: "大腸（伝導・水分再吸収）",
      shu: "皮毛（皮膚呼吸・バリア自然免疫）",
      ka: "体毛（質感・毛穴の引き締まり）",
      kon: "鼻（通気・嗅覚・花粉バリア）",
      summary: "外気を取り込み全身の気を統括、皮膚表面に衛気を巡らせてウイルスや乾燥を防御。弱ると空咳・便秘・肌荒れが連動。"
    },
    {
      id: "water",
      element: "水",
      name: "水（腎・膀胱系）",
      color: "#1A237E",
      bgClass: "bg-[#1A237E] text-white",
      badgeClass: "bg-[#E8EAF6] text-[#1A237E] border-[#C5CAE9]",
      zang: "腎（先天の本・成長・生殖・精気貯蔵）",
      fu: "膀胱（水液貯留・津液気化排尿）",
      shu: "骨髄（骨強度・脳・造血）",
      ka: "髪（毛量・コシ・白髪・抜け毛）",
      kon: "耳（聴力・耳鳴り・平衡感覚）",
      summary: "生命エネルギーの原資（先天の精）を蓄え、骨と脳を満たす。加齢や過労で衰えると足腰の冷え・難聴・白髪・骨粗鬆症が必発。"
    }
  ];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説③：五臓六腑と身体部位の5層フルスキャンマップ（5-Layer Mapping）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            臓 ⇄ 腑 ⇄ 組織（主） ⇄ モニター（華） ⇄ 感覚器（根）の立体連動
          </h4>
        </div>

        {/* タブ切り替え */}
        <div className="flex flex-wrap items-center gap-1 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs">
          <button
            onClick={() => setSelectedRow("all")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              selectedRow === "all" ? "bg-[#1E3D34] text-white" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            全体俯瞰
          </button>
          {rows.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRow(r.id as WuxingRow)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                selectedRow === r.id ? r.bgClass : "text-[#59615D] dark:text-[#96A6B2]"
              }`}
            >
              {r.element}
            </button>
          ))}
        </div>
      </div>

      {/* 5層スキャン・カードグリッド（レスポンシブ対応） */}
      <div className="space-y-3">
        {rows
          .filter((r) => selectedRow === "all" || selectedRow === r.id)
          .map((r) => (
            <div
              key={r.id}
              className="p-4 sm:p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] bg-[#FAF8F5] dark:bg-[#121920] transition-all space-y-3"
              style={{ borderLeftWidth: "6px", borderLeftColor: r.color }}
            >
              {/* 行ヘッダー */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E1D1]/60 dark:border-[#2A3B4A] pb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${r.bgClass}`}>
                    {r.element}行
                  </span>
                  <h5 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                    {r.name}
                  </h5>
                </div>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                  {r.summary}
                </span>
              </div>

              {/* 5つの連動ノードカード（横並び） */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                {/* 五臓（陰） */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase block mb-1">
                    ① 五臓（中心ユニット）
                  </span>
                  <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block text-[11px]">
                    {r.zang}
                  </span>
                </div>

                {/* 五腑（陽） */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] uppercase block mb-1">
                    ② 五腑（伝化・消化管）
                  </span>
                  <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block text-[11px]">
                    {r.fu}
                  </span>
                </div>

                {/* 五主（運動組織） */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="text-[10px] font-bold text-[#59615D] dark:text-[#96A6B2] uppercase block mb-1">
                    ③ 五主（支配組織）
                  </span>
                  <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block text-[11px]">
                    {r.shu}
                  </span>
                </div>

                {/* 五華（外表モニター） */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                  <span className="text-[10px] font-bold text-[#C62828] dark:text-[#EF5350] uppercase block mb-1">
                    ④ 五華（外表サイン）
                  </span>
                  <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block text-[11px]">
                    {r.ka}
                  </span>
                </div>

                {/* 五根（感覚開竅） */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-[#1A237E] dark:text-[#9FA8DA] uppercase block mb-1">
                    ⑤ 五根（感覚器）
                  </span>
                  <span className="font-bold text-[#232826] dark:text-[#FAF8F5] block text-[11px]">
                    {r.kon}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </figure>
  );
}
