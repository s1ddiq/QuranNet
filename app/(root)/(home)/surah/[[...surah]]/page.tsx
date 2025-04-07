"use client";
import { fetchSurahById } from "@/api/api";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavigatorButton from "@/components/NavigatorButton";
import AyahCard from "@/components/AyahCard";

const Surah = () => {
  const [surah, setSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const params = useParams();
  const searchParams = useSearchParams();
  const ayahParam = searchParams.get("ayah");

  useEffect(() => {
    const func = async () => {
      const response = await fetchSurahById(Number(params.surah));
      setSurah(response.data);
      setAyahs(response.data.ayahs || []);
    };
    func();
  }, [params.surah]);

  useEffect(() => {
    const element = document.getElementById(`ayah-${ayahParam}`);
    // console.log(element); --DEBUG
    // console.log(ayahParam); --DEBUG
    if(element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.classList.add("bg-[#1c1c1cff]");
      setTimeout(() => {   
        element.classList.remove("bg-[#1c1c1cff]");
      }, 1200)
    }
  }, [ayahParam, ayahs]);

  return (
    <section className="w-full flex items-center flex-col bg-[#08080aff] flex-1 pt-8 text-white">
      <div className="my-16">
        <h1 className="text-6xl font-bold text-center ">
          {/* {surah?.englishName} */}
        </h1>
        {/* <p className="text-xl opacity-60  text-center">
          "{surah?.englishNameTranslation}"
        </p> */}
      </div>

      <div
        className="fixed bottom-8 right-8 text-3xl bg-[#08080aff] p-4 rounded-full 
        md:flex hidden justify-center items-center border border-px border-[#262629ff]
        cursor-pointer transition-discrete transition-all duration-300 hover:-translate-y-2 opacity-10"
      >
        <p className="pointer-events-none text=[#262629ff">۞</p>
      </div>

      <div className="flex flex-col w-full gap-16">
        <p
          className="arabic-text md:text-5xl text-3xl text-center my-4 text-gray-400 shadow-xl"
          title="In the name of allah, the most merciful"
        >
          بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
        {ayahs.map((ayah: Ayah) => (
          <AyahCard key={ayah.number} ayah={ayah} params={params} />
        ))}
      </div>

      <div className="mb-8 w-full flex justify-center items-center flex-col p-4 sm:p-8">
        <div className="flex flex-row w-full">
          <NavigatorButton
            direction="Previous"
            surahNumber={params.surah ? Number(params.surah) - 1 : 1}
          />
          <Link href={`/`} className="flex-center navigator-styles">
            Go Home
          </Link>
          <NavigatorButton
            direction="Next"
            surahNumber={params.surah ? Number(params.surah) + 1 : 1}
          />
        </div>
        <div className="flex justify-between w-full pt-2 sm:pt-8">
          <p className="text-sm font-bold tracking-widest text-gray-400">
            QuranNet
          </p>
          <p className="text-sm font-bold tracking-widest text-gray-400">
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Surah;
