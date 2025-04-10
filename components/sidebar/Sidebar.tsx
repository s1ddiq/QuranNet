"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { fetchAllSurahs, searchQuran } from "@/api/api";
import { debounce } from "lodash";
import SearchResultCard from "./SearchResultCard";
import { cn } from "@/lib/utils";
import MobileSheet from "./MobileSheet";
import useScrollHandler from "@/hooks/useScrollHandler";
import SidebarHeader from "./SidebarHeader";
import { toast } from "sonner";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [amount, setAmount] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [surahs, setSurahs] = useState<Surah[]>([]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const debouncedSearch = useMemo(() => 
    debounce(async (query: string) => {
      const trimmed = query.trim();
      if (trimmed.length < 1) {
        setSearchResults([]);
        setIsScrolling(false);
        return;
      }
  
      try {
        const response = await searchQuran(trimmed);
        if (response?.data?.matches) {
          setSearchResults(response.data.matches);
        }
      } catch (error) {
        console.log("Error fetching search results:", error);
      }
    }, 300),
  []);
  

  useEffect(() => {
    const func = async () => {
      const response = await fetchAllSurahs();
      setSurahs(response.data);
    };
    func();

    return () => {}; // 👈 cleanup
  }, []);

useEffect(() => {
  if (searchQuery.length < 1) {
    setSearchResults([]);
    return;
  }

  debouncedSearch(searchQuery);

  return () => {
    debouncedSearch.cancel();
  };
}, [searchQuery, debouncedSearch]);


  useScrollHandler(
    ["a-1", "a-2"], // IDs of the elements you want to track scroll for
    ["fixed", "top-0", '!opacity-0'], // Adjusted to match the expected type
    "-translate-y-128" // Class to add when scrolling down
  );

  return (
    <div>
      <div
        className={cn(
          "min-h-screen sm:block hidden bg-transparent border-x dark:border-[#262629ff] border-gray-400 sticky top-0 z-50 dark:text-white text-black transition-all duration-300 md:w-[350px] scrollable-container",
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
                onClick={() => toast("Navigating to surah")}
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
