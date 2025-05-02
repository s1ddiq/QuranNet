"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ayahs = [
  "Indeed, with hardship will be ease.",
  "Indeed, Allah is with the patient.",
  "So remember Me; I will remember you.",
  "My success is only by Allah.",
  "Do not despair of the mercy of Allah.",
  "Indeed, my Lord is near and responsive.",
  "And Allah is the best of providers.",
  "And whatever good you do — Allah is All-Knowing of it.",
  "And Allah loves the patient.",
  "And Allah is Forgiving and Merciful.",
  "My mercy encompasses all things.",
  "We are closer to him than [his] jugular vein.",
  "And say, 'My Lord, increase me in knowledge.'",
  "And Allah is Knowing and Wise.",
  "Allah does not waste the reward of the doers of good.",
  "And rely upon Allah.",
  "Indeed, He is ever Merciful to you.",
  "Indeed, Allah loves those who rely [upon Him].",
  "What is with Allah is better.",
  "And He is over all things competent.",
];

export default function ScrollingAyah() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const iv = setInterval(() => {
      setActive((i) => (i + 1) % ayahs.length);
    }, 6_000);
    return () => clearInterval(iv);
  }, []);

  // When `active` changes, scroll the container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const child = container.children[active] as HTMLElement;
    if (!child) return;

    container.scrollTo({
      left: child.offsetLeft,
      behavior: "smooth",
    });
  }, [active]);

  const prev = () => setActive((i) => (i - 1 + ayahs.length) % ayahs.length);
  const next = () => setActive((i) => (i + 1) % ayahs.length);

  return (
    <div className="relative w-full">
      {/* Carousel viewport */}
      <div
        ref={containerRef}
        className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory"
      >
        {ayahs.map((ayah, idx) => (
          <div
            key={idx}
            className="
          flex-shrink-0 
          w-full 
          snap-center 
          p-4 
          text-center 
          text-xl sm:text-2xl
          dark:text-white 
          text-[var(--sephia-700)]
        "
          >
            “{ayah}”
          </div>
        ))}
      </div>

      {/* Prev/Next buttons */}
      {/* <button
        onClick={prev}
        className="
      absolute top-1/2 -translate-y-1/2 
      left-4
      p-3 
      bg-black text-white hover:bg-[rgba(0,0,0,0.8)] 
      dark:bg-white dark:text-black dark:hover:bg-[rgba(255,255,255,0.8)]
      rounded-full 
      shadow-lg
      z-10
    "
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        onClick={next}
        className="
      absolute top-1/2 -translate-y-1/2 
      right-4
      p-3 
      bg-black text-white hover:bg-[rgba(0,0,0,0.8)] 
      dark:bg-white dark:text-black dark:hover:bg-[rgba(255,255,255,0.8)]
      rounded-full 
      shadow-lg
      z-10
    "
      >
        <ChevronRight className="size-6" />
      </button> */}
    </div>
  );
}
