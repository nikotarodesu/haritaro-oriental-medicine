import { Hand, Thermometer } from "lucide-react";
import { ATLAS_SELF_CARE } from "@/data/tsubo/atlas/selfCare";

export default function AcupointSelfCare({ code }: { code: string }) {
  const methods = ATLAS_SELF_CARE[code];
  if (!methods?.length) return null;

  return (
    <section id="acupoint-self-care" className="atlas-target atlas-self-care" aria-labelledby="atlas-self-care-heading">
      <h2 id="atlas-self-care-heading" className="atlas-section-title">セルフケアの目安</h2>
      <div className="atlas-self-care-grid">
        {methods.map(({ kind, title, context, timing, instructions, source }) => (
          <div className="atlas-use-card atlas-care-method" key={kind}>
            <h3>{kind === "pressure" ? <Hand size={19} aria-hidden="true" /> : <Thermometer size={19} aria-hidden="true" />}{title}</h3>
            <p className="atlas-care-context">{context}</p>
            <ul className="atlas-care-timing">
              {timing.map(text => <li key={text}>{text}</li>)}
            </ul>
            <p>{instructions}</p>
            <a className="atlas-text-action atlas-use-source" href={source.url}>{source.label}</a>
          </div>
        ))}
      </div>
    </section>
  );
}
