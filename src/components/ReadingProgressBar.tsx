"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollableHeight = documentHeight - windowHeight;

      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }

      const currentProgress = Math.min(
        100,
        Math.max(0, (scrollY / scrollableHeight) * 100)
      );
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-transparent pointer-events-none">
      {/* 翡翠色〜藍色のグラデーションバー */}
      <div
        className="h-full bg-gradient-to-r from-[#1E3D34] via-[#2B6958] to-[#1E2D3D] 
                   dark:from-[#4E8C76] dark:via-[#427A67] dark:to-[#4A6882] 
                   shadow-[0_0_4px_rgba(30,61,52,0.3)] dark:shadow-none
                   transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
