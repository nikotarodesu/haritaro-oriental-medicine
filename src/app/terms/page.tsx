import { Metadata } from "next";
import Link from "next/link";
import { FileCheck, ArrowLeft, ShieldAlert, Mail, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "利用規約",
  description:
    "「はり太郎の東洋医学」のサービス利用規約です。当サイトのご利用にあたっての条件、有料プラン、知的財産権、免責事項等について定めています。",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
        {/* パンくず・戻るリンク */}
        <nav className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6]">
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

        {/* ヘッダー */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold tracking-wider">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
            利用規約
          </h1>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-xl mx-auto">
            この利用規約（以下「本規約」）は、「はり太郎の東洋医学」（以下「当サイト」）が提供するすべてのサービス（以下「本サービス」）の利用条件を定めるものです。
          </p>
        </div>

        {/* 本文カード */}
        <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-10 shadow-sm space-y-8 text-[#333835] dark:text-[#C5D2DB] text-xs sm:text-sm leading-relaxed transition-colors">
          
          {/* 第1条（適用） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第1条（適用）
            </h2>
            <ol className="list-decimal list-inside pl-2 space-y-1.5">
              <li>本規約は、当サイトの閲覧者、会員登録者および有料サービス契約者を含むすべての利用者（以下「ユーザー」）と当サイト運営者との間の利用に関わる一切の関係に適用されます。</li>
              <li>ユーザーは、本サービスを利用することにより、本規約のすべての条項に同意したものとみなされます。</li>
            </ol>
          </section>

          {/* 第2条（定義） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第2条（定義）
            </h2>
            <ul className="list-disc list-inside pl-2 space-y-1.5">
              <li><strong>「本サービス」：</strong>当サイト上で提供される東洋医学・経絡経穴データベース、症例演習、診断シミュレーター、学習ノート管理、学術記事その他のウェブコンテンツ。</li>
              <li><strong>「無料会員」：</strong>当サイト所定の方法により会員登録を行い、無料枠のコンテンツを利用するユーザー。</li>
              <li><strong>「プレミアム会員」：</strong>所定の利用料金を支払い、全20症例や全機能が解放された有料プランを利用するユーザー。</li>
            </ul>
          </section>

          {/* 第3条（会員登録・アカウント管理） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第3条（会員登録・アカウント管理）
            </h2>
            <ol className="list-decimal list-inside pl-2 space-y-1.5">
              <li>本サービスの利用を希望する者は、真実、正確かつ最新の情報を登録するものとします。</li>
              <li>ユーザーは、自己の責任においてアカウントおよび認証情報（メールアドレス・パスワード・OAuth連携等）を適切に管理・保管するものとし、これを第三者に譲渡、貸与、売買、共有等してはなりません。</li>
              <li>アカウントの盗用や不正使用により生じた損害について、当サイト運営者は一切の責任を負いません。</li>
            </ol>
          </section>

          {/* 第4条（有料プランの料金および支払方法） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第4条（有料プランの料金および支払方法）
            </h2>
            <ol className="list-decimal list-inside pl-2 space-y-1.5">
              <li>プレミアム会員の利用料金は、当サイトの「料金プラン」ページに提示された金額（税込）とします。</li>
              <li>お支払いは、当サイト指定のオンライン決済システム（Stripe, Inc.）を介したクレジットカード決済等により行うものとします。</li>
              <li>有料プランは、解約手続きが行われない限り、選択された契約期間（1ヶ月または1年間）ごとに自動更新され、登録されたクレジットカードに対して利用料金が請求されます。</li>
              <li>デジタルコンテンツおよび役務の性質上、一度決済が完了した利用料金の返金、キャンセル、ならびに日割り計算での返還は行いません。</li>
            </ol>
          </section>

          {/* 第5条（解約および更新の停止） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第5条（解約および自動更新の停止）
            </h2>
            <ol className="list-decimal list-inside pl-2 space-y-1.5">
              <li>プレミアム会員は、次回契約更新日の前日までにマイページまたはStripeポータルよりいつでも解約手続きを行うことができます。</li>
              <li>解約手続きを行った場合でも、すでに支払済みの有効期間の満了日まではプレミアム会員向けコンテンツを継続してご利用いただけます。</li>
            </ol>
          </section>

          {/* 第6条（知的財産権および著作権） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第6条（知的財産権および著作権）
            </h2>
            <ol className="list-decimal list-inside pl-2 space-y-1.5">
              <li>本サービスを構成するすべてのテキスト、画像、図版、流注図、症例問題、解説文、プログラムコード、商標等の知的財産権は、当サイト運営者または正当な権利者に帰属します。</li>
              <li>ユーザーは、私的使用など法律で明示的に認められた範囲を超えて、これらを無断で複製、公衆送信、改変、転載、再配布、出版、販売等することはできません。</li>
            </ol>
          </section>

          {/* 第7条（禁止事項） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第7条（禁止事項）
            </h2>
            <p>ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
            <ul className="list-disc list-inside pl-2 space-y-1.5 text-[#59615D] dark:text-[#A0B0BC]">
              <li>法令または公序良俗に反する行為</li>
              <li>当サイトのサーバーやネットワークに過度な負荷をかける行為、または運営を妨害する行為</li>
              <li>スクレイピング、クローリング、ボット等の自動化手段による当サイトコンテンツの大量取得・収集行為</li>
              <li>有料会員アカウントを複数人で共有・回し使いする行為</li>
              <li>他のユーザー、第三者、または当サイト運営者の著作権、プライバシー権、名誉等の権利を侵害する行為</li>
              <li>リバースエンジニアリング、逆アセンブル等による解析行為</li>
              <li>その他、当サイト運営者が不適切と合理的に判断する行為</li>
            </ul>
          </section>

          {/* 第8条（非医療行為の確認および免責事項） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>第8条（非医療行為の確認および免責事項）</span>
            </h2>
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] space-y-2">
              <p className="font-semibold text-[#232826] dark:text-[#FAF8F5]">
                重要なお知らせ（医師法等に関する免責事項）
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-[#404743] dark:text-[#C5D2DB]">
                <li>当サイトで提供される「体質セルフ診断」「臨床弁証シミュレーター」「症例検討演習」および各種記事・解説は、東洋医学・鍼灸理論の学術的理解や自学自習、日常のセルフケアを支援するための教育・参考情報の提供を目的としています。</li>
                <li>当サイトのコンテンツは、医師法第17条に規定される「医行為」（個別の疾患に対する確定診断、治療、投薬・処方等の医療行為）を提供するものではなく、医師や鍼灸師等の専門医療従事者による診断・治療に代わるものではありません。</li>
                <li>急激な体調の悪化、激しい疼痛、重篤な疾患の兆候がある場合は、自己判断による処置を行わず、直ちに医師等の専門医療機関を受診してください。</li>
                <li>当サイト運営者は、本サービスの情報の正確性、最新性、有用性、特定目的への適合性について最大限の努力を払いますが、明示・黙示を問わずいかなる保証も行うものではありません。当サイトの情報を利用したことにより生じた心身の不調やいかなる損害についても、運営者は一切の責任を負いません。</li>
              </ol>
            </div>
          </section>

          {/* 第9条（本サービスの変更・中断・終了） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第9条（本サービスの変更・中断・終了）
            </h2>
            <ol className="list-decimal list-inside pl-2 space-y-1.5">
              <li>当サイト運営者は、システムの定期保守、緊急点検、天災地変、通信回線の障害、その他のやむを得ない事由が生じた場合、ユーザーへの事前通知なく本サービスの提供を一時停止または中断できるものとします。</li>
              <li>当サイト運営者は、相当の周知期間をもってユーザーに通知の上、本サービスの全部または一部を変更または終了することができるものとします。</li>
            </ol>
          </section>

          {/* 第10条（損害賠償の制限） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第10条（損害賠償の制限）
            </h2>
            <p>
              消費者契約法の適用その他の理由により、当サイト運営者がユーザーに対して損害賠償責任を負う場合であっても、運営者の過失（重過失を除く）による責任は、直接かつ現実に生じた通常損害に限定され、特別損害、間接損害、逸失利益については責任を負いません。また、その賠償額は、当該事由が生じた過去1年間に当該ユーザーが当サイトに支払った利用料金の総額を上限とします。
            </p>
          </section>

          {/* 第11条（利用規約の変更） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第11条（利用規約の変更）
            </h2>
            <p>
              当サイト運営者は、民法第548条の4の規定に基づき、本規約を随時変更することができます。規約を変更する場合、変更内容および効力発生時期を当サイト上への掲示その他の適切な方法によりあらかじめ周知します。変更後の効力発生日以降にユーザーが本サービスを利用した場合、変更に同意したものとみなされます。
            </p>
          </section>

          {/* 第12条（準拠法および管轄裁判所） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              第12条（準拠法および管轄裁判所）
            </h2>
            <ol className="list-decimal list-inside pl-2 space-y-1.5">
              <li>本規約の成立、効力、解釈および履行に関しては、日本法を準拠法とします。</li>
              <li>本サービスまたは本規約に関して生じた一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
            </ol>
          </section>

          {/* フッター情報 */}
          <section className="pt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
              制定日：2024年4月1日<br />
              最終改定日：{new Date().getFullYear()}年{new Date().getMonth() + 1}月
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/tokushoho"
                className="text-xs text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-medium"
              >
                特定商取引法に基づく表記
              </Link>
              <span className="text-[#C5DEC9]">|</span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] hover:bg-[#162E27] text-[#FAF8F5] text-xs font-bold transition-all shadow-xs"
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
