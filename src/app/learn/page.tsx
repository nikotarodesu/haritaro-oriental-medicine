import { Metadata } from "next";
import Link from "next/link";
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  MapPin, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  FileText,
  Compass
} from "lucide-react";
import EightSystemsRoadmap from "@/components/EightSystemsRoadmap";

export const metadata: Metadata = {
  title: "東洋医学を基礎から学ぶ｜鍼灸学生・学び直し",
  description:
    "陰陽五行から始まる全81講義カリキュラム、国試精選演習、全361穴の経穴辞典、忘却曲線に基づく日々の復習まで。鍼灸学生と学び直しのための東洋医学学習総合案内。",
  alternates: {
    canonical: "https://www.haritaro.jp/learn",
  },
  openGraph: {
    title: "東洋医学を基礎から学ぶ｜鍼灸学生・学び直し｜はり太郎",
    description:
      "陰陽五行から始まる全81講義カリキュラム、国試精選演習、全361穴の経穴辞典、忘却曲線に基づく日々の復習まで。",
    url: "https://www.haritaro.jp/learn",
  },
};

export default function LearnGuidePage() {
  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12 sm:space-y-16">
      {/* 1. ヘッダー ＆ 案内コピー */}
      <section className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] text-xs sm:text-sm font-semibold shadow-2xs">
          <GraduationCap className="w-4 h-4" />
          <span>鍼灸学生・学び直したい方へ</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
          東洋医学を、基礎から体系的に学ぶ。
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-2xl mx-auto">
          用語の丸暗記を脱却し、身体の動態システムとして理解する。
          基礎学習から国試演習、経穴の取穴、日々の復習まで、目的に応じた4つの学び方を用意しています。
        </p>
      </section>

      {/* 2. 4大学習スタート地点 */}
      <section aria-label="学習の開始点" className="space-y-6">
        <div className="text-center sm:text-left border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            目的に合わせて選べる4つの開始点
          </h2>
          <p className="text-xs sm:text-sm text-[#737C77] dark:text-[#8899A6] mt-1">
            今の学習段階や試験時期に合わせて、最適なアプローチから始められます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* 1. 基礎から順に学ぶ */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border-2 border-[#1E2D3D]/20 dark:border-[#7BAAD8]/30 hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  全81講義・8章構成
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#1E2D3D] dark:text-[#7BAAD8] block">
                  基礎学習・学び直し
                </span>
                <h3 className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
                  基礎から順に学ぶ（カリキュラム）
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                陰陽五行、気血水、蔵象学説、病因病機から弁証論治まで。一つひとつの理論がつながるように設計された体系カリキュラムです。
              </p>

              {/* 初めての方向け「まずここから」の推奨講義 */}
              <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] text-xs">
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                  まずここから始めるなら
                </span>
                <p className="text-[#59615D] dark:text-[#A0B0BC]">
                  第1章 陰陽論「第1講：陰陽の起源と基本性質」から読み進めるのがおすすめです。
                </p>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between">
              <Link
                href="/curriculum?lecture=lecture-yinyang-1"
                className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
              >
                第1講を開く →
              </Link>
              <Link
                href="/curriculum"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E2D3D] text-[#FAF8F5] dark:bg-[#7BAAD8] dark:text-[#121920] text-xs font-bold hover:opacity-90 transition-opacity"
              >
                <span>カリキュラム目次へ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 2. 国試に向けて学ぶ */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border-2 border-[#B86924]/20 dark:border-[#E6C387]/30 hover:border-[#B86924] dark:hover:border-[#E6C387] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387]">
                  第30〜33回対応
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#B86924] dark:text-[#E6C387] block">
                  試験対策・頻出論点
                </span>
                <h3 className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
                  国試に向けて学ぶ（国試演習ハブ）
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                東洋医学概論・経絡経穴概論・東洋医学臨床論の頻出過去問。要穴・骨度寸法の特訓ドリルや、苦手な問題だけの集中再挑戦モードも搭載。
              </p>

              <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] text-xs">
                <span className="font-bold text-[#B86924] dark:text-[#E6C387] flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  解説と講義の相互リンク
                </span>
                <p className="text-[#59615D] dark:text-[#A0B0BC]">
                  問題を解いて疑問が残ったら、関連するカリキュラム講義を1クリックで開いて復習できます。
                </p>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between">
              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                科目・回次別フィルター付き
              </span>
              <Link
                href="/kokushi"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B86924] text-white hover:bg-[#96531B] text-xs font-bold transition-all"
              >
                <span>国試ハブを開く</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 3. 経穴を調べる・覚える */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34]/20 dark:border-[#74BA9E]/30 hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  全361穴 収録
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] block">
                  取穴手順・局所解剖
                </span>
                <h3 className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
                  経穴を調べる・覚える（経穴辞典）
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                WHO標準部位、要穴分類、刺鍼深度と解剖学的安全ガイド（気胸・神経血管リスク）。断面図ビューアや2穴比較ツールで視覚的に理解できます。
              </p>

              <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] text-xs">
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5 mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  配穴設計ツールへの追加
                </span>
                <p className="text-[#59615D] dark:text-[#A0B0BC]">
                  覚えたツボを「配穴処方に追加」ボタンで臨床ツールへ送り、処方バランスを試すことができます。
                </p>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between">
              <Link
                href="/tsubo/compare"
                className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
              >
                2穴比較を開く →
              </Link>
              <Link
                href="/tsubo"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E3D34] text-[#FAF8F5] hover:bg-[#2B5A46] text-xs font-bold transition-all"
              >
                <span>経穴辞典を開く</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4. 前回の続き・復習 */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border-2 border-[#B86924]/20 dark:border-[#E6C387]/30 hover:border-[#B86924] dark:hover:border-[#E6C387] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center font-bold">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387]">
                  忘却曲線モデル
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#B86924] dark:text-[#E6C387] block">
                  知識定着・デイリー演習
                </span>
                <h3 className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
                  前回の続き・復習（今日の復習）
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                学んだ講義のチェッククイズを、最適な復習インターバル（翌日・1週間後・1ヶ月後）で日替わり出題。無理なく長期記憶へ定着させます。
              </p>

              <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] text-xs">
                <span className="font-bold text-[#B86924] dark:text-[#E6C387] flex items-center gap-1.5 mb-1">
                  <RotateCcw className="w-3.5 h-3.5" />
                  スキマ時間の3分学習
                </span>
                <p className="text-[#59615D] dark:text-[#A0B0BC]">
                  スマートフォンからいつでもサッと復習でき、学習のブランクを防ぎます。
                </p>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between">
              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                端末内に自動で進捗記録
              </span>
              <Link
                href="/review"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B86924] text-white hover:bg-[#96531B] text-xs font-bold transition-all"
              >
                <span>今日の復習を解く</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 学びから実践へのつながり */}
      <section className="bg-gradient-to-r from-[#FAF8F5] to-[#EBF3EF] dark:from-[#17212A] dark:to-[#13221C] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>学びから臨床実践へのステップ</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
          知識を「覚える」だけで終わらせず、臨床で「考える」道具へ。
        </h2>

        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-3xl">
          はり太郎では、学んだ理論をそのまま臨床ツールで試すことができます。気血水や弁証を学んだら、体質チェックや弁証シミュレーターで推論手順を確かめ、配穴設計で自分の処方を組み立ててみましょう。
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            href="/diagnosis"
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#121920] border border-[#C5DED4] dark:border-[#2A5243] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:border-[#1E3D34] transition-all inline-flex items-center gap-1.5"
          >
            <span>気血水体質チェックを試す</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/simulator"
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#121920] border border-[#C5DED4] dark:border-[#2A5243] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:border-[#1E3D34] transition-all inline-flex items-center gap-1.5"
          >
            <span>弁証シミュレーターを試す</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/clinical"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] transition-colors inline-flex items-center gap-1"
          >
            <span>鍼灸師向け臨床ツール案内を見る →</span>
          </Link>
        </div>
      </section>

      {/* 4. 全8章ロードマップ */}
      <section className="space-y-4">
        <div className="border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            全8章カリキュラムの全体像
          </h2>
          <p className="text-xs sm:text-sm text-[#737C77] dark:text-[#8899A6] mt-0.5">
            各章をクリックすると講義一覧へ直接移動できます。
          </p>
        </div>
        <EightSystemsRoadmap />
      </section>
    </div>
  );
}
