import Link from "next/link";
import { 
  GraduationCap, 
  Compass, 
  Layers, 
  BookOpen, 
  HeartPulse, 
  Stethoscope, 
  Activity, 
  ArrowRight, 
  Sparkles, 
  SlidersHorizontal,
  Crown,
  Bell
} from "lucide-react";
import SeasonalBanner from "@/components/SeasonalBanner";
import HomeLearningProgressCard from "@/components/HomeLearningProgressCard";
import PrimeStudentCard from "@/components/PrimeStudentCard";
import EightSystemsRoadmap from "@/components/EightSystemsRoadmap";
import { isSubscriptionSalesEnabled } from "@/config/subscription";

export default function HomePage() {
  const subscriptionActive = isSubscriptionSalesEnabled();

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* 1. ヒーロー（見出し、サイト趣旨、上下余白を縮小） */}
      <section className="relative overflow-hidden washi-pattern border-b border-[#E8E1D1] dark:border-[#22303D] pt-6 sm:pt-10 pb-8 sm:pb-12 transition-colors duration-300">
        <div className="absolute -top-28 -right-28 w-96 h-96 rounded-full bg-[#EBF3EF]/60 dark:bg-[#1E3D34]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-[#FCF4EB]/60 dark:bg-[#B86924]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative space-y-6 sm:space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
            {/* 対象者バッジ */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>鍼灸学生・鍼灸師のための学習サイト</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-[1.25]">
              東洋医学が、<br className="hidden sm:inline" />
              <span className="text-[#1E3D34] dark:text-[#74BA9E] relative">
                つながる
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#E6C387]/35 dark:bg-[#E6C387]/20 -z-10" />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#4A534F] dark:text-[#A8B8C4] leading-relaxed max-w-2xl mx-auto">
              陰陽・五行から、弁証・治療まで。<br className="hidden sm:inline" />
              ひとつずつ理解して、考える力へ。
            </p>
          </div>

          {/* 2. 学習進捗カード（未受講なら「最初のレッスンを始める」、受講中なら「第〇章 〇〇を続ける」） */}
          <div className="max-w-4xl mx-auto">
            <HomeLearningProgressCard />
          </div>

          {/* 3. 三つの主要入口（学ぶ・調べる・演習） */}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 max-w-6xl mx-auto">
            {/* 1. 学ぶ (LEARN) */}
            <Link
              href="/curriculum"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E3D34]/20 dark:border-[#74BA9E]/25 hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-[#1E3D34] dark:text-[#74BA9E]">
                    <GraduationCap className="w-5 h-5 shrink-0" />
                    <span className="text-base sm:text-lg font-bold font-serif">
                      体系的に学ぶ
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                    LEARN
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                  東洋医学8大体系
                </h3>

                <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  陰陽・五行・気血水から病機・診断・治法・実践まで全71レッスン。暗記を排し、動的な病態を捉える思考の土台を築きます。
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <span>公開71レッスンのカリキュラムへ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 2. 調べる (SEARCH) */}
            <Link
              href="/tsubo"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E2D3D]/20 dark:border-[#7BAAD8]/25 hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-[#1E2D3D] dark:text-[#7BAAD8]">
                    <Compass className="w-5 h-5 shrink-0" />
                    <span className="text-base sm:text-lg font-bold font-serif">
                      経穴を調べる
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8]">
                    SEARCH
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E2D3D] dark:group-hover:text-[#7BAAD8] transition-colors">
                  十四経脈・経穴辞典
                </h3>

                <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  正経十二経と任脈・督脈の全361穴（詳細解説32穴対応）。取穴部位、解剖学的指標、骨度法、主治効能から臨床配穴まで検索。
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs sm:text-sm font-bold text-[#1E2D3D] dark:text-[#7BAAD8]">
                <span>十四経脈・経穴辞典へ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 3. 演習 (PRACTICE) */}
            <Link
              href="/cases"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#B86924]/20 dark:border-[#E6C387]/25 hover:border-[#B86924] dark:hover:border-[#E6C387] p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-[#B86924] dark:text-[#E6C387]">
                    <Stethoscope className="w-5 h-5 shrink-0" />
                    <span className="text-base sm:text-lg font-bold font-serif">
                      臨床症例で考える
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A1D12] text-[#B86924] dark:text-[#E6C387]">
                    PRACTICE
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors">
                  臨床症例演習（全20例）
                </h3>

                <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  四診所見から八綱 ➜ 臓腑 ➜ 証 ➜ 配穴へと考えるステップ演習。知識を現場で使える臨床推論として定着させます。
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs sm:text-sm font-bold text-[#B86924] dark:text-[#E6C387]">
                <span>症例演習（無料体験3例）へ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 東洋医学8大体系のロードマップ（コンパクトなステップUI） */}
      <EightSystemsRoadmap />


      {/* 5. 新着・更新情報 */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                新着・更新情報
              </h2>
            </div>
            <span className="text-xs text-[#737C77] dark:text-[#8899A6]">サイト改訂履歴</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">経穴辞典</span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">更新</span>
              </div>
              <p className="font-semibold text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm">
                詳細32穴の精密解剖図・取穴・刺鍼深度・エビデンスを全面検証
              </p>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                標準361穴のソート順・検索機能・クエリ保持を最適化しました。
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-[#FCF4EB] dark:bg-[#2A1D12] text-[#B86924] dark:text-[#E6C387]">カリキュラム</span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">更新</span>
              </div>
              <p className="font-semibold text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm">
                公開中71レッスンの学習ゴール・目次構成を整理
              </p>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                陰陽論から実践論まで、各レッスンの狙いと要点をスムーズに把握できます。
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8]">症例演習</span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">公開中</span>
              </div>
              <p className="font-semibold text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm">
                臨床推論ステップ演習（全20症例・無料体験3症例）
              </p>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                四診所見から証名の導出、最小配穴設計までの臨床思考を追体験できます。
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-[#FAF8F5] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] border border-[#C5DED4]">比較機能</span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">機能強化</span>
              </div>
              <p className="font-semibold text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm">
                2穴横並び比較ツールの操作性・入れ替え機能を向上
              </p>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                左右の経穴入れ替えや取穴部位の比較がより直感的に行えます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 学生向け学習・専門書購入サポート（Prime Student） */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <PrimeStudentCard variant="banner" />
      </section>

      {/* 6. 運営者（はり太郎院長）と情報公開方針 */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* 運営者情報 */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
                Operator Profile
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                運営者：はり太郎（鍼灸師）
              </h3>
              <p className="text-xs sm:text-sm text-[#4A534F] dark:text-[#A8B8C4] leading-relaxed">
                東洋医学の学習において、多くの学習者が「用語の丸暗記」や「点としての知識」に留まり、臨床現場での応用で壁にぶつかります。
                haritaro.jp は、なぜその経穴を選ぶのか、どう病態を推論するのかという「人体の構造と思考体系」を初学者から臨床家まで直感的に学べる場を目指して制作しています。
              </p>
            </div>

            {/* 情報公開方針・信頼性 */}
            <div className="space-y-3 p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D]">
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider">
                Editorial Policy & Evidence
              </span>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                情報公開方針とエビデンス
              </h4>
              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                WHO標準経穴部位、新版東洋医学概論・経絡経穴概論（医道の日本社等）、中医基礎理論、および国内外の査読付き学術論文を参照・整合性確認を行っています。
              </p>
              <div className="pt-1 text-[11px] text-[#737C77] dark:text-[#8899A6] border-t border-[#E8E1D1] dark:border-[#22303D]">
                ※当サイトの学習コンテンツおよびシミュレーターは医学教育・臨床推論の学習支援を目的としており、個別診断や医療行為を代替するものではありません。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 会員案内（現在は準備中バナー、または無料登録案内） */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1E3D34] to-[#2D5A46] text-[#FAF8F5] rounded-2xl p-5 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[#E6C387] text-xs font-semibold">
                <Crown className="w-3.5 h-3.5" />
                <span>{subscriptionActive ? "プレミアムプランのご案内" : "無料登録 ＆ プレミアム準備中"}</span>
              </div>
              <h3 className="font-serif text-lg sm:text-2xl font-bold tracking-tight">
                {subscriptionActive
                  ? "臨床思考をさらに深めるプレミアム機能"
                  : "まずは無料登録で、学習ノートと基礎講義を活用"}
              </h3>
              <p className="text-xs sm:text-sm text-[#D3DFDA] leading-relaxed">
                {subscriptionActive
                  ? "全20症例の完全解放、大容量学習ノート保存、配穴練習、奇経八脈SVG図、3穴比較ツールをご利用いただけます。"
                  : "現在はすべての基本カリキュラム・経穴辞典・無料症例演習・学習ノートをご利用いただけます。プレミアム機能の有料申込は現在準備中です。"}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#E6C387] hover:bg-[#DFC07D] text-[#1E3D34] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <span>プラン詳細・機能一覧を見る</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 一般向けセルフケア入口（下部に控えめに配置） */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5">
        <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-6 sm:pt-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] tracking-widest uppercase">
              Self Care & Health
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              日常のセルフケア・体質チェック
            </h2>
          </div>
          <Link
            href="/diagnosis"
            className="text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
          >
            <span>体質診断へ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 二十四節気バナー */}
        <SeasonalBanner />

        {/* 気血水セルフ診断 ＆ 五労チェッカー ＆ 症状別 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <Link
            href="/diagnosis"
            className="p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] transition-all group space-y-1.5"
          >
            <div className="flex items-center gap-2 text-[#1E3D34] dark:text-[#74BA9E]">
              <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <h3 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                気血水 体質診断
              </h3>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              気虚・気滞・瘀血などの傾きと、日常生活や食養生のヒントをチェック。
            </p>
          </Link>

          <Link
            href="/diagnosis?tab=gorou"
            className="p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] transition-all group space-y-1.5"
          >
            <div className="flex items-center gap-2 text-[#1E3D34] dark:text-[#74BA9E]">
              <Activity className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <h3 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                五労チェッカー
              </h3>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              久視・久臥・久坐など、日常生活の使いすぎによる五臓への負担を点検。
            </p>
          </Link>

          <Link
            href="/symptoms"
            className="p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] transition-all group space-y-1.5"
          >
            <div className="flex items-center gap-2 text-[#1E3D34] dark:text-[#74BA9E]">
              <HeartPulse className="w-4 h-4 text-[#A83629] dark:text-[#E6C387]" />
              <h3 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                症状別セルフケア
              </h3>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              肩こり・頭痛・冷え・不眠など、よくある不調へのツボ押しケアガイド。
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

