"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

// =========== Shadcn UI and Components ==============
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet } from "../ui/sheet";
import { Input } from "../ui/input";
import Settings from "../Settings";

import {
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "../ui/sheet";

// =========== Icons ==============
import MenuIcon from "../svg/icons/MenuIcon";
import LogoIcon from "../svg/icons/LogoIcon";

// =========== Navigation & Routing ==============
import { useRouter } from "next/navigation";
import Link from "next/link";
import useScrollDirection from "@/hooks/useScrollDirection";

const MobileSheet = ({
  isOpen,
  setIsOpen,
  searchQuery,
  setSearchQuery,
  surahs,
  surahNumber,
}: MobileSheetProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("search");
  const show = useScrollDirection();

  const filteredSurahs = surahs?.filter((surah: Surah) =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className={cn(
          "fixed w-full lg:hidden flex justify-between items-center transition-all duration-300 p-2 px-4 backdrop-blur-md border-b dark:border-[#262629ff] border-black min-h-16 z-99999",
          show ? "top-0" : "-top-16"
        )}
        id="mobile-menu-trigger"
      >
        <LogoIcon
          onClick={() => router.push("/")}
          className="dark:text-white text-black"
        />
        <MenuIcon
          onClick={() => setIsOpen(true)}
          className="dark:text-white text-black"
        />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="z-999999 dark:bg-zinc-900 bg-[var(--sephia-200)] dark:text-white text-black px-4 border-l dark:border-[#262629ff] border-black sm:min-w-[25%] min-w-[90%]" // maybe make transparent and add backdrop MAYBE REVERT BACK TO NOT  bg-transparent backdrop-blur-md
      >
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle>
          <SheetHeader>Menu</SheetHeader>
        </VisuallyHidden>

        {/* <div className="mt-2 px-2">
          <p className="text-gray-400 text-xl">Menu</p>
        </div> */}
        <div className="relative mt-4 mx-1">
          {/* Sliding pill */}
          <div
            className="absolute -top-[4px] left-0 h-9 dark:bg-blue-500 bg-[var(--sephia-400)] rounded-full transition-all duration-300"
            style={{
              width: "50%",
              left: activeTab === "search" ? "0%" : "50%", // adjust width based on activeTab, pretty weird looking and will refactor
            }}
          />
          <div className="relative flex dark:bg-zinc-800 bg-[var(--sephia-300)] dark:border-[#262629ff] border-0 p-1 rounded-full dark:text-white text-black">
            <button
              onClick={() => setActiveTab("search")}
              className="flex-1 text-center text-sm font-medium py-2 z-10 transition-colors focus:outline-none focus-ring-0"
            >
              Search
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className="flex-1 text-center text-sm font-medium py-2 z-10 transition-colors"
            >
              Settings
            </button>
          </div>
        </div>

        {activeTab === "search" && (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <Input
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchQuery(e.target.value);
                  }} // Update search query on input change
                  placeholder="Search by Surah"
                  className="bg-zinc-800 text-white border-0"
                />
              </div>
            </div>

            <div className="overflow-y-auto scrollable-container max-h-[calc(100vh-50px)] min-h-[calc(100vh-50px)] pb-0">
              {filteredSurahs?.map((surah) => (
                <Link
                  key={surah.number}
                  href={`/surah/${surah.number}`}
                  title={`${surah.englishName} — ${surah.englishNameTranslation}`}
                  className={cn(
                    "inline-block rounded-md p-2 transition items-center gap-4 w-full space-x-4",
                    surah.number === surahNumber &&
                      "dark:bg-zinc-800 bg-[var(--sephia-300)] font-semibold"
                  )}
                >
                  <span className="dark:text-gray-400 text-black w-6 text-right inline">
                    {surah.number}
                  </span>
                  <span className="dark:text-white text-black inline">
                    {surah.englishName}
                  </span>
                  {/* may have to use this again */}
                  {/* <span className="text-sm text-gray-400">{surah.englishNameTranslation}</span> */}
                </Link>
              ))}
            </div>
          </>
        )}

        {activeTab === "settings" && ( // maybe rename into info
          <Settings />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
