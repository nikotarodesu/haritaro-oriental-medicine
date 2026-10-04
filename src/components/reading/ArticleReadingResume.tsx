'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, ArrowRight } from 'lucide-react';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import type { ReadingHeading } from '@/components/ReadingProgressBar';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningSync } from '@/contexts/LearningSyncContext';
import { articleReadingKey, createArticleReadingPosition, readArticleReadingPosition } from '@/utils/articleReadingPosition';
import type { ArticleReadingPosition } from '@/utils/articleReadingPosition';
import { trackEvent } from '@/utils/analytics';
import { jumpToReadingHeading } from '@/utils/readingProgress';

interface Props { articleId: string; revision: string; headings: readonly ReadingHeading[] }
const BODY_SELECTOR = '#article-content [data-reading-body]';

export default function ArticleReadingResume(props: Props) {
  const { user, isLoading } = useAuth();
  const { ready } = useLearningSync();
  if (isLoading || !ready) return <ReadingProgressBar bodySelector={BODY_SELECTOR} headings={props.headings} />;
  return <ArticleReadingWorkspace key={`${user?.id ?? 'guest'}:${props.articleId}:${props.revision}`} {...props} />;
}

function ArticleReadingWorkspace({ articleId, revision, headings }: Props) {
  const { values, setEntry } = useLearningSync();
  const metadata = useMemo(() => ({ articleId, revision, headingIds: headings.map(item => item.id) }), [articleId, revision, headings]);
  const saved = readArticleReadingPosition(values, metadata);
  const [resume, setResume] = useState(() => saved);
  const readingStarted = useRef(false);
  const pending = useRef<ArticleReadingPosition | null>(null);
  const lastPosition = useRef(saved);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flush = useCallback(() => {
    const position = pending.current;
    if (!position) return;
    setEntry(articleReadingKey(articleId), position);
    pending.current = null;
  }, [articleId, setEntry]);
  const handlePosition = useCallback(({ headingId, progress, immediate }: { headingId: string; progress: number; immediate?: boolean }) => {
    if (!metadata.headingIds.includes(headingId)) return;
    readingStarted.current = true;
    const position = createArticleReadingPosition(metadata, headingId, progress, new Date().toISOString());
    const previous = lastPosition.current;
    if (!immediate && previous?.headingId === position.headingId && Math.abs(previous.progress - position.progress) < 3) return;
    lastPosition.current = position; pending.current = position;
    if (timer.current) clearTimeout(timer.current);
    if (immediate) flush();
    else timer.current = setTimeout(flush, 700);
  }, [metadata, flush]);

  useEffect(() => {
    if (resume || !saved || readingStarted.current) return;
    // Accept a later cloud bookmark before reading starts; never insert a card above an active reader.
    const arrival = setTimeout(() => { if (!readingStarted.current) setResume(previous => previous ?? saved); }, 0);
    return () => clearTimeout(arrival);
  }, [resume, saved]);

  useEffect(() => {
    const onHidden = () => { if (document.visibilityState === 'hidden') flush(); };
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', onHidden);
    return () => {
      if (timer.current) clearTimeout(timer.current);
      flush(); window.removeEventListener('pagehide', flush); document.removeEventListener('visibilitychange', onHidden);
    };
  }, [flush]);
  const heading = resume ? headings.find(item => item.id === resume.headingId) : null;

  return <>
    <ReadingProgressBar bodySelector={BODY_SELECTOR} headings={headings} onPositionChange={handlePosition} />
    {saved && resume && heading && <aside aria-label="保存した記事の閲覧位置" className="flex flex-col gap-3 rounded-xl border border-[#C5DED4] bg-[#EBF3EF] p-4 text-sm sm:flex-row sm:items-center sm:justify-between dark:border-[#2A5243] dark:bg-[#182823]">
      <div className="min-w-0 space-y-1"><p className="flex items-center gap-2 font-bold text-[#1E3D34] dark:text-[#83BEA8]"><Bookmark aria-hidden="true" className="h-4 w-4 shrink-0" />保存した位置から読む</p><p className="leading-relaxed text-[#404743] dark:text-[#C5D2DB] [overflow-wrap:anywhere]">{heading.text}</p><p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">閲覧位置 {resume.progress}% · この位置までスクロールした記録です。</p></div>
      <a href={`#${resume.headingId}`} onClick={event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        trackEvent('context_link_click', { placement: 'article_resume', article_id: articleId });
        const position = jumpToReadingHeading(resume.headingId, BODY_SELECTOR);
        if (!position) return;
        event.preventDefault(); handlePosition({ ...position, immediate: true });
      }} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1E3D34] px-4 py-2 font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-[#2B6958]">保存した節を開く<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
    </aside>}
  </>;
}
