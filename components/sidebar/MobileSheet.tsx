"use client";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet } from "../ui/sheet";
import router from "next/router";
import React from "react";
import SearchResultCard from "./SearchResultCard";
import { Input } from "../ui/input";
import {
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "../ui/sheet";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MenuIcon from "../svg/MenuIcon";
import SearchIcon from "../svg/SearchIcon";
import CrossIcon from "../svg/CrossIcon";
import LogoIcon from "../svg/LogoIcon";
import { UserButton } from "@clerk/nextjs";

const MobileSheet = ({
  isOpen,
  setIsOpen,
  isScrolling,
  setIsScrolling,
  searchResults,
  searchQuery,
  setSearchQuery,
  amount,
}: MobileSheetProps) => {
  const router = useRouter();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className="fixed w-full sm:hidden flex justify-between items-center p-2 top-0 dark:bg-[#08080a] bg-white border-b border-[#262629ff] min-h-16"
        onClick={() => setIsOpen(true)}
      >
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
        side="top"
        className={cn(
          "min-h-[15%] dark:bg-[#08080a] dark:text-white text-black px-2 border-b-2 dark:border-[#262629ff] border-white",
          isScrolling && "h-full"
        )}
      >
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle>
          <SheetHeader>Menu</SheetHeader>
        </VisuallyHidden>
        <div className="flex flex-col gap-3">
          <p className="text-lg font-light text-center pointer-events-none pt-4">
            Search surah, verse, juz, or page
          </p>
          <div className="rounded-full border border-[#262629ff] w-full h-12 flex items-center justify-center relative p-4 cursor-pointer">
            <SearchIcon className="dark:text-white text-black" />
            <Input
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value);
                setIsScrolling(true);
              }} // Update search query on input change
              placeholder="Search the Quran"
              className="border-0 ml-4 focus-visible:ring-0 h-full !shadow-none !bg-transparent"
            />
            <span
              className={cn("", searchQuery.length > 0 ? "block" : "hidden")}
            >
              <CrossIcon onClick={() => setSearchQuery("")} />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center h-full overflow-y-auto scrollable">
          {searchResults.length > 0 ? (
            searchResults
              .slice(0, amount)
              .map((result: SearchResult, index) => (
                <SearchResultCard
                  key={`${result.number}-${index}`}
                  result={result}
                  searchQuery={searchQuery}
                  type="mobile"
                  index={index}
                  amount={amount}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              ))
          ) : (
            <p className="text-sm font-light ml-2 text-gray-400 pointer-events-none">
              {searchQuery.length > 1 && searchResults.length === 0
                ? `No results found for "${searchQuery}"`
                : null}
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
