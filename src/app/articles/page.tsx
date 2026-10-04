import { permanentRedirect, notFound } from "next/navigation";
import { ARTICLES } from "@/data/articleData";
import { ARTICLE_READING_GUIDES } from "@/data/articleReadingGuides";
import ArticlesListClient from "@/components/articles/ArticlesListClient";
import { SITE_NAME } from "@/config/seo";
import { parseMarkdownBlocks } from "@/utils/markdownParser";
import { articleReadingRevision } from "@/utils/articleReadingPosition";

interface Props {
  searchParams: Promise<{ article?: string }>;
}

export default async function ArticlesPage({ searchParams }: Props) {
  const { article: articleId } = await searchParams;

  // 旧形式URL（/articles?article=[id]）からのアクセス時
  if (articleId) {
    const targetArticle = ARTICLES.find((a) => a.id === articleId);
    if (targetArticle) {
      // 正規URL（/articles/[id]）へ 308 恒久転送
      permanentRedirect(`/articles/${targetArticle.id}`);
    } else {
      // 存在しない記事IDは 404 を返す
      notFound();
    }
  }

  const articles = ARTICLES.map(({ id, title, subtitle, category, readTime, summary, tags, author, contentMarkdown }) => ({
    id, title, subtitle, category, readTime, summary, tags,
    authorName: author.name,
    hasFigures: (ARTICLE_READING_GUIDES[id]?.inserts.length || 0) > 0,
    readingRevision: articleReadingRevision(contentMarkdown),
    readingHeadingIds: parseMarkdownBlocks(contentMarkdown).flatMap((block, index) => block.type === "h2" ? [`article-heading-${index}`] : []),
  }));
  const pageUrl = "https://www.haritaro.jp/articles";
  const collection = {
    "@context": "https://schema.org", "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`, url: pageUrl,
    name: `東洋医学の図解記事 | ${SITE_NAME}`, inLanguage: "ja",
    mainEntity: {
      "@type": "ItemList", numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem", position: index + 1,
        item: { "@type": "Article", name: article.title, url: `${pageUrl}/${article.id}` },
      })),
    },
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection).replace(/</g, "\\u003c") }} />
    <ArticlesListClient articles={articles} />
  </>;
}
