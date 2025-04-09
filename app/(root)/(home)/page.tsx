"use client";
import { fetchAllSurahs } from "@/api/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";

const SurahsList = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const func = async () => {
      const response = await fetchAllSurahs();
      setSurahs(response.data);
      {
        /* console.log(response.data) */
      }
    };
    func();
  }, []);

  const filteredSurahs = surahs.filter((surah: Surah) =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex-items-center flex-col bg-primary flex-1 pt-16 gap-4">
      <div className="w-full px-6 flex-col flex-center">
        <h1 className="md:text-6xl text-4xl font-bold text-center text-white font-open-sans">
          QuranNet
        </h1>

        <div className="rounded-full border border-2 border-[#262629ff] lg:w-128 sm:w-96 w-full h-16 flex-items-center justify-center my-5 relative p-4">
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

      <div className="w-full flex sm:flex-row flex-col flex-wrap md:gap-8 gap-5 justify-center md:px-8 sm:px-8 px-5 mb-24">
        {filteredSurahs.map((surah: Surah) => (
          <Link href={`/surah/${surah.number}`} key={surah.number}>
            <div className="md:w-80 sm:w-64 w-full min-h-24 h-auto bg-transparent border border-[#262629ff] rounded-xl p-4 hover:-translate-y-2 hover:shadow-[2px] hover:shadow-[#262629ff] cursor-pointer transition-discrete transition-all duration-300 border rounded-lg text-gray-400 flex flex-col justify-between">
              <div className="flex w-full justify-between text-sm">
                <p className="text-lg font-semibold text-white">
                  {surah.englishName}
                </p>
                <p>{surah.number}</p>
              </div>

              <div className="flex w-full justify-between text-sm">
                <p>{surah.englishNameTranslation}</p>
                <p>{surah.numberOfAyahs} Ayahs</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="border-t border-[#262629ff] w-full flex justify-between items-center p-8">
        <p className="text-xl text-gray-400">
          {new Date().getFullYear()} - QuranNet
        </p>
          <Link href={"https://github.com/s1ddiq/QuranNet"} className="mr-8 text-gray-400">Theme changer is coming soon</Link>
        <div className="text-xl text-gray-400">
          <SignedOut>
              <SignInButton />
          </SignedOut>
          <SignedIn>
              <SignOutButton />
          </SignedIn>
        </div>
      </footer>
    </div>
  );
};

export default SurahsList;
