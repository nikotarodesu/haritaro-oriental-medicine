"use client";

import React, { useState } from "react";
import { Sparkles, Stethoscope, ArrowRightLeft } from "lucide-react";

export interface EastWestTermData {
  id: string;
  term: string; // 例: 肝気犯胃（かんきはんい）
  reading?: string; // かんきはんい
  category: string; // 例: 五行相乗・木乗土・中焦気機失調
  oriental: {
    badge: string; // 東洋医学の要約
    mechanism: string; // 気機・病態
    symptoms: string[]; // 主な症状
    treatment: string; // 主方・要穴
  };
  western: {
    badge: string; // 西洋医学の対応病態
    mechanism: string; // 自律神経・解剖・生理
    conditions: string[]; // 対応疾患・鑑別
    treatment: string; // 代表的薬剤・治療
  };
  synergy: string; // 東西相補の臨床ポイント（東西をつなぐ智恵）
}

export const PRESET_EAST_WEST_TERMS: Record<string, EastWestTermData> = {
  "肝気犯胃": {
    id: "kanki-hani",
    term: "肝気犯胃（かんきはんい）",
    reading: "かんきはんい",
    category: "五行相乗・木乗土・中焦気機失調",
    oriental: {
      badge: "東洋医学：肝木横逆・胃気上逆",
      mechanism: "強い精神的ストレス・怒り・抑鬱により肝の「疏泄（そせつ）」が乱れて横逆し、脾胃を攻撃（木乗土）。正常なら下行すべき胃気（胃気降濁）が滞り、上逆することで心窩部痛や呑酸が生じる。",
      symptoms: ["食後の胃痛・みぞおちの差し込む痛み", "頻繁なゲップ・呑酸（胃酸逆流）", "胸脇部の張り・ため息", "ストレスや緊張で症状が悪化"],
      treatment: "四逆散、半夏瀉心湯、柴胡疎肝散 ／ 太衝、中脘、内関、足三里"
    },
    western: {
      badge: "西洋医学：自律神経性胃運動不全・FD / NERD",
      mechanism: "大脳辺縁系・視床下部の情動ストレスによる交感神経過緊張と迷走神経（副交感神経）機能不全。下部食道括約筋（LES）の一過性弛緩、胃底部の適応弛緩不全、胃前庭部排出遅延、胃酸知覚過敏が重層的に発生する。",
      conditions: ["機能性ディスペプシア（FD：食後愁訴症候群 / 心窩部痛症候群）", "非びらん性胃食道逆流症（NERD）", "ストレス性胃炎（上部消化管内視鏡による器質的除外診断が必要）"],
      treatment: "プロトンポンプ阻害薬（PPI/P-CAB）、消化管運動改善薬（モサプリド）、抗不安薬"
    },
    synergy: "内視鏡で「異常なし」とされる機能性愁訴に対し、西洋の除外診断で器質的病変を担保した上で、東洋の「気機昇降（疏肝和胃）」治療が極めて高い相補的効果を発揮します。"
  },
  "kanki-hani": {
    id: "kanki-hani",
    term: "肝気犯胃（かんきはんい）",
    reading: "かんきはんい",
    category: "五行相乗・木乗土・中焦気機失調",
    oriental: {
      badge: "東洋医学：肝木横逆・胃気上逆",
      mechanism: "強い精神的ストレス・怒り・抑鬱により肝の「疏泄（そせつ）」が乱れて横逆し、脾胃を攻撃（木乗土）。正常なら下行すべき胃気（胃気降濁）が滞り、上逆することで心窩部痛や呑酸が生じる。",
      symptoms: ["食後の胃痛・みぞおちの差し込む痛み", "頻繁なゲップ・呑酸（胃酸逆流）", "胸脇部の張り・ため息", "ストレスや緊張で症状が悪化"],
      treatment: "四逆散、半夏瀉心湯、柴胡疎肝散 ／ 太衝、中脘、内関、足三里"
    },
    western: {
      badge: "西洋医学：自律神経性胃運動不全・FD / NERD",
      mechanism: "大脳辺縁系・視床下部の情動ストレスによる交感神経過緊張と迷走神経（副交感神経）機能不全。下部食道括約筋（LES）の一過性弛緩、胃底部の適応弛緩不全、胃前庭部排出遅延、胃酸知覚過敏が重層的に発生する。",
      conditions: ["機能性ディスペプシア（FD：食後愁訴症候群 / 心窩部痛症候群）", "非びらん性胃食道逆流症（NERD）", "ストレス性胃炎（上部消化管内視鏡による器質的除外診断が必要）"],
      treatment: "プロトンポンプ阻害薬（PPI/P-CAB）、消化管運動改善薬（モサプリド）、抗不安薬"
    },
    synergy: "内視鏡で「異常なし」とされる機能性愁訴に対し、西洋の除外診断で器質的病変を担保した上で、東洋の「気機昇降（疏肝和胃）」治療が極めて高い相補的効果を発揮します。"
  },
  "肝陽上亢": {
    id: "kanyou-joukou",
    term: "肝陽上亢（かんようじょうこう）",
    reading: "かんようじょうこう",
    category: "陰虚陽亢・頭面部上衝",
    oriental: {
      badge: "東洋医学：肝陰不足・陽気上衝",
      mechanism: "肝腎の陰液（体液・冷却作用）が不足し、抑えを失った肝の陽気（熱・興奮エネルギー）が頭部へと突き抜けて暴走する病態。激しい頭痛や眩暈を招く。",
      symptoms: ["ズキズキと拍動する頭痛・頭重感", "眩暈（めまい）・耳鳴り", "顔面紅潮・目の充血", "怒りっぽさ・不眠・多夢"],
      treatment: "釣藤散、天麻鉤藤飲、杞菊地黄丸 ／ 太衝、風池、太渓、百会"
    },
    western: {
      badge: "西洋医学：交感神経過緊張・本態性高血圧・片頭痛",
      mechanism: "交感神経-副腎髄質系の過剰興奮による末梢血管収縮・血圧急上昇、および三叉神経血管説に基づく頭蓋内外血管の拍動性拡張と神経性炎症カスケード。",
      conditions: ["本態性高血圧症", "片頭痛（Migraine）", "緊張型頭痛との混合性頭痛"],
      treatment: "カルシウム拮抗薬、トリプタン製剤、β遮断薬、CGRP関連抗体薬"
    },
    synergy: "血圧測定や脳画像診断（MRI/CT）で脳血管障害を除外した上で、持続的な交感神経過緊張体質を東洋医学の「平肝潜陽」で鎮静化します。"
  },
  "心火上炎": {
    id: "shinka-jouen",
    term: "心火上炎（しんかじょうえん）",
    reading: "しんかじょうえん",
    category: "心神失調・熱性病態",
    oriental: {
      badge: "東洋医学：心熱熾盛・神不守舎",
      mechanism: "過労や精神刺激によって心（しん）の陽気が過剰に燃え上がり、神（こころ・大脳中枢）を乱す病態。舌先が赤くただれ、熱感が上焦に集中する。",
      symptoms: ["激しい不眠・多夢・熟眠感の欠如", "舌先の発赤と痛み（アフタ性口内炎）", "動悸・焦燥感・胸苦しさ", "尿色が濃く排尿痛（熱が小腸へ移る）"],
      treatment: "黄連解毒湯、導赤散、朱砂安神丸 ／ 神門、労宮、大陵、巨闕"
    },
    western: {
      badge: "西洋医学：中枢神経過覚醒・コルチゾール過多・不眠症",
      mechanism: "視床下部-下垂体-副腎皮質系（HPA軸）の慢性亢進に伴う高コルチゾール血症およびノルアドレナリン過剰分泌。上行性網様体賦活系の持続興奮による深睡眠抑制。",
      conditions: ["精神生理性不眠症（原発性不眠症）", "パニック障害・不安神経症", "アフタ性口内炎"],
      treatment: "オレキシン受容体拮抗薬、メラトニン受容体作動薬、GABA系睡眠導入薬"
    },
    synergy: "睡眠薬の漸減・離脱を目指す際、東洋の「清心瀉火・安神」アプローチが自律神経系のベースラインを鎮めるための強力な支えとなります。"
  },
  "気滞血瘀": {
    id: "kitai-ketsuou",
    term: "気滞血瘀（きたいけつお）",
    reading: "きたいけつお",
    category: "循環動態失調・不通則痛",
    oriental: {
      badge: "東洋医学：気滞による二次的血行鬱滞",
      mechanism: "気の推進力・流通が滞る（気滞）ことで、血（けつ）を押し流す力が失われ、局所に血が滞留・鬱血（血瘀）する病態。「気行けば即ち血行病む、気滞れば即ち血瘀す」。刺すような固定痛を生じる。",
      symptoms: ["針で刺されたような刺痛・夜間増悪", "痛む場所が固定している", "肩こり・頭痛・月経困難症", "唇や歯肉の暗紫色、舌下静脈怒張"],
      treatment: "血府逐瘀湯、冠元顆粒、桂枝茯苓丸 ／ 合谷、太衝（開四関）、三陰交、膈兪"
    },
    western: {
      badge: "西洋医学：微小循環障害・局所虚血・炎症性疼痛",
      mechanism: "交感神経性血管収縮による毛細血管血流の低下、赤血球変形能低下・血小板凝集による血液レオロジー悪化。局所虚血からブラジキニンやサブスタンスP等の発痛物質が産生・蓄積される循環不全病態。",
      conditions: ["筋筋膜性疼痛症候群（MPS）", "末梢動脈疾患（PAD）", "子宮内膜症・月経困難症", "微小血管狭心症"],
      treatment: "NSAIDs（消炎鎮痛薬）、血小板凝集抑制薬、プロスタグランジン製剤、筋弛緩薬"
    },
    synergy: "NSAIDsの漫然投与による胃粘膜障害を防ぎつつ、微小循環と自律神経反射を「理気活血」の鍼灸・漢方で根本的に改善します。"
  },
  "心腎不交": {
    id: "shinjin-fukou",
    term: "心腎不交（しんじんふこう）",
    reading: "しんじんふこう",
    category: "水火既済失調・上熱下寒",
    oriental: {
      badge: "東洋医学：水火不相済・上熱下寒",
      mechanism: "心火（陽）は下降して腎を温め、腎水（陰）は上昇して心を潤すという協調関係（水火既済）が破綻。心火が頭部で暴走（上熱）し、腎水が下半身で冷え切る（下寒）病態。",
      symptoms: ["入眠困難・頻繁な中途覚醒", "足腰の激しい冷えと、顔・胸ののぼせ", "腰や膝の脱力感・だるさ", "健忘・耳鳴り・夜間頻尿"],
      treatment: "交泰丸、天王補心丹、六味地黄丸 ／ 湧泉、太渓、神門、関元"
    },
    western: {
      badge: "西洋医学：サーカディアンリズム破綻・体温調節不全",
      mechanism: "視床下部の概日リズム中枢（視交叉上核）と深部体温調節機構の不協和。就寝時に深部体温が低下せず末梢血管への熱放散が阻害されることによる重度の睡眠構築障害。",
      conditions: ["概日リズム睡眠障害", "自律神経失調症（更年期障害に伴う血管運動神経症状）", "下肢静止不能症候群（RLS）"],
      treatment: "高照度光療法、メラトニン補充、ホルモン補充療法（HRT）"
    },
    synergy: "ホルモンや睡眠薬で対処しきれない「上半身はのぼせて眠れず、下半身は冷える」病態に対し、「水昇火降」を促すツボ刺激（湧泉・百会）が劇的な調整力を発揮します。"
  },
  "開四関": {
    id: "kai-shikan",
    term: "開四関（かいしかん）",
    reading: "かいしかん",
    category: "四肢気機開通・総合調整",
    oriental: {
      badge: "東洋医学：全身の気血流通の総関門を開放",
      mechanism: "上肢の手陽明大腸経「合谷（気・陽）」と下肢の足厥陰肝経「太衝（血・陰）」の左右4穴を同時に刺激。全身の気血の渋滞（気滞・血瘀）を一気に解き放ち、臓腑の昇降を正常化する。",
      symptoms: ["全身の強い緊張・ストレス", "原因不明の全身のこわばりや倦怠感", "頭痛・腹痛・月経痛の併発", "自律神経の乱れによる精神不安"],
      treatment: "合谷（両側） ＋ 太衝（両側）の四穴配穴"
    },
    western: {
      badge: "西洋医学：C線維求心性入力と中枢性オピオイド分泌",
      mechanism: "太いAβ線維と細いAδ・C線維の多重刺激による脊髄後角ゲートコントロール。視床下部・中脳水道周囲灰白質（PAG）からのβ-エンドルフィン分泌促進および広汎性侵害抑制調節（DNIC）の賦活。",
      conditions: ["中枢性感作（Central Sensitization）", "線維筋痛症", "ストレス性心身症", "慢性難治性疼痛"],
      treatment: "鍼通電療法（低周波鍼通電）、認知行動療法、神経障害性疼痛治療薬"
    },
    synergy: "古典が700年前に見出した「四穴で全身の気の巡りを戻す」知恵が、現代神経科学の「下行性疼痛抑制系賦活と自律神経リセット」と完全に一致することを実証しています。"
  }
};

