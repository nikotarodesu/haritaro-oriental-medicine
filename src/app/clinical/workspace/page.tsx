import type { Metadata } from 'next';
import ClinicalWorkspace from '@/components/clinical/ClinicalWorkspace';

export const metadata: Metadata = { title: '臨床推論ワークスペース｜四診・候補比較・配穴', description: '架空の症例で安全確認、四診所見、弁証候補、配穴の理由、再評価を整理する練習です。', alternates: { canonical: '/clinical/workspace' }, robots: { index: false, follow: true } };
export default function Page() { return <ClinicalWorkspace />; }
