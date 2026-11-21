import type { ReferenceItem } from '@/types/references';

/** Editorial checks against the acquired WHO PDFs, scoped to the entries below. */
export const SOURCE_VERIFICATION_DATE = '2026-10-15';

const TERMS_PDF_URL = 'https://iris.who.int/server/api/core/bitstreams/02be07cf-ef55-4ae2-9184-ded49210aa05/content';
const POINT_LOCATIONS_PDF_URL = 'https://iris.who.int/server/api/core/bitstreams/d98c1c98-3fbf-4e4e-8c9a-1bbe72ccd00e/content';

export interface VerifiedPointLocation {
  sourceTitle: string;
  sourceUrl: string;
  sourceCheckedAt: string;
  sourcePage: string;
  standardLocation: string;
  note: string;
}

/** Body-surface location checks do not verify the anatomy model or a procedure. */
export const VERIFIED_POINT_LOCATIONS: Readonly<Record<string, VerifiedPointLocation>> = {
  pc5: {
    sourceTitle: 'WHO Standard Acupuncture Point Locations in the Western Pacific Region',
    sourceUrl: `${POINT_LOCATIONS_PDF_URL}#page=163`,
    sourceCheckedAt: '2026-11-18', sourcePage: 'p.154（PDF 163ページ目）',
    standardLocation: '前腕前面、長掌筋腱と橈側手根屈筋腱の間で、手関節掌側横紋の上方3寸。',
    note: '手首のしわからの距離と、目印になる2本の腱をWHO標準の記載に照合しました。',
  },
  pc7: {
    sourceTitle: 'WHO Standard Acupuncture Point Locations in the Western Pacific Region',
    sourceUrl: `${POINT_LOCATIONS_PDF_URL}#page=164`,
    sourceCheckedAt: '2026-11-18', sourcePage: 'p.155（PDF 164ページ目）',
    standardLocation: '手関節前面、手関節掌側横紋の中央、長掌筋腱と橈側手根屈筋腱の間。',
    note: '手首のしわと2本の腱の位置関係をWHO標準の記載に照合しました。',
  },
  li4: {
    sourceTitle: 'WHO Standard Acupuncture Point Locations in the Western Pacific Region',
    sourceUrl: `${POINT_LOCATIONS_PDF_URL}#page=44`,
    sourceCheckedAt: SOURCE_VERIFICATION_DATE,
    sourcePage: 'p.35（PDF 44ページ目）',
    standardLocation: '手背、第2中手骨中点の橈側（親指側）。',
    note: '35ページの記述と図をもとに、合谷（LI4）の体表での位置を示しています。',
  },
};

function terminologyCheck(scope: string): Partial<ReferenceItem> {
  return {
    url: TERMS_PDF_URL,
    bibliographyStatus: 'matched',
    claimsStatus: 'source-checked',
    sourceCheckedAt: SOURCE_VERIFICATION_DATE,
    note: `参照した用語は${scope}です。`,
  };
}

const coreDefinitions = terminologyCheck('pp.1–4の陰陽・五行、pp.19–22の気・血・津液（WGM2番号3–24、28–41、223–261）');

/** A matched ID updates the source note only; it never approves an entire lesson. */
export const SOURCE_VERIFICATION_UPDATES: Readonly<Record<string, Partial<ReferenceItem>>> = {
  'who-tcm-terminologies-2022-yinyang': terminologyCheck('pp.1–2、WGM2番号3–24（陰陽の性質、対立・互根・消長・転化など）'),
  'who-wuxing-terms-2022': terminologyCheck('pp.3–4、WGM2番号28–41（五行の性質、相生・相剋・制化・相乗・相侮と母子）'),
  'who-tcm-terminology-2022': coreDefinitions,
  'who-tcm-terminologies-2022': coreDefinitions,
  'foundation-zangfu-overview': terminologyCheck('pp.5–6、WGM2番号53–60（蔵象・臓腑・五臓・六腑・相合と五臓の役割）'),
  'foundation-lung-heart-terms': terminologyCheck('p.6、WGM2番号59–60（心と神・血脈）、p.9、92–95（肺の主気・呼吸・宣発・粛降）'),
  'foundation-spleen-stomach-terms': terminologyCheck('p.6、WGM2番号58、p.11、114・116・118、pp.16–17、186・191–194（脾胃の関係・運化・升清・受納・通降）'),
  'foundation-liver-kidney-terms': terminologyCheck('p.12、WGM2番号130・136、p.14、152–153・158・161（肝血・疏泄・肝腎・腎精・蔵精）'),
  'foundation-fu-pairing-terms': terminologyCheck('p.6、WGM2番号56・58、p.18、200・202・205・207（六腑・相合・小腸・大腸・膀胱・三焦）'),
  'path-onset-who-terms-2022': terminologyCheck('p.24、WGM2番号281・284–288、p.31、365（六淫・七情・飲食・労逸・正気）'),
  'path-qi-who-terms-2022': terminologyCheck('pp.36–37、WGM2番号417–426（気機失調・気虚・気逆・気陥・気滞・気鬱など）'),
  'path-blood-who-terms-2022': terminologyCheck('pp.37–38、WGM2番号427–435・440–442（血虚・血瘀・血寒・血熱と気血の関係）'),
  'foundation-who-point-location-2008': {
    url: POINT_LOCATIONS_PDF_URL,
    bibliographyStatus: 'matched', claimsStatus: 'source-checked', sourceCheckedAt: SOURCE_VERIFICATION_DATE,
    note: '2ページと13〜14ページで骨度と指寸の違いを、35ページで合谷（LI4）の位置を確認しました。',
  },
  'who-acupuncture-point-locations-2008': {
    url: POINT_LOCATIONS_PDF_URL,
    bibliographyStatus: 'matched', claimsStatus: 'source-checked', sourceCheckedAt: SOURCE_VERIFICATION_DATE,
    note: 'この資料では、ツボの位置を共通の目印と単位で示しています。2ページ、13〜14ページ、合谷（LI4）の35ページを参照しました。',
  },
};

export function applySourceVerification(reference: ReferenceItem): ReferenceItem {
  const update = SOURCE_VERIFICATION_UPDATES[reference.id];
  return update ? { ...reference, ...update } : reference;
}
