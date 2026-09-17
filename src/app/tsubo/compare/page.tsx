"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getAllAcupoints, getAcupointDetail, AcupointMaster, AcupointDetail } from "@/data/tsubo";
import { 
  GitCompare, 
  ArrowLeftRight, 
  Compass, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  BookOpen,
  Layers,
  Search,
  Bookmark
} from "lucide-react";
import AcupointPickerModal from "@/components/tsubo/AcupointPickerModal";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";

// 編集済み比較プリセット（古典出典・目的別）
const PRESET_CATEGORIES = [
  {
    categoryTitle: "伝統的な併用関係を学ぶ（代表配穴）",
    pairs: [
      {
        label: "開四関（合谷 × 太衝）",
        codeA: "LI4",
        codeB: "LR3",
        source: "『鍼灸大成』四関穴",
        rationale: "手の陽明大腸経の原穴（気）と足の厥陰肝経の原穴（血）を組み合わせ、全身の気血運行・自律機能を調整する伝統的配合。",
      },
      {
        label: "表裏相応（内関 × 外関）",
        codeA: "PC6",
        codeB: "TE5",
        source: "『霊枢』経脈篇・八脈交会穴",
        rationale: "前腕掌側の心包経（陰）と背側の三焦経（陽）の絡穴同士。前腕の表裏を貫通し胸脇・頭側部の症状に対応。",
      },
      {
        label: "健脾補気（足三里 × 三陰交）",
        codeA: "ST36",
        codeB: "SP6",
        source: "『千金要方』",
        rationale: "陽明胃経の合穴と太陰脾経・少陰腎経・厥陰肝経が交わる三陰交。後天之本と陰血滋養の代表処方。",
      },
    ],
  },
  {
    categoryTitle: "位置・取穴法を区別したい（近隣穴・類似穴）",
    pairs: [
      {
        label: "手背の鑑別（合谷 × 三間）",
        codeA: "LI4",
        codeB: "LI3",
        source: "WHO標準取穴部位",
        rationale: "第2中手骨橈側の骨際において、骨幹中央（合谷）と中手指節関節近位陥凹部（三間）の触診指標の違いを比較。",
      },
      {
        label: "前腕掌側の鑑別（内関 × 大陵）",
        codeA: "PC6",
        codeB: "PC7",
        source: "WHO標準取穴部位",
        rationale: "手関節掌側横紋上2寸（内関）と手関節掌側横紋上（大陵）の深浅・正中神経走向と腱構造の違いを比較。",
      },
      {
        label: "下腿前脛骨部の鑑別（足三里 × 上巨虚）",
        codeA: "ST36",
        codeB: "ST37",
        source: "WHO標準取穴部位",
        rationale: "犢鼻の下方3寸（足三里・胃下合穴）と下方6寸（上巨虚・大腸下合穴）の骨度法・筋肉内位置の鑑別。",
      },
    ],
  },
  {
    categoryTitle: "要穴の関係を学ぶ（原絡・募合）",
    pairs: [
      {
        label: "原絡配穴（合谷 × 列欠）",
        codeA: "LI4",
        codeB: "LU7",
        source: "『難経』原絡配穴法",
        rationale: "大腸経の原穴（合谷）と表裏関係にある肺経の絡穴（列欠）による表裏主客配穴。",
      },
      {
        label: "腑会・胃募合配穴（中脘 × 足三里）",
        codeA: "CV12",
        codeB: "ST36",
        source: "『八会穴』『難経』",
        rationale: "上腹部の胃募穴（中脘）と下肢の胃合穴（足三里）による中焦消化器系の内外協調。",
      },
    ],
  },
];

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-16 text-center text-xs text-[#737C77]">比較ツールを読み込み中...</div>}>
      <ComparePageContent />
    </Suspense>
  );
}

function ComparePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allPoints = useMemo(() => getAllAcupoints(), []);

  // URLクエリまたは初期値から取得
  const initialA = (searchParams.get("a") || "LI4").toUpperCase();
  const initialB = (searchParams.get("b") || "LR3").toUpperCase();

  const [codeA, setCodeA] = useState<string>(initialA);
  const [codeB, setCodeB] = useState<string>(initialB);
  const [activePicker, setActivePicker] = useState<"A" | "B" | null>(null);
  const [duplicateAlert, setDuplicateAlert] = useState<string | null>(null);

  const { isClipped, toggleClip } = useClinicalMemo();

  // URL同期
  useEffect(() => {
    const a = searchParams.get("a");
    const b = searchParams.get("b");
    if (a) setCodeA(a.toUpperCase());
    if (b) setCodeB(b.toUpperCase());
  }, [searchParams]);

  const detailA = useMemo(() => getAcupointDetail(codeA) || getAcupointDetail("LI4")!, [codeA]);
  const detailB = useMemo(() => getAcupointDetail(codeB) || getAcupointDetail("LR3")!, [codeB]);

  const updateCodes = (newA: string, newB: string) => {
    if (newA === newB) {
      setDuplicateAlert(`「${newA}」が両方に選択されたため、別々の経穴を選んでください。`);
      return;
    }
    setDuplicateAlert(null);
    setCodeA(newA);
    setCodeB(newB);
    router.replace(`/tsubo/compare?a=${newA.toLowerCase()}&b=${newB.toLowerCase()}`);
  };

  const handleSwap = () => {
    updateCodes(codeB, codeA);
  };

  // 共通点・相違点の自動サマリー抽出
  const comparisonSummary = useMemo(() => {
    const commonCategories = detailA.categories.filter((c) => detailB.categories.includes(c));
    const commonIndications = detailA.indications.filter((ind) => detailB.indications.includes(ind));
    const isSameMeridian = detailA.meridianId === detailB.meridianId;
    const isSameBodyPart = detailA.bodyPart === detailB.bodyPart;

    const commonPoints: string[] = [];
    if (isSameMeridian) commonPoints.push(`同じ経脈（${detailA.meridian}）に所属`);
    if (isSameBodyPart) commonPoints.push(`同じ身体部位（${detailA.bodyPart}）に存在`);
    if (commonCategories.length > 0) commonPoints.push(`共通の要穴分類：${commonCategories.join("、")}`);
    if (commonIndications.length > 0) commonPoints.push(`共通の適応症：${commonIndications.slice(0, 4).join("、")}`);

    const differences: string[] = [];
    if (!isSameMeridian) differences.push(`所属経脈の違い：${detailA.meridianShort}（${detailA.name}） vs ${detailB.meridianShort}（${detailB.name}）`);
    if (!isSameBodyPart) differences.push(`部位の違い：${detailA.bodyPart} vs ${detailB.bodyPart}`);
    differences.push(`局所指標の違い：${detailA.palpationLandmarks[0] || detailA.locationSimple} vs ${detailB.palpationLandmarks[0] || detailB.locationSimple}`);

    return {
      commonPoints: commonPoints.length > 0 ? commonPoints : ["所属経脈および主たる要穴系統が異なります"],
      differences,
    };
  }, [detailA, detailB]);

  return (
    <div className="min-h-screen py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
        
        {/* パンくず */}
        <nav className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6]">
          <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/tsubo" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
            経穴辞典
          </Link>
          <span>/</span>
          <span className="text-[#232826] dark:text-[#FAF8F5] font-bold">2穴比較ツール</span>
        </nav>

        {/* ヘッダー */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold tracking-wider">
            <GitCompare className="w-3.5 h-3.5" />
            <span>Acupoint Comparison</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
            経穴 2穴比較ツール
          </h1>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-xl mx-auto">
            2つの経穴を選ぶと、下の比較表が自動更新されます。位置・骨性目印・要穴分類・解剖構造・適応症の違いを横並びで対比できます。
          </p>
        </div>

        {/* 2穴セレクターバー */}
        <div className="bg-[#FFFFFF] dark:bg-[#15202B] rounded-2xl sm:rounded-3xl border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 text-xs">
            <span className="font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
              <span>比較対象の2穴を選択</span>
            </span>
            <button
              type="button"
              onClick={handleSwap}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline cursor-pointer self-start sm:self-auto"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>AとBを入れ替える</span>
            </button>
          </div>

          {/* セレクターボタン並列 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 経穴 A */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                経穴 A：
              </label>
              <button
                type="button"
                onClick={() => setActivePicker("A")}
                className="w-full p-3.5 rounded-2xl border-2 border-[#1E3D34]/30 hover:border-[#1E3D34] bg-[#FAF8F5] dark:bg-[#10171F] text-left transition-all flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1E3D34] text-white shrink-0">
                    {detailA.code}
                  </span>
                  <div className="min-w-0">
                    <span className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                      {detailA.name}
                    </span>
                    <span className="text-xs text-[#737C77] ml-2">
                      {detailA.meridianShort} / {detailA.bodyPart}
                    </span>
                  </div>
                </div>
                <Search className="w-4 h-4 text-[#737C77] shrink-0" />
              </button>
            </div>

            {/* 経穴 B */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] block">
                経穴 B：
              </label>
              <button
                type="button"
                onClick={() => setActivePicker("B")}
                className="w-full p-3.5 rounded-2xl border-2 border-[#B86924]/30 hover:border-[#B86924] bg-[#FAF8F5] dark:bg-[#10171F] text-left transition-all flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#B86924] text-white shrink-0">
                    {detailB.code}
                  </span>
                  <div className="min-w-0">
                    <span className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                      {detailB.name}
                    </span>
                    <span className="text-xs text-[#737C77] ml-2">
                      {detailB.meridianShort} / {detailB.bodyPart}
                    </span>
                  </div>
                </div>
                <Search className="w-4 h-4 text-[#737C77] shrink-0" />
              </button>
            </div>
          </div>

          {duplicateAlert && (
            <div className="p-2.5 rounded-xl bg-[#FDEDEC] dark:bg-[#2A1715] border border-[#E53E3E] text-xs text-[#DC2626] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{duplicateAlert}</span>
            </div>
          )}
        </div>

        {/* 共通点と主な違いサマリー */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#EBF3EF] dark:bg-[#162A24] border border-[#C5DED4] dark:border-[#2A5243] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-xs text-[#1E3D34] dark:text-[#74BA9E]">
              <CheckCircle2 className="w-4 h-4" />
              <span>確認できる共通点</span>
            </div>
            <ul className="list-disc list-inside text-xs text-[#333835] dark:text-[#C5D2DB] space-y-1">
              {comparisonSummary.commonPoints.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#FCF4EB] dark:bg-[#281E15] border border-[#F2DEB0] dark:border-[#42381C] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-xs text-[#B86924] dark:text-[#E6C387]">
              <Sparkles className="w-4 h-4" />
              <span>主な相違点・見分け方</span>
            </div>
            <ul className="list-disc list-inside text-xs text-[#333835] dark:text-[#C5D2DB] space-y-1">
              {comparisonSummary.differences.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 項目そろえ構造化比較表 */}
        <div className="bg-white dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 bg-[#FAF8F5] dark:bg-[#10171F] border-b border-[#E8E1D1] dark:border-[#22303D] flex items-center justify-between">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
              項目別 比較詳細表
            </h2>
            <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
              スマホでは項目ごとにA/Bを対比表示
            </span>
          </div>

          <div className="divide-y divide-[#F2ECE0] dark:divide-[#22303D] text-xs">
            
            {/* 1. 基本情報 */}
            <CompareRow
              title="基本情報"
              contentA={
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-bold text-xs text-[#1E3D34] dark:text-[#74BA9E]">{detailA.code}</span>
                    <strong className="font-serif text-lg text-[#232826] dark:text-[#FAF8F5]">{detailA.name}</strong>
                    <span className="text-[#737C77]">{detailA.kana}</span>
                  </div>
                  <p className="text-[#59615D] dark:text-[#A0B0BC]">{detailA.meridian}（{detailA.bodyPart}）</p>
                </div>
              }
              contentB={
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-bold text-xs text-[#B86924] dark:text-[#E6C387]">{detailB.code}</span>
                    <strong className="font-serif text-lg text-[#232826] dark:text-[#FAF8F5]">{detailB.name}</strong>
                    <span className="text-[#737C77]">{detailB.kana}</span>
                  </div>
                  <p className="text-[#59615D] dark:text-[#A0B0BC]">{detailB.meridian}（{detailB.bodyPart}）</p>
                </div>
              }
            />

            {/* 2. 取穴位置 */}
            <CompareRow
              title="取穴位置"
              contentA={
                <div className="space-y-1">
                  <p className="font-medium text-[#232826] dark:text-[#FAF8F5] leading-relaxed">{detailA.locationSimple}</p>
                  <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] font-mono">WHO部位：{detailA.locationDetail}</p>
                </div>
              }
              contentB={
                <div className="space-y-1">
                  <p className="font-medium text-[#232826] dark:text-[#FAF8F5] leading-relaxed">{detailB.locationSimple}</p>
                  <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] font-mono">WHO部位：{detailB.locationDetail}</p>
                </div>
              }
            />

            {/* 3. 骨性・腱目印 */}
            <CompareRow
              title="触知目印"
              contentA={
                <ul className="list-disc list-inside space-y-0.5 text-[#333835] dark:text-[#C5D2DB]">
                  {detailA.palpationLandmarks.map((lm, i) => (
                    <li key={i}>{lm}</li>
                  ))}
                </ul>
              }
              contentB={
                <ul className="list-disc list-inside space-y-0.5 text-[#333835] dark:text-[#C5D2DB]">
                  {detailB.palpationLandmarks.map((lm, i) => (
                    <li key={i}>{lm}</li>
                  ))}
                </ul>
              }
            />

            {/* 4. 要穴分類 */}
            <CompareRow
              title="要穴分類"
              contentA={
                <div className="flex flex-wrap gap-1">
                  {detailA.categories.length > 0 ? (
                    detailA.categories.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-medium text-[11px]">
                        {c}
                      </span>
                    ))
                  ) : (
                    <span className="text-[#737C77]">要穴分類なし（通常経穴）</span>
                  )}
                </div>
              }
              contentB={
                <div className="flex flex-wrap gap-1">
                  {detailB.categories.length > 0 ? (
                    detailB.categories.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-[#FCF4EB] dark:bg-[#281E15] text-[#B86924] dark:text-[#E6C387] font-medium text-[11px]">
                        {c}
                      </span>
                    ))
                  ) : (
                    <span className="text-[#737C77]">要穴分類なし（通常経穴）</span>
                  )}
                </div>
              }
            />

            {/* 5. 局所解剖構造 */}
            <CompareRow
              title="解剖構造"
              contentA={
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      detailA.hasDetailedAnatomy ? "bg-[#EBF3EF] text-[#1E3D34]" : "bg-gray-100 text-gray-500"
                    }`}>
                      {detailA.hasDetailedAnatomy ? "精密断面図あり" : "標準基本解剖"}
                    </span>
                    <span className="text-[11px] text-[#737C77]">刺入角：{detailA.crossSection.needleTrack.angle}</span>
                  </div>
                  <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC]">
                    標的構造：{detailA.crossSection.needleTrack.targetStructure}
                  </p>
                </div>
              }
              contentB={
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      detailB.hasDetailedAnatomy ? "bg-[#FCF4EB] text-[#B86924]" : "bg-gray-100 text-gray-500"
                    }`}>
                      {detailB.hasDetailedAnatomy ? "精密断面図あり" : "標準基本解剖"}
                    </span>
                    <span className="text-[11px] text-[#737C77]">刺入角：{detailB.crossSection.needleTrack.angle}</span>
                  </div>
                  <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC]">
                    標的構造：{detailB.crossSection.needleTrack.targetStructure}
                  </p>
                </div>
              }
            />

            {/* 6. 伝統的主治 */}
            <CompareRow
              title="主な主治症"
              contentA={
                <div className="flex flex-wrap gap-1">
                  {detailA.indications.map((ind, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E0D8C8] text-[11px]">
                      {ind}
                    </span>
                  ))}
                </div>
              }
              contentB={
                <div className="flex flex-wrap gap-1">
                  {detailB.indications.map((ind, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E0D8C8] text-[11px]">
                      {ind}
                    </span>
                  ))}
                </div>
              }
            />

            {/* 7. 研究エビデンス */}
            <CompareRow
              title="研究情報"
              contentA={
                detailA.researchEvidence ? (
                  <div className="space-y-1 text-[11px]">
                    <p className="font-semibold text-[#1E3D34] dark:text-[#74BA9E]">{detailA.researchEvidence.focus}</p>
                    <p className="text-[#59615D] dark:text-[#A0B0BC]">{detailA.researchEvidence.findings}</p>
                  </div>
                ) : (
                  <span className="text-[#737C77] text-[11px]">系統的EBM研究レビュー準備中</span>
                )
              }
              contentB={
                detailB.researchEvidence ? (
                  <div className="space-y-1 text-[11px]">
                    <p className="font-semibold text-[#B86924] dark:text-[#E6C387]">{detailB.researchEvidence.focus}</p>
                    <p className="text-[#59615D] dark:text-[#A0B0BC]">{detailB.researchEvidence.findings}</p>
                  </div>
                ) : (
                  <span className="text-[#737C77] text-[11px]">系統的EBM研究レビュー準備中</span>
                )
              }
            />

            {/* 8. アクション */}
            <CompareRow
              title="詳細・学習"
              contentA={
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/tsubo/${detailA.codeLower}`}
                    className="px-3 py-1.5 rounded-xl bg-[#1E3D34] text-white font-bold hover:bg-[#162E27] transition-all inline-flex items-center gap-1"
                  >
                    <span>{detailA.name}の個別解説</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleClip({
                      id: `tsubo-${detailA.codeLower}`,
                      title: `${detailA.name}（${detailA.code}）`,
                      type: "tsubo",
                      points: [detailA.name],
                      elements: [],
                      indications: detailA.indications,
                      summary: detailA.locationSimple,
                    })}
                    className="px-2.5 py-1.5 rounded-xl border border-[#D8CFC0] hover:bg-[#FAF8F5] text-[11px] font-medium flex items-center gap-1"
                  >
                    <Bookmark className={`w-3 h-3 ${isClipped(`tsubo-${detailA.codeLower}`) ? "fill-[#B86924] text-[#B86924]" : ""}`} />
                    <span>{isClipped(`tsubo-${detailA.codeLower}`) ? "保存中" : "保存"}</span>
                  </button>
                </div>
              }
              contentB={
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/tsubo/${detailB.codeLower}`}
                    className="px-3 py-1.5 rounded-xl bg-[#B86924] text-white font-bold hover:bg-[#9C5417] transition-all inline-flex items-center gap-1"
                  >
                    <span>{detailB.name}の個別解説</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleClip({
                      id: `tsubo-${detailB.codeLower}`,
                      title: `${detailB.name}（${detailB.code}）`,
                      type: "tsubo",
                      points: [detailB.name],
                      elements: [],
                      indications: detailB.indications,
                      summary: detailB.locationSimple,
                    })}
                    className="px-2.5 py-1.5 rounded-xl border border-[#D8CFC0] hover:bg-[#FAF8F5] text-[11px] font-medium flex items-center gap-1"
                  >
                    <Bookmark className={`w-3 h-3 ${isClipped(`tsubo-${detailB.codeLower}`) ? "fill-[#B86924] text-[#B86924]" : ""}`} />
                    <span>{isClipped(`tsubo-${detailB.codeLower}`) ? "保存中" : "保存"}</span>
                  </button>
                </div>
              }
            />

          </div>
        </div>

        {/* 編集済み代表比較例（プリセットアコーディオン） */}
        <div className="bg-[#FAF8F5] dark:bg-[#15202B] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-7 space-y-4">
          <div>
            <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              編集済み代表比較例（学習用プリセット）
            </h3>
            <p className="text-xs text-[#737C77] dark:text-[#8899A6] mt-0.5">
              臨床で頻用される代表的なペアの出典と鑑別理由です
            </p>
          </div>

          <div className="space-y-4">
            {PRESET_CATEGORIES.map((cat, cIdx) => (
              <div key={cIdx} className="space-y-2">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                  {cat.categoryTitle}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {cat.pairs.map((p, pIdx) => {
                    const isActive = codeA === p.codeA && codeB === p.codeB;
                    return (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => updateCodes(p.codeA, p.codeB)}
                        className={`p-3 rounded-2xl border text-left transition-all text-xs flex flex-col justify-between ${
                          isActive
                            ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-xs"
                            : "bg-white dark:bg-[#10171F] border-[#E8E1D1] dark:border-[#263542] hover:border-[#1E3D34]"
                        }`}
                      >
                        <div>
                          <strong className="block font-bold">{p.label}</strong>
                          <span className={`text-[10px] block mt-0.5 ${isActive ? "text-[#E6C387]" : "text-[#737C77]"}`}>
                            {p.source}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-2 line-clamp-2 leading-relaxed ${isActive ? "text-white/90" : "text-[#59615D] dark:text-[#A0B0BC]"}`}>
                          {p.rationale}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 経穴検索モーダル */}
      <AcupointPickerModal
        isOpen={activePicker !== null}
        onClose={() => setActivePicker(null)}
        onSelect={(pt) => {
          if (activePicker === "A") {
            updateCodes(pt.code, codeB);
          } else if (activePicker === "B") {
            updateCodes(codeA, pt.code);
          }
        }}
        selectedCode={activePicker === "A" ? codeA : codeB}
        disabledCode={activePicker === "A" ? codeB : codeA}
        title={activePicker === "A" ? "経穴 A を選択" : "経穴 B を選択"}
      />
    </div>
  );
}

// 比較テーブル行コンポーネント（スマホでは項目単位で交互スタック）
function CompareRow({
  title,
  contentA,
  contentB,
}: {
  title: string;
  contentA: React.ReactNode;
  contentB: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
      {/* 項目名ヘッダー */}
      <div className="md:col-span-2 p-3 sm:p-4 bg-[#FAF8F5] dark:bg-[#121920] font-bold text-[#59615D] dark:text-[#A0B0BC] flex items-center border-b md:border-b-0 md:border-r border-[#F2ECE0] dark:border-[#22303D]">
        <span>{title}</span>
      </div>

      {/* 経穴 A コンテンツ */}
      <div className="md:col-span-5 p-3.5 sm:p-5 bg-white dark:bg-[#17212A] border-b md:border-b-0 md:border-r border-[#F2ECE0] dark:border-[#22303D] space-y-1">
        <span className="md:hidden text-[10px] font-bold text-[#1E3D34] block mb-1 uppercase tracking-wider">
          【経穴 A】
        </span>
        {contentA}
      </div>

      {/* 経穴 B コンテンツ */}
      <div className="md:col-span-5 p-3.5 sm:p-5 bg-white dark:bg-[#17212A] space-y-1">
        <span className="md:hidden text-[10px] font-bold text-[#B86924] block mb-1 uppercase tracking-wider">
          【経穴 B】
        </span>
        {contentB}
      </div>
    </div>
  );
}
