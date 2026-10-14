import Link from "next/link";
import Image from "next/image";
import { Stethoscope, ArrowRight, BookOpen } from "lucide-react";
import { HomeHeroArtwork, HomeToolIcon } from "@/components/home/HomeArtwork";
import HomeLearningProgressCard from "@/components/HomeLearningProgressCard";
import HomeHeroQuickSearch from "@/components/home/HomeHeroQuickSearch";
import ArticleCover from "@/components/articles/ArticleCover";
import LearningCourseCards from "@/components/learning/LearningCourseCards";
import ContentNavigationLink from "@/components/learning/ContentNavigationLink";
import { createCourseLectureHref } from "@/utils/courseJourney";
import { LEARNING_COURSES } from "@/data/learningCourses";
import { getArticlePreviews } from "@/data/articleData";
import { SITE_UPDATES } from "@/config/contentUpdates";

const tools = [
  { href: "/tsubo", label: "経穴辞典", icon: "acupoint" },
  { href: "/curriculum", label: "カリキュラム", icon: "lecture" },
  { href: "/kokushi", label: "国試演習", icon: "quiz" },
  { href: "/simulator", label: "弁証推論", icon: "reasoning" },
  { href: "/practice/haiketsu", label: "配穴設計", icon: "prescription" },
  { href: "/notes", label: "ノート", icon: "notes" },
] as const;

export default function HomePage() {
  const featuredArticles = getArticlePreviews(["science-of-yinyang-gogyo", "science-of-qi-blood-fluid"]);
  return (
    <div className="home-page">
      <section className="home-hero washi-pattern">
        <div className="home-container">
          <HomeHeroArtwork />
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
              <span>講義で用語の意味を学び、クイズで確かめる。</span>
              <span>迷った問題は解説から本文に戻って復習できます。</span>
            </p>
          </div>
          <div className="home-start">
            <ContentNavigationLink href={createCourseLectureHref(LEARNING_COURSES[0].slug, LEARNING_COURSES[0].steps[0].lectureId)} placement="home_first_lecture" className="ui-button ui-button-primary home-start-button"><HomeToolIcon name="lecture" /><span>第1講から始める</span><ArrowRight aria-hidden="true" /></ContentNavigationLink>
            <p className="text-sm ui-muted">初めての方へ。「東洋医学とは何か」から学べます。</p>
            <nav aria-label="目的から選ぶ" className="home-secondary-entry">
              <Link href="/learn" className="ui-text-link"><BookOpen aria-hidden="true" /><span>基礎から学ぶ</span></Link>
              <Link href="/clinical" className="ui-text-link"><Stethoscope aria-hidden="true" /><span>臨床で使う</span></Link>
            </nav>
          </div>
          <HomeHeroQuickSearch />
        </div>
      </section>

      <div className="home-container home-sections">
        <HomeLearningProgressCard />
        <section aria-labelledby="home-tools-title" className="home-section">
          <h2 id="home-tools-title" className="home-section-title">よく使う機能</h2>
          <nav aria-label="よく使う機能" className="home-tools-grid">
            {tools.map(({ href, label, icon }) => <Link key={href} href={href} className="ui-card home-tool"><HomeToolIcon name={icon} /><span>{label}</span></Link>)}
          </nav>
        </section>
        <section aria-labelledby="home-courses-title" className="home-section">
          <div className="home-section-header">
            <h2 id="home-courses-title" className="home-section-title">最初の4コース</h2>
            <ContentNavigationLink href="/learn/courses" placement="home_courses" className="ui-text-link">全{LEARNING_COURSES.length}コース<ArrowRight aria-hidden="true" /></ContentNavigationLink>
          </div>
          <LearningCourseCards courses={LEARNING_COURSES.slice(0, 4)} placement="home_course_select" compact />
        </section>
        <section aria-labelledby="home-reading-title" className="home-section">
          <h2 id="home-reading-title" className="home-section-title">読みもの・文献</h2>
          <nav aria-label="読みものと文献の一覧" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/articles" className="ui-text-link">記事一覧<ArrowRight aria-hidden="true" /></Link>
            <Link href="/library" className="ui-text-link">古典・論文<ArrowRight aria-hidden="true" /></Link>
          </nav>
          <div className="home-reading-grid">
            {featuredArticles.map(article => <Link key={article.id} href={"/articles/" + article.id} className="ui-card home-reading-link">
              <div className="home-reading-cover"><ArticleCover articleId={article.id} /></div>
              <span className="ui-muted text-sm">{article.category} · 約{article.readTime}</span>
              <h3 className="text-base font-semibold">{article.title}</h3>
              <ArrowRight aria-hidden="true" className="h-5 w-5 home-reading-arrow" />
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
