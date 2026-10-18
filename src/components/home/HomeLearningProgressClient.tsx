'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import { useLearningSync } from '@/contexts/LearningSyncContext';
import { useAuth } from '@/contexts/AuthContext';
import type { ResumeLecture } from '@/types/learningProgressCatalog';
import { localStudyDate } from '@/utils/learningReview';
import { getCaseLearningNeeds, readCaseLearningRecords } from '@/utils/learningFocus';
import { getLearningRecommendation } from '@/utils/learningRecommendation';
import { getHomeLearningEntry } from '@/utils/homeLearningEntry';
import { trackEvent } from '@/utils/analytics';
import { useRecentTools } from '@/components/home/RecentTools';
import { useProgressAvailability } from '@/hooks/useProgressAvailability';

const DEFAULT_TOOLS = [
  { href: '/tsubo', title: '経穴辞典' },
  { href: '/clinical', title: '臨床ホーム' },
  { href: '/notes', title: 'マイノート' },
] as const;

export default function HomeLearningProgressClient({ lectures, supportOnly = false }: { lectures: ResumeLecture[]; supportOnly?: boolean }) {
  const { isMounted, totalCompleted, completedLectures, lastVisitedLectureId, quizResults } = useCurriculumProgress();
  const { values, status } = useLearningSync();
  const { isAuthenticated } = useAuth();
  const availability = useProgressAvailability(isMounted, status === 'memory');
  const recentTools = useRecentTools();
  const caseNeeds = useMemo(() => getCaseLearningNeeds(values), [values]);
  const caseAttempts = useMemo(() => readCaseLearningRecords(values), [values]);
  const recommendation = getLearningRecommendation({ lectures, completed: completedLectures, lastVisitedLectureId,
    quizResults, caseNeeds, caseAttempts, today: localStudyDate() });
  const entry = getHomeLearningEntry(lectures, completedLectures, lastVisitedLectureId);
  const unavailable = availability === 'unavailable';
  const loading = availability === 'loading';
  if (supportOnly) return <section aria-label="学習の進捗とツール" className="home-learning-support">
    <div className="home-learning-support-summary">
      {loading ? <p role="status" className="ui-muted">学習履歴を確認中…</p> : unavailable ? <p role="status">学習履歴を読み込めませんでした。保存済みの履歴は削除していません。</p> : <p><span className="home-learning-support-count">{totalCompleted} / {lectures.length}講義完了</span><span className="home-learning-support-source">{isAuthenticated ? status === 'offline' || status === 'setup' ? '端末の履歴を表示中・同期は未完了' : 'ログイン中の履歴' : 'この端末の履歴'}</span></p>}
      <Link href="/learn" className="ui-text-link">{unavailable ? '学習案内を見る' : '全体の進捗を見る'}<ArrowRight aria-hidden="true" /></Link>
    </div>
    {unavailable && <p className="home-learning-support-recovery">再読み込みしても改善しない場合は、ブラウザの保存設定をご確認ください。<button type="button" onClick={() => window.location.reload()} className="ui-text-link">再読み込み</button></p>}
    <section aria-labelledby="home-tools-title" className="home-shortcuts">
      <h2 id="home-tools-title" className="home-shortcuts-heading">{recentTools.length > 0 ? '最近使った機能' : 'よく使う機能'}</h2>
      <nav aria-label={recentTools.length > 0 ? '最近使った機能' : 'よく使う機能'} className="home-tools-grid">
        {(recentTools.length > 0 ? recentTools.slice(0, 3) : DEFAULT_TOOLS).map(tool => <Link key={tool.href} href={tool.href} className="home-tool"><span>{tool.title}</span><ArrowRight aria-hidden="true" /></Link>)}
      </nav>
    </section>
  </section>;
  return (
    <section aria-label="学習の再開と最近のツール" className="ui-card space-y-4">
      <div className="home-section-header">
        <h2 className="home-section-title">{loading ? '学習の再開' : unavailable ? '学習を始める' : entry.started ? '続きから学ぶ' : 'はじめての方へ'}</h2>
        {isMounted && !unavailable && <span className="ui-muted text-sm">{totalCompleted} / {lectures.length}講義完了</span>}
      </div>
      {loading ? <p role="status" className="ui-muted">履歴を確認中…</p> : (
        <>
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="space-y-1">
              <p className="text-lg font-semibold">{unavailable ? '履歴を読み込めませんでした' : entry.title}</p>
              <p className="ui-muted">{unavailable ? '入門コースから学べます。履歴は削除していません。' : entry.reason}</p>
            </div>
            <Link href={unavailable ? '/learn/courses/oriental-medicine-introduction' : entry.href} onClick={() => trackEvent('context_link_click', { placement: 'learning_start', item_type: entry.started ? 'resume' : 'course' })}
              className="ui-button ui-button-primary">
              {unavailable || !entry.started ? '入門コースへ' : '続きから学ぶ'}<ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <p className="ui-muted text-sm">{unavailable ? '再読み込みしても改善しない場合は、ブラウザの保存設定をご確認ください。' : isAuthenticated ? status === 'offline' || status === 'setup' ? '端末の履歴を表示しています。同期状態は学習ページで確認できます。' : 'ログイン中の学習履歴です。' : '未ログインでも、この端末の学習履歴から再開できます。'}</p>
          {unavailable ? <button type="button" onClick={() => window.location.reload()} className="ui-text-link">再読み込み</button> : <details>
            <summary className="min-h-11 cursor-pointer py-2 text-sm ui-muted focus-visible:outline-2 focus-visible:outline-offset-4">復習・別の学び方</summary>
            <div className="mt-2 space-y-2">
              <p>{recommendation.title}</p>
              <p className="ui-muted">{recommendation.reason}</p>
              <Link href={recommendation.href} onClick={() => trackEvent('context_link_click', { placement: 'learning_start', item_type: recommendation.kind })} className="ui-text-link">{recommendation.action}<ArrowRight aria-hidden="true" /></Link>
              <nav aria-label="学習の別の入口" className="flex flex-wrap gap-x-5 gap-y-1">
                <Link href="/learn/courses" className="ui-text-link">コース一覧</Link>
                <Link href="/learn/review#learning-review" className="ui-text-link">復習する</Link>
                <Link href="/notes?tab=learning" className="ui-text-link">学習ノート</Link>
                <Link href="/simulator#case-training" className="ui-text-link">症例で考える</Link>
              </nav>
            </div>
          </details>}
        </>
      )}
      {recentTools.length > 0 && <nav aria-label="最近使ったツール" className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
        <span className="ui-muted">最近使ったツール：</span>{recentTools.slice(0, 3).map(tool => <Link key={tool.href} href={tool.href} className="ui-text-link">{tool.title}</Link>)}
      </nav>}
    </section>
  );
}
