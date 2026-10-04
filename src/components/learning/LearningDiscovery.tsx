import { ArrowRight, Compass } from "lucide-react";
import { LEARNING_DISCOVERY } from "@/data/learningDiscovery";
import ContentNavigationLink from "./ContentNavigationLink";
import { ARTICLES } from "@/data/articleData";
import { CURRICULUM_DATA } from "@/data/curriculumData";
import { parseMarkdownBlocks } from "@/utils/markdownParser";

export default function LearningDiscovery() {
  return <section aria-labelledby="learning-discovery-title" className="space-y-5">
    <div className="space-y-2">
      <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#184F49] dark:text-[#83BEA8]"><Compass className="h-4 w-4" aria-hidden="true" />知りたいことから</p>
      <h2 id="learning-discovery-title" className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5] sm:text-2xl">その疑問から、学びを始める</h2>
      <p className="text-base leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">気になる問いから解説へ。図解と本文を読み、関連講義で確かめられます。</p>
    </div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{LEARNING_DISCOVERY.map(item => {
      const articleId = "articleId" in item ? item.articleId : undefined;
      const lectureId = "lectureId" in item ? item.lectureId : undefined;
      const content = articleId ? ARTICLES.find(article => article.id === articleId)?.contentMarkdown : CURRICULUM_DATA.flatMap(stage => stage.lectures).find(lecture => lecture.id === lectureId)?.contentMarkdown;
      const headingIndex = "heading" in item && content ? parseMarkdownBlocks(content).findIndex(block => block.type === 'h2' && block.content === item.heading) : -1;
      const anchor = "anchor" in item ? item.anchor : headingIndex >= 0 ? `${articleId ? 'article' : 'curriculum'}-heading-${headingIndex}` : null;
      const href = `${articleId ? `/articles/${articleId}` : `/curriculum/${lectureId}`}${anchor ? `#${anchor}` : ''}`;
      return <ContentNavigationLink key={item.id} href={href} placement="learn_question" articleId={articleId} lectureId={lectureId} className="group flex min-w-0 flex-col gap-3 rounded-2xl border border-[#E5DEC9] bg-white p-5 transition-colors hover:border-[#184F49] focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-[#2A3B4A] dark:bg-[#17212A] dark:hover:border-[#83BEA8]">
        <h3 className="font-bold text-base leading-relaxed text-[#232826] dark:text-[#FAF8F5]">{item.question}</h3>
        <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">{item.description}</p>
        <span className="mt-auto flex min-h-11 items-center justify-between gap-3 text-sm font-semibold text-[#184F49] dark:text-[#83BEA8]"><span>{item.label}</span><ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></span>
      </ContentNavigationLink>;
    })}</div>
  </section>;
}
