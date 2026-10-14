import Link from "next/link";
import { SITE_NAME } from "@/config/seo";
import { BookOpen, Compass, NotebookPen } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";

const groups = [
  { title: "学ぶ", links: [["/learn", "学習の始め方"], ["/learn/courses", "基礎コース"], ["/kokushi", "国試演習・復習"], ["/articles", "解説記事"], ["/library", "古典・論文"]] },
  { title: "調べる・記録する", links: [["/tsubo", "経穴辞典"], ["/glossary", "用語集"], ["/clinical", "臨床ツール"], ["/notes", "マイノート"], ["/symptoms", "セルフケア"]] },
  { title: "運営・出典", links: [["/about", "運営者について"], ["/editorial-policy", "出典・専門確認の状況"], ["/safety", "受診の目安・安全性"], ["/updates", "更新情報"], ["/contact", "お問い合わせ"]] },
];

export default function Footer() {
  return (
    <footer className="site-footer mt-auto print:hidden">
      <div className="site-footer-inner">
        <Link href="/" aria-label={SITE_NAME} className="site-footer-brand"><BrandLogo symbolClassName="h-8 w-8" wordmarkClassName="font-serif text-lg font-bold" /></Link>
        <div className="site-footer-groups">
          {groups.map((group, index) => { const Icon = [BookOpen, NotebookPen, Compass][index]; return <nav key={group.title} aria-label={group.title}>
            <h2 className="site-footer-group-title"><Icon aria-hidden="true" />{group.title}</h2>
            <ul>{group.links.map(([href, label]) => <li key={href}><Link href={href} className="hover:underline">{label}</Link></li>)}</ul>
          </nav>; })}
        </div>
        <div className="site-footer-notice space-y-2">
          <p>東洋医学の学習と考え方の整理を支援する教材です。個別の診断・治療を代替しません。急な症状や悪化がある場合は医療機関へご相談ください。</p>
          <p>Amazonアソシエイトとして、適格販売により収入を得ています。</p>
        </div>
        <div className="site-footer-legal">
          <Link href="/terms">利用規約</Link>
          <Link href="/tokushoho">特定商取引法に基づく表記</Link>
          <Link href="/privacy">プライバシーポリシー</Link>
        </div>
        <p className="site-footer-copyright">© {new Date().getFullYear()} {SITE_NAME}</p>
      </div>
    </footer>
  );
}
