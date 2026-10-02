import type { CrossSectionModel } from '@/data/tsubo/types';

export interface SafetySource {
  title: string;
  url: string;
  section: string;
}

export const MEDICAL_SAFETY_CHECKED_AT = '2026-10-02';
export const MEDICAL_SAFETY_SOURCES = {
  jsam: { title: '全日本鍼灸学会：鍼灸安全対策ガイドライン2025年版', url: 'https://safety.jsam.jp/img/file.pdf', section: '印刷頁10–14、31、33、35、44–48：適応・注意事項、損傷、気胸、灸・通電' },
  emergency: { title: '厚生労働省：こんな時は迷わず119へ', url: 'https://kakarikata.mhlw.go.jp/kakaritsuke/urgency.html', section: '大人の症状：頭・胸や背中・意識' },
  consultation: { title: '消防庁：救急安心センター事業（#7119）', url: 'https://www.fdma.go.jp/mission/enrichment/appropriate/appropriate007.html', section: '判断に迷う場合の相談、実施地域' },
  caudaEquina: { title: 'NICE NG127：神経症状の認識と紹介', url: 'https://www.nice.org.uk/guidance/ng127/chapter/Recommendations-for-adults-aged-over-16', section: '1.7.3：腰痛と新たな排尿・排便・性機能障害、会陰部感覚異常' },
  nccih: { title: 'NCCIH：Acupuncture — Effectiveness and Safety', url: 'https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety', section: 'Is acupuncture safe? / More To Consider' },
} satisfies Record<string, SafetySource>;

export const PROCEDURE_PUBLICATION_NOTICE = '刺入深度・角度・施灸量の個別手順は専門家確認待ちのため掲載を保留しています。体表の取穴位置や模式図から、その人の安全な刺入経路は判断できません。';

// 未確認の実技パラメータを既定で公開しない。人による確認記録ができるまで解除しない。
export const PROCEDURE_PUBLICATION_STATUS = 'pending_expert_review' as const;

export function getPublicCrossSectionElements(model: CrossSectionModel): CrossSectionModel['svgElements'] {
  return model.svgElements.filter(element => element.layerId !== 'needle-indicator').map(element => ({
    ...element,
    label: element.label?.replace(/（[^）]*得気[^）]*）/g, ''),
  }));
}

export function getPublicAnatomyDescription(structure: { description?: string }): string {
  const description = structure.description || '';
  if (/刺鍼|深刺|刺入|穿刺|針[尖先]|針路|得気|無痛|安全深度/.test(description)) {
    return 'この構造の詳細説明には実技に関する未確認事項があるため掲載を保留しています。模式図の位置から個人の刺入条件は判断できません。';
  }
  return description;
}

// Server Components から渡す段階で、非公開の実技データを取り除く。
// 見た目だけ隠して、元の針路や深度をブラウザーへ送信しない。
export function getPublicCrossSectionModel(model: CrossSectionModel): CrossSectionModel {
  const anatomyOnly = <T extends { description: string }>(structure: T): T => ({
    ...structure,
    description: getPublicAnatomyDescription(structure),
    clinicalSignificance: '',
    depthDescription: undefined,
    differentiationTip: undefined,
    palpationTip: undefined,
  });
  return {
    procedureReviewStatus: PROCEDURE_PUBLICATION_STATUS,
    id: model.id, title: model.title, level: model.level,
    sliceType: model.sliceType, bodySide: model.bodySide,
    axes: model.axes,
    needleTrack: { angle: '専門家確認待ち', safeDepth: '専門家確認待ち', targetStructure: '個別手順は掲載保留' },
    layers: model.layers.map(anatomyOnly),
    boundaries: model.boundaries?.map(anatomyOnly),
    adjacentStructures: model.adjacentStructures?.map(anatomyOnly),
    svgElements: getPublicCrossSectionElements(model),
    references: model.references,
    referenceLedger: model.referenceLedger,
    referencesLedger: model.referencesLedger,
    verifiedDate: model.verifiedDate,
  };
}
