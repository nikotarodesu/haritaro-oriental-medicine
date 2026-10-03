import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Stethoscope, 
  Compass,
  Layers, 
  Activity, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Printer, 
  History, 
  ShieldCheck, 
  Crown
} from "lucide-react";
import { TOOL_CATALOG } from "@/config/toolCatalog";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";

export const metadata: Metadata = {
  title: "臨床ツール案内｜東洋医学の問診・弁証・配穴・臨床記録",
  description:
    "鍼灸臨床での「調べる・問診する・説明して記録する」を支える臨床ツール一覧。気血水対面問診、弁証推論、配穴設計、患者説明用A4養生シート印刷に対応。",
  alternates: {
    canonical: "https://www.haritaro.jp/clinical",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
    siteName: SITE_NAME,
    title: `臨床ツール案内｜東洋医学の問診・弁証・配穴・臨床記録 | ${SITE_NAME}`,
    description:
      "鍼灸臨床での「調べる・問診する・説明して記録する」を支える臨床ツール一覧。気血水対面問診、弁証推論、配穴設計、患者説明用A4養生シート印刷に対応。",
    url: "https://www.haritaro.jp/clinical",
  },
};

export default function ClinicalLandingPage() {
  const { limits, pricing } = SUBSCRIPTION_CONFIG;

  const faqs = [
    {
      q: "ツールの利用に会員登録や課金は必要ですか？",
      a: "気血水チェック、五労チェッカー、弁証シミュレーター、配穴設計（4穴まで）などの推論ツールは、登録不要ですぐに無料でお使いいただけます。臨床ノートへの保存も無料枠（10件、配穴30件まで）の範囲でご利用いただけます。無料アカウント登録で端末間の自動同期にも対応しています。",
    },
    {
      q: "患者の個人情報はどのように保護されますか？",
      a: "氏名・電話番号・住所の専用入力欄はありません。カルテIDなどの記号を使い、自由記述やメモにも患者さんを特定できる情報を入力しないでください。未ログイン時の記録は利用中のブラウザに保存され、ログイン時は自分のアカウントへの同期に対応します。ノートの本文は保存処理で公開URLに含めません。",
    },
    {
      q: "ツールの結果は診断を確定するものですか？",
      a: "いいえ。本ツール群は鍼灸師の先生が所見を整理し、思考プロセスを記録・点検するための臨床推論支援ツールです。医学的な診断の確定や治療効果を自動保証するものではなく、最終的な配穴判断や施術は施術者ご自身の責任において行われます。",
    },
    {
      q: "プレミアムプランの受付状況はどこで確認できますか？",
      a: "最新の料金と新規申し込みの受付状況は料金ページで確認できます。受付停止中は新規申し込みができません。既存の契約の管理はマイページからご確認ください。",
    },
  ];

  return (
    <div className="min-h-screen py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 sm:space-y-24">
      {/* 1. ヒーロー ＆ 主CTA */}
      <section className="text-center max-w-3xl mx-auto space-y-5 sm:space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs sm:text-sm font-bold shadow-2xs">
          <Stethoscope className="w-4 h-4" />
          <span>鍼灸師・臨床家の方へ</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
          調べるときも、<br className="hidden sm:inline" />
          患者さんへの問診にも。
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-2xl mx-auto">
          経穴や弁証の確認から、患者さんと行う体調・生活習慣のチェック、説明と臨床ノートへの記録まで。鍼灸師の日々の実践を支えるツールです。
        </p>

        {/* 主CTA ＆ 副リンク */}
        <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3.5">
          <a
            href="#tools"
            className="w-full sm:w-auto min-h-11 px-8 py-3.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-[#FAF8F5] text-sm sm:text-base font-bold shadow-sm transition-all inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Activity className="w-4 h-4" />
            <span>問診に使うツールを見る</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <Link
            href="/tsubo"
            className="w-full sm:w-auto min-h-11 px-6 py-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#D8CFC0] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E] text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Compass aria-hidden="true" className="w-4 h-4" />
            <span>経穴を調べる</span>
          </Link>

          <Link
            href="/simulator"
            className="w-full sm:w-auto min-h-11 px-6 py-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#D8CFC0] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E] text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Layers className="w-4 h-4" />
            <span>弁証を検討する</span>
          </Link>
        </div>

        <p className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
          ※回答から状態の傾向を整理する補助ツールです。回答だけで診断や施術方針は確定しません。
        </p>
      </section>

      {/* 2. 臨床での利用場面（誰の何を助けるか） */}
      <section aria-label="臨床での利用場面" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
            Clinical Scenarios
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            このような場面で活用できます
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
              所見を客観的に整理したい
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              気血水の偏りや五労の蓄積をチェックシートで可視化。問診所見の抜け漏れを防ぎ、全体像を速やかに把握できます。
            </p>
          </div>

          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
              配穴の選定理由を残したい
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              なぜその経穴を選んだのか、本治・標治のバランスや兼証への配慮を言語化。感覚だけに頼らない再現性のある配穴を設計できます。
            </p>
          </div>

          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
              前回の考えを振り返りたい
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              施術直後の変化や次回の課題を臨床ノートに蓄積。再来院時に前回の弁証仮説と結果を素早く確認し、方針を最適化できます。
            </p>
          </div>
        </div>
      </section>

      {/* 3. 三段階の使い方 */}
      <section className="bg-gradient-to-r from-[#FAF8F5] to-[#EBF3EF] dark:from-[#17212A] dark:to-[#13221C] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
            Three Steps
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            検討から記録、振り返りまでの3ステップ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-white/90 dark:bg-[#121920]/90 p-5 rounded-2xl border border-[#EDE7D8] dark:border-[#22303D] space-y-2">
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              ステップ1：ツールで検討
            </span>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              弁証シミュレーターで候補・根拠・不足所見を整理し、配穴設計で学習用の組み合わせと選定理由を比較します。
            </p>
          </div>

          <div className="bg-white/90 dark:bg-[#121920]/90 p-5 rounded-2xl border border-[#EDE7D8] dark:border-[#22303D] space-y-2">
            <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              ステップ2：ノートに保存
            </span>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              結果画面からワンクリックで下書き引き渡し。施術直後の変化や考察メモを添えて保存します。
            </p>
          </div>

          <div className="bg-white/90 dark:bg-[#121920]/90 p-5 rounded-2xl border border-[#EDE7D8] dark:border-[#22303D] space-y-2">
            <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] flex items-center gap-1.5">
              <History className="w-4 h-4" />
              ステップ3：次回に振り返る
            </span>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              再来時に患者番号や主訴で検索。前回の仮説と今回の状態を比較し、臨床経験を確実に蓄積します。
            </p>
          </div>
        </div>
      </section>

      {/* 4. 主要4ツール一覧 */}
      <section id="tools" className="scroll-mt-20 space-y-6">
        <div className="border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            臨床で使える主要4ツール
          </h2>
          <p className="text-xs sm:text-sm text-[#737C77] dark:text-[#8899A6] mt-1">
            目的に応じていつでも自由に選べます。順序の制約や必須設定はありません。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* ツール1: 気血水体質チェック */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  状態整理
                </span>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">無料・登録不要</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                気血水体質チェック
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                問診の回答から、気血水の学習上の傾向と関連する養生・経穴情報を整理。診断や個別の施術適応は確定しません。
              </p>
            </div>
            <Link
              href="/diagnosis"
              className="w-full py-2 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-between transition-colors"
            >
              <span>チェックを始める</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* ツール2: 五労チェッカー */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387]">
                  生活負担点検
                </span>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">無料・登録不要</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                五労チェッカー
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                久視・久坐・久立など生活動作の偏りを、五労の伝統的な分類で整理。医学的検査とは区別し、生活習慣を振り返る参考にします。
              </p>
            </div>
            <Link
              href="/diagnosis?tab=gorou"
              className="w-full py-2 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] hover:border-[#B86924] text-xs font-bold text-[#B86924] dark:text-[#E6C387] flex items-center justify-between transition-colors"
            >
              <span>五労を点検する</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* ツール3: 弁証シミュレーター */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34]/30 dark:border-[#74BA9E]/30 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#1E3D34] text-white">
                  主機能
                </span>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">無料・登録不要</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                弁証シミュレーター
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                {TOOL_CATALOG.simulator.description}
              </p>
            </div>
            <Link
              href="/simulator"
              className="w-full py-2 px-3 rounded-xl bg-[#1E3D34] text-white hover:bg-[#2B5A46] text-xs font-bold flex items-center justify-between transition-colors"
            >
              <span>弁証を検討する</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* ツール4: 配穴設計 */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387]">
                  処方バランス
                </span>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">無料・登録不要</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                配穴設計
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                本治穴・標治穴の選定バランスを検証。選定根拠を整理し、臨床ノートへ直接下書き保存。
              </p>
            </div>
            <Link
              href="/practice/haiketsu"
              className="w-full py-2 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] hover:border-[#B86924] text-xs font-bold text-[#B86924] dark:text-[#E6C387] flex items-center justify-between transition-colors"
            >
              <span>配穴を設計する</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. 臨床ノートの保存・再利用例 */}
      <section className="bg-white dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-10 shadow-xs space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1E3D34]/10 text-[#1E3D34] dark:text-[#74BA9E]">
              <FileText className="w-3.5 h-3.5" />
              <span>臨床ノート機能</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
              ツールの出力を、そのまま日々のカルテに活かす
            </h2>

            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              ツールが出力した弁証名や採用経穴を、手動で書き写す必要はありません。「臨床ノートに保存」ボタンを押すだけで、下書きとして自動引き渡しされます。
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                <span>
                  <strong>ツールの出力と本人の考察を分離：</strong>学習用の弁証候補と、ご自身が記入した所見・次回の検討事項を区別して記録。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                <span>
                  <strong>患者用A4養生シート印刷：</strong>患者さんに手渡しできる養生アドバイスと経穴マップをワンクリック印刷。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                <span>
                  <strong>Excel対応CSVエクスポート：</strong>蓄積したカルテをBOM付きUTF-8形式でいつでも手元にバックアップ・集計可能。
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/notes"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E3D34] text-white text-xs font-bold hover:bg-[#2B5A46] transition-all"
              >
                <span>臨床ノート画面を見る</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 右側：記入見本カード */}
          <div className="lg:col-span-6 bg-[#FAF8F5] dark:bg-[#121920] p-5 rounded-2xl border border-[#EDE7D8] dark:border-[#22303D] space-y-3">
            <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 text-xs">
              <span className="font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                ID: PT-042（架空のサンプル）
              </span>
              <span className="text-[#737C77] dark:text-[#8899A6]">2026.03.22</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-white dark:bg-[#17212A] border border-[#EDE7D8] dark:border-[#263542]">
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">弁証</span>
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">肝鬱気滞・脾虚</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-[#17212A] border border-[#EDE7D8] dark:border-[#263542]">
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">兼証</span>
                <span className="font-bold text-[#B86924] dark:text-[#E6C387]">瘀血傾向</span>
              </div>
            </div>
            <div className="text-xs space-y-1">
              <span className="text-[11px] font-bold text-[#59615D] dark:text-[#A0B0BC]">採用経穴</span>
              <div className="flex flex-wrap gap-1.5">
                {["太衝", "足三里", "合谷", "三陰交"].map((pt) => (
                  <span
                    key={pt}
                    className="px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-semibold border border-[#C5DED4] dark:border-[#2A5243]"
                  >
                    {pt}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-2.5 rounded bg-white dark:bg-[#17212A] border border-[#EDE7D8] dark:border-[#263542] text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              <strong>直後の変化：</strong>胸脇苦満が軽減し、呼吸が深くなったと発言。次回は睡眠状態の変化を確認。
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#737C77] dark:text-[#8899A6] pt-1 border-t border-[#F2ECE0] dark:border-[#22303D]">
              <span className="flex items-center gap-1 font-bold text-[#285A52] dark:text-[#6EC5B8]">
                <Printer className="w-3.5 h-3.5" />
                <span>A4養生シート印刷対応</span>
              </span>
              <span>下書き保存・同期に対応</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 無料とプレミアムの違い（SUBSCRIPTION_CONFIG参照） */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
            Plans & Limits
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            無料とプレミアムの範囲
          </h2>
          <p className="text-xs sm:text-sm text-[#737C77] dark:text-[#8899A6]">
            ツールの利用は無料。臨床ノートの保存件数に応じてプランをお選びいただけます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* 無料プラン */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#59615D] dark:text-[#8899A6] uppercase tracking-wider">
                  Free
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-1">
                  無料プラン
                </h3>
                <p className="text-xs text-[#737C77] dark:text-[#8899A6] mt-1">
                  まず手軽にツールを体験したい方に
                </p>
              </div>

              <div className="font-mono text-3xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                ¥0
              </div>

              <div className="space-y-2 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>臨床ツールの基本利用（気血水・五労・弁証・配穴4穴まで）</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>臨床ノート保存（無料枠 最大{limits.freePatientNoteMax}件）</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>配穴ストック保存（無料枠 最大{limits.freeMemoMax}件）</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>無料アカウント登録で端末間クラウド自動同期</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>本日の説明・養生メモA4印刷</span>
                </div>
              </div>
            </div>

            <Link
              href="/simulator"
              className="w-full py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] text-center transition-colors block"
            >
              登録不要ですぐ試す
            </Link>
          </div>

          {/* プレミアムプラン */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34] dark:border-[#74BA9E] p-6 space-y-5 flex flex-col justify-between relative shadow-sm">
            <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-[#1E3D34] text-white text-[11px] font-bold">
              臨床家向け
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5" />
                  Premium
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-1">
                  プレミアム会員
                </h3>
                <p className="text-xs text-[#737C77] dark:text-[#8899A6] mt-1">
                  日々の臨床記録を本格的に蓄積したい方に
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {pricing.monthly.displayPrice}
                </span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                  / 月（年額 {pricing.yearly.displayPrice}・{pricing.yearly.savingLabel}）
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] text-xs">
                <div className="flex items-center gap-2 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>臨床ノート保存（最大{limits.premiumPatientNoteMax}件）</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>配穴ストック保存（最大{limits.premiumMemoMax}件）</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>配穴シミュレーター 5穴以上の高度処方</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>臨床症例演習 全20症例の完全解放</span>
                </div>
              </div>
            </div>

            <Link
              href="/pricing"
              className="w-full py-2.5 rounded-xl bg-[#1E3D34] text-white hover:bg-[#2B5A46] text-xs font-bold text-center transition-colors block shadow-sm"
            >
              プレミアムの詳細・お申し込みへ
            </Link>
          </div>
        </div>
      </section>

      {/* 7. 参照資料・確認状況と支援範囲の説明 */}
      <section className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>参照資料・確認状況とツールの支援範囲</span>
        </div>

        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
          ツールの参照資料と確認範囲
        </h3>

        <div className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed space-y-2.5">
          <p>
            はり太郎の各ツールは、現役の鍼灸院院長が企画・設計し、新版東洋医学概論・経絡経穴概論、WHO標準経穴部位、および中医基礎理論を参考に制作しています。全件の医学記述の照合と専門家による監修は未完了です。
          </p>
          <Link href="/editorial-policy" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#1E3D34] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-[#83BEA8]">出典と確認範囲を見る</Link>
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] text-[11px] sm:text-xs text-[#737C77] dark:text-[#8899A6] space-y-1">
            <p><strong>【支援範囲と限界について】</strong></p>
            <p>
              本ツールは臨床家の思考整理と記録を支援するものであり、特定の疾病の診断確定、治療成績の自動向上、または正解の自動導出を保証するものではありません。患者さんの状態把握や施術方針の決定は、必ず施術者ご自身の責任と四診合参に基づいて行ってください。
            </p>
          </div>
        </div>
      </section>

      {/* 8. よくある質問（FAQ） ＆ 主CTA再掲 */}
      <section className="space-y-6">
        <div className="border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            よくある質問
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#17212A] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2"
            >
              <h3 className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] flex items-start gap-2">
                <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold">Q.</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* 主CTA再掲 */}
        <div className="pt-6 text-center space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
            まずは弁証シミュレーターで、推論手順を体験してみませんか？
          </h3>
          <Link
            href="/simulator"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-[#FAF8F5] text-sm sm:text-base font-bold shadow-md transition-all"
          >
            <Layers className="w-4 h-4" />
            <span>弁証シミュレーターを試す</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
