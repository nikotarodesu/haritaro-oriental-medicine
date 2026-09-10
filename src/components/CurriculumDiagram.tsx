"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import WuxingDynamicChart from "./WuxingDynamicChart";
import YinYangTaijiCycle from "./yinyang/YinYangTaijiCycle";
import YinYangSixPrinciples from "./yinyang/YinYangSixPrinciples";
import YinYangBodyLayers from "./yinyang/YinYangBodyLayers";
import YinYangDisharmonyMap from "./yinyang/YinYangDisharmonyMap";
import YinYangShishinChart from "./yinyang/YinYangShishinChart";
import YinYangTreatmentFlow from "./yinyang/YinYangTreatmentFlow";
import YinYangSeasonsCalendar from "./yinyang/YinYangSeasonsCalendar";
import YinYangEastWestMatrix from "./yinyang/YinYangEastWestMatrix";
import YinYangToWuxingBridge from "./yinyang/YinYangToWuxingBridge";
import WuxingDifferentiationModel from "./wuxing/WuxingDifferentiationModel";
import WuxingFiveRelationsChart from "./wuxing/WuxingFiveRelationsChart";
import WuxingBodyNetworkMap from "./wuxing/WuxingBodyNetworkMap";
import WuxingEmotionsMatrix from "./wuxing/WuxingEmotionsMatrix";
import WuxingFiveExhaustionsRadar from "./wuxing/WuxingFiveExhaustionsRadar";
import WuxingShishinDashboard from "./wuxing/WuxingShishinDashboard";
import WuxingGokinFilter from "./wuxing/WuxingGokinFilter";
import WuxingClinicalDecisionTree from "./wuxing/WuxingClinicalDecisionTree";
import QiBloodThreeLayers from "./qiblood/QiBloodThreeLayers";
import QiBloodTriangle from "./qiblood/QiBloodTriangle";
import QiBloodDominoProcess from "./qiblood/QiBloodDominoProcess";
import QiBloodConstitutionChecker from "./qiblood/QiBloodConstitutionChecker";
import QiBloodClinicalFlow from "./qiblood/QiBloodClinicalFlow";
import LifeDynamicsFourLayers from "./lifedynamics/LifeDynamicsFourLayers";
import LifeDynamicsYingweiSanjiao from "./lifedynamics/LifeDynamicsYingweiSanjiao";
import LifeDynamicsDynamicXushi from "./lifedynamics/LifeDynamicsDynamicXushi";
import LifeDynamicsBiaoliPipeline from "./lifedynamics/LifeDynamicsBiaoliPipeline";
import LifeDynamicsSeasonalDepth from "./lifedynamics/LifeDynamicsSeasonalDepth";
import LifeDynamicsAncientModern from "./lifedynamics/LifeDynamicsAncientModern";
import LifeDynamicsMindBodyTower from "./lifedynamics/LifeDynamicsMindBodyTower";
import LifeDynamicsBreakdownBridge from "./lifedynamics/LifeDynamicsBreakdownBridge";
import PathomechanismIcebergTimeline from "./pathomechanism/PathomechanismIcebergTimeline";
import PathomechanismFourVectors from "./pathomechanism/PathomechanismFourVectors";
import PathomechanismThermoXushi from "./pathomechanism/PathomechanismThermoXushi";
import PathomechanismFluidDegeneration from "./pathomechanism/PathomechanismFluidDegeneration";
import PathomechanismMicroLuomai from "./pathomechanism/PathomechanismMicroLuomai";
import PathomechanismPathogenInvasion from "./pathomechanism/PathomechanismPathogenInvasion";
import PathomechanismEmotionCascade from "./pathomechanism/PathomechanismEmotionCascade";
import PathomechanismDiagnosticBridge from "./pathomechanism/PathomechanismDiagnosticBridge";

interface CurriculumDiagramProps {
  id: string;
  onNextLecture?: () => void;
}

