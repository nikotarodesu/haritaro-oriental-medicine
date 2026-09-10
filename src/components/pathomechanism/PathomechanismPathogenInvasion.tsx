"use client";

import React, { useState } from "react";
import { Sparkles, Shield, ShieldAlert, ShieldX, ArrowRight, Wind, Snowflake, CloudRain, Flame, Sun } from "lucide-react";

export default function PathomechanismPathogenInvasion() {
  const [activeBarrier, setActiveBarrier] = useState<number>(1);

  const barriers = [
    {
      level: 1,
      title: "第1防壁：体表バリア突破（表証段階）",
      target: "皮膚 ➜ 腠理（毛穴） ➜ 孫絡 ➜ 経脈",
      status: "衛気の弱まりを突いて侵入",
      color: "#0288D1",
      icon: Shield,
      desc: "寒暖差や疲労、睡眠不足によって体表の「衛気（バリア）」が薄くなった瞬間、外邪が皮膚から侵入。悪寒、発熱、首の後ろのこわばりが生じる。",
      bodyDefense: "生体は毛穴を閉じて発熱し、ウイルスを熱で不活性化しようと奮闘する（葛根湯・麻黄湯で発汗を後押しすべき段階）。",
    },
    {
      level: 2,
      title: "第2防壁：気機攪乱プログラム入力（半表半裏段階）",
      target: "少陽（胆・三焦） ➜ 自律神経ネットワーク",
      status: "六淫の異常コードが生体制御を混乱させる",
      color: "#FFA000",
      icon: ShieldAlert,
      desc: "外邪が経絡内部に定着し、固有の異常プログラムを起動。風（遊走・めまい）、寒（収縮・激痛）、湿（重濁・停滞）、燥（乾燥・枯渇）、熱（充血・上炎）により自律神経の昇降リズムが狂う。",
      bodyDefense: "往来寒熱（寒気と熱っぽさが交互に来る）、胸脇苦満、食欲不振、口の苦味。和解少陽（小柴胡湯）で内外の交通を調停する。",
    },
    {
      level: 3,
      title: "第3防壁：深層臓腑の内在化・器質化（裏証段階）",
      target: "五臓六腑（胃腸・肺・腎） ➜ 慢性固定化",
      status: "外邪が体質と結託して恒久病変へ",
      color: "#D32F2F",
      icon: ShieldX,
      desc: "邪気が最深部の臓腑に到達。寒邪が腎陽を奪って深部冷えとなり、湿邪が脾胃に沈殿して慢性痰湿となり、熱邪が津液を焦がして慢性炎症・瘀血へ固定化される。",
      bodyDefense: "もはや発汗などの表面的な治療では排出不能。臓腑の虚を補いながら固まった邪気を排出する長期戦が必要。",
    },
  ];

  const current = barriers.find((b) => b.level === activeBarrier)!;

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑥：外邪侵入の3段階バリア突破インフォグラフィック（Three-Tier Barrier Invasion）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            城壁（衛気）から本丸（五臓）へ ── 六淫が引き起こす生体プログラムの乗っ取り
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          防壁レベルを選択して突破過程を確認
        </span>
      </div>

      {/* 3段階の城壁ステップ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {barriers.map((b) => {
          const isSelected = activeBarrier === b.level;
          const Icon = b.icon;
          return (
            <div
              key={b.level}
              onClick={() => setActiveBarrier(b.level)}
              className={`cursor-pointer rounded-2xl p-4 border-2 transition-all text-left ${
                isSelected
                  ? "bg-white dark:bg-[#17212A] shadow-md scale-[1.02]"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
              }`}
              style={{
                borderColor: isSelected ? b.color : undefined,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded border" style={{ color: b.color, borderColor: b.color }}>
                  BARRIER 0{b.level}
                </span>
                <Icon className="w-4 h-4" style={{ color: b.color }} />
              </div>
              <h5 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] mb-1">
                {b.title.split("（")[0]}
              </h5>
              <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] line-clamp-1">
                {b.target}
              </p>
            </div>
          );
        })}
      </div>

      {/* 選択された防壁の詳細解説 */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE4D5] dark:border-[#22303D] pb-3">
          <div>
            <span className="text-xs font-bold text-[#8C9691] dark:text-[#64748B]">
              浸透深度：{current.target}
            </span>
            <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5] mt-0.5">
              {current.title}
            </h5>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]" style={{ color: current.color }}>
            {current.status}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#232826] dark:text-[#D1D5DB] leading-relaxed">
          {current.desc}
        </p>

        <div className="bg-white dark:bg-[#17212A] rounded-xl p-4 border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-1.5">
            <Shield className="w-4 h-4" />
            <span>生体防衛反応と臨床介入ポイント</span>
          </div>
          <p className="text-[#3E4541] dark:text-[#CBD5E1] leading-relaxed">
            {current.bodyDefense}
          </p>
        </div>

        {/* 六淫の異常プログラム一覧（第2防壁の補足） */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] pt-2">
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-center">
            <Wind className="w-3.5 h-3.5 mx-auto text-[#00897B] mb-1" />
            <strong>風邪</strong>: 遊走・目眩
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-center">
            <Snowflake className="w-3.5 h-3.5 mx-auto text-[#0288D1] mb-1" />
            <strong>寒邪</strong>: 凝固・激痛
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-center">
            <CloudRain className="w-3.5 h-3.5 mx-auto text-[#689F38] mb-1" />
            <strong>湿邪</strong>: 重濁・むくみ
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-center">
            <Sun className="w-3.5 h-3.5 mx-auto text-[#FFA000] mb-1" />
            <strong>燥邪</strong>: 乾燥・空咳
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-center">
            <Flame className="w-3.5 h-3.5 mx-auto text-[#D32F2F] mb-1" />
            <strong>熱邪</strong>: 充血・炎症
          </div>
        </div>
      </div>
    </figure>
  );
}
