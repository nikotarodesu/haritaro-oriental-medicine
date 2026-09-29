"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  X, 
  MapPin, 
  Sparkles, 
  AlertTriangle, 
  ExternalLink, 
  Layers, 
  ShieldAlert, 
  Compass,
  ArrowRight
} from "lucide-react";
import { 
  ACUPOINTS_MASTER, 
  getAcupointByCode, 
  getAcupointDetail, 
  isChestBackPneumothoraxRisk, 
  isPregnancyContraindicated 
} from "@/data/tsubo";
import ClipButton from "@/components/ClipButton";

interface AcupointQuickModalProps {
  acupointIdentifier: string | null; // 名前 (例: "合谷") または コード (例: "LI4", "li4")
  onClose: () => void;
}

export default function AcupointQuickModal({
  acupointIdentifier,
  onClose,
}: AcupointQuickModalProps) {
  // 対象の経穴を検索
  const point = useMemo(() => {
    if (!acupointIdentifier) return null;
    const clean = acupointIdentifier.trim().toLowerCase();

    // 1. コードで直接検索
    const byCode = getAcupointByCode(clean);
    if (byCode) return getAcupointDetail(byCode.codeLower) || byCode;

    // 2. 漢字名で検索
    const byName = ACUPOINTS_MASTER.find(
      (p) => p.name === acupointIdentifier.trim() || p.kana === acupointIdentifier.trim()
    );
    if (byName) return getAcupointDetail(byName.codeLower) || byName;

    return null;
  }, [acupointIdentifier]);

  // Esc キーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (acupointIdentifier) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [acupointIdentifier, onClose]);

  if (!acupointIdentifier || !point) return null;

  const isPneumoRisk = isChestBackPneumothoraxRisk(point.codeLower);
  const isPregnancyRisk = isPregnancyContraindicated(point.codeLower);

  const getMeridianElement = (meridian: string): ("木" | "火" | "土" | "金" | "水")[] => {
    if (meridian.includes("肝") || meridian.includes("胆")) return ["木"];
    if (meridian.includes("心") || meridian.includes("小腸") || meridian.includes("三焦")) return ["火"];
    if (meridian.includes("脾") || meridian.includes("胃")) return ["土"];
    if (meridian.includes("肺") || meridian.includes("大腸")) return ["金"];
    if (meridian.includes("腎") || meridian.includes("膀胱")) return ["水"];
    return [];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* 背景オーバーレイ */}
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* モーダル本体 */}
      <div className="relative w-full max-w-lg bg-[#FAF8F5] dark:bg-[#15202B] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]">
        {/* モーダルヘッダー */}
        <div className="px-5 py-4 bg-white dark:bg-[#1A2633] border-b border-[#E8E1D1] dark:border-[#22303D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md font-mono text-xs font-bold bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#1E3D34] dark:text-[#74BA9E]">
              {point.code}
            </span>
            <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
              {point.meridian}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ClipButton
              item={{
                id: `tsubo-${point.id}`,
                type: "tsubo",
                title: `${point.name}（${point.code}）`,
                subTitle: `${point.meridian} | ${point.bodyPart}`,
                points: [point.name],
                elements: getMeridianElement(point.meridian),
                indications: point.indications,
                summary: point.locationSimple,
                caution: point.caution,
              }}
              size="sm"
            />
            <button
              onClick={onClose}
              aria-label="閉じる"
              className="p-1.5 rounded-lg text-[#737C77] hover:text-[#232826] dark:text-[#8899A6] dark:hover:text-[#FAF8F5] hover:bg-[#EAE3D4]/50 dark:hover:bg-[#22303D] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* モーダルコンテンツ（スクロール可能） */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          {/* 名前・よみ・要穴バッジ */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                {point.name}
              </h3>
              <span className="text-sm text-[#737C77] dark:text-[#8899A6]">
                （{point.kana}）
              </span>
            </div>

            {/* カテゴリ・要穴タグ */}
            {point.categories && point.categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {point.categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#FAF0E6] text-[#B86924] dark:bg-[#2A2016] dark:text-[#E6C387] border border-[#F0D5BA] dark:border-[#4A3828]"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 取穴部位 */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2633] border border-[#E8E1D1] dark:border-[#263747] space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <MapPin className="w-3.5 h-3.5" />
              <span>WHO標準取穴部位</span>
            </div>
            <p className="text-xs sm:text-sm text-[#232826] dark:text-[#E6EFEA] leading-relaxed">
              {point.locationSimple}
            </p>
          </div>

          {/* リスク警告（気胸・妊婦禁忌など） */}
          {(isPneumoRisk || isPregnancyRisk) && (
            <div className="p-3 rounded-xl bg-[#FDEDEC] dark:bg-[#2A1816] border border-[#FADBD8] dark:border-[#4A2220] text-[#A83629] dark:text-[#E68A80] text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>刺鍼上の重要注意点</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 pl-1 text-[11px]">
                {isPneumoRisk && <li>深刺・直刺による気胸リスク部位です。斜刺・横刺で安全深度を遵守。</li>}
                {isPregnancyRisk && <li>強い子宮収縮を促す恐れがあるため妊婦への強刺激は禁忌・慎重を要します。</li>}
              </ul>
            </div>
          )}

          {/* 主治・効能 */}
          {point.indications && point.indications.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#737C77] dark:text-[#8899A6] block">
                代表的な主治・適応症：
              </span>
              <div className="flex flex-wrap gap-1.5">
                {point.indications.slice(0, 6).map((ind, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] text-[11px] text-[#232826] dark:text-[#E6EFEA]"
                  >
                    {ind}
                  </span>
                ))}
                {point.indications.length > 6 && (
                  <span className="text-[11px] text-[#737C77] self-center">
                    ほか全{point.indications.length}種
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* モーダルフッター：詳細ページへの直通リンク */}
        <div className="p-4 bg-white dark:bg-[#1A2633] border-t border-[#E8E1D1] dark:border-[#22303D] flex items-center justify-between gap-3">
          <Link
            href={`/simulator?fromTsubo=${point.code}&tsuboName=${encodeURIComponent(point.name)}`}
            onClick={onClose}
            className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>弁証推論で開く</span>
          </Link>

          <Link
            href={`/tsubo/${point.codeLower}`}
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-[#FAF8F5] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>解剖断面・全詳細を見る</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
