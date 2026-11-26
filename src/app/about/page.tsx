import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { AUTHOR_OPENED_AT } from "@/config/author";
import { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import Image from "next/image";
import { Sparkles, ShieldCheck, ArrowRight, BookOpen, GraduationCap, Stethoscope } from "lucide-react";
import { getArticlePreviews } from "@/data/articleData";

const pageTitle = seriesPageTitle("はり太郎の運営者・資格・編集方針", "reading");
const pageDescription = "ツボ図鑑・東洋医学・臨床演習を運営する鍼灸師の資格と、出典や教材の確認状況をご案内します。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/about",
  },
  ...pageSocialMetadata(pageTitle, pageDescription, "/about"),
};

export default function AboutPage() {
  const [comparisonArticle] = getArticlePreviews(["east-west-integrative-unified-theory"]);
  return (
    <div className="about-page page-layout space-y-8 sm:space-y-12">
      <PageIntro title="はり太郎について" description="誰が、どんな資料をもとに教材を作っているかを紹介します。" art="about">
        <div className="page-actions">
          <Link href="/learn" className="page-primary-action"><BookOpen size={18} aria-hidden="true" />学び方を選ぶ<ArrowRight size={18} aria-hidden="true" /></Link>
          <a href="#about-operator" className="page-secondary-action">執筆・運営者</a>
        </div>
      </PageIntro>

      <section aria-labelledby="about-review-scope" className="space-y-3 rounded-2xl border border-[#C5DED4] dark:border-[#2A5243] bg-[#EBF3EF] dark:bg-[#182823] p-4 sm:p-6">
        <h2 id="about-review-scope" className="text-lg font-bold text-[#1E3D34] dark:text-[#74BA9E]">鍼灸師がつくる学習サイト</h2>
        <p className="text-base leading-relaxed text-[#404743] dark:text-[#C5D2DB]">
          ツボの位置を図で確かめ、東洋医学の用語を身近な例から学べます。
        </p>
        <Link href="/editorial-policy" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1E3D34] dark:text-[#83BEA8] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">
          出典の確認範囲と編集方針を見る<ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      {/* 運営者と制作理念 */}
      <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-12 shadow-sm space-y-6 sm:space-y-8 transition-colors">
        {/* 執筆・運営者：はり太郎について */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h2 id="about-operator" className="scroll-mt-28 text-lg sm:text-2xl font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              執筆・運営者
            </h2>
          </div>

          <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl sm:rounded-3xl border border-[#E8E1D1] dark:border-[#22303D] p-3.5 sm:p-8 space-y-4 sm:space-y-6">
            {/* プロフィールヘッダー */}
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border-b border-[#E8E1D1] dark:border-[#263542] pb-6">
              <Image
                src="/icon.png"
                alt="はり太郎"
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm border border-[#D5CCBC] dark:border-[#2A3B4A] shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    はり太郎
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-sm font-bold">
                    鍼灸師／鍼灸院院長
                  </span>
                </div>
                <p className="text-sm sm:text-sm font-semibold text-[#B86924] dark:text-[#E6C387]">
                  2017年にはり師・きゅう師免許を取得し、{AUTHOR_OPENED_AT}に開業しました。身体ケアと臨床の現場で通算10年以上の経験があります。
                </p>
                <p className="text-sm sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed pt-1">
                  鍼灸専門学校を卒業後、鍼灸接骨院、リラクゼーション、デイサービスで働きました。現在は鍼灸院を運営しながら、一人でこのサイトの資料調査、執筆、開発を行っています。
                </p>
              </div>
            </div>

            {/* 臨床思考と執筆姿勢 */}
            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                所見から考え、経過を見て確かめる
              </h4>
              <p className="text-sm sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                たとえば同じ「肩が痛い」でも、いつ始まったか、腕をどこまで上げると痛むかで、次に聞くことが変わります。教材の模擬症例でも、書かれていることを拾い、まだ聞いていないことを分けて考えます。
              </p>
              <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2 sm:space-y-2.5">
                <p className="text-sm sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  模擬症例で確かめること
                </p>
                <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  症例を読んだら、症状の経過、本人が困っている動作、見立ての理由を記録します。後から情報が加わったら、最初の考えを見直します。
                </p>
                <ul className="text-sm text-[#404743] dark:text-[#C5D2DB] space-y-1 list-disc list-inside">
                  <li>いつ始まり、どの動作や時間帯で変わるか</li>
                  <li>痛みの範囲と、しびれなど一緒に出た症状</li>
                  <li>考えた候補に合う所見と、まだ分からないこと</li>
                  <li>次回に同じ動作を比べたとき、何が変わったか</li>
                </ul>
              </div>
            </div>

            {/* 執筆・運営体制と編集方針 */}
            <div className="space-y-4 pt-4 border-t border-[#E8E1D1] dark:border-[#263542]">
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                参照資料と訂正の窓口
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
                  <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                    主に参照する資料
                  </span>
                  <ul className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed space-y-1 list-disc list-inside">
                    <li><strong>経穴・経絡・基礎理論：</strong>WHO標準経穴部位、はり師きゅう師養成標準教科書、主要古典（『黄帝内経』『難経』『甲乙経』等）</li>
                    <li><strong>現代医学・自然科学：</strong>PubMed収載の査読論文、公的機関の診療ガイドライン</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                      誤りの訂正
                    </span>
                    <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                      内容の誤りや誤字は、該当ページと記述を添えてお知らせください。出典を確認し、訂正した内容を記録します。
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="page-primary-action"
                    >
                      <span>お問い合わせフォームへ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            このサイトを作った理由
          </h2>
          <p className="text-sm sm:text-base text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
            東洋医学には、陰陽・五行・気・血・津液（気血水）など、日常では使わない言葉が多く登場します。初めて学ぶ方が、言葉の意味と使い方を一つずつ確認できるように、このサイトを作りました。
          </p>
          <p className="text-sm sm:text-base text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
            用語を調べたら、講義の確認問題で使い方を振り返れます。臨床演習では架空の相談を読み、どの所見を根拠に答えたかを解答例と比べられます。
          </p>
        </div>

        {/* 3つの編集方針 */}
        <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            教材の書き方
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-sm sm:text-sm">
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5 sm:space-y-2">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block text-sm sm:text-base">専門用語を例で説明する</span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                五行では、木から火へ向かう相生と、木から土へ向かう相剋を、同じ出発点から伸びる矢印で比べます。
              </p>
            </div>
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5 sm:space-y-2">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block text-sm sm:text-base">出典の確認範囲を書く</span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                各教材に資料名と参照箇所を載せています。確認の手順と第三者監修の状況は<Link href="/editorial-policy" className="ui-text-link">編集方針</Link>で確認できます。
              </p>
            </div>
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5 sm:space-y-2">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block text-sm sm:text-base">受診の目安を示す</span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                症状別ガイドでは、受診を急ぐ症状と受診時に伝える内容を示します。ツボ図鑑には、位置と一緒に注意事項を載せます。
              </p>
            </div>
          </div>
        </div>

        {/* 医療上の免責事項 */}
        <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-2 sm:space-y-3 text-sm text-[#59615D] dark:text-[#A0B0BC]">
          <div className="flex items-center gap-2 font-bold text-[#232826] dark:text-[#FAF8F5] text-sm sm:text-sm">
            <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>医療情報に関する免責事項</span>
          </div>
          <p className="leading-relaxed">
            ツボや日々の過ごし方、気血水の体質チェック（学習用）は東洋医学を学ぶための教材です。症状の診断や治療については、医師や鍼灸師に相談してください。
          </p>
          <p className="leading-relaxed">
            突然の激しい痛みや意識の異常があるときは、すぐに119番へ連絡してください。体調が急に悪化したときや、妊娠中に重い症状が出たときは、ツボを押す前に医療機関を受診してください。
          </p>
        </div>

        {/* 目的に合う案内への短い入口 */}
        <section aria-labelledby="about-start-guide" className="space-y-4 border-t border-[#F2ECE0] pt-5 dark:border-[#22303D]">
          <h2 id="about-start-guide" className="font-serif text-xl font-bold text-[#232826] sm:text-2xl dark:text-[#FAF8F5]">目的に合う始め方</h2>
          <p className="text-sm leading-relaxed text-muted">
            <strong>ツボを調べたい方</strong>は、<Link href="/tsubo" className="ui-text-link">ツボ図鑑</Link>で場所や目印を調べられます。頭痛や肩こりなどが気になるときは、<Link href="/symptoms" className="ui-text-link">症状別ガイド</Link>で受診の目安と日常の工夫を読めます。
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#E8E1D1] bg-[#FAF8F5] p-4 sm:p-5 dark:border-[#22303D] dark:bg-[#121920]">
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]"><GraduationCap aria-hidden="true" className="h-5 w-5 shrink-0 text-[#1E2D3D] dark:text-[#7BAAD8]" />鍼灸学生・学び直し</h3>
                <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">講義と確認問題で、東洋医学の用語と関係を基礎から学べます。</p>
              </div>
              <Link href="/learn" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#EAEFF5] px-3 py-2 text-sm font-bold text-[#1E2D3D] hover:bg-[#D8E4F0] dark:bg-[#152331] dark:text-[#7BAAD8] dark:hover:bg-[#1D3247]">学びの総合案内へ<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#E8E1D1] bg-[#FAF8F5] p-4 sm:p-5 dark:border-[#22303D] dark:bg-[#121920]">
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]"><Stethoscope aria-hidden="true" className="h-5 w-5 shrink-0 text-[#1E3D34] dark:text-[#74BA9E]" />鍼灸師・臨床家</h3>
                <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">架空の症例を読み、どの手がかりをもとに見立てを考えたか、解答例と見比べられます。</p>
              </div>
              <Link href="/clinical" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#EBF3EF] px-3 py-2 text-sm font-bold text-[#1E3D34] hover:bg-[#D5E8DE] dark:bg-[#182823] dark:text-[#74BA9E] dark:hover:bg-[#223D32]">臨床演習へ<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#E8E1D1] bg-[#FAF8F5] p-4 sm:p-5 dark:border-[#22303D] dark:bg-[#121920]">
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]"><BookOpen aria-hidden="true" className="h-5 w-5 shrink-0 text-[#B86924] dark:text-[#E6C387]" />古典条文・学術探究</h3>
                <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">古典と研究を、引用元・確認範囲・解釈の限界とともに読めます。</p>
              </div>
              <Link href="/library" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#FCF4EB] px-3 py-2 text-sm font-bold text-[#B86924] hover:bg-[#F7E7D3] dark:bg-[#281E15] dark:text-[#E6C387] dark:hover:bg-[#382B1E]">文献ライブラリへ<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>

        {/* 人体統一理論への導線 */}
        <div className="bg-[#EBF3EF] dark:bg-[#162822] p-3.5 sm:p-6 rounded-2xl border border-[#C5DED4] dark:border-[#2A5243] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              筆者の学習モデルと、研究による検証を区別する
            </span>
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
              {comparisonArticle?.title}
            </h4>
            <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-xl">
              {comparisonArticle?.summary}
            </p>
          </div>
          <Link
            href="/articles/east-west-integrative-unified-theory"
            className="px-5 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#74BA9E] hover:bg-[#162E27] text-white dark:text-[#121920] text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <span>比較と検証の考え方を読む</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 導線 */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/curriculum"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-sm font-semibold hover:bg-[#162E27] dark:hover:bg-[#225345] text-center"
          >
            カリキュラムを読む
          </Link>
          <Link
            href="/tsubo"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#D5CCBC] dark:border-[#2A3B4A] text-[#232826] dark:text-[#E6EFEA] text-sm font-semibold hover:bg-[#FAF8F5] dark:hover:bg-[#1E2B36] text-center"
          >
            経穴データベースを調べる
          </Link>
        </div>
      </div>
    </div>
  );
}
