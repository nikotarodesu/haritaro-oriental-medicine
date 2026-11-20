interface RulerProps {
  length: number;
  span: number;
  amount: number;
  step?: number;
}

export function CunRulerMarks({ length, span, amount, step = 1 }: RulerProps) {
  const interiorTicks = Math.ceil(span / step) - 1;
  const marker = length * amount / span;

  return (
    <g fill="none" strokeLinecap="round" aria-hidden="true">
      <path d={`M0 0H${length}`} className="cun-rail" strokeWidth="2" />
      <path d={`M0 0H${marker}`} className="cun-rail-active" strokeWidth="4" />
      <g className="cun-rail-tick" strokeWidth="1.25">
        {Array.from({ length: interiorTicks }, (_, index) => {
          const tick = index + 1;
          const x = length * tick * step / span;
          const height = tick % 5 === 0 ? 6 : 4;
          return <path key={tick} d={`M${x} -${height}v${height * 2}`} />;
        })}
        <path d={`M0 -6v12M${length} -6v12`} />
      </g>
      <circle cx={marker} r="4.5" className="cun-rail-marker" strokeWidth="1.25" />
    </g>
  );
}

export default function CunRuler(props: Omit<RulerProps, "length">) {
  return (
    <svg className="cun-ruler" viewBox="0 0 352 20" aria-hidden="true" focusable="false">
      <g transform="translate(7 10)"><CunRulerMarks length={338} {...props} /></g>
    </svg>
  );
}
