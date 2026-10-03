import { permanentRedirect, notFound } from "next/navigation";
import { ARTICLES } from "@/data/articleData";
import { ARTICLE_READING_GUIDES } from "@/data/articleReadingGuides";
import ArticlesListClient from "@/components/articles/ArticlesListClient";

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

  const articles = ARTICLES.map(({ id, title, subtitle, category, readTime, summary, tags, author }) => ({
    id, title, subtitle, category, readTime, summary, tags,
    authorName: author.name,
    hasFigures: (ARTICLE_READING_GUIDES[id]?.inserts.length || 0) > 0,
  }));
  return <ArticlesListClient articles={articles} />;
}
