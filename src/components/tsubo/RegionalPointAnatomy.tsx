import type { ReactNode } from "react";
import HashTargetDetails from "@/components/common/HashTargetDetails";
import { getPublicCrossSectionModel } from "@/data/medicalSafety";
import { createRegionalSectionModel } from "@/data/tsubo/regionalSections";
import type { RegionalSection } from "@/data/tsubo/regionalSections/types";
import CrossSectionViewer from "./CrossSectionViewer";

export default function RegionalPointAnatomy({
  code, name, section, locationHref, surface,
}: {
  code: string;
  name: string;
  section: RegionalSection;
  locationHref: string;
  surface: ReactNode;
}) {
  const { model, landmarks } = createRegionalSectionModel(code.toLowerCase(), section);

  return (
    <section id="acupoint-anatomy" data-anatomy-kind="regional" className="atlas-target" aria-labelledby="acupoint-anatomy-title">
      <h3 id="acupoint-anatomy-title" className="atlas-section-title">詳しい解剖と位置</h3>
      <HashTargetDetails key={code} analytics={{ kind: "regional" }} className="atlas-disclosure atlas-anatomy-details" summary="断面図を開く">
        <div id="acupoint-anatomy-diagram" className="atlas-target space-y-3 pb-3">
          <div className="atlas-anatomy-location">
            <figure>
              {surface}
              <figcaption>体表の位置</figcaption>
            </figure>
            <div>
              <a href={locationHref} className="atlas-source-link inline-flex min-h-11 items-center">{name}の位置図に戻る</a>
            </div>
          </div>
          <CrossSectionViewer model={getPublicCrossSectionModel(model)} pointName={name} pointCode={code} regional sharedLandmarks={landmarks} />
          <details className="atlas-disclosure atlas-reading-details">
            <summary>参照資料と確認範囲</summary>
            <ul className="space-y-2 pb-3">
              {section.sources.map(({ title, url, scope }) => (
                <li key={url}>
                  <a href={url} className="atlas-source-link inline-flex min-h-11 items-center">{title}</a>
                  <p>{scope}</p>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </HashTargetDetails>
    </section>
  );
}
