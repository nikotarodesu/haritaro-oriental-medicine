"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  FileCode2,
  Sliders,
  CheckCircle2,
  BookOpen,
  Send,
  Workflow,
  Zap,
} from "lucide-react";

interface Props {
  onNextLecture?: () => void;
}

interface PrescriptionCase {
  id: string;
  syndrome: string;
  principle: string;
  points: {
    primary: { name: string; role: string; method: string };
    secondary: { name: string; role: string; method: string };
    assistant: { name: string; role: string; method: string };
  };
  interventionStrategy: string;
}

const PRESCRIPTION_CASES: PrescriptionCase[] = [
  {
    id: "p1",
    syndrome: "脾気虚弱 兼 肝気鬱結（本虚標実）",
    principle: "健脾益気（本治） ＋ 疏肝理気（標治）",
    points: {
      primary: { name: "足三里（胃経合土穴）", role: "中焦の脾胃を賦活し、後天の気血生成を促進", method: "補法（温灸・回旋補法）" },
      secondary: { name: "太衝（肝経原穴）", role: "鬱滞した肝気を強力に開通し、上逆を鎮める", method: "平補平瀉または軽度の瀉法" },
      assistant: { name: "中脘（任脈・胃の募穴）", role: "気機の中心軸を調律し、胃気の降下を助ける", method: "置鍼＋温熱" },
    },
    interventionStrategy: "本治7割・標治3割。まず足三里でエネルギー基盤を底上げしてから太衝で鬱滞を散らし、虚脱を防ぐ。",
  },
  {
    id: "p2",
    syndrome: "肝火上炎 兼 陰虚火旺（実熱・虚熱夾雑）",
    principle: "清肝瀉火（標の熱を冷ます） ＋ 滋陰降火（根の潤いを補う）",
    points: {
      primary: { name: "行間（肝経滎火穴）", role: "燃え上がる肝火の勢いを直接抜き去る", method: "瀉法（速刺速抜・雀啄）" },
      secondary: { name: "太渓（腎経原穴）", role: "腎陰（生命の冷却水）を根本から補給する", method: "補法（細鍼で優しく静置）" },
      assistant: { name: "百会（督脈）", role: "頭頂部に上逆した熱感を遠隔で引き下げる", method: "微弱刺激・散気" },
    },
    interventionStrategy: "滎火穴で急場の火消しを行いつつ、必ず太渓で冷却水を補填する。熱だけを叩いて終わらせない設計。",
  },
  {
    id: "p3",
    syndrome: "心腎不交（心火亢盛・腎陰虚衰）",
    principle: "交通心腎・滋陰清心（水と火の連動を再同期）",
    points: {
      primary: { name: "神門（心経原穴）", role: "過敏に興奮した心の神（意識・不安）を鎮める", method: "平補平瀉（安神）" },
      secondary: { name: "照海（腎経・陰蹻脈）", role: "深部の陰液を上へ持ち上げ、脳・目を潤す", method: "補法（温補・留鍼）" },
      assistant: { name: "内関（心包経絡穴）", role: "胸部・横隔膜の緊張を解き、気血を巡らす", method: "和法（呼吸に合わせた手技）" },
    },
    interventionStrategy: "上部の心火を鎮め、下部の腎水を吸い上げる。上下のバイパスを開通させるツインアンカー構造。",
  },
];

