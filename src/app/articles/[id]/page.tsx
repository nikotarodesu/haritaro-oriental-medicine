import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES } from "@/data/articleData";
import { resolveArticleReferences } from "@/utils/referenceResolver";
import MarkdownBody from "@/components/MarkdownBody";
import ArticleReferences from "@/components/ArticleReferences";
import PrimeStudentCard from "@/components/PrimeStudentCard";
import CitationTextRenderer from "@/components/CitationTextRenderer";
import GlossaryRenderer from "@/components/GlossaryRenderer";
import { 
  BookOpen, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Layers, 
  ChevronRight,
  ShieldCheck 
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
      title: "記事が見つかりません | はり太郎の東洋医学",
      description: "指定された記事は存在しないか、移動した可能性があります。",
    };
  }

  const title = `${article.title}｜東洋医学学術アーカイブ | はり太郎の東洋医学`;
  const description = `${article.summary}（読了約${article.readTime} / 執筆・監修：${article.author.name}）`;

  return {
    title,
    description,
    alternates: {
      canonical: `/articles/${article.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.haritaro.jp/articles/${article.id}`,
      type: "article",
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
  const prevArticle = articleIndex > 0 ? ARTICLES[articleIndex - 1] : null;
  const nextArticle = articleIndex < ARTICLES.length - 1 ? ARTICLES[articleIndex + 1] : null;
  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id && (a.category === article.category || Math.abs(ARTICLES.indexOf(a) - articleIndex) <= 2)).slice(0, 2);

  const resolvedReferences = resolveArticleReferences(article.references || []);
  const seenTerms = new Set<string>();

  // 構造化データ（Article ＆ BreadcrumbList）
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": article.title,
        "description": article.summary,
        "url": `https://www.haritaro.jp/articles/${article.id}`,
        "author": {
          "@type": "Person",
          "name": article.author.name,
          "jobTitle": article.author.role,
        },
        "publisher": {
          "@type": "Organization",
          "name": "はり太郎の東洋医学",
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
      {/* 構造化データ埋め込み */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10">
        
        {/* パンくずリスト */}
        <nav className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6]">
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
            className="inline-flex items-center gap-1 text-[#1E3D34] dark:text-[#74BA9E] font-medium hover:underline shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">一覧へ戻る</span>
          </Link>
        </nav>

        {/* 記事メインカード */}
        <article className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-10 shadow-sm space-y-6 sm:space-y-8 transition-colors">
          {/* ヘッダー部 */}
          <header className="space-y-3 sm:space-y-4 border-b border-[#F2ECE0] dark:border-[#22303D] pb-5 sm:pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-semibold">
                {article.category}
              </span>
              <span className="text-xs text-[#737C77] dark:text-[#8899A6] flex items-center gap-1">
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

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#59615D] dark:text-[#96A6B2] pt-2">
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
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-[10px] sm:text-[11px] text-[#404743] dark:text-[#C5D2DB]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* 10秒でわかる本稿の3ポイント */}
          {article.keyPoints && article.keyPoints.length > 0 && (
            <div className="bg-gradient-to-br from-[#EBF3EF] via-[#F5FAF8] to-[#FAF8F5] dark:from-[#162721] dark:via-[#14211C] dark:to-[#101915] p-4 sm:p-6 rounded-2xl border-2 border-[#1E3D34]/30 dark:border-[#3D6E5C] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8]">
                <Zap className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] fill-current" />
                <span className="tracking-wide">10秒でわかる本稿の3ポイント</span>
              </div>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-[#232826] dark:text-[#E6EFEA]">
                {article.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] font-mono text-[11px] font-bold shrink-0 mt-0.5 shadow-2xs">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium flex-1">
                      <CitationTextRenderer
                        text={point}
                        resolvedReferences={resolvedReferences}
                        seenTerms={seenTerms}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 要約ボックス */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-4 sm:p-5 rounded-2xl border-l-4 border-[#1E3D34] dark:border-[#4E8C76] text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
            <strong className="block font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">【本稿の要旨】</strong>
            <GlossaryRenderer text={article.summary} seenTerms={seenTerms} />
          </div>

          {/* 本文 */}
          <MarkdownBody
            contentMarkdown={article.contentMarkdown}
            seenTerms={seenTerms}
            idPrefix="article-heading"
            resolvedReferences={resolvedReferences}
          />

          {/* 参考文献・学術エビデンス（PubMed・DOI・古典原典） */}
          <ArticleReferences references={resolvedReferences} />

          {/* 学生向け専門書・教科書サポート（Prime Student） */}
          <PrimeStudentCard variant="card" className="mt-8" />

          {/* 著者紹介フッター */}
          <div className="border-t border-[#F2ECE0] dark:border-[#22303D] pt-6 bg-[#FAF8F5] dark:bg-[#121920] p-4 sm:p-6 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] flex flex-col sm:flex-row items-start gap-4">
            <img
              src="/icon.png"
              alt="はり太郎"
              className="w-14 h-14 rounded-2xl object-cover shadow-xs border border-[#E5DEC9] dark:border-[#2A3B4A] shrink-0"
            />
            <div className="space-y-1.5 text-xs flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                  執筆・監修：{article.author.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-[10px] font-bold">
                  鍼灸師／鍼灸院院長
                </span>
              </div>
              <p className="text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                鍼灸師として臨床に携わりながら、東洋医学を「身体を観察し、病態を推論し、治療方針を組み立てる思考体系」として整理・発信。身体ケア・臨床領域10年以上、現役で鍼灸院を運営。「はり太郎の東洋医学」主宰。
              </p>
              <div className="pt-1">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
                >
                  <span>運営理念と執筆方針を見る</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* 前後の記事ナビゲーション */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              href={`/articles/${prevArticle.id}`}
              className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-sm transition-all group flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#FAF8F5] dark:bg-[#10171F] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 group-hover:-translate-x-1 transition-transform">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">前の記事</span>
                <span className="font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5] line-clamp-1">
                  {prevArticle.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="p-4 rounded-2xl bg-[#FAF8F5]/60 dark:bg-[#121920]/60 border border-dashed border-[#E5DEC9] dark:border-[#22303D] text-xs text-[#8A948F] flex items-center">
              <span>最初の記事です</span>
            </div>
          )}

          {nextArticle ? (
            <Link
              href={`/articles/${nextArticle.id}`}
              className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-sm transition-all group flex items-center justify-between"
            >
              <div className="text-right">
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">次の記事</span>
                <span className="font-serif text-sm font-bold text-[#232826] dark:text-[#FAF8F5] line-clamp-1">
                  {nextArticle.title}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#FAF8F5] dark:bg-[#10171F] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ) : (
            <div className="p-4 rounded-2xl bg-[#FAF8F5]/60 dark:bg-[#121920]/60 border border-dashed border-[#E5DEC9] dark:border-[#22303D] text-xs text-[#8A948F] flex items-center justify-end">
              <span>最新の記事です</span>
            </div>
          )}
        </div>

        {/* おすすめの関連記事 */}
        {relatedArticles.length > 0 && (
          <section className="space-y-4">
            <h3 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>あわせて読みたい学術記事</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/articles/${rel.id}`}
                  className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] text-[#1E3D34] dark:text-[#83BEA8]">
                      {rel.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-medium">
                    <span>記事を読む</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
