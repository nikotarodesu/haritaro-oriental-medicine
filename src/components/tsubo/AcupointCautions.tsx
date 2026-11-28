import Link from "next/link";
import type { ReactNode } from "react";
import HashTargetDetails from "@/components/common/HashTargetDetails";
import styles from "./AcupointCautions.module.css";

export default function AcupointCautions({ priority, children }: {
  priority?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={priority ? styles.withPriority : undefined} aria-labelledby="acupoint-safety-warning">
      {priority && <div className={styles.priority}>{priority}</div>}
      <HashTargetDetails
        id="acupoint-cautions"
        className="atlas-disclosure atlas-target"
        summary={<span id="acupoint-safety-warning">注意事項</span>}
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
