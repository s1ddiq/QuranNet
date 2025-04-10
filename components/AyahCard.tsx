"use client";
import React, { useState } from "react";
import { fetchAyahAudio } from "@/api/api";
import HighlighterPen from "./svg/HighlighterPenIcon";
import PlayIcon from "./svg/PlayIcon";
import DocumentIcon from "./svg/DocumentIcon";

const AyahCard = ({ surah, ayah, params, translatedAyahs }: AyahCardProps) => {
  // Find the translation for this ayah based on its number in the surah.
  const translation = translatedAyahs?.find(
    (t: EnglishAyah) => t.numberInSurah === ayah.numberInSurah
  );
  
  const [clickable, setClickable] = useState(true);
  const [highlighted, setHighlighted] = useState(false);
  
  const handleFetchAudio = async () => {
    if (!clickable) return;
    
    const response = await fetchAyahAudio(surah.number, ayah.numberInSurah);
    // console.log(response);
    if (response && response.data.audio) {
      const audio = new Audio(response.data.audio);
      audio.play();
      audio.addEventListener("ended", handleAudioEnd);
      setClickable(false);
    } else {
    }
  };
  
  const handleAudioEnd = () => {
    setClickable(true);
  };
  
  const handleHighlightAyah = async () => {
    const e = document.getElementById(`ayah-${ayah.numberInSurah}`);
    const f = ["dark:bg-[#1c1c1cff]","bg-gray-200", "border-l-4", "dark:border-l-white", "border-l-gray-400"]
    // turn into globals.css just class for all these
    if (highlighted) {
      //   @apply dark:bg-[#1c1c1cff] bg-gray-200 border-l-4 dark:border-l-white border-l-gray-400;
      e?.classList.remove(...f);
      setHighlighted(false);
    } else {
      e?.classList.add(...f);
      setHighlighted(true);
    }
  };

  return (
    <div
      key={ayah.number}
      className="border-b border-px dark:border-[#262629ff] border-gray-400 p-4 md:p-8 flex flex-col sm:flex-row justify-between gap-12 transition-all duration-300"
      id={`ayah-${ayah.numberInSurah}`}
    >
      <div className="h-full flex flex-row sm:order-1 order-2 sm:flex-col gap-3 sm:justify-center justify-end">
        <p className="text-lg font-light text-gray-600 dark:text-gray-400 ">
          {params.surah}:{ayah.numberInSurah}
        </p>

        <HighlighterPen onClick={() => handleHighlightAyah()} />
        <DocumentIcon />

        <PlayIcon onClick={() => handleFetchAudio()} />
      </div>

      <div className="text-right sm:order-2 order-1 flex flex-col w-full">
        <p
          className="md:text-3xl lg:text-4xl text-xl font-light tracking-wider arabic-text 
          sm:pr-8 md:pr-16 lg:pr-26 md:leading-[2] leading-[2.25] hover:opacity-65 cursor-pointer"
          onClick={() => handleFetchAudio()}
        >
          {ayah.text.startsWith("بِسۡمِ")
            ? ayah.text.replace("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", "")
            : ayah.text}
        </p>
        <div>
          <p className="dark:text-gray-400 text-gray-600 md:text-lg md:leading-[1.2] leading-[1.5] text-base md:ml-8 text-left pt-6 lg:w-1/2 md:w-4/6">
            {translation?.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AyahCard;
