"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  MapPin, 
  Search, 
  Award, 
  FileText 
} from "lucide-react";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { clipCount } = useClinicalMemo();

  const handleOpenSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    // 1. カスタムイベント発火
    window.dispatchEvent(new CustomEvent("haritaro:open-search"));
    // 2. Cmd+K / Ctrl+K キーボードイベントをシミュレート
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        ctrlKey: true,
        bubbles: true,
      })
    );
  };

  const navItems = [
    {
      label: "ホーム",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "経穴",
      href: "/tsubo",
      icon: MapPin,
      isActive: pathname.startsWith("/tsubo"),
    },
    {
      label: "検索",
      href: "#search",
      icon: Search,
      isAction: true,
      onClick: handleOpenSearch,
      isActive: false,
    },
    {
      label: "国試",
      href: "/kokushi",
      icon: Award,
      isActive: pathname.startsWith("/kokushi"),
    },
    {
      label: "ノート",
      href: "/notes",
      icon: FileText,
      badge: clipCount > 0 ? clipCount : undefined,
      isActive: pathname.startsWith("/notes") || pathname.startsWith("/mynote"),
    },
  ];

  return (
    <nav
      aria-label="モバイル下部ナビゲーション"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#10161C]/95 backdrop-blur-md border-t border-[#E8E1D1] dark:border-[#22303D] lg:hidden print:hidden transition-all duration-300"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center justify-around h-15 px-1 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isAction) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className="flex-1 flex flex-col items-center justify-center py-1 text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] active:scale-95 transition-all cursor-pointer relative"
              >
                <div className="w-8 h-8 rounded-full bg-[#EBF3EF] dark:bg-[#182823] flex items-center justify-center text-[#1E3D34] dark:text-[#74BA9E] shadow-2xs">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold mt-0.5 tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 relative ${
                item.isActive
                  ? "text-[#1E3D34] dark:text-[#74BA9E] font-bold"
                  : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5]"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.isActive ? "stroke-[2.5]" : "stroke-2"}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#B86924] text-white shadow-xs animate-in zoom-in">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
