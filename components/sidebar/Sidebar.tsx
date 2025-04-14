"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { fetchAllSurahs, searchQuran } from "@/api/api";
import { debounce } from "lodash";
import SearchResultCard from "./SearchResultCard";
import { cn } from "@/lib/utils";
import MobileSheet from "./MobileSheet";
import SidebarHeader from "./SidebarHeader";
import { toast } from "sonner";
import SearchInput from "./SearchInput";
import { BookOpen, Contact, Settings } from "lucide-react";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [amount, setAmount] = useState(25);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "search" | "browse">(
    "browse"
  );

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const debouncedSearch = useMemo(
    () =>
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
    []
  );

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

  useEffect(() => {
    if (activeTab === "overview") {
      const fetchSurahInfo = async () => {};
    }

    return () => {};
  }, [activeTab]);

  return (
    <div>
      <div
        className={cn(
          "min-h-screen sm:block hidden bg-transparent border-x dark:border-[#262629ff] border-gray-400 sticky top-0 z-50 dark:text-white text-black transition-all duration-300 md:w-[350px]",
          isCollapsed && "!w-16"
        )}
      >
        <SidebarHeader
          toggleSidebar={toggleSidebar}
          isCollapsed={isCollapsed}
        />
        <div className={cn("w-full items-center justify-center", isCollapsed ? 'hidden' : 'flex')}>
          <div className="flex w-full justify-center items-center gap-4 pt-[12px] border-b border-[#262629ff] pb-2">
            <p
              onClick={() => setActiveTab("search")}
              className={`cursor-pointer ${
                activeTab === "search" ? "text-white" : "text-gray-500"
              }`}
            >
              Search
            </p>
            <p
              onClick={() => setActiveTab("browse")}
              className={`cursor-pointer ${
                activeTab === "browse" ? "text-white" : "text-gray-500"
              }`}
            >
              Browse
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
          <div
            className={cn(
              "flex flex-col gap-3 px-2 pt-2",
              isCollapsed && "hidden"
            )}
          >
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <div
              className="
              flex flex-col gap-8 items-center scrollable-container
            "
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
          </div>
        )}

        {activeTab === "browse" && (
          <div
          className={cn('flex-col gap-8 scrollable-container px-4 py-4', isCollapsed ? 'hidden' : 'flex')}
          >
             {/* seperator */}
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
        )}
        {/* turn into components */}
        {activeTab === "overview" && (
          <div className={cn("flex-col justify-between gap-4 p-4 text-white", isCollapsed ? 'hidden' : 'flex')}>
            {/* <p className="text-center text-gray-400 text-lg">Purely visual only settings, check back later!</p> */}
            
     
       
            <>
              <div className="flex flex-col w-full gap-5">
                <div className="flex justify-between">
                  <p className="text-xl">Contact</p>
                  <Contact size={26} />
                </div>
                <div className="flex flex-col text-gray-400">
                  <p className="text-blue-500">bruhs1ddiq@gmail.com</p>
                  <p>...More coming soon</p>
                </div>
              </div>
            </>
            <>
              <div className="flex justify-between">
                <p className="text-xl">Open Source Projects</p>
                <BookOpen size={26} />
              </div>
              <div className="flex flex-col text-blue-500">
                <Link href="https://github.com/s1ddiq">
                  https://github.com/s1ddiq
                </Link>
                <Link href="https://github.com/s1ddiq/QuranNet">
                  https://github.com/s1ddiq/QuranNet
                </Link>
              </div>
            </>
           
            <div className="flex flex-col w-full gap-5">
              <p className="text-xl text-blue-500">Donate</p>
            </div>
          </div>
        )}
      </div>

      {/*  <div className="w-full h-px bg-[#262629ff] rounded-full"></div>{" "}
            {/* seperator */}

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
        surahs={surahs}
      />
    </div>
  );
};

export default Sidebar;


       {/* <>
              <div className="flex justify-between">
                <p className="text-xl">Manage appearance</p>
                <Settings size={26} />
              </div>
              <div className="flex flex-col text-gray-400">
                <p>Font Size</p>
                <p>Reciter</p>
                <p>...More coming soon</p>
              </div>
            </> */}