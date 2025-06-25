import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavigatorButton = ({
  direction,
  surahNumber,
}: {
  direction: "Previous" | "Next";
  surahNumber: number;
}) => (
  <Link
    href={`${surahNumber}`}
    className={`
      flex items-center gap-2 px-5 py-2 transition
      shadow-md rounded-md text-sm
      bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
      hover:bg-zinc-100 dark:hover:bg-zinc-700
      ${direction === "Previous" ? "justify-start" : "justify-end"}
    `}
  >
    {direction === "Previous" && (
      <ArrowLeftIcon className="w-5 h-5 text-zinc-500" />
    )}
    <span className="text-zinc-800 dark:text-white">{direction} Surah</span>
    {direction === "Next" && (
      <ArrowRightIcon className="w-5 h-5 text-zinc-500" />
    )}
  </Link>
);

export default NavigatorButton;
