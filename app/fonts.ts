import { Amiri, Amiri_Quran, Inter } from "next/font/google";

export const amiri = Amiri({
  weight: "400",
  subsets: ["arabic"],
});

export const amiriquran = Amiri_Quran({
  weight: "400",
  subsets: ["arabic"],
});
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Optional: if you're using CSS variables
  display: "swap", // Optional: for better performance
});
