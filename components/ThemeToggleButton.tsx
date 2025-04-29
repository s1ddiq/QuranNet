"use client";

import { EclipseIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false); // default to true for dark theme

  useEffect(() => {
    // On initial load, add the 'dark' class to the HTML root element
    if (!isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newDarkState = !isDark;
    setIsDark(newDarkState);
  };

  return (
<div
  onClick={toggleTheme}
  className="group flex flex-col items-center gap-2 cursor-pointer select-none"
>
  <div
    className="rounded-full border border-gray-300 dark:border-zinc-700 w-14 h-14 flex items-center justify-center 
      bg-white dark:bg-[#0a0a0c] shadow-md group-hover:shadow-lg active:scale-95 transition-all duration-300"
  >
    <EclipseIcon size={24} className="text-[var(--sephia-700)] dark:text-white transition-colors duration-300" />
  </div>
  <span className="text-sm font-medium dark:text-white text-[var(--sephia-700)] transition-colors duration-300">
    {isDark ? "Dark" : "Sepia"}
  </span>
</div>

  );
}
