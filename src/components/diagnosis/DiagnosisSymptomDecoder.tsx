"use client";

import React, { useState } from "react";
import { Sparkles, MessageCircle, ArrowRight, HelpCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

interface DecodeCard {
  phrase: string;
  decodedPathology: string;
  category: "気" | "血" | "水" | "寒熱";
  color: string;
  meaning: string;
  followUpQuestion: string;
  modernTranslation: string;
}

const DECODE_CARDS: DecodeCard[] = [
  {
    phrase: "「身体や頭が重だるい」",
    decodedPathology: "湿・水滞（しつ・すいたい）",
    category: "水",
    color: "#0288D1",
    meaning: "気血の巡りを塞ぐ『重濁・粘滞』な水毒。雨の日や梅雨時に悪化しやすい。",
    followUpQuestion: "「夕方に足がむくみますか？ 雨の日に頭痛や関節痛がひどくなりますか？」",
    modernTranslation: "組織間質浮腫、リンパ流うっ滞、気圧変化による内耳前庭刺激。",
  },
  {
    phrase: "「力が入らない・朝からだるい」",
    decodedPathology: "気虚（ききょ）",
    category: "気",
    color: "#FFA000",
    meaning: "生体を動かすバッテリーそのものの出力低下。休養しても充電が追いつかない状態。",
    followUpQuestion: "「食後に猛烈な眠気が来ますか？ 声を出すのが億劫になりますか？」",
    modernTranslation: "ATP産生低下、ミトコンドリア機能不全、慢性疲労症候群。",
  },
  {
    phrase: "「針で刺すようにズキズキ痛む」",
    decodedPathology: "瘀血（おけつ）",
    category: "血",
    color: "#D32F2F",
    meaning: "毛細血管（絡脈）が閉塞し、血液が滞留している局所の固定痛。夜間に悪化する。",
    followUpQuestion: "「痛む場所は指一本で指せますか？ 夜間に布団に入ると痛みが強くなりますか？」",
    modernTranslation: "局所微小循環障害、血液粘度上昇、虚血性組織疼痛。",
  },
  {
    phrase: "「胸や脇が張る・ため息が出る」",
    decodedPathology: "気滞（きたい）",
    category: "気",
    color: "#00897B",
    meaning: "自律神経が過緊張し、気の流れが渋滞して内圧が高まっているサイン。",
    followUpQuestion: "「お腹にガスが溜まりますか？ 喉に何かがつっかえた感じ（梅核気）がありますか？」",
    modernTranslation: "交感神経過緊張、横隔膜・消化管平滑筋の攣縮、胃内圧上昇。",
  },
  {
    phrase: "「ピリピリ・カッカと熱い」",
    decodedPathology: "熱証 / 陰虚火旺（いんきょかおう）",
    category: "寒熱",
    color: "#E65100",
    meaning: "冷却水（陰液）が不足してオーバーヒートしているか、急性の熱邪が炎上しているサイン。",
    followUpQuestion: "「夕方に手足の裏がほてりますか？ 夜間に寝汗をかきますか？」",
    modernTranslation: "低悪性度慢性炎症、交感神経緊張による末梢血管拡張、脱水。",
  },
  {
    phrase: "「芯から冷えて縮こまる」",
    decodedPathology: "寒証 / 陽虚（ようきょ）",
    category: "寒熱",
    color: "#1565C0",
    meaning: "生命の暖房である陽気が衰退し、毛細血管が収縮して血行が停止しているサイン。",
    followUpQuestion: "「温かい飲み物を欲しますか？ お腹を温めると痛みが和らぎますか？」",
    modernTranslation: "基礎代謝低下、甲状腺機能低下傾向、末梢血管痙攣（レイノー現象）。",
  },
];

export default function DiagnosisSymptomDecoder() {
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const current = DECODE_CARDS[selectedCard];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説③：主訴の「質感デコード」辞書カード（Symptom Texture Decoder）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            患者の主観的な言葉から「東洋医学の病理実体」を解読する
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          フレーズを選んで翻訳を確認
        </span>
      </div>

      {/* 6大フレーズカードピル */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
        {DECODE_CARDS.map((card, idx) => {
          const isSelected = selectedCard === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedCard(idx)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                isSelected
                  ? "bg-white dark:bg-[#121920] shadow-sm border-2 ring-1 scale-[1.02]"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
              }`}
              style={{
                borderColor: isSelected ? card.color : undefined,
              }}
            >
              <div className="text-[10px] font-bold mb-0.5" style={{ color: card.color }}>
                {card.category}のサイン
              </div>
              <div className="font-bold text-xs text-[#232826] dark:text-[#FAF8F5] line-clamp-1">
                {card.phrase}
              </div>
            </button>
          );
        })}
      </div>

      {/* 選択されたフレーズのデコード詳細 */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE4D5] dark:border-[#22303D] pb-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" style={{ color: current.color }} />
            <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
              患者の訴え：{current.phrase}
            </h5>
          </div>
          <div className="flex items-center gap-1.5">
            <ArrowRight className="w-4 h-4 text-[#8C9691]" />
            <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: current.color }}>
              {current.decodedPathology}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
              東洋医学の病理的意味：
            </span>
            <p className="text-[#3E4541] dark:text-[#CBD5E1] leading-relaxed">
              {current.meaning}
            </p>
          </div>

          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="font-bold text-[#B86924] dark:text-[#E6C387] block mb-1">
              現代医学・病態生理への翻訳：
            </span>
            <p className="text-[#3E4541] dark:text-[#CBD5E1] leading-relaxed">
              {current.modernTranslation}
            </p>
          </div>
        </div>

        {/* フォローアップ質問 */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs">
          <span className="font-bold text-[#D32F2F] dark:text-[#EF5350] block mb-1">
            🔍 仮説を確定させるフォローアップ質問（切り分けの問い）：
          </span>
          <p className="font-medium text-[#232826] dark:text-[#FAF8F5]">
            {current.followUpQuestion}
          </p>
        </div>
      </div>

      {/* 八綱を見抜くクリティカル・クエスチョン対比表 */}
      <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5">
        <h5 className="font-bold text-xs text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider mb-3">
          八綱を見抜く2大クリティカル・クエスチョン
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
            <strong className="text-[#0288D1] block mb-1">① 飲水傾向（寒熱の判別）</strong>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              ・<strong>冷たい水</strong>をがぶ飲みしたい ➜ <strong>【実熱】</strong><br />
              ・<strong>温かいお茶</strong>を好む、水分を欲しない ➜ <strong>【虚寒】</strong><br />
              ・身体は冷えているのに「冷水を一口だけ含みたい」 ➜ <strong>【陰虚の虚熱】</strong>
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]">
            <strong className="text-[#D32F2F] block mb-1">② 按圧・動作反応（虚実の判別）</strong>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              ・痛む場所を<strong>押すと気持ちいい（喜按）</strong>・休むと楽 ➜ <strong>【虚証（エネルギー不足）】</strong><br />
              ・痛む場所を<strong>触られるのを嫌がる（拒按）</strong>・動かすと巡って楽 ➜ <strong>【実証（気血停滞）】</strong>
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
