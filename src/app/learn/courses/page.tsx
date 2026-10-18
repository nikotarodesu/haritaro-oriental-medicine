import { permanentRedirect } from 'next/navigation';

/** Keep existing course-list bookmarks while the learning hub owns the list and progress. */
export default function LearningCoursesPage() {
  permanentRedirect('/learn#learn-courses-heading');
}
