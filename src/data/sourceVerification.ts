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
  li4: {
    sourceTitle: 'WHO Standard Acupuncture Point Locations in the Western Pacific Region',
    sourceUrl: `${POINT_LOCATIONS_PDF_URL}#page=44`,
    sourceCheckedAt: SOURCE_VERIFICATION_DATE,
    sourcePage: 'p.35（PDF 44ページ目）',
    standardLocation: '手背、第2中手骨中点の橈側（親指側）。',
    note: 'WHO公式PDFのLI4（合谷）の位置記述と掲載図を2026-10-15に照合。確認対象は体表上の標準位置です。断面モデルの座標、針路・深度、個人への施術の適応は確認対象に含みません。',
  },
};

function terminologyCheck(scope: string): Partial<ReferenceItem> {
  return {
    url: TERMS_PDF_URL,
    bibliographyStatus: 'matched',
    claimsStatus: 'source-checked',
    sourceCheckedAt: SOURCE_VERIFICATION_DATE,
    note: `WHO公式PDFを取得し、${scope}の定義本文を照合。確認範囲はここに挙げた伝統用語です。講義全体の監修、現代医学との同一性、診断精度・治療効果の検証を意味しません。`,
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
    note: 'WHO公式PDFを取得し、p.2のB-cun・F-cunの区別、pp.13–14の対象者の指を用いる指寸法、p.35のLI4の標準位置を照合。その他の個別穴、刺鍼深度・手順・有効性は今回の照合対象に含みません。',
  },
  'who-acupuncture-point-locations-2008': {
    url: POINT_LOCATIONS_PDF_URL,
    bibliographyStatus: 'matched', claimsStatus: 'source-checked', sourceCheckedAt: SOURCE_VERIFICATION_DATE,
    note: 'WHO公式PDFを取得し、p.2の資料の対象と標準測定単位、pp.13–14の指寸法、p.35のLI4の位置を照合。経穴位置の共有に関する資料として参照し、全経穴の個別照合や治療効果の実証は意味しません。',
  },
};

export function applySourceVerification(reference: ReferenceItem): ReferenceItem {
  const update = SOURCE_VERIFICATION_UPDATES[reference.id];
  return update ? { ...reference, ...update } : reference;
}
