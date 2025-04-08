import useSurahNavigation from "@/hooks/useSurahNavigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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

  const handleNavigateToSurah = async ({
    surah,
    number,
  }: SurahNavigationProps) => {
    const surahNumber = surahNavigation.getSurahNumber(surah);
    if (surahNumber) {
      surahNavigation.goToSurah(surah); // Update the state
      console.log(`Navigating to Surah ${surah}, Verse ${number}`);
      router.push(`/surah/${surahNumber}?ayah=${number}`); // Navigate to the new URL
    } else {
      console.log(`Surah wasn't found!`);
    }
  };

  if (type === "desktop") {
    return (
      <div
        key={`${result.number}-${index}`}
        className="text-white w-11/12 bg-transparent border rounded-xl border-[#262629ff] p-4 flex-col justify-between text-base cursor-pointer"
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
        className="w-full bg-transparent border rounded-xl border-[#262629ff] p-4 flex flex-row justify-between scroll-snap-align-center"
        onClick={() => {setIsOpen?.(!isOpen); handleNavigateToSurah({ surah: result.surah.englishName, number: result.numberInSurah })}}
      >
        <p className=" text-base">{result.text}</p>
      </div>
    );
  }
};

export default SearchResultCard;
