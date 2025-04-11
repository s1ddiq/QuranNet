'use client';

import { EclipseIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(true); // default to true for dark theme

  useEffect(() => {
    // On initial load, add the 'dark' class to the HTML root element
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newDarkState = !isDark;
    setIsDark(newDarkState);
  };

  return (
    <div
      onClick={toggleTheme}
      className="text-3xl dark:bg-[#08080aff] bg-white rounded-full 
        flex justify-center items-center border-px dark:border-white border-gray-400
        cursor-pointer transition-all duration-300 hover:-translate-y-2 z-[999]"
    >
      <p className="pointer-events-none dark:text-white text-black">
        <EclipseIcon size={32} />
      </p>
    </div>
  );
}
