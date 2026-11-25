import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import HashTargetDetails from "@/components/common/HashTargetDetails";

export default function AcupointCautions({ priority, children }: { priority?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-2" aria-labelledby="acupoint-safety-warning">
      {priority && <div className="atlas-caution-priority space-y-1">{priority}</div>}
      <HashTargetDetails
        id="acupoint-cautions"
        className="atlas-cautions atlas-disclosure atlas-target"
        summary={<><ShieldCheck aria-hidden="true" className="size-4 shrink-0" /><span id="acupoint-safety-warning">注意したいこと</span></>}
      >
        <div className="space-y-2 text-sm leading-relaxed">
          {children}
          <Link href="/safety" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
            受診の目安と鍼灸の安全性
          </Link>
        </div>
      </HashTargetDetails>
    </section>
  );
}
