import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, AlertCircle, ArrowLeft, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "プライバシーポリシー・免責事項 | はり太郎の東洋医学",
  description:
    "「はり太郎の東洋医学」のプライバシーポリシー、免責事項、アフィリエイトプログラム（Amazonアソシエイト等）に関する表示、著作権方針についてご案内します。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
        {/* パンくず・戻るリンク */}
        <nav className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6]">
          <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ホーム</span>
          </Link>
          <span>/</span>
          <span className="text-[#232826] dark:text-[#FAF8F5] font-semibold">
            プライバシーポリシー・免責事項
          </span>
        </nav>

        {/* ヘッダー */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy & Disclaimer</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
            プライバシーポリシー・免責事項
          </h1>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-xl mx-auto">
            当サイト（はり太郎の東洋医学）における個人情報の保護方針、免責事項、広告掲載規程についてご説明いたします。
          </p>
        </div>

        {/* 本文カード */}
        <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-10 shadow-sm space-y-8 text-[#333835] dark:text-[#C5D2DB] text-xs sm:text-sm leading-relaxed transition-colors">
          
          {/* 1. 基本方針 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>1. 基本方針</span>
            </h2>
            <p>
              「はり太郎の東洋医学」（以下「当サイト」）は、ご利用者様のプライバシーを尊重し、個人情報の保護に関する法令を遵守するとともに、適正な取り扱いおよび安全管理に努めます。
            </p>
          </section>

          {/* 2. 個人情報の利用目的 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              2. 個人情報の収集と利用目的
            </h2>
            <p>
              当サイトのお問い合わせフォームをご利用いただく際、お名前やメールアドレス等の個人情報をご入力いただく場合があります。取得した個人情報は、以下の目的にのみ利用し、目的外の利用はいたしません。
            </p>
            <ul className="list-disc list-inside pl-2 space-y-1 text-[#59615D] dark:text-[#A0B0BC]">
              <li>お問い合わせ・ご質問に対する回答および連絡</li>
              <li>サイトのサービス向上や運営改善のための参考分析</li>
            </ul>
            <p>
              お預かりした個人情報は、法令に基づく場合を除き、ご本人の同意なく第三者へ開示・提供することはありません。
            </p>
          </section>

          {/* 3. 広告配信・アフィリエイトプログラムについて */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              3. 広告配信・アフィリエイトプログラムについて
            </h2>
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] space-y-2">
              <h3 className="font-bold text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm">
                Amazonアソシエイト・プログラムに関する表示
              </h3>
              <p className="text-[#404743] dark:text-[#C5D2DB] font-medium">
                当サイトはAmazonアソシエイト・プログラムの参加者であり、適格販売により収入を得ています。
              </p>
              <p className="text-[#737C77] dark:text-[#8899A6] text-xs">
                第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにクッキー（Cookie）を設定したりこれを認識したりする場合があります。
              </p>
            </div>
            <p>
              当サイトで紹介している書籍・文献リンクには、Amazonアソシエイト等のアフィリエイトリンクが含まれる場合があります。リンク先の商品は当サイトが販売・管理しているものではなく、リンク先販売元の利用規約・プライバシーポリシーが適用されます。商品の購入や詳細については、リンク先の各販売店にお問い合わせください。
            </p>
          </section>

          {/* 4. アクセス解析ツールについて */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>4. アクセス解析ツールについて</span>
            </h2>
            <p>
              当サイトでは、アクセス動向の把握やサイト品質向上のためにCookie（クッキー）を使用するアクセス解析ツールを利用することがあります。Cookieによりブラウザが識別されますが、個人を特定する情報は含まれません。ブラウザの設定によりCookieを無効化することも可能です。
            </p>
          </section>

          {/* 5. 免責事項 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>5. 免責事項</span>
            </h2>
            <p>
              当サイトに掲載されている情報（ツボ、体質弁証、食養生、学術文献解説など）は、日常の健康維持および東洋医学の学術的理解を深めることを目的として提供されています。これらは医師や鍼灸師による個別の診断・治療・処方に代わるものではありません。
            </p>
            <p>
              激しい痛み、急激な体調変化、妊娠中の重篤な症状などがある場合は、自己判断によるツボ刺激等を行わず、速やかに専門の医療機関を受診してください。
            </p>
            <p>
              当サイトの掲載内容については可能な限り正確を期しておりますが、その正確性・完全性・安全性を保証するものではありません。当サイトの情報を利用したことにより生じたいかなる損害・不利益についても、当サイトおよび運営者は一切の責任を負いかねます。
            </p>
          </section>

          {/* 6. 著作権・リンクについて */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              6. 著作権・引用・リンクについて
            </h2>
            <p>
              当サイトに掲載されている文章・画像・デザイン等の著作権は、当サイト運営者または原著作者に帰属します。著作権法上認められた引用の範囲を超えて、無断で複製・転載・改変・再配布することを禁じます。
            </p>
            <p>
              当サイトへのリンクは原則として自由です。ただし、フレーム内での表示や、当サイトの趣旨に反する形でのリンクはお控えください。
            </p>
          </section>

          {/* 7. お問い合わせ */}
          <section className="pt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
              制定日：2024年4月1日<br />
              最終改定日：{new Date().getFullYear()}年{new Date().getMonth() + 1}月
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] hover:bg-[#162E27] dark:hover:bg-[#225345] text-[#FAF8F5] text-xs font-bold transition-all shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>プライバシーに関するお問い合わせ</span>
            </Link>
          </section>

        </div>
      </div>
    </div>
  );
}
