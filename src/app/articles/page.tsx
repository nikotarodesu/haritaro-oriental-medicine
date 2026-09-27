import { permanentRedirect, notFound } from "next/navigation";
import { ARTICLES } from "@/data/articleData";
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

  return <ArticlesListClient />;
}