export default function DiagnosisPrescriptionBridge({ onNextLecture }: Props) {
  const [selectedCase, setSelectedCase] = useState<string>("p1");

  const currentCase =
    PRESCRIPTION_CASES.find((c) => c.id === selectedCase) || PRESCRIPTION_CASES[0];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑧：証から介入指令（治則）へのトランスフォーム図</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            確定証は「分類のラベル」ではなく「治療の実行コード」である
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          証 ➜ 治則 ➜ 経穴レシピへの自動トランスレート
        </span>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        診断学のゴールは、病気の名前を分類して満足することではありません。
        導き出された<strong>「証」</strong>とは、臨床現場において<strong>『どのツボに・どのような深さと手技で・どのような順序で刺激を入れるか』という工学的な治療指令書（治則・配穴プログラム）</strong>そのものです。
      </p>

      {/* インタラクティブ・トランスフォーマーUI */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 mb-6">
        {/* 証セレクター */}
        <div className="flex flex-wrap gap-2 mb-6">
          {PRESCRIPTION_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCase(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCase === c.id
                  ? "bg-[#1E3D34] text-white shadow-xs"
                  : "bg-white dark:bg-[#17212A] text-[#59615D] dark:text-[#96A6B2] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34]"
              }`}
            >
              {c.syndrome}
            </button>
          ))}
        </div>

        {/* トランスフォーム・パイプライン */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
          {/* STEP 1: 確定証 */}
          <div className="bg-white dark:bg-[#17212A] p-4 sm:p-5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] mb-2">
                <span>PHASE 1: INPUT</span>
                <span className="text-[#1E3D34] dark:text-[#74BA9E]">確定証</span>
              </div>
              <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5] mb-2">
                {currentCase.syndrome}
              </h5>
              <p className="text-[11px] text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                四診情報と八綱・臓腑弁証が収束し、病態の主因と波及先が一文に凝縮された状態。
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] text-[10px] font-mono text-[#8C9691] dark:text-[#64748B]">
              STATUS: VERIFIED
            </div>
          </div>

          {/* STEP 2: 治則 */}
          <div className="bg-white dark:bg-[#17212A] p-4 sm:p-5 rounded-xl border-2 border-[#1E3D34] dark:border-[#74BA9E] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-2">
                <span>PHASE 2: PROTOCOL</span>
                <span>治療方針（治則）</span>
              </div>
              <h5 className="font-bold text-sm sm:text-base text-[#B86924] dark:text-[#E6C387] mb-2">
                {currentCase.principle}
              </h5>
              <p className="text-[11px] text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                {currentCase.interventionStrategy}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] text-[10px] font-mono text-[#1E3D34] dark:text-[#74BA9E] font-bold">
              LOGIC: COMPLETED
            </div>
          </div>

          {/* STEP 3: 配穴コード */}
          <div className="bg-white dark:bg-[#17212A] p-4 sm:p-5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] mb-2">
                <span>PHASE 3: OUTPUT</span>
                <span className="text-[#0288D1] dark:text-[#38BDF8]">経穴介入コード</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
                  <strong className="text-[#1E3D34] dark:text-[#74BA9E] block">
                    主穴：{currentCase.points.primary.name}
                  </strong>
                  <span className="text-[10px] text-[#59615D] dark:text-[#96A6B2]">
                    手技：{currentCase.points.primary.method}
                  </span>
                </div>
                <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
                  <strong className="text-[#B86924] dark:text-[#E6C387] block">
                    配穴：{currentCase.points.secondary.name}
                  </strong>
                  <span className="text-[10px] text-[#59615D] dark:text-[#96A6B2]">
                    手技：{currentCase.points.secondary.method}
                  </span>
                </div>
                <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
                  <strong className="text-[#232826] dark:text-[#FAF8F5] block">
                    佐使：{currentCase.points.assistant.name}
                  </strong>
                  <span className="text-[10px] text-[#59615D] dark:text-[#96A6B2]">
                    手技：{currentCase.points.assistant.method}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] text-[10px] font-mono text-[#0288D1] dark:text-[#38BDF8]">
              READY TO STIMULATE
            </div>
          </div>
        </div>
      </div>

      {/* 次の講義（第7講：治法論）へのリンクナビゲーション */}
      <div className="bg-gradient-to-r from-[#1E3D34] to-[#2E5A44] dark:from-[#122816] dark:to-[#1B4D3E] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#A5D6A7] font-bold mb-1">
            <BookOpen className="w-4 h-4" />
            <span>カリキュラムの次なるステージへ</span>
          </div>
          <h5 className="font-serif font-bold text-lg sm:text-xl text-white">
            体系学習カリキュラム⑦：治法論（生命システムの再設計技術）
          </h5>
          <p className="text-xs text-[#E8F5E9]/90 mt-1 max-w-xl leading-relaxed">
            確定した証に基づき、「八法（汗・吐・下・和・温・清・消・補）」から最適な介入戦略を選定し、鍼灸・経穴の物理刺激へと落とし込む治療設計プロトコルを網羅します。
          </p>
        </div>

        <button
          onClick={onNextLecture}
          className="shrink-0 px-5 py-3 rounded-xl bg-[#FFA000] hover:bg-[#FF8F00] text-[#1E3D34] font-bold text-sm shadow-md transition-all flex items-center gap-2 hover:translate-x-0.5"
        >
          <span>第7講へ進む</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </figure>
  );
}
