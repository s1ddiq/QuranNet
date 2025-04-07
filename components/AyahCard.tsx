import React from "react";
import Image from "next/image";

const AyahCard = ({ ayah, params }: AyahCardProps) => {
  return (
    <div
      key={ayah.number}
      className="border-b border-px border-[#262629ff] p-4 md:p-8 flex flex-col sm:flex-row justify-between gap-12"
      id={`ayah-${ayah.numberInSurah}`}
    >
      {/* Possibly add it back to the side (icons) on mobile. IF IT CAN FIT. */}
      <div className=" h-full flex flex-row sm:order-1 order-2 sm:flex-col gap-3 sm:justify-center justify-end">
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

        {/* TODO: Make dynamic components */}
        <Image
          src="/svg/play.svg"
          alt="Play Icon"
          width={22}
          height={16}
          className="cursor-pointer"
        />
      </div>

      <div className=" text-right sm:order-2 order-1">
        {/* <p className="text-sm opacity-60 inline">{ayah.number}</p> */}
        <p className="md:text-4xl text-2xl font-light tracking-wider arabic-text sm:pr-8 md:pr-16 lg:pr-26 md:leading-[2] leading-[2.25]">
          {/* TODO: Rewrite using cn() util function to change font-size based on character count. */}
          {ayah.text.startsWith("بِسۡمِ")
            ? ayah.text.replace("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", "")
            : ayah.text}
        </p>
      </div>
    </div>
  );
};

export default AyahCard;
