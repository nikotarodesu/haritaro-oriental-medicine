import Link from 'next/link';
import type { SafetySource } from '@/data/medicalSafety';

export default function MedicalSafetyNotice({ title = '受診と安全性について', message, sources = [] }: { title?: string; message: string; sources?: SafetySource[] }) {
  return <aside className="rounded-lg border-s-[3px] border-[var(--notice-line)] bg-[var(--notice-bg)] px-4 pt-3 pb-1 text-[.9375rem] leading-[1.8] text-[var(--notice-ink)]">
    <p className="font-bold">{title}</p>
    <p className="mt-2">{message}</p>
    {sources.length > 0 && <ul className="mt-2 space-y-1 text-sm">{sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">{source.title}</a>（{source.section}）</li>)}</ul>}
    <Link href="/safety" className="mt-1 inline-flex min-h-11 items-center underline underline-offset-4">受診の目安・施術の注意と出典を読む</Link>
  </aside>;
}
