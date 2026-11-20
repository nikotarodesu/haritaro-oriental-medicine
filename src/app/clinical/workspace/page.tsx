import type { Metadata } from 'next';
import ClinicalWorkspace from '@/components/clinical/ClinicalWorkspace';

export const metadata: Metadata = { title: '臨床記録の練習｜四診・候補比較・配穴', description: '模擬症例の主訴と四診を記録し、見立ての候補、ツボを選んだ理由、次に確認する所見を書けます。', alternates: { canonical: '/clinical/workspace' }, robots: { index: false, follow: true } };
export default function Page() { return <ClinicalWorkspace />; }
