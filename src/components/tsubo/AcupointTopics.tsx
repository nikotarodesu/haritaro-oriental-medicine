import type { ReactNode } from "react";
import styles from "./AcupointTopics.module.css";

const topics = {
  location: { link: "場所", heading: "場所と見つけ方" },
  uses: { link: "使われ方", heading: "伝統的な使われ方と研究" },
  nearby: { link: "位置の比較", heading: "近くのツボ・位置の比較" },
  pairs: { link: "組み合わせ", heading: "ツボの組み合わせ" },
} as const;

type Topic = keyof typeof topics;

export function AcupointTopicNav({ topics: available, researchOnly }: { topics: readonly Topic[]; researchOnly?: boolean }) {
  return (
    <nav aria-label="このツボのページ内目次" className={styles.nav}>
      {available.map(topic => (
        <a key={topic} href={`#point-topic-${topic}`}>{topic === "uses" && researchOnly ? "研究・注意" : topics[topic].link}</a>
      ))}
    </nav>
  );
}

export function AcupointTopic({ topic, children, researchOnly, whoLink }: { topic: Topic; children: ReactNode; researchOnly?: boolean; whoLink?: boolean }) {
  const id = `point-topic-${topic}`;
  return (
    <section id={id} data-point-topic={topic} className={`atlas-target ${styles.chapter}`} tabIndex={-1} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={styles.title}>{topic === "uses" && researchOnly ? "研究と注意点" : topics[topic].heading}</h2>
      {whoLink && <a href="#acupoint-who-location" className={`atlas-text-action ${styles.whoLink}`}>WHOの位置と出典</a>}
      {children}
    </section>
  );
}
