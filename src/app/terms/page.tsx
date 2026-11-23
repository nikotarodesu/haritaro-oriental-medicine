import { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { ArrowLeft, ShieldAlert, Mail, BookOpen, CircleStop, UserCheck } from "lucide-react";
import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";

const pageTitle = seriesPageTitle("利用規約", "reading");
const pageDescription = "「はり太郎」の利用規約です。無料で利用できるコンテンツ、知的財産権、医療情報の範囲などについて定めています。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  ...pageSocialMetadata(pageTitle, pageDescription, "/terms"),
};

export default function TermsPage() {
  return (
    <div className="page-layout page-layout--reading">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
        {/* パンくず・戻るリンク */}
        <nav aria-label="パンくず" className="flex flex-wrap items-center gap-2 text-sm text-[#737C77] dark:text-[#8899A6]">
          <Link
            href="/"
            className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ホーム</span>
          </Link>
          <span>/</span>
          <span className="text-[#232826] dark:text-[#FAF8F5] font-semibold">
            利用規約
          </span>
        </nav>

        <PageIntro eyebrow="サービスの利用条件" title="利用規約" description="この利用規約は、「はり太郎」（以下「当サイト」）が提供するコンテンツと機能の利用条件を定めています。" art="reading" compact />

        <nav aria-label="このページの目次" className="grid gap-2 sm:grid-cols-2">
            <a href="#policy-section-3" className="page-secondary-action"><UserCheck size={18} aria-hidden="true" />無料で使える範囲</a>
            <a href="#policy-section-6" className="page-secondary-action"><BookOpen size={18} aria-hidden="true" />著作権</a>
            <a href="#policy-section-5" className="page-secondary-action"><CircleStop size={18} aria-hidden="true" />旧サービスのお問い合わせ</a>
            <a href="#policy-section-8" className="page-secondary-action"><ShieldAlert size={18} aria-hidden="true" />医療上の免責</a>
        </nav>

        {/* 本文カード */}
        <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-10 shadow-sm space-y-8 text-[#333835] dark:text-[#C5D2DB] text-sm sm:text-base leading-relaxed transition-colors">
          
          {/* 第1条（適用） */}
          <section id="policy-section-1" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第1条（適用）
            </h2>
            <ol className="list-decimal list-inside pl-2 space-y-1.5">
              <li>本規約は、当サイトのすべての利用者（以下「ユーザー」）と当サイト運営者との間の本サービスの利用に適用されます。</li>
            </ol>
          </section>

          {/* 第2条（定義） */}
          <section id="policy-section-2" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第2条（定義）
            </h2>
            <p>「本サービス」とは、当サイトで提供するツボ図鑑、症状ガイド、東洋医学の記事、体質チェック、症例・配穴などの臨床演習およびその他のウェブコンテンツを指します。</p>
          </section>

          {/* 第3条（利用方法と料金） */}
          <section id="policy-section-3" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第3条（利用方法と料金）
            </h2>
            <ol className="list-decimal list-inside pl-2 space-y-1.5">
              <li>本サービスは会員登録・ログインなしで無料で利用できます。</li>
              <li>インターネット接続にかかる通信料等はユーザーが負担します。</li>
            </ol>
          </section>

          {/* 第4条（広告と個人情報） */}
          <section id="policy-section-4" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第4条（広告と個人情報）
            </h2>
            <p>本サービスの一部には広告を掲載する場合があります。広告配信や個人情報の取り扱いは<Link href="/privacy" className="underline underline-offset-4">プライバシーポリシー</Link>をご覧ください。</p>
          </section>

          {/* 第5条（終了した会員サービス） */}
          <section id="policy-section-5" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第5条（終了した会員サービス）
            </h2>
            <p>旧プレミアムプランとマイノートの提供は終了しました。旧サービスのご利用や過去のお支払いに関するご質問は<Link href="/contact" className="underline underline-offset-4">お問い合わせ</Link>からご連絡ください。</p>
          </section>

          {/* 第6条（知的財産権および著作権） */}
          <section id="policy-section-6" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第6条（知的財産権および著作権）
            </h2>
            <ol className="list-decimal list-inside pl-2 space-y-1.5">
              <li>本サービスを構成するすべてのテキスト、画像、図版、流注図、症例問題、解説文、プログラムコード、商標等の知的財産権は、当サイト運営者または正当な権利者に帰属します。</li>
              <li>ユーザーは、私的使用など法律で明示的に認められた範囲を超えて、これらを無断で複製、公衆送信、改変、転載、再配布、出版、販売等することはできません。</li>
            </ol>
          </section>

          {/* 第7条（禁止事項） */}
          <section id="policy-section-7" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第7条（禁止事項）
            </h2>
            <p>ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
            <ul className="list-disc list-inside pl-2 space-y-1.5 text-[#59615D] dark:text-[#A0B0BC]">
              <li>法令または公序良俗に反する行為</li>
              <li>当サイトのサーバーやネットワークに過度な負荷をかける行為、または運営を妨害する行為</li>
              <li>スクレイピング、クローリング、ボット等の自動化手段による当サイトコンテンツの大量取得・収集行為</li>
              <li>他のユーザー、第三者、または当サイト運営者の著作権、プライバシー権、名誉等の権利を侵害する行為</li>
              <li>リバースエンジニアリング、逆アセンブル等による解析行為</li>
              <li>その他、当サイト運営者が不適切と合理的に判断する行為</li>
            </ul>
          </section>

          {/* 第8条（医療情報の範囲） */}
          <section id="policy-section-8" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>第8条（医療情報の範囲）</span>
            </h2>
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] space-y-2">
              <p className="font-semibold text-[#232826] dark:text-[#FAF8F5]">
                健康に関する情報のご利用にあたって
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-[#404743] dark:text-[#C5D2DB]">
                <li>気血水 体質チェック、弁証の練習、症例演習および各種記事・解説は、東洋医学・鍼灸の理解や学習、日常のセルフケアに役立つ参考情報です。</li>
                <li>当サイトのコンテンツは、医師法第17条に規定される「医行為」（個別の疾患に対する確定診断、治療、投薬・処方等の医療行為）を提供するものではなく、医師や鍼灸師等の専門医療従事者による診断・治療に代わるものではありません。</li>
                <li>急激な体調の悪化、激しい疼痛、重篤な疾患の兆候がある場合は、自己判断による処置を行わず、直ちに医師等の専門医療機関を受診してください。</li>
                <li>当サイト運営者は、掲載情報の正確性と最新性に努めます。掲載情報による効果や個別の状況での安全性は保証しません。</li>
              </ol>
            </div>
          </section>

          {/* 第9条（端末に保存する設定） */}
          <section id="policy-section-9" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第9条（端末に保存する設定）
            </h2>
            <p>表示設定や演習の進捗などを利用中のブラウザに保存することがあります。ブラウザや端末を変更した場合、またはサイトデータを削除した場合は、その設定や進捗を引き継げないことがあります。</p>
          </section>

          {/* 第10条（本サービスの変更・中断・終了） */}
          <section id="policy-section-10" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第10条（本サービスの変更・中断・終了）
            </h2>
            <ol className="list-decimal list-inside pl-2 space-y-1.5">
              <li>当サイト運営者は、システムの定期保守、緊急点検、天災地変、通信回線の障害、その他のやむを得ない事由が生じた場合、ユーザーへの事前通知なく本サービスの提供を一時停止または中断できるものとします。</li>
              <li>当サイト運営者は、相当の周知期間をもってユーザーに通知の上、本サービスの全部または一部を変更または終了することができるものとします。</li>
            </ol>
          </section>

          {/* 第11条（責任の範囲） */}
          <section id="policy-section-11" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第11条（責任の範囲）
            </h2>
            <p>
              本サービスの提供や利用に関して損害が生じた場合、運営者は適用される法令に従って責任を負います。
            </p>
          </section>

          {/* 第12条（利用規約の変更） */}
          <section id="policy-section-12" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第12条（利用規約の変更）
            </h2>
            <p>
              本規約を変更する場合は、適用される法令に従い、変更内容および効力発生時期を当サイト上への掲示その他の適切な方法でお知らせします。
            </p>
          </section>

          {/* 第13条（準拠法および管轄裁判所） */}
          <section id="policy-section-13" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第13条（準拠法および管轄裁判所）
            </h2>
            <ol className="list-decimal list-inside pl-2 space-y-1.5">
              <li>本規約の成立、効力、解釈および履行に関しては、日本法を準拠法とします。</li>
              <li>本サービスまたは本規約に関して生じた一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
            </ol>
          </section>

          {/* フッター情報 */}
          <section className="pt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#737C77] dark:text-[#8899A6]">
              制定日：2024年4月1日<br />
              最終改定日：2026年11月18日
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/tokushoho"
                className="text-sm text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-medium"
              >
                旧プレミアムプランの販売条件
              </Link>
              <span className="text-[#C5DEC9]">|</span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] hover:bg-[#162E27] text-[#FAF8F5] text-sm font-bold transition-all shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>お問い合わせ</span>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
