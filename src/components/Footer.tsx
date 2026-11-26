import Link from "next/link";
import { SITE_NAME } from "@/config/seo";
import { SERIES } from "@/config/series";
import { ACUPUNCTURE_GUIDE } from "@/config/acupunctureLearning";
import { ALL_NAV_ITEMS } from "@/config/navigationItems";
import { ChevronDown } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";

const groups = [
  { title: "図鑑で調べる", links: [[ALL_NAV_ITEMS.tsubo_compare.href, ALL_NAV_ITEMS.tsubo_compare.label], ["/tsubo/pairs", "ツボの組み合わせを見る"]] },
  { title: "学ぶ", links: [[ACUPUNCTURE_GUIDE.href, ACUPUNCTURE_GUIDE.label], ["/articles", "解説記事"], [ALL_NAV_ITEMS.kokushi.href, ALL_NAV_ITEMS.kokushi.label], ["/glossary", "用語集"], ["/library", "古典・論文"]] },
  { title: "演習", links: [ALL_NAV_ITEMS.diagnosis, ALL_NAV_ITEMS.gorou, ALL_NAV_ITEMS.cases, ALL_NAV_ITEMS.simulator, ALL_NAV_ITEMS.haiketsu].map(({ href, label }) => [href, label]) },
  { title: "運営・出典", links: [["/about", "執筆・運営者"], ["/editorial-policy", "出典・専門確認の状況"], ["/safety", "受診の目安・安全性"], ["/updates", "更新情報"], ["/contact", "お問い合わせ"]] },
];

export default function Footer() {
  return (
    <footer className="site-footer mt-auto print:hidden">
      <div className="site-footer-inner">
        <Link href="/" aria-label={SITE_NAME} className="site-footer-brand"><BrandLogo symbolClassName="h-8 w-8" wordmarkClassName="font-serif text-lg font-bold" /></Link>
        <nav aria-label="主な入口" className="site-footer-primary">
          {Object.values(SERIES).map(series => <Link key={series.href} href={series.href}>{series.shortName}</Link>)}
          <Link href={ALL_NAV_ITEMS.symptoms.href}>{ALL_NAV_ITEMS.symptoms.label}</Link>
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
