import type { ReactNode } from "react";
import HashTargetDetails from "@/components/common/HashTargetDetails";
import styles from "./AcupointTopics.module.css";

const topics = {
  location: "場所と見つけ方",
  uses: "伝統的な使われ方と研究",
  nearby: "近くのツボ・位置の比較",
  pairs: "ツボの組み合わせ",
} as const;

type Topic = keyof typeof topics;

export function AcupointLocationDetails({ children, label = "位置の資料と断面図" }: { children: ReactNode; label?: string }) {
  return (
    <HashTargetDetails id="acupoint-location-resources" className={`atlas-target atlas-disclosure ${styles.locationDetails}`} summary={label}>
      <div className={styles.resources}>{children}</div>
    </HashTargetDetails>
  );
}

export function AcupointTopic({ topic, children, researchOnly }: { topic: Topic; children: ReactNode; researchOnly?: boolean }) {
  const id = `point-topic-${topic}`;
  return (
    <section id={id} data-point-topic={topic} className={`atlas-target ${styles.chapter}`} tabIndex={-1} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={styles.title}>{topic === "uses" && researchOnly ? "研究と注意点" : topics[topic]}</h2>
      {children}
    </section>
  );
}
