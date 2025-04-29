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
    className={`flex-center navigator-styles dark:bg-zinc-800 bg-[var(--sephia-200)] ${
      direction === "Previous"
        ? "rounded-l-xl hover:-translate-x-2"
        : "rounded-r-xl hover:translate-x-2"
    }`}
  >
    {direction} Surah
  </Link>
);

export default NavigatorButton;
