"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Layers, 
  Stethoscope, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Compass,
  ChevronDown,
  ChevronUp,
  Scale,
  GraduationCap,
  ArrowUp,
  SlidersHorizontal,
  FileText,
  FlaskConical
} from "lucide-react";
import { trackEvent } from "@/utils/analytics";
import { 
  DepthType, 
  TemperatureType, 
  StateType, 
  QixueshuiType, 
  ZangfuType,
  ComplexStateType,
  COMPLEX_STATE_OPTIONS,
  FourExaminationsInput,
  PALPATION_OPTIONS,
  TEMP_REACTION_OPTIONS,
  DRINKING_OPTIONS,
  TONGUE_OPTIONS,
  ACADEMIC_STANDARDS,
  PreviousSelection,
  DEPTH_OPTIONS,
  TEMP_OPTIONS,
  STATE_OPTIONS,
  QIXUESHUI_OPTIONS,
  ZANGFU_OPTIONS,
  synthesizeComprehensiveDiagnosis,
  ComprehensiveDiagnosis
} from "@/data/simulatorData";
import { saveDraftPatientNote } from "@/utils/draftNote";
import type { SafetyReview } from "@/data/simulatorReasoning";
import { ACUPOINT_LOOKUP as TSUBOS } from "@/data/acupointLookup";
import { Tsubo } from "@/types/oriental";

const STORAGE_KEY = "haritaro_simulator_state_v1";

// 兼証（随証病態）の代表的配穴マップ
const SECONDARY_POINT_MAP: Record<QixueshuiType, { label: string; pairName: string; primary: string; secondary: string; role: string; desc: string }> = {
  qixu: { label: "気虚（元気不足）", pairName: "健脾益気ペア", primary: "足三里", secondary: "太白", role: "合土穴・原土穴", desc: "伝統的な補気の目的で検討する例" },
  qizhi: { label: "気滞（ストレス・緊張）", pairName: "疏肝理気ペア", primary: "太衝", secondary: "陽陵泉", role: "原木穴・筋会", desc: "伝統的な理気の目的で検討する例" },
  qini: { label: "気逆（のぼせ・咳逆）", pairName: "和胃降気ペア", primary: "内関", secondary: "中脘", role: "八脈交会穴・胃募穴", desc: "伝統的な降気の目的で検討する例" },
  xuexu: { label: "血虚（滋養の不足）", pairName: "養血調血ペア", primary: "三陰交", secondary: "血海", role: "三陰交会・脾経", desc: "肝脾腎の血分を滋養し、滋養を補うことを伝統的な目的として検討" },
  yuxue: { label: "瘀血（血の運行の滞り）", pairName: "活血化瘀ペア", primary: "膈兪", secondary: "血海", role: "血会・血海", desc: "伝統的な活血の目的で検討する例" },
  shuitai: { label: "水滞（むくみ・痰湿）", pairName: "利水化湿ペア", primary: "陰陵泉", secondary: "水分", role: "合水穴・任脈", desc: "水湿を扱う伝統的な治則として、所見と照合" },
  yinxu: { label: "陰虚（虚熱・ほてり）", pairName: "滋陰降火ペア", primary: "太渓", secondary: "照海", role: "原穴・八脈交会穴", desc: "伝統的な滋陰の目的で検討する例" },
  yangxu: { label: "陽虚（温煦の不足）", pairName: "温陽補腎ペア", primary: "関元", secondary: "命門", role: "小腸募穴・督脈", desc: "伝統的な温陽の目的で検討する例" },
};

// 選択された病態（気血水・臓腑・複合病態）に応じた関連カリキュラム講義のマッピング
interface RelatedLectureInfo {
  id: string;
  chapter: string;
  title: string;
}

function getRelatedLectures(
  qixueshui: QixueshuiType,
  zangfu: ZangfuType,
  complexState: ComplexStateType
): {
  pathomechanism: RelatedLectureInfo;
  treatment: RelatedLectureInfo;
} {
  // 1. 病因病機講義（第5講）
  let pathomechanism: RelatedLectureInfo;

  if (complexState !== "none") {
    pathomechanism = {
      id: "lecture-pathomechanism-10",
      chapter: "病機論 レッスン10",
      title: "慢性化と複合病態（虚実挟雑・本虚標実・寒熱錯雑）",
    };
  } else {
    switch (qixueshui) {
      case "qixu":
        pathomechanism = {
          id: "lecture-pathomechanism-3",
          chapter: "病機論 レッスン3",
          title: "気の不足と運動の失調（気虚の病理機序）",
        };
        break;
      case "qizhi":
      case "qini":
        pathomechanism = {
          id: "lecture-pathomechanism-3",
          chapter: "病機論 レッスン3",
          title: "気の不足と運動の失調（気滞・気逆の病理機序）",
        };
        break;
      case "xuexu":
        pathomechanism = {
          id: "lecture-pathomechanism-5",
          chapter: "病機論 レッスン5",
          title: "血の失調と瘀血の形成（血虚の生起機序）",
        };
        break;
      case "yuxue":
        pathomechanism = {
          id: "lecture-pathomechanism-5",
          chapter: "病機論 レッスン5",
          title: "血の失調と瘀血の形成（瘀血・脈絡阻滞）",
        };
        break;
      case "shuitai":
        pathomechanism = {
          id: "lecture-pathomechanism-4",
          chapter: "病機論 レッスン4",
          title: "津液代謝の失調（水湿・痰濁の病理機序）",
        };
        break;
      case "yinxu":
        pathomechanism = {
          id: "lecture-pathomechanism-6",
          chapter: "病機論 レッスン6",
          title: "寒熱と陰陽の失調（陰虚内熱・虚熱病機）",
        };
        break;
      case "yangxu":
        pathomechanism = {
          id: "lecture-pathomechanism-6",
          chapter: "病機論 レッスン6",
          title: "寒熱と陰陽の失調（陽虚生寒・虚寒病機）",
        };
        break;
      default:
        pathomechanism = {
          id: "lecture-pathomechanism-1",
          chapter: "病機論 レッスン1",
          title: "病機とは何か（病因・病機・証の思考体系）",
        };
        break;
    }
  }

  // 2. 治法・配穴講義（第7講）
  let treatment: RelatedLectureInfo;
  if (qixueshui === "qixu" || qixueshui === "qizhi" || qixueshui === "qini") {
    treatment = {
      id: "lecture-treatment-5",
      chapter: "治法論 レッスン5",
      title: "気への治法を整理する（補気・理気・降気）",
    };
  } else if (qixueshui === "xuexu" || qixueshui === "yuxue" || qixueshui === "shuitai" || qixueshui === "yinxu") {
    treatment = {
      id: "lecture-treatment-6",
      chapter: "治法論 レッスン6",
      title: "血・津液への治法を整理する（養血・活血・滋陰・利水化痰）",
    };
  } else if (qixueshui === "yangxu") {
    treatment = {
      id: "lecture-treatment-3",
      chapter: "治法論 レッスン3",
      title: "補瀉・寒熱の原則を理解する（温補陽気）",
    };
  } else {
    treatment = {
      id: "lecture-treatment-2",
      chapter: "治法論 レッスン2",
      title: "証から治則・治法へつなぐ（多層構造と判断）",
    };
  }

  return { pathomechanism, treatment };
}

