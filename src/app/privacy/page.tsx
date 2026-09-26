import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, AlertCircle, ArrowLeft, Mail, CreditCard, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "プライバシーポリシー・免責事項",
  description:
    "「はり太郎の東洋医学」のプライバシーポリシー、免責事項、会員情報・決済情報の保護、アフィリエイトプログラム、著作権方針についてご案内します。",
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
            当サイト（はり太郎の東洋医学）における個人情報の保護方針、会員情報および決済情報の取り扱い、免責事項、広告掲載規程についてご説明いたします。
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
              「はり太郎の東洋医学」（以下「当サイト」）は、ご利用者様のプライバシーを尊重し、個人情報の保護に関する法律（個人情報保護法）その他の関係法令およびガイドラインを遵守するとともに、個人情報の適正な収集・利用および安全管理に万全を期して努めます。
            </p>
          </section>

          {/* 2. 個人情報の収集と利用目的 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              <span>2. 取得する情報およびその利用目的</span>
            </h2>
            <p>
              当サイトでは、サービスの円滑な提供および利便性向上のため、以下の情報を取得・利用することがあります。
            </p>
            <div className="space-y-3 pl-2">
              <div>
                <h3 className="font-bold text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm">
                  （1）会員登録および認証に関する情報
                </h3>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] mt-0.5">
                  メールアドレス、表示名、認証プロバイダ（Google等）から提供される識別子等を取得します。これらは、本人認証、アカウント管理、有料機能の権限判定にのみ利用します。
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm">
                  （2）学習履歴および利用データ
                </h3>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] mt-0.5">
                  症例演習の解答進捗、お気に入り経穴、作成された学習ノート等のデータは、ユーザーご自身の学習管理および利便性向上のために保存・利用されます。
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm">
                  （3）お問い合わせ情報
                </h3>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] mt-0.5">
                  お問い合わせフォームより送信されたお名前、メールアドレス、ご相談内容は、お問い合わせへの回答・連絡およびサービス改善にのみ利用します。
                </p>
              </div>
            </div>
          </section>

          {/* 3. 決済情報の取り扱い（Stripe決済委託） */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>3. 決済情報の取り扱いおよび委託</span>
            </h2>
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] space-y-2">
              <h3 className="font-bold text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm">
                クレジットカード情報の非保持化と暗号化
              </h3>
              <p className="text-[#404743] dark:text-[#C5D2DB]">
                プレミアム会員の決済処理には、グローバル基準（PCI DSS レベル1準拠）を満たす決済代行業者「Stripe, Inc.」を採用しております。
              </p>
              <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                クレジットカード情報はStripe社のセキュアなサーバーへ直接暗号化送信され、当サイトのサーバーには一切保存・保持されません。
              </p>
            </div>
          </section>

          {/* 4. 広告配信・アフィリエイトプログラムについて */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              4. 広告配信・アフィリエイトプログラムについて
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

          {/* 5. アクセス解析ツールについて */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>5. アクセス解析ツールについて</span>
            </h2>
            <p>
              当サイトでは、アクセス動向の把握やサイト品質向上のためにCookie（クッキー）を使用するアクセス解析ツールを利用することがあります。Cookieによりブラウザが識別されますが、個人を特定する情報は含まれません。ブラウザの設定によりCookieを無効化することも可能です。
            </p>
          </section>

          {/* 6. 免責事項 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>6. 免責事項（医師法・非医療行為の明記）</span>
            </h2>
            <p>
              当サイトに掲載されている情報（ツボ、体質弁証、食養生、学術文献解説、セルフ診断ツール、弁証シミュレーター、臨床症例等）は、日常の健康維持および東洋医学・鍼灸理論の学術的理解・学習研究を支援することを目的として提供されています。これらは医師法第17条に定める診断・治療・処方等の医療行為に代わるものではありません。
            </p>
            <p>
              激しい痛み、急激な体調変化、妊娠中の重篤な症状などがある場合は、自己判断によるツボ刺激等を行わず、速やかに専門の医療機関を受診してください。
            </p>
            <p>
              当サイトの掲載内容については可能な限り正確を期しておりますが、その正確性・完全性・安全性を保証するものではありません。当サイトの情報を利用したことにより生じたいかなる損害・不利益についても、当サイトおよび運営者は一切の責任を負いかねます。
            </p>
          </section>

          {/* 7. 著作権・引用・リンクについて */}
          <section className="space-y-3">
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
            <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
              制定日：2024年4月1日<br />
              最終改定日：{new Date().getFullYear()}年{new Date().getMonth() + 1}月
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/terms"
                className="text-xs text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-medium"
              >
                利用規約
              </Link>
              <span className="text-[#C5DEC9]">|</span>
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
