"use client";

import React from "react";
import Link from "next/link";
import { NearbyPoint } from "@/data/tsubo/types";
import { MapPin, ArrowRight } from "lucide-react";

interface LocalPointMapSvgProps {
  pointCode: string;
  pointName: string;
  nearbyPoints?: NearbyPoint[];
}

export default function LocalPointMapSvg({
  pointCode,
  pointName,
  nearbyPoints = [],
}: LocalPointMapSvgProps) {
  const codeLower = pointCode.toLowerCase();

  // 局所図のプリセットマップ
  if (codeLower === "li4") {
    return (
      <div className="bg-[#FAF8F5] dark:bg-[#10171F] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8DEC9] dark:border-[#22303D] pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
            <MapPin className="w-4 h-4" />
            <span>局所位置関係図（手背・第1第2中手骨間）</span>
          </div>
          <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] font-mono">
            右手の甲（背側視）
          </span>
        </div>

        <div className="relative flex justify-center items-center py-2">
          <svg viewBox="0 0 420 280" className="w-full max-w-[420px] h-auto select-none">
            {/* 手の輪郭・手背 */}
            <path
              d="M 60,260 C 50,180 30,120 70,80 C 100,50 140,80 150,130 C 180,60 210,40 240,60 C 260,80 250,140 270,140 C 290,70 320,60 340,80 C 350,100 340,160 360,160 C 380,100 400,100 410,130 C 420,190 380,260 340,270 Z"
              fill="#F7F1E6"
              stroke="#D6C8AF"
              strokeWidth="2.5"
            />
            {/* 第2中手骨の骨稜 */}
            <path
              d="M 240,150 L 290,240"
              stroke="#A59D8F"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="4 3"
            />
            <text x="305" y="220" className="text-[10px] font-sans fill-[#737C77] dark:fill-[#8899A6]">
              第2中手骨
            </text>

            {/* 第1中手骨 */}
            <path
              d="M 120,155 L 180,235"
              stroke="#C0B7A8"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="4 3"
            />
            <text x="110" y="210" className="text-[10px] font-sans fill-[#737C77] dark:fill-[#8899A6]">
              第1中手骨
            </text>

            {/* 三間 LI3 */}
            <g className="cursor-pointer">
              <circle cx="230" cy="140" r="6" fill="#FFFFFF" stroke="#1E3D34" strokeWidth="2.5" />
              <text x="215" y="132" textAnchor="end" className="text-[11px] font-bold fill-[#1E3D34] dark:fill-[#74BA9E]">
                三間 (LI3)
              </text>
            </g>

            {/* 断面解剖切断線 */}
            <line x1="160" y1="180" x2="330" y2="180" stroke="#B86924" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <text x="335" y="183" className="text-[9px] font-mono fill-[#B86924] dark:fill-[#E6C387]">
              切断高位
            </text>

            {/* 合谷 LI4（主標点） */}
            <g>
              <circle cx="250" cy="180" r="14" fill="#B86924" fillOpacity="0.2" className="animate-ping" />
              <circle cx="250" cy="180" r="9" fill="#B86924" stroke="#FAF8F5" strokeWidth="3" />
              <text x="268" y="185" className="text-xs font-bold fill-[#B86924] dark:fill-[#E6C387]">
                ★ 合谷 (LI4)
              </text>
            </g>

            {/* 陽渓 LI5 */}
            <g className="cursor-pointer">
              <circle cx="285" cy="245" r="6" fill="#FFFFFF" stroke="#1E3D34" strokeWidth="2.5" />
              <text x="270" y="260" textAnchor="end" className="text-[11px] font-bold fill-[#1E3D34] dark:fill-[#74BA9E]">
                陽渓 (LI5)
              </text>
            </g>
          </svg>
        </div>

        {/* 近隣経穴リンク */}
        <div className="pt-2 border-t border-[#E8DEC9] dark:border-[#22303D] space-y-2">
          <span className="text-xs font-semibold text-[#59615D] dark:text-[#A0B0BC] block">
            局所・同経の近隣経穴：
          </span>
          <div className="flex flex-wrap gap-2">
            {nearbyPoints.map((np) => (
              <Link
                key={np.code}
                href={`/tsubo/${np.code.toLowerCase()}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-[#16222C] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-xs font-medium text-[#232826] dark:text-[#E6EFEA] hover:text-[#1E3D34] transition-all"
              >
                <span className="font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E]">{np.code}</span>
                <span>{np.name}</span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">({np.relation})</span>
                <ArrowRight className="w-3 h-3 ml-0.5 text-[#737C77]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (codeLower === "pc6") {
    return (
      <div className="bg-[#FAF8F5] dark:bg-[#10171F] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8DEC9] dark:border-[#22303D] pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
            <MapPin className="w-4 h-4" />
            <span>局所位置関係図（前腕掌側遠位部）</span>
          </div>
          <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] font-mono">
            手関節掌側（前面視）
          </span>
        </div>

        <div className="relative flex justify-center items-center py-2">
          <svg viewBox="0 0 420 280" className="w-full max-w-[420px] h-auto select-none">
            {/* 前腕・手根部輪郭 */}
            <path
              d="M 120,20 L 120,220 C 120,250 140,270 210,270 C 280,270 300,250 300,220 L 300,20 Z"
              fill="#F7F1E6"
              stroke="#D6C8AF"
              strokeWidth="2.5"
            />
            {/* 手関節掌側横紋 */}
            <path d="M 130,220 Q 210,228 290,220" stroke="#737C77" strokeWidth="2" strokeDasharray="3 2" />
            <text x="305" y="224" className="text-[10px] font-sans fill-[#737C77] dark:fill-[#8899A6]">
              手関節掌側横紋
            </text>

            {/* 2寸基準線（断面高位） */}
            <line x1="120" y1="140" x2="300" y2="140" stroke="#B86924" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="65" y="144" className="text-[10px] font-bold fill-[#B86924]">
              上2寸（切断高位）
            </text>

            {/* 橈側手根屈筋腱 */}
            <line x1="180" y1="20" x2="180" y2="240" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
            <text x="145" y="60" className="text-[10px] font-sans fill-[#6D28D9] dark:fill-[#A78BFA]">
              橈側手根屈筋腱
            </text>

            {/* 長掌筋腱 */}
            <line x1="240" y1="20" x2="240" y2="240" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
            <text x="248" y="60" className="text-[10px] font-sans fill-[#6D28D9] dark:fill-[#A78BFA]">
              長掌筋腱
            </text>

            {/* 大陵 PC7 */}
            <g className="cursor-pointer">
              <circle cx="210" cy="222" r="6" fill="#FFFFFF" stroke="#1E3D34" strokeWidth="2.5" />
              <text x="210" y="242" textAnchor="middle" className="text-[11px] font-bold fill-[#1E3D34] dark:fill-[#74BA9E]">
                大陵 (PC7)
              </text>
            </g>

            {/* 内関 PC6（主標点） */}
            <g>
              <circle cx="210" cy="140" r="14" fill="#B86924" fillOpacity="0.2" className="animate-ping" />
              <circle cx="210" cy="140" r="9" fill="#B86924" stroke="#FAF8F5" strokeWidth="3" />
              <text x="228" y="144" className="text-xs font-bold fill-[#B86924] dark:fill-[#E6C387]">
                ★ 内関 (PC6)
              </text>
            </g>

            {/* 間使 PC5 */}
            <g className="cursor-pointer">
              <circle cx="210" cy="70" r="6" fill="#FFFFFF" stroke="#1E3D34" strokeWidth="2.5" />
              <text x="210" y="90" textAnchor="middle" className="text-[11px] font-bold fill-[#1E3D34] dark:fill-[#74BA9E]">
                間使 (PC5)
              </text>
            </g>
          </svg>
        </div>

        {/* 近隣経穴リンク */}
        <div className="pt-2 border-t border-[#E8DEC9] dark:border-[#22303D] space-y-2">
          <span className="text-xs font-semibold text-[#59615D] dark:text-[#A0B0BC] block">
            局所・同経の近隣経穴：
          </span>
          <div className="flex flex-wrap gap-2">
            {nearbyPoints.map((np) => (
              <Link
                key={np.code}
                href={`/tsubo/${np.code.toLowerCase()}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-[#16222C] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-xs font-medium text-[#232826] dark:text-[#E6EFEA] hover:text-[#1E3D34] transition-all"
              >
                <span className="font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E]">{np.code}</span>
                <span>{np.name}</span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">({np.relation})</span>
                <ArrowRight className="w-3 h-3 ml-0.5 text-[#737C77]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (codeLower === "st36") {
    return (
      <div className="bg-[#FAF8F5] dark:bg-[#10171F] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8DEC9] dark:border-[#22303D] pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
            <MapPin className="w-4 h-4" />
            <span>局所位置関係図（下腿前外側部・膝関節下）</span>
          </div>
          <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] font-mono">
            右膝〜すね（前面視）
          </span>
        </div>

        <div className="relative flex justify-center items-center py-2">
          <svg viewBox="0 0 420 280" className="w-full max-w-[420px] h-auto select-none">
            {/* 膝蓋骨 */}
            <ellipse cx="180" cy="40" rx="30" ry="24" fill="#E4DFD5" stroke="#7B776D" strokeWidth="2" />
            <text x="180" y="44" textAnchor="middle" className="text-[10px] font-sans fill-[#737C77]">
              膝蓋骨
            </text>

            {/* 膝蓋靭帯 */}
            <path d="M 170,64 L 170,105 L 190,105 L 190,64 Z" fill="#D6C8AF" />

            {/* 脛骨粗面 */}
            <ellipse cx="180" cy="115" rx="14" ry="10" fill="#C5BAA8" />
            <text x="140" y="118" textAnchor="end" className="text-[10px] font-sans fill-[#737C77]">
              脛骨粗面
            </text>

            {/* 脛骨前縁（すねの骨） */}
            <line x1="180" y1="125" x2="180" y2="260" stroke="#7B776D" strokeWidth="4" strokeLinecap="round" />
            <text x="140" y="210" textAnchor="end" className="text-[10px] font-sans fill-[#737C77]">
              脛骨前縁
            </text>

            {/* 犢鼻 ST35 */}
            <g className="cursor-pointer">
              <circle cx="215" cy="75" r="6" fill="#FFFFFF" stroke="#1E3D34" strokeWidth="2.5" />
              <text x="230" y="80" className="text-[11px] font-bold fill-[#1E3D34] dark:fill-[#74BA9E]">
                犢鼻 (ST35)
              </text>
            </g>

            {/* 3寸基準線（断面高位） */}
            <line x1="120" y1="165" x2="310" y2="165" stroke="#B86924" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="50" y="170" className="text-[10px] font-bold fill-[#B86924]">
              犢鼻下3寸（切断高位）
            </text>

            {/* 1横指幅ライン */}
            <line x1="215" y1="125" x2="215" y2="260" stroke="#C97A6E" strokeWidth="1" strokeDasharray="2 2" />

            {/* 足三里 ST36（主標点） */}
            <g>
              <circle cx="215" cy="165" r="14" fill="#B86924" fillOpacity="0.2" className="animate-ping" />
              <circle cx="215" cy="165" r="9" fill="#B86924" stroke="#FAF8F5" strokeWidth="3" />
              <text x="232" y="170" className="text-xs font-bold fill-[#B86924] dark:fill-[#E6C387]">
                ★ 足三里 (ST36)
              </text>
            </g>

            {/* 上巨虚 ST37 */}
            <g className="cursor-pointer">
              <circle cx="215" cy="245" r="6" fill="#FFFFFF" stroke="#1E3D34" strokeWidth="2.5" />
              <text x="230" y="250" className="text-[11px] font-bold fill-[#1E3D34] dark:fill-[#74BA9E]">
                上巨虚 (ST37)
              </text>
            </g>
          </svg>
        </div>

        {/* 近隣経穴リンク */}
        <div className="pt-2 border-t border-[#E8DEC9] dark:border-[#22303D] space-y-2">
          <span className="text-xs font-semibold text-[#59615D] dark:text-[#A0B0BC] block">
            局所・同経の近隣経穴：
          </span>
          <div className="flex flex-wrap gap-2">
            {nearbyPoints.map((np) => (
              <Link
                key={np.code}
                href={`/tsubo/${np.code.toLowerCase()}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-[#16222C] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-xs font-medium text-[#232826] dark:text-[#E6EFEA] hover:text-[#1E3D34] transition-all"
              >
                <span className="font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E]">{np.code}</span>
                <span>{np.name}</span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">({np.relation})</span>
                <ArrowRight className="w-3 h-3 ml-0.5 text-[#737C77]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 汎用局所マップフォールバック
  return (
    <div className="bg-[#FAF8F5] dark:bg-[#10171F] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-4 sm:p-5 text-center text-xs text-[#737C77] dark:text-[#8899A6]">
      <MapPin className="w-5 h-5 mx-auto mb-1 text-[#1E3D34] dark:text-[#74BA9E]" />
      <p className="font-bold text-[#232826] dark:text-[#FAF8F5]">
        {pointName}（{pointCode}）
      </p>
      <p className="text-[11px] mt-1">標準取穴位置に基づく局所解剖情報</p>
    </div>
  );
}