export default function ThreeStageSimulator() {
  const router = useRouter();
  // ステップ1: 八綱
  const [depth, setDepth] = useState<DepthType>("interior");
  const [temp, setTemp] = useState<TemperatureType>("heat");
  const [state, setState] = useState<StateType>("excess");

  // ステップ2: 気血水（主病態）
  const [qixueshui, setQixueshui] = useState<QixueshuiType>("qizhi");

  // ステップ2+: 兼証（随証病態：任意選択）
  const [secondaryQixueshui, setSecondaryQixueshui] = useState<QixueshuiType | "none">("none");

  // ステップ3: 臓腑経絡
  const [zangfu, setZangfu] = useState<ZangfuType>("liver");

  // 複雑な状態（折りたたみアコーディオン内）
  const [complexState, setComplexState] = useState<ComplexStateType>("none");
  const [isComplexAccordionOpen, setIsComplexAccordionOpen] = useState<boolean>(false);

  // 四診の判断材料（キーサイン）
  const [fourExams, setFourExams] = useState<FourExaminationsInput>({
    palpation: "unconfirmed",
    tempReaction: "unconfirmed",
    drinking: "unconfirmed",
    tongue: "unconfirmed"
  });

  const [safetyReview, setSafetyReview] = useState<SafetyReview>("unconfirmed");

  // サンプルプリセット追跡
  const [activePresetId, setActivePresetId] = useState<string | null>("preset-ganki");

  // 詳細ツボモーダル用
  const [modalTsubo, setModalTsubo] = useState<Tsubo | null>(null);
  const openAcupoint = async (id: string) => {
    setChangeNotice('経穴の詳しい情報を読み込んでいます。');
    try {
      const { TSUBOS: completePoints } = await import('@/data/tsuboData');
      const point = completePoints.find(item => item.id === id);
      if (!point) throw new Error('missing point');
      setModalTsubo(point);
      setChangeNotice(null);
    } catch { setChangeNotice('経穴情報を読み込めませんでした。経穴の詳細ページから確認してください。'); }
  };

  // 結果エリアの4大折りたたみアコーディオン（デフォルト閉）
  const [isReasonOpen, setIsReasonOpen] = useState<boolean>(true);
  const [isDifferentialOpen, setIsDifferentialOpen] = useState<boolean>(true);
  const [isAcupointOpen, setIsAcupointOpen] = useState<boolean>(false);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState<boolean>(false);

  // 初回マウント制御 & 条件変更差分通知（1〜2行で簡潔表示）
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [changeNotice, setChangeNotice] = useState<string | null>(null);

  // 症例演習からの連動情報
  const [fromCaseInfo, setFromCaseInfo] = useState<{ number: string; title: string } | null>(null);
  // 体質診断からの連動情報
  const [fromDiagnosisInfo, setFromDiagnosisInfo] = useState<{ diagName: string } | null>(null);
  // 経穴詳細からの連動情報（逆引き推論）
  const [fromTsuboInfo, setFromTsuboInfo] = useState<{ code: string; name: string } | null>(null);

  // 診断推論の算出
  
  // 臨床ノートへの下書き引き渡し
  const handleSaveToNoteDraft = () => {
    const primaryOpt = diagnosis.acupointOptions[0];
    const secConfig = diagnosis.acupointOptions.length && secondaryQixueshui !== "none" ? SECONDARY_POINT_MAP[secondaryQixueshui] : null;
    const basePointsStr = primaryOpt 
      ? `${primaryOpt.primaryAcupoint.name}, ${primaryOpt.secondaryAcupoint.name}`
      : "";
    const pointsStr = secConfig 
      ? (basePointsStr ? `${basePointsStr}、 ${secConfig.primary}、 ${secConfig.secondary}` : `${secConfig.primary}、 ${secConfig.secondary}`)
      : basePointsStr;

    const fullSyndrome = secConfig 
      ? `${diagnosis.syndromeName}（兼 ${secConfig.label}）` 
      : diagnosis.syndromeName;

    saveDraftPatientNote({
      sourceTool: "臨床弁証シミュレーター",
      syndrome: fullSyndrome,
      constitution: `一文の証: ${diagnosis.oneSentenceFormula}${secConfig ? ` ＋ 随証（${secConfig.label}）` : ""}`,
      chiefComplaint: `八綱・気血水・臓腑経絡の推論（${diagnosis.summary}）`,
      selectedPointsInput: pointsStr,
      treatmentPlan: `【臨床弁証シミュレーター推論】\n証名候補: ${fullSyndrome}\n治則: ${diagnosis.treatmentPrinciple.rule}\n介入戦略: ${diagnosis.treatmentPrinciple.strategy}${primaryOpt ? `\n【主病態への配穴候補】: ${primaryOpt.pairName}（${primaryOpt.intendedEffect}）` : ""}${secConfig ? `\n【補助的な病態への配穴候補】: ${secConfig.pairName}（${secConfig.primary}・${secConfig.secondary} / ${secConfig.desc}）` : ""}\n※本内容はシミュレーターによる推論候補・下書きです。確定診断としてではなく、臨床家の所見に基づき編集してご活用ください。`,
    });

    trackEvent("tool_complete", {
      tool_id: "simulator",
      destination_type: "note",
    });

    router.push("/notes");
  };

  const diagnosis: ComprehensiveDiagnosis = synthesizeComprehensiveDiagnosis(depth, temp, state, qixueshui, zangfu, complexState, fourExams, safetyReview);

  const relatedLectures = useMemo(() => {
    return getRelatedLectures(qixueshui, zangfu, complexState);
  }, [qixueshui, zangfu, complexState]);

  // URL searchParams または sessionStorage からの初期復元
  useEffect(() => {
    if (typeof window === "undefined") return;

    const restoreTimer = setTimeout(() => {
    // 1. URL searchParams の優先チェック（症例・体質診断等からの連携）
    const searchParams = new URLSearchParams(window.location.search);
    const fromTsubo = searchParams.get("fromTsubo");
    const tsuboName = searchParams.get("tsuboName");

    if (fromTsubo) {
      // 古い経穴リンクの自動推論条件も採用しない。経穴から証は確定できない。
      setFromTsuboInfo({
        code: fromTsubo,
        name: tsuboName || fromTsubo,
      });
      setActivePresetId(null);
      setChangeNotice(`参照元の経穴は「${tsuboName || fromTsubo}」です。初期条件はこの経穴の適応病態を示しません。所見に応じて学習条件を選び直してください。`);
      setIsMounted(true);
      return;
    }

    const fromCase = searchParams.get("fromCase");
    const caseTitle = searchParams.get("caseTitle");

    if (fromCase) {
      const qDepth = searchParams.get("depth") as DepthType | null;
      const qTemp = searchParams.get("temp") as TemperatureType | null;
      const qState = searchParams.get("state") as StateType | null;
      const qQixueshui = searchParams.get("qixueshui") as QixueshuiType | null;
      const qZangfu = searchParams.get("zangfu") as ZangfuType | null;
      const qComplex = searchParams.get("complexState") as ComplexStateType | null;

      if (qDepth) setDepth(qDepth);
      if (qTemp) setTemp(qTemp);
      if (qState) setState(qState);
      if (qQixueshui) setQixueshui(qQixueshui);
      if (qZangfu) setZangfu(qZangfu);
      if (qComplex) setComplexState(qComplex);

      setFromCaseInfo({
        number: fromCase,
        title: caseTitle || `症例 ${fromCase}`,
      });
      setActivePresetId(null);
      setChangeNotice(`症例${fromCase}（${caseTitle || ""}）の臨床所見を反映しました。条件を動かして配穴変化を観察できます。`);
      setIsMounted(true);
      return;
    }

    const fromDiagnosis = searchParams.get("fromDiagnosis");
    const diagName = searchParams.get("diagName");

    if (fromDiagnosis) {
      const qDepth = searchParams.get("depth") as DepthType | null;
      const qTemp = searchParams.get("temp") as TemperatureType | null;
      const qState = searchParams.get("state") as StateType | null;
      const qQixueshui = searchParams.get("qixueshui") as QixueshuiType | null;
      const qZangfu = searchParams.get("zangfu") as ZangfuType | null;

      if (qDepth) setDepth(qDepth);
      if (qTemp) setTemp(qTemp);
      if (qState) setState(qState);
      if (qQixueshui) setQixueshui(qQixueshui);
      if (qZangfu) setZangfu(qZangfu);

      setFromDiagnosisInfo({
        diagName: diagName || "体質診断",
      });
      setActivePresetId(null);
      setChangeNotice(`気血水体質診断（${diagName || ""}）の所見を反映しました。八綱・臓腑の連動配穴を検証できます。`);
      setIsMounted(true);
      return;
    }

    // 2. 通常の sessionStorage 復元
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.depth) setDepth(parsed.depth);
        if (parsed.temp) setTemp(parsed.temp);
        if (parsed.state) setState(parsed.state);
        if (parsed.qixueshui) setQixueshui(parsed.qixueshui);
        if (parsed.zangfu) setZangfu(parsed.zangfu);
        if (parsed.complexState) setComplexState(parsed.complexState);
        if (parsed.fourExams) setFourExams(parsed.fourExams);
        if (parsed.activePresetId !== undefined) setActivePresetId(parsed.activePresetId);
        if (parsed.isComplexAccordionOpen !== undefined) setIsComplexAccordionOpen(parsed.isComplexAccordionOpen);
        if (parsed.isReasonOpen !== undefined) setIsReasonOpen(parsed.isReasonOpen);
        if (parsed.isDifferentialOpen !== undefined) setIsDifferentialOpen(parsed.isDifferentialOpen);
        if (parsed.isAcupointOpen !== undefined) setIsAcupointOpen(parsed.isAcupointOpen);
        if (parsed.isEvidenceOpen !== undefined) setIsEvidenceOpen(parsed.isEvidenceOpen);
        if (parsed.changeNotice) setChangeNotice(parsed.changeNotice);

        if (parsed.scrollY && typeof window !== "undefined") {
          setTimeout(() => {
            window.scrollTo({ top: parsed.scrollY, behavior: "smooth" });
          }, 150);
        }
      }
    } catch (e) {
      console.warn("Failed to read sessionStorage", e);
    } finally {
      setIsMounted(true);
    }
    }, 0);
    return () => clearTimeout(restoreTimer);
  }, []);

  // 状態変更時の sessionStorage 保存
  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;
    try {
      const dataToSave = {
        depth,
        temp,
        state,
        qixueshui,
        zangfu,
        complexState,
        fourExams,
        activePresetId,
        isComplexAccordionOpen,
        isReasonOpen,
        isDifferentialOpen,
        isAcupointOpen,
        isEvidenceOpen,
        changeNotice,
        scrollY: window.scrollY
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // 保存不可時は無視
    }
  }, [
    depth,
    temp,
    state,
    qixueshui,
    zangfu,
    complexState,
    fourExams,
    activePresetId,
    isComplexAccordionOpen,
    isReasonOpen,
    isDifferentialOpen,
    isAcupointOpen,
    isEvidenceOpen,
    changeNotice,
    isMounted
  ]);

  // ESCキーで経穴パネルを閉じる
  useEffect(() => {
    if (!modalTsubo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalTsubo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalTsubo]);

  // パラメータ更新ハンドラ（差分通知生成）
  const handleUpdate = (updates: Partial<PreviousSelection>, newPresetId: string | null = null) => {
    let noticeText: string | null = null;

    if (updates.depth !== undefined && updates.depth !== depth) {
      const fromLabel = depth === "interior" ? "裏（深部・臓腑）" : "表（浅部・体表）";
      const toLabel = updates.depth === "interior" ? "裏（深部・臓腑）" : "表（浅部・体表）";
      noticeText = `病位：『${fromLabel}』➔『${toLabel}』へ変更。病態の深さが切り替わりました。`;
      setDepth(updates.depth);
    }
    if (updates.temp !== undefined && updates.temp !== temp) {
      const fromLabel = temp === "heat" ? "熱（熱の徴候）" : "寒（冷えの徴候）";
      const toLabel = updates.temp === "heat" ? "熱（熱の徴候）" : "寒（冷えの徴候）";
      noticeText = `寒熱：『${fromLabel}』➔『${toLabel}』へ変更。治療方針と配穴の狙いが切り替わりました。`;
      setTemp(updates.temp);
    }
    if (updates.state !== undefined && updates.state !== state) {
      const fromLabel = state === "excess" ? "実（邪気の滞り）" : "虚（正気の不足）";
      const toLabel = updates.state === "excess" ? "実（邪気の滞り）" : "虚（正気の不足）";
      noticeText = `虚実：『${fromLabel}』➔『${toLabel}』へ変更。瀉法（滞り打破）と補法（体力補給）の戦略が転換しました。`;
      setState(updates.state);
    }
    if (updates.qixueshui !== undefined && updates.qixueshui !== qixueshui) {
      const qFrom = QIXUESHUI_OPTIONS.find((q) => q.value === qixueshui)?.label.split("（")[0] || "";
      const qTo = QIXUESHUI_OPTIONS.find((q) => q.value === updates.qixueshui)?.label.split("（")[0] || "";
      noticeText = `気血水：『${qFrom}』➔『${qTo}』へ変更。生体物質の動態推論が更新されました。`;
      setQixueshui(updates.qixueshui);
    }
    if (updates.zangfu !== undefined && updates.zangfu !== zangfu) {
      const zFrom = ZANGFU_OPTIONS.find((z) => z.value === zangfu)?.label.split("（")[0] || "";
      const zTo = ZANGFU_OPTIONS.find((z) => z.value === updates.zangfu)?.label.split("（")[0] || "";
      noticeText = `臓腑：『${zFrom}』➔『${zTo}』へ変更。局在系統と主経絡が切り替わりました。`;
      setZangfu(updates.zangfu);
    }
    if (updates.complexState !== undefined && updates.complexState !== complexState) {
      if (updates.complexState === "none") {
        noticeText = `複雑病態を解除し、標準の二択モードに戻しました。`;
      } else {
        const cOpt = COMPLEX_STATE_OPTIONS.find((c) => c.value === updates.complexState);
        noticeText = `併存病態：『${cOpt?.label || updates.complexState}』を適用しました。`;
      }
      setComplexState(updates.complexState);
    }

    if (noticeText) {
      setChangeNotice(noticeText);
    }
    setActivePresetId(newPresetId);
  };

  // 四診キーサインの切り替え
  const handleFourExamChange = <K extends keyof FourExaminationsInput>(field: K, val: FourExaminationsInput[K]) => {
    setFourExams(prev => ({ ...prev, [field]: val }));
    setChangeNotice("四診の所見を更新しました。すべての所見と選択条件を照合し、不一致を表示します。");
  };

  // リセット（初期状態へ戻す）
  const handleReset = () => {
    setDepth("interior");
    setTemp("heat");
    setState("excess");
    setQixueshui("qizhi");
    setZangfu("liver");
    setComplexState("none");
    setSafetyReview("unconfirmed");
    setFourExams({
      palpation: "unconfirmed",
      tempReaction: "unconfirmed",
      drinking: "unconfirmed",
      tongue: "unconfirmed"
    });
    setActivePresetId("preset-ganki");
    setChangeNotice(null);
    setIsReasonOpen(false);
    setIsDifferentialOpen(false);
    setIsAcupointOpen(false);
    setIsEvidenceOpen(false);

    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  };

  return (
    <div className="space-y-6 sm:space-y-10">
<section className="rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 space-y-3 text-sm">
        <h3 className="font-bold text-[#232826] dark:text-[#FAF8F5]">安全判断の学習設定</h3>
        <p className="text-xs leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">急な胸痛・呼吸困難・意識障害、腰痛に伴う新しい排尿障害や会陰部の感覚変化など、医療評価を優先する兆候を確認します。この選択だけで疾患を除外することはできません。</p>
        <div className="flex flex-wrap gap-2">{([{ value: "unconfirmed", label: "危険兆候：未確認" }, { value: "no_flags", label: "確認した範囲では認めない" }, { value: "red_flags", label: "危険兆候がある設定" }] as const).map(option => <button key={option.value} type="button" aria-pressed={safetyReview === option.value} onClick={() => setSafetyReview(option.value)} className={`rounded-lg border p-2 text-xs ${safetyReview === option.value ? "bg-[#1E3D34] border-[#1E3D34] text-white" : "border-[#E5DEC9] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#A0B0BC]"}`}>{option.label}</button>)}</div>
      </section>

      {/* 症例連携通知バナー */}
      {fromCaseInfo && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#EBF3EF] to-[#FAF8F5] dark:from-[#182823] dark:to-[#17212A] border-2 border-[#1E3D34] dark:border-[#74BA9E] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-[#1E3D34] text-white shrink-0">
              <FlaskConical className="w-5 h-5 text-[#E6C387]" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1E3D34] text-white">
                  症例 {fromCaseInfo.number} 連動中
                </span>
                <span className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                  {fromCaseInfo.title}
                </span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-0.5 leading-relaxed">
                症例の八綱・気血水・臓腑が反映されています。条件を変更して、もし寒熱や臓腑が異なっていた場合の配穴変化を観察できます。
              </p>
            </div>
          </div>
          <button
            onClick={() => setFromCaseInfo(null)}
            className="text-xs font-semibold text-[#59615D] dark:text-[#96A6B2] hover:text-[#1E3D34] underline cursor-pointer shrink-0"
          >
            連動を解除
          </button>
        </div>
      )}

      {/* 体質診断連携通知バナー */}
      {fromDiagnosisInfo && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FCF4EB] to-[#FAF8F5] dark:from-[#2A2016] dark:to-[#17212A] border-2 border-[#B86924] dark:border-[#E6C387] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-[#B86924] text-white shrink-0">
              <FlaskConical className="w-5 h-5 text-[#FAF8F5]" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#B86924] text-white">
                  体質診断 連動中
                </span>
                <span className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                  {fromDiagnosisInfo.diagName}
                </span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-0.5 leading-relaxed">
                気血水体質診断の所見が反映されています。八綱や臓腑を切り替えて、配穴処方の変化を観察できます。
              </p>
            </div>
          </div>
          <button
            onClick={() => setFromDiagnosisInfo(null)}
            className="text-xs font-semibold text-[#59615D] dark:text-[#96A6B2] hover:text-[#B86924] underline cursor-pointer shrink-0"
          >
            連動を解除
          </button>
        </div>
      )}

      {/* 経穴詳細からの逆引き推論バナー */}
      {fromTsuboInfo && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#EBF3EF] to-[#FAF8F5] dark:from-[#182823] dark:to-[#17212A] border-2 border-[#1E3D34] dark:border-[#74BA9E] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-[#1E3D34] text-white shrink-0">
              <Compass className="w-5 h-5 text-[#E6C387]" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1E3D34] text-white">
                  参照元：{fromTsuboInfo.name}（{fromTsuboInfo.code}）
                </span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-0.5 leading-relaxed">
                「{fromTsuboInfo.name}」を参照しています。初期条件はこの経穴の適応病態を示しません。経穴名から証を決めず、所見に応じて条件を選び直してください。候補の一致だけで個人への適応は判断できません。
              </p>
            </div>
          </div>
          <button
            onClick={() => setFromTsuboInfo(null)}
            className="text-xs font-semibold text-[#59615D] dark:text-[#96A6B2] hover:text-[#1E3D34] underline cursor-pointer shrink-0"
          >
            連動を解除
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. 条件選択枠（入力エリア）                                    */}
      {/* ============================================================ */}
      <div 
        id="simulator-conditions" 
        className="scroll-mt-24 bg-[#FFFFFF] dark:bg-[#17212A] p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-5 sm:space-y-6 transition-colors"
      >
        {/* 上部ヘッダー（タイトル重複排除・状態バッジ・症例選択） */}
        <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 sm:pb-5 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E]" />
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                条件を選ぶ（八綱・気血水・臓腑）
              </h2>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold border border-[#C5DED4] dark:border-[#2A5243]">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>3段階連動推論</span>
            </span>
          </div>

          <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            選択条件に応じて、病態の推論根拠・不足している情報・学習用の配穴例がリアルタイムに更新されます。
          </p>
        </div>

        {/* 3段階セレクターエリア */}
        <div className="space-y-6 sm:space-y-8">
          {/* STEP 1: 八綱弁証 */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                  八綱弁証（深浅・冷熱・邪正の勢い）
                </h3>
              </div>
              <Link
                href="/curriculum/lecture-pathomechanism-1"
                className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
                title="病因・病機：病機とは何か（八綱・病理の整理）"
              >
                <span>八綱・病機の解説講義を読む</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* ① 深浅: 表 vs 裏 */}
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2">
                <span className="text-xs sm:text-sm font-bold text-[#404743] dark:text-[#C5D2DB] block">
                  ① 病位の深浅（表裏）
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {DEPTH_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleUpdate({ depth: opt.value })}
                      className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        depth === opt.value
                          ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                          : "bg-[#FFFFFF] dark:bg-[#17212A] text-[#333835] dark:text-[#C5D2DB] border-[#D5CCBC] dark:border-[#2D3E50] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B36]"
                      }`}
                    >
                      <div className="text-sm sm:text-base font-bold">{opt.label}</div>
                      <div className={`text-xs sm:text-sm mt-0.5 leading-normal ${
                        depth === opt.value ? "text-white/85" : "text-[#737C77] dark:text-[#8899A6]"
                      }`}>
                        {opt.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ② 冷熱: 寒 vs 熱 */}
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2">
                <span className="text-xs sm:text-sm font-bold text-[#404743] dark:text-[#C5D2DB] block">
                  ② 病理の性質（寒熱）
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {TEMP_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleUpdate({ temp: opt.value })}
                      className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        temp === opt.value
                          ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                          : "bg-[#FFFFFF] dark:bg-[#17212A] text-[#333835] dark:text-[#C5D2DB] border-[#D5CCBC] dark:border-[#2D3E50] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B36]"
                      }`}
                    >
                      <div className="text-sm sm:text-base font-bold">{opt.label}</div>
                      <div className={`text-xs sm:text-sm mt-0.5 leading-normal ${
                        temp === opt.value ? "text-white/85" : "text-[#737C77] dark:text-[#8899A6]"
                      }`}>
                        {opt.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ③ 虚実: 虚 vs 実 */}
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2">
                <span className="text-xs sm:text-sm font-bold text-[#404743] dark:text-[#C5D2DB] block">
                  ③ 邪正の盛衰（虚実）
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {STATE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleUpdate({ state: opt.value })}
                      className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        state === opt.value
                          ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                          : "bg-[#FFFFFF] dark:bg-[#17212A] text-[#333835] dark:text-[#C5D2DB] border-[#D5CCBC] dark:border-[#2D3E50] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B36]"
                      }`}
                    >
                      <div className="text-sm sm:text-base font-bold">{opt.label}</div>
                      <div className={`text-xs sm:text-sm mt-0.5 leading-normal ${
                        state === opt.value ? "text-white/85" : "text-[#737C77] dark:text-[#8899A6]"
                      }`}>
                        {opt.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: 気血水弁証 */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                  気血水弁証（運動動態・代謝失調）
                </h3>
              </div>
              <Link
                href="/curriculum/lecture-qiblood-1"
                className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
                title="気血津液論：基本用語と役割"
              >
                <span>気血津液の基礎を学ぶ</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {QIXUESHUI_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleUpdate({ qixueshui: opt.value })}
                  className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    qixueshui === opt.value
                      ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                      : "bg-[#FAF8F5] dark:bg-[#121920] text-[#333835] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631]"
                  }`}
                >
                  <div className="text-sm sm:text-base font-bold">{opt.label}</div>
                  <div className={`text-xs sm:text-sm mt-0.5 leading-normal truncate ${
                    qixueshui === opt.value ? "text-white/85" : "text-[#737C77] dark:text-[#8899A6]"
                  }`}>
                    {opt.sub}
                  </div>
                </button>
              ))}
            </div>

            {/* 兼証（挟雑病態の併存・任意選択） */}
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#263542] space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-[#404743] dark:text-[#C5D2DB] flex items-center gap-1.5">
                  <span className="text-[#B86924] dark:text-[#E6C387]">＋</span>
                  <span>兼証（挟雑病態の併存）を考慮する</span>
                  <span className="text-[10px] font-normal text-[#737C77] dark:text-[#8899A6]">※任意（主病態と補助的な病態を区別）</span>
                </span>
                {secondaryQixueshui !== "none" && (
                  <button
                    type="button"
                    onClick={() => setSecondaryQixueshui("none")}
                    className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387] hover:underline cursor-pointer"
                  >
                    兼証を解除
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSecondaryQixueshui("none")}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    secondaryQixueshui === "none"
                      ? "bg-[#1E3D34] text-white border-[#1E3D34] dark:bg-[#2B6958]"
                      : "bg-white dark:bg-[#17212A] text-[#59615D] dark:text-[#A0B0BC] border-[#D5CCBC] dark:border-[#2D3E50] hover:bg-[#F2EDE4]"
                  }`}
                >
                  兼証なし（単一主証）
                </button>
                {QIXUESHUI_OPTIONS.filter((opt) => opt.value !== qixueshui).map((opt) => (
                  <button
                    key={`sec-${opt.value}`}
                    type="button"
                    onClick={() => setSecondaryQixueshui(opt.value)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      secondaryQixueshui === opt.value
                        ? "bg-[#B86924] text-white border-[#B86924] dark:bg-[#D48B47] shadow-xs"
                        : "bg-white dark:bg-[#17212A] text-[#59615D] dark:text-[#A0B0BC] border-[#D5CCBC] dark:border-[#2D3E50] hover:border-[#B86924]/60"
                    }`}
                  >
                    ＋ {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 3: 臓腑経絡弁証 */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                  臓腑経絡弁証（局在・病位）
                </h3>
              </div>
              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                不調がどの臓腑系統に波及しているか
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {ZANGFU_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleUpdate({ zangfu: opt.value })}
                  className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    zangfu === opt.value
                      ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] dark:border-[#2B6958] shadow-sm font-bold"
                      : "bg-[#FAF8F5] dark:bg-[#121920] text-[#333835] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631]"
                  }`}
                >
                  <div className="text-sm sm:text-base font-bold">{opt.label}</div>
                  <div className={`text-xs sm:text-sm mt-0.5 leading-normal truncate ${
                    zangfu === opt.value ? "text-white/85" : "text-[#737C77] dark:text-[#8899A6]"
                  }`}>
                    {opt.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 所見の照合と複合病態の学習 */}
            <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
              <button
                type="button"
                onClick={() => setIsComplexAccordionOpen(!isComplexAccordionOpen)}
                aria-expanded={isComplexAccordionOpen}
                aria-controls="complex-conditions-panel"
                className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] hover:bg-[#F2EDE4] dark:hover:bg-[#1A2530] transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                    <Scale className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                        💡 複雑な状態も試す（寒熱錯雑・虚実夾雑・四診の判断材料）
                      </span>
                      {complexState !== "none" && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#B86924] text-white">
                          併存モード適用中
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#737C77] dark:text-[#8899A6] mt-0.5">
                      二択では割り切れない「上熱下寒」「本虚標実」「四診キーサイン」を試したい方向けの拡張機能
                    </p>
                  </div>
                </div>
                <div className="text-[#737C77] dark:text-[#8899A6] ml-2 shrink-0">
                  {isComplexAccordionOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* アコーディオン展開部 */}
              {isComplexAccordionOpen && (
                <div id="complex-conditions-panel" className="mt-3 p-4 sm:p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] space-y-5 animate-fadeIn">
                  {/* 併存病態の選択 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                        <span>併存病態（八綱の二択を超えた臨床像）:</span>
                      </span>
                      {complexState !== "none" && (
                        <button
                          onClick={() => handleUpdate({ complexState: "none" })}
                          className="text-xs text-[#B86924] dark:text-[#E6C387] font-semibold hover:underline cursor-pointer"
                        >
                          標準（二択モード）に戻す ↺
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {COMPLEX_STATE_OPTIONS.map((cOpt) => (
                        <button
                          key={cOpt.value}
                          onClick={() => handleUpdate({ complexState: cOpt.value })}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            complexState === cOpt.value
                              ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white border-[#1E3D34] shadow-sm font-bold"
                              : "bg-white dark:bg-[#17212A] text-[#333835] dark:text-[#C5D2DB] border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#F2EDE4] dark:hover:bg-[#1E2B36]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold">{cOpt.label}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              complexState === cOpt.value ? "bg-white/20 text-white" : "bg-[#FAF8F5] dark:bg-[#121920] text-[#737C77] dark:text-[#8899A6]"
                            }`}>
                              {cOpt.category}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 leading-relaxed ${
                            complexState === cOpt.value ? "text-white/85" : "text-[#737C77] dark:text-[#8899A6]"
                          }`}>
                            {cOpt.summary}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 四診の重要キーサイン */}
                  <div className="space-y-3 pt-3 border-t border-[#E8E1D1] dark:border-[#263542]">
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                        <Stethoscope className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                        <span>四診の判断材料（症例サンプルの設定・キーサイン）:</span>
                      </span>
                      <p className="text-xs text-[#737C77] dark:text-[#8899A6] mt-0.5">
                        四診をまとめて照合します。寒熱・虚実の選択条件は自動で上書きしません。
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      {/* 按診 */}
                      <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                        <span className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB] block">
                          ① 押圧反応（按診）
                        </span>
                        <div className="space-y-1">
                          {PALPATION_OPTIONS.map((p) => (
                            <button
                              key={p.value}
                              onClick={() => handleFourExamChange("palpation", p.value)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                fourExams.palpation === p.value
                                  ? "bg-[#1E3D34] text-white font-bold"
                                  : "hover:bg-[#FAF8F5] dark:hover:bg-[#121920] text-[#404743] dark:text-[#C5D2DB]"
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 温冷 */}
                      <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                        <span className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB] block">
                          ② 温冷反応（問診）
                        </span>
                        <div className="space-y-1">
                          {TEMP_REACTION_OPTIONS.map((t) => (
                            <button
                              key={t.value}
                              onClick={() => handleFourExamChange("tempReaction", t.value)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                fourExams.tempReaction === t.value
                                  ? "bg-[#1E3D34] text-white font-bold"
                                  : "hover:bg-[#FAF8F5] dark:hover:bg-[#121920] text-[#404743] dark:text-[#C5D2DB]"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 飲水 */}
                      <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                        <span className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB] block">
                          ③ 飲水傾向（問診）
                        </span>
                        <div className="space-y-1">
                          {DRINKING_OPTIONS.map((d) => (
                            <button
                              key={d.value}
                              onClick={() => handleFourExamChange("drinking", d.value)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                fourExams.drinking === d.value
                                  ? "bg-[#1E3D34] text-white font-bold"
                                  : "hover:bg-[#FAF8F5] dark:hover:bg-[#121920] text-[#404743] dark:text-[#C5D2DB]"
                              }`}
                            >
                              {d.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 舌診 */}
                      <div className="bg-white dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                        <span className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB] block">
                          ④ 舌色・舌苔（望診）
                        </span>
                        <div className="space-y-1">
                          {TONGUE_OPTIONS.map((tg) => (
                            <button
                              key={tg.value}
                              onClick={() => handleFourExamChange("tongue", tg.value)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                fourExams.tongue === tg.value
                                  ? "bg-[#1E3D34] text-white font-bold"
                                  : "hover:bg-[#FAF8F5] dark:hover:bg-[#121920] text-[#404743] dark:text-[#C5D2DB]"
                              }`}
                            >
                              {tg.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </div>

        {/* 選択状態パンくずバー ＆ 結果ジャンプボタン */}
        <div className="bg-[#EBF3EF] dark:bg-[#14231E] p-3 sm:p-4 rounded-xl border border-[#C5DED4] dark:border-[#234237] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">選択中:</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-[#17212A] border border-[#C5DED4] dark:border-[#2A3B4A] font-medium">
              八綱：{depth === "interior" ? "裏" : "表"}・{temp === "heat" ? "熱" : "寒"}・{state === "excess" ? "実" : "虚"}
            </span>
            <span className="text-[#8899A6]">➜</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-[#17212A] border border-[#C5DED4] dark:border-[#2A3B4A] font-medium">
              気血水：{QIXUESHUI_OPTIONS.find((q) => q.value === qixueshui)?.label.split("（")[0]}
            </span>
            <span className="text-[#8899A6]">➜</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-[#17212A] border border-[#C5DED4] dark:border-[#2A3B4A] font-medium">
              臓腑：{ZANGFU_OPTIONS.find((z) => z.value === zangfu)?.label.split("（")[0]}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href="#simulator-result"
              className="inline-flex items-center gap-1 font-bold text-white bg-[#1E3D34] dark:bg-[#2B6958] hover:opacity-90 px-3 py-1.5 rounded-lg shadow-xs transition-all text-xs"
            >
              <span>▼ 結果を見る</span>
            </a>

            <button
              onClick={handleReset}
              className="text-xs text-[#59615D] dark:text-[#96A6B2] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>リセット</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. 診断推論結果表示エリア（概要 ＋ 4分割折りたたみ）          */}
      {/* ============================================================ */}
      <div 
        id="simulator-result" 
        className={`scroll-mt-24 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border-2 p-4 sm:p-8 shadow-xl space-y-6 sm:space-y-8 animate-fadeIn transition-colors ${
          diagnosis.status === "conflict"
            ? "border-[#A83629] dark:border-[#C47A72]"
            : diagnosis.status === "suspected"
            ? "border-[#B86924] dark:border-[#E6C387]"
            : "border-[#1E3D34] dark:border-[#3A6B5B]"
        }`}
      >
        {/* 条件変更時の差分通知バナー（変更時のみ1〜2行で簡潔表示） */}
        {changeNotice && (
          <div className="p-3 sm:p-4 rounded-xl bg-[#FCF4EB] dark:bg-[#261E16] border border-[#F2D7B3] dark:border-[#4D331F] flex items-start gap-2.5 text-xs sm:text-sm text-[#404743] dark:text-[#E6EFEA] animate-fadeIn">
            <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-[#B86924] dark:text-[#E6C387] mr-1.5 font-bold">今回変わったこと:</strong>
              <span>{changeNotice}</span>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 【概要エリア（ファーストビュー）】                              */}
        {/* ------------------------------------------------------------ */}
        <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider">
                推論結果
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                diagnosis.status === "conflict"
                  ? "bg-[#FDEDEC] dark:bg-[#2A1615] text-[#A83629] dark:text-[#E07971] border border-[#F5C6CB] dark:border-[#52211F]"
                  : diagnosis.status === "suspected"
                  ? "bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] border border-[#F2D7B3] dark:border-[#4D331F]"
                  : "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] border border-[#C5DED4] dark:border-[#2A5243]"
              }`}>
                {diagnosis.statusBadge.label}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/simulator/compare"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#D5CCBC] dark:border-[#2D3E50] text-[#1E3D34] dark:text-[#74BA9E] hover:border-[#1E3D34] text-xs font-bold transition-all shadow-2xs"
                title="似た証や鑑別候補を横並びで比較する"
              >
                <Scale className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                <span>2案の比較鑑別へ</span>
                <ArrowRight className="w-3 h-3 text-[#59615D] dark:text-[#8899A6]" />
              </Link>
              <a
                href="#simulator-conditions"
                className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>条件を変える</span>
              </a>
            </div>
          </div>

          <div>
            <span className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">{diagnosis.syndromeReading}</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              {diagnosis.syndromeName}
            </h3>
          </div>

          {/* 病因病機講義への相互リンク */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] text-xs">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
              <span className="text-[#59615D] dark:text-[#A0B0BC]">
                この証の病因・病理機序を講義で確認：
              </span>
              <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                {relatedLectures.pathomechanism.chapter}「{relatedLectures.pathomechanism.title}」
              </span>
            </div>
            <Link
              href={`/curriculum/${relatedLectures.pathomechanism.id}`}
              onClick={() => {
                trackEvent("context_link_click", {
                  context_pair: "simulator",
                  destination_type: "curriculum",
                  placement: "simulator_result",
                });
              }}
              className="text-[#1E3D34] dark:text-[#74BA9E] font-bold hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>病機解説講義を読む</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 一文の証（重要ハイライト） */}
          <div className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-l-4 space-y-1.5 ${
            diagnosis.status === "conflict"
              ? "bg-[#FFF8F7] dark:bg-[#221616] border-[#A83629] dark:border-[#C47A72]"
              : diagnosis.status === "suspected"
              ? "bg-[#FFFAF5] dark:bg-[#221B16] border-[#B86924] dark:border-[#E6C387]"
              : "bg-[#FAF8F5] dark:bg-[#121920] border-[#1E3D34] dark:border-[#4E8C76]"
          }`}>
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block">
              一文の証
            </span>
            <p className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
              「{diagnosis.oneSentenceFormula}」
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
            {diagnosis.summary}
          </p>

          {/* 治法の要点（ファーストビュー） */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#EBF3EF] dark:bg-[#14231E] border border-[#C5DED4] dark:border-[#234237] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#1E3D34] dark:text-[#74BA9E]">
                  治則・治法
                </h4>
              </div>
              <Link
                href="/curriculum/lecture-treatment-1"
                className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
                title="治法論：証から治則・治法・配穴設計へ"
              >
                <span>治法論で学ぶ</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              <div className="bg-white dark:bg-[#17212A] p-3 rounded-lg border border-[#C5DED4] dark:border-[#2A3B4A]">
                <span className="font-bold text-[#737C77] dark:text-[#8899A6] block text-xs">治則:</span>
                <span className="font-bold text-[#232826] dark:text-[#FAF8F5] text-sm sm:text-base mt-0.5 block">
                  {diagnosis.treatmentPrinciple.rule}
                </span>
              </div>
              <div className="bg-white dark:bg-[#17212A] p-3 rounded-lg border border-[#C5DED4] dark:border-[#2A3B4A]">
                <span className="font-bold text-[#737C77] dark:text-[#8899A6] block text-xs">介入戦略:</span>
                <span className="text-[#404743] dark:text-[#C5D2DB] text-xs sm:text-sm mt-0.5 block leading-relaxed">
                  {diagnosis.treatmentPrinciple.strategy}
                </span>
              </div>
            </div>
          </div>

          {/* 代表配穴（ファーストビュー: 王道の主配穴ペア） */}
          {diagnosis.acupointOptions.length > 0 && (() => {
            const primaryOpt = diagnosis.acupointOptions[0];
            const pTsubo = TSUBOS.find((t) => t.id === primaryOpt.primaryAcupoint.id || t.code.toLowerCase() === primaryOpt.primaryAcupoint.id.toLowerCase());
            const sTsubo = TSUBOS.find((t) => t.id === primaryOpt.secondaryAcupoint.id || t.code.toLowerCase() === primaryOpt.secondaryAcupoint.id.toLowerCase());

            return (
              <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border-2 border-[#1E3D34] dark:border-[#4E8C76] p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E1D1] dark:border-[#22303D] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1E3D34] text-white">
                      代表配穴
                    </span>
                    <h5 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                      {primaryOpt.pairName}
                    </h5>
                  </div>
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    適応：{primaryOpt.indicationConditions}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 主穴 */}
                  <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#263542] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                        主穴
                      </span>
                      {pTsubo && (
                        <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8]">
                          {pTsubo.code}
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                        {primaryOpt.primaryAcupoint.name}
                      </span>
                      <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                        {primaryOpt.primaryAcupoint.meridian}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                      {primaryOpt.primaryAcupoint.role}
                    </p>
                    {pTsubo && (
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          onClick={() => void openAcupoint(pTsubo.id)}
                          className="text-xs text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>解剖・取穴法を見る</span>
                        </button>
                        <Link
                          href={`/tsubo/${pTsubo.code.toLowerCase()}`}
                          className="text-xs text-[#737C77] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] hover:underline flex items-center gap-0.5"
                        >
                          <span>経穴辞典 ➜</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* 配穴 */}
                  <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#263542] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387]">
                        配穴
                      </span>
                      {sTsubo && (
                        <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8]">
                          {sTsubo.code}
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                        {primaryOpt.secondaryAcupoint.name}
                      </span>
                      <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                        {primaryOpt.secondaryAcupoint.meridian}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                      {primaryOpt.secondaryAcupoint.role}
                    </p>
                    {sTsubo && (
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          onClick={() => void openAcupoint(sTsubo.id)}
                          className="text-xs text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>解剖・取穴法を見る</span>
                        </button>
                        <Link
                          href={`/tsubo/${sTsubo.code.toLowerCase()}`}
                          className="text-xs text-[#737C77] dark:text-[#8899A6] hover:text-[#B86924] dark:hover:text-[#E6C387] hover:underline flex items-center gap-0.5"
                        >
                          <span>経穴辞典 ➜</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs sm:text-sm">
                  <strong className="text-[#1E3D34] dark:text-[#74BA9E] mr-1.5 font-bold">🎯 この配穴で狙うこと:</strong>
                  <span className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">{primaryOpt.intendedEffect}</span>
                </div>

                {/* 兼証（随証病態）が選択されている場合の複合処方・比率表示 */}
                {secondaryQixueshui !== "none" && (() => {
                  const secConfig = SECONDARY_POINT_MAP[secondaryQixueshui];
                  if (!secConfig) return null;

                  return (
                    <div className="pt-3 border-t border-[#E8E1D1] dark:border-[#22303D] space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#B86924] text-white">
                            随証の配穴例
                          </span>
                          <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                            兼証：{secConfig.label} への補佐介入
                          </span>
                        </div>
                        <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                          採用の優先順位は、所見・緊急性・体力から検討
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#F2ECE0] dark:border-[#2A3B4A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                              {secConfig.pairName}（{secConfig.primary} ＋ {secConfig.secondary}）
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] font-mono font-bold">
                              {secConfig.role}
                            </span>
                          </div>
                          <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                            {secConfig.desc}
                          </p>
                        </div>
                        <span className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FCF4EB] dark:bg-[#221811] px-2.5 py-1 rounded-md shrink-0">
                          随証補佐
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {/* 配穴設計・臨床演習への導線 */}
                <div className="mt-3 min-w-0 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#F0F7F4] to-[#FAF8F5] dark:from-[#162720] dark:to-[#17212A] border border-[#74BA9E]/40 dark:border-[#2D5A46] flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-3 shadow-xs">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                      <SlidersHorizontal className="w-4 h-4 text-[#2D5A46] dark:text-[#74BA9E] shrink-0" />
                      <span>配穴設計・臨床演習で実践する</span>
                    </div>
                    <p className="text-xs text-[#525B56] dark:text-[#9AA8A1] mt-0.5 leading-relaxed">
                      この推奨配穴をもとに、自分で主穴・配穴を自由に組み立てて学習ノートに記録できます。
                    </p>
                  </div>
                  <div className="flex min-w-0 w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                    <button
                      type="button"
                      onClick={handleSaveToNoteDraft}
                      aria-label="この内容を臨床ノートに残す"
                      className="inline-flex min-h-11 min-w-0 w-full max-w-full items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1E3D34] hover:bg-[#2B5A46] text-white text-xs text-center font-bold shadow-sm transition-all sm:w-auto cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span className="min-w-0 whitespace-normal leading-relaxed">臨床ノートへ</span>
                    </button>
                    <Link
                      href="/practice/haiketsu"
                      aria-label="配穴練習を始める"
                      className="inline-flex min-h-11 min-w-0 w-full max-w-full items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2D5A46] hover:bg-[#1E3D34] text-white text-xs text-center font-bold shadow-sm transition-all sm:w-auto cursor-pointer"
                    >
                      <span className="min-w-0 whitespace-normal leading-relaxed">配穴を試す</span>
                      <span aria-hidden="true" className="shrink-0">➜</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 【詳しい説明エリア（4つの独立折りたたみアコーディオン）】       */}
        {/* ------------------------------------------------------------ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
              臨床推論を深掘りする（詳しい説明）
            </h4>
            <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
              各項目をクリックして展開
            </span>
          </div>

          {/* ① なぜこの候補と考えたか（支持所見 vs 矛盾所見） */}
          <div className="border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setIsReasonOpen(!isReasonOpen)}
              aria-expanded={isReasonOpen}
              aria-controls="panel-reason"
              className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <Layers className="w-4 h-4" />
                </span>
                <div>
                  <h5 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    ① なぜこの候補と考えたか
                  </h5>
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    選択条件と整合する典型所見、および矛盾する注意点
                  </p>
                </div>
              </div>
              <div className="text-[#737C77] dark:text-[#8899A6]">
                {isReasonOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {isReasonOpen && (
              <div id="panel-reason" className="p-4 sm:p-6 bg-white dark:bg-[#17212A] border-t border-[#E5DEC9] dark:border-[#2A3B4A] space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 支持する所見 */}
                  <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] space-y-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>この証で見られる典型的な所見</span>
                    </div>
                    <ul className="space-y-2 text-sm sm:text-base text-[#404743] dark:text-[#C5D2DB]">
                      {diagnosis.supportingFindings.map((finding, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold shrink-0 mt-0.5">✔</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 合わない所見・矛盾点 */}
                  <div className={`p-4 rounded-xl border space-y-2 ${
                    diagnosis.status === "conflict"
                      ? "bg-[#FFF8F7] dark:bg-[#201515] border-[#F5C6CB] dark:border-[#52211F]"
                      : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E5DEC9] dark:border-[#263542]"
                  }`}>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#A83629] dark:text-[#E07971]">
                      <AlertCircle className="w-4 h-4" />
                      <span>合わない所見・矛盾点</span>
                    </div>
                    <ul className="space-y-2 text-sm sm:text-base text-[#404743] dark:text-[#C5D2DB]">
                      {diagnosis.conflictingFindings.map((conflict, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-[#A83629] dark:text-[#E07971] font-bold shrink-0 mt-0.5">▲</span>
                          <span>{conflict}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ② ほかの候補・追加で確認したい所見 */}
          <div className="border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setIsDifferentialOpen(!isDifferentialOpen)}
              aria-expanded={isDifferentialOpen}
              aria-controls="panel-differential"
              className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387]">
                  <Stethoscope className="w-4 h-4" />
                </span>
                <div>
                  <h5 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    ② ほかの候補・追加で確認したい所見
                  </h5>
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    鑑別候補、確定診断に不足している情報、次に確認したい問診事項
                  </p>
                </div>
              </div>
              <div className="text-[#737C77] dark:text-[#8899A6]">
                {isDifferentialOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {isDifferentialOpen && (
              <div id="panel-differential" className="p-4 sm:p-6 bg-white dark:bg-[#17212A] border-t border-[#E5DEC9] dark:border-[#2A3B4A] space-y-5 animate-fadeIn">
                {/* 鑑別・考慮すべき候補 */}
                {diagnosis.differentialCandidates.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs sm:text-sm font-bold text-[#737C77] dark:text-[#8899A6] block">
                      鑑別を要する他の病態候補：
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {diagnosis.differentialCandidates.map((cand, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB] text-xs sm:text-sm font-medium">
                          {cand}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 不足している情報 */}
                <div className="space-y-2 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                  <span className="text-xs sm:text-sm font-bold text-[#737C77] dark:text-[#8899A6] block">
                    確定判断に不足している情報：
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {diagnosis.missingInformation.map((info, i) => (
                      <span key={i} className="text-xs sm:text-sm px-3 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#404743] dark:text-[#C5D2DB]">
                        ？ {info}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 次に確認する臨床質問 */}
                <div className="space-y-3 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                  <span className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                    患者に確認すべき問診・臨床所見：
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {diagnosis.nextActionQuestions.map((item, i) => (
                      <div key={i} className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] inline-block">
                          {item.target}
                        </span>
                        <p className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                          {item.question}
                        </p>
                        <p className="text-xs text-[#737C77] dark:text-[#8899A6] leading-relaxed">
                          💡 {item.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ③ 配穴を詳しく見る（主穴・配穴の理由、手技、代替案） */}
          <div className="border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setIsAcupointOpen(!isAcupointOpen)}
              aria-expanded={isAcupointOpen}
              aria-controls="panel-acupoints"
              className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                </span>
                <div>
                  <h5 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    ③ 配穴を詳しく見る
                  </h5>
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    王道ペアと別案ペアの比較、施術後の再評価ポイント
                  </p>
                </div>
              </div>
              <div className="text-[#737C77] dark:text-[#8899A6]">
                {isAcupointOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {isAcupointOpen && (
              <div id="panel-acupoints" className="p-4 sm:p-6 bg-white dark:bg-[#17212A] border-t border-[#E5DEC9] dark:border-[#2A3B4A] space-y-6 animate-fadeIn">
                <div className="space-y-4">
                  {diagnosis.acupointOptions.map((opt, idx) => {
                    const pTsubo = TSUBOS.find((t) => t.id === opt.primaryAcupoint.id || t.code.toLowerCase() === opt.primaryAcupoint.id.toLowerCase());
                    const sTsubo = TSUBOS.find((t) => t.id === opt.secondaryAcupoint.id || t.code.toLowerCase() === opt.secondaryAcupoint.id.toLowerCase());

                    return (
                      <div
                        key={idx}
                        className={`bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border p-4 sm:p-6 space-y-4 ${
                          opt.isPrimary
                            ? "border-[#1E3D34] dark:border-[#4E8C76]"
                            : "border-[#E5DEC9] dark:border-[#2A3B4A]"
                        }`}
                      >
                        {/* ペアヘッダー */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              opt.isPrimary
                                ? "bg-[#1E3D34] text-white"
                                : "bg-[#FAF8F5] dark:bg-[#17212A] text-[#B86924] dark:text-[#E6C387] border border-[#B86924]/30"
                            }`}>
                              {opt.isPrimary ? "主配穴" : "代替候補"}
                            </span>
                            <h5 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                              {opt.pairName}
                            </h5>
                          </div>

                          <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                            適応条件：{opt.indicationConditions}
                          </span>
                        </div>

                        {/* 2つのツボのカード */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* 主穴 */}
                          <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#263542] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                                主穴
                              </span>
                              {pTsubo && (
                                <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8]">
                                  {pTsubo.code}
                                </span>
                              )}
                            </div>
                            <div className="flex items-baseline justify-between">
                              <span className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                                {opt.primaryAcupoint.name}
                              </span>
                              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                                {opt.primaryAcupoint.meridian}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                              {opt.primaryAcupoint.role}
                            </p>
                            {pTsubo && (
                              <div className="flex items-center gap-3 pt-1">
                                <button
                                  onClick={() => void openAcupoint(pTsubo.id)}
                                  className="text-xs text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>解剖・取穴法を見る</span>
                                </button>
                                <Link
                                  href={`/tsubo/${pTsubo.code.toLowerCase()}`}
                                  className="text-xs text-[#737C77] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] hover:underline"
                                >
                                  経穴辞典 ➜
                                </Link>
                              </div>
                            )}
                          </div>

                          {/* 配穴 */}
                          <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#263542] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387]">
                                配穴
                              </span>
                              {sTsubo && (
                                <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8]">
                                  {sTsubo.code}
                                </span>
                              )}
                            </div>
                            <div className="flex items-baseline justify-between">
                              <span className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                                {opt.secondaryAcupoint.name}
                              </span>
                              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                                {opt.secondaryAcupoint.meridian}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                              {opt.secondaryAcupoint.role}
                            </p>
                            {sTsubo && (
                              <div className="flex items-center gap-3 pt-1">
                                <button
                                  onClick={() => void openAcupoint(sTsubo.id)}
                                  className="text-xs text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>解剖・取穴法を見る</span>
                                </button>
                                <Link
                                  href={`/tsubo/${sTsubo.code.toLowerCase()}`}
                                  className="text-xs text-[#737C77] dark:text-[#8899A6] hover:text-[#B86924] dark:hover:text-[#E6C387] hover:underline"
                                >
                                  経穴辞典 ➜
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 比較検討の項目 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                          <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
                            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block text-xs">
                              🎯 この配穴で狙うこと:
                            </span>
                            <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                              {opt.intendedEffect}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
                            <span className="font-bold text-[#B86924] dark:text-[#E6C387] block text-xs">
                              ⚖️ 別の候補との違い:
                            </span>
                            <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                              {opt.differentialReason}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1 sm:col-span-2">
                            <span className="font-bold text-[#737C77] dark:text-[#8899A6] block text-xs">
                              🔄 施術後の再評価で確認すること:
                            </span>
                            <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                              {opt.reassessmentPoint}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 配穴設計理論への立ち戻りリンク */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                    <span className="text-[#59615D] dark:text-[#A0B0BC]">配穴の論理的根拠を深める：</span>
                    <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                      治法論 レッスン8「経絡・経穴を選択する（局所遠隔・要穴の配穴設計）」
                    </span>
                  </div>
                  <Link
                    href="/curriculum/lecture-treatment-8"
                    onClick={() => {
                      trackEvent("context_link_click", {
                        context_pair: "simulator",
                        destination_type: "curriculum",
                        placement: "acupoint_panel",
                      });
                    }}
                    className="text-[#1E3D34] dark:text-[#74BA9E] font-bold hover:underline inline-flex items-center gap-1 shrink-0"
                  >
                    <span>配穴理論講義へ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ④ 出典・研究の説明 */}
          <div className="border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setIsEvidenceOpen(!isEvidenceOpen)}
              aria-expanded={isEvidenceOpen}
              aria-controls="panel-evidence"
              className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#F2EDE4] dark:hover:bg-[#1B2631] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <GraduationCap className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                </span>
                <div>
                  <h5 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    ④ 出典・研究の説明
                  </h5>
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    古典伝統理論、現代医科学研究、WHO標準中医学用語リファレンス
                  </p>
                </div>
              </div>
              <div className="text-[#737C77] dark:text-[#8899A6]">
                {isEvidenceOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {isEvidenceOpen && (
              <div id="panel-evidence" className="p-4 sm:p-6 bg-white dark:bg-[#17212A] border-t border-[#E5DEC9] dark:border-[#2A3B4A] space-y-4 animate-fadeIn">
                {/* エビデンス多層区分 */}
                {diagnosis.acupointOptions[0] && (
                  <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2 text-xs sm:text-sm">
                    <span className="font-bold text-[#737C77] dark:text-[#8899A6] block uppercase tracking-wider text-xs">
                      根拠の多層区分:
                    </span>
                    <div className="space-y-2 text-[#404743] dark:text-[#C5D2DB]">
                      <p className="leading-relaxed">
                        <strong className="text-[#1E3D34] dark:text-[#83BEA8]">🏛️ 古典・伝統理論</strong>：{diagnosis.acupointOptions[0].evidenceLevel.classical}
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-[#1E2D3D] dark:text-[#7BAAD8]">🔬 現代研究との区別・限界</strong>：{diagnosis.acupointOptions[0].evidenceLevel.modernResearch}
                      </p>
                      <p className="leading-relaxed">
                        <strong className="text-[#B86924] dark:text-[#E6C387]">💡 著者の臨床的見解・注意事項</strong>：{diagnosis.acupointOptions[0].evidenceLevel.clinicalPerspective}
                      </p>
                    </div>
                  </div>
                )}

                {/* 学術リファレンス ＆ 用語標準化基準 */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#22303D] space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                    <h6 className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                      {ACADEMIC_STANDARDS.title}
                    </h6>
                  </div>
                  <p className="text-[#59615D] dark:text-[#96A6B2] text-xs leading-relaxed">
                    {ACADEMIC_STANDARDS.description}
                  </p>
                  <p className="text-xs leading-relaxed"><a className="underline" href="https://www.who.int/publications/i/item/9290611057" target="_blank" rel="noopener noreferrer">WHO：経穴名称</a> ／ <a className="underline" href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener noreferrer">NCCIH：鍼の研究と限界</a></p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-[#737C77] dark:text-[#8899A6]">
                    <div>
                      <strong className="block text-[#404743] dark:text-[#C5D2DB]">国際標準用語基準:</strong>
                      <span>{ACADEMIC_STANDARDS.whoReference}</span>
                    </div>
                    <div>
                      <strong className="block text-[#404743] dark:text-[#C5D2DB]">日本標準教科書・古典:</strong>
                      <span>{ACADEMIC_STANDARDS.textbookReference} / {ACADEMIC_STANDARDS.classics}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. 経穴詳細パネル（PC: Split View サイドパネル / スマホ: ボトムシート） */}
      {/* ============================================================ */}
      {modalTsubo && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* モバイル用背景オーバーレイ（PCでは非表示にして背後のシミュレーター操作を可能に） */}
          <div
            onClick={() => setModalTsubo(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200 pointer-events-auto lg:hidden"
            aria-hidden="true"
          />

          {/* パネル本体:
              - モバイル: 画面下部からせり上がるボトムシート (inset-x-0 bottom-0 rounded-t-3xl max-h-[85vh])
              - PC(lg以上): 右側に固定されるSplit Viewサイドパネル (top-16 right-0 bottom-0 w-[440px] max-w-[45vw] lg:max-h-full)
          */}
          <aside
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-0 inset-x-0 max-h-[85vh] lg:top-16 lg:bottom-0 lg:left-auto lg:right-0 lg:w-[440px] lg:max-w-[45vw] lg:max-h-full bg-[#FAF8F5] dark:bg-[#17212A] shadow-2xl border-t lg:border-t-0 lg:border-l border-[#E5DEC9] dark:border-[#2A3B4A] rounded-t-3xl lg:rounded-none z-50 flex flex-col pointer-events-auto transition-transform duration-300 ease-out"
            role="dialog"
            aria-modal="false"
            aria-label={`${modalTsubo.name}の詳細情報`}
          >
            {/* モバイル向けドラッグ・グラブバー */}
            <div className="flex justify-center pt-3 pb-1 lg:hidden">
              <div className="w-10 h-1.5 rounded-full bg-[#D1C7B7] dark:bg-[#344655]" />
            </div>

            {/* パネル上部ステータスバナー（PC専用：Split View案内） */}
            <div className="hidden lg:flex items-center justify-between px-6 py-2.5 bg-[#EBF3EF] dark:bg-[#162A24] border-b border-[#C5DED4] dark:border-[#24473A] text-xs text-[#1E3D34] dark:text-[#83BEA8]">
              <span className="font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E] animate-pulse" />
                <span>経穴 Split View（左側も操作可能）</span>
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1C2C26] border border-[#C5DED4] dark:border-[#2A5243] text-[10px] font-mono">
                ESC で閉じる
              </kbd>
            </div>

            {/* パネルヘッダー */}
            <div className="p-5 sm:p-6 border-b border-[#E8E1D1] dark:border-[#22303D] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                    {modalTsubo.code}
                  </span>
                  <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                    {modalTsubo.meridian}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {modalTsubo.name}
                  </h3>
                  <span className="text-sm text-[#59615D] dark:text-[#96A6B2]">（{modalTsubo.kana}）</span>
                </div>
              </div>
              <button
                onClick={() => setModalTsubo(null)}
                className="p-1.5 rounded-lg hover:bg-[#EAE3D4] dark:hover:bg-[#22303D] text-[#59615D] dark:text-[#96A6B2] transition-colors cursor-pointer"
                title="閉じる (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* パネルコンテンツ（スクロール可能） */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              {/* 取穴法（一般 ＆ 骨度法） */}
              <div className="space-y-3">
                <div className="bg-white dark:bg-[#121920] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#263542]">
                  <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block mb-1">
                    【一般向け】わかりやすい取穴法
                  </span>
                  <p className="text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
                    {modalTsubo.locationSimple}
                  </p>
                </div>

                <div className="bg-white dark:bg-[#121920] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#263542]">
                  <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] uppercase tracking-wider block mb-1">
                    【専門家向け】解剖学・骨度法取穴（WHO標準）
                  </span>
                  <p className="text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed font-mono">
                    {modalTsubo.locationDetail}
                  </p>
                </div>
              </div>

              {/* 臨床知見 */}
              <div className="bg-[#EBF3EF] dark:bg-[#162A24] p-4 rounded-xl border border-[#C5DED4] dark:border-[#2A5243]">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                  <span>臨床知見・配穴の極意</span>
                </span>
                <p className="text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
                  {modalTsubo.clinicalNote}
                </p>
              </div>
            </div>

            {/* パネルフッター */}
            <div className="p-4 sm:p-5 border-t border-[#E8E1D1] dark:border-[#22303D] bg-[#F2EDE4]/60 dark:bg-[#141C24]/60 flex items-center justify-between gap-3">
              <Link
                href={`/tsubo/${modalTsubo.code.toLowerCase()}`}
                onClick={() => setModalTsubo(null)}
                className="text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
              >
                <span>十四経脈辞典で詳しく見る ➜</span>
              </Link>

              <button
                onClick={() => setModalTsubo(null)}
                className="px-5 py-2 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs sm:text-sm font-semibold hover:bg-[#162E27] dark:hover:bg-[#225345] transition-all cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
