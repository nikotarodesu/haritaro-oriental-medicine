"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { ACUPOINT_LOOKUP } from "@/data/acupointLookup";

type GorouId = "kyushi" | "kyuza" | "kyuritsu" | "kyukou" | "kyuga";

interface GorouDef {
  name: string;
  passage: string;
  meaning: string;
  activity: string;
  example: string;
  restTitle: string;
  restDescription: string;
  point: { code: (typeof ACUPOINT_LOOKUP)[number]["code"] } | { extraPoint: string };
}

const GOROU_DEFS: Record<GorouId, GorouDef> = {
  kyushi: {
    name: "久視（きゅうし）",
    passage: "久視傷血",
    meaning: "長く見ることは、伝統医学では「血」の働きと関連づけられています。",
    activity: "画面や文字を長く見続ける",
    example: "休憩を挟まず、パソコンやスマートフォンの画面を見続ける。",
    restTitle: "画面から目を離し、遠くを見る",
    restDescription: "米国眼科学会は、画面作業中にまばたきと休憩を意識し、20分ごとに約6メートル先を20秒見る方法を紹介しています。",
    point: { extraPoint: "太陽（たいよう）" },
  },
  kyuza: {
    name: "久坐（きゅうざ）",
    passage: "久坐傷肉",
    meaning: "長く座ることは、伝統医学では「肉」の働きと関連づけられています。",
    activity: "休憩を挟まず座り続ける",
    example: "デスクワークが長く、途中で立ったり歩いたりする機会が少ない。",
    restTitle: "作業の合間に立つ・歩く",
    restDescription: "書類を読み終えたときなど、作業の区切りで席を立って短く歩きます。米国労働安全衛生局も、座り仕事の合間に立ったり歩いたりする休憩を紹介しています。",
    point: { code: "ST36" },
  },
  kyuritsu: {
    name: "久立（きゅうりつ）",
    passage: "久立傷骨",
    meaning: "長く立つことは、伝統医学では「骨」の働きと関連づけられています。",
    activity: "立ったままの時間が長い",
    example: "立ち仕事や通勤で、座ったり姿勢を変えたりする機会が少ない。",
    restTitle: "姿勢を変え、休憩時に座る",
    restDescription: "レジや台所で立ち続けるときは、作業の区切りで足の位置を変えます。休憩に入ったら、座れる場所で足を休めます。",
    point: { code: "KI1" },
  },
  kyukou: {
    name: "久行（きゅうこう）",
    passage: "久行傷筋",
    meaning: "長く歩くことは、伝統医学では「筋」の働きと関連づけられています。",
    activity: "歩く時間が長い",
    example: "外回りや長距離の移動が多い。重い荷物を持って歩くこともある。",
    restTitle: "歩行量・荷物・靴を振り返る",
    restDescription: "歩く距離が延びた日、荷物が重かった日、靴を替えた日を思い出します。痛みが続くときは、どの場所がいつ痛むかを医療機関に伝えます。",
    point: { code: "BL57" },
  },
  kyuga: {
    name: "久臥（きゅうが）",
    passage: "久臥傷気",
    meaning: "長く横になることは、伝統医学では「気」の働きと関連づけられています。",
    activity: "日中に横になる時間が長い",
    example: "日中、横になって過ごす時間が長くなっている。",
    restTitle: "睡眠と日中の状態を記録する",
    restDescription: "起きた時刻、昼に横になった時間、眠気で家事や外出が難しかった日を書きます。医療者から休息の指示がある場合は、その指示に従ってください。",
    point: { code: "CV17" },
  },
};

const gorouIds: readonly GorouId[] = ["kyushi", "kyuga", "kyuza", "kyuritsu", "kyukou"];
const textLinkClass = "inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2";

