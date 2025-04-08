"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Input } from "./ui/input";
import { fetchAllSurahs, searchQuran } from "@/api/api";
import { debounce } from "lodash";
import SearchResultCard from "./SearchResultCard";
import { cn } from "@/lib/utils";
import MobileSheet from "./sidebar/MobileSheet";
import useScrollHandler from "@/hooks/useScrollHandler";
import SidebarHeader from "./sidebar/SidebarHeader";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [amount, setAmount] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      } else {
        console.log("Invalid response structure", response);
      }
    } catch (error) {
      console.log("Error fetching search results:", error);
    }
  }, 300);

  useEffect(() => {
    const func = async () => {
      const response = await fetchAllSurahs();
      setSurahs(response.data);
    };
    func();
  }, []);

  useEffect(() => {
    debouncedSearch(searchQuery); // Call the debounced function

    return () => {
      debouncedSearch.cancel(); // Cancel debounce on cleanup (when component unmounts)
    };
  }, [searchQuery]);

  useScrollHandler(
    ["a-1", "a-2"], // IDs of the elements you want to track scroll for
    "absolute", // Class to add when scrolling down
    "-translate-y-64" // Class to add when scrolling down
  );

  return (
    <div>
      <div
        className={cn(
          "min-h-screen sm:block hidden bg-transparent border-x border-[#262629ff] sticky top-0 z-50 text-white transition-all duration-300 md:w-[350px] scrollable-container",
          isCollapsed && "!w-16"
        )}
      >
       <SidebarHeader toggleSidebar={toggleSidebar} isCollapsed={isCollapsed}/>

       

        <div
          className={cn(
            "flex flex-col gap-3 mt-4 px-4",
            isCollapsed && "hidden"
          )}
        >
         <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <div
            className="
              flex flex-col gap-8 items-center scrollable-container
            "
            id="a-1"
          >
            {searchResults.length > 0 ? (
              searchResults
                .slice(0, amount)
                .map((result: SearchResult, index) => (
                  <SearchResultCard
                    key={`${result.number}-${index}`}
                    result={result}
                    searchQuery={searchQuery}
                    type="desktop"
                  />
                ))
            ) : (
              <p className="text-sm font-light ml-2 text-gray-400 pointer-events-none">
                {searchQuery.length > 3 && searchResults.length === 0
                  ? `No results found for "${searchQuery}"`
                  : null}
              </p>
            )}
          </div>

          <div
            className="
          flex flex-col gap-8 scrollable-container"
            id="a-2"
          >
            {surahs.map((surah: Surah) => (
              <Link
                href={`/surah/${surah.number}`}
                key={surah.number}
                title={`${surah.englishName} - ${surah.englishNameTranslation}`}
              >
                <div className="flex gap-5">
                  <p className="text-gray-400">{surah.number}</p>
                  <p>{surah.englishName}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <MobileSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isScrolling={isScrolling}
        setIsScrolling={setIsScrolling}
        searchResults={searchResults}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        amount={amount}
      />
    </div>
  );
};

export default Sidebar;
