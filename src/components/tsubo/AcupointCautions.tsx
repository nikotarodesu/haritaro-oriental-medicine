import Link from "next/link";
import type { ReactNode } from "react";
import HashTargetDetails from "@/components/common/HashTargetDetails";
import styles from "./AcupointCautions.module.css";

export default function AcupointCautions({ priority, children }: {
  priority?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id="acupoint-cautions"
      className={priority ? `atlas-target ${styles.withPriority}` : "atlas-target"}
      aria-labelledby="acupoint-safety-warning"
    >
      {priority && (
        <>
          <h2 id="acupoint-safety-warning" className={`atlas-target ${styles.heading}`}>注意事項</h2>
          <div className={styles.priority}>{priority}</div>
        </>
      )}
      <HashTargetDetails
        triggerScopeId="acupoint-cautions"
        className="atlas-disclosure"
        summary={priority ? "そのほかの注意を読む" : <h2 id="acupoint-safety-warning">注意事項</h2>}
      >
        <div className={styles.details}>
          {children}
          <Link href="/safety" className="atlas-source-link inline-flex min-h-11 items-center">
            受診の目安と鍼灸の安全性
          </Link>
        </div>
      </HashTargetDetails>
    </section>
  );
}
