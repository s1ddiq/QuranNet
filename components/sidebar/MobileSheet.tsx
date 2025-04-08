'use client'
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet } from "../ui/sheet";
import router from "next/router";
import React from "react";
import SearchResultCard from "../SearchResultCard";
import { Input } from "../ui/input";
import {
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "../ui/sheet";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
        className="fixed w-full sm:hidden flex justify-between p-2 top-0 bg-[#08080a] border-b border-[#262629ff] min-h-16"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="/svg/menu.svg"
          width={32}
          height={32}
          alt="Logo"
          title="QuranNet - Menu"
          className="ml-2"
        />
        <Image
          src="/svg/logo.svg"
          width={32}
          height={32}
          alt="Logo"
          title="QuranNet - Home"
          className="mr-2"
          onClick={() => router.push("/")}
        />
      </SheetTrigger>
      <SheetContent
        side="top"
        className={cn(
          "min-h-[25%] bg-[#08080a] text-white px-2",
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
            <Image
              src="/svg/search.svg"
              alt="Search Icon"
              width={16}
              height={16}
              className="absolute left-4"
            />
            <Input
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value);
                setIsScrolling(true);
              }} // Update search query on input change
              placeholder="Search the Quran"
              className="border-0 ml-4 focus-visible:ring-0 h-full"
            />
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
              {searchQuery.length > 5 && searchResults.length === 0
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
