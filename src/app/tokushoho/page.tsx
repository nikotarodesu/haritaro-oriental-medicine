import { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { ArrowLeft, Mail } from "lucide-react";
import { pageSocialMetadata } from "@/config/seo";

const pageTitle = "旧プレミアムプランの特定商取引法に基づく表記";
const pageDescription = "販売を終了した旧プレミアムプランの販売条件と、過去の取引に関するお問い合わせ先をご案内します。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  ...pageSocialMetadata(pageTitle, pageDescription, "/tokushoho"),
};

export default function TokushohoPage() {
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
            旧プレミアムプランの販売条件
          </span>
        </nav>

        <PageIntro title={pageTitle} description="プレミアムプランの販売・自動更新は終了しました。現在の「はり太郎」は無料で利用できます。" art="reading" compact />

        {/* 表記テーブルカード */}
        <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-10 shadow-sm space-y-8 text-[#333835] dark:text-[#C5D2DB] text-sm sm:text-base leading-relaxed transition-colors">
          
          <h2 className="font-serif text-xl font-bold">販売していたときの条件</h2>
          <dl className="divide-y divide-[#F2ECE0] dark:divide-[#22303D] border-y border-[#F2ECE0] dark:border-[#22303D]">
            
            {/* 販売事業者名 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                販売当時の屋号
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
                代表者：はり太郎（ご請求があった場合は遅滞なく開示いたします）
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
                <p className="text-sm text-[#737C77] dark:text-[#8899A6]">
                  ※電話番号につきましても、開示請求があった場合は遅滞なく電子メール等にて提供いたします。
                </p>
              </dd>
            </div>

            {/* 販売URL */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                ホームページ
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB]">
                <a href="https://www.haritaro.jp" className="hover:underline">
                  haritaro.jp
                </a>
              </dd>
            </div>

            {/* 販売価格 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                販売当時の価格
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB] space-y-1">
                <p>
                  <strong>プレミアム月額プラン：</strong>月額 980円（税込）
                </p>
                <p>
                  <strong>プレミアム年額プラン：</strong>年額 9,800円（税込）
                </p>
              </dd>
            </div>

            {/* 商品代金以外の必要料金 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                商品代金以外の必要料金
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB]">
                サービス利用に伴うインターネット接続料金、パケット通信料等は利用者の負担でした。
              </dd>
            </div>

            {/* お支払い方法 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                お支払い方法
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB]">
                クレジットカード決済（Visa, Mastercard, American Express, JCB等）<br />
                決済はStripe, Inc.が処理し、当サイト運営者はクレジットカード番号を保持しませんでした。
              </dd>
            </div>

            {/* お支払い時期 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                お支払い時期
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB] space-y-1">
                <p>
                  初回のお申し込み時に決済されていました。
                </p>
                <p className="text-sm text-[#737C77] dark:text-[#8899A6]">
                  販売期間中の条件では、月額プランは初回決済日から1か月ごと、年額プランは1年ごとに自動更新・自動決済でした。
                </p>
              </dd>
            </div>

            {/* サービスの提供時期 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                役務の提供時期
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB]">
                決済完了後、プレミアム会員機能（全20症例の閲覧・演習、シミュレーター拡張機能、1,000件保存枠等）をすぐに利用できる条件でした。
              </dd>
            </div>

            {/* キャンセル・返金・解約条件 */}
            <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
              <dt className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                解約・返金・キャンセルについて
              </dt>
              <dd className="sm:col-span-2 text-[#404743] dark:text-[#C5D2DB] space-y-2">
                <p>
                  <strong>販売期間中の解約方法</strong>　次回更新日の前日までに、マイページまたはStripe顧客ポータルから解約でき、支払い済みの有効期限までプレミアム機能を利用できる条件でした。
                </p>
                <p>
                  <strong>販売期間中の返金・キャンセル条件</strong>　当時は、決済完了後の返金・キャンセル・日割り返金を原則として受け付けない旨を表示していました。過去のお支払いに関するご質問は、現在の<Link href="/contact" className="underline underline-offset-4">お問い合わせ窓口</Link>へご連絡ください。
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

          </dl>

          {/* フッター補足 */}
          <div className="pt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#737C77] dark:text-[#8899A6]">
              旧表記の制定日：2024年4月1日
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/terms"
                className="text-sm text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-medium"
              >
                利用規約を見る
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
          </div>

        </div>
      </div>
    </div>
  );
}
