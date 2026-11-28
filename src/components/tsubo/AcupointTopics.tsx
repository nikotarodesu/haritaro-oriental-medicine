import type { ReactNode } from "react";
import HashTargetDetails from "@/components/common/HashTargetDetails";
import styles from "./AcupointTopics.module.css";

const topics = {
  location: "場所と見つけ方",
  uses: "伝統的な使われ方",
  nearby: "近くのツボ・位置の比較",
  pairs: "ツボの組み合わせ",
} as const;

type Topic = keyof typeof topics;

export function AcupointLocationRows({ children }: { children: ReactNode }) {
  return <div className={styles.locationRows}>{children}</div>;
}

export function AcupointLocationDetails({ children }: { children: ReactNode }) {
  return (
    <HashTargetDetails id="acupoint-location-resources" className={`atlas-target atlas-disclosure ${styles.locationDetails}`} summary={<h3>位置の資料</h3>}>
      <div className={styles.locationContent}>{children}</div>
    </HashTargetDetails>
  );
}

export function AcupointAnatomyDetails({ children, kind }: { children: ReactNode; kind?: "individual" | "regional" }) {
  return (
    <HashTargetDetails
      id="acupoint-anatomy"
      className={`atlas-target atlas-disclosure ${styles.locationDetails}`}
      data-anatomy-kind={kind}
      analytics={kind ? { kind } : undefined}
      summary={<h3 id="acupoint-anatomy-title">断面図</h3>}
    >
      <div id="acupoint-anatomy-diagram" className={`atlas-target ${styles.locationContent}`}>{children}</div>
    </HashTargetDetails>
  );
}

export function AcupointTopic({ topic, children }: { topic: Topic; children: ReactNode }) {
  const id = `point-topic-${topic}`;
  return (
    <section id={id} data-point-topic={topic} className={`atlas-target ${styles.chapter}`} tabIndex={-1} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={styles.title}>{topics[topic]}</h2>
      {children}
    </section>
  );
}

export function AcupointCareAndResearch({ children, preserveUsesAnchor = false }: {
  children: ReactNode;
  preserveUsesAnchor?: boolean;
}) {
  return (
    <div className={`atlas-target ${styles.careAndResearch}`} id={preserveUsesAnchor ? "point-topic-uses" : undefined} tabIndex={preserveUsesAnchor ? -1 : undefined}>
      {children}
    </div>
  );
}
