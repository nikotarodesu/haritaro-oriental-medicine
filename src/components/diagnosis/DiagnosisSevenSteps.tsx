"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, UserCheck, MessageSquare, Lightbulb, Compass, Search, GitBranch, Award } from "lucide-react";

interface StepItem {
  step: number;
  name: string;
  action: string;
  coreJudgment: string;
  detail: string;
  tip: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: StepItem[] = [
  {
    step: 1,
    name: "無意識観察",
    action: "ドアが開いた瞬間の歩行・姿勢・目の輝き・動作の速度を観る",
    coreJudgment: "外見（形）と生命力（気）が一致しているか（神気の確認）",
    detail: "患者が「診察されている」と意識する前の無意識の動作に最も純粋な生体情報が現れる。目力があるか（有神）、声にハリがあるか、動作が重々しいか軽やかか。",
    tip: "第一印象で「虚実」の大まかな直感をメモしておく。",
    icon: UserCheck,
  },
  {
    step: 2,
    name: "主訴の明確化",
    action: "「今、一番困っていること」を時系列（発症時期・契機・経過）で固定する",
    coreJudgment: "時間軸から「表（急性侵入）」か「裏（慢性変質）」かを判別",
    detail: "症状を羅列させるのではなく、「いつから」「何がきっかけで」「どう推移したか」を聴取。数日前なら外邪・表病、数ヶ月以上なら内傷・裏病。",
    tip: "「何が一番辛いですか？」と問い、患者のターゲットを1点に絞る。",
    icon: MessageSquare,
  },
  {
    step: 3,
    name: "仮説立案",
    action: "問診の初期段階（開始3分以内）で、頭の中に一次仮説（例：脾気虚）を立てる",
    coreJudgment: "情報収集作業を「仮説検証作業」へと昇華させる",
    detail: "闇雲に100の質問をするのではなく、「食後眠い・だるい・軟便 ➜ 脾気虚ではないか？」という仮説を立て、その仮説を証明・反証するための質問へ切り替える。",
    tip: "仮説なき問診は単なる雑談になり、時間と体力を浪費する。",
    icon: Lightbulb,
  },
  {
    step: 4,
    name: "八綱の一次判定",
    action: "虚実軸（充実 vs 低下）と寒熱軸（冷え vs ほてり）を二分法で切り分ける",
    coreJudgment: "治療が「補法（足す）」か「瀉法（出す）」かの大枠を固定する",
    detail: "臓腑を決める前に、まず「裏・虚・寒」なのか「裏・実・熱」なのかを確定。これによって「温めるべきか冷ますべきか」「補うべきか散らすべきか」の境界線が引かれる。",
    tip: "飲水傾向（冷飲/温飲）と按圧反応（喜按/拒按）が決定打となる。",
    icon: Compass,
  },
  {
    step: 5,
    name: "情報の追加取得",
    action: "切診（脈診・腹診）や舌診を用い、必要な情報だけをピンポイントで深掘りする",
    coreJudgment: "仮説を裏付ける証拠を集め、同時に「矛盾」をあぶり出す",
    detail: "脈を診て「やはり沈弱か（仮説一致）」、あるいは「あれ、顔色は青白いのに脈が弦数（矛盾発見）」を確認。矛盾があれば「真寒仮熱」を疑う。",
    tip: "脈診と腹診は、問診で立てた仮説の『答え合わせ』として使う。",
    icon: Search,
  },
  {
    step: 6,
    name: "機能・臓腑特定",
    action: "症状の組み合わせを機能破綻のストーリー（ドミノ倒し）に統合する",
    coreJudgment: "三焦や営衛、五臓のどのネットワークが破綻しているかを再構成",
    detail: "「ストレス（肝気鬱結） ➜ 胃腸機能低下（脾虚） ➜ 水分停滞（痰湿） ➜ 側頭部痛（少陽逆流）」という一連の連鎖劇を一本の線として結ぶ。",
    tip: "「本（根腐れ）」と「標（枝葉のゴミ）」を明確に区別する。",
    icon: GitBranch,
  },
  {
    step: 7,
    name: "証の統合と宣言",
    action: "本治（根本）と標治（対症）の優先順位を決め、一文の「証」として宣言する",
    coreJudgment: "「主証：〇〇、標証：〇〇」として一文化し、治療方針を宣言",
    detail: "「本証：脾気虚、標証：肝気滞 ➜ 治則：健脾益気・疏肝理気」。配穴（足三里・太衝・中脘）と手技の刺激強度（補瀉）を迷いなく確定させる。",
    tip: "証を患者にわかりやすい言葉で説明し、治療の合意を形成する。",
    icon: Award,
  },
];

export default function DiagnosisSevenSteps() {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const current = STEPS[selectedStepIndex];
  const Icon = current.icon;

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説②：診断フロー7ステップ・タイムラインチャート（7-Step Clinical Diagnostic Protocol）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            ドアが開いた瞬間から治療方針の宣言まで ── 臨床のブレをゼロにする標準プロトコル
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          ステップをクリックして進行
        </span>
      </div>

      {/* ステップバー（1〜7） */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
        {STEPS.map((s, idx) => {
          const isSelected = selectedStepIndex === idx;
          return (
            <button
              key={s.step}
              onClick={() => setSelectedStepIndex(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm scale-105"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-[#A5D6A7]" : "text-[#8C9691] dark:text-[#64748B]"}`}>
                  STEP 0{s.step}
                </span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FFA000]" />}
              </div>
              <div className={`text-xs font-bold ${isSelected ? "text-white" : "text-[#232826] dark:text-[#FAF8F5]"}`}>
                {s.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* 選択されたステップの詳細カード */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE4D5] dark:border-[#22303D] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1E3D34] text-white flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
                STEP 0{current.step} / 07
              </span>
              <h5 className="font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                {current.name}
              </h5>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#1E3D34] dark:text-[#74BA9E]">
            判断の核心：{current.coreJudgment}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* 主なアクション */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1.5">
              実施する主なアクション：
            </span>
            <p className="text-[#3E4541] dark:text-[#CBD5E1] leading-relaxed">
              {current.action}
            </p>
          </div>

          {/* 臨床的詳細 */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold text-[#B86924] dark:text-[#E6C387] block mb-1.5">
              プロフェッショナルの思考回路：
            </span>
            <p className="text-[#3E4541] dark:text-[#CBD5E1] leading-relaxed">
              {current.detail}
            </p>
          </div>
        </div>

        {/* 臨床Tips */}
        <div className="p-3.5 rounded-xl bg-[#FFF8E1] dark:bg-[#FFA000]/15 border border-[#FFE082]/60 text-xs text-[#5D4037] dark:text-[#FFE082] leading-relaxed">
          <strong className="text-[#E65100]">💡 臨床現場のチェックポイント：</strong>
          {current.tip}
        </div>
      </div>
    </figure>
  );
}
