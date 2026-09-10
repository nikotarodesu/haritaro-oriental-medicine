"use client";

import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  Utensils,
  Sparkles,
  HeartPulse,
  Info,
  CheckCircle2,
  ChevronRight,
  Flame,
  Droplets,
  Apple,
  Coffee,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { GOGYO_COLORS } from "@/utils/gogyoColor";

// 五臓の型定義
export type OrganKey = "liver" | "heart" | "spleen" | "lung" | "kidney";

export interface RescueFoodCategory {
  category: string;
  items: string[];
}

export interface OrganProhibitionData {
  key: OrganKey;
  organName: string;
  kanji: string;
  element: "木" | "火" | "土" | "金" | "水";
  elementColor: string;
  bgLight: string;
  bgDark: string;
  borderColor: string;
  symptomSummary: string;
  typicalComplaints: string[];
  
  // 相剋ブレーキ情報
  restrictingElement: "木" | "火" | "土" | "金" | "水";
  brakeTaste: string; // 辛味、鹹味、酸味、苦味、甘味
  brakeTasteKanji: string; // 辛、鹹、酸、苦、甘
  classicFormula: string; // 金剋木、水剋火、木剋土、火剋金、土剋水
  classicQuote: string; // 『素問』原文
  brakeReason: string; // なぜ避けるべきかの医学的理由
  avoidFoods: string[]; // 控えるべき具体的食品
  avoidHabits: string[]; // NG食習慣
  
  // レスキュー食材情報
  rescueTaste: string; // 推奨される味覚
  rescuePrinciple: string; // 養生方針
  rescueCategories: RescueFoodCategory[]; // カテゴリ別食材
  convenienceRescue: string[]; // コンビニ・外食で選ぶならこれ
  cookingTip: string; // 調理・食べ方の知恵
}

