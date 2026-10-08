'use client';

import React, { createContext, useContext, useMemo, useCallback } from 'react';
import type { LearningProgressCatalog } from '@/types/learningProgressCatalog';
import { ReviewSchedule, localStudyDate, updateReviewSchedule } from '@/utils/learningReview';
import { useLearningSync } from '@/contexts/LearningSyncContext';
import { validQuizRecord, mergeQuizAttempts } from '@/utils/learningQuizHistory';
import { CURRICULUM_CHAPTERS_META } from '@/data/curriculumOutline';

const CURRENT_LECTURE_IDS = new Set(CURRICULUM_CHAPTERS_META.flatMap(chapter => chapter.lectureIds));
const CHAPTER_LECTURE_IDS = new Map(CURRICULUM_CHAPTERS_META.flatMap(chapter =>
  [chapter.id, chapter.progressKey, chapter.seriesId].map(key => [key, new Set(chapter.lectureIds)] as const)));

export interface QuizResultRecord extends ReviewSchedule {
  questionId: string;
  lectureId: string;
  chapterId: string;
  chapterTitle: string;
  lectureTitle: string;
  questionText: string;
  userAnswerIndex: number;
  correctAnswerIndex: number;
  isCorrect: boolean;
  explanation: string;
  options: string[];
  answeredAt: string;
  kind?: 'lecture' | 'exam' | 'acupoint';
  practiceHref?: string;
  historyEpoch?: string;
}

export interface ChapterProgressInfo {
  chapterId: string;
  totalLectures: number;
  completedCount: number;
  percentage: number;
}

export interface CurriculumProgressContextType {
  isMounted: boolean;
  completedLectures: Record<string, boolean>;
  lastVisitedLectureId: string | null;
  quizResults: Record<string, QuizResultRecord>;
  quizHistory: QuizResultRecord[];
  revisedQuestionCount: number;
  toggleLectureCompleted: (lectureId: string) => void;
  setLectureCompleted: (lectureId: string, completed: boolean) => void;
  recordVisitedLecture: (lectureId: string) => void;
  saveQuizResult: (record: QuizResultRecord) => void;
  clearQuizResult: (questionId: string) => void;
  resetAllProgress: () => void;
  totalCompleted: number;
  totalPercentage: number;
  totalPublished: number;
  totalPlanned: number;
  getChapterProgress: (chapterId: string, totalInChapter: number) => ChapterProgressInfo;
  getNextResumeLectureId: (allLectureIds: string[]) => string | null;
  getIncorrectQuestions: () => QuizResultRecord[];
}

const CurriculumProgressContext = createContext<CurriculumProgressContextType | undefined>(undefined);

