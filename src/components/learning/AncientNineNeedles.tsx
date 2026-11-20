import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACUPUNCTURE_GUIDE, NINE_NEEDLES_GUIDE } from "@/config/acupunctureLearning";
import { ANCIENT_NINE_NEEDLES, NINE_NEEDLES_SOURCES } from "@/data/ancientNineNeedles";

export default function AncientNineNeedles() {
  return (
    <section id={NINE_NEEDLES_GUIDE.anchor} className="ancient-needles" aria-labelledby="ancient-needles-title">
      <header className="ancient-needles-header">
        <h3 id="ancient-needles-title">{NINE_NEEDLES_GUIDE.title}</h3>
        <p>『霊枢』の最初の篇「九鍼十二原」は、形と役割が異なる九種類の鍼具を挙げています。篇名の「十二原」は、同じ篇の後半で五臓などと結びつけて説明される、体の部位の呼び名です。</p>
      </header>
      <figure className="ancient-needles-figure">
        <ol className="ancient-needles-grid" role="list" aria-label="『霊枢』に記された九種類の鍼具">
          {ANCIENT_NINE_NEEDLES.map(({ name, reading, outline, detail, shape, history, length }, index) => {
            const metal = `ancient-needle-metal-${index}`;
            return (
              <li key={name} className="ancient-needle" data-ancient-needle={name}>
                <svg viewBox="0 0 204 86" className="ancient-needle-shape" role="img" aria-label={`${name}。${shape}。`}>
                  <defs>
                    <linearGradient id={metal} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#E2C3A0" />
                      <stop offset=".44" stopColor="#BD9366" />
                      <stop offset="1" stopColor="#9B6D45" />
                    </linearGradient>
                  </defs>
                  <rect x="4" y="9" width="196" height="68" rx="10" className="ancient-needle-mat" />
                  <path d="M13 64H191" className="ancient-needle-rule" />
                  <path d={outline} fill={`url(#${metal})`} stroke="#6C4C36" strokeWidth="1.35" strokeLinejoin="round" />
                  <path d={detail} fill="none" stroke="#F9E3C2" strokeOpacity=".85" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="ancient-needle-copy">
                  <h4><ruby>{name}<rt>{reading}</rt></ruby></h4>
                  <p className="ancient-needle-trait">{shape}</p>
                  <p>{history}</p>
                  <p className="ancient-needle-length"><span>原典の寸法</span><strong>{length}</strong></p>
                </div>
              </li>
            );
          })}
        </ol>
        <figcaption>原典の順番に掲載しています。SVGは特徴を比べるための模式図で、寸法は「九鍼十二原」に記された単位で示しています。</figcaption>
      </figure>
      <div className="ancient-needles-today">
        <h4>現代の細い鍼と比べる</h4>
        <p>現代によく見る細い鍼を思い浮かべると、九鍼の中では毫鍼の形が近く見えます。現在の鍼には材質や衛生管理の規格があり、日本では細い鍼を支える鍼管も使われます。</p>
        <Link href={`${ACUPUNCTURE_GUIDE.href}#methods`} className="ui-text-link">現代のはりとお灸の道具を図で見る <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <ul className="acupuncture-source-links" aria-label="九鍼の出典">
        <li><a href={NINE_NEEDLES_SOURCES.chapter}>『霊枢』九鍼十二原篇の第三段（電子翻刻）</a></li>
        <li><a href={NINE_NEEDLES_SOURCES.manuscript}>京都大学所蔵の『霊枢』写本</a></li>
        <li><a href={NINE_NEEDLES_SOURCES.reconstruction}>関西医療大学所蔵の復元品（紀要 p.42）</a></li>
      </ul>
    </section>
  );
}
