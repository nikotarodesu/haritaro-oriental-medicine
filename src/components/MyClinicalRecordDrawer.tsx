"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  X, 
  Bookmark, 
  Trash2, 
  Copy, 
  Check, 
  Plus, 
  Search, 
  Sparkles, 
  Share2, 
  BookOpen, 
  ChevronRight, 
  Edit3, 
  Lock,
  Download,
  AlertCircle
} from "lucide-react";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { ClinicalMemoItem, ClinicalMemoType } from "@/types/clinicalMemo";
import GogyoBadge from "@/components/GogyoBadge";

export default function MyClinicalRecordDrawer() {
  const { 
    memos, 
    clipCount, 
    isDrawerOpen, 
    closeDrawer, 
    removeMemo, 
    updatePersonalNote, 
    clearAllMemos, 
    loadRecommendedPresets,
    lastToast,
    dismissToast
  } = useClinicalMemo();

  const [activeTab, setActiveTab] = useState<"all" | ClinicalMemoType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [allCopied, setAllCopied] = useState(false);
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  // 新規メモ作成フォーム
  const [customTitle, setCustomTitle] = useState("");
  const [customPoints, setCustomPoints] = useState("");
  const [customElement, setCustomElement] = useState<"木" | "火" | "土" | "金" | "水">("木");
  const [customSummary, setCustomSummary] = useState("");
  const [customNote, setCustomNote] = useState("");

  const { addMemo } = useClinicalMemo();

  // 背景スクロール抑止
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // ESCキーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // フィルタリング
  const filteredMemos = useMemo(() => {
    return memos.filter(item => {
      const matchTab = activeTab === "all" || item.type === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.subTitle && item.subTitle.toLowerCase().includes(q)) ||
        item.points.some(p => p.toLowerCase().includes(q)) ||
        item.indications.some(i => i.toLowerCase().includes(q)) ||
        item.summary.toLowerCase().includes(q) ||
        (item.personalNotes && item.personalNotes.toLowerCase().includes(q));

      return matchTab && matchQuery;
    });
  }, [memos, activeTab, searchQuery]);

  // 個別テキストコピー
  const handleCopySingle = (item: ClinicalMemoItem) => {
    const text = `【${item.title}】${item.subTitle ? " - " + item.subTitle : ""}
■ 配穴・ツボ: ${item.points.join("、 ")}
■ 五行: ${item.elements.join("・")}
■ 主治・適応: ${item.indications.join("、 ")}
■ 臨床要点: ${item.summary}
${item.mechanism ? `■ 作用機序: ${item.mechanism}\n` : ""}${item.personalNotes ? `■ 臨床個人メモ: ${item.personalNotes}\n` : ""}`;

    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 全件テキストコピー（カルテ記録・学習ノート用）
  const handleCopyAll = () => {
    if (memos.length === 0) return;
    const lines = [
      "========================================",
      " はり太郎の東洋医学 | マイカルテ・マイ要穴集",
      ` 出力日時: ${new Date().toLocaleString("ja-JP")}`,
      ` 保存件数: ${memos.length}件`,
      "========================================\n",
    ];

    memos.forEach((item, idx) => {
      lines.push(`【${idx + 1}. ${item.title}】${item.subTitle ? " - " + item.subTitle : ""}`);
      lines.push(`・種別: ${item.type === "pair" ? "重要配穴" : item.type === "tsubo" ? "単穴" : item.type === "diagnosis" ? "診断要点" : "自作メモ"}`);
      lines.push(`・配穴・ツボ: ${item.points.join("、 ")}`);
      lines.push(`・五行: ${item.elements.join("・")}`);
      lines.push(`・主治: ${item.indications.join("、 ")}`);
      lines.push(`・要点: ${item.summary}`);
      if (item.mechanism) lines.push(`・機序: ${item.mechanism}`);
      if (item.personalNotes) lines.push(`・臨床個人メモ: ${item.personalNotes}`);
      lines.push("----------------------------------------");
    });

    navigator.clipboard.writeText(lines.join("\n"));
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2500);
  };

  // 自作メモの登録
  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    addMemo({
      id: `custom-${Date.now()}`,
      type: "custom",
      title: customTitle.trim(),
      subTitle: "オリジナル臨床メモ",
      points: customPoints ? customPoints.split(/[,、\s]+/).filter(Boolean) : [],
      elements: [customElement],
      indications: [],
      summary: customSummary.trim() || "独自作成の臨床知見",
      personalNotes: customNote.trim(),
    });

    setCustomTitle("");
    setCustomPoints("");
    setCustomSummary("");
    setCustomNote("");
    setIsAddingCustom(false);
  };

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex justify-end animate-fadeIn">
      {/* オーバーレイ背景 */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
      />

      {/* スライドイン ドロワー本体 */}
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#10161C] h-full shadow-2xl flex flex-col border-l border-[#E5DEC9] dark:border-[#2A3B4A] z-10 animate-slideLeft">
        
        {/* ヘッダーエリア */}
        <div className="p-4 sm:p-5 border-b border-[#E5DEC9] dark:border-[#2A3B4A] bg-white dark:bg-[#17212A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCF4EB] dark:bg-[#2C1E14] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 border border-[#F3DEC5] dark:border-[#4D331F]">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                  マイカルテ・マイ要穴集
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-[#B86924] text-white">
                  {clipCount}件
                </span>
              </div>
              <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] flex items-center gap-1.5 mt-0.5">
                <Lock className="w-3 h-3 text-[#10B981]" />
                ブラウザ内（ローカルストレージ）完全プライベート保存
              </p>
            </div>
          </div>

          <button
            onClick={closeDrawer}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#737C77] dark:text-[#8899A6] hover:bg-[#FAF8F5] dark:hover:bg-[#1E2B36] hover:text-[#232826] dark:hover:text-[#FAF8F5] transition-colors"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* コントロールバー（検索・タブ・一括アクション） */}
        <div className="p-3 sm:p-4 bg-[#F2EDE4]/60 dark:bg-[#151D25] border-b border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
          {/* 検索入力 */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8A948F] dark:text-[#6A7C8B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="保存したツボ名、症状、配穴、メモから検索..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-[#1A2530] border border-[#D5CCBC] dark:border-[#2D3E50] text-[#232826] dark:text-[#FAF8F5] placeholder-[#8A948F] focus:outline-none focus:border-[#B86924]"
            />
          </div>

          {/* 種別タブ */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
            <div className="flex items-center gap-1">
              {[
                { id: "all", label: `すべて (${memos.length})` },
                { id: "pair", label: `重要配穴 (${memos.filter(m => m.type === "pair").length})` },
                { id: "tsubo", label: `単穴 (${memos.filter(m => m.type === "tsubo").length})` },
                { id: "diagnosis", label: `診断要点 (${memos.filter(m => m.type === "diagnosis").length})` },
                { id: "custom", label: `自作メモ (${memos.filter(m => m.type === "custom").length})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-2.5 py-1 rounded-lg font-medium shrink-0 transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#B86924] text-white"
                      : "bg-white dark:bg-[#1A2530] text-[#59615D] dark:text-[#96A6B2] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#FAF8F5]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* アクションボタン（全件コピー・新規作成・全件消去） */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60 text-xs">
            <button
              onClick={() => setIsAddingCustom(!isAddingCustom)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>自作メモを追加</span>
            </button>

            <div className="flex items-center gap-2">
              {memos.length > 0 && (
                <>
                  <button
                    onClick={handleCopyAll}
                    title="保存中の全メモをテキスト形式でクリップボードにコピー"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1A2530] text-[#232826] dark:text-[#FAF8F5] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#FAF8F5] transition-colors"
                  >
                    {allCopied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{allCopied ? "コピー完了" : "全件テキスト出力"}</span>
                  </button>
                  <button
                    onClick={clearAllMemos}
                    title="全件消去"
                    className="p-1.5 rounded-lg text-[#DC2626] hover:bg-[#FEE2E2] dark:hover:bg-[#3B1717] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 自作メモ作成フォーム（開閉式） */}
        {isAddingCustom && (
          <form onSubmit={handleCreateCustom} className="p-4 bg-[#FFFBEB] dark:bg-[#201B12] border-b border-[#FDE68A] dark:border-[#42361B] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#B86924] dark:text-[#F59E0B]">新しい臨床メモの登録</span>
              <button
                type="button"
                onClick={() => setIsAddingCustom(false)}
                className="text-xs text-[#737C77] hover:underline"
              >
                キャンセル
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                value={customTitle}
                onChange={e => setCustomTitle(e.target.value)}
                placeholder="処方名・タイトル（例: 頑固な首こり即効配穴）*"
                required
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]"
              />
              <input
                type="text"
                value={customPoints}
                onChange={e => setCustomPoints(e.target.value)}
                placeholder="使用ツボ（例: 風池、天柱、太衝）"
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]"
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#737C77] dark:text-[#8899A6]">五行属性:</span>
              {(["木", "火", "土", "金", "水"] as const).map(el => (
                <button
                  key={el}
                  type="button"
                  onClick={() => setCustomElement(el)}
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    customElement === el
                      ? "bg-[#232826] text-white dark:bg-white dark:text-[#10161C]"
                      : "bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]"
                  }`}
                >
                  {el}
                </button>
              ))}
            </div>
            <textarea
              value={customSummary}
              onChange={e => setCustomSummary(e.target.value)}
              placeholder="臨床の要点・作用機序（例: 後頭下筋群の過緊張を緩め、肝気を降気させる）"
              rows={2}
              className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]"
            />
            <textarea
              value={customNote}
              onChange={e => setCustomNote(e.target.value)}
              placeholder="自分用の臨床メモ（例: ◯◯さんへの施術で右側強刺激が著効）"
              rows={2}
              className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#B86924] text-white text-xs font-bold hover:bg-[#9B551B] transition-colors"
              >
                マイカルテに登録
              </button>
            </div>
          </form>
        )}

        {/* リスト表示エリア */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {filteredMemos.length === 0 ? (
            <div className="text-center py-12 space-y-4 bg-white dark:bg-[#17212A] rounded-2xl border border-dashed border-[#D5CCBC] dark:border-[#2D3E50] p-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FCF4EB] dark:bg-[#2C1E14] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center">
                <Bookmark className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {searchQuery || activeTab !== "all"
                    ? "該当するメモが見つかりませんでした"
                    : "マイカルテ・マイ要穴集に保存されたメモがありません"}
                </h3>
                <p className="text-xs text-[#737C77] dark:text-[#8899A6] max-w-sm mx-auto leading-relaxed">
                  各ツボの解説カード、診断結果、名配穴の横にある「マイカルテに保存」ボタンを押すと、ここにあなただけの要穴集が蓄積されます。
                </p>
              </div>

              {!searchQuery && activeTab === "all" && (
                <div className="pt-2">
                  <button
                    onClick={loadRecommendedPresets}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B86924] text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-[#9B551B] transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>おすすめ重要名配穴（太衝＋陽陵泉など8組）を一括登録</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            filteredMemos.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-5 shadow-2xs hover:border-[#B86924] dark:hover:border-[#E6C387] transition-all space-y-3 group"
              >
                {/* カード上部：種別バッジ・五行・アクションボタン */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#737C77] dark:text-[#8899A6]">
                      {item.type === "pair"
                        ? "重要配穴"
                        : item.type === "tsubo"
                        ? "単穴"
                        : item.type === "diagnosis"
                        ? "診断要点"
                        : "自作メモ"}
                    </span>
                    {item.elements && item.elements.map(el => (
                      <GogyoBadge key={el} target={el} size="sm" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopySingle(item)}
                      title="このメモのテキストをコピー"
                      className="p-1.5 rounded-lg text-[#737C77] dark:text-[#8899A6] hover:bg-[#FAF8F5] dark:hover:bg-[#202E3C] hover:text-[#B86924] transition-colors"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => removeMemo(item.id)}
                      title="マイカルテから解除"
                      className="p-1.5 rounded-lg text-[#737C77] dark:text-[#8899A6] hover:bg-[#FEE2E2] dark:hover:bg-[#3B1717] hover:text-[#DC2626] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* タイトル ＆ サブタイトル */}
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {item.title}
                  </h3>
                  {item.subTitle && (
                    <p className="text-xs text-[#B86924] dark:text-[#E6C387] font-medium mt-0.5">
                      {item.subTitle}
                    </p>
                  )}
                </div>

                {/* 含まれるツボ一覧 */}
                {item.points && item.points.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.points.map((pt, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-0.8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-medium border border-[#C5DED4] dark:border-[#2A5243]"
                      >
                        {pt}
                      </span>
                    ))}
                  </div>
                )}

                {/* 主治・適応症 */}
                {item.indications && item.indications.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.indications.map((ind, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded bg-[#F2EDE4] dark:bg-[#1E2B36] text-[#404743] dark:text-[#C5D2DB]"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                )}

                {/* 臨床要点・解説 */}
                <p className="text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                  {item.summary}
                </p>

                {item.mechanism && (
                  <div className="bg-[#FAF8F5] dark:bg-[#121920] p-2.5 rounded-xl border border-[#EDE7DB] dark:border-[#22303D] text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                    <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">
                      💡 臨床メカニズム・配穴意図
                    </span>
                    {item.mechanism}
                  </div>
                )}

                {/* ユーザー専用 臨床個人メモ入力欄 */}
                <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[#737C77] dark:text-[#8899A6]">
                    <span className="flex items-center gap-1 font-medium text-[#B86924] dark:text-[#E6C387]">
                      <Edit3 className="w-3 h-3" />
                      私用臨床カルテメモ（自由加筆・自動保存）:
                    </span>
                    <span className="text-[10px]">自動保存</span>
                  </div>
                  <textarea
                    defaultValue={item.personalNotes || ""}
                    onBlur={(e) => updatePersonalNote(item.id, e.target.value)}
                    placeholder="患者さんへの施術効果、自分の体質反応、取穴のコツなどを自由に記録..."
                    rows={2}
                    className="w-full p-2.5 rounded-xl text-xs bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] focus:bg-white dark:focus:bg-[#1A2530] focus:border-[#B86924] text-[#232826] dark:text-[#FAF8F5] placeholder-[#8A948F] transition-colors"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* フッターエリア */}
        <div className="p-3.5 sm:p-4 bg-white dark:bg-[#17212A] border-t border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6]">
          <span>全 {clipCount} 件 保存中</span>
          <button
            onClick={closeDrawer}
            className="px-4 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5] font-medium hover:bg-[#EBF3EF] transition-colors"
          >
            閉じる
          </button>
        </div>

      </div>

      {/* フローティングトースト通知 */}
      {lastToast && (
        <div className="fixed bottom-5 right-5 z-[130] flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#232826] dark:bg-white text-white dark:text-[#232826] shadow-xl text-xs font-medium animate-fadeIn">
          {lastToast.type === "added" ? (
            <Bookmark className="w-4 h-4 text-[#F59E0B] fill-current" />
          ) : (
            <X className="w-4 h-4 text-[#EF4444]" />
          )}
          <span>{lastToast.message}</span>
          <button onClick={dismissToast} className="ml-1 opacity-70 hover:opacity-100">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
