"use client";
import React from "react";
import Image from "next/image";

const AyahCard = ({ ayah, params, translatedAyahs }: AyahCardProps) => {
  // Find the translation for this ayah based on its number in the surah.
  const translation = translatedAyahs?.find(
    (t: EnglishAyah) => t.numberInSurah === ayah.numberInSurah
  );

  return (
    <div
      key={ayah.number}
      className="border-b border-px border-[#262629ff] p-4 md:p-8 flex flex-col sm:flex-row justify-between gap-12"
      id={`ayah-${ayah.numberInSurah}`}
    >
      <div className="h-full flex flex-row sm:order-1 order-2 sm:flex-col gap-3 sm:justify-center justify-end">
        <p className="text-lg font-light ">
          {params.surah}:{ayah.numberInSurah}
        </p>
        <Image
          src="/svg/document.svg"
          alt="Document Icon"
          width={22}
          height={16}
          className="cursor-pointer"
        />
        <Image
          src="/svg/play.svg"
          alt="Play Icon"
          width={22}
          height={16}
          className="cursor-pointer"
        />
      </div>

      <div className="text-right sm:order-2 order-1 flex flex-col w-full">
        <p
          className="md:text-3xl text-2xl font-light tracking-wider arabic-text 
          sm:pr-8 md:pr-16 lg:pr-26 md:leading-[2] leading-[2.25]"
        >
          {ayah.text.startsWith("بِسۡمِ")
            ? ayah.text.replace(
                "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ",
                ""
              )
            : ayah.text}
        </p>
        <div>
          <p className="text-gray-400 text-lg md:ml-8 text-left">
            {translation?.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AyahCard;
