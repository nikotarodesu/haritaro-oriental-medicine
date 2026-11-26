import { SYMPTOMS, SYMPTOM_SAFETY_GUIDANCE } from '@/data/symptomData';
import { MEDICAL_SAFETY_SOURCES } from '@/data/medicalSafety';
import { PUBLIC_SYMPTOM_CONTENT } from '@/data/publicSymptoms';
import { SYMPTOM_RESEARCH_NOTES } from '@/data/symptomResearchNotes';
import { VERIFIED_PAPERS } from '@/data/references/papersData';
import type { SymptomGuide } from '@/types/oriental';
import { SYMPTOM_GUIDES_REVISED_AT, symptomGuidePath } from './symptomGuidePaths';
import { getSymptomStudies } from '@/data/tsubo/atlas/evidence';
import { seriesPageTitle } from '@/config/seo';
import { PAGE_REVISIONS } from '@/config/contentUpdates';

export { SYMPTOM_GUIDES_REVISED_AT, symptomGuidePath } from './symptomGuidePaths';
const BASE_URL = 'https://www.haritaro.jp';

interface LearningResources {
  lectureId: string;
  articleId?: string;
  caseId?: string;
  clinicalSlug?: string;
  paperIds?: string[];
  perspectiveCaseId?: string;
}

// Links reference existing lessons, fictional exercises and audited bibliography.
// They do not establish a cause, diagnosis or a treatment for the reader.
export const SYMPTOM_LEARNING_RESOURCES: Record<string, LearningResources> = {
  'headache-stiff-neck': { lectureId: 'lecture-diagnosis-2', articleId: 'science-of-acupuncture-neuroscience', caseId: 'case-01-headache-liver-fire', clinicalSlug: 'headache', paperIds: ['meta-musculoskeletal-pain-yuan-2016'], perspectiveCaseId: 'headache-migraine' },
  'stress-insomnia': { lectureId: 'lecture-lifedynamics-2', articleId: 'science-of-qi-blood-fluid', caseId: 'case-05-insomnia-heart-kidney', clinicalSlug: 'sleep', paperIds: ['insomnia-acupuncture-systematic-review-cao-2009', 'perimenopausal-insomnia-electroacupuncture-li-2020'], perspectiveCaseId: 'insomnia-autonomic' },
  'stomach-fatigue': { lectureId: 'lecture-lifedynamics-3', articleId: 'east-west-integrative-gerd-gastric', clinicalSlug: 'digestion', paperIds: ['fgid-emotional-symptoms-acupuncture-meta-analysis-wang-2022'], perspectiveCaseId: 'gerd-gastric' },
  'menstrual-pain-chill': { lectureId: 'lecture-pathomechanism-5', articleId: 'science-of-qi-blood-fluid', caseId: 'case-03-dysmenorrhea-cold-stasis' },
  'chronic-fatigue-lethargy': { lectureId: 'lecture-pathomechanism-3', articleId: 'science-of-qi-blood-fluid', caseId: 'case-02-fatigue-spleen-deficiency', clinicalSlug: 'fatigue', paperIds: ['cfs-acupuncture-moxibustion-hrv-li-2025'] },
  'lower-back-pain-sciatica': { lectureId: 'lecture-diagnosis-2', articleId: 'science-of-acupuncture-neuroscience', clinicalSlug: 'back', paperIds: ['chronic-low-back-pain-ankle-acupuncture-fmri-xiang-2021', 'meta-musculoskeletal-pain-yuan-2016'] },
  'eye-strain-fatigue': { lectureId: 'lecture-diagnosis-2', articleId: 'science-of-yinyang-gogyo' },
  'constipation-ibs': { lectureId: 'lecture-lifedynamics-3', articleId: 'science-of-qi-blood-fluid', paperIds: ['fgid-emotional-symptoms-acupuncture-meta-analysis-wang-2022'] },
  'dizziness-tinnitus': { lectureId: 'lecture-pathomechanism-4', articleId: 'science-of-qi-blood-fluid', caseId: 'case-09-vertigo-phlegm-dampness' },
  'climacteric-hot-flash': { lectureId: 'lecture-lifedynamics-2', articleId: 'science-of-yinyang-gogyo', caseId: 'case-04-menopause-yin-deficiency', paperIds: ['menopausal-symptoms-hrv-japanese-acupuncture-kouzuma-2022', 'perimenopausal-insomnia-electroacupuncture-li-2020'] },
  'allergic-rhinitis-hayfever': { lectureId: 'lecture-diagnosis-2', articleId: 'science-of-yinyang-gogyo' },
  'knee-joint-pain': { lectureId: 'lecture-diagnosis-2', articleId: 'science-of-acupuncture-neuroscience', paperIds: ['meta-musculoskeletal-pain-yuan-2016'] },
};

