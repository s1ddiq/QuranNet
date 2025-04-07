"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Input } from "./ui/input";
import { searchQuran } from "@/api/api";
import { debounce } from "lodash";
import SearchResultCard from "./SearchResultCard";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const Sidebar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [amount, setAmount] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const debouncedSearch = debounce(async (query: string) => {
    const trimmed = query.trim();

    if (trimmed.length < 3) {
      setSearchResults([]); // Clear results if query is too short
      setIsScrolling(false); // Reset scrolling state
      console.log(isScrolling); // --DEBUG
      return;
    }

    try {
      const response = await searchQuran(trimmed);

      if (response?.data?.matches) {
        setSearchResults(response.data.matches);
        // console.log(response.data); --DEBUG
      } else {
        console.log("Invalid response structure", response);
      }
    } catch (error) {
      console.log("Error fetching search results:", error);
    }
  }, 400);

  useEffect(() => {
    debouncedSearch(searchQuery); // Call the debounced function

    return () => {
      debouncedSearch.cancel(); // Cancel debounce on cleanup (when component unmounts)
    };
  }, [searchQuery]);
  

  return (
    <div>
      <div
        className={cn(
          "min-h-screen sm:block hidden bg-transparent border-x border-[#262629ff] sticky top-0 z-50 text-white transition-all duration-300",
          isCollapsed ? "w-16" : "lg:w-[450px] w-[350px]"
        )}
      >
        <div className={"w-full flex justify-between pt-4 px-4 items-center"}>
          <p
            className={cn(
              "text-base font-light ml-2 pointer-events-none",
              isCollapsed && "hidden"
            )}
          >
            Search surah, verse, juz, or pages
          </p>
          <Image
            src="/svg/logo.svg"
            width={32}
            height={32}
            alt="Logo"
            className="hover:-translate-y-2 cursor-pointer transition-all duration-300 mr-2"
            title="QuranNet - Home"
            onClick={toggleSidebar} // Fixed the function call here
          />
        </div>

        <div
          className={cn(
            "flex flex-col gap-3 mt-4 px-4",
            isCollapsed && "hidden"
          )}
        >
          <div className="rounded-full border border-[#262629ff] w-full h-12 flex items-center justify-center relative p-2">
            <Image
              src="/svg/search.svg"
              alt="Search Icon"
              width={16}
              height={16}
              className="absolute left-4  cursor-pointer"
            />
            <Input
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search the Quran"
              className="border-0 ml-4  focus-visible:ring-0 h-full pl-6"
            />
          </div>
          {/* Scrollable content */}
          <div className="flex flex-col gap-6 items-center mt-4 overflow-y-shown scrollable">
            {searchResults.length > 0 ? (
              searchResults
                .slice(0, amount)
                .map((result: SearchResult) => (
                  <SearchResultCard
                    key={result.number}
                    result={result}
                    searchQuery={searchQuery}
                    type="desktop"
                  />
                ))
            ) : (
              <p className=" text-sm font-light ml-2 pointer-events-none">
                {searchResults.length > 1
                  ? `No results found for ${searchQuery}`
                  : ""}
              </p>
            )}
          </div>
        </div>

        <p className=" text-sm font-light ml-2 opacity-10 pointer-events-none fixed bottom-4">
          IN DEVELOPMENT! PLEASE DO NOT JUDGE
        </p>
      </div>

      {/* MOBILE */}
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
                    key={result.number}
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
              <p className="text-sm font-light ml-2 pointer-events-none">
                {searchQuery.length > 0
                  ? `No results found for ${searchQuery}`
                  : ""}
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
