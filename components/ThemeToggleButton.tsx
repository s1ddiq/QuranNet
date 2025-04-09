'use client';

import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ThemeToggleButton({ classlist }: { classlist?: string }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn("px-4 py-2 bg-blue-500 text-white rounded z-999", classlist && `${classlist}`)}
    >
      Toggle Theme
    </button>
  );
}
