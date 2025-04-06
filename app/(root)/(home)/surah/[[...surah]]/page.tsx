"use client";
import { fetchAllSurahs, fetchSurahById } from "@/api/api";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";

const Surah = () => {
  const [surah, setSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();

  useEffect(() => {
    const func = async () => {
      const response = await fetchSurahById(Number(params.surah));
      setSurah(response.data);
      setAyahs(response.data.ayahs || []);
    };
    func();
  }, []);

  {
    /* TODO: Fix calling the fetchSurahById twice */
  }

  return (
    <section className="w-full flex items-center flex-col bg-[#08080aff] flex-1 pt-8">
      {/* <Progress value={progress} className="fixed top-4 bg-white" /> */}

      <div className="my-16">
        <h1 className="text-6xl font-bold text-center text-white">
          {/* {params.surah} */}
          {/* {surah?.englishName} */}
        </h1>
        {/* <p className="text-xl opacity-60 text-white text-center">
          "{surah?.englishNameTranslation}"
          </p> */}
      </div>
      <div className="flex flex-col w-full gap-16">
          <p className="arabic-text text-5xl text-white text-center" title="In the name of allah, the most merciful">بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
        {ayahs.map((ayah: Ayah) => (
          <div
            key={ayah.number}
            className="bg-transparent border-b border-px border-[#262629ff] p-4 flex flex-row justify-between"
          >
            <div className="text-white h-full flex flex-col gap-3">
                <p className="text-lg font-light">
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

              <div className="text-white text-right">
                {/* <p className="text-sm opacity-60 inline">{ayah.number}</p> */}
                <p className="text-4xl font-light tracking-wider inline arabic-text md:pl-8">
                  {ayah.text.split('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ')}
                </p>
              </div>
          </div>
        ))}
      </div>

      <div className="mt-4 mb-8 w-full flex justify-center items-center gap-2 flex-col">
        <div className="flex gap-3 flex-row">
          {/* TODO: Add arrow svgs appropriately */}
          <Link
            href={`${params.surah ? Number(params.surah) - 1 : 1}`}
            className="w-36 h-12 flex justify-center items-center font-semibold px-4 text-white rounded-xl bg-transparent border border-px border-[#262629ff]"
          >
            Previous Surah
          </Link>
          <Link
            href={`/`}
            className="w-36 h-12 flex justify-center items-center font-semibold px-4 text-white rounded-xl bg-transparent border border-px border-[#262629ff]"
          >
            Go back home
          </Link>
          <Link
            href={`${params.surah ? Number(params.surah) + 1 : 1}`}
            className="w-36 h-12 flex justify-center items-center font-semibold px-4 text-white rounded-xl bg-transparent border border-px border-[#262629ff]"
          >
            Next Surah
          </Link>
        </div>
        <p className="text-white text-2xl">QuranNet</p>
      </div>
    </section>
  );
};

export default Surah;
