"use client";
import { fetchSurahById, fetchSurahTranslation } from "@/api/api";
import { useParams, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import NavigatorButton from "@/components/NavigatorButton";
import AyahCard from "@/components/AyahCard";
import { cn } from "@/lib/utils";

const Surah = () => {
  const [surah, setSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [englishAyahs, setEnglishAyahs] = useState<EnglishAyah[]>([]);
  const params = useParams();
  const searchParams = useSearchParams();
  const ayahParam = searchParams.get("ayah");
  const [scrollY, setScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // Fetch the surah data (metadata and list of ayahs)
  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const response = await fetchSurahById(Number(params.surah));
        setSurah(response.data);
        setAyahs(response.data.ayahs || []);
      } catch (error) {
        console.error("Error fetching surah data:", error);
      }
    };
    fetchSurahData();
  }, [params.surah]);

  // Fetch the entire surah translation in one request
  useEffect(() => {
    const fetchTranslations = async () => {
      if (params.surah) {
        try {
          const response = await fetchSurahTranslation(Number(params.surah));
          // Assume the translation response returns an object and the ayahs array is stored in response.ayahs
          setEnglishAyahs(response.ayahs || []);
        } catch (error) {
          console.error("Error fetching surah translation:", error);
          setEnglishAyahs([]);
        }
      }
    };
    fetchTranslations();
  }, [params.surah]);

  // Scroll to the selected ayah (if provided via the "ayah" search param)
  useEffect(() => {
    if (ayahParam) {
      const element = document.getElementById(`ayah-${ayahParam}`);
      if (element) {
        element.classList.add("bg-[#1c1c1cff]");

        // Set timeouts
        const a = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200);

        const b = setTimeout(() => {
          element.classList.remove("bg-[#1c1c1cff]");
        }, 4000);

        // Cleanup timeouts when the effect is cleaned up or ayahParam changes
        return () => {
          clearTimeout(a);
          clearTimeout(b);
        };
      }
    }
  }, [ayahParam, ayahs]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setShowHeader(true); // scrolling up
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false); // scrolling down
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <section className="w-full flex items-center flex-col bg-[#08080aff] flex-1 text-white">
      <div
        className={cn(
          "flex flex-row justify-between items-center w-1/3 mb-2 min-h-16 md:sticky top-0 bg-[#08080aff] w-full px-6 border-b border-[#262629ff] transition-all duration-1000",
          !showHeader && "-translate-y-24 opacity-0"
        )}
      >
        {/* <h1 className="text-6xl font-bold text-center ">
          {surah?.englishName}
        </h1> */}
        <p className="font-bold text-center text-2xl">
          {surah?.englishNameTranslation}
        </p>
        <p className="font-bold text-center text-2xl">{surah?.name}</p>
      </div>

      <div
        className="fixed bottom-8 right-8 text-3xl bg-[#08080aff] p-4 rounded-full 
          md:flex hidden justify-center items-center border border-px border-[#262629ff]
          cursor-pointer transition-all duration-300 hover:-translate-y-2 opacity-10"
      >
        <p className="pointer-events-none text-[#262629ff]">۞</p>
      </div>

      <div className="flex flex-col w-full gap-16">
        <p
          className="arabic-text md:text-5xl text-3xl text-center my-4 text-gray-400 shadow-xl translate-y-12 pt-8"
          title="In the name of allah, the most merciful"
        >
          بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
        {ayahs.map((ayah: Ayah) => (
          <AyahCard
            key={ayah.number}
            ayah={ayah}
            params={params}
            translatedAyahs={englishAyahs} // Pass the entire translations array
          />
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
