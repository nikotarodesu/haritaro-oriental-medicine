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
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  X, 
  Calendar, 
  User, 
  Tag, 
  Activity, 
  Compass, 
  ArrowRight,
  BookOpen,
  FileText,
  Share2,
  QrCode,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Send
} from "lucide-react";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { useAuth } from "@/contexts/AuthContext";
import { ClinicalMemoItem, PatientNoteItem } from "@/types/clinicalMemo";
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
    clearAllMemos,
    loadRecommendedPresets,
    patientNotes,
    patientNoteCount,
    maxPatientNoteLimit,
    addPatientNote,
    updatePatientNote,
    removePatientNote,
    clearAllPatientNotes,
    loadSamplePatientNotes,
    exportAllDataAsJson,
    importDataFromJson,
    addMemo,
  } = useClinicalMemo();

  // タブ状態: "notes" (臨床ノート) | "stock" (配穴ストック)
  const [activeTab, setActiveTab] = useState<"notes" | "stock">("notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 待合室QRコードPOPモーダル
  const [isPopModalOpen, setIsPopModalOpen] = useState(false);
  // 3ステップ活用ガイドの開閉
  const [isGuideOpen, setIsGuideOpen] = useState(true);
  // 診断URLコピー完了フラグ
  const [urlCopied, setUrlCopied] = useState(false);

  // 臨床ノート新規・編集モーダル
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [patientIdentifier, setPatientIdentifier] = useState("");
  const [gender, setGender] = useState<"女性" | "男性" | "その他" | "未回答">("女性");
  const [ageGroup, setAgeGroup] = useState("30代");
  const [visitDate, setVisitDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [constitution, setConstitution] = useState("");
  const [syndrome, setSyndrome] = useState("");
  const [selectedPointsInput, setSelectedPointsInput] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [patientReaction, setPatientReaction] = useState("");
  const [nextAction, setNextAction] = useState("");

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

  // 診断結果等からのURLクエリパラメータ引き継ぎ自動検知
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const shouldCreate = params.get("new");
    if (shouldCreate === "1" || shouldCreate === "true") {
      const initConstitution = params.get("constitution") || "";
      const initPoints = params.get("points") || "";
      const initComplaint = params.get("complaint") || "";
      const initSyndrome = params.get("syndrome") || "";

      setEditingNoteId(null);
      setPatientIdentifier(`PT-${String(patientNotes.length + 1).padStart(3, "0")}`);
      setGender("女性");
      setAgeGroup("30代");
      setVisitDate(new Date().toISOString().split("T")[0]);
      setChiefComplaint(initComplaint);
      setConstitution(initConstitution);
      setSyndrome(initSyndrome);
      setSelectedPointsInput(initPoints.replace(/,/g, "、 "));
      setTreatmentPlan("");
      setPatientReaction("");
      setNextAction("");
      setIsNoteModalOpen(true);
      setActiveTab("notes");

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [patientNotes.length]);

  const handleCopyDiagnosisUrl = () => {
    const url = "https://www.haritaro.jp/diagnosis";
    navigator.clipboard.writeText(url);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2500);
  };

  // 臨床ノートのフィルタリング
  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return patientNotes;
    return patientNotes.filter(n =>
      n.patientIdentifier.toLowerCase().includes(q) ||
      n.chiefComplaint.toLowerCase().includes(q) ||
      (n.constitution && n.constitution.toLowerCase().includes(q)) ||
      (n.syndrome && n.syndrome.toLowerCase().includes(q)) ||
      n.selectedPoints.some(p => p.toLowerCase().includes(q)) ||
      (n.treatmentPlan && n.treatmentPlan.toLowerCase().includes(q)) ||
      (n.patientReaction && n.patientReaction.toLowerCase().includes(q)) ||
      (n.nextAction && n.nextAction.toLowerCase().includes(q))
    );
  }, [patientNotes, searchQuery]);

  // 配穴ストックのフィルタリング
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
        item.summary.toLowerCase().includes(q) ||
        (item.personalNotes && item.personalNotes.toLowerCase().includes(q));
      return matchTag && matchQuery;
    });
  }, [memos, selectedTag, searchQuery]);

  // モーダルを開く（新規）
  const openNewNoteModal = () => {
    setEditingNoteId(null);
    setPatientIdentifier(`PT-${String(patientNotes.length + 1).padStart(3, "0")}`);
    setGender("女性");
    setAgeGroup("30代");
    setVisitDate(new Date().toISOString().split("T")[0]);
    setChiefComplaint("");
    setConstitution("");
    setSyndrome("");
    setSelectedPointsInput("");
    setTreatmentPlan("");
    setPatientReaction("");
    setNextAction("");
    setIsNoteModalOpen(true);
  };

  // モーダルを開く（編集）
  const openEditNoteModal = (note: PatientNoteItem) => {
    setEditingNoteId(note.id);
    setPatientIdentifier(note.patientIdentifier);
    setGender(note.gender || "女性");
    setAgeGroup(note.ageGroup || "30代");
    setVisitDate(note.visitDate);
    setChiefComplaint(note.chiefComplaint);
    setConstitution(note.constitution || "");
    setSyndrome(note.syndrome || "");
    setSelectedPointsInput(note.selectedPoints.join("、 "));
    setTreatmentPlan(note.treatmentPlan || "");
    setPatientReaction(note.patientReaction || "");
    setNextAction(note.nextAction || "");
    setIsNoteModalOpen(true);
  };

  // 臨床ノート保存
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientIdentifier.trim() || !chiefComplaint.trim()) {
      alert("患者識別（ID・イニシャル）と主訴を入力してください");
      return;
    }

    const pointsArray = selectedPointsInput
      .split(/[,、\s]+/)
      .map(p => p.trim())
      .filter(Boolean);

    const notePayload = {
      patientIdentifier: patientIdentifier.trim(),
      gender,
      ageGroup,
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
      addPatientNote(notePayload);
    }

    setIsNoteModalOpen(false);
  };

  // 自作配穴保存
  const handleSaveCustomStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customStockTitle.trim() || !customStockPoints.trim()) return;

    const points = customStockPoints.split(/[,、\s]+/).map(p => p.trim()).filter(Boolean);
    addMemo({
      id: `custom_stock_${Date.now()}`,
      type: "custom",
      title: customStockTitle.trim(),
      subTitle: "自作配穴セット",
      points,
      elements: [customStockElement],
      indications: [customStockSummary || "臨床応用"],
      summary: customStockSummary || "自作配穴メモ",
      personalNotes: customStockNote.trim() || undefined,
    });

    setCustomStockTitle("");
    setCustomStockPoints("");
    setCustomStockSummary("");
    setCustomStockNote("");
    setIsCustomStockModalOpen(false);
  };

  // ストックから配穴を臨床ノートに引用
  const handleInsertStockPoints = (stockItem: ClinicalMemoItem) => {
    const existing = selectedPointsInput ? selectedPointsInput.trim() + "、 " : "";
    setSelectedPointsInput(existing + stockItem.points.join("、 "));
    if (!syndrome && stockItem.subTitle) {
      setSyndrome(stockItem.subTitle);
    }
  };

  // JSONダウンロード
  const handleDownloadBackup = () => {
    const json = exportAllDataAsJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `haritaro_mynote_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // JSONインポート
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importDataFromJson(content);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // テキストコピー
  const handleCopyNote = (note: PatientNoteItem) => {
    const text = `【臨床ノート: ${note.patientIdentifier}】(${note.visitDate})
■ 属性: ${note.ageGroup || ""} ${note.gender || ""}
■ 主訴: ${note.chiefComplaint}
■ 体質・弁証: ${[note.constitution, note.syndrome].filter(Boolean).join(" / ")}
■ 採用配穴: ${note.selectedPoints.join("、 ")}
${note.treatmentPlan ? `■ 施術方針: ${note.treatmentPlan}\n` : ""}${note.patientReaction ? `■ 術後反応: ${note.patientReaction}\n` : ""}${note.nextAction ? `■ 養生・次回申送: ${note.nextAction}\n` : ""}`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ページタイトルとヘッダーアクション */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E1D1] dark:border-[#22303D] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1E3D34]/10 text-[#1E3D34] dark:bg-[#74BA9E]/20 dark:text-[#74BA9E]">
                臨床＆学習支援ツール
              </span>
              <span className="text-xs text-[#737C77] dark:text-[#8899A6] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
                完全端末内（ブラウザ）保存・個人情報安全設計
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2.5">
              <Bookmark className="w-7 h-7 text-[#B86924] dark:text-[#E6C387] fill-current" />
              マイノート
            </h1>
            <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] mt-1">
              日々の患者さんの「臨床ノート（主訴・弁証・配穴・養生指導）」と、サイト内で見つけた「配穴・ツボストック」を一元管理できます。
            </p>
          </div>

          {/* バックアップ・インポートアクション */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadBackup}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-[#D8CFC0] dark:border-[#384C5E] text-[#404743] dark:text-[#C5D2DB] bg-white dark:bg-[#1A2530] hover:bg-[#F3EFE6] dark:hover:bg-[#22303D] transition-colors"
              title="JSON形式で手元にバックアップ保存"
            >
              <Download className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>バックアップ保存</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-[#D8CFC0] dark:border-[#384C5E] text-[#404743] dark:text-[#C5D2DB] bg-white dark:bg-[#1A2530] hover:bg-[#F3EFE6] dark:hover:bg-[#22303D] transition-colors"
              title="JSONバックアップから復元"
            >
              <Upload className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>復元</span>
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

        {/* リーガル・安心の案内バナー */}
        <div className="p-4 rounded-2xl bg-[#FCF4EB] dark:bg-[#221811] border border-[#F3DEC5] dark:border-[#4A321E] flex items-start gap-3 text-xs text-[#7A4515] dark:text-[#ECC99B]">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[#B86924] dark:text-[#E6C387]" />
          <div className="space-y-1">
            <p className="font-bold">
              【プライバシーと個人情報保護について】
            </p>
            <p className="leading-relaxed">
              本機能はあはき法等の法定カルテではなく、臨床推論・配穴検討・養生指導シートを作成するための「個人の研究・臨床支援ノート」です。
              患者さんの氏名や連絡先は預からず、<strong>カルテ番号（例: PT-042）やイニシャル（例: K.S様）での管理を推奨</strong>しています。
              データはサーバーに一切送信されず、お使いの端末（ブラウザ）内のみに安全に保存されます。
            </p>
          </div>
        </div>

        {/* 院内臨床 3ステップ活用ガイド ＆ 待合室POP導線 */}
        <div className="rounded-2xl border-2 border-[#1E3D34]/20 dark:border-[#74BA9E]/30 bg-gradient-to-br from-[#F5FAF8] to-[#FAF8F5] dark:from-[#13221C] dark:to-[#17212A] p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#1E3D34] text-white shrink-0">
                <Lightbulb className="w-4 h-4 text-[#E6C387]" />
              </span>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  問診・施術を劇的にスムーズにする「院内 3ステップ活用法」
                </h3>
                <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC]">
                  患者さんの待ち時間・問診・施術・アフターケアを1本の線で繋ぐおすすめの臨床オペレーションです
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsPopModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#1E3D34] hover:bg-[#162D26] text-white shadow-xs transition-all"
                title="待合室や受付に置くQRコード案内シートをA4印刷"
              >
                <QrCode className="w-3.5 h-3.5 text-[#E6C387]" />
                <span>待合室用QRコードPOPを印刷</span>
              </button>
              <button
                type="button"
                onClick={() => setIsGuideOpen(!isGuideOpen)}
                className="p-1.5 rounded-lg text-[#737C77] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title={isGuideOpen ? "ガイドを閉じる" : "ガイドを開く"}
              >
                {isGuideOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isGuideOpen && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              {/* STEP 1 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#D5E6DE] dark:border-[#2C4A3E] space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E]">
                      STEP 1：待合室・問診前
                    </span>
                    <span className="text-[10px] text-[#737C77]">約2分</span>
                  </div>
                  <h4 className="font-bold text-[#232826] dark:text-[#FAF8F5] text-xs">
                    患者さんに「体質診断・五労チェック」を受けてもらう
                  </h4>
                  <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                    待合室POPのQRコードを患者さんのスマホで読み取ってもらうか、院のiPadで12問の問診に回答してもらいます。
                  </p>
                </div>
                <div className="pt-2 border-t border-[#F0EBE0] dark:border-[#263542] flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={() => setIsPopModalOpen(true)}
                    className="text-[#1E3D34] dark:text-[#74BA9E] font-bold hover:underline flex items-center gap-1"
                  >
                    <Printer className="w-3 h-3" />
                    <span>POP印刷（A4）</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyDiagnosisUrl}
                    className="text-[#737C77] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] font-semibold flex items-center gap-0.5"
                  >
                    {urlCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{urlCopied ? "URLコピー済" : "URLコピー"}</span>
                  </button>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#F3DEC5] dark:border-[#4A321E] space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-[#FAF2E6] text-[#B86924] dark:bg-[#251D14] dark:text-[#E6C387]">
                      STEP 2：問診・施術記録
                    </span>
                    <span className="text-[10px] text-[#737C77]">マイノート</span>
                  </div>
                  <h4 className="font-bold text-[#232826] dark:text-[#FAF8F5] text-xs">
                    診断結果を見ながら配穴を選定・手技メモ
                  </h4>
                  <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                    診断された体質（気滞・瘀血など）をもとに、ストックから配穴を1クリック挿入。施術方針や術直後の変化をサッと記録します。
                  </p>
                </div>
                <div className="pt-2 border-t border-[#F0EBE0] dark:border-[#263542] flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={openNewNoteModal}
                    className="text-[#B86924] dark:text-[#E6C387] font-bold hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>臨床ノート作成</span>
                  </button>
                  <span className="text-[10px] text-[#737C77]">配穴引用ボタン完備</span>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#D5E6DE] dark:border-[#2C4A3E] space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E]">
                      STEP 3：施術後・アフターケア
                    </span>
                    <span className="text-[10px] text-[#737C77]">信頼度＆リピートUP</span>
                  </div>
                  <h4 className="font-bold text-[#232826] dark:text-[#FAF8F5] text-xs">
                    「患者用セルフケア養生シート」を印刷して手渡し
                  </h4>
                  <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                    ノート詳細からボタン1つでA4印刷。お家で温めるツボや食養生を患者さんに渡すことで、高い納得感と再来院に繋がります。
                  </p>
                </div>
                <div className="pt-2 border-t border-[#F0EBE0] dark:border-[#263542] flex items-center justify-between text-[11px]">
                  <span className="text-[10px] text-[#737C77]">A4縦・白黒印刷最適化</span>
                  <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold flex items-center gap-0.5">
                    <Printer className="w-3 h-3" />
                    <span>即時PDF・印刷可</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* タブ切り替えと各タブのアクションボタン */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
          {/* タブ */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("notes")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "notes"
                  ? "bg-[#1E3D34] text-white shadow-md"
                  : "bg-white dark:bg-[#1A2530] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#EBF3EF] dark:hover:bg-[#22303D]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>臨床ノート（症例記録）</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === "notes" ? "bg-white/20 text-white" : "bg-[#E8E1D1] dark:bg-[#263542] text-[#404743] dark:text-[#C5D2DB]"}`}>
                {patientNoteCount} / {maxPatientNoteLimit}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("stock")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "stock"
                  ? "bg-[#B86924] text-white shadow-md"
                  : "bg-white dark:bg-[#1A2530] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FCF4EB] dark:hover:bg-[#22303D]"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>配穴・ツボストック</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === "stock" ? "bg-white/20 text-white" : "bg-[#E8E1D1] dark:bg-[#263542] text-[#404743] dark:text-[#C5D2DB]"}`}>
                {clipCount} / {maxLimit}
              </span>
            </button>
          </div>

          {/* 右側アクション */}
          <div className="flex items-center gap-2">
            {activeTab === "notes" ? (
              <>
                {patientNoteCount === 0 && (
                  <button
                    type="button"
                    onClick={loadSamplePatientNotes}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] hover:bg-[#D8E9E2] transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>サンプル症例を復元</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={openNewNoteModal}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1E3D34] hover:bg-[#162D26] shadow-xs transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>臨床ノートを新規作成</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={loadRecommendedPresets}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FCF4EB] dark:bg-[#251A10] hover:bg-[#FBEAD7] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>名配穴プリセット読込</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomStockModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#B86924] hover:bg-[#975319] shadow-xs transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>自作配穴を追加</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* 検索・絞り込みバー */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737C77] dark:text-[#8899A6]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === "notes" ? "患者ID、主訴、ツボ、弁証で検索..." : "ツボ名、適応、キーワードで検索..."}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#17212A] border border-[#D8CFC0] dark:border-[#2C3E50] text-xs text-[#232826] dark:text-[#FAF8F5] focus:outline-hidden focus:border-[#1E3D34]"
            />
          </div>

          {activeTab === "stock" && (
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {["all", "木", "火", "土", "金", "水"].map(el => (
                <button
                  key={el}
                  type="button"
                  onClick={() => setSelectedTag(el)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedTag === el
                      ? "bg-[#232826] text-white dark:bg-white dark:text-[#10161C]"
                      : "bg-white dark:bg-[#1A2530] text-[#737C77] dark:text-[#8899A6] border border-[#E8E1D1] dark:border-[#2A3B4A]"
                  }`}
                >
                  {el === "all" ? "すべて" : `${el}行`}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* タブ1: 臨床ノート（症例記録）一覧 */}
        {/* ======================================================== */}
        {activeTab === "notes" && (
          <div className="space-y-4">
            {filteredNotes.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border-2 border-dashed border-[#D8CFC0] dark:border-[#2A3B4A] bg-white/50 dark:bg-[#141C24]/50 space-y-3">
                <FileText className="w-10 h-10 text-[#737C77] dark:text-[#8899A6] mx-auto opacity-50" />
                <h3 className="text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                  臨床ノートがまだありません
                </h3>
                <p className="text-xs text-[#737C77] dark:text-[#8899A6] max-w-md mx-auto">
                  「臨床ノートを新規作成」ボタンから、日々の患者さんの主訴・選定した配穴・手技・次回への養生指導メモを記録してみましょう。
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={openNewNoteModal}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1E3D34] hover:bg-[#162D26]"
                  >
                    新規作成する
                  </button>
                  <button
                    type="button"
                    onClick={loadSamplePatientNotes}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823]"
                  >
                    サンプル症例を試す
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNotes.map(note => (
                  <div
                    key={note.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E8E1D1] dark:border-[#2A3B4A] shadow-xs hover:border-[#1E3D34]/50 transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      {/* 上部ヘッダー（ID・日付・属性・アクション） */}
                      <div className="flex items-start justify-between gap-2 border-b border-[#F0EBE0] dark:border-[#243340] pb-2.5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-base font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                              {note.patientIdentifier}
                            </span>
                            {(note.ageGroup || note.gender) && (
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#404743] dark:text-[#C5D2DB]">
                                {[note.ageGroup, note.gender].filter(Boolean).join(" ")}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            来院日: {note.visitDate}
                          </span>
                        </div>

                        {/* アクションボタン */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setPrintNote(note)}
                            className="p-1.5 rounded-lg text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#EBF3EF] dark:hover:bg-[#1F2E3B] transition-colors"
                            title="患者向け養生シートを印刷（A4）"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopyNote(note)}
                            className="p-1.5 rounded-lg text-[#737C77] dark:text-[#8899A6] hover:bg-[#F3EFE6] dark:hover:bg-[#1F2E3B] transition-colors"
                            title="テキスト形式でコピー"
                          >
                            {copiedId === note.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditNoteModal(note)}
                            className="p-1.5 rounded-lg text-[#737C77] dark:text-[#8899A6] hover:bg-[#F3EFE6] dark:hover:bg-[#1F2E3B] transition-colors"
                            title="編集"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`「${note.patientIdentifier}」の臨床ノートを削除しますか？`)) {
                                removePatientNote(note.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-[#A83629] dark:text-[#C47A72] hover:bg-[#FDEDEC] dark:hover:bg-[#2B1B19] transition-colors"
                            title="削除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* 主訴 */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] block uppercase tracking-wider">
                          主訴・お悩み
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                          {note.chiefComplaint}
                        </p>
                      </div>

                      {/* 体質・弁証 */}
                      {(note.constitution || note.syndrome) && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {note.constitution && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#FAF2E6] dark:bg-[#251D14] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4A321E]">
                              体質: {note.constitution}
                            </span>
                          )}
                          {note.syndrome && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] border border-[#D5E6DE] dark:border-[#2C4A3E]">
                              弁証: {note.syndrome}
                            </span>
                          )}
                        </div>
                      )}

                      {/* 採用配穴・ツボ */}
                      {note.selectedPoints.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] block uppercase tracking-wider">
                            採用配穴・選穴
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {note.selectedPoints.map((pt, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#1E3D34] text-white dark:bg-[#74BA9E] dark:text-[#10161C]"
                              >
                                {pt}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 施術方針・手技メモ */}
                      {note.treatmentPlan && (
                        <div className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-xs space-y-1">
                          <span className="font-bold text-[#404743] dark:text-[#C5D2DB] block">
                            施術方針・手技:
                          </span>
                          <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                            {note.treatmentPlan}
                          </p>
                        </div>
                      )}

                      {/* 術後反応 ＆ 養生セルフケア */}
                      {(note.patientReaction || note.nextAction) && (
                        <div className="space-y-1 text-xs">
                          {note.patientReaction && (
                            <p className="text-[#404743] dark:text-[#C5D2DB]">
                              <strong className="text-[#1E3D34] dark:text-[#74BA9E]">術後変化: </strong>
                              {note.patientReaction}
                            </p>
                          )}
                          {note.nextAction && (
                            <p className="text-[#B86924] dark:text-[#E6C387]">
                              <strong>次回・養生指導: </strong>
                              {note.nextAction}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 下部フッター：印刷クイック導線 */}
                    <div className="pt-2 border-t border-[#F0EBE0] dark:border-[#243340] flex items-center justify-between">
                      <span className="text-[10px] text-[#8899A6]">
                        更新: {new Date(note.updatedAt).toLocaleDateString("ja-JP")}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPrintNote(note)}
                        className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        患者用養生シートを出力
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* タブ2: 配穴・ツボストック 一覧 */}
        {/* ======================================================== */}
        {activeTab === "stock" && (
          <div className="space-y-4">
            {filteredMemos.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border-2 border-dashed border-[#D8CFC0] dark:border-[#2A3B4A] bg-white/50 dark:bg-[#141C24]/50 space-y-3">
                <Bookmark className="w-10 h-10 text-[#737C77] dark:text-[#8899A6] mx-auto opacity-50" />
                <h3 className="text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                  ストックされた配穴・ツボがありません
                </h3>
                <p className="text-xs text-[#737C77] dark:text-[#8899A6] max-w-md mx-auto">
                  ツボ辞典や症状別ガイドからお気に入りのツボをワンクリックで保存するか、「名配穴プリセット読込」から代表的な配穴（太衝＋陽陵泉など）を登録してみましょう。
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
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823]"
                  >
                    ツボ辞典を見に行く
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMemos.map(item => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E8E1D1] dark:border-[#2A3B4A] shadow-xs hover:border-[#B86924]/50 transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2 border-b border-[#F0EBE0] dark:border-[#243340] pb-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            {item.elements.map(el => (
                              <GogyoBadge key={el} target={el} size="sm" />
                            ))}
                            <span className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6]">
                              {item.type === "pair" ? "重要配穴" : item.type === "tsubo" ? "単穴" : "自作配穴"}
                            </span>
                          </div>
                          <h4 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] mt-1">
                            {item.title}
                          </h4>
                          {item.subTitle && (
                            <span className="text-[11px] text-[#B86924] dark:text-[#E6C387] font-semibold block">
                              {item.subTitle}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeMemo(item.id)}
                          className="p-1 rounded-lg text-[#737C77] hover:text-[#A83629] dark:hover:text-[#C47A72] transition-colors"
                          title="マイノートから削除"
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

                      {/* 主治 */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] block uppercase tracking-wider">
                          主治・適応
                        </span>
                        <p className="text-xs text-[#404743] dark:text-[#C5D2DB] line-clamp-2">
                          {item.indications.join("、 ")}
                        </p>
                      </div>

                      {/* 要点 */}
                      <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed bg-[#FAF8F5] dark:bg-[#121920] p-2.5 rounded-xl border border-[#E8E1D1] dark:border-[#22303D] line-clamp-3">
                        {item.summary}
                      </p>

                      {/* 個人臨床メモ編集欄 */}
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1">
                          <Edit3 className="w-3 h-3" />
                          あなたの臨床メモ
                        </span>
                        <textarea
                          defaultValue={item.personalNotes || ""}
                          placeholder="自身の臨床での気づきや鍼の太さ、患者の反応をメモ..."
                          onBlur={(e) => updatePersonalNote(item.id, e.target.value)}
                          className="w-full text-xs p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5] focus:outline-hidden focus:border-[#1E3D34] resize-none h-16"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#F0EBE0] dark:border-[#243340] flex items-center justify-between text-[10px] text-[#737C77] dark:text-[#8899A6]">
                      <span>登録: {new Date(item.createdAt).toLocaleDateString("ja-JP")}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const text = `【${item.title}】\nツボ: ${item.points.join("、 ")}\n主治: ${item.indications.join("、 ")}\n要点: ${item.summary}`;
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
      {/* 臨床ノート 新規作成 / 編集モーダル */}
      {/* ======================================================== */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-[#FAF8F5] dark:bg-[#17212A] w-full max-w-2xl rounded-2xl border-2 border-[#1E3D34] shadow-2xl p-6 my-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#263542] pb-3">
              <div>
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
                  {editingNoteId ? "臨床ノート編集" : "新規症例記録"}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {editingNoteId ? "患者症例ノートを更新" : "一人の患者さんの臨床ノートを作成"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNoteModalOpen(false)}
                className="p-1 rounded-lg text-[#737C77] hover:bg-[#E8E1D1] dark:hover:bg-[#263542]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4 text-xs">
              {/* 患者属性（カルテID、性別、年代、日付） */}
              <div className="p-3.5 rounded-xl bg-[#FCF4EB]/70 dark:bg-[#221811] border border-[#F3DEC5] dark:border-[#4A321E] space-y-2.5">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                      <span>患者識別（カルテNo. / イニシャル） *</span>
                    </label>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E3D34] text-white">
                      個人情報保護
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={patientIdentifier}
                    onChange={(e) => setPatientIdentifier(e.target.value)}
                    placeholder="例: PT-042, K.S様（※本名は入力しないでください）"
                    className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5] font-semibold"
                  />
                  <p className="text-[11px] text-[#7A4515] dark:text-[#ECC99B] leading-relaxed flex items-start gap-1 pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#1E3D34] dark:text-[#74BA9E]" />
                    <span>
                      <strong>【注意】個人情報保護のため、お名前（本名）は入力せず、カルテ番号（例: PT-001）やイニシャル（例: T.K様）をご入力ください。</strong>
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#F3DEC5]/60 dark:border-[#4A321E]/60">
                  <div className="space-y-1">
                    <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">年代</label>
                    <select
                      value={ageGroup}
                      onChange={(e) => setAgeGroup(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                    >
                      {["10代", "20代", "30代", "40代", "50代", "60代", "70代", "80代以上"].map(a => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">性別</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                    >
                      <option value="女性">女性</option>
                      <option value="男性">男性</option>
                      <option value="その他">その他</option>
                      <option value="未回答">未回答</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">来院日</label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                    />
                  </div>
                </div>
              </div>

              {/* 主訴 */}
              <div className="space-y-1">
                <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">
                  主訴・患者のお悩み *
                </label>
                <textarea
                  required
                  rows={2}
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="例: 後頭部から首肩にかけての締め付け感と頭痛。午後や悪天候時に悪化。胃もたれ・不眠を併発。"
                  className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                />
              </div>

              {/* 体質・弁証 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">
                      体質見立て（気血水）
                    </label>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setIsPopModalOpen(true)}
                        className="text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-0.5 font-bold"
                        title="待合室QRコードPOPを印刷"
                      >
                        <QrCode className="w-3 h-3" />
                        <span>待合室POP</span>
                      </button>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <a
                        href="/diagnosis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-0.5"
                      >
                        <span>気血水診断</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <a
                        href="/diagnosis?tab=gorou"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-0.5"
                      >
                        <span>五労チェック</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={constitution}
                    onChange={(e) => setConstitution(e.target.value)}
                    placeholder="例: 気滞・肝気鬱結、瘀血"
                    className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                  />
                  <div className="flex flex-wrap gap-1 pt-1">
                    {CONSTITUTION_TAGS.slice(0, 6).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setConstitution(prev => prev ? `${prev}、${t.split("（")[0]}` : t.split("（")[0])}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-[#E8E1D1] dark:bg-[#263542] text-[#404743] dark:text-[#C5D2DB] hover:bg-[#1E3D34] hover:text-white"
                      >
                        +{t.split("（")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">
                    弁証・病態仮説
                  </label>
                  <input
                    type="text"
                    value={syndrome}
                    onChange={(e) => setSyndrome(e.target.value)}
                    placeholder="例: 肝陽上亢、心腎不交、中気下陥"
                    className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                  />
                  <p className="text-[10px] text-[#737C77] pt-1">
                    八綱弁証や臓腑弁証の仮説を記録しておきます
                  </p>
                </div>
              </div>

              {/* 採用配穴・ツボ */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1">
                    <Bookmark className="w-3.5 h-3.5" />
                    採用配穴・選定ツボ（カンマ区切り）
                  </label>
                  {memos.length > 0 && (
                    <span className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387]">
                      ↓ ストックから引用可能
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={selectedPointsInput}
                  onChange={(e) => setSelectedPointsInput(e.target.value)}
                  placeholder="例: 太衝、陽陵泉、風池、百会"
                  className="w-full p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border-2 border-[#1E3D34]/30 dark:border-[#74BA9E]/30 text-[#232826] dark:text-[#FAF8F5] font-semibold"
                />

                {/* ストックからのクイック引用ピッカー */}
                {memos.length > 0 && (
                  <div className="p-2 rounded-xl bg-[#FCF4EB] dark:bg-[#251A10] border border-[#F3DEC5] dark:border-[#4A321E] space-y-1.5">
                    <span className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] block">
                      【配穴ストックから1クリックで挿入】
                    </span>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                      {memos.map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => handleInsertStockPoints(m)}
                          className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-white dark:bg-[#17212A] border border-[#E8CDB0] text-[#7A4515] dark:text-[#ECC99B] hover:bg-[#B86924] hover:text-white transition-colors"
                        >
                          ＋ {m.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 施術方針・手技メモ */}
              <div className="space-y-1">
                <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">
                  施術方針・手技メモ（刺鍼深度、置針時間、施灸など）
                </label>
                <textarea
                  rows={2}
                  value={treatmentPlan}
                  onChange={(e) => setTreatmentPlan(e.target.value)}
                  placeholder="例: 風池・太衝に1寸3番（寸3-3番）で瀉法。置針15分。関元に温筒灸3壮。"
                  className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                />
              </div>

              {/* 術後反応 ＆ 養生セルフケア */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">
                    術直後の反応・変化
                  </label>
                  <textarea
                    rows={2}
                    value={patientReaction}
                    onChange={(e) => setPatientReaction(e.target.value)}
                    placeholder="例: 首の回旋痛消失。目がパッチリ開き明るくなったと話す。"
                    className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#B86924] dark:text-[#E6C387]">
                    患者向け養生指導・セルフケア（印刷シートに反映）
                  </label>
                  <textarea
                    rows={2}
                    value={nextAction}
                    onChange={(e) => setNextAction(e.target.value)}
                    placeholder="例: 自宅での太衝の指圧、就寝前ホットアイマスク、冷たい飲食を控えること。"
                    className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                  />
                </div>
              </div>

              {/* 保存ボタン */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E1D1] dark:border-[#263542]">
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#737C77] hover:bg-[#E8E1D1] dark:hover:bg-[#263542]"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-[#1E3D34] hover:bg-[#162D26] shadow-md"
                >
                  {editingNoteId ? "ノートを更新する" : "マイノートに保存する"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 自作配穴 追加モーダル */}
      {/* ======================================================== */}
      {isCustomStockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF8F5] dark:bg-[#17212A] w-full max-w-md rounded-2xl border-2 border-[#B86924] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#263542] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                オリジナルの配穴セットを作成
              </h3>
              <button
                type="button"
                onClick={() => setIsCustomStockModalOpen(false)}
                className="p-1 rounded-lg text-[#737C77] hover:bg-[#E8E1D1] dark:hover:bg-[#263542]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomStock} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">配穴セット名 *</label>
                <input
                  type="text"
                  required
                  value={customStockTitle}
                  onChange={(e) => setCustomStockTitle(e.target.value)}
                  placeholder="例: 眼精疲労・緊張性頭痛セット"
                  className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">構成ツボ（カンマ区切り） *</label>
                <input
                  type="text"
                  required
                  value={customStockPoints}
                  onChange={(e) => setCustomStockPoints(e.target.value)}
                  placeholder="例: 風池、太陽、合谷、太衝"
                  className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">主属性（五行）</label>
                  <select
                    value={customStockElement}
                    onChange={(e) => setCustomStockElement(e.target.value as any)}
                    className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                  >
                    <option value="木">木行（肝・胆・筋）</option>
                    <option value="火">火行（心・小腸・神）</option>
                    <option value="土">土行（脾・胃・肌肉）</option>
                    <option value="金">金行（肺・大腸・皮毛）</option>
                    <option value="水">水行（腎・膀胱・骨）</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">主な適応</label>
                  <input
                    type="text"
                    value={customStockSummary}
                    onChange={(e) => setCustomStockSummary(e.target.value)}
                    placeholder="例: 目の疲れ、肩こり、頭重感"
                    className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#404743] dark:text-[#C5D2DB]">解説・作用機序メモ</label>
                <textarea
                  rows={2}
                  value={customStockNote}
                  onChange={(e) => setCustomStockNote(e.target.value)}
                  placeholder="例: 合谷と太衝で開四関を行い、風池と太陽で頭部鬱血を散らす黄金セット。"
                  className="w-full p-2 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8E1D1] dark:border-[#263542]">
                <button
                  type="button"
                  onClick={() => setIsCustomStockModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#737C77]"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#B86924] hover:bg-[#975319]"
                >
                  配穴ストックに保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 患者向け養生シート A4印刷プレビューモーダル */}
      {/* ======================================================== */}
      {printNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white text-black w-full max-w-3xl rounded-2xl shadow-2xl p-8 my-8 space-y-6 max-h-[92vh] overflow-y-auto print:p-0 print:m-0 print:shadow-none print:w-full">
            {/* 画面用操作バー（印刷時には非表示） */}
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#1E3D34] text-white text-xs font-bold">
                  印刷プレビュー
                </span>
                <span className="text-xs text-gray-500">
                  患者さんに手渡しできるA4サイズのセルフケア養生シートです
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
              {/* シートヘッダー */}
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

              {/* 1. 本日のお悩み・主訴 */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-l-4 border-emerald-800 pl-2">
                  【本日のお悩み・主訴】
                </h4>
                <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-900 font-semibold leading-relaxed">
                  {printNote.chiefComplaint}
                </div>
              </div>

              {/* 2. 東洋医学的なお体の見立て（体質タイプ） */}
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

              {/* 3. ご自宅でケアできる特効ツボ */}
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

              {/* 4. 生活養生・食養生のアドバイス */}
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

      {/* ======================================================== */}
      {/* 待合室用 QRコード案内POP A4印刷モーダル */}
      {/* ======================================================== */}
      {isPopModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white text-black w-full max-w-3xl rounded-2xl shadow-2xl p-6 sm:p-8 my-8 space-y-6 max-h-[92vh] overflow-y-auto print:p-0 print:m-0 print:shadow-none print:w-full">
            {/* 画面用操作バー（印刷時は非表示） */}
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#1E3D34] text-white text-xs font-bold">
                  待合室・受付POP
                </span>
                <span className="text-xs text-gray-500">
                  受付や待合室、施術ベッド横にそのまま立てて置けるA4縦サイズの案内シートです
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
                  onClick={() => setIsPopModalOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* A4 POP本体（印刷用レイアウト） */}
            <div className="p-6 sm:p-10 border sm:border-2 border-emerald-900/40 rounded-2xl space-y-6 font-sans text-center bg-gradient-to-b from-[#FAF8F5] to-white">
              {/* ロゴとヘッダー */}
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

              {/* 中央QRコード */}
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

              {/* 診断でわかる2つのこと */}
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

              {/* 施術者への提示アナウンス */}
              <div className="p-3.5 rounded-xl bg-emerald-900 text-white text-xs font-bold tracking-wide shadow-sm max-w-xl mx-auto space-y-1">
                <p className="text-sm">
                  ★ 診断結果が出ましたら、問診時に担当の先生にお見せください
                </p>
                <p className="text-[11px] text-emerald-200 font-normal">
                  診断結果をもとに、あなたの本日の体調に最も適したツボ・施術処方を組み立てます。
                </p>
              </div>

              {/* フッタークレジット */}
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