export function getSymptomGuide(slug: string) {
  return SYMPTOMS.find(guide => guide.id === slug);
}

export function getSymptomGuideRevision(guide: SymptomGuide) {
  return PAGE_REVISIONS[symptomGuidePath(guide)] ?? SYMPTOM_GUIDES_REVISED_AT;
}

export function getAcupointGuideLinks(code: string, editorialLinks: readonly { href: string; label: string }[] = []) {
  const codeLower = code.toLowerCase();
  const links = new Map(editorialLinks.map(link => [link.href, link]));
  for (const guide of SYMPTOMS) {
    if (!guide.recommendedTsuboIds.includes(codeLower)) continue;
    const href = symptomGuidePath(guide);
    if (!links.has(href)) links.set(href, { href, label: `${guide.title}の症状ガイド` });
  }
  if ([...links.keys()].some(href => href.startsWith('/symptoms/'))) links.delete('/symptoms');
  return [...links.values()];
}

export function symptomGuideTitle(guide: SymptomGuide) {
  return seriesPageTitle(`${guide.title}｜受診の目安と記録例`, "dictionary");
}

export function symptomGuideSummary(guide: SymptomGuide) {
  return PUBLIC_SYMPTOM_CONTENT[guide.id]?.summary ?? guide.summary;
}

export function symptomGuideDescription(guide: SymptomGuide) {
  return `受診の目安と症状の記録例。${symptomGuideSummary(guide)}`;
}

export function getSymptomGuideSources(guide: SymptomGuide) {
  const safetySources = SYMPTOM_SAFETY_GUIDANCE[guide.id]?.sources ?? [];
  const dailyLifeSources = PUBLIC_SYMPTOM_CONTENT[guide.id]?.dailyLifeSources ?? [];

  return [
    ...safetySources.map(source => {
      const dailyLife = dailyLifeSources.find(candidate => candidate.url === source.url);
      return dailyLife
        ? { ...source, section: `${source.section} / ${dailyLife.section}`, scope: '受診の目安・日常の工夫' }
        : { ...source, scope: '受診の目安' };
    }),
    ...dailyLifeSources.map(source => ({ ...source, scope: '日常の工夫' })),
    { ...MEDICAL_SAFETY_SOURCES.jsam, scope: '鍼灸の安全性' },
    { ...MEDICAL_SAFETY_SOURCES.nccih, scope: '鍼灸研究の読み方・安全性' },
  ].filter((source, index, sources) => sources.findIndex(candidate => candidate.url === source.url) === index);
}

export function getSymptomRelatedPapers(guide: SymptomGuide) {
  return (SYMPTOM_LEARNING_RESOURCES[guide.id]?.paperIds || []).flatMap(id => {
    const paper = VERIFIED_PAPERS.find(candidate => candidate.id === id);
    return paper ? [paper] : [];
  });
}

function breadcrumbs(guide?: SymptomGuide) {
  const items = [
    { name: 'ホーム', item: BASE_URL },
    { name: '症状別ガイド', item: `${BASE_URL}/symptoms` },
    ...(guide ? [{ name: guide.title, item: `${BASE_URL}${symptomGuidePath(guide)}` }] : []),
  ];
  return { '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })) };
}

export function getSymptomsIndexJsonLd(title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', '@id': `${BASE_URL}/symptoms#webpage`, url: `${BASE_URL}/symptoms`, name: title, description, inLanguage: 'ja', mainEntity: { '@id': `${BASE_URL}/symptoms#guides` } },
      { '@type': 'ItemList', '@id': `${BASE_URL}/symptoms#guides`, itemListElement: SYMPTOMS.map((guide, index) => ({ '@type': 'ListItem', position: index + 1, name: guide.title, url: `${BASE_URL}${symptomGuidePath(guide)}` })) },
      breadcrumbs(),
    ],
  };
}

export function getSymptomGuideJsonLd(guide: SymptomGuide) {
  const url = `${BASE_URL}${symptomGuidePath(guide)}`;
  const citations = [
    ...getSymptomGuideSources(guide),
    ...(SYMPTOM_RESEARCH_NOTES[guide.id]?.sources ?? []),
    ...getSymptomStudies(guide.id).flatMap(study => study.sources),
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': ['WebPage', 'LearningResource'], '@id': `${url}#webpage`, url, name: symptomGuideTitle(guide), description: symptomGuideDescription(guide), inLanguage: 'ja', learningResourceType: '症状別学習ガイド', dateModified: getSymptomGuideRevision(guide), isPartOf: { '@id': `${BASE_URL}/symptoms#webpage` }, citation: [...new Set(citations.map(source => source.url))] },
      breadcrumbs(guide),
    ],
  };
}