export default function GorouWorkstyleChecker() {
  const [selected, setSelected] = useState<GorouId[]>([]);

  function toggle(id: GorouId) {
    setSelected(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);
  }

  return (
    <div className="space-y-8">
      <section aria-labelledby="gorou-check-heading" className="space-y-4 rounded-2xl border border-frame bg-panel p-4 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 id="gorou-check-heading" className="font-serif text-xl font-bold">長く続くことが多い動作を選ぶ</h2>
          <p role="status" className="text-sm font-medium text-muted">選択中：{selected.length}項目</p>
        </div>
        <p className="text-base text-muted">仕事や家で、休憩を取らずに続けることが多い動作を選んでください。複数選べます。</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {gorouIds.map(id => {
            const item = GOROU_DEFS[id];
            const pressed = selected.includes(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={pressed}
                onClick={() => toggle(id)}
                className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-frame p-3.5 text-left hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 aria-pressed:border-accent aria-pressed:bg-panel-selected"
              >
                <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border border-accent text-accent">
                  {pressed && <Check className="size-4" />}
                </span>
                <span className="min-w-0">
                  <span className="block text-base font-bold leading-relaxed">{item.activity}</span>
                  <span className="block text-sm font-semibold text-accent">{item.name}</span>
                  <span className="mt-1 block text-base leading-relaxed text-muted">{item.example}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {selected.length === 0 ? (
        <p className="rounded-xl border border-frame bg-panel px-4 py-3 text-base leading-relaxed text-muted">
          動作を選ぶと、五労との対応と休憩・動作の例が表示されます。
        </p>
      ) : (
        <>
          <section aria-labelledby="gorou-result-heading" className="space-y-3 rounded-2xl border border-frame bg-panel p-4 sm:p-6">
            <h2 id="gorou-result-heading" className="font-serif text-xl font-bold sm:text-2xl">選んだ動作と五労の対応</h2>
            <p className="text-base leading-relaxed text-muted">『素問』宣明五気篇では、長く続く動作を次のように関連づけています。</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {selected.map(id => (
                <li key={id} className="rounded-lg bg-panel-selected px-4 py-3 text-base leading-relaxed">
                  <strong className="block text-lg">{GOROU_DEFS[id].passage}</strong>
                  {GOROU_DEFS[id].meaning}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="gorou-rest-heading" className="space-y-4">
            <h2 id="gorou-rest-heading" className="text-balance font-serif text-xl font-bold leading-relaxed sm:text-2xl">選んだ生活習慣に合わせた休憩や動作の例</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {selected.map(id => {
                const item = GOROU_DEFS[id];
                const point = item.point;
                const atlasPoint = "code" in point ? ACUPOINT_LOOKUP.find(({ code }) => code === point.code) : undefined;
                return (
                  <article key={id} className="space-y-3 rounded-2xl border border-frame bg-panel p-4 sm:p-6">
                    <p className="text-base font-semibold text-accent">{item.name}</p>
                    <h3 className="text-lg font-bold leading-relaxed">{item.restTitle}</h3>
                    <p className="text-base leading-[1.8] text-muted">{item.restDescription}</p>
                    {atlasPoint ? (
                      <div className="space-y-1 border-t border-divider pt-3 text-base leading-[1.8]">
                        <p className="font-semibold">{atlasPoint.name}（{atlasPoint.code}）</p>
                        <p className="text-muted">{atlasPoint.locationSimple}</p>
                        <div className="flex flex-wrap gap-x-4">
                          <Link href={'/tsubo/' + atlasPoint.code.toLowerCase() + '#acupoint-location'} className={textLinkClass}>図で場所を確認</Link>
                          <Link href={'/tsubo/' + atlasPoint.code.toLowerCase() + '#acupoint-cautions'} className={textLinkClass}>注意点</Link>
                        </div>
                      </div>
                    ) : "extraPoint" in point && (
                      <p className="border-t border-divider pt-3 text-base leading-[1.8] text-muted">
                        {point.extraPoint}は、経絡の361穴とは別に扱われる奇穴です。
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}

      <section aria-labelledby="gorou-background-heading" className="space-y-4 rounded-2xl border border-frame bg-panel p-4 sm:p-6">
        <h2 id="gorou-background-heading" className="font-serif text-xl font-bold leading-relaxed sm:text-2xl">五労（ごろう）とは</h2>
        <p className="text-base leading-[1.8] text-muted">
          五労は『黄帝内経 素問』の宣明五気篇にある分類です。見る、横になる、座る、立つ、歩くという五つの動作を長く続けることを、順に血・気・肉・骨・筋と関連づけています。
        </p>
        <a href="https://zh.wikisource.org/wiki/黃帝內經/素問第七卷#宣明五氣篇二十三" target="_blank" rel="noopener noreferrer" className={textLinkClass}>『素問』宣明五気篇の電子本文</a>
        <p className="text-base leading-[1.8] text-muted">
          現代の作業環境では、休憩を取る、姿勢を変える、机や椅子を調整するといった工夫があります。米国労働安全衛生局は、画面から目を離す、立つ、歩くなどの短い休憩を紹介しています。
        </p>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {gorouIds.map(id => (
            <li key={id} className="rounded-lg border border-frame bg-page px-3 py-2 text-base leading-relaxed">
              <strong className="block">{GOROU_DEFS[id].name}</strong>
              <span className="block font-semibold text-accent">{GOROU_DEFS[id].passage}</span>
              <span className="block text-muted">{GOROU_DEFS[id].meaning}</span>
              <span className="mt-1 block">{GOROU_DEFS[id].restTitle}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-1 border-t border-divider pt-4">
          <h3 className="text-lg font-bold">休憩や動作の参考資料</h3>
          <ul className="space-y-1">
            <li><a href="https://www.osha.gov/etools/computer-workstations/work-process" target="_blank" rel="noopener noreferrer" className={textLinkClass}>米国労働安全衛生局のコンピューター作業と休憩</a></li>
            <li><a href="https://www.who.int/publications/i/item/9789240015128" target="_blank" rel="noopener noreferrer" className={textLinkClass}>WHOの身体活動と座位行動の指針</a></li>
            <li><a href="https://aao.org/eye-health/tips-prevention/computer-usage" target="_blank" rel="noopener noreferrer" className={textLinkClass}>米国眼科学会の画面作業と目の負担</a></li>
            <li><a href="https://www.cuh.nhs.uk/patient-information/achilles-tendinopathy-management-advice/" target="_blank" rel="noopener noreferrer" className={textLinkClass}>英国NHSのアキレス腱の痛みと負荷の調整</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
