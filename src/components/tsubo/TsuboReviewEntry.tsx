'use client';

import Link from 'next/link';
import { useEffect, useEffectEvent, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningSync } from '@/contexts/LearningSyncContext';
import { getLearningStorageAdapter } from '@/utils/learningStorageBridge';
import { getPracticeContinuation, practiceDateLabel } from '@/data/tsubo/continuation';
import { getTodayString, loadActiveSession, loadPausedSessions, loadStudyData } from '@/data/tsubo/studyStorage';
import { resolvePracticeCourse } from '@/data/tsubo/practiceEntry';
import { trackEvent } from '@/utils/analytics';

interface Props { placement: 'dictionary' | 'detail' | 'home'; meridianId?: string; meridianName?: string; onlyReturning?: boolean }
type Continuation = ReturnType<typeof getPracticeContinuation>;

export default function TsuboReviewEntry(props: Props) {
  const { user } = useAuth();
  const { ready } = useLearningSync();
  return ready ? <ReadyEntry key={user?.id || 'guest'} {...props} owner={user?.id || 'guest'} /> : props.onlyReturning ? null : <EntryView {...props} state={null} memory={false} />;
}

function ReadyEntry(props: Props & { owner: string }) {
  const { values, status } = useLearningSync();
  const [state, setState] = useState<Continuation | null>(null);
  const refresh = useEffectEvent(() => {
    if (getLearningStorageAdapter()?.owner !== props.owner) return;
    setState(getPracticeContinuation(loadStudyData(), loadActiveSession(), loadPausedSessions(), getTodayString()));
  });
  useEffect(() => {
    const timer = setTimeout(() => refresh(), 0);
    const focus = () => refresh();
    const storage = (event: StorageEvent) => { if (!event.key || event.key.startsWith('haritaro_tsubo_')) refresh(); };
    window.addEventListener('focus', focus); window.addEventListener('storage', storage);
    return () => { clearTimeout(timer); window.removeEventListener('focus', focus); window.removeEventListener('storage', storage); };
  }, [values]);
  return <EntryView {...props} state={state} memory={status === 'memory'} />;
}

function EntryView({ placement, meridianId, meridianName, onlyReturning, state, memory }: Props & { state: Continuation | null; memory: boolean }) {
  if (onlyReturning && !state?.hasHistory) return null;
  const course = resolvePracticeCourse(meridianId ? 'meridian_' + meridianId.toLowerCase() : null);
  const courseHref = course ? '/tsubo/practice?course=' + course.id : null;
  const resume = !!state?.resumeTitle;
  const paused = !!state?.pausedCount;
  const due = !!state?.dueCount;
  const title = resume ? '途中の経穴学習を続ける' : paused ? '中断した経穴学習から続ける' : due ? '今日の経穴を復習する' : state?.hasHistory ? '経穴の復習を続ける' : '調べたら、問題で確かめる';
  const href = resume || paused || due ? '/tsubo/practice' : courseHref || '/tsubo/practice';
  const action = resume ? '続きから再開' : paused ? '中断した学習を選ぶ' : due ? '今日の復習を開く' : course ? `${meridianName || course.title}の確認問題へ` : '経穴の復習ホームへ';
  const describe = resume ? `${state!.resumeTitle} · ${state!.answered} / ${state!.total}問回答済み` : paused ? `この端末に${state!.pausedCount}件の途中の学習があります。` : due ? `復習予定の項目が${state!.dueCount}件あります。` : state?.nextDate ? `次の復習予定は${practiceDateLabel(state.nextDate)}です。` : course ? '調べた経穴の経脈を、既存の確認問題で振り返れます。' : '経脈別の小テストから始められます。途中でやめても、この端末から再開できます。';
  const track = () => trackEvent('context_link_click', { placement: `tsubo_${placement}_review`, item_type: resume || paused ? 'resume' : due ? 'review' : 'course' });
  return <section aria-label="経穴の復習と再開" className="ui-card min-w-0 space-y-3">
    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-1">
        <h2 className="flex items-center gap-2 text-base font-semibold"><BookOpen aria-hidden="true" className="h-4 w-4 shrink-0" />{title}</h2>
        <p className="text-sm ui-muted break-words">{describe}</p>
      </div>
      <Link href={href} onClick={track} className="ui-button ui-button-primary min-h-11 shrink-0">{action}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
    </div>
    {courseHref && href !== courseHref && <Link href={courseHref} onClick={track} className="ui-text-link text-sm">{meridianName || course!.title}の確認問題も選べます<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>}
    {memory ? <p role="status" className="text-xs ui-muted">端末への保存を確認できません。画面を閉じる前に、ブラウザーの保存設定をご確認ください。</p> : <p className="text-xs ui-muted">未ログインでも取り組めます。途中の問題と回答は、この端末から再開できます。</p>}
  </section>;
}
