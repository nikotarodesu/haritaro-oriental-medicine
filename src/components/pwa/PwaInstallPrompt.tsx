"use client";

import React, { useState, useEffect } from "react";
import { Download, X, Share } from "lucide-react";

const PROMPT_DISMISSED_KEY = "haritaro_pwa_dismissed_until";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // すでに非表示設定（7日間）されているかチェック
    try {
      const dismissedUntil = localStorage.getItem(PROMPT_DISMISSED_KEY);
      if (dismissedUntil && Number(dismissedUntil) > Date.now()) {
        return;
      }
    } catch {
      // ignore
    }

    // すでにスタンドアロン（PWAインストール済み）で起動しているかチェック
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone;
    if (isStandalone) return;

    // iOS判定
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Chrome / Edge / Android用 beforeinstallprompt イベント
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // 初回訪問から少し待って表示
      const timer = setTimeout(() => setShowPrompt(true), 4000);
      return () => clearTimeout(timer);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // iOSの場合はSafariであれば少し経ってから案内表示
    if (isIosDevice && !window.location.search.includes("embedded")) {
      const timer = setTimeout(() => setShowPrompt(true), 5000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    try {
      // 7日間非表示
      localStorage.setItem(
        PROMPT_DISMISSED_KEY,
        String(Date.now() + 7 * 24 * 60 * 60 * 1000)
      );
    } catch {
      // ignore
    }
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <aside
      aria-label="アプリインストール案内"
      className="fixed bottom-16 sm:bottom-4 left-3 right-3 sm:left-auto sm:right-4 z-40 max-w-sm bg-[#FAF8F5] dark:bg-[#151D24] border border-[#E8E1D1] dark:border-[#22303D] rounded-2xl shadow-xl p-3.5 print:hidden animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-start gap-2.5">
          <img
            src="/icon.png"
            alt="はり太郎"
            className="w-10 h-10 rounded-xl shadow-xs border border-[#D5CCBC] dark:border-[#2A3B4A] shrink-0"
          />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
              はり太郎をホーム画面に追加
            </h4>
            <p className="text-[11px] text-[#59615D] dark:text-[#8899A6] leading-relaxed">
              {isIos ? (
                <span>
                  画面下の <Share className="w-3 h-3 inline mx-0.5 text-[#1E3D34] dark:text-[#74BA9E]" /> を押し、<strong>「ホーム画面に追加」</strong>でアプリのように快適に使えます。
                </span>
              ) : (
                <span>オフライン対応＆全画面でアプリのように素早く開けます。</span>
              )}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 text-[#737C77] dark:text-[#8899A6] hover:bg-[#EAE4D3] dark:hover:bg-[#22303D] rounded-md transition-colors cursor-pointer shrink-0"
          aria-label="閉じる"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {!isIos && deferredPrompt && (
        <div className="mt-2.5 pt-2 border-t border-[#E8E1D1] dark:border-[#22303D] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleDismiss}
            className="px-2.5 py-1 text-xs text-[#59615D] dark:text-[#8899A6] hover:underline cursor-pointer"
          >
            後で
          </button>
          <button
            type="button"
            onClick={handleInstallClick}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1E3D34] dark:bg-[#74BA9E] text-white dark:text-[#10161C] rounded-lg font-bold text-xs shadow-2xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>追加する</span>
          </button>
        </div>
      )}
    </aside>
  );
}
