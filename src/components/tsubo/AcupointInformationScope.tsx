import Link from 'next/link';
import { SITE_REVISED_AT } from '@/config/contentUpdates';

export default function AcupointInformationScope({ code, locationSource, individualModel }: { code: string; locationSource: string; individualModel: boolean }) {
  return <section id="acupoint-sources" aria-label="経穴情報の出典と確認範囲" className="scroll-mt-28 rounded-2xl border border-[#C5DED4] dark:border-[#2A5243] bg-[#EBF3EF] dark:bg-[#182823] p-4 sm:p-5 space-y-3 text-sm text-[#404743] dark:text-[#C5D2DB]">
    <h2 className="font-bold text-[#1E3D34] dark:text-[#83BEA8]">情報の出典と確認範囲</h2>
    <dl className="grid gap-3 sm:grid-cols-2">
      <div><dt className="font-semibold">位置情報の参照元</dt><dd className="mt-1 text-sm leading-relaxed">{locationSource || '経穴マスターデータ。参照資料との照合が必要です。'}</dd></div>
      <div><dt className="font-semibold">断面図の作成方法</dt><dd className="mt-1 text-sm leading-relaxed">{individualModel ? 'この経穴のために個別に編集した教育用模式図' : '部位の分類から組み立てた共通の教育用模式図'}。作成方法の区分であり、個別の画像検証や査読の完了を意味しません。</dd></div>
    </dl>
    <p className="text-base leading-relaxed">位置の標準、伝統的な主治、解剖モデル、臨床研究は根拠の種類が異なります。主治の列挙は、その経穴単独の治療効果を保証するものではありません。図の厚み・深浅・境界は患者ごとの安全な刺鍼深度を示しません。</p>
    <div className="flex flex-wrap gap-3 text-sm">
      <a className="inline-flex min-h-11 items-center underline focus-visible:outline-2 focus-visible:outline-offset-2" href="https://library.wpro.who.int/cgi-bin/koha/opac-detail.pl?biblionumber=11227" target="_blank" rel="noopener noreferrer">WHO標準経穴部位の書誌情報</a>
      <a className="inline-flex min-h-11 items-center underline focus-visible:outline-2 focus-visible:outline-offset-2" href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener noreferrer">鍼治療の研究と安全性（NCCIH）</a>
      <Link className="inline-flex min-h-11 items-center underline focus-visible:outline-2 focus-visible:outline-offset-2" href={`/contact?source=${encodeURIComponent('/tsubo/' + code.toLowerCase())}`}>このページの訂正・出典について連絡する</Link>
    </div>
    <p className="text-sm leading-relaxed">制作・編集方針：<Link href="/about" className="underline">はり太郎</Link> ／ 情報区分の更新：<time dateTime={SITE_REVISED_AT}>{SITE_REVISED_AT}</time>。個別資料の確認範囲は断面図の資料台帳を参照してください。</p>
  </section>;
}
