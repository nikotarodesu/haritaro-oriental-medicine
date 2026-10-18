import Link from "next/link";
import { SITE_NAME } from "@/config/seo";
import { ChevronDown } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";

const groups = [
  { title: "学ぶ", links: [["/learn", "学習の始め方"], ["/learn/courses", "基礎コース"], ["/learn/review", "講義の復習"], ["/articles", "解説記事"], ["/library", "古典・論文"]] },
  { title: "調べる・記録する", links: [["/tsubo", "経穴辞典"], ["/glossary", "用語集"], ["/clinical", "臨床ツール"], ["/notes", "マイノート"], ["/symptoms", "セルフケア"]] },
  { title: "運営・出典", links: [["/about", "運営者について"], ["/editorial-policy", "出典・専門確認の状況"], ["/safety", "受診の目安・安全性"], ["/updates", "更新情報"], ["/contact", "お問い合わせ"]] },
];

export default function Footer() {
  return (
    <footer className="site-footer mt-auto print:hidden">
      <div className="site-footer-inner">
        <Link href="/" aria-label={SITE_NAME} className="site-footer-brand"><BrandLogo symbolClassName="h-8 w-8" wordmarkClassName="font-serif text-lg font-bold" /></Link>
        <nav aria-label="主な入口" className="site-footer-primary">
          <Link href="/learn">学ぶ</Link><Link href="/clinical">臨床</Link><Link href="/tsubo">経穴辞典</Link>
        </nav>
        <div className="site-footer-groups site-footer-groups--compact">
          {groups.map(group => <details key={group.title} className="site-footer-disclosure">
            <summary><span>{group.title}</span><ChevronDown aria-hidden="true" /></summary>
            <nav aria-label={group.title}><ul>{group.links.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>
          </details>)}
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
