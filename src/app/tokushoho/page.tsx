import { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft, ShieldCheck, Mail, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | はり太郎の東洋医学",
  description:
    "「はり太郎の東洋医学」における特定商取引法（通信販売）に基づく法定記載事項をご案内します。",
};

export default function TokushohoPage() {
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
            特定商取引法に基づく表記
          </span>
        </nav>

        {/* ヘッダー */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Notice / Specified Commercial Transactions Act</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
            特定商取引法に基づく表記
          </h1>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-xl mx-auto">
            特定商取引に関する法律第11条に基づき、有料会員サービス等の販売条件を以下の通り表示いたします。
          </p>
        </div>

        {/* 表記テーブルカード */}
        <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-10 shadow-sm space-y-8 text-[#333835] dark:text-[#C5D2DB] text-xs sm:text-sm leading-relaxed transition-colors">
          
          <div className="divide-y divide-[#F2ECE0] dark:divide-[#22303D] border-y border-[#F2ECE0] dark:border-[#22303D]">
            
            {/* 販売事業者名 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                販売事業者名（屋号）
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB]">
                はり太郎の東洋医学 運営事務局
              </dd>
            </div>

            {/* 運営統括責任者 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                運営統括責任者
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB]">
                代表者：はり太郎（消費者庁の規定に基づき、ご請求があった場合は遅滞なく開示いたします）
              </dd>
            </div>

            {/* 所在地 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                所在地
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB]">
                東京都内（特定商取引法に基づく開示請求をいただいた場合、遅滞なく電磁的記録または書面にて開示いたします）
              </dd>
            </div>

            {/* 連絡先 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                連絡先・お問い合わせ
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB] space-y-2">
                <p>
                  お問い合わせは当サイトの{" "}
                  <Link href="/contact" className="text-[#1E3D34] dark:text-[#74BA9E] underline font-medium">
                    お問い合わせフォーム
                  </Link>{" "}
                  よりお願いいたします。
                </p>
                <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                  ※電話番号につきましても、開示請求があった場合は遅滞なく電子メール等にて提供いたします。
                </p>
              </dd>
            </div>

            {/* 販売URL */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                ホームページURL
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB]">
                <a href="https://www.haritaro.jp" className="hover:underline">
                  https://www.haritaro.jp
                </a>
              </dd>
            </div>

            {/* 販売価格 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                販売価格（利用料）
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB] space-y-1">
                <p>
                  <strong>プレミアム月額プラン：</strong>月額 980円（税込）
                </p>
                <p>
                  <strong>プレミアム年額プラン：</strong>年額 9,800円（税込）
                </p>
                <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                  ※各プランの詳細は{" "}
                  <Link href="/pricing" className="text-[#1E3D34] dark:text-[#74BA9E] underline">
                    料金プラン案内ページ
                  </Link>{" "}
                  をご確認ください。
                </p>
              </dd>
            </div>

            {/* 商品代金以外の必要料金 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                商品代金以外の必要料金
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB]">
                当サービスを利用するためのインターネット接続料金、パケット通信料等は利用者のご負担となります。
              </dd>
            </div>

            {/* お支払い方法 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                お支払い方法
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB]">
                クレジットカード決済（Visa, Mastercard, American Express, JCB等）<br />
                ※決済代行会社「Stripe, Inc.」の安全な暗号化決済システムを採用しています。当サイト運営者がクレジットカード番号等の機密情報を保持することはありません。
              </dd>
            </div>

            {/* お支払い時期 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                お支払い時期
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB] space-y-1">
                <p>
                  初回お申し込み時に即時決済が行われます。
                </p>
                <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                  月額プランは初回決済日から1ヶ月ごと、年額プランは1年ごとに自動更新・自動決済されます。
                </p>
              </dd>
            </div>

            {/* サービスの提供時期 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                役務の提供時期
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB]">
                決済完了後、即時にプレミアム会員機能（全20症例の閲覧・演習、シミュレーター拡張機能、1,000件保存枠等）が解放され、ご利用いただけます。
              </dd>
            </div>

            {/* キャンセル・返金・解約条件 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                解約・返金・キャンセルについて
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB] space-y-2">
                <p>
                  <strong>解約方法：</strong>次回更新日の前日までに、当サイトのマイページまたはStripe顧客ポータルからいつでも解約手続きを行うことができます。解約手続き完了後も、すでに支払われた有効期限の満了日まではプレミアム機能をご利用いただけます。
                </p>
                <p>
                  <strong>返金・キャンセル：</strong>デジタルコンテンツおよびオンラインサービスの性質上、決済完了後の返金・キャンセル・日割り計算による返金には原則として応じられません。あらかじめご了承の上お申し込みください。
                </p>
              </dd>
            </div>

            {/* 動作推奨環境 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                動作推奨環境
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB]">
                Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge の各最新版ブラウザ（PC、スマートフォン、タブレット）
              </dd>
            </div>

          </div>

          {/* フッター補足 */}
          <div className="pt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
              制定日：2024年4月1日<br />
              最終改定日：{new Date().getFullYear()}年{new Date().getMonth() + 1}月
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/terms"
                className="text-xs text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-medium"
              >
                利用規約を見る
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
          </div>

        </div>
      </div>
    </div>
  );
}
