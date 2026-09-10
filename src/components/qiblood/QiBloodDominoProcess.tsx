"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, AlertTriangle, Flame, ShieldAlert, Activity, Heart, Droplets, Zap, CheckCircle2 } from "lucide-react";

type DominoRoute = "stress" | "fatigue";

export default function QiBloodDominoProcess() {
  const [activeRoute, setActiveRoute] = useState<DominoRoute>("stress");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const stressSteps = [
    {
      step: 1,
      title: "精神ストレス",
      badge: "始動（トリガー）",
      target: "肝失疎泄",
      color: "#1E3D34",
      bgClass: "bg-[#E0F2F1] text-[#00695C] dark:bg-[#004D40]/30 dark:text-[#80CBC4] border-[#80CBC4]/30",
      accentBorder: "border-[#00897B]",
      icon: AlertTriangle,
      tag: "情動・自律神経負荷",
      desc: "職場・生活の緊張や怒り、抑圧が継続。東洋医学の「肝」が司る疎泄（気の巡りを伸びやかに保つ）機能が阻害される。",
      clinicalSign: "ため息が増える、気分の波、胃の不快感、首肩のこわばり",
      modernLink: "交感神経の過剰興奮、ストレスホルモン（コルチゾール）の上昇",
    },
    {
      step: 2,
      title: "気滞（きたい）",
      badge: "第1ドミノ",
      target: "自律神経緊張・気の鬱滞",
      color: "#FFA000",
      bgClass: "bg-[#FFF8E1] text-[#E65100] dark:bg-[#FFA000]/20 dark:text-[#FFE082] border-[#FFE082]/40",
      accentBorder: "border-[#FFA000]",
      icon: Zap,
      tag: "気（Qi）の停滞",
      desc: "気の流れが滞り、身体の各所で内圧が上昇。張るような痛みやガス溜まり、情緒不安定が起こる。",
      clinicalSign: "胸脇部や腹部の張り、喉のつかえ感（梅核気）、イライラ、月経前のPMS",
      modernLink: "胃腸の蠕動不全、血管痙攣による末梢循環不全の萌芽",
    },
    {
      step: 3,
      title: "瘀血（おけつ）",
      badge: "第2ドミノ",
      target: "気滞血瘀（血流停滞）",
      color: "#D32F2F",
      bgClass: "bg-[#FFEBEE] text-[#C62828] dark:bg-[#D32F2F]/20 dark:text-[#EF9A9A] border-[#FFCDD2]/40",
      accentBorder: "border-[#D32F2F]",
      icon: Heart,
      tag: "血（Blood）の鬱滞",
      desc: "「気は血の帥」であるため、気が滞ると血も巡らなくなり停滞する（気滞血瘀）。組織が酸欠・低栄養に陥り刺痛が生じる。",
      clinicalSign: "針で刺すような固定痛、舌裏の静脈怒張・暗紫舌、顔のくすみ・目の下のクマ",
      modernLink: "微小循環障害、血液粘度上昇（ドロドロ血）、血管内皮の慢性炎症",
    },
    {
      step: 4,
      title: "水滞・痰湿（たんしつ）",
      badge: "最終ドミノ",
      target: "気滞水停・老廃物蓄積",
      color: "#0288D1",
      bgClass: "bg-[#E1F5FE] text-[#0277BD] dark:bg-[#0288D1]/20 dark:text-[#81D4FA] border-[#B3E5FC]/40",
      accentBorder: "border-[#0288D1]",
      icon: Droplets,
      tag: "水（Fluid）の沈殿",
      desc: "気の推動が途絶え、血液循環も悪化した結果、体液の濾過・循環が滞り、濁った病的産物「痰湿」が身体に沈殿する。",
      clinicalSign: "頭が重い（濡れタオルを巻かれたよう）、下肢の重度なむくみ、めまい、関節重痛",
      modernLink: "リンパ流うっ滞、間質浮腫、慢性疲労症候群、動脈硬化・内臓脂肪蓄積",
    },
  ];

  const fatigueSteps = [
    {
      step: 1,
      title: "過労・胃腸虚弱",
      badge: "始動（トリガー）",
      target: "脾胃損傷・エネルギー枯渇",
      color: "#59615D",
      bgClass: "bg-[#F5F5F5] text-[#424242] dark:bg-[#2A3B4A]/40 dark:text-[#E0E0E0] border-[#E0E0E0]/30",
      accentBorder: "border-[#757575]",
      icon: AlertTriangle,
      tag: "後天の精（補給）不足",
      desc: "休養のない連続勤務、暴飲暴食や過度の節食により、エネルギー抽出工場である「脾胃（消化吸収系）」が疲弊する。",
      clinicalSign: "食欲不振、胃もたれ、手足がだるい、朝から起き上がれない",
      modernLink: "消化酵素分泌低下、腸内フローラ乱れ、ミトコンドリア機能低下",
    },
    {
      step: 2,
      title: "気虚（ききょ）",
      badge: "第1ドミノ",
      target: "生体エネルギー・バッテリー切れ",
      color: "#FFA000",
      bgClass: "bg-[#FFF8E1] text-[#E65100] dark:bg-[#FFA000]/20 dark:text-[#FFE082] border-[#FFE082]/40",
      accentBorder: "border-[#FFA000]",
      icon: Zap,
      tag: "気（Qi）の不足",
      desc: "推進力・防衛力（衛気）が激減。体温維持や内臓保持ができず、わずかな動作でも息切れ・異常発汗が生じる。",
      clinicalSign: "全身倦怠、話す声に力がない、風邪を引きやすい、食後の強い眠気・泥状便",
      modernLink: "ATP産生低下、細胞性免疫低下、自律神経の低活動（副交感優位の停滞）",
    },
    {
      step: 3,
      title: "血虚（けっきょ）",
      badge: "第2ドミノ",
      target: "気不生血・材料枯渇",
      color: "#D32F2F",
      bgClass: "bg-[#FFEBEE] text-[#C62828] dark:bg-[#D32F2F]/20 dark:text-[#EF9A9A] border-[#FFCDD2]/40",
      accentBorder: "border-[#D32F2F]",
      icon: Heart,
      tag: "血（Blood）の不足",
      desc: "「気は血を生む」ため、気虚が長引くと新しい血が作られなくなる（気不生血）。脳や全身組織のガソリンが枯渇する。",
      clinicalSign: "顔色が蒼白・土色、立ちくらみ・めまい、爪の割れ・筋の痙攣（こむら返り）、不眠・不安",
      modernLink: "潜在性鉄欠乏（フェリチン低下）、貧血、セロトニン・神経伝達物質合成不全",
    },
    {
      step: 4,
      title: "陰虚（いんきょ）➜ 慢性炎症",
      badge: "最終ドミノ",
      target: "冷却水枯渇・虚熱の空焚き",
      color: "#7B1FA2",
      bgClass: "bg-[#F3E5F5] text-[#6A1B9A] dark:bg-[#7B1FA2]/20 dark:text-[#CE93D8] border-[#E1BEE7]/40",
      accentBorder: "border-[#7B1FA2]",
      icon: Flame,
      tag: "陰液（血＋水）の枯渇",
      desc: "血と水（陰液）が底をつき、身体を冷やすラジエーターが消失。抑制を失った陽気が暴走し「虚熱（空焚き微熱）」となって組織を焦がす。",
      clinicalSign: "夕方の微熱・手足のほてり、激しい寝汗（盗汗）、喉や皮膚の強い乾燥、不眠悪化",
      modernLink: "低悪性度慢性炎症（Inflammaging）、副腎疲労、視床下部-下垂体-副腎系（HPA軸）失調",
    },
  ];

  const currentSteps = activeRoute === "stress" ? stressSteps : fatigueSteps;
  const currentStep = currentSteps[activeStepIndex];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説③：気血水の運動異常と「不調のドミノ倒し」連鎖図（Pathology Cascade）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            放置すると隣の要素へ波及する ── 2大病理カスケードの全貌
          </h4>
        </div>

        {/* ルート選択タブ */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] dark:bg-[#121920] p-1.5 rounded-2xl border border-[#E8E1D1] dark:border-[#2A3B4A]">
          <button
            onClick={() => {
              setActiveRoute("stress");
              setActiveStepIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeRoute === "stress"
                ? "bg-[#00897B] text-white shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            ① ストレス由来ルート（滞り型）
          </button>
          <button
            onClick={() => {
              setActiveRoute("fatigue");
              setActiveStepIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeRoute === "fatigue"
                ? "bg-[#C62828] text-white shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            ② 疲労消耗ルート（虚損型）
          </button>
        </div>
      </div>

      {/* サマリーバー */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D32F2F] animate-pulse" />
            {activeRoute === "stress" ? "【実証・鬱滞カスケード】" : "【虚証・消耗カスケード】"}
            {activeRoute === "stress"
              ? "精神ストレス ➜ 気滞 ➜ 瘀血 ➜ 水滞・痰湿"
              : "過労・胃腸弱 ➜ 気虚 ➜ 血虚 ➜ 陰虚 ➜ 慢性炎症"}
          </span>
          <span className="text-[#59615D] dark:text-[#96A6B2]">
            ステップをタップして詳細を確認
          </span>
        </div>
        <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
          {activeRoute === "stress"
            ? "気の滞り（自律神経緊張）が血管を締め付けて血行障害を招き、最終的に代謝の老廃物（水滞）を沈殿させる典型的な「緊張・過積載」の病理経路です。"
            : "エネルギーの枯渇（気虚）が血液の製造停止を招き、冷却水（陰液）が蒸発して空焚きの慢性炎症へと至る「消耗・底抜け」の病理経路です。"}
        </p>
      </div>

      {/* ドミノ倒しステップ・タイムライン（4段階） */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative mb-6">
        {currentSteps.map((s, idx) => {
          const isSelected = activeStepIndex === idx;
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`cursor-pointer rounded-2xl p-4 transition-all relative border-2 text-left flex flex-col justify-between ${
                isSelected
                  ? `bg-white dark:bg-[#17212A] ${s.accentBorder} shadow-md scale-[1.02]`
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-80 hover:opacity-100"
              }`}
            >
              {/* ドミノ上部バッジ */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${s.bgClass}`}>
                  {s.badge}
                </span>
                <span className="text-xs font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
                  0{s.step}
                </span>
              </div>

              {/* アイコン & タイトル */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: s.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    {s.title}
                  </h5>
                </div>
                <p className="text-[11px] font-medium text-[#59615D] dark:text-[#96A6B2] line-clamp-1 mt-0.5">
                  {s.target}
                </p>
              </div>

              {/* 下部タグ */}
              <div className="mt-3 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#737C77] dark:text-[#94A3B8]">
                  {s.tag}
                </span>
                {isSelected && (
                  <span className="flex h-2 w-2 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E]" />
                )}
              </div>

              {/* 次への矢印（デスクトップ時、最後のステップ以外） */}
              {idx < 3 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs items-center justify-center text-[#59615D] dark:text-[#96A6B2]">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 選択されたステップの詳細ブレイクダウン */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-[#EAE4D5] dark:border-[#2A3B4A] pb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: currentStep.color }}
            />
            <span className="text-xs font-bold font-mono text-[#59615D] dark:text-[#96A6B2]">
              STEP {currentStep.step} / 4
            </span>
            <span className="text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              {currentStep.title}：{currentStep.target}
            </span>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-bold ${currentStep.bgClass}`}>
            {currentStep.tag}
          </span>
        </div>

        <p className="text-sm text-[#232826] dark:text-[#D1D5DB] leading-relaxed mb-5">
          {currentStep.desc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* 臨床サイン */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center gap-1.5 font-bold text-[#D32F2F] dark:text-[#EF5350] mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>現れる自覚症状・身体シグナル</span>
            </div>
            <p className="text-[#3E4541] dark:text-[#CBD5E1] leading-relaxed font-medium">
              {currentStep.clinicalSign}
            </p>
          </div>

          {/* 現代医学との符合 */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center gap-1.5 font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-2">
              <Activity className="w-4 h-4" />
              <span>現代生理学・病理学への翻訳</span>
            </div>
            <p className="text-[#3E4541] dark:text-[#CBD5E1] leading-relaxed font-medium">
              {currentStep.modernLink}
            </p>
          </div>
        </div>

        {/* 臨床的教訓メッセージ */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#FFF9C4]/40 dark:bg-[#FFA000]/10 border border-[#FFE082]/60 dark:border-[#FFA000]/20 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#FFA000] shrink-0 mt-0.5" />
          <p className="text-xs text-[#5D4037] dark:text-[#FFE082] leading-relaxed font-medium">
            <span className="font-bold">東洋医学の臨床原則：</span>
            病気は突然完成するのではなく、この連鎖によって段階的に深く侵食します。
            {activeRoute === "stress"
              ? "「瘀血」や「水滞」の段階であっても、根本の「気滞（自律神経の緊張）」を解かない限り、血流改善薬や利水剤だけでは症状が再発を繰り返します。"
              : "「血虚」や「陰虚」であっても、胃腸（脾胃）の消化吸収力が落ちていれば補血薬は胃もたれを起こします。まず第1・第2ドミノの「気虚（胃腸エネルギー）」を立て直すことが鉄則です。"}
          </p>
        </div>
      </div>
    </figure>
  );
}
