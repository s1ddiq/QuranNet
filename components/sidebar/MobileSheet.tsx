"use client";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet } from "../ui/sheet";
import React, { useEffect, useState } from "react";
import SearchResultCard from "./SearchResultCard";
import { Input } from "../ui/input";
import {
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "../ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import MenuIcon from "../svg/MenuIcon";
import SearchIcon from "../svg/SearchIcon";
import CrossIcon from "../svg/CrossIcon";
import LogoIcon from "../svg/LogoIcon";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { toast } from "sonner";
import { fetchSurahById } from "@/api/api";
import Image from "next/image";

const MobileSheet = ({
  isOpen,
  setIsOpen,
  // searchResults,
  searchQuery,
  setSearchQuery,
  // amount,
  surahs,
}: MobileSheetProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("search");
  interface SurahInfo {
    number: number;
    name: string;
    englishName: string;
    revelationType: string;
    numberOfAyahs: number;
  }

  const [surahInfo, setSurahInfo] = useState<SurahInfo | null>(null);
  const filteredSurahs = surahs?.filter((surah: Surah) =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const pathname = usePathname();
  const surahId = pathname.match(/\d+/g)?.[0];
  const currentSurah = surahs?.find((s) => s.number === Number(surahId));

  useEffect(() => {
    if (activeTab === "overview") {
      const fetchSurahInfo = async () => {
        if (currentSurah?.number !== undefined) {
          const res = await fetchSurahById(currentSurah.number);
          setSurahInfo(res.data);
        }
      };

      fetchSurahInfo();
    }

    return () => {};
  }, [activeTab]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="fixed w-full md:hidden flex justify-between items-center p-2 top-0 backdrop-blur-md bg-transparent border-b border-[#262629ff] min-h-16">
        <MenuIcon
          onClick={() => setIsOpen(true)}
          className="dark:text-white text-black"
        />
        <UserButton />

        <LogoIcon
          onClick={() => router.push("/")}
          className="dark:text-white text-black"
        />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="dark:bg-[#08080a] dark:text-white text-black px-4 border-b-2 dark:border-[#262629ff] border-white min-w-[87%]"
      >
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle>
          <SheetHeader>Menu</SheetHeader>
        </VisuallyHidden>
        <div>
          <div className="flex w-full justify-center gap-4 pt-[12px]">
            <p
              onClick={() => setActiveTab("search")}
              className={`cursor-pointer ${
                activeTab === "search" ? "text-white" : "text-gray-500"
              }`}
            >
              Search
            </p>
            <p
              onClick={() => setActiveTab("overview")}
              className={`cursor-pointer ${
                activeTab === "overview" ? "text-white" : "text-gray-500"
              }`}
            >
              Overview
            </p>
          </div>
        </div>

        {activeTab === "search" && (
          <>
            <div className="flex flex-col gap-3">
              <p className="text-lg font-light text-center pointer-events-none">
                Search surah, verse, juz, or page
              </p>
              <div className="rounded-full border border-[#262629ff] w-full h-12 flex items-center justify-center relative p-4 cursor-pointer">
                <SearchIcon className="dark:text-white text-black" />
                <Input
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchQuery(e.target.value);
                  }} // Update search query on input change
                  placeholder="Search the Quran"
                  className="border-0 ml-4 focus-visible:ring-0 h-full !shadow-none !bg-transparent"
                />
                <span
                  className={cn(
                    "",
                    searchQuery.length > 0 ? "block" : "hidden"
                  )}
                >
                  <CrossIcon
                    onClick={() => setSearchQuery("")}
                    className={`${searchQuery.length > 0 ? "block" : "hidden"}`}
                  />
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-start h-full overflow-y-auto scrollable-container">
              {filteredSurahs?.map(
                ({ number, englishName, englishNameTranslation }) => (
                  <Link
                    href={`/surah/${number}`}
                    key={number}
                    title={`${englishName} - ${englishNameTranslation}`}
                    onClick={() => {
                      toast("Navigating to surah");
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex gap-5">
                      <p className="text-gray-400">{number}</p>
                      <p>{englishName}</p>
                    </div>
                  </Link>
                )
              )}
            </div>
          </>
        )}

        {activeTab === "overview" && ( // maybe make into info
          <div>
            <Link
              href="/support"
              className="px-5 py-2 bg-blue-500 hover:bg-zinc-700 text-white rounded-xl text-sm font-medium transition"
            >
              Support Us ♥
            </Link>
            {surahInfo ? (
              <>
                <div className="bg-black flex flex-col gap-5 rounded-xl px-2 py-5">
                  <p className="text-gray-200">
                    Surah Number&nbsp;
                    <span className="text-gray-400">{surahInfo.number}</span>
                  </p>
                  <p className="text-gray-200">
                    Surah Name&nbsp;
                    <span className="text-gray-400">{surahInfo.name}</span>
                  </p>
                  <p className="text-gray-200">
                    You're currently reading&nbsp;
                    <span className="text-gray-400">
                      {surahInfo.englishName}
                    </span>{" "}
                    &nbsp; or &nbsp;
                    <span className="text-gray-400">{surahInfo.name}</span>
                  </p>

                  <p className="text-gray-200">
                    This surah is&nbsp;
                    <span className="text-gray-400">
                      {surahInfo.revelationType}
                    </span>
                  </p>
                  <p className="text-gray-200">
                    This surah has&nbsp;
                    <span className="text-gray-400">
                      {surahInfo.numberOfAyahs}
                    </span>
                    &nbsp; ayahs
                  </p>
                </div>

                <Image src="/svg/map.svg" width={64} height={64} alt="map" />
              </>
            ) : (
              <p>loading</p>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
