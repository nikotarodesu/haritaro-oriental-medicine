import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AcupointCautions({ children }: { children: ReactNode }) {
  return (
    <section id="acupoint-cautions" className="atlas-cautions atlas-target space-y-3" aria-labelledby="acupoint-safety-warning">
      <h2 id="acupoint-safety-warning" className="atlas-section-title atlas-target flex items-center gap-2">
        <ShieldCheck aria-hidden="true" className="size-5 shrink-0" />
        注意したいこと
      </h2>
      {children}
      <Link href="/safety" className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
        受診の目安と鍼灸の安全性
      </Link>
    </section>
  );
}
