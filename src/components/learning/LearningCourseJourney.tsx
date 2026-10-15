export default function LearningCourseJourney() {
  const stages = [
    { title: '短い例で考える', description: '最初は事実と不明点を分ける' },
    { title: '必要な理論を読む', description: '講義・図解・クイズで確かめる' },
    { title: '同じ例を見直す', description: '解答例と比べ、考えた理由を振り返る' },
  ];
  return (
    <ol aria-label="コースの学び方" className="course-journey">
      {stages.map(({ title, description }, index) => (
        <li key={title}>
          <span aria-hidden="true" className="course-journey-number">{index + 1}</span>
          <div><p className="course-journey-title">{title}</p><p className="course-journey-description">{description}</p></div>
        </li>
      ))}
    </ol>
  );
}
