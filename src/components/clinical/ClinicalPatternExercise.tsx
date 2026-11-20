'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import styles from './ClinicalPractice.module.css';

const choices = [
  { id: 'qi-deficiency', label: '気虚を考える' },
  { id: 'qi-stagnation', label: '気滞を考える' },
  { id: 'defer', label: '情報が足りないので保留する' },
] as const;
type Choice = typeof choices[number]['id'];

const examples = [
  {
    id: 'fatigue',
    title: '動くと疲れる',
    presentation: '買い物や掃除をすると疲れ、休むと楽になる。最近は食事の量が減り、話し声にも力がない。',
    answer: 'qi-deficiency',
    explanation: 'この例では、買い物や掃除で疲れ、休むと楽になります。声に力がなく、食事の量も減ったため、気虚を候補に挙げます。',
    followUp: '疲れ始めた時期や、睡眠・食事の変化を尋ねます。',
  },
  {
    id: 'bloating',
    title: '緊張するとお腹が張る',
    presentation: '仕事で緊張が続くとお腹が張り、ため息が増える。気分が落ち着くと、お腹の張りも軽くなる。',
    answer: 'qi-stagnation',
    explanation: 'おなかの張りとため息が緊張したときに増え、落ち着くと軽くなる点から、気滞を候補に挙げます。',
    followUp: '食事との関係や、張りが出る時間帯も確かめます。',
  },
  {
    id: 'unclear',
    title: 'だるさが続く',
    presentation: '「最近だるい日が続きます」と相談があった。いつからか、動いたり休んだりするとどう変わるかは聞いていない。',
    answer: 'defer',
    explanation: 'だるさだけでは候補を絞れません。経過と、だるさが強まる場面を確かめてから見立てを比べます。',
    followUp: '「いつからですか」「動いたときや休んだあとで変わりますか」と尋ねます。',
  },
] satisfies ReadonlyArray<{
  id: string;
  title: string;
  presentation: string;
  answer: Choice;
  explanation: string;
  followUp: string;
}>;

export default function ClinicalPatternExercise() {
  const choiceGroup = useId();
  const [exampleIndex, setExampleIndex] = useState(0);
  const [answer, setAnswer] = useState<Choice | null>(null);
  const current = examples[exampleIndex];

  return (
    <section id="pattern-exercise" tabIndex={-1} className={styles.mini} aria-labelledby="pattern-exercise-heading">
      <div className={styles.miniHeading}>
        <h2 id="pattern-exercise-heading" className={styles.sectionTitle}>ミニ症例で見立てを練習</h2>
        <p>動くと疲れる、緊張するとおなかが張る、だるさの経過が分からない。三つの架空の相談を読み、気虚・気滞・情報不足のいずれかを選びます。選ぶと、理由と次に聞く質問が表示されます。</p>
      </div>
      <div className={styles.exampleSelector} role="group" aria-label="架空の相談を選ぶ">
        {examples.map((example, index) => (
          <button
            key={example.id}
            type="button"
            aria-pressed={index === exampleIndex}
            onClick={() => {
              if (index === exampleIndex) return;
              setExampleIndex(index);
              setAnswer(null);
            }}
          >
            {example.title}
          </button>
        ))}
      </div>
      <div className={styles.exampleBody}>
        <p className={styles.presentation}>{current.presentation}</p>
        <fieldset className={styles.choices}>
          <legend>見立ての候補として、まず考えるのは？</legend>
          {choices.map(choice => (
            <label key={choice.id}>
              <input
                type="radio"
                name={choiceGroup}
                value={choice.id}
                checked={answer === choice.id}
                onChange={() => setAnswer(choice.id)}
              />
              {choice.label}
            </label>
          ))}
        </fieldset>
      </div>
      <div role="status">
        {answer !== null && (
          <div className={styles.explanation}>
            <strong>{answer === current.answer ? 'この症例の着眼点' : 'この症例の見立てを確認'}</strong>
            <p>{current.explanation}</p>
            <p><b>次に確認すること</b> {current.followUp}</p>
            <Link href="/curriculum/lecture-diagnosis-8">気血津液の講義で詳しく学ぶ</Link>
          </div>
        )}
      </div>
    </section>
  );
}
