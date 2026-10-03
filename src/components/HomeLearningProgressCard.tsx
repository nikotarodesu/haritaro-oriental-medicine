import { CURRICULUM_DATA } from '@/data/curriculumData';
import HomeLearningProgressClient from '@/components/home/HomeLearningProgressClient';

const lectures = CURRICULUM_DATA.flatMap(chapter => chapter.lectures).map(({ id, title }) => ({ id, title }));
export default function HomeLearningProgressCard() {
  return <HomeLearningProgressClient lectures={lectures} />;
}