export interface EastWestTermSwitchProps {
  termId?: string; // プリセットIDまたは用語名（例: "肝気犯胃" or "kanki-hani"）
  term?: string; // カスタム用語名
  reading?: string;
  category?: string;
  orientalData?: {
    badge: string;
    mechanism: string;
    symptoms?: string[];
    treatment?: string;
  };
  westernData?: {
    badge: string;
    mechanism: string;
    conditions?: string[];
    treatment?: string;
  };
  synergyText?: string;
  defaultMode?: "oriental" | "western";
}

export default function EastWestTermSwitch({
  termId,
  term,
  reading,
  category,
  orientalData,
  westernData,
  synergyText,
  defaultMode = "oriental"
}: EastWestTermSwitchProps) {
  // プリセットデータの参照
  const presetKey = termId || term || "肝気犯胃";
  const preset = PRESET_EAST_WEST_TERMS[presetKey];

  const displayTerm = term || preset?.term || presetKey;
  const displayReading = reading || preset?.reading;
  const displayCategory = category || preset?.category || "東西統合対照";
  const oriental = orientalData || preset?.oriental;
  const western = westernData || preset?.western;
  const synergy = synergyText || preset?.synergy;

  const [activeMode, setActiveMode] = useState<"oriental" | "western">(defaultMode);

  if (!oriental || !western) {
    return null;
  }

  return (
    <div className="not-prose my-6 rounded-2xl border border-[#E5DEC9] dark:border-[#2D3E50] bg-[#FFFFFF] dark:bg-[#152028] shadow-xs overflow-hidden transition-all">
      {/* 上部ヘッダー：用語名 ＋ 東西切り替えスイッチ */}
      <div className="bg-[#FAF8F5] dark:bg-[#1A2632] px-4 sm:px-5 py-3 border-b border-[#EFE9DD] dark:border-[#243342] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#EBF3EF] dark:bg-[#1E332B] flex items-center justify-center text-[#1E3D34] dark:text-[#74BA9E]">
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                {displayTerm}
              </span>
              {displayReading && (
                <span className="text-[11px] text-[#78857E] dark:text-[#8899A6] hidden sm:inline">
                  〔{displayReading}〕
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#B86924] dark:text-[#E6C387] font-medium block">
              {displayCategory}
            </span>
          </div>
        </div>

        {/* 東西切り替えトグルスイッチ */}
        <div className="inline-flex p-1 rounded-xl bg-[#EAE4D5] dark:bg-[#0E1720] border border-[#DDD5C0] dark:border-[#2A3B4A] shadow-inner text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveMode("oriental")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === "oriental"
                ? "bg-[#1E3D34] text-white shadow-xs"
                : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <span className="text-xs">☯</span>
            <span>東洋医学</span>
            <span className="text-[10px] opacity-75 font-normal">（証・気機）</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode("western")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMode === "western"
                ? "bg-[#1E2D3D] text-white shadow-xs"
                : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E2D3D] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>西洋医学</span>
            <span className="text-[10px] opacity-75 font-normal">（病態・自律神経）</span>
          </button>
        </div>
      </div>

      {/* コンテンツ本体：選択中の医学視点を表示 */}
      <div className="p-4 sm:p-5 space-y-4">
        {activeMode === "oriental" ? (
          /* 東洋医学の視点 */
          <div className="space-y-3.5 animate-fadeIn">
            <div className="flex items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <span className="w-2 h-2 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E]" />
                {oriental.badge}
              </span>
              <span className="text-[10px] text-[#78857E] dark:text-[#8899A6]">
                東洋の視点：機能・気機昇降・証
              </span>
            </div>

            {/* メカニズム */}
            <p className="text-xs sm:text-sm text-[#333835] dark:text-[#D5E0DC] leading-relaxed">
              {oriental.mechanism}
            </p>

            {/* 症状ピル */}
            {oriental.symptoms && oriental.symptoms.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-[#59615D] dark:text-[#96A6B2] block">
                  主な臨床所見・症状：
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {oriental.symptoms.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#EBF3EF] dark:bg-[#1A2E26] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-medium border border-[#D5E6DF] dark:border-[#28483C]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 方剤・配穴 */}
            {oriental.treatment && (
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#EFE9DD] dark:border-[#243342] text-xs flex items-start gap-2">
                <span className="font-bold text-[#B86924] dark:text-[#E6C387] shrink-0">
                  【主方・要穴】
                </span>
                <span className="text-[#404743] dark:text-[#C5D2DB] leading-snug">
                  {oriental.treatment}
                </span>
              </div>
            )}
          </div>
        ) : (
          /* 西洋医学の視点 */
          <div className="space-y-3.5 animate-fadeIn">
            <div className="flex items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8]">
                <span className="w-2 h-2 rounded-full bg-[#1E2D3D] dark:bg-[#7BAAD8]" />
                {western.badge}
              </span>
              <span className="text-[10px] text-[#78857E] dark:text-[#8899A6]">
                西洋の視点：構造・自律神経・除外診断
              </span>
            </div>

            {/* メカニズム */}
            <p className="text-xs sm:text-sm text-[#333835] dark:text-[#D5E0DC] leading-relaxed">
              {western.mechanism}
            </p>

            {/* 対応疾患・鑑別ピル */}
            {western.conditions && western.conditions.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-[#59615D] dark:text-[#96A6B2] block">
                  対応する西洋医学的病態・疾患：
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {western.conditions.map((c, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#EDF3FA] dark:bg-[#182838] text-[#1E2D3D] dark:text-[#93BDDE] text-xs font-medium border border-[#D5E3F2] dark:border-[#263D54]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 治療法・薬剤 */}
            {western.treatment && (
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A2632] border border-[#EFE9DD] dark:border-[#243342] text-xs flex items-start gap-2">
                <span className="font-bold text-[#1E2D3D] dark:text-[#7BAAD8] shrink-0">
                  【検査・標準治療】
                </span>
                <span className="text-[#404743] dark:text-[#C5D2DB] leading-snug">
                  {western.treatment}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 相補の視点（東西をつなぐ気づきフッター） */}
        {synergy && (
          <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-start gap-2 text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#232826] dark:text-[#FAF8F5] mr-1">
                相補の知恵：
              </span>
              <span>{synergy}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
