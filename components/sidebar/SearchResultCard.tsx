"use client";
import useSurahNavigation from "@/hooks/useSurahNavigation";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SearchResultCard = ({
  result,
  searchQuery,
  type,
  index,
  setIsOpen,
  isOpen,
}: SearchResultCardProps) => {
  const surahNavigation = useSurahNavigation();
  const router = useRouter();
  const currentSurah = usePathname();
  const surahNumber = surahNavigation.getSurahNumber(result.surah.englishName);
  const isOnSurah = currentSurah.includes(String(surahNumber)); // checks if pathname includes the number of the surah currently. could be buggy if the ayah param also includes that number

  const handleNavigateToSurah = async ({
    surah,
    number,
  }: SurahNavigationProps) => {
    if (surahNumber) {
      surahNavigation.goToSurah(surah); // Update the state
      if (isOnSurah) {
        router.replace(`?ayah=${number}`, {scroll: false});
      } else {
        router.push(`/surah/${surahNumber}?ayah=${number}`); // Navigate to the new URL
      }
    } else {
      console.log(`Surah wasn't found!`);
    }

    return () => {};
  };

  if (type === "desktop") {
    return (
      <div
        key={`${result.number}-${index}`}
        className="dark:text-white text-black w-11/12 bg-transparent border rounded-xl dark:border-[#262629ff] border-gray-400 p-4 flex-col justify-between text-base cursor-pointer"
        onClick={() =>
          handleNavigateToSurah({
            surah: result.surah.englishName,
            number: result.numberInSurah,
          })
        }
      >
        <p>{result.text}</p>
        <div className="flex-rowe pt-4 justify-between text-gray-400">
          <p>
            {result.surah.number}:{result.numberInSurah}
          </p>
          <p>{result.surah.englishName}</p>
        </div>
      </div>
    );
  } else if (type === "mobile") {
    return (
      <div
        key={`${result.number}-${index}`}
        className="w-full bg-transparent border rounded-xl border-[#262629ff] p-4 flex flex-col justify-between scroll-snap-align-center"
        onClick={() => {
          setIsOpen?.(!isOpen);
          handleNavigateToSurah({
            surah: String(surahNumber),
            number: result.numberInSurah,
          });
        }}
      >
        <p className=" text-base">{result.text}</p>
        <div className="flex-rowe pt-4 justify-between text-gray-400">
          <p>
            {result.surah.number}:{result.numberInSurah}
          </p>
          <p>{result.surah.englishName}</p>
        </div>
      </div>
    );
  }
};

export default SearchResultCard;
