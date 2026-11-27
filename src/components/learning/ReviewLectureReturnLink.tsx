'use client';

import { useSearchParams } from 'next/navigation';
import ContentNavigationLink from './ContentNavigationLink';
import { reviewSessionReturnHref, validReviewSessionId } from '@/utils/reviewSession';

export default function ReviewLectureReturnLink() {
  const reviewSession = useSearchParams().get('reviewSession');
  const resume = validReviewSessionId(reviewSession);
  return (
    <ContentNavigationLink
      href={reviewSessionReturnHref(reviewSession)}
      scroll={!resume}
      placement="reading_unit_review"
      className="ui-text-link inline-flex min-h-11 items-center"
    >
      {resume ? '中断した復習に戻る' : '確認問題と復習'}
    </ContentNavigationLink>
  );
}
