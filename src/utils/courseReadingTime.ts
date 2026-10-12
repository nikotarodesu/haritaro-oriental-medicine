import type { LearningCourse } from '@/data/learningCourses';

/** Sum the existing reading estimates for the selected steps, not the whole chapter. */
export function getCourseReadingMinutes(course: Pick<LearningCourse, 'steps'>, lectures: ReadonlyArray<{ id: string; duration: string; isPublished?: boolean }>): number {
  const byId = new Map(lectures.map(lecture => [lecture.id, lecture]));
  return course.steps.reduce((total, step) => {
    const lecture = byId.get(step.lectureId);
    const minutes = lecture?.duration.match(/^(\d+)分$/);
    if (!lecture || lecture.isPublished === false || !minutes || Number(minutes[1]) <= 0) {
      throw new Error(`Missing published reading estimate: ${step.lectureId}`);
    }
    return total + Number(minutes[1]);
  }, 0);
}
