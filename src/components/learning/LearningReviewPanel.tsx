'use client';

import { trackEvent } from '@/utils/analytics';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import { useLearningSync } from '@/contexts/LearningSyncContext';
import { CURRICULUM_CHAPTERS_META } from '@/data/curriculumOutline';
import { getLearningCourseForSeries } from '@/data/learningCourses';
import { readCaseLearningRecords } from '@/utils/learningFocus';
import { LEARNING_QUESTIONS, LearningQuestion } from '@/data/learningQuestionBank';
import { restoreLegacyExerciseHref } from '@/utils/curriculumLegacyPaths';
import { localStudyDate, shuffledIndices } from '@/utils/learningReview';
import { PRACTICE_REVIEW_SECTION_ID, readPracticeReview, type PracticeReviewQuestion } from '@/utils/practiceReview';
import QuestionEvidence from './QuestionEvidence';
import { recordAnswerInStore } from '@/data/tsubo/studyStorage';
import type { StudySkillType } from '@/data/tsubo/types';
import LearningSyncStatus from './LearningSyncStatus';
import LearningFocusReview from './LearningFocusReview';
import {
  advanceReviewSession, browserReviewStorage, chooseReviewAnswer, createReviewSession,
  restoreReviewSession, reviewSessionLectureHref, reviewSessionScore, saveReviewSession, submitReviewAnswer,
  startReviewDetour, returnFromReviewDetour,
  validateReviewSession, type ReviewSession, type ReviewSessionStatus,
} from '@/utils/reviewSession';

interface ReviewState {
  session: ReviewSession | null;
  status: ReviewSessionStatus | 'active' | 'complete' | 'returned';
}

type ReviewFocusTarget = 'learning-review-practice' | 'learning-review-feedback' | 'learning-review-complete' | 'learning-review-unavailable';

const lectureReviewQuestions = LEARNING_QUESTIONS.filter(question => question.kind !== 'exam');

const clinicalLectureIds = new Set(CURRICULUM_CHAPTERS_META
  .filter(chapter => chapter.stageId === 'stage-2' || chapter.stageId === 'stage-3')
  .flatMap(chapter => chapter.lectureIds));

type ReviewPanelProps = {
  compact?: boolean;
  readingQuestions?: readonly LearningQuestion[];
  practiceQuestions?: readonly PracticeReviewQuestion[];
};

export default function LearningReviewPanel({ compact = false, readingQuestions, practiceQuestions }: ReviewPanelProps = {}) {
  const { isMounted } = useCurriculumProgress();
  // Mount only after the current owner's catalog is ready. Never render the previous owner's answers.
  if (!isMounted) return <section id="learning-review" className="learning-review-loading scroll-mt-24 p-4" role="status">このブラウザーの学習記録を読み込んでいます。</section>;
  return <ReviewWorkspace owner={'guest'} compact={compact} readingQuestions={readingQuestions} practiceQuestions={practiceQuestions} />;
}

function focusPracticeReviewList() {
  const list = document.getElementById(PRACTICE_REVIEW_SECTION_ID);
  list?.scrollIntoView({ block: 'start', behavior: 'instant' });
  list?.focus({ preventScroll: true });
}