export const PROHIBITION_DATA: Record<OrganKey, OrganProhibitionData> = {
  liver: {
    key: "liver",
    organName: "肝（かん）",
    kanji: "肝",
    element: "木",
    elementColor: GOGYO_COLORS["木"].accent,
    bgLight: GOGYO_COLORS["木"].bgLight,
    bgDark: GOGYO_COLORS["木"].bgDark,
    borderColor: GOGYO_COLORS["木"].borderLight,
    symptomSummary: "目の疲労・イライラ・筋のつっぱり・情緒不安定",
    typicalComplaints: [
      "パソコンやスマホで目がかすむ・乾く",
      "些細なことでイライラしやすい、情緒が不安定",
      "首筋や肩の筋肉がカチコチにこわばる、足がつる",
      "頭の片側がズキズキ痛む、月経前に胸が張る",
    ],
    restrictingElement: "金",
    brakeTaste: "辛味（からみ・多辛）",
    brakeTasteKanji: "辛",
    classicFormula: "金剋木（金が木を傷める）",
    classicQuote: "『素問』五臓生成篇：「多食辛、則筋急而爪枯」（辛きを多く食すれば、則ち筋急にして爪枯る）",
    brakeReason:
      "辛味には「発散・昇散・乾燥」の強い作用があります。肝は「血と潤い」を蓄えることで柔軟さを保ちますが、辛いものを食べすぎると体内の陰血が消耗し、筋がひきつり、爪が割れ、怒りっぽさや頭痛（肝火上炎）を激化させます。",
    avoidFoods: [
      "激辛スパイス・麻辣・唐辛子の大量摂取",
      "過剰なわさび・からし・生の過度なネギ",
      "度数の高いアルコール（蒸留酒の多飲）",
      "キムチや辛い鍋の連日ドカ食い",
    ],
    avoidHabits: [
      "イライラした時に「辛いものでストレス発散」する習慣",
      "深夜の飲酒と辛いスナック菓子の組み合わせ",
    ],
    rescueTaste: "酸味（微酸・収斂） ＆ 甘味（緩急）",
    rescuePrinciple: "平肝・養血・柔肝（肝を潤し、高ぶった気を落ち着かせる）",
    rescueCategories: [
      {
        category: "野菜・海藻",
        items: ["ほうれん草", "セロリ", "春菊", "小松菜", "トマト", "わかめ"],
      },
      {
        category: "果物・ナッツ",
        items: ["クコの実（枸杞子）", "ブルーベリー", "黒ごま", "プルーン"],
      },
      {
        category: "魚介・肉",
        items: ["あさり・しじみ", "イカ・タコ", "豚レバー", "白身魚"],
      },
      {
        category: "お茶・薬膳茶",
        items: ["菊花茶", "決明子（はぶ茶）", "ローズヒップティー", "ペパーミントティー"],
      },
    ],
    convenienceRescue: [
      "しじみ汁・あさりの味噌汁",
      "ほうれん草のごま和え",
      "トマトサラダ（ノンオイル和風）",
      "レバニラ炒め（辛味抜き）",
    ],
    cookingTip: "春菊やセロリなどの香味野菜は香りで気を巡らせるため、炒めすぎずサッと加熱して召し上がってください。",
  },

  heart: {
    key: "heart",
    organName: "心（しん）",
    kanji: "心",
    element: "火",
    elementColor: GOGYO_COLORS["火"].accent,
    bgLight: GOGYO_COLORS["火"].bgLight,
    bgDark: GOGYO_COLORS["火"].bgDark,
    borderColor: GOGYO_COLORS["火"].borderLight,
    symptomSummary: "動悸・不眠・焦燥感・不安・顔色のくすみ",
    typicalComplaints: [
      "胸がドキドキしやすい（動悸）、息切れがする",
      "ベッドに入ってもあれこれ考えて眠れない、悪夢を見る",
      "集中力が続かず、物忘れやぼんやり感が増えた",
      "手足は冷えるのに顔がほてる、落ち着かない",
    ],
    restrictingElement: "水",
    brakeTaste: "鹹味（塩辛い味・多鹹）",
    brakeTasteKanji: "鹹",
    classicFormula: "水剋火（水が火を消し鎮め圧迫する）",
    classicQuote: "『素問』五臓生成篇：「多食鹹、則脈凝泣而変色」（鹹きを多く食すれば、則ち脈凝泣して色変ず）",
    brakeReason:
      "鹹味（塩気）は体内に水分を保持し、血流の浸透圧を高めます。過剰な塩分は血液をネバつかせ（脈凝泣）、血脈を主る心臓のポンプに過大な負荷を与え、動悸や血圧異常、不眠・不安感を引き起こします。",
    avoidFoods: [
      "ラーメンやうどんのスープ完飲",
      "塩辛・干物・漬物の過剰摂取",
      "ハム・ベーコン・ウインナー等の加工肉多食",
      "ポテトチップス等の塩気スナック菓子の常用",
    ],
    avoidHabits: [
      "味が薄いとすぐ醤油やソースをドバドバかける癖",
      "お酒のつまみに塩分の高い珍味を延々と食べる習慣",
    ],
    rescueTaste: "苦味（清心・熱を冷ます） ＆ 甘味（養心安神）",
    rescuePrinciple: "養心・安神・清熱（心を養い、精神を穏やかに鎮める）",
    rescueCategories: [
      {
        category: "野菜・豆類",
        items: ["百合根", "赤パプリカ", "ゴーヤ", "レタス", "小豆"],
      },
      {
        category: "穀物・種実",
        items: ["小麦（全粒粉）", "ハトムギ", "蓮の実", "くるみ"],
      },
      {
        category: "果物・乾物",
        items: ["ナツメ（大棗）", "竜眼肉", "スイカ", "干しぶどう"],
      },
      {
        category: "お茶・薬膳茶",
        items: ["ジャスミン茶", "緑茶（薄め）", "麦茶", "カモミールティー"],
      },
    ],
    convenienceRescue: [
      "温かい全粒粉パン・小麦サンド",
      "小豆のおかゆ・おしるこ（甘さ控えめ）",
      "乾燥ナツメ（ドライフルーツコーナー）",
      "温かい麦茶・ジャスミン茶",
    ],
    cookingTip: "百合根や蓮の実はスープやお粥に入れてじっくり煮込むと、神経を鎮める安神効果が高まります。",
  },

  spleen: {
    key: "spleen",
    organName: "脾（ひ・消化器）",
    kanji: "脾",
    element: "土",
    elementColor: GOGYO_COLORS["土"].accent,
    bgLight: GOGYO_COLORS["土"].bgLight,
    bgDark: GOGYO_COLORS["土"].bgDark,
    borderColor: GOGYO_COLORS["土"].borderLight,
    symptomSummary: "胃もたれ・食欲不振・お腹の張り・軟便・倦怠感",
    typicalComplaints: [
      "少し食べただけで胃がもたれる、食後に強い眠気が来る",
      "お腹が張ってガスが溜まりやすい、便が柔らかい・下痢しやすい",
      "雨の日や湿気の多い日に身体全体が鉛のように重い",
      "口内炎ができやすい、唇が乾燥して荒れやすい",
    ],
    restrictingElement: "木",
    brakeTaste: "酸味（強いすっぱさ・多酸）",
    brakeTasteKanji: "酸",
    classicFormula: "木剋土（木が土の養分を奪い崩す）",
    classicQuote: "『素問』五臓生成篇：「多食酸、則肉胝䐢而唇掲」（酸きを多く食すれば、則ち肉胝䐢にして唇掲ぐ）",
    brakeReason:
      "酸味は胃酸の分泌を強力に促進し、肝気を亢進させて胃腸（脾土）を攻撃します（木乗土）。胃腸が弱っているときに強い酸味が入ると、胃粘膜を刺激して胃痛や胸やけを起こし、運化（消化吸収）機能を麻痺させます。",
    avoidFoods: [
      "空腹時のレモン水・グレープフルーツジュース",
      "強烈な酢の物・黒酢ドリンクの多飲",
      "酸味の強い梅干しや未熟な果物の過食",
      "酢漬けピクルスなどの連続摂取",
    ],
    avoidHabits: [
      "「疲労回復に良いから」とお腹が減っている時に酸っぱい黒酢を飲む習慣",
      "冷たい酸味飲料を一気飲みする習慣",
    ],
    rescueTaste: "甘味（天然の淡い甘味・補気） ※白砂糖はNG",
    rescuePrinciple: "健脾・益気・化湿（胃腸を温め、消化吸収力を底上げする）",
    rescueCategories: [
      {
        category: "芋類・野菜",
        items: ["山芋・長芋", "かぼちゃ", "キャベツ", "人参", "じゃがいも"],
      },
      {
        category: "穀物・豆類",
        items: ["白米・玄米（おかゆ）", "大豆・豆腐", "椎茸・えのき", "ハトムギ"],
      },
      {
        category: "魚介・肉類",
        items: ["鶏肉（ささみ・胸肉）", "白身魚（鯛・タラ）", "鮭", "牛肉（赤身）"],
      },
      {
        category: "お茶・薬膳茶",
        items: ["ほうじ茶", "とうもろこしのひげ茶", "プーアル茶", "生姜湯"],
      },
    ],
    convenienceRescue: [
      "鮭おにぎり（温めて食べる）",
      "キャベツと豆腐の温かいお味噌汁",
      "焼き芋（小サイズ）",
      "茶碗蒸し",
    ],
    cookingTip: "食材は生野菜を避け、温かいスープや蒸し料理、柔らかいおかゆにして胃腸への物理的負担を最小限に抑えましょう。",
  },

  lung: {
    key: "lung",
    organName: "肺（はい・呼吸器・皮膚）",
    kanji: "肺",
    element: "金",
    elementColor: GOGYO_COLORS["金"].primary,
    bgLight: GOGYO_COLORS["金"].bgLight,
    bgDark: GOGYO_COLORS["金"].bgDark,
    borderColor: GOGYO_COLORS["金"].borderLight,
    symptomSummary: "空咳・喉の乾燥・肌の乾燥・風邪を引きやすい",
    typicalComplaints: [
      "コンコンと乾いた咳が出る、喉がイガイガして声がかすれる",
      "肌がカサついて粉をふく、アトピーや痒みが出やすい",
      "気温の変わり目にすぐ風邪を引く、鼻水・くしゃみが出る",
      "息切れがしやすく、階段を登るとすぐ息が切れる",
    ],
    restrictingElement: "火",
    brakeTaste: "苦味（強い苦味・多苦）",
    brakeTasteKanji: "苦",
    classicFormula: "火剋金（火が金を溶かし焼き尽くす）",
    classicQuote: "『素問』五臓生成篇：「多食苦、則皮槁而毛抜」（苦きを多く食すれば、則ち皮槁して毛抜く）",
    brakeReason:
      "苦味は熱を冷ますと同時に「極度の乾燥（燥湿作用）」を引き起こします。肺は「嬌臓（きょうぞう）」と呼ばれ、5つの臓腑の中で最も乾燥を嫌います。強い苦味や焙煎された焦げ熱は、肺のデリケートな潤い（肺陰）を焼き尽くし、皮膚の乾燥や抜け毛、頑固な乾性咳嗽を悪化させます。",
    avoidFoods: [
      "濃すぎるブラックコーヒーの1日何杯ものガブ飲み",
      "炭火の焦げ、焦げた焼き肉・焼き魚",
      "極端に苦いサプリメント・苦汁・過度のゴーヤ多食",
      "苦味の強い高カカオチョコ（90%以上）の過食",
    ],
    avoidHabits: [
      "水分補給の代わりにアイスコーヒーばかり飲む習慣",
      "乾燥したオフィスで焦げ煎餅や苦いスナックをつまむこと",
    ],
    rescueTaste: "辛味（適度な発散） ＆ 甘味・酸味（生津潤肺）",
    rescuePrinciple: "潤肺・生津・益気（肺と喉を潤し、バリア機能を回復する）",
    rescueCategories: [
      {
        category: "白い野菜・根菜",
        items: ["白きくらげ", "れんこん", "大根", "長ねぎ（白い部分）", "カブ"],
      },
      {
        category: "果物・種実",
        items: ["梨", "白ごま", "松の実", "百合根", "杏仁（アーモンド）"],
      },
      {
        category: "大豆・乳・甘味",
        items: ["豆乳", "蜂蜜", "豆腐", "白ごまペースト"],
      },
      {
        category: "お茶・薬膳茶",
        items: ["かりん茶", "びわ茶", "白湯＋蜂蜜", "ミントルイボスティー"],
      },
    ],
    convenienceRescue: [
      "大根サラダ（温かいドレッシング）",
      "ホット豆乳ラテ（砂糖不使用＋蜂蜜）",
      "杏仁豆腐",
      "蜂蜜かりんのど飴",
    ],
    cookingTip: "白きくらげや梨、れんこんは「白い食材は肺を潤す」の代表格。スープやコンポートにして水分ごと摂取すると効果絶大です。",
  },

  kidney: {
    key: "kidney",
    organName: "腎（じん・生命力・骨）",
    kanji: "腎",
    element: "水",
    elementColor: GOGYO_COLORS["水"].accent,
    bgLight: GOGYO_COLORS["水"].bgLight,
    bgDark: GOGYO_COLORS["水"].bgDark,
    borderColor: GOGYO_COLORS["水"].borderLight,
    symptomSummary: "足腰の冷え・夜間頻尿・極度の疲労・抜け毛・耳鳴り",
    typicalComplaints: [
      "腰や膝が冷えて重だるい、靴下を履いて寝ても足が冷たい",
      "夜中にトイレで何度も起きる、尿の出が悪くスッキリしない",
      "しっかり寝ても翌朝疲れが抜けない、生命エネルギーの減退感",
      "白髪や抜け毛が急に増えた、耳鳴りや聴力の衰えを感じる",
    ],
    restrictingElement: "土",
    brakeTaste: "甘味（砂糖・過剰な甘み・多甘）",
    brakeTasteKanji: "甘",
    classicFormula: "土剋水（土が水を濁らせ堰き止める）",
    classicQuote: "『素問』五臓生成篇：「多食甘、則骨痛而髪落」（甘きを多く食すれば、則ち骨痛して髪落つ）",
    brakeReason:
      "甘味（特に白砂糖や人工甘味料、高GI食品）は、体内に「湿・痰濁・熱」を溜め込み、骨や腎の濾過機能を著しく疲弊させます。甘いものの過食はカルシウム代謝を狂わせて骨を弱らせ（骨痛）、髪を抜け落ちさせ、先天の精（生命力）を底冷えさせます。",
    avoidFoods: [
      "白砂糖たっぷりのケーキ・スイーツ・菓子パン",
      "清涼飲料水・エナジードリンク・フラペチーノ",
      "人工甘味料入りのダイエット飲料多飲",
      "甘いシロップのかかったデザートや白米・麺のドカ食い",
    ],
    avoidHabits: [
      "疲れた時に「甘いものを食べて元気を出す」という悪循環",
      "食後に必ず甘いデザートを食べないと落ち着かない習慣",
    ],
    rescueTaste: "鹹味（自然な潮の味） ＆ 苦味（堅陰・精気を固める）",
    rescuePrinciple: "補腎・益精・強骨（生命の根源である腎精を補い、骨を強くする）",
    rescueCategories: [
      {
        category: "黒い食材",
        items: ["黒豆", "黒米", "黒きくらげ", "黒ごま", "ひじき"],
      },
      {
        category: "海藻・魚介",
        items: ["昆布", "わかめ", "牡蠣（カキ）", "エビ", "ウナギ"],
      },
      {
        category: "種実・芋類",
        items: ["くるみ", "栗", "山芋", "カシューナッツ"],
      },
      {
        category: "お茶・薬膳茶",
        items: ["黒豆茶", "杜仲茶", "ごぼう茶", "クコの実茶"],
      },
    ],
    convenienceRescue: [
      "ひじきの煮物",
      "黒豆茶（ペットボトルまたはティーバッグ）",
      "むき甘栗（砂糖無添加）",
      "海苔たっぷりのおにぎり ＆ 昆布だし味噌汁",
    ],
    cookingTip: "「黒い食材は腎を補う」が鉄則。黒豆や黒ごま、くるみをご飯に混ぜて炊くだけで、手軽な補腎ごはんが完成します。",
  },
};

