import { permanentRedirect } from 'next/navigation';
import { LEARNING_COURSES_HREF } from '@/utils/courseJourney';

/** Keep existing course-list bookmarks while the learning hub owns the list and progress. */
export default function LearningCoursesPage() {
  permanentRedirect(LEARNING_COURSES_HREF);
}
