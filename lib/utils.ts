import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertNumberToArabicNumeral(number: number) {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return number
    .toString()
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit)])
    .join("");
}

export const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

export function normalizeArabic(text: string) {
  return text
    .replace(/[\u064B-\u0652\u0670\u06D6-\u06ED]/g, "") // remove tashkeel
    .replace(/[\u200F\u200E\u06DD]/g, "") // remove markers
    .replace(/\s+/g, "") // remove whitespace
    .trim();
}

export const unlockAudio = () => {
  document
    .getElementById("ayah-1")
    ?.scrollIntoView({ block: "center", behavior: "smooth" });
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const buffer = ctx.createBuffer(1, 1, 22050);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);
};