// クイック体質お悩み選択肢
const QUICK_COMPLAINTS: {
  id: string;
  organKey: OrganKey;
  label: string;
  shortDesc: string;
  badge: string;
}[] = [
  {
    id: "liver-eye",
    organKey: "liver",
    label: "目の疲れ・イライラ・肩首のつっぱり",
    shortDesc: "スマホ凝視・ストレス・筋肉の強張り",
    badge: "肝の失調（木）",
  },
  {
    id: "heart-sleep",
    organKey: "heart",
    label: "動悸・不眠・浅い眠り・焦燥感",
    shortDesc: "心臓のドキドキ・不安・夜間覚醒",
    badge: "心の失調（火）",
  },
  {
    id: "spleen-stomach",
    organKey: "spleen",
    label: "胃もたれ・お腹の張り・軟便・湿気だるさ",
    shortDesc: "消化不良・食欲不振・身体の重さ",
    badge: "脾の失調（土）",
  },
  {
    id: "lung-cough",
    organKey: "lung",
    label: "空咳・喉のイガイガ・肌のカサつき",
    shortDesc: "呼吸器過敏・皮膚の乾燥・風邪気味",
    badge: "肺の失調（金）",
  },
  {
    id: "kidney-cold",
    organKey: "kidney",
    label: "足腰の冷え・夜間頻尿・極度の疲労感",
    shortDesc: "下半身の脱力痛・抜け毛・生命力低下",
    badge: "腎の失調（水）",
  },
];

