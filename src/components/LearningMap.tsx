'use client';

import React from 'react';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import {
  Compass,
  CheckCircle2,
  Lock,
  ArrowRight,
  Flame,
  Layers,
  Activity,
  HeartPulse,
  AlertTriangle,
  Stethoscope,
  Sparkles,
  Award,
  ChevronRight,
} from 'lucide-react';

interface ChapterMapItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  totalLectures: number;
  description: string;
  icon: React.ElementType;
  badgeColor: string;
  stage: number;
}

const CHAPTERS_MAP: ChapterMapItem[] = [
  // Stage 1: 基礎概念・世界観
  {
    id: 'yin-yang',
    number: 1,
    title: '第1講 陰陽論',
    subtitle: '二極の動的調和と相対性',
    totalLectures: 8,
    description: '対立・互根・消長・転化など、東洋医学の根幹をなす思考の基盤を習得します。',
    icon: Flame,
    badgeColor: 'from-amber-500 to-orange-600',
    stage: 1,
  },
  {
    id: 'five-elements',
    number: 2,
    title: '第2講 五行論',
    subtitle: '五つの性質と関係性ネットワーク',
    totalLectures: 12,
    description: '木火土金水の五大属性、相生・相剋・相乗・相侮の動的ネットワークを理解します。',
    icon: Compass,
    badgeColor: 'from-emerald-500 to-teal-600',
    stage: 1,
  },
  {
    id: 'qi-blood-water',
    number: 3,
    title: '第3講 気血水論',
    subtitle: '生命を巡る基本三要素',
    totalLectures: 12,
    description: '身体の生命エネルギー（気）、栄養（血）、潤い（水）の生成と失調を整理します。',
    icon: Activity,
    badgeColor: 'from-cyan-500 to-blue-600',
    stage: 1,
  },
  {
    id: 'vital-function',
    number: 4,
    title: '第4講 生命機能論',
    subtitle: '精気血津液神と臓腑ネットワーク',
    totalLectures: 12,
    description: '先天・後天の精、営衛、三焦、六対の表裏臓腑の協調メカニズムを統合します。',
    icon: HeartPulse,
    badgeColor: 'from-indigo-500 to-violet-600',
    stage: 1,
  },

  // Stage 2: 病態論・臨床診断
  {
    id: 'pathology',
    number: 5,
    title: '第5講 病機論',
    subtitle: '病因・発症と病態のメカニズム',
    totalLectures: 12,
    description: 'なぜ不調が生じるのか？外邪・内傷・瘀血・寒熱虚実の病理変化を解き明かします。',
    icon: AlertTriangle,
    badgeColor: 'from-rose-500 to-pink-600',
    stage: 2,
  },
  {
    id: 'diagnosis',
    number: 6,
    title: '第6講 診断論',
    subtitle: '安全確認から四診・八綱弁証へ',
    totalLectures: 12,
    description: 'レッドフラッグ確認、望聞問切の四診、八綱・臓腑弁証への論理的統合を学びます。',
    icon: Stethoscope,
    badgeColor: 'from-teal-500 to-emerald-600',
    stage: 2,
  },

  // Stage 3: 治則治法・総合実践
  {
    id: 'treatment',
    number: 7,
    title: '第7講 治法論',
    subtitle: '証から治則・治法・配穴設計へ',
    totalLectures: 12,
    description: '補瀉・寒熱・本標優先順位から、気血津液への具体手技・ツボ処方を網羅します。',
    icon: Sparkles,
    badgeColor: 'from-purple-500 to-indigo-600',
    stage: 3,
  },
  {
    id: 'practice',
    number: 8,
    title: '第8講 実践論',
    subtitle: '臨床推論・症例読解・生活指導の統合',
    totalLectures: 12,
    description: '問診・弁証・施術計画・治療評価・再発予防まで、現場の一連の思考を完全習得します。',
    icon: Award,
    badgeColor: 'from-amber-500 to-emerald-600',
    stage: 3,
  },
];

