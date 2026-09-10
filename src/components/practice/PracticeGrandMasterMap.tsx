"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  CheckCircle,
  Trophy,
  ArrowRight,
  RotateCcw,
  Share2,
  ExternalLink,
} from "lucide-react";

interface LectureSummary {
  lectureNum: number;
  title: string;
  en: string;
  corePrinciple: string;
  roleInClinical: string;
  color: string;
}

const ALL_LECTURES: LectureSummary[] = [
  {
    lectureNum: 1,
    title: "陰陽論",
    en: "Duality & Dynamic Homeostasis",
    corePrinciple: "変化と生命ダイナミズムを読み解く「最小単位」の思考モデル",
    roleInClinical: "治療の極性・大枠の進むべきベクトル（寒熱・虚実）を決定",
    color: "#B86924",
  },
  {
    lectureNum: 2,
    title: "五行論",
    en: "Interconnected Systemic Map",
    corePrinciple: "循環と相互作用で生命ネットワークを解き明かす「動態システム」の地図",
    roleInClinical: "母子相生・相克を通じて病変の波及先を先回りしてブロック",
    color: "#2E7D32",
  },
  {
    lectureNum: 3,
    title: "気血水理論",
    en: "Three Vital Substances",
    corePrinciple: "生命を動かす3つの実体と、体質・病理を読み解く「三層統合モデル」",
    roleInClinical: "動かすべき材料の不足・停滞・偏在を同定し、素材別に介入",
    color: "#0288D1",
  },
  {
    lectureNum: 4,
    title: "生命機能論",
    en: "Biological Process Architecture",
    corePrinciple: "生命を「静止した物質」から「絶えざる動態プロセス」へ捉え直すシステム統合モデル",
    roleInClinical: "三焦の水道と営衛の境界防壁インフラを再起動",
    color: "#7B1FA2",
  },
  {
    lectureNum: 5,
    title: "病機論",
    en: "Disease Cascade & Domino Collapse",
    corePrinciple: "生命機能はいかにして歪み、ドミノ倒しのように崩れていくのか？「破綻プロセス」の解読",
    roleInClinical: "表面症状に惑わされず、ドミノ倒しの根っこ（起因）を特定",
    color: "#D32F2F",
  },
  {
    lectureNum: 6,
    title: "診断論",
    en: "Four Examinations & 4D Coordinates",
    corePrinciple: "病名を当てるのではなく、生命機能の破綻構造を読み解く「思考アルゴリズム」",
    roleInClinical: "四診生体データを八綱座標へ落とし込み、一文の「確定証」へ収束",
    color: "#1E3D34",
  },
  {
    lectureNum: 7,
    title: "治法論",
    en: "Intervention Vector & Closed Loop",
    corePrinciple: "治療とは「生命システム」の再設計である ― 介入のベクトル・階層・動的制御モデル",
    roleInClinical: "補瀉・寒熱・標本の力学ベクトルと時間軸に沿った処方設計",
    color: "#FFA000",
  },
  {
    lectureNum: 8,
    title: "実践論",
    en: "Closed-Loop Needling Execution",
    corePrinciple: "情報を構造に変換し、操作を自己修正ループへ落とし込む「臨床運用の完全プロトコル」",
    roleInClinical: "迎随補瀉・気至の物理制御と三分岐フィードバックによる動的完結",
    color: "#0F766E",
  },
];

interface Props {
  onNextLecture?: () => void;
}

export default function PracticeGrandMasterMap({ onNextLecture }: Props) {
  const [selectedNum, setSelectedNum] = useState<number>(8);
  const current = ALL_LECTURES.find((l) => l.lectureNum === selectedNum) || ALL_LECTURES[7];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑨：東洋医学全8大カリキュラムのグランドマスターマップ</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            全8大講義の知見が統合され、真の「生命のエンジニア」へ
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FFF3E0] dark:bg-[#3D2817] px-3 py-1.5 rounded-xl">
          <Trophy className="w-4 h-4 text-[#FFA000]" />
          <span>CURRICULUM COMPLETE</span>
        </div>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        陰陽論という「最小単位の思考原理」から始まり、五行、気血水、生命機能、病機、診断、治法、そして実践論に至るまで──
        東洋医学の全8大体系が1つの巨大なインフォグラフィックタワーとして連結しました。
        これら8つの知見はバラバラの知識ではなく、<strong>「生命という動的システムを理解し、診断し、再設計するための不可分のアルゴリズム」</strong>です。
      </p>

      {/* 8大講義の連結タワーUI */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-6 mb-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
          <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
            全8大講義の階層タワー（タップして各講義の役割を確認）
          </span>
          <span className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B]">
            8-TIER ARCHITECTURE
          </span>
        </div>

        {/* 8講グリッドボタン */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {ALL_LECTURES.map((lec) => {
            const isSelected = lec.lectureNum === selectedNum;
            return (
              <button
                key={lec.lectureNum}
                onClick={() => setSelectedNum(lec.lectureNum)}
                className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm ring-2 ring-[#1E3D34]/20 scale-[1.03]"
                    : "bg-white dark:bg-[#17212A] border-[#E5DEC9] dark:border-[#2A3B4A] opacity-80 hover:opacity-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold opacity-75">
                      LECTURE 0{lec.lectureNum}
                    </span>
                    <CheckCircle className={`w-3 h-3 ${isSelected ? "text-[#E6C387]" : "text-[#1E3D34] dark:text-[#74BA9E]"}`} />
                  </div>
                  <div className="text-xs font-bold line-clamp-1">{lec.title.split("（")[0]}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 選択した講義の詳細カード */}
        <div className="bg-white dark:bg-[#17212A] rounded-xl p-5 border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#F2ECE0] dark:border-[#22303D]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#1E3D34] text-white">
                第 {current.lectureNum} 講
              </span>
              <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                {current.title}
              </h5>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FAF8F5] dark:bg-[#121920] rounded-lg">
              <strong className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                理論的本質
              </strong>
              <p className="text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                {current.corePrinciple}
              </p>
            </div>

            <div className="p-3 bg-[#FAF8F5] dark:bg-[#121920] rounded-lg">
              <strong className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] block mb-1">
                臨床での役割
              </strong>
              <p className="text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                {current.roleInClinical}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 完全走破 達成証 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E3D34] via-[#162E27] to-[#0D1C17] text-white border-2 border-[#E6C387] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-[#E6C387]/10 rounded-full blur-2xl" />

        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FFA000] to-[#FFE082] p-1 shadow-md shrink-0 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-[#1E3D34]" />
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="bg-[#E6C387] text-[#1E3D34] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                公式修了認定証
              </span>
            </div>
            <h4 className="font-serif font-bold text-xl sm:text-2xl text-white">
              東洋医学 体系学習カリキュラム 全8大講義 完全走破
            </h4>
            <p className="text-xs sm:text-sm text-[#E8F5E9]/90 leading-relaxed max-w-2xl">
              おめでとうございます！陰陽・五行から診断・治法・実践に至る全8大カリキュラムの全行程を完走しました。
              あなたは今、迷信や勘に頼るのではなく、生体システムを論理的かつ動的に把握し、再現性のある治療を設計できる確固たる思考フレームワークを手に入れました。
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
