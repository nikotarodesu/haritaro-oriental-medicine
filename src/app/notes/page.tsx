"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { 
  Bookmark, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  Upload, 
  Crown, 
  AlertCircle, 
  Sparkles, 
  X, 
  Calendar, 
  User, 
  FileText, 
  QrCode, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Eye,
  Info
} from "lucide-react";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { useAuth } from "@/contexts/AuthContext";
import { ClinicalMemoItem, PatientNoteItem, SAMPLE_PATIENT_NOTES } from "@/types/clinicalMemo";
import GogyoBadge from "@/components/GogyoBadge";

const CONSTITUTION_TAGS = [
  "気虚（元気不足）",
  "気滞（ストレス・滞り）",
  "血虚（栄養・血流不足）",
  "瘀血（血の滞り・血行不良）",
  "水滞（むくみ・湿気）",
  "陽虚（冷え・代謝低下）",
  "陰虚（潤い不足・ほてり）",
  "肝気鬱結",
  "脾胃虚弱",
  "腎虚"
];

export default function MyNotesPage() {
  const { isPremium } = useAuth();
  const {
    memos,
    clipCount,
    maxLimit,
    removeMemo,
    updatePersonalNote,
    loadRecommendedPresets,
    patientNotes,
    patientNoteCount,
    maxPatientNoteLimit,
    isPatientNoteLimitReached,
    addPatientNote,
    updatePatientNote,
    removePatientNote,
    exportAllDataAsJson,
    importDataFromJson,
    addMemo,
  } = useClinicalMemo();

  // タブ状態: "notes" (臨床ノート) | "stock" (配穴集)
  const [activeTab, setActiveTab] = useState<"notes" | "stock">("notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // サンプル見本プレビューモーダル（保存枠を消費しないプレビュー専用）
  const [isSamplePreviewOpen, setIsSamplePreviewOpen] = useState(false);
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);

  // 待合室用案内用紙POPモーダル
  const [isPopModalOpen, setIsPopModalOpen] = useState(false);

  // 臨床ノート新規・編集モーダル
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [patientIdentifier, setPatientIdentifier] = useState("");
  const [gender, setGender] = useState<"男性" | "女性" | "その他" | "未回答" | "">("");
  const [ageGroup, setAgeGroup] = useState("");
  const [visitDate, setVisitDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [constitution, setConstitution] = useState("");
  const [syndrome, setSyndrome] = useState("");
  const [selectedPointsInput, setSelectedPointsInput] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [patientReaction, setPatientReaction] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // 配穴ピッカーモーダル（フォーム入力中に配穴集から選ぶ）
  const [isPointPickerOpen, setIsPointPickerOpen] = useState(false);

  // 自作配穴追加モーダル
  const [isCustomStockModalOpen, setIsCustomStockModalOpen] = useState(false);
  const [customStockTitle, setCustomStockTitle] = useState("");
  const [customStockPoints, setCustomStockPoints] = useState("");
  const [customStockElement, setCustomStockElement] = useState<"木" | "火" | "土" | "金" | "水">("木");
  const [customStockSummary, setCustomStockSummary] = useState("");
  const [customStockNote, setCustomStockNote] = useState("");

  // 患者向け養生シート印刷モーダル
  const [printNote, setPrintNote] = useState<PatientNoteItem | null>(null);

  // ファイルインポート用ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 診断結果等からのURLクエリパラメータ引き継ぎ ＆ 見本パラメータ検知
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);

    // 見本表示パラメータ
    if (params.get("view") === "sample" || params.get("sample") === "1") {
      setIsSamplePreviewOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    // 新規作成パラメータ（体質診断からの引き継ぎ）
    const shouldCreate = params.get("new");
    if (shouldCreate === "1" || shouldCreate === "true") {
      const initConstitution = params.get("constitution") || "";
      const initPoints = params.get("points") || "";
      const initComplaint = params.get("complaint") || "";
      const initSyndrome = params.get("syndrome") || "";

      setEditingNoteId(null);
      setPatientIdentifier(`PT-${String(patientNotes.length + 1).padStart(3, "0")}`);
      setGender("");
      setAgeGroup("");
      setVisitDate(new Date().toISOString().split("T")[0]);
      setChiefComplaint(initComplaint);
      setConstitution(initConstitution);
      setSyndrome(initSyndrome);
      setSelectedPointsInput(initPoints.replace(/,/g, "、 "));
      setTreatmentPlan("");
      setPatientReaction("");
      setNextAction("");
      setFormError(null);
      setIsNoteModalOpen(true);
      setActiveTab("notes");

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [patientNotes.length]);

  // 臨床ノートの検索フィルタリング
  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return patientNotes;
    return patientNotes.filter(n =>
      n.patientIdentifier.toLowerCase().includes(q) ||
      n.chiefComplaint.toLowerCase().includes(q) ||
      (n.constitution && n.constitution.toLowerCase().includes(q)) ||
      (n.syndrome && n.syndrome.toLowerCase().includes(q)) ||
      n.selectedPoints.some(p => p.toLowerCase().includes(q))
    );
  }, [patientNotes, searchQuery]);

  // 配穴集のフィルタリング
  const filteredMemos = useMemo(() => {
    return memos.filter(item => {
      const matchTag = selectedTag === "all" || item.elements.includes(selectedTag as any);
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.subTitle && item.subTitle.toLowerCase().includes(q)) ||
        item.points.some(p => p.toLowerCase().includes(q)) ||
        item.indications.some(i => i.toLowerCase().includes(q)) ||
        item.summary.toLowerCase().includes(q);
      return matchTag && matchQuery;
    });
  }, [memos, selectedTag, searchQuery]);

  // モーダルを開く（新規）
  const openNewNoteModal = () => {
    if (isPatientNoteLimitReached) {
      alert(`保存上限（${maxPatientNoteLimit}件）に達しています。不要な記録を整理するか、プレミアムプランをご検討ください。`);
      return;
    }
    setEditingNoteId(null);
    setPatientIdentifier(`PT-${String(patientNotes.length + 1).padStart(3, "0")}`);
    setGender("");
    setAgeGroup("");
    setVisitDate(new Date().toISOString().split("T")[0]);
    setChiefComplaint("");
    setConstitution("");
    setSyndrome("");
    setSelectedPointsInput("");
    setTreatmentPlan("");
    setPatientReaction("");
    setNextAction("");
    setFormError(null);
    setIsNoteModalOpen(true);
  };

  // モーダルを開く（見本から新規作成へ）
  const openCreateFromSample = (sample: PatientNoteItem) => {
    if (isPatientNoteLimitReached) {
      alert(`保存上限（${maxPatientNoteLimit}件）に達しています。`);
      return;
    }
    setIsSamplePreviewOpen(false);
    setEditingNoteId(null);
    setPatientIdentifier(`PT-${String(patientNotes.length + 1).padStart(3, "0")}`);
    setGender(sample.gender || "");
    setAgeGroup(sample.ageGroup || "");
    setVisitDate(new Date().toISOString().split("T")[0]);
    setChiefComplaint(sample.chiefComplaint);
    setConstitution(sample.constitution || "");
    setSyndrome(sample.syndrome || "");
    setSelectedPointsInput(sample.selectedPoints.join("、 "));
    setTreatmentPlan(sample.treatmentPlan || "");
    setPatientReaction("");
    setNextAction(sample.nextAction || "");
    setFormError(null);
    setIsNoteModalOpen(true);
  };

  // モーダルを開く（編集）
  const openEditNoteModal = (note: PatientNoteItem) => {
    setEditingNoteId(note.id);
    setPatientIdentifier(note.patientIdentifier);
    setGender(note.gender || "");
    setAgeGroup(note.ageGroup || "");
    setVisitDate(note.visitDate);
    setChiefComplaint(note.chiefComplaint);
    setConstitution(note.constitution || "");
    setSyndrome(note.syndrome || "");
    setSelectedPointsInput(note.selectedPoints.join("、 "));
    setTreatmentPlan(note.treatmentPlan || "");
    setPatientReaction(note.patientReaction || "");
    setNextAction(note.nextAction || "");
    setFormError(null);
    setIsNoteModalOpen(true);
  };

  // 臨床ノート保存
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientIdentifier.trim()) {
      setFormError("患者識別（IDまたはイニシャル）を入力してください");
      return;
    }
    if (!chiefComplaint.trim()) {
      setFormError("主訴・お悩みを入力してください");
      return;
    }

    const pointsArray = selectedPointsInput
      .split(/[,、\s]+/)
      .map(p => p.trim())
      .filter(Boolean);

    const notePayload = {
      patientIdentifier: patientIdentifier.trim(),
      gender: gender ? (gender as any) : undefined,
      ageGroup: ageGroup.trim() || undefined,
      visitDate,
      chiefComplaint: chiefComplaint.trim(),
      constitution: constitution.trim(),
      syndrome: syndrome.trim(),
      selectedPoints: pointsArray,
      treatmentPlan: treatmentPlan.trim(),
      patientReaction: patientReaction.trim(),
      nextAction: nextAction.trim(),
    };

    if (editingNoteId) {
      updatePatientNote(editingNoteId, notePayload);
    } else {
      const success = addPatientNote(notePayload);
      if (!success) {
        setFormError(`保存上限（${maxPatientNoteLimit}件）に達しているため保存できませんでした。`);
        return;
      }
    }

    setIsNoteModalOpen(false);
  };

  // 自作配穴の保存
  const handleSaveCustomStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customStockTitle.trim() || !customStockPoints.trim()) {
      alert("配穴の名称と構成ツボを入力してください");
      return;
    }

    const pointsArr = customStockPoints.split(/[,、\s]+/).map(p => p.trim()).filter(Boolean);
    addMemo({
      id: `custom-${Date.now()}`,
      type: "custom",
      title: customStockTitle.trim(),
      subTitle: "自作配穴処方",
      points: pointsArr,
      elements: [customStockElement],
      indications: ["臨床自作処方"],
      summary: customStockSummary.trim() || "独自に考案・保存した臨床配穴処方です。",
      personalNotes: customStockNote.trim() || undefined,
    });

    setCustomStockTitle("");
    setCustomStockPoints("");
    setCustomStockSummary("");
    setCustomStockNote("");
    setIsCustomStockModalOpen(false);
  };

  // ファイルバックアップのダウンロード
  const handleDownloadBackup = () => {
    const jsonStr = exportAllDataAsJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `haritaro_mynote_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ファイル復元
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.confirm("バックアップファイルを読み込みますか？既存のデータがファイルの内容に更新されます。")) {
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importDataFromJson(content);
        if (!result.success) {
          alert(result.message);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // 配穴ピッカーからツボを選択してフォームに反映
  const handlePickPoint = (pointName: string) => {
    const current = selectedPointsInput.trim();
    if (!current) {
      setSelectedPointsInput(pointName);
    } else {
      const points = current.split(/[,、\s]+/).map(p => p.trim()).filter(Boolean);
      if (!points.includes(pointName)) {
        setSelectedPointsInput(`${current}、 ${pointName}`);
      }
    }
  };

  const currentSample = SAMPLE_PATIENT_NOTES[selectedSampleIndex] || SAMPLE_PATIENT_NOTES[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-[#232826] dark:text-[#FAF8F5]">
      
      {/* ======================================================== */}
      {/* 1. ページヘッダー（初回 / 継続で表示を調整） */}
      {/* ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D1] dark:border-[#22303D] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              マイノート
            </h1>
          </div>
          <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] mt-1">
            弁証・配穴・施術後の変化をまとめて、日々の臨床に生かす。
          </p>
        </div>

        {/* 右側：補助アクション（ファイル保存・読込） */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDownloadBackup}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-[#D8CFC0] dark:border-[#384C5E] text-[#404743] dark:text-[#C5D2DB] bg-white dark:bg-[#1A2530] hover:bg-[#F3EFE6] dark:hover:bg-[#22303D] transition-colors"
            title="手元にファイルとしてバックアップ保存"
          >
            <Download className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>記録をファイルに保存</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-[#D8CFC0] dark:border-[#384C5E] text-[#404743] dark:text-[#C5D2DB] bg-white dark:bg-[#1A2530] hover:bg-[#F3EFE6] dark:hover:bg-[#22303D] transition-colors"
            title="ファイルからバックアップを読み込む"
          >
            <Upload className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>ファイルから読み込む</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />
        </div>
      </div>

      {/* 保存についての短い常時案内 */}
      <div className="p-3.5 rounded-xl bg-[#FCF4EB] dark:bg-[#221811] border border-[#F3DEC5] dark:border-[#4A321E] flex items-center justify-between gap-3 text-xs text-[#7A4515] dark:text-[#ECC99B]">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#B86924] dark:text-[#E6C387]" />
          <span>
            記録は、この端末・ブラウザに保存されます。別の端末には自動で同期されません。定期的にバックアップしてください。
          </span>
        </div>
        {!isPremium && (
          <Link
            href="/pricing"
            className="font-bold underline text-[#B86924] dark:text-[#E6C387] shrink-0 hover:opacity-80"
          >
            保存枠の料金を見る →
          </Link>
        )}
      </div>

      {/* 無料枠上限到達時の案内 */}
      {isPatientNoteLimitReached && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
            <span>無料枠の保存上限（{maxPatientNoteLimit}件）に達しています</span>
          </p>
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            新しい記録を追加するには、不要になった既存ノートを削除するか、最大500件まで保存できる
            <Link href="/pricing" className="underline font-bold mx-1">
              プレミアムプラン
            </Link>
            をご検討ください。
          </p>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. タブ切り替え（臨床ノート / 配穴集） */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("notes")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "notes"
                  ? "bg-[#1E3D34] text-white shadow-xs"
                  : "bg-white dark:bg-[#1A2530] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#EBF3EF]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>臨床ノート</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === "notes" ? "bg-white/20 text-white" : "bg-[#E8E1D1] dark:bg-[#263542] text-[#404743]"
              }`}>
                {patientNoteCount} / {maxPatientNoteLimit}件
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("stock")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "stock"
                  ? "bg-[#B86924] text-white shadow-xs"
                  : "bg-white dark:bg-[#1A2530] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FCF4EB]"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>配穴集</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === "stock" ? "bg-white/20 text-white" : "bg-[#E8E1D1] dark:bg-[#263542] text-[#404743]"
              }`}>
                {clipCount} / {maxLimit}件
              </span>
            </button>
          </div>

          {/* 新規作成ボタン */}
          <div className="flex items-center gap-2">
            {activeTab === "notes" ? (
              <button
                type="button"
                onClick={openNewNoteModal}
                disabled={isPatientNoteLimitReached}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#1E3D34] hover:bg-[#162D26] shadow-xs transition-all disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>臨床ノートを新規作成</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsCustomStockModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#B86924] hover:bg-[#975319] shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>自作の配穴を追加</span>
              </button>
            )}
          </div>
        </div>

        {/* 検索バー（データが存在する場合のみ表示） */}
        {((activeTab === "notes" && patientNotes.length > 0) ||
          (activeTab === "stock" && memos.length > 0)) && (
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737C77]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === "notes" ? "患者番号・主訴・経穴で検索..." : "配穴名・経穴・適応症で検索..."}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#D8CFC0] dark:border-[#384C5E] text-sm text-[#232826] dark:text-[#FAF8F5] focus:outline-hidden focus:border-[#1E3D34]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {activeTab === "stock" && (
              <div className="flex items-center gap-1">
                {["all", "木", "火", "土", "金", "水"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedTag === tag
                        ? "bg-[#B86924] text-white"
                        : "bg-white dark:bg-[#1A2530] text-[#737C77] border border-[#D8CFC0] dark:border-[#384C5E]"
                    }`}
                  >
                    {tag === "all" ? "すべて" : tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. タブ1: 臨床ノート一覧 */}
        {/* ======================================================== */}
        {activeTab === "notes" && (
          <div className="space-y-4">
            {filteredNotes.length === 0 ? (
              patientNotes.length === 0 ? (
                /* 初回0件時のわかりやすい案内カード（ボタンを1組に集約） */
                <div className="p-8 sm:p-12 text-center rounded-2xl border-2 border-[#1E3D34]/25 dark:border-[#74BA9E]/30 bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE6] dark:from-[#17212A] dark:to-[#121920] space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center mx-auto shadow-xs">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 max-w-md mx-auto">
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-[#232826] dark:text-[#FAF8F5]">
                      初めてマイノートをご利用の方へ
                    </h3>
                    <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                      臨床での弁証・配穴・施術の反応をすばやく記録。患者さんへ手渡す「養生シート」もワンクリックで作成できます。
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSamplePreviewOpen(true)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white dark:bg-[#1A2530] border-2 border-[#1E3D34] text-[#1E3D34] dark:text-[#74BA9E] text-sm font-bold shadow-xs hover:bg-[#EBF3EF] transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>完成したノートを見る（見本）</span>
                    </button>

                    <button
                      type="button"
                      onClick={openNewNoteModal}
                      disabled={isPatientNoteLimitReached}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                      <span>臨床ノートを新規作成</span>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-[#E8E1D1] dark:border-[#243340] text-[11px] text-[#737C77] dark:text-[#8899A6] space-y-1 max-w-md mx-auto">
                    <p>※ 無料枠として3件のノートと20件の配穴を保存可能。見本を見るだけで保存枠が減ることはありません。</p>
                    <p className="text-[#1E3D34] dark:text-[#74BA9E] font-medium">※ 記録はお使いの端末・ブラウザ内に保存されます。サーバーへ送信されないため安心です。</p>
                  </div>
                </div>
              ) : (
                /* 検索で見つからない場合 */
                <div className="p-8 sm:p-12 text-center rounded-2xl border-2 border-dashed border-[#D8CFC0] dark:border-[#2A3B4A] bg-white/40 dark:bg-[#141C24]/40 space-y-3">
                  <FileText className="w-10 h-10 text-[#737C77] mx-auto opacity-50" />
                  <h3 className="text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                    条件に一致する臨床ノートがありません
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#8899A6] max-w-md mx-auto">
                    検索キーワードを変更してお試しください。
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] hover:opacity-80"
                  >
                    検索条件をクリア
                  </button>
                </div>
              )
            ) : (
              <div className="space-y-3">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E8E1D1] dark:border-[#2A3B4A] shadow-xs hover:border-[#1E3D34]/50 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EBE0] dark:border-[#243340] pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-bold bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E]">
                          {note.patientIdentifier}
                        </span>
                        {(note.ageGroup || note.gender) && (
                          <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                            {[note.ageGroup, note.gender].filter(Boolean).join("・")}
                          </span>
                        )}
                        <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                          {note.visitDate}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPrintNote(note)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#FAF8F5] dark:bg-[#1F2C37] border border-[#D8CFC0] dark:border-[#384C5E] text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#EBF3EF]"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>養生シートを見る</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditNoteModal(note)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1E3D34] text-white hover:bg-[#162D26]"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>記録を開く</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm("この臨床ノートを削除しますか？")) {
                              removePatientNote(note.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-[#737C77] hover:text-red-600 transition-colors"
                          title="削除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* 主訴 */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                        {note.chiefComplaint}
                      </h3>
                    </div>

                    {/* 弁証と配穴の要約 */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {(note.constitution || note.syndrome) && (
                        <span className="px-2 py-0.5 rounded bg-[#FAF2E6] dark:bg-[#251D14] text-[#B86924] dark:text-[#E6C387] font-semibold">
                          {[note.constitution, note.syndrome].filter(Boolean).join(" ／ ")}
                        </span>
                      )}
                      {note.selectedPoints.length > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="text-[#737C77]">配穴:</span>
                          <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                            {note.selectedPoints.join("、 ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* 5. タブ2: 配穴集 */}
        {/* ======================================================== */}
        {activeTab === "stock" && (
          <div className="space-y-4">
            <p className="text-xs text-[#59615D] dark:text-[#8899A6]">
              保存した経穴・配穴を、臨床ノートの作成時に引用できます。
            </p>

            {filteredMemos.length === 0 ? (
              <div className="p-8 sm:p-12 text-center rounded-2xl border-2 border-dashed border-[#D8CFC0] dark:border-[#2A3B4A] bg-white/40 dark:bg-[#141C24]/40 space-y-3">
                <Bookmark className="w-10 h-10 text-[#737C77] mx-auto opacity-50" />
                <h3 className="text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                  保存された配穴がありません
                </h3>
                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#8899A6] max-w-md mx-auto">
                  代表的な名配穴プリセットを読み込むか、経穴辞典からお気に入りのツボを保存してみましょう。
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={loadRecommendedPresets}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#B86924] hover:bg-[#975319]"
                  >
                    重要配穴プリセットを読み込む
                  </button>
                  <Link
                    href="/tsubo"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF]"
                  >
                    経穴辞典を見る
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMemos.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E8E1D1] dark:border-[#2A3B4A] shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2 border-b border-[#F0EBE0] dark:border-[#243340] pb-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            {item.elements.map((el) => (
                              <GogyoBadge key={el} target={el} size="sm" />
                            ))}
                            <span className="text-[10px] font-bold text-[#737C77]">
                              {item.type === "pair" ? "重要配穴" : item.type === "tsubo" ? "単穴" : "自作配穴"}
                            </span>
                          </div>
                          <h4 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] mt-1">
                            {item.title}
                          </h4>
                          {item.subTitle && (
                            <span className="text-xs text-[#B86924] dark:text-[#E6C387] font-semibold block">
                              {item.subTitle}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeMemo(item.id)}
                          className="p-1 rounded-lg text-[#737C77] hover:text-red-600 transition-colors"
                          title="削除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* 構成ツボ */}
                      <div className="flex flex-wrap gap-1">
                        {item.points.map((pt, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md text-xs font-bold bg-[#FAF2E6] dark:bg-[#251D14] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4A321E]"
                          >
                            {pt}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-2">
                        {item.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#F0EBE0] dark:border-[#243340] flex items-center justify-between text-[11px] text-[#737C77]">
                      <span>登録: {new Date(item.createdAt).toLocaleDateString("ja-JP")}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const text = `【${item.title}】\nツボ: ${item.points.join("、 ")}\n要点: ${item.summary}`;
                          navigator.clipboard.writeText(text);
                          setCopiedId(item.id);
                          setTimeout(() => setCopiedId(null), 2000);
                        }}
                        className="text-[#1E3D34] dark:text-[#74BA9E] font-bold hover:underline flex items-center gap-0.5"
                      >
                        {copiedId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        コピー
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 6. 詳しい使い方・待合室案内・プライバシー保護の折りたたみ */}
      {/* ======================================================== */}
      <div className="pt-4 border-t border-[#E8E1D1] dark:border-[#22303D]">
        <details className="group rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#152028] p-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] cursor-pointer hover:text-[#232826] dark:hover:text-[#FAF8F5]">
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>臨床での使い方とプライバシー保護について</span>
            </span>
            <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 shrink-0 ml-2" />
          </summary>

          <div className="mt-4 space-y-4 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] border-t border-[#E8E1D1] dark:border-[#22303D] pt-4 leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-bold text-[#232826] dark:text-[#FAF8F5]">【プライバシーと安全な記録管理】</h4>
              <p>
                本機能は臨床推論や配穴検討、患者さん向け養生シート作成を支援するための個人ノートです。
                あはき法等の法定カルテの代わりではありません。
                個人情報保護のため、患者さんの実名や連絡先ではなく<strong>カルテ番号（例: PT-001）やイニシャルでの識別を推奨</strong>しています。
                記録はお使いの端末・ブラウザ内にのみ保存され、外部サーバーへ送信されることはありません。
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[#232826] dark:text-[#FAF8F5]">【待合室での体質チェック案内用紙】</h4>
                <button
                  type="button"
                  onClick={() => setIsPopModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1E3D34] text-white hover:bg-[#162D26]"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>待合室POPを印刷</span>
                </button>
              </div>
              <p>
                待合室や受付に掲示する案内用紙（QRコード付きA4用紙）を印刷できます。患者さんが待ち時間にスマホで「気血水診断」を行えます。
              </p>
            </div>
          </div>
        </details>
      </div>

      {/* ======================================================== */}
      {/* モーダル群 */}
      {/* ======================================================== */}

      {/* 1. 完成見本プレビューモーダル（保存枠を消費しない） */}
      {isSamplePreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white dark:bg-[#17212A] w-full max-w-2xl rounded-2xl border-2 border-[#1E3D34] shadow-2xl p-6 my-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#263542] pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                  見本・架空のサンプル
                </span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                  ※閲覧しても保存枠は消費されません
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSamplePreviewOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* サンプル切り替えスイッチ */}
            <div className="flex items-center gap-2">
              {SAMPLE_PATIENT_NOTES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSampleIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedSampleIndex === idx
                      ? "bg-[#1E3D34] text-white"
                      : "bg-[#FAF8F5] dark:bg-[#10171F] border border-[#D8CFC0] text-[#59615D]"
                  }`}
                >
                  見本{idx + 1}：{s.patientIdentifier}
                </button>
              ))}
            </div>

            {/* 見本内容 */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-3 text-sm">
              <div className="flex items-center justify-between text-xs text-[#737C77]">
                <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {currentSample.patientIdentifier}（{currentSample.gender}・{currentSample.ageGroup}）
                </span>
                <span>来院日: {currentSample.visitDate}</span>
              </div>

              <div>
                <span className="text-xs font-bold text-[#737C77] block">【主訴】</span>
                <p className="font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
                  {currentSample.chiefComplaint}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500 block">体質見立て</span>
                  <span className="font-bold text-[#B86924]">{currentSample.constitution}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">弁証</span>
                  <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">{currentSample.syndrome}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#737C77] block">【採用配穴】</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {currentSample.selectedPoints.map((pt) => (
                    <span key={pt} className="px-2 py-0.5 rounded bg-white dark:bg-[#1A2530] border border-[#C5DED4] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                      {pt}
                    </span>
                  ))}
                </div>
              </div>

              {currentSample.treatmentPlan && (
                <div>
                  <span className="text-xs font-bold text-[#737C77] block">【施術方針・手技メモ】</span>
                  <p className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-0.5">
                    {currentSample.treatmentPlan}
                  </p>
                </div>
              )}

              {currentSample.patientReaction && (
                <div>
                  <span className="text-xs font-bold text-[#737C77] block">【施術後の変化】</span>
                  <p className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-0.5">
                    {currentSample.patientReaction}
                  </p>
                </div>
              )}

              {currentSample.nextAction && (
                <div>
                  <span className="text-xs font-bold text-[#737C77] block">【養生セルフケア指導】</span>
                  <p className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-0.5">
                    {currentSample.nextAction}
                  </p>
                </div>
              )}
            </div>

            {/* 見本のアクション */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#E8E1D1] dark:border-[#263542]">
              <button
                type="button"
                onClick={() => setPrintNote(currentSample)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#1E3D34] text-[#1E3D34] dark:text-[#74BA9E] text-xs sm:text-sm font-bold hover:bg-[#EBF3EF] flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>この見本の養生シートを見る</span>
              </button>

              <button
                type="button"
                onClick={() => openCreateFromSample(currentSample)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>この形式でノートを作る</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. 臨床ノート新規作成 / 編集モーダル */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white dark:bg-[#17212A] w-full max-w-2xl rounded-2xl border-2 border-[#1E3D34] shadow-2xl p-5 sm:p-7 my-6 space-y-5 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#263542] pb-3">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {editingNoteId ? "臨床ノートの編集" : "新しい臨床ノートを作成"}
                </h3>
                <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                  実名は入力せず、カルテ番号やイニシャルで管理してください。
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsNoteModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveNote} className="space-y-6">
              
              {/* グループ1: 基本情報 */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-4">
                <span className="font-bold text-xs uppercase tracking-wider text-[#1E3D34] dark:text-[#74BA9E] block">
                  1. 基本情報
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                      患者識別（番号・イニシャル）<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={patientIdentifier}
                      onChange={(e) => setPatientIdentifier(e.target.value)}
                      placeholder="例: PT-001, K.S様"
                      className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-base text-[#232826] dark:text-[#FAF8F5]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                      来院日<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-base text-[#232826] dark:text-[#FAF8F5]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                    主訴・本日のお悩み<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={chiefComplaint}
                    onChange={(e) => setChiefComplaint(e.target.value)}
                    placeholder="例: デスクワークによる後頭部痛と目の奥の重さ"
                    className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-base text-[#232826] dark:text-[#FAF8F5]"
                  />
                </div>

                {/* 補助項目（性別・年代） */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-[#737C77]">性別（任意）</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-sm text-[#232826] dark:text-[#FAF8F5]"
                    >
                      <option value="">未選択</option>
                      <option value="女性">女性</option>
                      <option value="男性">男性</option>
                      <option value="その他">その他</option>
                      <option value="未回答">未回答</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-[#737C77]">年代（任意）</label>
                    <select
                      value={ageGroup}
                      onChange={(e) => setAgeGroup(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-sm text-[#232826] dark:text-[#FAF8F5]"
                    >
                      <option value="">未選択</option>
                      <option value="10代">10代</option>
                      <option value="20代">20代</option>
                      <option value="30代">30代</option>
                      <option value="40代">40代</option>
                      <option value="50代">50代</option>
                      <option value="60代">60代</option>
                      <option value="70代以上">70代以上</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* グループ2: 見立てと施術 */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-4">
                <span className="font-bold text-xs uppercase tracking-wider text-[#1E3D34] dark:text-[#74BA9E] block">
                  2. 東洋医学的見立て ＆ 採用配穴
                </span>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                    気血水・体質見立て
                  </label>
                  <input
                    type="text"
                    value={constitution}
                    onChange={(e) => setConstitution(e.target.value)}
                    placeholder="例: 気滞・肝鬱化火"
                    className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-base text-[#232826] dark:text-[#FAF8F5]"
                  />
                  {/* クイック選択タグ */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {CONSTITUTION_TAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const base = tag.split("（")[0];
                          setConstitution(constitution ? `${constitution}、${base}` : base);
                        }}
                        className="text-[11px] px-2 py-1 rounded bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#EBF3EF]"
                      >
                        +{tag.split("（")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                    弁証・病態仮説
                  </label>
                  <input
                    type="text"
                    value={syndrome}
                    onChange={(e) => setSyndrome(e.target.value)}
                    placeholder="例: 肝陽上亢・肝胆経気機不暢"
                    className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-base text-[#232826] dark:text-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                      採用配穴（ツボ）
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsPointPickerOpen(true)}
                      className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>保存した配穴集から選ぶ</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={selectedPointsInput}
                    onChange={(e) => setSelectedPointsInput(e.target.value)}
                    placeholder="経穴を入力（例: 太衝、陽陵泉、風池）"
                    className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-base text-[#232826] dark:text-[#FAF8F5]"
                  />
                  <p className="text-[11px] text-[#737C77]">
                    ※複数のツボは読点（、）やスペースで区切って入力できます。
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                    施術方針・手技メモ（施術者用）
                  </label>
                  <textarea
                    rows={2}
                    value={treatmentPlan}
                    onChange={(e) => setTreatmentPlan(e.target.value)}
                    placeholder="例: 太衝・風池に瀉法。置針15分。百会に軽微な雀啄。"
                    className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-base text-[#232826] dark:text-[#FAF8F5]"
                  />
                  <p className="text-[11px] text-[#737C77]">
                    ※この手技メモは施術者用であり、患者向け養生シートには印刷されません。
                  </p>
                </div>
              </div>

              {/* グループ3: 施術後と養生 */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-4">
                <span className="font-bold text-xs uppercase tracking-wider text-[#1E3D34] dark:text-[#74BA9E] block">
                  3. 施術後の反応 ＆ 患者向け養生指導
                </span>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                    術後の変化・患者の反応
                  </label>
                  <input
                    type="text"
                    value={patientReaction}
                    onChange={(e) => setPatientReaction(e.target.value)}
                    placeholder="例: 頭部の熱感と締め付け感が消失。目の開けやすさを自覚。"
                    className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-base text-[#232826] dark:text-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                    次回への申し送り・患者向けセルフケア指導メモ
                  </label>
                  <textarea
                    rows={3}
                    value={nextAction}
                    onChange={(e) => setNextAction(e.target.value)}
                    placeholder="例: 就寝前のスマホ制限とホットアイマスク指導。足元の冷え対策としてぬるめの足湯を推奨。次回は1週間後。"
                    className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-base text-[#232826] dark:text-[#FAF8F5]"
                  />
                  <p className="text-[11px] text-[#1E3D34] dark:text-[#74BA9E] font-medium">
                    ★ ここに入力したセルフケア指導は、患者向け「A4養生シート」にそのまま反映されます。
                  </p>
                </div>
              </div>

              {/* 保存操作ボタン */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E1D1] dark:border-[#263542]">
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-[#737C77] hover:bg-gray-100 dark:hover:bg-[#1F2C37]"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1E3D34] hover:bg-[#162D26] shadow-md transition-all"
                >
                  {editingNoteId ? "変更を保存する" : "臨床ノートを保存"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 3. 配穴ピッカーモーダル（フォーム入力補助） */}
      {isPointPickerOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-[#17212A] w-full max-w-lg rounded-2xl border border-[#D8CFC0] p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                配穴集からツボを追加
              </h4>
              <button
                type="button"
                onClick={() => setIsPointPickerOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#737C77]">
              クリックすると現在の採用配穴欄にツボが追加されます。
            </p>

            <div className="space-y-3">
              {memos.length === 0 ? (
                <p className="text-xs text-gray-500 py-4 text-center">
                  配穴集に保存されたツボがありません。
                </p>
              ) : (
                memos.map((m) => (
                  <div key={m.id} className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] space-y-1.5">
                    <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] block">
                      {m.title}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {m.points.map((pt) => {
                        const cleanPt = pt.split(" ")[0];
                        return (
                          <button
                            key={pt}
                            type="button"
                            onClick={() => handlePickPoint(cleanPt)}
                            className="px-2 py-0.5 rounded bg-white dark:bg-[#1A2530] border border-[#D8CFC0] text-xs font-bold text-[#1E3D34] hover:bg-[#EBF3EF]"
                          >
                            + {cleanPt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setIsPointPickerOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1E3D34] text-white"
              >
                完了
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. 自作配穴追加モーダル */}
      {isCustomStockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white dark:bg-[#17212A] w-full max-w-md rounded-2xl border-2 border-[#B86924] shadow-2xl p-6 my-8 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                自作の配穴処方を保存
              </h3>
              <button
                type="button"
                onClick={() => setIsCustomStockModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomStock} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="block text-xs font-bold">配穴・処方名<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={customStockTitle}
                  onChange={(e) => setCustomStockTitle(e.target.value)}
                  placeholder="例: 頭痛・眼精疲労 黄金配穴"
                  className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] text-base"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold">構成ツボ（例: 太衝、陽陵泉）<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={customStockPoints}
                  onChange={(e) => setCustomStockPoints(e.target.value)}
                  placeholder="太衝、合谷、風池"
                  className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] text-base"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold">五行属性</label>
                <div className="flex items-center gap-2">
                  {(["木", "火", "土", "金", "水"] as const).map((el) => (
                    <button
                      key={el}
                      type="button"
                      onClick={() => setCustomStockElement(el)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        customStockElement === el
                          ? "bg-[#B86924] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {el}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold">作用・臨床メモ</label>
                <textarea
                  rows={2}
                  value={customStockSummary}
                  onChange={(e) => setCustomStockSummary(e.target.value)}
                  placeholder="例: 肝気鬱結による頭痛・筋膜緊張を緩める。"
                  className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsCustomStockModalOpen(false)}
                  className="px-3 py-2 text-xs font-bold text-gray-500"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#B86924]"
                >
                  配穴集に保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. 患者向け養生シート A4印刷プレビューモーダル */}
      {printNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white text-black w-full max-w-3xl rounded-2xl shadow-2xl p-6 sm:p-8 my-8 space-y-6 max-h-[92vh] overflow-y-auto print:p-0 print:m-0 print:shadow-none print:w-full">
            
            {/* 画面用操作バー（印刷時には非表示） */}
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#1E3D34] text-white text-xs font-bold">
                  養生シート印刷プレビュー
                </span>
                <span className="text-xs text-gray-500">
                  患者さんにお渡しできるA4サイズのセルフケア養生シートです
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#1E3D34] text-white hover:bg-[#162D26] shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  印刷する（A4）
                </button>
                <button
                  type="button"
                  onClick={() => setPrintNote(null)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 実際の印刷用シート本文（A4形式） */}
            <div className="p-4 sm:p-8 border sm:border-2 border-gray-300 rounded-xl space-y-6 font-sans">
              <div className="flex items-start justify-between border-b-2 border-gray-800 pb-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-wide">
                    東洋医学 養生＆セルフケア処方せん
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    本日のお体の状態と、ご自宅でできるツボ・生活養生アドバイスです。
                  </p>
                </div>
                <div className="text-right text-xs text-gray-700 space-y-0.5">
                  <p className="font-bold">カルテNo.: {printNote.patientIdentifier}</p>
                  <p>発行日: {printNote.visitDate}</p>
                  <p className="text-[10px] text-gray-400">はり太郎の東洋医学 発行</p>
                </div>
              </div>

              {/* 1. お悩み・主訴 */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-l-4 border-emerald-800 pl-2">
                  【本日のお悩み・主訴】
                </h4>
                <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-900 font-semibold leading-relaxed">
                  {printNote.chiefComplaint}
                </div>
              </div>

              {/* 2. お体の見立て */}
              {(printNote.constitution || printNote.syndrome) && (
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-l-4 border-emerald-800 pl-2">
                    【東洋医学的なお体のバランス・体質タイプ】
                  </h4>
                  <div className="p-3 bg-emerald-50/60 rounded-lg text-xs text-gray-800 space-y-1">
                    <p className="font-bold text-emerald-900 text-sm">
                      {[printNote.constitution, printNote.syndrome].filter(Boolean).join(" ／ ")}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      東洋医学では「気・血・水」や「五臓」のバランスの乱れから症状が現れると考えます。
                      過度の緊張や冷え、疲労の蓄積により巡りが滞っている状態です。
                    </p>
                  </div>
                </div>
              )}

              {/* 3. ご自宅でケアできるツボ */}
              {printNote.selectedPoints.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-l-4 border-emerald-800 pl-2">
                    【ご自宅で温める・押すと良いおすすめのツボ】
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {printNote.selectedPoints.map((pt, i) => (
                      <div key={i} className="p-2.5 rounded-lg border border-gray-200 text-center space-y-1">
                        <span className="text-xs font-bold text-gray-900 block">
                          {pt}
                        </span>
                        <span className="text-[10px] text-gray-500 block">
                          痛気持ちいい強さで5秒×3回、または温灸
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. 生活養生アドバイス */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-l-4 border-amber-800 pl-2">
                  【日常生活でのセルフケア・養生アドバイス】
                </h4>
                <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-lg text-xs text-gray-800 space-y-2 leading-relaxed">
                  {printNote.nextAction ? (
                    <p className="font-medium text-amber-950 whitespace-pre-wrap">
                      {printNote.nextAction}
                    </p>
                  ) : (
                    <p className="text-gray-600">
                      ・就寝前の深呼吸と足元の温め（白湯・足湯）を心がけましょう。<br />
                      ・冷たい飲食物を控え、常温や温かいものを摂るようにしてください。<br />
                      ・デスクワークの合間に首や肩甲骨を大きく回し、気の滞りを解消しましょう。
                    </p>
                  )}
                </div>
              </div>

              {/* フッター */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500">
                <p>※本シートはセルフケアのための健康情報メモです。気になる症状が続く場合は専門医にご相談ください。</p>
                <p>監修: はり太郎の東洋医学 (haritaro.jp)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. 待合室用案内用紙 A4印刷モーダル */}
      {isPopModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white text-black w-full max-w-3xl rounded-2xl shadow-2xl p-6 sm:p-8 my-8 space-y-6 max-h-[92vh] overflow-y-auto print:p-0 print:m-0 print:shadow-none print:w-full">
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <span className="text-xs font-bold text-gray-700">
                待合室案内用紙（A4縦）
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#1E3D34] text-white"
                >
                  <Printer className="w-4 h-4" />
                  印刷する（A4）
                </button>
                <button
                  type="button"
                  onClick={() => setIsPopModalOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* A4 POP本文 */}
            <div className="p-6 sm:p-10 border sm:border-2 border-emerald-900/40 rounded-2xl space-y-6 font-sans text-center bg-gradient-to-b from-[#FAF8F5] to-white">
              <div className="space-y-2 border-b-2 border-emerald-900 pb-5">
                <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase block">
                  Oriental Medicine Self Check Guide
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-wide">
                  お待ちの間に、スマホで簡単２分
                </h2>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-emerald-900">
                  東洋医学 体質セルフ診断 ＆ 五労チェッカー
                </h1>
                <p className="text-xs text-gray-600 max-w-lg mx-auto leading-relaxed pt-1">
                  あなたの「気・血・水」のバランスの乱れや、デスクワーク・立ち仕事による五臓の疲弊度を今すぐチェックできます。
                </p>
              </div>

              <div className="py-2 space-y-3">
                <div className="inline-block p-4 bg-white rounded-2xl border-2 border-emerald-800 shadow-md">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fwww.haritaro.jp%2Fdiagnosis"
                    alt="体質診断 QRコード"
                    className="w-48 h-48 sm:w-56 sm:h-56 mx-auto"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-800 flex items-center justify-center gap-1.5">
                    <QrCode className="w-4 h-4 text-emerald-800" />
                    <span>スマートフォンのカメラでQRコードを読み取ってください</span>
                  </p>
                  <p className="text-xs text-gray-500 font-mono">
                    https://www.haritaro.jp/diagnosis
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto pt-2">
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                  <span className="text-xs font-bold text-emerald-900 block">
                    ① 気血水 12問セルフ診断
                  </span>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    気虚・気滞・血虚・瘀血・水滞・陽虚の6タイプから、今の心身の傾きと特効ツボ・おすすめ食材を判定。
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
                  <span className="text-xs font-bold text-amber-900 block">
                    ② 現代職業病（五労）チェッカー
                  </span>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    長時間のPC作業（久視）や座りっぱなし（久坐）など、日頃の動作から疲弊している五臓をレーダーチャート化。
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-900 text-white text-xs font-bold tracking-wide shadow-sm max-w-xl mx-auto space-y-1">
                <p className="text-sm">
                  ★ 診断結果が出ましたら、問診時に担当の先生にお見せください
                </p>
                <p className="text-[11px] text-emerald-200 font-normal">
                  診断結果をもとに、あなたの本日の体調に最も適したツボ・施術処方を組み立てます。
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500">
                <p>※登録不要・完全無料です。通信料はお客様負担となります。</p>
                <p>提供: はり太郎の東洋医学 (haritaro.jp)</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