const STAGES = [
  {
    stage: 1,
    title: 'STAGE 1: 基礎理論・世界観の確立',
    description: '東洋医学のレンズを手に入れ、生命現象を観察する基盤を構築する（第1講〜第4講）',
    bgBadge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300',
  },
  {
    stage: 2,
    title: 'STAGE 2: 病態のメカニズムと臨床診断',
    description: '病の成り立ちを紐解き、五感を用いた観察から的確な証を導き出す（第5講〜第6講）',
    bgBadge: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300',
  },
  {
    stage: 3,
    title: 'STAGE 3: 治療戦略と総合臨床実践',
    description: '証を治法・配穴へ昇華させ、実際の臨床現場で自立して対応する力を養う（第7講〜第8講）',
    bgBadge: 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300',
  },
];

interface LearningMapProps {
  onSelectChapter?: (chapterId: string) => void;
}

export const LearningMap: React.FC<LearningMapProps> = ({ onSelectChapter }) => {
  const { isMounted, getChapterProgress, totalPercentage, totalCompleted } = useCurriculumProgress();

  const handleScrollToChapter = (chapterId: string) => {
    if (onSelectChapter) {
      onSelectChapter(chapterId);
    }
    const elem = document.getElementById(`chapter-${chapterId}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-lg mb-12">
      {/* マップタイトルと全体概要 */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
            <Compass className="w-4 h-4" />
            東洋医学ロードマップ
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            全8大体系 学習マップ
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
            基礎理論から臨床推論まで、全92レッスンで東洋医学の全体構造をマスターします。
          </p>
        </div>

        {/* 全体達成サマリー */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl px-5 py-3.5 shadow-sm">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">全体カリキュラム進捗</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {isMounted ? `${totalCompleted} / 92` : '0 / 92'}
              <span className="text-xs font-normal text-slate-500 ml-1.5">講義完了</span>
            </div>
          </div>
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-slate-700"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${isMounted ? totalPercentage : 0}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-black text-slate-800 dark:text-slate-100">
              {isMounted ? `${totalPercentage}%` : '0%'}
            </span>
          </div>
        </div>
      </div>

      {/* ステージ別グリッド */}
      <div className="mt-8 space-y-10">
        {STAGES.map((st) => {
          const stageChapters = CHAPTERS_MAP.filter((c) => c.stage === st.stage);

          return (
            <div key={st.stage} className="relative">
              {/* ステージヘッダー */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${st.bgBadge}`}>
                    STAGE {st.stage}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
                    {st.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {st.description}
                </p>
              </div>

              {/* 章カード一覧 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stageChapters.map((ch) => {
                  const progress = isMounted
                    ? getChapterProgress(ch.id, ch.totalLectures)
                    : { completedCount: 0, percentage: 0 };
                  const isFinished = isMounted && progress.percentage === 100;
                  const IconComponent = ch.icon;

                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => handleScrollToChapter(ch.id)}
                      className={`group relative text-left p-5 rounded-2xl border transition-all flex flex-col justify-between hover:shadow-md hover:-translate-y-1 ${
                        isFinished
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                          : progress.completedCount > 0
                          ? 'bg-white dark:bg-slate-800/90 border-emerald-200 dark:border-emerald-900/60 shadow-sm'
                          : 'bg-white/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      {/* 上部アイコン & バッジ */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ch.badgeColor} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          {isFinished ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-300/60">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              修了
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              全{ch.totalLectures}講
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                          {ch.title}
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-snug mt-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {ch.subtitle}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {ch.description}
                        </p>
                      </div>

                      {/* 下部進捗バー */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                          <span className="text-slate-500 dark:text-slate-400">
                            進捗: {progress.completedCount}/{ch.totalLectures}
                          </span>
                          <span
                            className={
                              isFinished
                                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                                : 'text-slate-700 dark:text-slate-300'
                            }
                          >
                            {progress.percentage}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                      </div>

                      {/* ホバー時に現れるジャンプ表示 */}
                      <div className="mt-3 flex items-center justify-end gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>学習する</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
