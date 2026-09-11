"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type FontSize = "normal" | "large" | "xlarge";

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  cycleFontSize: () => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>("normal");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("haritaro-font-size") as FontSize | null;
      if (saved === "normal" || saved === "large" || saved === "xlarge") {
        setFontSizeState(saved);
        document.documentElement.setAttribute("data-font-size", saved);
      } else {
        document.documentElement.setAttribute("data-font-size", "normal");
      }
    } catch (e) {
      // localStorageアクセス不可時のフォールバック
    }
  }, []);

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    try {
      localStorage.setItem("haritaro-font-size", size);
      document.documentElement.setAttribute("data-font-size", size);
    } catch (e) {}
  };

  const cycleFontSize = () => {
    const order: FontSize[] = ["normal", "large", "xlarge"];
    const nextIndex = (order.indexOf(fontSize) + 1) % order.length;
    setFontSize(order[nextIndex]);
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize, cycleFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }
  return context;
}
