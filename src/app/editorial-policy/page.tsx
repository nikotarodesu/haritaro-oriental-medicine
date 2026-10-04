import type { Metadata } from 'next';
import { pageSocialMetadata } from '@/config/seo';
import Link from 'next/link';
import summary from '@/data/medicalReviewSummary.json';
import audit from '@/data/references/bibliographyAudit.json';
export const metadata: Metadata = { title: '医学記述・出典の確認方針', description: '書誌の照合、研究結果の解釈、専門家による監修の状況を分けて公開します。', ...pageSocialMetadata('医学記述・出典の確認方針', '書誌の照合、研究結果の解釈、専門家による監修の状況を分けて公開します。', '/editorial-policy'), alternates: { canonical: '/editorial-policy' } };
export default function EditorialPolicyPage() {
  const records = Object.values(audit);
  return <main className="mx-auto max-w-3xl px-4 py-12 space-y-7 text-[#232826] dark:text-[#FAF8F5]">
    <h1 className="font-serif text-3xl font-bold">医学記述・出典の確認方針</h1>
    <section className="space-y-3"><h2 className="text-xl font-bold">臨床用の記録・学習モデルの確認範囲（2026年10月4日）</h2><p>主訴別の確認ガイドと臨床ワークスペースでは、伝統理論、現代医学の受診目安、理解を助ける比喩を区別します。所見の照合は本サイトが整理した7つの限定的な学習モデルで、診断確率・治療効果・医学的な原因の除外を示しません。</p><p>WHOの標準用語は用語体系の参照に用い、個別の配穴の効果や照合ルールの検証資料とは扱いません。新しい学習モデルの臨床的妥当性と専門家監修は未確認です。</p><Link className="inline-flex min-h-11 items-center underline" href="/clinical">主訴別ガイドと参照範囲を見る</Link></section>
    <p className="leading-relaxed">伝統的な分類、現代医学の研究結果、理解を助ける比喩を区別します。文献が存在することと、教材の説明がその文献で支持されることは別々に確認します。</p>
    <section className="space-y-3"><h2 className="text-xl font-bold">現在の確認状況</h2>
      <p>登録論文44件を照合し、書誌一致を確認できたものは{records.filter(record => record.bibliographyStatus === 'matched').length}件です。撤回論文、書誌の不一致、原典を確認できない文献は研究資料一覧と検索の対象から外しています。</p>
      <p>5件の要約は原典の対象・比較・結果の適用範囲を確認して書き直しました。それ以外の効果量・配穴・安全性の詳細は、照合が完了するまで掲載を保留しています。</p>
      <p><Link href="/articles/science-of-tongue-diagnosis" className="underline">舌診の記事</Link>では別分野の論文を指していた引用を取り下げ、観察・伝統的な解釈・口腔の医学的評価を区別した説明へ修正しました。</p>
      <p className="font-bold">全件の医学的正確性の照合と、専門家による監修は完了していません。</p>
      <p>{summary.generatedAt}時点で、記事・講義・経穴・症例・クイズ・用語集・配穴例などから{summary.statements.toLocaleString('ja-JP')}件の記述を確認台帳へ抽出しました。このうち{summary.priorityStatements.toLocaleString('ja-JP')}件には、断定表現・数値・安全性などを優先確認する印が付いています。掲載保留中の元資料も含む確認対象の一覧であり、確認済みの件数ではありません。画面内の文章・図版は別途確認します。</p>
    </section>
    <section className="space-y-3"><h2 className="text-xl font-bold">安全性を優先した今回の修正</h2><p>全日本鍼灸学会の2025年版安全対策ガイドラインなどを参照し、経穴教材の一律の安全深度・骨による安全保証を取り下げました。記事の伝統理論と医学的診断の同一視、症状ガイドの受診案内も修正しています。これは該当箇所の照合・修正であり、全件の監修完了を意味しません。</p><p>出典を確認できない施術手順や症例アーカイブの公開は保留しています。</p><Link href="/safety" className="underline">受診の目安・安全性の出典と確認範囲</Link></section>
    <section className="space-y-3"><h2 className="text-xl font-bold">2026年10月3日の教材改訂</h2>
      <p>陰陽の8講義・関連する24問と関連図では、伝統的な分類と自律神経・恒常性・甲状腺機能などの生理学的な概念を区別しました。伝統的な証だけで薬の適否や治療方法を判断させる表現、救急症状への施術案内、未照合の具体的な刺鍼手順も改訂しました。用語集、古典条文の解説、配穴の学習例は、特効・相乗効果や現代の疾患の治癒を断定しない説明へ改訂しました。</p>
      <p>古典6件は電子本文の該当箇所を確認し、元の掲載文とは分けて引用・資料名・確認範囲を表示しています。底本画像との照合は未完了です。版・頁情報は資料上で確認できたものだけを示し、未確認の情報は補っていません。他の講義・図版・症例の確認、専門家による監修は継続しています。</p>
      <p>合谷の位置説明を統一し、経穴ページの検索用データに残っていた「鍼灸師監修」の表示を修正しました。これは今回変更した箇所の記録であり、全教材の確認完了を示すものではありません。</p>
      <p className="text-sm">参照した資料：<a className="underline" href="https://www.who.int/publications/i/item/9789240042322">WHOの伝統医学用語集の書誌</a>、<a className="underline" href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety">NCCIHの鍼治療の研究と安全性</a>。各資料が支持する範囲と未確認の範囲は、講義の参考文献と古典の注記に記載しています。</p>
    </section>
    <section className="space-y-3"><h2 className="text-xl font-bold">記述ごとに確認すること</h2><ol className="list-decimal pl-5 space-y-2">
      <li>出典の著者、題名、年、識別子が一致しているか。訂正・撤回がないか。</li>
      <li>原典のどのページ・表・段落が記述を支持するか。</li>
      <li>対象、比較、評価時点、効果量・不確実性を正しく説明しているか。</li>
      <li>動物実験からヒトへ、別疾患へ、伝統的分類へ過度に一般化していないか。</li>
      <li>紹介・受診の判断や施術上の注意を、資格を持つ監修者が確認したか。</li>
    </ol></section>
    <section className="space-y-3"><h2 className="text-xl font-bold">監修の記録</h2><p>監修者の氏名・資格、確認した記述の版、対象範囲、確認日、修正内容を記録します。執筆者情報や自動チェックの合格だけを「専門家監修済み」と表示することはありません。</p><p>本文を変更した場合、以前の確認を新しい記述へ自動で引き継ぎません。施術の安全性や緊急の対応が関わる記述を優先して確認します。</p></section>
    <p className="text-sm">確認台帳の作成日：{summary.generatedAt}。記述の誤りや出典の不一致は<Link href="/contact" className="underline">お問い合わせ</Link>からお知らせください。</p>
    <Link href="/library" className="inline-flex min-h-11 items-center underline">書誌を照合した研究資料を見る</Link>
  </main>;
}
