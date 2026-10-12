import Link from "next/link";
import { SITE_NAME } from "@/config/seo";

const groups = [
  { title: "学ぶ", links: [["/learn", "学習の始め方"], ["/learn/courses", "基礎コース"], ["/kokushi", "国試演習・復習"], ["/articles", "解説記事"], ["/library", "古典・論文"]] },
  { title: "調べる・記録する", links: [["/tsubo", "経穴辞典"], ["/glossary", "用語集"], ["/clinical", "臨床ツール"], ["/notes", "マイノート"], ["/symptoms", "セルフケア"]] },
  { title: "運営・出典", links: [["/about", "運営者について"], ["/editorial-policy", "出典・専門確認の状況"], ["/safety", "受診の目安・安全性"], ["/updates", "更新情報"], ["/contact", "お問い合わせ"]] },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#E3DBCB] bg-[#F2EDE4] text-sm text-[#59615D] dark:border-[#22303D] dark:bg-[#131A21] dark:text-[#AFBDC8] print:hidden [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        <Link href="/" className="font-serif text-lg font-bold text-[#232826] dark:text-[#E6EFEA]">{SITE_NAME}</Link>
        <div className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-3">
          {groups.map(group => <nav key={group.title} aria-label={group.title}>
            <h2 className="mb-2 font-semibold text-[#232826] dark:text-[#E6EFEA]">{group.title}</h2>
            <ul>{group.links.map(([href, label]) => <li key={href}><Link href={href} className="hover:underline">{label}</Link></li>)}</ul>
          </nav>)}
        </div>
        <div className="space-y-2 border-t border-[#D8CFC0] pt-5 leading-7 dark:border-[#2A3B4A]">
          <p>東洋医学の学習と考え方の整理を支援する教材です。個別の診断・治療を代替しません。急な症状や悪化がある場合は医療機関へご相談ください。</p>
          <p>Amazonアソシエイトとして、適格販売により収入を得ています。</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-[#D8CFC0] pt-4 dark:border-[#2A3B4A]">
          <Link href="/terms">利用規約</Link>
          <Link href="/tokushoho">特定商取引法に基づく表記</Link>
          <Link href="/privacy">プライバシーポリシー</Link>
        </div>
        <p>© {new Date().getFullYear()} {SITE_NAME}</p>
      </div>
    </footer>
  );
}
