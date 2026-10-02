import Link from 'next/link';
import type { SafetySource } from '@/data/medicalSafety';

export default function MedicalSafetyNotice({ title = '受診と安全性について', message, sources = [] }: { title?: string; message: string; sources?: SafetySource[] }) {
  return <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
    <p className="font-bold">{title}</p>
    <p className="mt-2">{message}</p>
    {sources.length > 0 && <ul className="mt-2 space-y-1 text-xs">{sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">{source.title}</a>（{source.section}）</li>)}</ul>}
    <Link href="/safety" className="mt-2 inline-block underline underline-offset-4">受診の目安・施術の注意と出典を読む</Link>
  </aside>;
}
