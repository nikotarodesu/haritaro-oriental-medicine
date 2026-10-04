import type { Metadata } from 'next';
import ClinicalWorkspace from '@/components/clinical/ClinicalWorkspace';

export const metadata: Metadata = { title: '臨床ワークスペース｜所見・候補比較・配穴・再評価', description: '鍼灸師が主訴、安全確認、四診所見、弁証候補、配穴の理由、再評価を整理する個人用の作業画面。', alternates: { canonical: '/clinical/workspace' }, robots: { index: false, follow: true } };
export default function Page() { return <ClinicalWorkspace />; }