export default function CurriculumDiagram({ id, onNextLecture }: CurriculumDiagramProps) {
  // 体系カリキュラム①：陰陽論の9大図解
  if (id === "yinyang-taiji-cycle") {
    return <YinYangTaijiCycle />;
  }

  if (id === "yinyang-six-principles") {
    return <YinYangSixPrinciples />;
  }

  if (id === "yinyang-body-layers") {
    return <YinYangBodyLayers />;
  }

  if (id === "yinyang-disharmony-map") {
    return <YinYangDisharmonyMap />;
  }

  if (id === "yinyang-shishin-chart") {
    return <YinYangShishinChart />;
  }

  if (id === "yinyang-treatment-flow") {
    return <YinYangTreatmentFlow />;
  }

  if (id === "yinyang-seasons-calendar") {
    return <YinYangSeasonsCalendar />;
  }

  if (id === "yinyang-east-west-matrix") {
    return <YinYangEastWestMatrix />;
  }

  if (id === "yinyang-to-wuxing-bridge") {
    return <YinYangToWuxingBridge onNextLecture={onNextLecture} />;
  }

  // 体系カリキュラム②：五行論の8大図解
  if (id === "wuxing-differentiation-model") {
    return <WuxingDifferentiationModel />;
  }

  if (id === "wuxing-five-relations-chart") {
    return <WuxingFiveRelationsChart />;
  }

  if (id === "wuxing-body-network-map") {
    return <WuxingBodyNetworkMap />;
  }

  if (id === "wuxing-emotions-matrix") {
    return <WuxingEmotionsMatrix />;
  }

  if (id === "wuxing-five-exhaustions-radar") {
    return <WuxingFiveExhaustionsRadar />;
  }

  if (id === "wuxing-shishin-dashboard") {
    return <WuxingShishinDashboard />;
  }

  if (id === "wuxing-gokin-filter") {
    return <WuxingGokinFilter />;
  }

  if (id === "wuxing-clinical-decision-tree") {
    return <WuxingClinicalDecisionTree onNextLecture={onNextLecture} />;
  }

  // 体系カリキュラム③：気血水理論の5大図解
  if (id === "qiblood-three-layers") {
    return <QiBloodThreeLayers />;
  }

  if (id === "qiblood-triangle") {
    return <QiBloodTriangle />;
  }

  if (id === "qiblood-domino-process") {
    return <QiBloodDominoProcess />;
  }

  if (id === "qiblood-constitution-checker") {
    return <QiBloodConstitutionChecker />;
  }

  if (id === "qiblood-clinical-flow") {
    return <QiBloodClinicalFlow onNextLecture={onNextLecture} />;
  }

  // 体系カリキュラム④：生命機能論の8大図解
  if (id === "lifedynamics-four-layers") {
    return <LifeDynamicsFourLayers />;
  }

  if (id === "lifedynamics-yingwei-sanjiao") {
    return <LifeDynamicsYingweiSanjiao />;
  }

  if (id === "lifedynamics-dynamic-xushi") {
    return <LifeDynamicsDynamicXushi />;
  }

  if (id === "lifedynamics-biaoli-pipeline") {
    return <LifeDynamicsBiaoliPipeline />;
  }

  if (id === "lifedynamics-seasonal-depth") {
    return <LifeDynamicsSeasonalDepth />;
  }

  if (id === "lifedynamics-ancient-modern") {
    return <LifeDynamicsAncientModern />;
  }

  if (id === "lifedynamics-mind-body-tower") {
    return <LifeDynamicsMindBodyTower />;
  }

  if (id === "lifedynamics-breakdown-bridge") {
    return <LifeDynamicsBreakdownBridge onNextLecture={onNextLecture} />;
  }

  // 体系カリキュラム⑤：病機論の8大図解
  if (id === "pathomechanism-iceberg-timeline") {
    return <PathomechanismIcebergTimeline />;
  }

  if (id === "pathomechanism-four-vectors") {
    return <PathomechanismFourVectors />;
  }

  if (id === "pathomechanism-thermo-xushi") {
    return <PathomechanismThermoXushi />;
  }

  if (id === "pathomechanism-fluid-degeneration") {
    return <PathomechanismFluidDegeneration />;
  }

  if (id === "pathomechanism-micro-luomai") {
    return <PathomechanismMicroLuomai />;
  }

  if (id === "pathomechanism-pathogen-invasion") {
    return <PathomechanismPathogenInvasion />;
  }

  if (id === "pathomechanism-emotion-cascade") {
    return <PathomechanismEmotionCascade />;
  }

  if (id === "pathomechanism-diagnostic-bridge") {
    return <PathomechanismDiagnosticBridge onNextLecture={onNextLecture} />;
  }

  if (id === "yinyang-homeostasis") {
    return (
      <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
          <div>
            <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>講義解説図（Conceptual Diagram）</span>
            </span>
            <h4 className="font-serif font-bold text-lg text-[#232826] dark:text-[#FAF8F5] mt-1">
              生体ホメオスタシスと陰陽の動的平衡（二値状態モデル）
            </h4>
          </div>
          <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
            東洋医学の「陰陽」を自律神経・概日リズムで可視化
          </span>
        </div>

        {/* SVG ダイアグラム本体 */}
        <div className="w-full overflow-hidden bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-4 sm:p-6">
          <svg
            viewBox="0 0 700 320"
            className="w-full h-auto max-w-full mx-auto"
            style={{ minHeight: "220px" }}
          >
            <defs>
              {/* 陽の領域グラデーション */}
              <linearGradient id="yangGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C47A72" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#C47A72" stopOpacity="0.02" />
              </linearGradient>
              {/* 陰の領域グラデーション */}
              <linearGradient id="yinGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#375573" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#375573" stopOpacity="0.25" />
              </linearGradient>
              {/* 平衡帯グラデーション */}
              <linearGradient id="balanceBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#74BA9E" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#74BA9E" stopOpacity="0.12" />
              </linearGradient>
            </defs>

            {/* 背景エリア：陽（上部） */}
            <rect x="50" y="20" width="620" height="90" fill="url(#yangGrad)" rx="6" />
            <text x="65" y="45" className="fill-[#A83629] dark:fill-[#E08A80] text-[11px] font-bold">
              ▲ 陽（Yang）領域：活動・覚醒・交感神経亢進・体温上昇・カタボリズム
            </text>

            {/* 背景エリア：健康な平衡帯（中央） */}
            <rect x="50" y="110" width="620" height="100" fill="url(#balanceBand)" rx="4" />
            <line x1="50" y1="160" x2="670" y2="160" stroke="#74BA9E" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
            <text x="65" y="165" className="fill-[#1E3D34] dark:fill-[#74BA9E] text-[11px] font-bold">
              ─ 動的平衡中心線（最適ホメオスタシス）
            </text>

            {/* 背景エリア：陰（下部） */}
            <rect x="50" y="210" width="620" height="90" fill="url(#yinGrad)" rx="6" />
            <text x="65" y="285" className="fill-[#1E2D3D] dark:fill-[#7BAAD8] text-[11px] font-bold">
              ▼ 陰（Yin）領域：休息・睡眠・副交感神経優位・体温低下・アナボリズム
            </text>

            {/* 正弦波カーブ（動的平衡のゆらぎ：昼と夜のリズム） */}
            <path
              d="M 60 160 Q 135 60 210 160 T 360 160 T 510 160 T 660 160"
              fill="none"
              stroke="#1E3D34"
              strokeWidth="3.5"
              className="dark:stroke-[#83BEA8]"
            />

            {/* 波のピークポイント（昼：陽） */}
            <circle cx="135" cy="85" r="5" fill="#B8675E" />
            <text x="135" y="70" textAnchor="middle" className="fill-[#232826] dark:fill-[#FAF8F5] text-[10px] font-bold">
              昼・正午（陽の極み）
            </text>

            {/* 波のボトムポイント（夜：陰） */}
            <circle cx="285" cy="235" r="5" fill="#375573" />
            <text x="285" y="255" textAnchor="middle" className="fill-[#232826] dark:fill-[#FAF8F5] text-[10px] font-bold">
              夜・子刻（陰の極み）
            </text>

            {/* 病態の逸脱（陽勝の破線） */}
            <path
              d="M 360 160 Q 435 25 510 160"
              fill="none"
              stroke="#C47A72"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <circle cx="435" cy="58" r="4" fill="#C45A4A" />
            <text x="435" y="42" textAnchor="middle" className="fill-[#A83629] dark:fill-[#E08A80] text-[10px] font-bold">
              【陽勝・実熱】過剰興奮・自律神経失調
            </text>

            {/* 病態の逸脱（陰勝の破線） */}
            <path
              d="M 510 160 Q 585 295 660 160"
              fill="none"
              stroke="#375573"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <circle cx="585" cy="262" r="4" fill="#375573" />
            <text x="585" y="280" textAnchor="middle" className="fill-[#1E2D3D] dark:fill-[#7BAAD8] text-[10px] font-bold">
              【陰勝・虚寒】低体温・倦怠感
            </text>
          </svg>
        </div>

        {/* 図の解説・4原則カード */}
        <figcaption className="mt-5 space-y-3">
          <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            【図の解説】健康な人体は中心線で静止しているのではなく、昼（陽）と夜（陰）の間を滑らかに揺らぎ続ける「動的平衡（波）」の中にあります。波の振幅が平衡帯を逸脱した状態が東洋医学でいう「陰陽の偏り（病態）」です。
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-[11px]">
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-xl border border-[#E8E1D1] dark:border-[#22303D]">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">① 対立制約</span>
              <span className="text-[#59615D] dark:text-[#96A6B2] text-[10px] leading-tight block">
                交感神経と副交感神経が拮抗して暴走を防ぐ
              </span>
            </div>
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-xl border border-[#E8E1D1] dark:border-[#22303D]">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">② 互根互用</span>
              <span className="text-[#59615D] dark:text-[#96A6B2] text-[10px] leading-tight block">
                機能（エネルギー）と物質（身体構造）の不可分性
              </span>
            </div>
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-xl border border-[#E8E1D1] dark:border-[#22303D]">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">③ 消長平衡</span>
              <span className="text-[#59615D] dark:text-[#96A6B2] text-[10px] leading-tight block">
                朝昼夜のサーカディアンリズムに合わせた自然な満ち引き
              </span>
            </div>
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-xl border border-[#E8E1D1] dark:border-[#22303D]">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">④ 転化</span>
              <span className="text-[#59615D] dark:text-[#96A6B2] text-[10px] leading-tight block">
                限界（極点）に達したときに逆の極性へと相転移する
              </span>
            </div>
          </div>
        </figcaption>
      </figure>
    );
  }

  if (id === "wuxing-dynamic-chart" || id === "wuxing-chart") {
    return <WuxingDynamicChart />;
  }

  return null;
}
