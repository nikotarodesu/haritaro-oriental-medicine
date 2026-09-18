"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  FileText, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  Layers, 
  Search,
  BookOpen,
  HelpCircle,
  GraduationCap
} from "lucide-react";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { CaseDifficulty, CaseCategory } from "@/types/clinicalCase";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

export default function CasesIndexPage() {
  const { isPremium } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | CaseDifficulty>("all");
  const [selectedCategory, setSelectedCategory] = useState<"all" | CaseCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedCaseTitle, setSelectedCaseTitle] = useState("");

  const categories: CaseCategory[] = [
    "自律神経・メンタル",
    "消化器・脾胃",
    "婦人科・女性医学",
    "疼痛・運動器",
    "呼吸器・感染後",
    "皮膚・感覚器",
  ];

  const filteredCases = useMemo(() => {
    return CLINICAL_CASES.filter((c) => {
      const matchDiff = selectedDifficulty === "all" || c.difficulty === selectedDifficulty;
      const matchCat = selectedCategory === "all" || c.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.subTitle.toLowerCase().includes(q) ||
        c.patient.chiefComplaint.toLowerCase().includes(q) ||
        c.correctDiagnosis.pattern.toLowerCase().includes(q);

      return matchDiff && matchCat && matchSearch;
    });
  }, [selectedDifficulty, selectedCategory, searchQuery]);

  const handleCaseClick = (e: React.MouseEvent, c: typeof CLINICAL_CASES[0]) => {
    if (!c.isFreeTrial && !isPremium) {
      e.preventDefault();
      setSelectedCaseTitle(c.title);
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 sm:space-y-12">
      {/* パンくずリスト */}
      <nav className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6]">
        <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E]">ホーム</Link>
        <span>/</span>
        <span className="text-[#232826] dark:text-[#FAF8F5] font-semibold">臨床症例演習</span>
      </nav>

      {/* ヒーローヘッダー */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#F3DEC5] dark:border-[#4D331F] text-[#B86924] dark:text-[#E6C387] text-xs font-semibold tracking-wider">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>全20症例・段階的臨床推論トレーニング</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
          臨床症例演習モード
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          机上の理論から臨床現場の思考へ。主訴・現病歴から四診情報を段階的に開示し、
          八綱 ➜ 弁証 ➜ 治法 ➜ 配穴処方を自分の頭で導き出します。
          全症例に鑑別診断・作用機序・古典根拠の解説付き。
        </p>

        {/* 無料体験案内バナー */}
        <div className="pt-2 flex items-center justify-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-bold border border-[#C5DED4] dark:border-[#2A5243]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>症例 1〜3 は無料会員のまま体験可能</span>
          </span>
          {!isPremium && (
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 text-[#B86924] dark:text-[#E6C387] font-bold hover:underline"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>全20症例を解放する（月額980円）</span>
            </Link>
          )}
        </div>
      </div>

      {/* 絞り込み・検索バー */}
      <div className="bg-[#FAF8F5] dark:bg-[#152028] p-4 sm:p-6 rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* 検索入力 */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737C77] dark:text-[#8899A6]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="症状・証名・キーワードで検索..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] bg-white dark:bg-[#10171F] text-xs text-[#232826] dark:text-[#FAF8F5] focus:outline-hidden focus:border-[#1E3D34] dark:focus:border-[#74BA9E]"
            />
          </div>

          {/* 難易度フィルター */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] shrink-0 mr-1">難易度:</span>
            {(["all", "初級", "中級", "上級"] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedDifficulty === diff
                    ? "bg-[#1E3D34] text-white"
                    : "bg-white dark:bg-[#10171F] border border-[#D8CFC0] dark:border-[#384C5E] text-[#59615D] dark:text-[#8899A6] hover:bg-[#F2EDE2]"
                }`}
              >
                {diff === "all" ? "すべて" : diff}
              </button>
            ))}
          </div>
        </div>

        {/* カテゴリータグ */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] shrink-0 mr-1">領域:</span>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === "all"
                ? "bg-[#B86924] text-white"
                : "bg-white dark:bg-[#10171F] border border-[#D8CFC0] dark:border-[#384C5E] text-[#59615D] dark:text-[#8899A6] hover:bg-[#F2EDE2]"
            }`}
          >
            全領域
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat
                  ? "bg-[#B86924] text-white"
                  : "bg-white dark:bg-[#10171F] border border-[#D8CFC0] dark:border-[#384C5E] text-[#59615D] dark:text-[#8899A6] hover:bg-[#F2EDE2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 症例一覧グリッド */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] px-1">
          <span>表示件数: <strong>{filteredCases.length}</strong> / {CLINICAL_CASES.length} 症例</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.id}`}
              onClick={(e) => handleCaseClick(e, c)}
              className={`group rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 p-5 sm:p-6 flex flex-col justify-between space-y-4 transition-all hover:shadow-lg ${
                c.isFreeTrial 
                  ? "border-[#1E3D34]/30 hover:border-[#1E3D34] dark:border-[#2A5243] dark:hover:border-[#74BA9E]" 
                  : isPremium 
                    ? "border-[#B86924]/30 hover:border-[#B86924] dark:border-[#4D331F] dark:hover:border-[#E6C387]"
                    : "border-[#E5DEC9] dark:border-[#2A3B4A] opacity-90 hover:opacity-100"
              }`}
            >
              <div className="space-y-3">
                {/* ヘッダーバッジ */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#737C77] dark:text-[#8899A6]">
                      症例 {c.caseNumber < 10 ? `0${c.caseNumber}` : c.caseNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.difficulty === "初級" 
                        ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300"
                        : c.difficulty === "中級"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300"
                    }`}>
                      {c.difficulty}
                    </span>
                  </div>

                  {c.isFreeTrial ? (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E] border border-[#C5DED4] dark:border-[#2A5243] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>無料体験</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FCF4EB] text-[#B86924] dark:bg-[#2A2016] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4D331F] flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      <span>プレミアム</span>
                    </span>
                  )}
                </div>

                {/* 領域タグ */}
                <span className="inline-block text-[11px] font-semibold text-[#B86924] dark:text-[#E6C387]">
                  {c.category}
                </span>

                {/* タイトル */}
                <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug">
                  {c.title}
                </h3>

                {/* 主訴プレビュー */}
                <p className="text-xs text-[#59615D] dark:text-[#96A6B2] line-clamp-2 leading-relaxed">
                  「{c.patient.chiefComplaint}」
                </p>
              </div>

              {/* フッター情報 */}
              <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-3.5 flex items-center justify-between text-xs">
                <span className="text-[#737C77] dark:text-[#8899A6]">
                  {c.patient.age}・{c.patient.gender}
                </span>
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>演習を始める</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* プレミアム誘導モーダル */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="この症例はプレミアム会員限定です"
        description={`「${selectedCaseTitle}」を含む17の専門症例の段階的四診開示、推論演習、解説・古典根拠はプレミアム会員限定コンテンツです。`}
      />
    </div>
  );
}
