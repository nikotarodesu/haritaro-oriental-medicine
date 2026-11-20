"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

type Theme = "yang" | "yin"; // yang: 陽（ライト）, yin: 陰（ダーク）

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "yin" : "yang";
}

function serverTheme(): Theme {
  return "yang";
}

function setTheme(newTheme: Theme) {
  document.documentElement.classList.toggle("dark", newTheme === "yin");
  try {
    localStorage.setItem("haritaro-theme", newTheme);
  } catch {
    // The theme still applies when browser storage is unavailable.
  }
}

function toggleTheme() {
  setTheme(currentTheme() === "yang" ? "yin" : "yang");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, currentTheme, serverTheme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