export function CurriculumProgressProvider({ children, catalog }: { children: React.ReactNode; catalog: LearningProgressCatalog }) {
  const LEARNING_QUESTION_MAP = useMemo(() => new Map(catalog.questions.map(question => [question.id, question])), [catalog.questions]);
  const TOTAL_ALL_LECTURES = catalog.totalPublished;
  const TOTAL_PLANNED_LECTURES = catalog.totalPlanned;
  const { values, ready: isMounted, setEntry, reset } = useLearningSync();
  const completedLectures = useMemo(() => Object.fromEntries(Object.entries(values).filter(([key, value]) => key.startsWith('lecture:') && value === true).map(([key]) => [key.slice(8), true])), [values]);
  const lastVisitedLectureId = typeof values['last-visit'] === 'string' ? values['last-visit'] : null;
  const quizHistory = useMemo(() => Object.entries(values).filter(([key, value]) => key.startsWith('attempt:') && validQuizRecord(value)).sort(([keyA, valueA], [keyB, valueB]) => (valueA as QuizResultRecord).answeredAt.localeCompare((valueB as QuizResultRecord).answeredAt) || ((valueA as QuizResultRecord).attempts || 0) - ((valueB as QuizResultRecord).attempts || 0) || keyA.localeCompare(keyB)).map(([, value]) => value as QuizResultRecord), [values]);
  const storedQuizResults = useMemo(() => Object.fromEntries(Object.entries(values).filter(([key, value]) => key.startsWith('quiz:') && validQuizRecord(value)).map(([key, value]) => {
    const record = value as QuizResultRecord;
    return [key.slice(5), mergeQuizAttempts(record, quizHistory)];
  })), [values, quizHistory]);
  const quizResults = useMemo(() => Object.fromEntries(Object.entries(storedQuizResults).filter(([id, record]) => {
    const current = LEARNING_QUESTION_MAP.get(id);
    return current ? record.revision === current.revision : record.kind === 'acupoint' && !!record.revision;
  })), [storedQuizResults, LEARNING_QUESTION_MAP]);
  const revisedQuestionCount = Object.keys(storedQuizResults).filter(id => LEARNING_QUESTION_MAP.has(id) && !quizResults[id]).length;

  const toggleLectureCompleted = (lectureId: string) => {
    setEntry('lecture:' + lectureId, !completedLectures[lectureId]);
  };

  const setLectureCompleted = (lectureId: string, completed: boolean) => {
    setEntry('lecture:' + lectureId, completed);
  };

  const recordVisitedLecture = (lectureId: string) => {
    setEntry('last-visit', lectureId);
  };

  const saveQuizResult = useCallback((record: QuizResultRecord) => {
    const current = LEARNING_QUESTION_MAP.get(record.questionId);
    const revision = current?.revision || record.revision;
    if (!revision) return;
    const schedule = updateReviewSchedule(storedQuizResults[record.questionId], record.isCorrect, revision, localStudyDate(new Date(record.answeredAt)));
    const saved = { ...record, ...schedule, historyEpoch: String(values['settings:quiz-epoch/' + record.questionId] || 'legacy'), kind: current?.kind || record.kind, practiceHref: current?.href || record.practiceHref };
    setEntry('quiz:' + record.questionId, saved);
    setEntry('attempt:' + crypto.randomUUID(), saved);
  }, [storedQuizResults, setEntry, values, LEARNING_QUESTION_MAP]);

  const clearQuizResult = useCallback((questionId: string) => {
    setEntry('quiz:' + questionId, null);
    setEntry('settings:quiz-epoch/' + questionId, crypto.randomUUID());
  }, [setEntry]);

  const resetAllProgress = () => {
    if (confirm('受講進捗と学習・復習履歴をリセットしますか？ログイン中は他の端末にも反映されます。')) {
      reset();
    }
  };

  const totalCompleted = Object.keys(completedLectures).filter(
    (key) => CURRENT_LECTURE_IDS.has(key) && completedLectures[key]
  ).length;

  const totalPercentage = Math.min(
    100,
    Math.round((totalCompleted / TOTAL_ALL_LECTURES) * 100)
  );

  const getChapterProgress = (
    chapterId: string,
    totalInChapter: number
  ): ChapterProgressInfo => {
    const chapterLectures = CHAPTER_LECTURE_IDS.get(chapterId);
    const completedCount = Object.keys(completedLectures).filter(
      (key) => chapterLectures?.has(key) && completedLectures[key]
    ).length;

    const percentage = totalInChapter > 0 ? Math.min(100, Math.round((completedCount / totalInChapter) * 100)) : 0;

    return {
      chapterId,
      totalLectures: totalInChapter,
      completedCount,
      percentage,
    };
  };

  const getNextResumeLectureId = (allLectureIds: string[]): string | null => {
    if (!allLectureIds || allLectureIds.length === 0) return null;

    // 1. 最後に訪問した講義が未完了ならそれを優先
    if (lastVisitedLectureId && allLectureIds.includes(lastVisitedLectureId) && !completedLectures[lastVisitedLectureId]) {
      return lastVisitedLectureId;
    }

    // 2. 最後に訪問した講義が完了している場合、その次の講義を探す
    if (lastVisitedLectureId) {
      const currentIndex = allLectureIds.indexOf(lastVisitedLectureId);
      if (currentIndex !== -1 && currentIndex + 1 < allLectureIds.length) {
        const nextId = allLectureIds[currentIndex + 1];
        if (!completedLectures[nextId]) {
          return nextId;
        }
      }
    }

    // 3. 全リストの中で最初の未完了講義を探す
    const firstUncompleted = allLectureIds.find((id) => !completedLectures[id]);
    if (firstUncompleted) return firstUncompleted;

    // 全て完了している場合は先頭を返すかlastVisitedを返す
    return lastVisitedLectureId || allLectureIds[0];
  };

  const getIncorrectQuestions = (): QuizResultRecord[] => {
    return Object.values(quizResults).filter((r) => !r.isCorrect);
  };

  return (
    <CurriculumProgressContext.Provider
      value={{
        isMounted,
        completedLectures,
        lastVisitedLectureId,
        quizResults,
        quizHistory,
        revisedQuestionCount,
        toggleLectureCompleted,
        setLectureCompleted,
        recordVisitedLecture,
        saveQuizResult,
        clearQuizResult,
        resetAllProgress,
        totalCompleted,
        totalPercentage,
        totalPublished: TOTAL_ALL_LECTURES,
        totalPlanned: TOTAL_PLANNED_LECTURES,
        getChapterProgress,
        getNextResumeLectureId,
        getIncorrectQuestions,
      }}
    >
      {children}
    </CurriculumProgressContext.Provider>
  );
}

export function useCurriculumProgress() {
  const context = useContext(CurriculumProgressContext);
  if (!context) {
    throw new Error('useCurriculumProgress must be used within a CurriculumProgressProvider');
  }
  return context;
}
