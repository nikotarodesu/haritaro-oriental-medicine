'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { getCurriculumStats } from '@/data/curriculumData';
import { LEARNING_QUESTION_MAP } from '@/data/learningQuestionBank';
import { ReviewSchedule, localStudyDate, updateReviewSchedule } from '@/utils/learningReview';

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

const STORAGE_KEY = 'haritaro-learning-progress-v1';
const CURRICULUM_STATS = getCurriculumStats();
const TOTAL_ALL_LECTURES = CURRICULUM_STATS.totalPublishedLessons; // 全81レッスン
const TOTAL_PLANNED_LECTURES = CURRICULUM_STATS.totalPlannedLessons; // 全81レッスン

const CurriculumProgressContext = createContext<CurriculumProgressContextType | undefined>(undefined);

export function CurriculumProgressProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [completedLectures, setCompletedLectures] = useState<Record<string, boolean>>({});
  const [lastVisitedLectureId, setLastVisitedLectureId] = useState<string | null>(null);
  const [storedQuizResults, setQuizResults] = useState<Record<string, QuizResultRecord>>({});
  const [reviewSchedules, setReviewSchedules] = useState<Record<string, ReviewSchedule>>({});
  const scheduleRef = useRef<Record<string, ReviewSchedule>>({});
  const quizResults = useMemo(() => Object.fromEntries(Object.entries(storedQuizResults).filter(([id, record]) => {
    const current = LEARNING_QUESTION_MAP.get(id);
    return current ? record.revision === current.revision : record.kind === 'acupoint' && !!record.revision;
  })), [storedQuizResults]);
  const revisedQuestionCount = Object.keys(storedQuizResults).filter(id => LEARNING_QUESTION_MAP.has(id) && !quizResults[id]).length;

  // クライアントサイドでのみlocalStorageから復元
  useEffect(() => {
    const timer = setTimeout(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.completedLectures) setCompletedLectures(parsed.completedLectures);
        if (parsed.lastVisitedLectureId) setLastVisitedLectureId(parsed.lastVisitedLectureId);
        if (parsed.quizResults) setQuizResults(parsed.quizResults);
        scheduleRef.current = parsed.reviewSchedules || {};
        setReviewSchedules(scheduleRef.current);
      }
    } catch (e) {
      console.error('Failed to load learning progress from localStorage:', e);
    }
    setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 変更時にlocalStorageへ保存
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          completedLectures,
          lastVisitedLectureId,
          quizResults: storedQuizResults,
          reviewSchedules,
        })
      );
    } catch (e) {
      console.error('Failed to save learning progress to localStorage:', e);
    }
  }, [completedLectures, lastVisitedLectureId, storedQuizResults, reviewSchedules, isMounted]);

  const toggleLectureCompleted = (lectureId: string) => {
    setCompletedLectures((prev) => {
      const next = { ...prev };
      if (next[lectureId]) {
        delete next[lectureId];
      } else {
        next[lectureId] = true;
      }
      return next;
    });
  };

  const setLectureCompleted = (lectureId: string, completed: boolean) => {
    setCompletedLectures((prev) => {
      const next = { ...prev };
      if (completed) {
        next[lectureId] = true;
      } else {
        delete next[lectureId];
      }
      return next;
    });
  };

  const recordVisitedLecture = (lectureId: string) => {
    setLastVisitedLectureId(lectureId);
  };

  const saveQuizResult = useCallback((record: QuizResultRecord) => {
    const current = LEARNING_QUESTION_MAP.get(record.questionId);
    const revision = current?.revision || record.revision;
    if (!revision) return;
    const schedule = updateReviewSchedule(scheduleRef.current[record.questionId], record.isCorrect, revision, localStudyDate(new Date(record.answeredAt)));
    scheduleRef.current = { ...scheduleRef.current, [record.questionId]: schedule };
    setReviewSchedules(scheduleRef.current);
    setQuizResults((prev) => ({
      ...prev,
      [record.questionId]: { ...record, ...schedule, kind: current?.kind || record.kind, practiceHref: current?.href || record.practiceHref },
    }));
  }, []);

  const clearQuizResult = useCallback((questionId: string) => {
    setQuizResults((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  }, []);

  const resetAllProgress = () => {
    if (confirm('受講進捗とクイズの回答履歴をすべてリセットしますか？この操作は取り消せません。')) {
      setCompletedLectures({});
      setLastVisitedLectureId(null);
      setQuizResults({});
      setReviewSchedules({});
      scheduleRef.current = {};
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const totalCompleted = Object.keys(completedLectures).filter(
    (key) => completedLectures[key]
  ).length;

  const totalPercentage = Math.min(
    100,
    Math.round((totalCompleted / TOTAL_ALL_LECTURES) * 100)
  );

const CHAPTER_PREFIX_MAP: Record<string, string[]> = {
  'yin-yang': ['lecture-yinyang-'],
  'yinyang': ['lecture-yinyang-'],
  'five-elements': ['lecture-wuxing-'],
  'wuxing': ['lecture-wuxing-'],
  'qi-blood-water': ['lecture-qiblood-'],
  'qiblood': ['lecture-qiblood-'],
  'vital-function': ['lecture-lifedynamics-'],
  'lifedynamics': ['lecture-lifedynamics-'],
  'pathology': ['lecture-pathomechanism-'],
  'pathomechanism': ['lecture-pathomechanism-'],
  'diagnosis': ['lecture-diagnosis-'],
  'treatment': ['lecture-treatment-'],
  'practice': ['lecture-practice-'],
};

  const getChapterProgress = (
    chapterId: string,
    totalInChapter: number
  ): ChapterProgressInfo => {
    const prefixes = CHAPTER_PREFIX_MAP[chapterId] || [`lecture-${chapterId}-`];
    const completedCount = Object.keys(completedLectures).filter(
      (key) => prefixes.some((p) => key.startsWith(p)) && completedLectures[key]
    ).length;

    const percentage = totalInChapter > 0 ? Math.round((completedCount / totalInChapter) * 100) : 0;

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
    if (lastVisitedLectureId && !completedLectures[lastVisitedLectureId]) {
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
