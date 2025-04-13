"use client";
import { fetchAllSurahs } from "@/api/api";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import SearchIcon from "@/components/svg/SearchIcon";
import SignInPopup from "@/components/popups/SignInPopup";
import ThemeToggleButton from "@/components/ThemeToggleButton";

const SurahsList = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [recent, setRecent] = useState<any>()
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isSignedIn } = useUser();
  useEffect(() => {
    const func = async () => {
      const resA = await fetchAllSurahs();
      setSurahs(resA.data);
      {
        /* console.log(response.data) */
      }
      const resB = localStorage.getItem('recent');
      // setRecent(resB ? JSON.parse(resB));
      if (resB) {
        const parsedRecent = JSON.parse(resB);
        setRecent(parsedRecent);
      } else {
        console.log("No recent data found");
      }
    };
    func();

  }, []);

  const filteredSurahs = surahs.filter((surah: Surah) =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex-items-center flex-col flex-1 pt-16 gap-4 text-white">
      <div className="w-full px-6 flex-col flex-center">
        <h1 className="md:text-6xl text-4xl font-bold text-center dark:text-white font-open-sans">
          QuranNet
        </h1>

        <div className="rounded-full border border-[#262629ff] lg:w-128 sm:w-96 w-full h-16 flex-items-center justify-center my-5 relative p-4">
          <SearchIcon />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            placeholder="Search the Quran"
            className="border-0 ml-4 text-white focus-visible:ring-0 h-full !bg-transparent !shadow-none"
          />
        </div>
      </div>

      {isSignedIn && recent ? (
        <div className="mb-8 w-full px-2">
          {/* <Link href={`/`}>{localStorage.getItem("recent") ?? 'No recently read'}</Link> */}
          {/* <p>{localStorage.getItem('recent') ? JSON.parse(localStorage.getItem('recent')!) : 'No recently read'}</p> */}
          <p className="text-white text-2xl py-4 text-center">
            Continue Reading
          </p>
          <Link href={`/surah/${recent.number}`} key={recent.number}>
          <div className="md:w-80 sm:w-64 w-full min-h-24 h-auto bg-black border-2 dark:border-[#262629ff] border-gray-400 rounded-xl p-4 cursor-pointer transition-discrete transition-all duration-300 border rounded-lg text-gray-400 flex flex-col justify-between">
              <div className="flex w-full justify-between text-sm">
                <p className="text-lg font-semibold dark:text-white text-black">
                  {recent.englishName}
                </p>
                <p>{recent.number}</p>
              </div>

              <div className="flex w-full justify-between text-sm">
                <p>{recent.englishNameTranslation}</p>
                <p>{recent.numberOfAyahs} Ayahs</p>
              </div>
            </div>
            </Link>
        </div>
      ) : (
        <div className="text-center text-gray-200">
          <p><Link href={isSignedIn ? '/surah/1' : '/sign-in'} className="text-blue-500">{isSignedIn ? 'Visit a surah' : 'Sign in'}</Link> to unlock recently read!</p>
        </div>
      )}
      <SignInPopup />


     {/* seperator */}
      <div className="w-full flex sm:flex-row flex-col flex-wrap md:gap-6 gap-5 justify-center px-2 mb-12">
        {filteredSurahs.map((surah: Surah) => (
          <Link href={`/surah/${surah.number}`} key={surah.number}>
            <div className="md:w-80 sm:w-64 w-full min-h-24 h-auto bg-transparent border dark:border-[#262629ff] border-gray-400 rounded-xl p-4 hover:-translate-y-2 hover:shadow-[2px] hover:shadow-[#262629ff] cursor-pointer transition-discrete transition-all duration-300 border rounded-lg text-gray-400 flex flex-col justify-between">
              <div className="flex w-full justify-between text-sm">
                <p className="text-lg font-semibold dark:text-white text-black">
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
        <ThemeToggleButton />
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
