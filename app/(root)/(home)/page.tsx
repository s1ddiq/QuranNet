"use client";
import { fetchAllSurahs } from "@/api/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const SurahsList = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const func = async () => {
      const response = await fetchAllSurahs();
      setSurahs(response.data);
      {/* console.log(response.data) */}
    };
    func();
  }, []);

  const filteredSurahs = surahs.filter((surah: Surah) =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex items-center flex-col bg-[#08080aff] flex-1">
      <div>
        <h1 className="text-6xl opacity-60 font-bold text-center text-white">
          QuranNet
        </h1>

        <div className="rounded-full border border-px border-[#262629ff] w-128 h-16 flex items-center justify-center my-5 relative p-4">
          <Image
            src="/svg/search.svg"
            alt="Search Icon"
            width={16}
            height={16}
            className="absolute left-4 pointer-events-none"
          />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            placeholder="Search the Quran"
            className="border-0 ml-4 text-white focus-visible:ring-0 h-full"
          />
        </div>
      </div>

      <div className="w-full flex flex-row flex-wrap gap-5 justify-center md:px-24">
        {filteredSurahs.map((surah: Surah) => (
          <Link href={`/surah/${surah.number}`} key={surah.number}>
            <div>
              <div className="w-80 min-h-24 h-auto bg-transparent border border-px border-[#262629ff] rounded-xl p-4 relative hover:-translate-y-2 hover:shadow-lg hover:shadow-[#262629ff] cursor-pointer transition-discrete transition-all duration-300 border rounded-lg">
                <div>
                  <p className="text-white text-lg font-semibold">{surah.englishName}</p>
                </div>
                <p className="text-white text-sm opacity-60 absolute left-4 bottom-4">
                  {surah.englishNameTranslation}
                </p>

                <div className="absolute top-4 right-4 text-center">
                  <p className="text-white text-base">
                    {surah.englishNameTranslation}
                  </p>
                </div>
                <p className="text-white text-sm opacity-60 absolute right-4 bottom-4">
                  {surah.numberOfAyahs} Ayahs
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SurahsList;
