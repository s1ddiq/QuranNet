'use client';

import { EclipseIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false); // default false, will update on mount

  useEffect(() => {
    const isDarkActive = document.documentElement.classList.contains("dark");
    setIsDark(isDarkActive);
  }, []);

  const toggleTheme = () => {
    const newDarkState = !isDark;
    setIsDark(newDarkState);
    if (newDarkState) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 text-3xl dark:bg-[#08080aff] bg-white rounded-full 
        flex justify-center items-center border-px dark:border-white border-gray-400
        cursor-pointer transition-all duration-300 hover:-translate-y-2 z-[999]"
    >
      <p className="pointer-events-none dark:text-white text-black">
        <EclipseIcon size={48} />
      </p>
    </div>
  );
}
