import { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { Lock, Eye, AlertCircle, ArrowLeft, Mail, UserCheck } from "lucide-react";
import { pageSocialMetadata } from "@/config/seo";

const pageTitle = "プライバシーポリシー・免責事項";
const pageDescription = "「はり太郎」の個人情報の取り扱い、広告配信、アクセス解析、免責事項、著作権方針をご案内します。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  ...pageSocialMetadata(pageTitle, pageDescription, "/privacy"),
};

export default function PrivacyPage() {
  return (
    <div className="page-layout page-layout--reading">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
        {/* パンくず・戻るリンク */}
        <nav aria-label="パンくず" className="flex flex-wrap items-center gap-2 text-sm text-[#737C77] dark:text-[#8899A6]">
          <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ホーム</span>
          </Link>
          <span>/</span>
          <span className="text-[#232826] dark:text-[#FAF8F5] font-semibold">
            プライバシーポリシー・免責事項
          </span>
        </nav>

        <PageIntro eyebrow="情報の取り扱い" title="プライバシーポリシー・免責事項" description="取得する情報、広告やアクセス解析での外部送信、サイト利用上の免責事項をご案内します。" art="reading" compact />

        <nav aria-label="このページの目次" className="grid gap-2 sm:grid-cols-2">
            <a href="#policy-section-2" className="page-secondary-action"><UserCheck size={18} aria-hidden="true" />取得する情報</a>
            <a href="#policy-section-4" className="page-secondary-action"><Eye size={18} aria-hidden="true" />広告配信</a>
            <a href="#policy-section-5" className="page-secondary-action"><Eye size={18} aria-hidden="true" />アクセス解析</a>
            <a href="#policy-section-6" className="page-secondary-action"><AlertCircle size={18} aria-hidden="true" />免責事項</a>
        </nav>

        {/* 本文カード */}
        <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-10 shadow-sm space-y-8 text-[#333835] dark:text-[#C5D2DB] text-sm sm:text-base leading-relaxed transition-colors">
          
          {/* 1. 基本方針 */}
          <section id="policy-section-1" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>1. 基本方針</span>
            </h2>
            <p>
              「はり太郎」（以下「当サイト」）は、個人情報の保護に関する法律（個人情報保護法）その他の関係法令およびガイドラインに従い、収集した情報を利用目的の範囲で取り扱い、安全管理に努めます。
            </p>
          </section>

          {/* 2. 個人情報の収集と利用目的 */}
          <section id="policy-section-2" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              <span>2. 取得する情報およびその利用目的</span>
            </h2>
            <p>
              当サイトでは、サービスの円滑な提供および利便性向上のため、以下の情報を取得・利用することがあります。
            </p>
            <div className="space-y-3 pl-2">
              <div>
                <h3 className="font-bold text-[#232826] dark:text-[#FAF8F5] text-sm sm:text-base">
                  （1）お問い合わせ情報
                </h3>
                <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] mt-0.5">
                  お問い合わせフォームの送信にはWeb3Formsを利用します。入力された氏名、メールアドレス、件名と本文は、回答・連絡およびサイトの改善に利用します。
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#232826] dark:text-[#FAF8F5] text-sm sm:text-base">
                  （2）ブラウザに保存する情報
                </h3>
                <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] mt-0.5">
                  表示の設定や記事を読んだ位置、演習の進捗などを、同じブラウザで利用できるように端末内に保存することがあります。ブラウザの設定からサイトデータを削除できます。
                </p>
              </div>
            </div>
          </section>

          {/* 3. 終了した会員サービスの情報 */}
          <section id="policy-section-3" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>3. 終了した会員サービスの情報</span>
            </h2>
            <p>
              会員登録、ログイン、月額・年額の有料プラン、マイノートは終了しました。これらの機能に伴うアカウント情報、決済情報、ノートの新規収集は終了しています。
            </p>
            <p>
              旧サービスで取得した登録情報やクラウド保存されたデータが残っている場合は、安全管理のもと、お問い合わせへの対応や法令上必要な記録管理に取り扱いを限ります。過去の決済はStripeが処理し、カード番号は当サイトのサーバーに保存していません。
            </p>
            <p>
              旧データについての開示、訂正、削除等のご相談は、<Link href="/contact" className="underline underline-offset-4">お問い合わせ</Link>からご連絡ください。
            </p>
          </section>

          {/* 4. 広告配信 */}
          <section id="policy-section-4" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              4. Google AdSenseによる広告配信
            </h2>
            <p>
              広告を掲載するページでは、Googleおよび第三者の広告配信事業者が、広告の表示・効果測定や不正利用の検出のため、Cookieの保存・読み取りを行い、ページへのアクセスを記録するタグ（ウェブビーコン）、IPアドレス、端末やブラウザに関する識別子、ページの閲覧情報を取得することがあります。これらの情報はGoogleや該当する広告配信事業者に送信されます。
            </p>
            <p>
              広告のパーソナライズが有効な場合、Googleや配信事業者は当サイトや他のサイトでの閲覧情報等を広告の選択に利用することがあります。設定は<a href="https://myadcenter.google.com/" className="underline underline-offset-4">Google マイ アド センター</a>で確認・変更できます。同意の確認が必要な地域では、サイト上の同意画面で設定を選べます。
            </p>
            <p>
              詳しくは<a href="https://policies.google.com/technologies/partner-sites?hl=ja" className="underline underline-offset-4">Googleのサービスを使用するサイトやアプリの情報の取り扱い</a>をご確認ください。
            </p>
          </section>

          {/* 5. アクセス解析ツールについて */}
          <section id="policy-section-5" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>5. アクセス解析ツールについて</span>
            </h2>
            <p>
              当サイトは、アクセス動向の把握やサイトの改善のために、次のアクセス解析を利用することがあります。ブラウザの設定でCookieを無効にできます。
            </p>
            <p>
              Google Analytics 4では、公開ページの閲覧や学習操作を集計するために、対象ページ、参照元、操作情報やCookie等の識別子がGoogleに送信されます。検索語や、体質チェックで選んだ回答はGoogleに送信しません。送信を停止したい場合は<a href="https://tools.google.com/dlpage/gaoptout?hl=ja" className="underline underline-offset-4">Google Analytics オプトアウト アドオン</a>をご利用ください。
            </p>
            <p>
              Microsoft Clarityでは、トップページなど一部の案内・一覧ページの表示や操作を分析するため、マスクした画面の情報や操作情報がMicrosoftに送信されます。解析用Cookieは無効にしています。気血水 体質チェックなど、回答を入力するページは記録の対象外です。検索条件などを含むURLや参照元から開いた場合も、画面の記録を始めません。
            </p>
            <p>
              詳しくは<Link href="https://privacy.microsoft.com/ja-jp/privacystatement" className="underline underline-offset-4">Microsoftのプライバシー声明</Link>をご確認ください。
            </p>
          </section>

          {/* 6. 免責事項 */}
          <section id="policy-section-6" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>6. 免責事項（医師法・非医療行為の明記）</span>
            </h2>
            <p>
              ツボ図鑑、気血水 体質チェック、弁証の練習、症例演習や記事は、東洋医学・鍼灸を学ぶための資料です。診断・治療・処方などの医療行為に代わるものではありません。
            </p>
            <p>
              激しい痛み、急激な体調変化、妊娠中の重篤な症状などがある場合は、自己判断によるツボ刺激等を行わず、速やかに専門の医療機関を受診してください。
            </p>
            <p>
              当サイトは掲載情報の正確性と最新性に努めます。情報の完全性、個別の状況での安全性、効果は保証しません。掲載情報を利用して損害が生じた場合の運営者の責任は、適用される法令に従います。
            </p>
          </section>

          {/* 7. 著作権・引用・リンクについて */}
          <section id="policy-section-7" className="scroll-mt-28 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              7. 著作権・引用・リンクについて
            </h2>
            <p>
              当サイトに掲載されている文章・画像・デザイン・経絡流注図等の著作権は、当サイト運営者または原著作者に帰属します。著作権法上認められた引用の範囲を超えて、無断で複製・転載・改変・再配布することを禁じます。
            </p>
            <p>
              当サイトへのリンクは原則として自由です。ただし、フレーム内での表示や、当サイトの趣旨に反する形でのリンクはお控えください。
            </p>
          </section>

          {/* 8. 法令情報・お問い合わせ */}
          <section className="pt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#737C77] dark:text-[#8899A6]">
              制定日：2024年4月1日<br />
              最終改定日：2026年11月18日
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/terms"
                className="text-sm text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-medium"
              >
                利用規約
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
