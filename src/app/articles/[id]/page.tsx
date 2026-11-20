import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { parseMarkdownBlocks } from "@/utils/markdownParser";
import { ARTICLE_LEARNING_GUIDES } from "@/data/articleLearningGuides";
import { ARTICLE_READING_GUIDES } from "@/data/articleReadingGuides";
import LearningPathLinks from "@/components/learning/LearningPathLinks";
import ContentNavigationLink from "@/components/learning/ContentNavigationLink";
import { LEARNING_COURSES } from "@/data/learningCourses";
import { ARTICLES } from "@/data/articleData";
import { getCurriculumIndexCatalog } from "@/data/curriculumIndexCatalog";
import { PROGRESSIVE_CASES } from "@/data/progressiveCases";
import { resolveArticleReferences } from "@/utils/referenceResolver";
import MarkdownBody from "@/components/MarkdownBody";
import ReadingContents from "@/components/reading/ReadingContents";
import ReadingSequence from "@/components/reading/ReadingSequence";
import { readingPartHref } from "@/data/publicLectures/readingUnits";
import ArticleReferences from "@/components/ArticleReferences";
import InlineTextRenderer from "@/components/InlineTextRenderer";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import ArticleReadingResume from "@/components/reading/ArticleReadingResume";
import { articleReadingRevision } from "@/utils/articleReadingPosition";
import AdSenseSlot from "@/components/ads/AdSenseSlot";
import { getArticleAdSenseConfig } from "@/components/ads/config";
import { NINE_NEEDLES_GUIDE } from "@/config/acupunctureLearning";
import AncientNineNeedles from "@/components/learning/AncientNineNeedles";
import { 
  BookOpen,
  Network,
  Bookmark,
  Clock, 
  ArrowRight, 
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    id: article.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = ARTICLES.find((a) => a.id === id);

  if (!article) {
    return {
      title: "記事が見つかりません",
      description: "指定された記事は存在しないか、移動した可能性があります。",
    };
  }

  const title = `${article.title}｜東洋医学学術アーカイブ`;
  const description = `${article.summary}（読了約${article.readTime} / 執筆：${article.author.name}）`;

  return {
    title,
    description,
    twitter: { card: "summary_large_image", title, description, images: ["https://www.haritaro.jp/og-image.png"] },
    alternates: {
      canonical: `https://www.haritaro.jp/articles/${article.id}`,
    },
    openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
      title,
      description,
      url: `https://www.haritaro.jp/articles/${article.id}`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;
  const articleIndex = ARTICLES.findIndex((a) => a.id === id);

  if (articleIndex === -1) {
    notFound();
  }

  const article = ARTICLES[articleIndex];
  const previousArticle = ARTICLES[articleIndex - 1];
  const nextArticle = ARTICLES[articleIndex + 1];
  const relatedCourses = LEARNING_COURSES.filter(course =>
    course.reading.some(item => item.href === `/articles/${article.id}`) ||
    course.steps.some(step => step.lectureId === ARTICLE_LEARNING_GUIDES[article.id]?.lectureId));
  const readingGuide = ARTICLE_READING_GUIDES[article.id];
  const nextArticleIds = new Set<string>();
  const nextArticles = (readingGuide?.nextArticles || []).flatMap(item => {
    const next = ARTICLES.find(candidate => candidate.id === item.articleId);
    if (!next || next.id === article.id || nextArticleIds.has(next.id)) return [];
    nextArticleIds.add(next.id);
    return [{ article: next, reason: item.reason }];
  }).slice(0, 3);
  const relatedArticles = nextArticles.filter(({ article: related }) => related !== previousArticle && related !== nextArticle);
  const firstRelated = relatedArticles[0] ?? nextArticles[0];
  const relatedReading = firstRelated ? {
    href: `/articles/${firstRelated.article.id}`,
    title: firstRelated.article.title,
    description: firstRelated.reason,
    meta: `読了約 ${firstRelated.article.readTime}`,
  } : undefined;
  const blocks = parseMarkdownBlocks(article.contentMarkdown);
  const headings = blocks.flatMap((block, index) =>
    block.type === "h2" ? [{ label: block.content.replaceAll("**", ""), id: "article-heading-" + index }] : []);
  const nineNeedlesAfter = article.id === NINE_NEEDLES_GUIDE.articleId ? blocks.findIndex(block =>
    block.type === "list" && block.items.some(item => item.startsWith("**『霊枢（れいすう）』**"))) : -1;
  const learningGuide = ARTICLE_LEARNING_GUIDES[article.id];
  const learningLectureTitle = learningGuide ? getCurriculumIndexCatalog().lectures.find(lecture => lecture.id === learningGuide.lectureId)?.title : undefined;
  const learningCaseTitle = learningGuide ? PROGRESSIVE_CASES.find(item => item.id === learningGuide.caseId)?.title : undefined;

  const resolvedReferences = resolveArticleReferences(article.references || [], article.contentMarkdown);
  const ad = getArticleAdSenseConfig();

  // 構造化データ（Article ＆ BreadcrumbList）
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": article.title,
        "description": article.summary,
        "url": `https://www.haritaro.jp/articles/${article.id}`,
        "mainEntityOfPage": `https://www.haritaro.jp/articles/${article.id}`,
        "datePublished": article.publishedAt || "2026-03-01",
        "dateModified": article.updatedAt || article.publishedAt,
        "image": "https://www.haritaro.jp/og-image.png",
        "author": {
          "@type": "Person",
          "name": article.author.name,
          "jobTitle": article.author.role,
          "url": "https://www.haritaro.jp/about",
        },
        "publisher": {
          "@type": "Organization",
          "name": "はり太郎の東洋医学",
          "url": "https://www.haritaro.jp",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.haritaro.jp/icon.png",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "ホーム",
            "item": "https://www.haritaro.jp",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "コラム・文献アーカイブ",
            "item": "https://www.haritaro.jp/articles",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": `https://www.haritaro.jp/articles/${article.id}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="page-layout page-layout--reading">
      {/* 構造化データ埋め込み */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-5 sm:space-y-8">
        <article id="article-top" tabIndex={-1} className="reader-article">
          <header className="reader-header">
            <Link href="/articles" className="reader-back"><span aria-hidden="true">←</span>記事一覧</Link>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-md bg-panel-selected px-2.5 py-1 text-sm font-semibold text-accent">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted">
                <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                <span>読了約 {article.readTime}</span>
              </span>
            </div>

            <h1 className="reader-title">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="reader-lead">
                {article.subtitle}
              </p>
            )}

            <div className="article-byline">
              <span className="font-semibold">{article.author.name}</span>
              <span>{article.updatedAt ? "更新" : "公開"} <time dateTime={article.updatedAt || article.publishedAt}>{article.updatedAt || article.publishedAt}</time></span>
            </div>
            <details className="reference-disclosure article-information">
              <summary>記事情報</summary>
              <div className="reference-disclosure-body">
                <p>{article.author.name}（{article.author.role}）</p>
                <p>公開：<time dateTime={article.publishedAt}>{article.publishedAt}</time></p>
                <ul className="article-information-tags" aria-label="記事のタグ">
                  {article.tags.map(tag => <li key={tag}>#{tag}</li>)}
                </ul>
              </div>
            </details>
          </header>

          <ArticleReadingResume articleId={article.id} revision={articleReadingRevision(article.contentMarkdown)} headings={headings.map(heading => ({ id: heading.id, text: heading.label, level: 2 }))} />

          <nav aria-label="この記事の読み進め方" className="reader-navigation">
            <a href="#article-content" className="page-primary-action"><BookOpen aria-hidden="true" className="h-4 w-4" />本文へ</a>
            {readingGuide?.inserts[0] && <a href={`#reading-figure-${readingGuide.inserts[0].figure.id}`} className="page-secondary-action"><Network aria-hidden="true" className="h-4 w-4" />図解</a>}
            {nineNeedlesAfter >= 0 && <a href={`#${NINE_NEEDLES_GUIDE.anchor}`} className="page-secondary-action">古代の九鍼</a>}
            {resolvedReferences.length > 0 && <a href="#article-references-section" className="page-secondary-action"><Bookmark aria-hidden="true" className="h-4 w-4" />出典</a>}
          </nav>
          <ReadingContents label="記事の目次" headings={headings} />
          <details className="page-help text-base leading-relaxed text-muted"><summary>この記事の要点・読み方</summary><div className="space-y-3">
            <p><InlineTextRenderer text={article.summary} /></p>
            {learningGuide && <div className="space-y-2 border-s-2 border-frame ps-4 text-sm">
              <p><strong>学ぶポイント：</strong>{learningGuide.focus}</p>
            </div>}
            <section className="text-sm">
              <h2 className="font-semibold text-accent">説明の範囲</h2>
              <p className="pt-2">
            伝統理論の説明、研究で得られた知見、筆者による比較・比喩を区別してお読みください。生理学との対比表や「ネットワーク」などの説明は、伝統概念との同一性や治療効果を証明するものではありません。研究結果は対象・方法・限界とともに確認してください。
              </p>
              {resolvedReferences.length > 0 && <a href="#article-references-section" className="ui-text-link">原典・研究対象・方法を出典で確認する</a>}
            </section>
          </div></details>
          {/* 本文 */}
          <div id="article-content" tabIndex={-1} className="reader-content">
          {learningGuide && <p className="mb-5 text-sm leading-relaxed text-muted"><strong>判断の限界：</strong>{learningGuide.limitation}</p>}
          <MarkdownBody
            contentMarkdown={article.contentMarkdown}
            idPrefix="article-heading"
            resolvedReferences={resolvedReferences}
            readingInserts={readingGuide?.inserts}
            relatedReading={relatedReading}
            conceptArt={nineNeedlesAfter >= 0 ? { afterBlock: nineNeedlesAfter, node: <AncientNineNeedles /> } : undefined}
          />
          </div>

          <ReadingSequence
            id="article-next-reading"
            label="記事"
            previous={previousArticle && { href: `/articles/${previousArticle.id}`, title: previousArticle.title }}
            next={nextArticle && { href: `/articles/${nextArticle.id}`, title: nextArticle.title }}
            index={{ href: "/articles", title: "図解記事の一覧" }}
          />

          {relatedArticles.length > 0 && <section aria-labelledby="article-related-title" className="space-y-4 border-t border-divider pt-6">
            <h2 id="article-related-title" className="reader-section-title">あわせて読む</h2>
            <div className="grid gap-3 md:grid-cols-3">{relatedArticles.map(({ article: next, reason }) => <ContentNavigationLink key={next.id} href={`/articles/${next.id}`} placement="article_next" articleId={next.id} className="flex min-w-0 flex-col gap-2 rounded-xl border border-frame bg-page p-4 hover:bg-panel-selected">
              <p className="text-sm font-semibold text-accent">{reason}</p>
              <h3 className="font-serif text-base font-semibold leading-relaxed">{next.title}</h3>
              <span className="mt-auto inline-flex items-center justify-between gap-2 text-sm text-muted"><span>読了約 {next.readTime}</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></span>
            </ContentNavigationLink>)}</div>
          </section>}

          {(learningGuide || relatedCourses.length > 0) && <section aria-labelledby="article-learning-next-title" className="space-y-4 border-t border-divider pt-6">
            <h2 id="article-learning-next-title" className="reader-section-title">順に学ぶ</h2>
            {relatedCourses.length > 0 && <div className="rounded-xl bg-panel-selected p-4">
              <p className="font-semibold text-accent">このテーマの基礎コース</p>
              <div className="mt-2 flex flex-wrap gap-x-5">{relatedCourses.map(course => <ContentNavigationLink key={course.slug} href={`/learn/courses/${course.slug}`} placement="article_course" courseId={course.slug} className="ui-text-link">{course.title}<ArrowRight aria-hidden="true" className="h-4 w-4" /></ContentNavigationLink>)}</div>
            </div>}
            {learningGuide && (relatedCourses.length > 0 ? <details className="article-learning-alternatives">
              <summary>講義・クイズ・症例から選ぶ</summary>
              <div><LearningPathLinks lectureId={learningGuide.lectureId} lectureHref={readingPartHref(learningGuide.lectureId)} caseId={learningGuide.caseId} lectureTitle={learningLectureTitle} caseTitle={learningCaseTitle} /></div>
            </details> : <LearningPathLinks lectureId={learningGuide.lectureId} lectureHref={readingPartHref(learningGuide.lectureId)} caseId={learningGuide.caseId} lectureTitle={learningLectureTitle} caseTitle={learningCaseTitle} />)}
          </section>}
          {/* 参考文献・学術エビデンス（PubMed・DOI・古典原典） */}
          <ArticleReferences references={resolvedReferences} />

          <div className="reader-navigation border-t border-divider pt-3">
            <Link href={"/contact?source=" + encodeURIComponent("/articles/" + article.id)} className="ui-text-link text-sm">この記事の訂正・出典について連絡する</Link>
            <a href="#article-top" className="ui-text-link text-sm">記事の先頭へ</a>
          </div>
        </article>

        {/* E-E-A-T 専門家監修情報カード */}
        <AuthorSupervisorCard topic={`${article.title}（${article.category}）`} />
        {ad && <AdSenseSlot key={article.id} {...ad} />}

      </div>
    </div>
  );
}
