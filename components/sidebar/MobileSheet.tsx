"use client";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet } from "../ui/sheet";
import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "../ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import MenuIcon from "../svg/MenuIcon";
import LogoIcon from "../svg/LogoIcon";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Slider } from "../ui/slider";
import { useGlobalState } from "@/lib/providers/GlobalStatesProvider";

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

  const filteredSurahs = surahs?.filter((surah: Surah) =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { fontSize, setFontSize } = useGlobalState();

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="fixed w-full md:hidden flex justify-between items-center p-2 top-0 backdrop-blur-md border-b border-[#262629ff] min-h-16">
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
        className="bg-zinc-900 dark:text-white text-black px-4 border-b-2 dark:border-[#262629ff] border-white sm:min-w-[75%] min-w-[90%]" // maybe make transparent and add backdrop MAYBE REVERT BACK TO NOT  bg-transparent backdrop-blur-md
      >
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle>
          <SheetHeader>Menu</SheetHeader>
        </VisuallyHidden>
        <div className="relative mt-4 mx-1">
          {/* Sliding pill */}
          <div
            className="absolute -top-[4px] fatranslate-y-[6px] left-0 h-9 bg-blue-500 rounded-full transition-all duration-300"
            style={{
              width: "50%",
              left: activeTab === "search" ? "0%" : "50%",
            }}
          />
          <div className="relative flex border bg-zinc-800 border-[#262629ff] p-1 rounded-full">
            <button
              onClick={() => setActiveTab("search")}
              className={cn(
                "flex-1 text-center text-sm font-medium py-2 z-10 transition-colors focus:outline-none focus-ring-0",
                activeTab === "search" ? "text-white" : "text-white/70"
              )}
            >
              Search
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={cn(
                "flex-1 text-center text-sm font-medium py-2 z-10 transition-colors",
                activeTab === "settings" ? "text-white" : "text-white/70"
              )}
            >
              Settings
            </button>
          </div>
        </div>

        {activeTab === "search" && (
          <>
            <div className="flex flex-col gap-3">
              <div>
                {/* <SearchIcon className="dark:text-white text-black" /> */}
                <Input
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchQuery(e.target.value);
                  }} // Update search query on input change
                  placeholder="Search by Quran"
                />
                {/* <span
                  className={cn(
                    "",
                    searchQuery.length > 0 ? "block" : "hidden"
                  )}
                >
                  <CrossIcon
                    onClick={() => setSearchQuery("")}
                    className={`${searchQuery.length > 0 ? "block" : "hidden"}`}
                  />
                </span> */}
              </div>
            </div>

            <div className="overflow-y-auto scrollable-container max-h-[calc(100vh-50px)] min-h-[calc(100vh-50px)] pb-0">
              {filteredSurahs?.map((surah) => (
                <Link
                  key={surah.number}
                  href={`/surah/${surah.number}`}
                  title={`${surah.englishName} — ${surah.englishNameTranslation}`}
                  className="block rounded-md py-2 hover:bg-white/10 transition flex items-center gap-3 w-full"
                >
                  <span className="text-gray-400 w-6 text-left">
                    {surah.number}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-white">{surah.englishName}</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {activeTab === "settings" && ( // maybe make into info
          <div className="p-4 bg-transparent rounded-md bg-gray-400">
            {/* <p className="text-2xl">Accessiblity</p> */}
            <p className="text-xl text-white">Font Size</p>
            <div className="space-y-4">
              <Slider
                value={[fontSize]}
                defaultValue={[2]}
                max={3}
                step={1}
                onValueChange={handleFontSizeChange}
                className="relative flex w-full touch-none select-none items-center"
              >
              </Slider>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
