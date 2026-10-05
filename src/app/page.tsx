import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Stethoscope, FileText, ArrowRight, BookOpen, SlidersHorizontal, Layers, Award, MapPin } from "lucide-react";
import HomeLearningProgressCard from "@/components/HomeLearningProgressCard";
import HomeHeroQuickSearch from "@/components/home/HomeHeroQuickSearch";
import HomeHeroDualEntry from "@/components/home/HomeHeroDualEntry";
import LearningCourseCards from "@/components/learning/LearningCourseCards";
import ContentNavigationLink from "@/components/learning/ContentNavigationLink";
import { LEARNING_COURSES } from "@/data/learningCourses";
import { getArticlePreviews } from "@/data/articleData";
import { SITE_UPDATES } from "@/config/contentUpdates";

const tools = [
  { href: "/tsubo", label: "経穴辞典", Icon: MapPin },
  { href: "/curriculum", label: "カリキュラム", Icon: GraduationCap },
  { href: "/kokushi", label: "国試演習", Icon: Award },
  { href: "/simulator", label: "弁証推論", Icon: Layers },
  { href: "/practice/haiketsu", label: "配穴設計", Icon: SlidersHorizontal },
  { href: "/notes", label: "ノート", Icon: FileText },
];
const flow = [
  { label: "理論", href: "/curriculum" },
  { label: "弁証", href: "/simulator" },
  { label: "配穴", href: "/practice/haiketsu" },
  { label: "記録", href: "/notes" },
];

export default function HomePage() {
  const featuredArticles = getArticlePreviews(["science-of-yinyang-gogyo", "science-of-qi-blood-fluid"]);
  return (
    <div className="home-page">
      <section className="home-hero washi-pattern">
        <div className="home-container">
          <div className="home-intro">
            <p className="home-label ui-muted">
              <span><span className="copy-phrase">鍼灸学生・鍼灸師</span><span className="copy-phrase">のための</span></span>
              <span>東洋医学 <span className="copy-phrase">学習・実践サイト</span></span>
            </p>
            <h1 className="home-headline font-serif">
              <span className="home-copy-line"><span className="copy-phrase">東洋医学の</span><span className="copy-phrase">「わか<span className="copy-ending">る」を、</span></span></span>
              <span className="home-copy-line home-copy-accent"><span className="copy-phrase">臨床の</span><span className="copy-phrase">「考えら<span className="copy-ending">れる」へ。</span></span></span>
            </h1>
            <p className="home-description ui-muted">
              <span>基礎を学び、弁証・配穴に活かす。</span>
              <span>学習と臨床をつなぐ東洋医学のツール。</span>
            </p>
          </div>
          <nav aria-label="目的から選ぶ" className="home-entry-grid">
            <Link href="/learn" className="ui-button ui-button-primary"><GraduationCap aria-hidden="true" /><span>基礎から学ぶ</span></Link>
            <Link href="/clinical" className="ui-button ui-button-outline"><Stethoscope aria-hidden="true" /><span>臨床で使う</span></Link>
          </nav>
          <HomeHeroQuickSearch />
        </div>
      </section>

      <div className="home-container home-sections">
        <HomeLearningProgressCard />
        <section aria-labelledby="home-tools-title" className="home-section">
          <h2 id="home-tools-title" className="home-section-title">よく使う機能</h2>
          <nav aria-label="よく使う機能" className="home-tools-grid">
            {tools.map(({ href, label, Icon }) => <Link key={href} href={href} className="ui-card home-tool"><Icon aria-hidden="true" /><span>{label}</span></Link>)}
          </nav>
        </section>
        <HomeHeroDualEntry />
        <section aria-labelledby="home-courses-title" className="home-section">
          <div className="home-section-header">
            <h2 id="home-courses-title" className="home-section-title">学習コース</h2>
            <ContentNavigationLink href="/learn/courses" placement="home_courses" className="ui-text-link">コース一覧<ArrowRight aria-hidden="true" /></ContentNavigationLink>
          </div>
          <LearningCourseCards courses={LEARNING_COURSES} placement="home_course_select" compact />
        </section>
        <section aria-labelledby="home-flow-title" className="home-section">
          <h2 id="home-flow-title" className="home-section-title">学びと実践の流れ</h2>
          <p className="ui-muted">理論を学び、所見を整理し、配穴と記録へ。振り返りから次の学びにつなげます。</p>
          <ol aria-label="理論から弁証、配穴、記録へ進む流れ" className="home-flow">
            {flow.map((step, index) => <li key={step.href}><Link href={step.href} className="ui-card"><span className="ui-muted">{index + 1}</span><span>{step.label}</span>{index < flow.length - 1 && <ArrowRight aria-hidden="true" />}</Link></li>)}
          </ol>
        </section>
        <section aria-labelledby="home-reading-title" className="home-section">
          <h2 id="home-reading-title" className="home-section-title">読みもの・文献</h2>
          <nav aria-label="読みものと文献の一覧" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/articles" className="ui-text-link">記事一覧<ArrowRight aria-hidden="true" /></Link>
            <Link href="/library" className="ui-text-link">古典・論文<ArrowRight aria-hidden="true" /></Link>
          </nav>
          <div className="home-reading-grid">
            {featuredArticles.map(article => <Link key={article.id} href={"/articles/" + article.id} className="ui-card home-reading-link">
              <span className="ui-muted text-sm">{article.category} · 約{article.readTime}</span>
              <h3 className="text-base font-semibold">{article.title}</h3>
              <BookOpen aria-hidden="true" className="h-5 w-5" />
            </Link>)}
          </div>
        </section>
        <section aria-labelledby="home-updates-title" className="home-section">
          <div className="home-section-header">
            <h2 id="home-updates-title" className="home-section-title">更新情報</h2>
            <Link href="/updates" className="ui-text-link">全件を見る<ArrowRight aria-hidden="true" /></Link>
          </div>
          <ul className="home-updates">{SITE_UPDATES.slice(0, 3).map(update => <li key={update.label}><Link href={update.href}>
            <time dateTime={update.date} className="ui-muted text-sm">{update.date.replaceAll("-", ".")}</time>
            <h3 className="text-base font-semibold">{update.label}</h3>
            <p className="ui-muted">{update.text}</p>
          </Link></li>)}</ul>
        </section>
        <section aria-label="運営者と出典方針" className="ui-card home-operator">
          <div>
            <Image src="/icon.png" alt="運営者 はり太郎" width={56} height={56} className="rounded-xl shrink-0" />
            <div className="min-w-0 space-y-2">
              <h2 className="text-lg font-semibold">運営者：はり太郎</h2>
              <p className="ui-muted">鍼灸師／鍼灸院院長。初学者から臨床家まで、東洋医学を学び、考える場を制作しています。</p>
              <Link href="/about" className="ui-text-link">運営者・制作理念<ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">情報公開方針とエビデンス</h2>
            <p className="ui-muted">WHO標準経穴部位、新版東洋医学概論・経絡経穴概論、中医基礎理論、および国内外の学術論文を参照して制作しています。</p>
            <p className="ui-muted text-sm">本サイトは学習・臨床推論の支援を目的としており、個別診断や医療行為を代替するものではありません。</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1"><Link href="/editorial-policy" className="ui-text-link">出典・確認状況</Link><Link href="/safety" className="ui-text-link">受診の目安・安全性</Link></div>
          </div>
        </section>
      </div>
    </div>
  );
}
