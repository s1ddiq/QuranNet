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

const Sidebar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [amount, setAmount] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = debounce(async (query: string) => {
    try {
      const response = await searchQuran(query);

      if (response && response.data && response.data.matches) {
        setSearchResults(response.data.matches);
        console.log(response.data);
      } else {
        console.error("Invalid response structure", response);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, 400); // 500ms debounce delay

  useEffect(() => {
    debouncedSearch(searchQuery); // Call the debounced function

    return () => {
      debouncedSearch.cancel(); // Cancel debounce on cleanup (when component unmounts)
    };
  }, [searchQuery]);

  return (
    <div>
      <div className="w-[350px] min-h-screen bg-transparent border-x border-px border-[#262629ff] sticky top-0 sm:block hidden">
        <div className="w-full flex justify-start pt-4 pl-4 items-center">
          <Image
            src="/svg/logo.svg"
            width={36}
            height={36}
            alt="Logo"
            className="hover:-translate-y-2 cursor-pointer transition-discrete transition-all duration-300"
            title="QuranNet - Home"
            onClick={() => router.replace("/")}
          />
        </div>

        <div className="flex flex-col gap-3 mt-4 px-4">
          <p className="text-white text-sm font-light ml-2 pointer-events-none">
            Search surah, verse, juz, or pages
          </p>

          <div className="rounded-full border border-px border-[#262629ff] w-full h-12 flex items-center justify-center relative p-2">
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
              className="border-0 ml-4 text-white focus-visible:ring-0 h-full"
            />
          </div>
          {searchResults.length > 0 && (
            <p className="text-white text-sm text-left font-light ml-2 pointer-events-none opacity-60">
              {searchResults.length} results found
            </p>
          )}
          {/* Scrollable content */}
          <div className="flex flex-col gap-3 items-center mt-4 max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-hidden scroll-snap-type-y mandatory">
            {searchResults.length > 2 ? (
              searchResults.slice(0, amount).map((result: SearchResult) => (
                <div
                  key={Math.random() * 5000}
                  className="w-11/12 bg-transparent border rounded-xl border-px border-[#262629ff] p-4 flex flex-row justify-between scroll-snap-align-center"
                >
                  <p className="text-white text-base">
                    {result.text.split(`${searchQuery}`)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-white text-sm font-light ml-2 pointer-events-none">
                {searchQuery.length > 0
                  ? `No results found for ${searchQuery}`
                  : ""}
              </p>
            )}
          </div>
        </div>

        <p className="text-white text-sm font-light ml-2 opacity-10 pointer-events-none">
          website in development pls dont judge this trash.
        </p>
      </div>

      <Sheet open={isOpen}>
        <SheetTrigger className="text-white fixed w-full sm:hidden flex justify-between p-2 top-0 bg-[#08080a] border-b border-px border-[#262629ff]" onClick={() => setIsOpen(true)}>
          <Image
            src="/svg/menu.svg"
            width={32}
            height={32}
            alt="Logo"
            title="QuranNet - Menu"
          />

          <Image
            src="/svg/logo.svg"
            width={32}
            height={32}
            alt="Logo"
            title="QuranNet - Home"
          />
        </SheetTrigger>
        <SheetContent side="top" className="min-h-[35%] py-4 bg-[#08080a]">
          <SheetHeader className="rounded-2xl">
            <div className="flex flex-col gap-3 mt-4 px-4">
              <p className="text-white text-lg font-light">
                Search surah, verse, juz, or page
              </p>
              <div className="rounded-full border border-px border-[#262629ff] w-full h-12 flex items-center justify-center relative p-2 cursor-pointer">
                <Image
                  src="/svg/search.svg"
                  alt="Search Icon"
                  width={16}
                  height={16}
                  className="absolute left-4"
                />
                <Input
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  } // Update search query on input change
                  placeholder="Search the Quran"
                  className="border-0 ml-4 text-white focus-visible:ring-0 h-full"
                />
              </div>
              <p className="text-white text-lg font-light">Quick Navigation</p>

              {/* <div className={}>
                <Link href={"/"} className="text-lg text-white">
                  Go Home
                </Link>
              </div> */}
            </div>
            {searchResults.length > 0 && (
              <p className="text-white text-sm text-left font-light ml-2 pointer-events-none opacity-60">
                {searchResults.length} results found
              </p>
            )}
            
            {/* Scrollable content */}
            <div className="flex flex-col gap-3 items-center mt-4 max-h-[calc(100vh-180px)] overflow-y-auto scrollable">
              {searchResults.length > 2 ? (
                searchResults.slice(0, amount).map((result: SearchResult) => (
                  <div
                    key={Math.random() * 5000}
                    className="w-11/12 bg-transparent border rounded-xl border-px border-[#262629ff] p-4 flex flex-row justify-between scroll-snap-align-center"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <p className="text-white text-base">
                      {result.text.split(`${searchQuery}`)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-white text-sm font-light ml-2 pointer-events-none">
                  {searchQuery.length > 0
                    ? `No results found for ${searchQuery}`
                    : ""}
                </p>
              )}
            </div>
            <p className="text-white text-sm font-light ml-2 absolute bottom-0 opacity-10 pointer-events-none">
              website in development pls dont judge this trash.
            </p>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
