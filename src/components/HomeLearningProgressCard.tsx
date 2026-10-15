import { CURRICULUM_DATA } from '@/data/curriculumData';
import HomeLearningProgressClient from '@/components/home/HomeLearningProgressClient';
import HomeLearningStartClient from '@/components/home/HomeLearningStartClient';

const lectures = CURRICULUM_DATA.flatMap(chapter => chapter.lectures).map(({ id, title }) => ({ id, title }));
export default function HomeLearningProgressCard({ variant = 'card' }: { variant?: 'card' | 'hero' | 'support' }) {
  if (variant === 'hero') return <HomeLearningStartClient lectures={lectures} />;
  return <HomeLearningProgressClient lectures={lectures} supportOnly={variant === 'support'} />;
}
