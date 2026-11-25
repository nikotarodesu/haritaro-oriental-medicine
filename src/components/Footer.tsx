import Link from "next/link";
import { SITE_NAME } from "@/config/seo";
import { SERIES } from "@/config/series";
import { ACUPUNCTURE_GUIDE } from "@/config/acupunctureLearning";
import { ChevronDown } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";

const groups = [
  { title: "学ぶ", links: [[ACUPUNCTURE_GUIDE.href, "はじめての鍼灸"], ["/articles", "解説記事"], ["/learn/review", "講義の復習"], ["/glossary", "用語集"], ["/library", "古典・論文"]] },
  { title: "演習", links: [["/diagnosis", "気血水 体質チェック"], ["/diagnosis?tab=gorou", "五労チェック"], ["/cases", "症例演習"], ["/simulator", "弁証演習"], ["/practice/haiketsu", "配穴演習"]] },
  { title: "運営・出典", links: [["/about", "運営者について"], ["/editorial-policy", "出典・専門確認の状況"], ["/safety", "受診の目安・安全性"], ["/updates", "更新情報"], ["/contact", "お問い合わせ"]] },
];

export default function Footer() {
  return (
    <footer className="site-footer mt-auto print:hidden">
      <div className="site-footer-inner">
        <Link href="/" aria-label={SITE_NAME} className="site-footer-brand"><BrandLogo symbolClassName="h-8 w-8" wordmarkClassName="font-serif text-lg font-bold" /></Link>
        <nav aria-label="主な入口" className="site-footer-primary">
          {Object.values(SERIES).map(series => <Link key={series.href} href={series.href}>{series.shortName}</Link>)}
          <Link href="/symptoms">症状別ガイド</Link>
        </nav>
        <div className="site-footer-groups site-footer-groups--compact">
          {groups.map(group => <details key={group.title} className="site-footer-disclosure">
            <summary><span>{group.title}</span><ChevronDown aria-hidden="true" /></summary>
            <nav aria-label={group.title}><ul>{group.links.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>
          </details>)}
        </div>
        <div className="site-footer-notice">
          <p>急な症状や悪化があるときは、医療機関に相談してください。</p>
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
