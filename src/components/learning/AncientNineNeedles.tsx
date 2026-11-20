import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACUPUNCTURE_GUIDE, NINE_NEEDLES_GUIDE } from "@/config/acupunctureLearning";
import { ANCIENT_NINE_NEEDLES, NINE_NEEDLES_SOURCES } from "@/data/ancientNineNeedles";

export default function AncientNineNeedles() {
  return (
    <section id={NINE_NEEDLES_GUIDE.anchor} className="ancient-needles" aria-labelledby="ancient-needles-title">
      <header className="ancient-needles-header">
        <h3 id="ancient-needles-title">{NINE_NEEDLES_GUIDE.title}</h3>
        <p>『霊枢』では、不調の場所や症状の出方に応じて、九種類の鍼具を使い分けています。ここでいう「痺（ひ）」は、痛みやしびれなどを含む古典の呼び名です。</p>
      </header>
      <figure className="ancient-needles-figure">
        <ol className="ancient-needles-grid" role="list" aria-label="『霊枢』に記された九種類の鍼具">
          {ANCIENT_NINE_NEEDLES.map(({ id, name, reading, outline, detail, shape, indication, use, length, chapters }) => {
            const metal = `ancient-needle-metal-${id}`;
            return (
              <li key={id} id={`ancient-needle-${id}`} tabIndex={-1} className="ancient-needle" data-ancient-needle={name}>
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
                  <dl className="ancient-needle-uses">
                    <div><dt>対象</dt><dd>{indication}</dd></div>
                    <div><dt>使い分け</dt><dd>{use}</dd></div>
                  </dl>
                  <div className="ancient-needle-foot">
                    <p className="ancient-needle-length"><span>原典の寸法</span><strong>{length}</strong></p>
                    <ul className="ancient-needle-citations" aria-label={`${name}の出典`}>
                      {chapters.map(chapter => {
                        const { title, href } = NINE_NEEDLES_SOURCES[chapter];
                        return <li key={chapter}><a href={href}>{title}</a></li>;
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <figcaption>図は形を見比べるための模式図です。並びと寸法は「九鍼十二原」に従いました。毫鍼の長さは「九鍼十二原」で3寸6分、「九鍼論」で1寸6分と記されています。</figcaption>
      </figure>
      <div className="ancient-needles-today">
        <h4>現代の細い鍼と比べる</h4>
        <p>現代によく見る細い鍼を思い浮かべると、九鍼の中では毫鍼の形が近く見えます。現在の鍼には材質や衛生管理の規格があり、日本では細い鍼を支える鍼管も使われます。</p>
        <div className="acupuncture-inline-links">
          <Link href={`${ACUPUNCTURE_GUIDE.href}#methods`} className="ui-text-link">現代のはりとお灸の道具を図で見る <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link href={`${ACUPUNCTURE_GUIDE.href}#evidence`} className="ui-text-link">現代の鍼灸を調べた研究を読む <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <details className="acupuncture-detail ancient-needles-notes">
        <summary>「十二原」と、古典に出てくる「寸」</summary>
        <p>「十二原」は、同じ篇の後半で五臓などと結びつけて説明される、体の部位の呼び名です。</p>
        <p>九鍼の「寸」は道具の長さや幅に使われています。図鑑に出てくる骨度法の「寸」は、体の区間を等分してツボの位置を示す尺度です。 <Link href="/tsubo/basics/bone-cun" className="ui-text-link">体の尺度を図で見る <ArrowRight size={16} aria-hidden="true" /></Link></p>
      </details>
      <ul className="acupuncture-source-links" aria-label="九鍼の出典">
        {Object.values(NINE_NEEDLES_SOURCES).map(({ title, href }) => <li key={href}><a href={href}>{title}</a></li>)}
      </ul>
    </section>
  );
}