function ReviewWorkspace({ owner, compact, readingQuestions, practiceQuestions }: ReviewPanelProps & { owner: string; compact: boolean }) {
  const requestedReview = useSearchParams().get('resumeReview');
  const { quizResults, quizHistory, saveQuizResult, completedLectures, lastVisitedLectureId, revisedQuestionCount, isMounted } = useCurriculumProgress();
  const { values, ready, status: syncStatus } = useLearningSync();
  const showSyncAttention = compact && syncStatus === 'memory';
  const hasCaseHistory = useMemo(() => ready && readCaseLearningRecords(values).length > 0, [ready, values]);
  const hasClinicalStudy = Boolean(lastVisitedLectureId && clinicalLectureIds.has(lastVisitedLectureId))
    || Object.entries(completedLectures).some(([id, completed]) => completed && clinicalLectureIds.has(id))
    || Object.values(quizResults).some(result => (!result.kind || result.kind === 'lecture') && clinicalLectureIds.has(result.lectureId));
  const showCaseReview = hasCaseHistory || hasClinicalStudy;
  const currentChapter = CURRICULUM_CHAPTERS_META.find(chapter => lastVisitedLectureId && chapter.lectureIds.includes(lastVisitedLectureId)) ?? CURRICULUM_CHAPTERS_META[0];
  const currentCourse = getLearningCourseForSeries(currentChapter.seriesId)!;
  const shortExampleHref = `/learn/courses/${currentCourse.slug}#course-mini-case-${currentCourse.seriesId}`;
  const today = localStudyDate();
  const lectureQuestions = useMemo(() => [...(readingQuestions ?? []), ...lectureReviewQuestions], [readingQuestions]);
  const bank = useMemo(() => [...lectureQuestions, ...Object.values(quizResults).filter(r => r.kind === 'acupoint').map((r): LearningQuestion => ({
    id: r.questionId, question: r.questionText, options: r.options, correctIndex: r.correctAnswerIndex,
    explanation: r.explanation, lectureId: r.lectureId, lectureTitle: r.lectureTitle,
    chapterId: r.chapterId, chapterTitle: r.chapterTitle, kind: 'acupoint',
    href: r.practiceHref || '/tsubo/practice', revision: r.revision || '',
  }))], [lectureQuestions, quizResults]);
  const [review, setReview] = useState<ReviewState>(() => restoreReviewSession(browserReviewStorage(), owner, bank, requestedReview));
  const sessionRef = useRef(review.session);
  const resumeUnavailable = review.status === 'invalid' || review.status === 'different' || Boolean(requestedReview && review.status === 'unavailable');
  const focusTarget = useRef<ReviewFocusTarget | null>(
    requestedReview ? review.status === 'restored' ? 'learning-review-practice' : 'learning-review-unavailable' : null,
  );
  const [storageAvailable, setStorageAvailable] = useState(review.status !== 'unavailable');
  const session = useMemo(() => review.session ? validateReviewSession(review.session, owner, bank) : null, [review.session, owner, bank]);
  const bankById = useMemo(() => new Map(bank.map(question => [question.id, question])), [bank]);
  const queue = session?.questions.map(reference => bankById.get(reference.id)!) || [];
  const index = session?.index || 0;
  const choice = session?.choice ?? null;
  const submitted = Boolean(session && session.answers[index] !== null);
  const sessionSeed = session?.id || 'review';
  const due = bank.filter(q => quizResults[q.id]?.nextReviewDate && quizResults[q.id].nextReviewDate! <= today)
    .sort((a, b) => (quizResults[a.id].nextReviewDate || '').localeCompare(quizResults[b.id].nextReviewDate || ''));
  const weak = bank.filter(q => quizResults[q.id] && !quizResults[q.id].isCorrect);
  const unlearned = lectureQuestions.filter(q => !quizResults[q.id]);
  const practice = useMemo(() => (practiceQuestions ?? []).flatMap(question => {
    const result = readPracticeReview(values, question);
    return result ? [{ question, result }] : [];
  }), [practiceQuestions, values]);
  const overduePractice = practice.filter(({ result }) => result.nextReviewDate && result.nextReviewDate <= today);
  const weakPractice = practice.filter(({ result }) => !result.isCorrect);
  const [practiceFilter, setPracticeFilter] = useState<'due' | 'weak' | null>(null);
  const visiblePractice = practice.filter(({ result }) => {
    const dueNow = Boolean(result.nextReviewDate && result.nextReviewDate <= today);
    if (practiceFilter === 'due') return dueNow;
    if (practiceFilter === 'weak') return !result.isCorrect;
    return !result.isCorrect || dueNow;
  });
  const dueCount = due.length + overduePractice.length;
  const weakCount = weak.length + weakPractice.length;
  const firstPractice = !lastVisitedLectureId && !session && !hasCaseHistory && !practice.length
    && !quizHistory.length && !revisedQuestionCount && !Object.keys(quizResults).length && !Object.values(completedLectures).some(Boolean);
  const reviewHeading = firstPractice ? '確認問題' : dueCount ? '今日の復習' : weakCount ? '間違えた問題を見直す' : '次に解く問題';
  const dailyLabel = dueCount ? `今日の復習：${dueCount}問`
    : firstPractice ? '最初の確認問題を解く' : '未回答の確認問題を解く';
  const reviewDescription = firstPractice
    ? '回答履歴はまだありません。まずは講義の確認問題を解いてみましょう。'
    : dueCount ? '復習日を迎えた問題から解き直せます。'
    : weakCount ? '間違えた問題は、復習日を待たずに解き直せます。'
    : '復習日を迎えた問題はありません。';
  const q = queue[index];
  const readingUnitHref = q?.href.startsWith('/learn/lectures/') ? q.href.split('#', 1)[0] : undefined;

  const replaceSession = (next: ReviewSession | null, status: ReviewState['status'] = 'active') => {
    sessionRef.current = next;
    setStorageAvailable(saveReviewSession(browserReviewStorage(), next));
    setReview({ session: next, status });
  };
  const currentSession = () => {
    const current = sessionRef.current;
    const valid = current && validateReviewSession(current, owner, bank);
    if (current && !valid) replaceSession(null, 'invalid');
    return valid;
  };

  useEffect(() => {
    if (!review.session || session) return;
    // Hide invalid content immediately; remove its checkpoint without replaying any answer.
    const invalidId = review.session.id;
    if (sessionRef.current?.id === invalidId) {
      sessionRef.current = null;
      saveReviewSession(browserReviewStorage(), null);
    }
    const timer = setTimeout(() => setReview(current => current.session?.id === invalidId ? { session: null, status: 'invalid' } : current), 0);
    return () => clearTimeout(timer);
  }, [review.session, session]);
  useEffect(() => {
    const targetId = focusTarget.current;
    if (!targetId) return;
    const timer = setTimeout(() => {
      const target = document.getElementById(targetId);
      target?.scrollIntoView({ block: 'start', behavior: 'instant' });
      target?.focus({ preventScroll: true });
      focusTarget.current = null;
    }, 0);
    return () => clearTimeout(timer);
  }, [session, review.status]);
  useEffect(() => {
    if (!practice.length || window.location.hash !== `#${PRACTICE_REVIEW_SECTION_ID}`) return;
    const frame = requestAnimationFrame(focusPracticeReviewList);
    return () => cancelAnimationFrame(frame);
  }, [practice.length]);

  const start = (questions: LearningQuestion[]) => {
    if (!questions.length) return;
    const next = createReviewSession(questions, owner, crypto.randomUUID());
    if (!next) return;
    trackEvent('review_start', { placement: 'learning_review', total: questions.length });
    focusTarget.current = 'learning-review-practice';
    replaceSession(next);
  };
  const startDailyReview = () => {
    if (overduePractice.length) {
      setPracticeFilter('due');
      focusPracticeReviewList();
    } else {
      start(due.length ? due.slice(0, 10) : unlearned.slice(0, 3));
    }
  };
  const startWeakReview = () => {
    if (weakPractice.length) {
      setPracticeFilter('weak');
      focusPracticeReviewList();
    } else {
      start(weak);
    }
  };
  const choose = (answerIndex: number) => {
    const current = currentSession();
    const next = current && chooseReviewAnswer(current, answerIndex, bank);
    if (next) replaceSession(next);
  };
  const answer = () => {
    const current = currentSession();
    const next = current && submitReviewAnswer(current, bank);
    if (!next || next.choice === null) return;
    const question = bank.find(item => item.id === next.questions[next.index].id)!;
    // Update the ref synchronously: rapid clicks and restoring a submitted question cannot grade twice.
    focusTarget.current = 'learning-review-feedback';
    replaceSession(next);
    saveQuizResult({ questionId: question.id, lectureId: question.lectureId, lectureTitle: question.lectureTitle,
      chapterId: question.chapterId, chapterTitle: question.chapterTitle, questionText: question.question,
      userAnswerIndex: next.choice, correctAnswerIndex: question.correctIndex, isCorrect: next.choice === question.correctIndex,
      options: [...question.options], explanation: question.explanation, answeredAt: new Date().toISOString(),
      revision: question.revision, kind: question.kind, practiceHref: question.href });
    if (question.kind === 'acupoint') {
      const [, code, skill] = question.id.split('-');
      recordAnswerInStore({ id: question.id, acupointCode: code, skill: skill as StudySkillType,
        prompt: question.question, options: question.options.map((text, i) => ({ id: String(i), text })),
        correctOptionId: String(question.correctIndex), explanation: question.explanation,
        meridianName: '', locationReference: '' }, String(next.choice), next.choice === question.correctIndex, today);
    }
  };
  const nextQuestion = () => {
    const current = currentSession();
    if (!current || current.answers[current.index] === null) return;
    const next = advanceReviewSession(current, bank);
    if (!next && current.returnTo) {
      const original = returnFromReviewDetour(current, bank);
      focusTarget.current = original ? 'learning-review-practice' : null;
      replaceSession(original, original ? 'returned' : 'invalid');
      return;
    }
    if (!next) trackEvent('review_complete', { placement: 'learning_review', score: reviewSessionScore(current, bank), total: current.questions.length });
    focusTarget.current = next ? 'learning-review-practice' : 'learning-review-complete';
    replaceSession(next, next ? 'active' : 'complete');
  };
  const openSimilar = (question: LearningQuestion) => {
    const current = currentSession();
    const next = current && startReviewDetour(current, [question], crypto.randomUUID(), bank);
    if (!next) return;
    focusTarget.current = 'learning-review-practice';
    replaceSession(next);
  };
  const returnToOriginal = () => {
    const current = currentSession();
    const original = current && returnFromReviewDetour(current, bank);
    if (!original) return;
    focusTarget.current = 'learning-review-practice';
    replaceSession(original, 'returned');
  };
  const similar = q && !session?.returnTo && lectureQuestions.find(other => other.id !== q.id && other.lectureId === q.lectureId);
  const questionsForFilter = practiceFilter === 'weak' ? weak : due.slice(0, 10);
  const mainAction = 'min-h-11 rounded-xl bg-[#1E3D34] p-3 text-left text-white';
  const secondaryAction = 'min-h-11 rounded-xl bg-white p-3 text-left text-[#1E3D34] dark:bg-[#17212A] dark:text-[#83BEA8]';
  const reviewControls = <>
      {!compact && !session && <p className="text-sm leading-relaxed ui-muted">{reviewDescription}</p>}
      <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-3 text-sm`}>
        {dueCount > 0 && <button type="button" onClick={startDailyReview} className={mainAction}>{dailyLabel}</button>}
        {weakCount > 0 && <button type="button" onClick={startWeakReview} className={dueCount ? secondaryAction : mainAction}>間違えた問題：{weakCount}問</button>}
        {dueCount === 0 && unlearned.length > 0 && (
          <button type="button" onClick={startDailyReview} className={weakCount ? secondaryAction : mainAction}>{dailyLabel}</button>
        )}
        {compact && dueCount === 0 && weakCount === 0 && unlearned.length === 0 && <p className="p-3 ui-muted">復習日を迎えた問題はありません。</p>}
        {!compact && (
          <Link href={lastVisitedLectureId ? `/curriculum/${lastVisitedLectureId}` : '/learn/lectures/getting-started'} className="inline-flex min-h-11 items-center rounded-xl bg-white dark:bg-[#17212A] p-3 text-[#1E3D34] dark:text-[#83BEA8]">
            {lastVisitedLectureId ? '前回の講義を読む' : '第1講を読む'}
          </Link>
        )}
      </div>
  </>;
  const reviewSupport = <div className="review-support space-y-3">
      {isMounted && quizHistory.length > 0 && <details className="review-support-detail"><summary>最近の回答・復習履歴（{quizHistory.length}件）</summary><ol className="space-y-2">{quizHistory.slice(-10).reverse().map((record, i) => <li key={`${record.questionId}-${record.answeredAt}-${i}`} className="border-t pt-2"><Link href={record.practiceHref ? restoreLegacyExerciseHref(record.practiceHref) : `/curriculum/${record.lectureId}`} className="underline">{record.lectureTitle}</Link>：{record.isCorrect ? '正解' : '要復習'}<br/><time dateTime={record.answeredAt} className="text-xs">{new Date(record.answeredAt).toLocaleString('ja-JP')}</time></li>)}</ol><p className="text-xs mt-2">現在の出題内容と一致する回答を復習予定に使用します。</p></details>}
      <details className="review-support-detail"><summary>復習のしくみ</summary><p className="pb-3 leading-relaxed">正解を別の日に確認できた回数に応じ、1・3・7・14・30日後に復習します。同日の再挑戦は練習として記録し、復習間隔を延ばしません。学習履歴の保存状況は、この画面で確認できます。</p></details>
      {showCaseReview ? <>
        <Link href="/simulator#case-training" className="inline-block min-h-11 content-center text-sm font-semibold underline text-[#1E3D34] dark:text-[#83BEA8]">症例で判断の根拠を練習する →</Link>
        <LearningFocusReview onStart={start} />
      </> : <Link href={shortExampleHref} className="inline-block min-h-11 content-center text-sm font-semibold underline text-[#1E3D34] dark:text-[#83BEA8]">短い例で、学んだ用語を振り返る →</Link>}
  </div>;
  return (
    <section id="learning-review" className={compact ? 'curriculum-review-compact scroll-mt-24 print:hidden' : 'scroll-mt-24 rounded-2xl border border-[#C5DED4] dark:border-[#2A5243] bg-[#EBF3EF] dark:bg-[#182823] p-4 sm:p-6 space-y-4 print:hidden'}>
      {compact ? <details className="curriculum-review-disclosure">
        <summary><span>{reviewHeading}</span>{dueCount > 0 && <span className="curriculum-review-due">{dueCount}問</span>}</summary>
        <div className="space-y-4 pb-4 pt-2">{reviewControls}{!showSyncAttention && <LearningSyncStatus compact />}{reviewSupport}</div>
      </details> : <><h2 className="font-serif text-lg font-bold text-[#1E3D34] dark:text-[#83BEA8]">{reviewHeading}</h2>{reviewControls}<LearningSyncStatus compact /></>}
      {practice.length > 0 && (
        <section id={PRACTICE_REVIEW_SECTION_ID} tabIndex={-1} aria-labelledby="practice-reviews-title" className="scroll-mt-28 space-y-3 rounded-xl border border-frame bg-panel p-4">
          <h3 id="practice-reviews-title" className="font-semibold">図と症例の復習</h3>
          {visiblePractice.length ? (
            <ul className="space-y-2">
              {visiblePractice.map(({ question }) => (
                <li key={question.id}>
                  <Link href={question.href} prefetch={false} className="block min-h-11 rounded-lg border border-frame p-3 hover:border-accent">
                    <span className="block text-sm ui-muted">{question.kind === 'atlas' ? '図の位置当て' : '模擬症例'} · {question.title}</span>
                    <strong className="block text-accent">{question.prompt}</strong>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p role="status" className="text-sm ui-muted">いま解き直す図や症例はありません。</p>}
          {practiceFilter && questionsForFilter.length > 0 && (
            <button type="button" className="ui-text-link min-h-11" onClick={() => start(questionsForFilter)}>
              講義・経穴ドリルを解く（{questionsForFilter.length}問）
            </button>
          )}
        </section>
      )}
      {showSyncAttention && <LearningSyncStatus compact />}
      {isMounted && revisedQuestionCount > 0 && <p className="text-sm font-semibold text-[#835019] dark:text-[#E6C387]">更新前に答えた問題が{revisedQuestionCount}問あります。以前の回答は採点に含めません。新しい問題で確認してください。</p>}
      {review.status === 'restored' && session && <p role="status" className="text-sm font-semibold">中断した復習を再開しました（{index + 1} / {queue.length}問）。選択と回答結果を引き継いでいます。</p>}
      {review.status === 'returned' && session && <p role="status" className="text-sm font-semibold">元の復習に戻りました。回答と出題順を引き継いでいます。</p>}
      {resumeUnavailable && <p id="learning-review-unavailable" tabIndex={-1} role="status" className="scroll-mt-28 text-sm">中断した復習を再開できませんでした。{quizHistory.length > 0 && '最近の回答は「最近の回答・復習履歴」で確認できます。'}</p>}
      {!storageAvailable && session && <p role="status" className="text-sm">このブラウザでは復習の途中状態を一時保存できません。ページを移動すると、このセットの途中状態を引き継げない場合があります。</p>}
      {review.status === 'complete' && <p id="learning-review-complete" tabIndex={-1} className="scroll-mt-28 text-sm font-bold">今回の復習が完了しました。</p>}
      {q && session && <div id="learning-review-practice" role="region" tabIndex={-1} aria-label="現在の復習問題" className="review-question scroll-mt-28 rounded-xl bg-white dark:bg-[#17212A] p-4 space-y-3 text-base text-[#232826] dark:text-[#FAF8F5]">
        {session.returnTo && <div className="rounded-lg border border-[#C5DED4] p-3 text-sm space-y-2"><p>類題を確認中です。この画面から元の復習（{session.returnTo.index + 1} / {session.returnTo.questions.length}問目）に戻ると、回答と出題順を引き継げます。</p><button type="button" className="min-h-11 underline underline-offset-4" onClick={returnToOriginal}>元の復習に戻る</button></div>}
        <p className="text-xs">{index + 1} / {queue.length} ｜ {q.chapterTitle}</p>
        <h3 className="font-bold whitespace-pre-line">{q.question}</h3>
        <div className="space-y-2">{shuffledIndices(q.options.length, `${sessionSeed}-${q.id}`).map((original, display) => <button key={original} type="button" disabled={submitted} aria-pressed={choice === original} onClick={() => choose(original)} className={`quiz-option min-h-11 block w-full rounded-lg border p-3 text-left ${choice === original ? 'border-[#1E3D34] bg-[#EBF3EF] dark:bg-[#182823]' : 'border-[#E8E1D1] dark:border-[#263542]'}`}>
          {display + 1}. {q.options[original]}{submitted && (original === q.correctIndex || choice === original) && <strong className="mt-1 block">{original === q.correctIndex ? "正解" : "選んだ回答（不正解）"}</strong>}
        </button>)}</div>
        {!submitted ? <button type="button" onClick={answer} disabled={choice === null} className="min-h-11 rounded-lg bg-[#1E3D34] text-white px-4 py-2 disabled:opacity-40">回答を確定</button> : <section id="learning-review-feedback" tabIndex={-1} aria-labelledby="learning-review-feedback-title" className="scroll-mt-28 space-y-3">
          <p id="learning-review-feedback-title" className="quiz-result font-bold">{choice === q.correctIndex ? '正解です。' : '不正解です。'}</p>
          <h4 className="quiz-explanation-title font-bold">解説</h4><p className="quiz-explanation-body whitespace-pre-line">{q.explanation}</p>
          {syncStatus === 'local' && quizResults[q.id]?.nextReviewDate && <p className="text-xs">次回復習：{quizResults[q.id].nextReviewDate}</p>}
          <div className="flex flex-wrap gap-3 text-sm">
            <Link className="ui-text-link inline-flex min-h-11 items-center" href={readingUnitHref ? reviewSessionLectureHref(q.href, session.id) : `/curriculum/${q.lectureId}?review=${encodeURIComponent(q.id)}&reviewSession=${session.id}#review-question-card`}>
              {readingUnitHref ? '講義の要点を読む' : '講義で解説を読む'}
            </Link>
            {similar && <button type="button" className="ui-text-link min-h-11" onClick={() => openSimilar(similar)}>同じテーマの類題で確認</button>}
            <Link className="ui-text-link inline-flex min-h-11 items-center" href={showCaseReview ? '/simulator#case-training' : shortExampleHref}>{showCaseReview ? '症例演習へ' : '短い例で振り返る'}</Link>
          </div>
          <button type="button" onClick={nextQuestion} className="min-h-11 rounded-lg bg-[#1E3D34] text-white px-4 py-2">{index + 1 < queue.length ? '次の問題へ' : session.returnTo ? '類題を終えて元の復習に戻る' : '復習を完了する'}</button>
          <QuestionEvidence lectureId={q.lectureId} revision={q.revision} readingUnitHref={readingUnitHref} />
        </section>}
      </div>}
      {!compact && reviewSupport}
    </section>
  );
}
