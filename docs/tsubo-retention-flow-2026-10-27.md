# Dictionary → practice → return visits

The dictionary search/list and every acupoint detail now expose the existing practice flow without expanding a secondary menu. A detail link uses the validated meridian course already supported by PracticeClient; it describes that meridian rather than promising the exact point will be randomly selected.

The shared entry reads existing account-scoped study records, active work and paused sessions. It prioritizes unfinished work, paused work and due review before a new course, and shows answered counts or the next real review date. Home shows this entry only after acupoint practice. It does not write a separate history, replace an active session or merge guest/account records. Reads wait for the current owner; identity changes remount the reader and discard the preceding snapshot.

A completed stored session with no requested course now opens practice home on a later visit. Previously it restored the old result. Completion shows the next scheduled date from the existing records instead of a fixed “1–3 days” estimate. Both the result and practice home explain where to return and suggest bookmarking the stable `/tsubo/practice` route. Returning home clears the course query through the existing guarded exit action. Interrupted work is still paused before replacement and storage failures preserve the previous work.

The batch grading toolbar is positioned below the measured site header, fixing overlap when scrolling on small screens. The due-review button no longer promises ten questions when the existing generator can produce a different number.

`tsubo_practice_start`, `tsubo_practice_resume` and `tsubo_practice_complete` contain only fixed placement and total question count. Resume events are deduplicated within the mounted practice view. No session/account/point ID, prompt, answer or score is added to analytics. Existing URL/referrer sanitization remains in force. These actions participate in the existing same-browser learning-day signal and appear in the growth report. That signal is not a cohort retention rate or a measurement of browser bookmark completion.

Regression coverage includes active/paused/due/next-date states, invalid dates, a completed session on return, a real result-to-home button flow, interrupted answers, account isolation, storage failures and bounded analytics payloads. Existing home/learning-entry and analytics regressions pass. Browser checks use a local guest with external analytics disabled: dictionary detail → ten-question course → one answer → dictionary/home → reload → resume with answer retained → complete → real next-date display → reload to home. A second six-question course verifies mobile grading and the result-to-home button. A 390px viewport has no horizontal overflow; grading is below the header. Screenshots are captured from test data, not visitors' private histories.

ESLint reports zero errors; the 13 warnings in PracticeClient also exist in the baseline. No billing, pricing, clinical content, quiz answers, repetition intervals, or cloud schemas are changed.

The final TypeScript check and 576-page Webpack production build pass.
