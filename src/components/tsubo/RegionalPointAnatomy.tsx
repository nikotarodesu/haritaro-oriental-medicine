import type { ReactNode } from "react";
import { getPublicCrossSectionModel } from "@/data/medicalSafety";
import { createRegionalSectionModel } from "@/data/tsubo/regionalSections";
import type { RegionalSection } from "@/data/tsubo/regionalSections/types";
import { AcupointAnatomyDetails } from "./AcupointTopics";
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
    <AcupointAnatomyDetails key={code} kind="regional">
      <CrossSectionViewer model={getPublicCrossSectionModel(model)} pointName={name} pointCode={code} regional sharedLandmarks={landmarks} />
      <div className="atlas-anatomy-location">
        <figure>
          {surface}
          <figcaption>体表の位置</figcaption>
        </figure>
        <div>
          <a href={locationHref} className="atlas-source-link inline-flex min-h-11 items-center">{name}の位置図に戻る</a>
        </div>
      </div>
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
    </AcupointAnatomyDetails>
  );
}
