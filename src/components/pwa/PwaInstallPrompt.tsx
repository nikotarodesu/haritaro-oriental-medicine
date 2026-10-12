"use client";

import { useEffect, useRef, useState } from "react";
import { Download, X } from "lucide-react";
import { useModalDialog } from "@/hooks/useModalDialog";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<InstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [message, setMessage] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalDialog(showPrompt, dialogRef, () => setShowPrompt(false));

  useEffect(() => {
    const capturePrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as InstallPromptEvent);
    };
    const openInstructions = () => {
      const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
      setIsInstalled(window.matchMedia("(display-mode: standalone)").matches || navigatorWithStandalone.standalone === true);
      setIsIos(/iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
      setMessage("");
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", capturePrompt);
    window.addEventListener("haritaro:install-app", openInstructions);
    return () => {
      window.removeEventListener("beforeinstallprompt", capturePrompt);
      window.removeEventListener("haritaro:install-app", openInstructions);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt || installing) return;
    setInstalling(true);
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setShowPrompt(false);
      else setMessage("追加を取り消しました。ブラウザーのメニューからも追加できます。");
      setDeferredPrompt(null);
    } catch {
      setMessage("ブラウザーのメニューから「ホーム画面に追加」または「アプリをインストール」を選んでください。");
    } finally {
      setInstalling(false);
    }
  };
  if (!showPrompt) return null;

  return <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4" onClick={event => { if (event.target === event.currentTarget) setShowPrompt(false); }}>
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="install-title" tabIndex={-1} className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md space-y-5 overflow-y-auto rounded-2xl bg-[#FAF8F5] p-6 dark:bg-[#152029]">
      <button type="button" onClick={() => setShowPrompt(false)} aria-label="閉じる" data-modal-autofocus className="absolute right-2 top-2 flex min-h-11 min-w-11 items-center justify-center rounded-lg focus-visible:outline-2"><X aria-hidden="true" className="h-5 w-5" /></button>
      <h2 id="install-title" className="pr-8 text-lg font-bold">ホーム画面に追加</h2>
      <p className="text-sm leading-7">{isInstalled ? "すでにアプリとして開いています。" : isIos ? "Safariの共有メニューから「ホーム画面に追加」を選んでください。" : deferredPrompt ? "ホーム画面に追加すると、アイコンからはり太郎を開けます。" : "ブラウザーのメニューから「ホーム画面に追加」または「アプリをインストール」を選んでください。対応する項目がない場合は、ブックマークをご利用ください。"}</p>
      {message ? <p role="status" className="text-sm leading-7">{message}</p> : null}
      {!isInstalled && deferredPrompt ? <button type="button" onClick={install} disabled={installing} className="ui-button ui-button-primary"><Download aria-hidden="true" className="h-4 w-4" />{installing ? "確認中…" : "追加する"}</button> : null}
    </div>
  </div>;
}
