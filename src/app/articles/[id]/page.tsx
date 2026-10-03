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
import { resolveArticleReferences } from "@/utils/referenceResolver";
import MarkdownBody from "@/components/MarkdownBody";
import ArticleReferences from "@/components/ArticleReferences";
import PrimeStudentCard from "@/components/PrimeStudentCard";
import GlossaryRenderer from "@/components/GlossaryRenderer";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight,
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
  const firstRelated = nextArticles[0];
  const relatedReading = firstRelated ? {
    href: `/articles/${firstRelated.article.id}`,
    title: firstRelated.article.title,
    description: firstRelated.reason,
    meta: `読了約 ${firstRelated.article.readTime}`,
  } : undefined;
  const headings = parseMarkdownBlocks(article.contentMarkdown).flatMap((block, index) =>
    block.type === "h2" ? [{ label: block.content.replaceAll("**", ""), id: "article-heading-" + index }] : []);
  const learningGuide = ARTICLE_LEARNING_GUIDES[article.id];

  const resolvedReferences = resolveArticleReferences(article.references || [], article.contentMarkdown);
  const summarySeenTerms = new Set<string>();
  const bodySeenTerms = new Set<string>();

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
    <div className="min-h-screen py-6 sm:py-16 px-3 sm:px-6 lg:px-8">
      <ReadingProgressBar key={article.id} bodySelector="#article-content [data-reading-body]" headings={headings.map(heading => ({ id: heading.id, text: heading.label, level: 2 }))} />
      {/* 構造化データ埋め込み */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10">
        
        {/* パンくずリスト */}
        <nav aria-label="パンくず" className="flex items-center justify-between gap-3 text-sm text-[#737C77] dark:text-[#8899A6]">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
              コラム・文献アーカイブ
            </Link>
            <span>/</span>
            <span className="text-[#232826] dark:text-[#FAF8F5] font-bold line-clamp-1 max-w-[200px] sm:max-w-md">
              {article.title}
            </span>
          </div>

          <Link
            href="/articles"
            aria-label="記事一覧へ戻る"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1 text-[#1E3D34] dark:text-[#74BA9E] font-medium hover:underline shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">一覧へ戻る</span>
          </Link>
        </nav>

        {/* 記事メインカード */}
        <article id="article-top" className="scroll-mt-36 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-10 shadow-sm space-y-6 sm:space-y-8 transition-colors">
          {/* ヘッダー部 */}
          <header className="space-y-3 sm:space-y-4 border-b border-[#F2ECE0] dark:border-[#22303D] pb-5 sm:pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] text-sm font-semibold">
                {article.category}
              </span>
              <span className="text-sm text-[#737C77] dark:text-[#8899A6] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>読了約 {article.readTime}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug tracking-tight">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] font-medium leading-relaxed">
                {article.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[#59615D] dark:text-[#96A6B2] pt-2">
              <div className="flex items-center gap-2">
                <img
                  src="/icon.png"
                  alt="はり太郎"
                  className="w-7 h-7 rounded-full object-cover border border-[#E5DEC9] dark:border-[#2A3B4A] shrink-0"
                />
                <div>
                  <span className="font-semibold text-[#232826] dark:text-[#E6EFEA]">{article.author.name}</span>
                  <span className="text-[#8A948F] dark:text-[#6A7C8B] ml-1.5">（{article.author.role}）</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {article.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] text-sm text-[#404743] dark:text-[#C5D2DB]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <nav aria-label="この記事の読み進め方" className="flex flex-wrap gap-2">
            <a href="#article-content" className="inline-flex min-h-11 items-center rounded-lg bg-[#1E3D34] px-4 text-sm font-bold text-white dark:bg-[#2B6958] focus-visible:outline-2 focus-visible:outline-offset-2">本文を読む</a>
            {readingGuide?.inserts[0] && <a href={`#reading-figure-${readingGuide.inserts[0].figure.id}`} className="inline-flex min-h-11 items-center rounded-lg border border-[#D5DED8] dark:border-[#2A3B4A] px-4 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] focus-visible:outline-2 focus-visible:outline-offset-2">図解を見る</a>}
            {nextArticles.length > 0 && <a href="#article-next-reading" className="inline-flex min-h-11 items-center rounded-lg border border-[#D5DED8] dark:border-[#2A3B4A] px-4 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] focus-visible:outline-2 focus-visible:outline-offset-2">次に読む</a>}
            {resolvedReferences.length > 0 && <a href="#article-references-section" className="inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] underline underline-offset-4">出典と確認範囲</a>}
          </nav>
          <p className="text-sm text-[#59615D] dark:text-[#A0B0BC]">
            公開：<time dateTime={article.publishedAt}>{article.publishedAt}</time>
            {article.updatedAt && <> ／ 更新：<time dateTime={article.updatedAt}>{article.updatedAt}</time></>}
          </p>
          <section aria-label="この記事の要点と読み方" className="space-y-3 text-base leading-relaxed text-[#404743] dark:text-[#C5D2DB]">
            <p><GlossaryRenderer text={article.summary} seenTerms={summarySeenTerms} /></p>
            {learningGuide && <div className="border-l-2 border-[#C5DED4] dark:border-[#2A5243] pl-4 space-y-2 text-sm">
              <p><strong>学ぶポイント：</strong>{learningGuide.focus}</p>
              <p><strong>判断の限界：</strong>{learningGuide.limitation}</p>
            </div>}
            <details className="text-sm">
              <summary className="flex min-h-11 cursor-pointer items-center gap-2 font-bold text-[#1E3D34] dark:text-[#74BA9E]">この記事の読み方・説明の範囲 <ChevronRight aria-hidden="true" className="h-4 w-4" /></summary>
              <p className="pt-2">
            伝統理論の説明、研究で得られた知見、筆者による比較・比喩を区別してお読みください。生理学との対比表や「ネットワーク」などの説明は、伝統概念との同一性や治療効果を証明するものではありません。研究結果は対象・方法・限界とともに確認してください。
              </p>
              {resolvedReferences.length > 0 && <a href="#article-references-section" className="inline-flex min-h-11 items-center underline text-[#1E3D34] dark:text-[#74BA9E]">原典・研究対象・方法を出典で確認する</a>}
            </details>
          </section>
          {headings.length > 0 && <details className="rounded-xl bg-[#FAF8F5] dark:bg-[#121920] px-4 py-2">
            <summary className="flex min-h-11 items-center cursor-pointer font-bold text-[#1E3D34] dark:text-[#74BA9E]">目次：知りたいところから読む</summary>
            <nav aria-label="記事の目次" className="mt-3"><ol className="space-y-2 text-sm">
              {headings.map(heading => <li key={heading.id}><a href={"#" + heading.id} className="inline-flex min-h-11 items-center py-2 underline underline-offset-4 text-[#1E3D34] dark:text-[#74BA9E]">{heading.label}</a></li>)}
            </ol></nav>
          </details>}
          {/* 本文 */}
          <div id="article-content" className="scroll-mt-36">
          <MarkdownBody
            contentMarkdown={article.contentMarkdown}
            seenTerms={bodySeenTerms}
            idPrefix="article-heading"
            resolvedReferences={resolvedReferences}
            readingInserts={readingGuide?.inserts}
            relatedReading={relatedReading}
          />
          </div>

          {nextArticles.length > 0 && <section id="article-next-reading" aria-labelledby="article-next-reading-title" className="scroll-mt-36 space-y-4 border-t border-[#E8E1D1] dark:border-[#22303D] pt-6">
            <div className="space-y-1"><h2 id="article-next-reading-title" className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">次に読む</h2><p className="text-sm text-[#59615D] dark:text-[#A0B0BC]">いま読んだ内容を、別の視点から確かめる記事です。</p></div>
            <div className="grid gap-3 sm:grid-cols-3">{nextArticles.map(({ article: next, reason }) => <ContentNavigationLink key={next.id} href={`/articles/${next.id}`} placement="article_next" articleId={next.id} className="flex flex-col gap-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] p-4 hover:bg-[#EBF3EF] dark:hover:bg-[#182823] focus-visible:outline-2 focus-visible:outline-offset-2">
              <p className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">{reason}</p>
              <h3 className="font-serif text-base font-bold leading-relaxed text-[#232826] dark:text-[#FAF8F5]">{next.title}</h3>
              <span className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 text-sm text-[#59615D] dark:text-[#A0B0BC]"><span>読了約 {next.readTime}</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></span>
            </ContentNavigationLink>)}</div>
          </section>}

          <div className="space-y-3 border-t border-[#E8E1D1] dark:border-[#22303D] pt-5 text-sm">
            {learningGuide && <LearningPathLinks lectureId={learningGuide.lectureId} caseId={learningGuide.caseId} />}
            {relatedCourses.length > 0 && <div className="rounded-xl bg-[#EBF3EF] p-4 dark:bg-[#182823]">
              <p className="font-semibold text-[#184F49] dark:text-[#83BEA8]">このテーマを順に学ぶ</p>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">{relatedCourses.map(course => <ContentNavigationLink key={course.slug} href={`/learn/courses/${course.slug}`} placement="article_course" courseId={course.slug} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#83BEA8]">{course.title}<ArrowRight aria-hidden="true" className="h-4 w-4" /></ContentNavigationLink>)}</div>
            </div>}
            <a href="#article-top" className="inline-flex min-h-11 items-center underline underline-offset-4 text-[#1E3D34] dark:text-[#74BA9E]">記事の先頭へ</a>
          </div>
          {/* 参考文献・学術エビデンス（PubMed・DOI・古典原典） */}
          <ArticleReferences references={resolvedReferences} />

          <Link href={"/contact?source=" + encodeURIComponent("/articles/" + article.id)} className="inline-flex min-h-11 items-center text-sm underline text-[#1E3D34] dark:text-[#83BEA8]">この記事の訂正・出典について連絡する</Link>
          {/* 学生向け専門書・教科書サポート（Prime Student） */}
          <PrimeStudentCard variant="card" className="mt-8" />

          {/* 著者紹介フッター */}
          <div className="border-t border-[#F2ECE0] dark:border-[#22303D] pt-6 bg-[#FAF8F5] dark:bg-[#121920] p-4 sm:p-6 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] flex flex-col sm:flex-row items-start gap-4">
            <img
              src="/icon.png"
              alt="はり太郎"
              className="w-14 h-14 rounded-2xl object-cover shadow-xs border border-[#E5DEC9] dark:border-[#2A3B4A] shrink-0"
            />
            <div className="space-y-1.5 text-sm flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                  執筆・編集：{article.author.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs font-bold">
                  鍼灸師／鍼灸院院長
                </span>
              </div>
              <p className="text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                鍼灸師として臨床に携わりながら、東洋医学を「身体を観察し、病態を推論し、治療方針を組み立てる思考体系」として整理・発信。身体ケア・臨床領域10年以上、現役で鍼灸院を運営。「はり太郎の東洋医学」主宰。
              </p>
              <div className="pt-1">
                <Link
                  href="/about"
                  className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
                >
                  <span>運営理念と執筆方針を見る</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* E-E-A-T 専門家監修情報カード */}
        <AuthorSupervisorCard topic={`${article.title}（${article.category}）`} />

      </div>
    </div>
  );
}