export default function FoodFiveProhibitionsAlert({
  initialOrgan = "liver",
}: {
  initialOrgan?: OrganKey;
}) {
  const [selectedOrgan, setSelectedOrgan] = useState<OrganKey>(initialOrgan);
  const [activeTab, setActiveTab] = useState<"brake" | "rescue" | "convenience">("brake");
  const [todayTaste, setTodayTaste] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const organParam = params.get("organ");
      if (organParam && organParam in PROHIBITION_DATA) {
        setSelectedOrgan(organParam as OrganKey);
      }
    }
  }, []);

  const data = PROHIBITION_DATA[selectedOrgan];

  // 五行サークルの座標（五行カラーユニバーサルデザイン完全連動）
  const elementCoords: Record<OrganKey, { x: number; y: number; kanji: string; name: string; color: string }> = {
    liver: { x: 140, y: 150, kanji: "木", name: "肝", color: GOGYO_COLORS["木"].accent },
    heart: { x: 250, y: 70, kanji: "火", name: "心", color: GOGYO_COLORS["火"].accent },
    spleen: { x: 360, y: 150, kanji: "土", name: "脾", color: GOGYO_COLORS["土"].accent },
    lung: { x: 320, y: 270, kanji: "金", name: "肺", color: GOGYO_COLORS["金"].primary },
    kidney: { x: 180, y: 270, kanji: "水", name: "腎", color: GOGYO_COLORS["水"].accent },
  };

  // 相剋の矢印（剋する元 ➜ 剋される先）
  const keLines: Record<OrganKey, { from: OrganKey; to: OrganKey; label: string }> = {
    liver: { from: "lung", to: "liver", label: "金剋木（辛味過剰）" },
    heart: { from: "kidney", to: "heart", label: "水剋火（鹹味過剰）" },
    spleen: { from: "liver", to: "spleen", label: "木剋土（酸味過剰）" },
    lung: { from: "heart", to: "lung", label: "火剋金（苦味過剰）" },
    kidney: { from: "spleen", to: "kidney", label: "土剋水（甘味過剰）" },
  };

  const activeLine = keLines[selectedOrgan];
  const fromCoord = elementCoords[activeLine.from];
  const toCoord = elementCoords[activeLine.to];

  return (
    <div className="space-y-8">
      {/* 1. お悩みクイック選択カード */}
      <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
            <h3 className="text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              STEP 1: 今のあなたの体調・気になる不調を選択
            </h3>
          </div>
          <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
            当てはまるものを1つタップしてください
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {QUICK_COMPLAINTS.map((item) => {
            const isSelected = selectedOrgan === item.organKey;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedOrgan(item.organKey)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#FAF8F5] dark:bg-[#1E2B37] border-[#1E3D34] dark:border-[#74BA9E] shadow-sm ring-1 ring-[#1E3D34] dark:ring-[#74BA9E]"
                    : "bg-white dark:bg-[#121920] border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#C5DED4] dark:hover:border-[#385060]"
                }`}
              >
                <div>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded inline-block mb-1.5"
                    style={{
                      backgroundColor: PROHIBITION_DATA[item.organKey].bgLight,
                      color: PROHIBITION_DATA[item.organKey].elementColor,
                    }}
                  >
                    {item.badge}
                  </span>
                  <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                    {item.label}
                  </p>
                </div>
                <p className="text-[10px] text-[#737C77] dark:text-[#8899A6] mt-2 pt-2 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50 line-clamp-1">
                  {item.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* 五臓の直接タブ */}
        <div className="pt-2 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[#737C77] dark:text-[#8899A6] shrink-0">五臓で直接選ぶ：</span>
          {(Object.keys(PROHIBITION_DATA) as OrganKey[]).map((key) => {
            const organ = PROHIBITION_DATA[key];
            const isSelected = selectedOrgan === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedOrgan(key)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  isSelected
                    ? "bg-[#1E3D34] text-white shadow-sm"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#EBF3EF]"
                }`}
              >
                {organ.organName}（{organ.element}）
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 動的五行相剋サークル ＆ 相剋ブレーキ警報 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 左側：SVG五行相剋アニメーション (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924]" />
              <span>五行相剋ダイナミクス</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FEE2E2] text-[#DC2626] dark:bg-[#381615] dark:text-[#FCA5A5] animate-pulse">
              ⚠️ 相剋ブレーキ作動
            </span>
          </div>

          <div className="relative aspect-square max-w-[340px] mx-auto flex items-center justify-center">
            <svg viewBox="0 0 500 350" className="w-full h-full overflow-visible">
              <defs>
                {/* 警戒矢印マーカー */}
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#DC2626" />
                </marker>
                {/* グローフィルター */}
                <filter id="brakeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 相生の円環（薄いグレーの補助線） */}
              <polygon
                points="140,150 250,70 360,150 320,270 180,270"
                fill="none"
                stroke="#E5DEC9"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-50 dark:stroke-[#2A3B4A]"
              />

              {/* 通常の五行相剋線（五芒星の薄い線） */}
              <path
                d="M 140 150 L 360 150 L 180 270 L 250 70 L 320 270 Z"
                fill="none"
                stroke="#E5DEC9"
                strokeWidth="1"
                className="opacity-40 dark:stroke-[#2A3B4A]"
              />

              {/* 発動中の相剋ブレーキ矢印（赤く太くパルス） */}
              <line
                x1={fromCoord.x}
                y1={fromCoord.y}
                x2={toCoord.x}
                y2={toCoord.y}
                stroke="#DC2626"
                strokeWidth="4"
                strokeDasharray="6 4"
                markerEnd="url(#arrow)"
                filter="url(#brakeGlow)"
                className="animate-pulse"
              />

              {/* 相剋関係のラベル（矢印中央） */}
              <rect
                x={(fromCoord.x + toCoord.x) / 2 - 45}
                y={(fromCoord.y + toCoord.y) / 2 - 12}
                width="90"
                height="24"
                rx="6"
                fill="#FFFFFF"
                stroke="#DC2626"
                strokeWidth="1.5"
                className="dark:fill-[#121920]"
              />
              <text
                x={(fromCoord.x + toCoord.x) / 2}
                y={(fromCoord.y + toCoord.y) / 2 + 4}
                textAnchor="middle"
                className="text-[10px] font-bold fill-[#DC2626]"
              >
                {activeLine.label.split("（")[0]}
              </text>

              {/* 5つの五行ノード */}
              {(Object.keys(elementCoords) as OrganKey[]).map((key) => {
                const coord = elementCoords[key];
                const organ = PROHIBITION_DATA[key];
                const isSelected = selectedOrgan === key;
                const isBrakingSource = activeLine.from === key;

                return (
                  <g
                    key={key}
                    onClick={() => setSelectedOrgan(key)}
                    className="cursor-pointer group"
                  >
                    {/* 選択中の外側リング */}
                    {isSelected && (
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="34"
                        fill="none"
                        stroke={organ.elementColor}
                        strokeWidth="2"
                        className="animate-ping opacity-40"
                      />
                    )}

                    {/* 相剋元ノードの警告リング */}
                    {isBrakingSource && (
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="30"
                        fill="none"
                        stroke="#DC2626"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                        className="animate-spin"
                        style={{ transformOrigin: `${coord.x}px ${coord.y}px` }}
                      />
                    )}

                    {/* ノード本体 */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isSelected ? "26" : "22"}
                      fill={isSelected ? organ.elementColor : "#FAF8F5"}
                      stroke={isSelected ? "#FAF8F5" : organ.elementColor}
                      strokeWidth={isSelected ? "3" : "2"}
                      className="transition-all duration-300 group-hover:scale-110 shadow-sm"
                    />

                    {/* 文字 */}
                    <text
                      x={coord.x}
                      y={coord.y + 5}
                      textAnchor="middle"
                      className={`text-[14px] font-serif font-bold transition-all ${
                        isSelected ? "fill-white font-black" : "fill-[#232826] dark:fill-[#FAF8F5]"
                      }`}
                    >
                      {coord.kanji}
                    </text>

                    {/* 臓腑名 */}
                    <text
                      x={coord.x}
                      y={coord.y + 40}
                      textAnchor="middle"
                      className={`text-[11px] font-bold ${
                        isSelected
                          ? "fill-[#1E3D34] dark:fill-[#74BA9E]"
                          : "fill-[#737C77] dark:fill-[#8899A6]"
                      }`}
                    >
                      {organ.organName.split("（")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="text-[11px] text-center text-[#737C77] dark:text-[#8899A6] border-t border-[#E5DEC9] dark:border-[#2A3B4A] pt-3">
            💡 <strong>五行相剋（そうこく）とは：</strong> ある要素が別の要素を過剰に抑制・攻撃する力関係。
            弱っている臓腑（{data.organName.split("（")[0]}）に対し、相剋する味覚（{data.brakeTasteKanji}味）を摂るとダメージが倍化します。
          </div>
        </div>

        {/* 右側：「⚠️相剋ブレーキ」警告 ＆ メインパネル (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* メイン警告バナー */}
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border-2 border-[#DC2626] dark:border-[#991B1B] p-5 sm:p-6 shadow-md relative overflow-hidden">
            {/* 背景の警告斜線ウォーターマーク */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FEE2E2]/30 dark:bg-[#381615]/30 rounded-bl-full pointer-events-none" />

            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#DC2626]">
              <ShieldAlert className="w-5 h-5 animate-bounce shrink-0" />
              <span className="tracking-wider uppercase">Emergency Five-Flavor Brake</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#FCA5A5]/60 dark:border-[#7F1D1D]/60 pb-3">
              <div>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">弱っている臓腑：</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {data.organName}（{data.element}行）
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs font-bold text-[#DC2626] block">
                  ⚠️ 相剋ブレーキ発動中
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#DC2626]">
                  {data.brakeTaste} を厳重警戒！
                </span>
              </div>
            </div>

            {/* 古典原文 ＆ 理由 */}
            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-[#FEF2F2] dark:bg-[#201111] border border-[#FECACA] dark:border-[#4C1D1D] text-xs text-[#991B1B] dark:text-[#F87171] leading-relaxed">
                <strong>古典の警告：</strong> {data.classicQuote}
              </div>

              <p className="text-xs sm:text-sm text-[#404743] dark:text-[#D1D5DB] leading-relaxed">
                {data.brakeReason}
              </p>
            </div>

            {/* 控えるべき具体的食品バッジ */}
            <div className="mt-4 pt-3 border-t border-[#FCA5A5]/40 dark:border-[#7F1D1D]/40">
              <span className="text-xs font-bold text-[#991B1B] dark:text-[#F87171] block mb-2">
                🚫 今は控えるべき要注意食品・NG習慣：
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.avoidFoods.map((food, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-start gap-2 text-xs text-[#59615D] dark:text-[#A0B0BC]"
                  >
                    <span className="text-[#DC2626] font-bold">✕</span>
                    <span>{food}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. レスキュー食材 ＆ 実践薬膳タブパネル */}
      <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-8 shadow-sm space-y-6">
        {/* タブバー */}
        <div className="flex border-b border-[#E5DEC9] dark:border-[#2A3B4A] gap-3 sm:gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("brake")}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "brake"
                ? "border-[#1E3D34] dark:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E]"
                : "border-transparent text-[#737C77] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            ① 相剋ブレーキのメカニズム
          </button>
          <button
            onClick={() => setActiveTab("rescue")}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "rescue"
                ? "border-[#1E3D34] dark:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E]"
                : "border-transparent text-[#737C77] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            ② 補うべき「レスキュー食材リスト」
          </button>
          <button
            onClick={() => setActiveTab("convenience")}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "convenience"
                ? "border-[#1E3D34] dark:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E]"
                : "border-transparent text-[#737C77] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            ③ コンビニ・外食での手軽な選び方
          </button>
        </div>

        {/* タブ1: メカニズム */}
        {activeTab === "brake" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                【相剋の公式：{data.classicFormula}】
              </span>
              <h4 className="text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                なぜ{data.organName.split("（")[0]}が弱っている時に「{data.brakeTaste}」を摂ってはいけないのか？
              </h4>
              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                {data.brakeReason}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FEF2F2] dark:bg-[#201111] border border-[#FECACA] dark:border-[#4C1D1D]">
                <span className="text-xs font-bold text-[#DC2626] block mb-2">
                  ⚠️ 陥りがちなNG習慣
                </span>
                <ul className="space-y-1.5 text-xs text-[#7F1D1D] dark:text-[#FCA5A5]">
                  {data.avoidHabits.map((habit, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#DC2626]">•</span>
                      <span>{habit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#F0FDF4] dark:bg-[#0D2418] border border-[#BBF7D0] dark:border-[#1E4631]">
                <span className="text-xs font-bold text-[#166534] dark:text-[#86EFAC] block mb-2">
                  ✅ 代わりに優先すべき味覚
                </span>
                <p className="text-xs text-[#166534] dark:text-[#86EFAC] font-semibold mb-1">
                  {data.rescueTaste}
                </p>
                <p className="text-xs text-[#374151] dark:text-[#D1D5DB] leading-snug">
                  {data.rescuePrinciple}。相剋する味で攻撃するのではなく、弱っている臓腑を包み込むように養う味を選びましょう。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* タブ2: レスキュー食材リスト */}
        {activeTab === "rescue" && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {data.organName.split("（")[0]}を助けるレスキュー食材一覧
                </h4>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                  スーパーで手に入る身近な食材から、弱った{data.organName.split("（")[0]}を労る食材を集めました。
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-bold shrink-0">
                推奨：{data.rescueTaste}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {data.rescueCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2.5"
                >
                  <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] block border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-1.5">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="text-xs px-2 py-0.5 rounded bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5] font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-start gap-2.5 text-xs text-[#59615D] dark:text-[#A0B0BC]">
              <Lightbulb className="w-4 h-4 text-[#B86924] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#232826] dark:text-[#FAF8F5]">調理のポイント：</strong>{" "}
                {data.cookingTip}
              </div>
            </div>
          </div>
        )}

        {/* タブ3: コンビニ・外食 */}
        {activeTab === "convenience" && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <h4 className="text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                忙しい日の味方！コンビニや外食で迷ったらこれ
              </h4>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                自炊ができなくても大丈夫。コンビニの棚や定食屋で以下のメニューを優先して選びましょう。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.convenienceRescue.map((menu, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] block">
                      {menu}
                    </span>
                    <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                      相剋ブレーキを避け、{data.organName.split("（")[0]}を補う推奨メニュー
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. 今日食べた味覚チェッカー（セルフシミュレーション） */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-[#B86924]" />
            <h4 className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
              今日食べた・食べたい味覚の「逆算ブレーキ判定」
            </h4>
          </div>
          {todayTaste && (
            <button
              onClick={() => setTodayTaste(null)}
              className="text-xs text-[#737C77] hover:text-[#1E3D34] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>リセット</span>
            </button>
          )}
        </div>

        <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
          「今日、この味をたくさん食べた（食べたい）」という味覚をタップすると、負担がかかりやすい臓腑を逆算判定します。
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { key: "辛", name: "辛いもの（唐辛子・刺激物）", damageOrgan: "liver", organName: "肝" },
            { key: "鹹", name: "塩辛いもの（ラーメンスープ・塩分）", damageOrgan: "heart", organName: "心" },
            { key: "酸", name: "すっぱいもの（強酸・酢・柑橘）", damageOrgan: "spleen", organName: "脾" },
            { key: "苦", name: "苦いもの（コーヒーガブ飲み・焦げ）", damageOrgan: "lung", organName: "肺" },
            { key: "甘", name: "甘いもの（白砂糖・スイーツ・菓子パン）", damageOrgan: "kidney", organName: "腎" },
          ].map((t) => {
            const isSelected = todayTaste === t.key;
            return (
              <button
                key={t.key}
                onClick={() => {
                  setTodayTaste(t.key);
                  setSelectedOrgan(t.damageOrgan as OrganKey);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#DC2626] text-white border-[#DC2626] shadow-sm"
                    : "bg-white dark:bg-[#17212A] border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5] hover:border-[#DC2626]"
                }`}
              >
                <span>{t.key}：{t.name}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            );
          })}
        </div>

        {todayTaste && (
          <div className="mt-3 p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#DC2626] text-xs text-[#232826] dark:text-[#FAF8F5] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#DC2626]">⚠️ 判定結果：</span>
              <span>
                「{todayTaste}味」の摂りすぎは、五行相剋によって<strong>【{data.organName}】</strong>に最も大きな負担をかけます。上記の相剋ブレーキとレスキュー食材をぜひご活用ください！
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
