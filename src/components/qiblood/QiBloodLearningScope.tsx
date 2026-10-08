import Link from 'next/link';

export default function QiBloodLearningScope() {
  return <figcaption className="relative mt-5 space-y-2 border-t border-[#E5DEC9] pt-4 text-sm leading-relaxed text-[#59615D] dark:border-[#2A3B4A] dark:text-[#A0B0BC]">
    <p>伝統理論の分類・関係を学ぶ図です。階層・矢印は説明の比喩で、病気の進行、検査結果、診断や治療効果を示すものではありません。</p>
    <p>参照：<a href="https://www.who.int/publications/i/item/9789240042322" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">WHO用語集（用語体系）</a>、<a href="https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">NCCIH（研究・安全性）</a>。<Link href="/editorial-policy" className="underline underline-offset-4">教材の確認範囲</Link></p>
  </figcaption>;
}
