"use client";
import { fetchAllSurahs, searchQuran } from "@/api/api";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import SearchIcon from "@/components/svg/SearchIcon";
import SignInPopup from "@/components/popups/SignInPopup";
import LogoIcon from "@/components/svg/LogoIcon";
import { useRouter } from "next/navigation";
import SearchResultCard from "@/components/sidebar/SearchResultCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SearchInput from "@/components/sidebar/SearchInput";
import MenuIcon from "@/components/svg/MenuIcon";
import Hills from "@/components/svg/illustrations/Hills";
import SingleHill from "@/components/svg/illustrations/SingleHill";
import ScrollingAyah from "@/components/ScrollingAyahs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const SurahsList = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [recent, setRecent] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { openUserProfile } = useClerk();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "search">("overview");

  useEffect(() => {
    const func = async () => {
      const resA = await fetchAllSurahs();
      setSurahs(resA.data);
      {
        /* console.log(response.data) */
      }
      const resB = localStorage.getItem("recent");
      // setRecent(resB ? JSON.parse(resB));
      if (resB) {
        const parsedRecent = JSON.parse(resB);
        setRecent(parsedRecent);
      } else {
        console.log("No recent data found");
      }
    };
    func();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await searchQuran(searchQuery);
        setSearchResults(res.data.matches); // Adjust this depending on your API response
        // Debug statement removed for production
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Search error:", err.message);
        } else {
          console.error("Search error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSearchResults, 300); // debounce 300ms
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <>
      <div className="sticky top-0 z-50 h-16 w-full backdrop-blur-md bg-transparent border-b border-[#262629ff] flex items-center justify-between px-4">
        <LogoIcon className="text-white hidden md:block" />
        {/* Menu Icon for small screens */}
        <div className="sm:hidden flex items-center">
          <MenuIcon
            className="text-white"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>

        {/* Sheet for Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <VisuallyHidden>
            <SheetTitle>Menu</SheetTitle>
            <SheetHeader>Glenue</SheetHeader>
          </VisuallyHidden>
          <SheetContent className="px-2 py-2">
            <div className="w-full flex items-center justify-center">
              <div className="flex w-full justify-center items-center gap-4 pt-6 border-b border-[#262629ff] pb-2">
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
                <SearchInput
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <div className="flex flex-col gap-8 items-center scrollable-container">
                  {searchResults.length > 0 ? (
                    searchResults
                      .slice(0)
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
              </>
            )}

            {activeTab === "overview" && (
              <Link
                href="/support"
                className="px-5 py-2 bg-blue-500 hover:bg-zinc-700 text-white rounded-xl text-sm font-medium transition"
              >
                Support Us ♥
              </Link>
            )}
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex absolute left-1/2 -translate-x-1/2 gap-6 text-gray-200 text-sm">
          <span className="cursor-pointer hover:text-gray-300 transition text-white">
            Home
          </span>
          <span
            className="cursor-pointer hover:text-gray-300 transition"
            onClick={() => router.push("/surah/1")}
          >
            Read Quran
          </span>
          <span
            className="cursor-pointer hover:text-gray-300 transition"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Go to Ayah
          </span>
          <span
            className="cursor-pointer hover:text-gray-300 transition"
            onClick={() => openUserProfile()}
          >
            Profile
          </span>
          <span
            className="cursor-pointer hover:text-gray-300 transition"
            onClick={() => {
              setActiveTab("overview");
              setIsOpen(true);
            }}
          >
            Overview
          </span>
        </nav>

        {/* Support Us Button */}
        {/* <Link
          href="/support"
          className="px-5 py-2 bg-blue-500 hover:bg-zinc-700 text-white rounded-xl text-sm font-medium transition"
          >
          Support Us ♥
          </Link> */}

        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link
            href="/sign-up"
            className="px-5 py-2 bg-blue-500 hover:bg-zinc-700 text-white rounded-xl text-sm font-medium transition"
          >
            Sign in
          </Link>
        </SignedOut>
      </div>

      <div className="w-full flex-items-center flex-col flex-1 text-white ">
        <div className="w-full min-h-[calc(100vh-64px)] flex flex-col justify-between bg-gradient-radial from-zinc-300 via-zinc-400 to-zinc-500">
          <div className="w-full px-4 flex flex-col items-center pt-32">
            <h1 className="md:text-6xl text-4xl font-bold text-center !font-serif">
              QuranNet
            </h1>

            <div className="rounded-full border border-[#262629ff] bg-[#18181B] lg:w-116 sm:w-96 w-full h-16 flex items-center justify-center my-5 relative p-4 ">
              <SearchIcon />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setIsOpen(true)}
                placeholder="Search the Quran"
                className="border-0 ml-4 focus-visible:ring-0 h-full !bg-transparent !shadow-none"
              />
            </div>

            <div
              className="flex flex-wrap justify-center gap-3 bg-transparent 
                w-[calc(100%+1rem)] sm:w-[28rem] lg:w-[30rem] 
                sm:flex-row flex-col items-stretch mt-4 px-4"
            >
              {["Al-Mulk", "Al-Baqara", "An-Nisaa", "Al-Faatiha"].map(
                (sura) => (
                  <Link
                    key={sura}
                    href="surah/1"
                    className="bg-[#18181B] text-center rounded-full px-4 py-2 flex justify-center items-center"
                  >
                    {sura}
                  </Link>
                )
              )}
            </div>
          </div>
          <ScrollingAyah />

          <SingleHill />
        </div>

        <SignInPopup />

        {/* seperator */}
        <div className="w-full flex sm:flex-row flex-col flex-wrap md:gap-6 gap-5 justify-center px-4 mb-12 bg-[#0F0F0F] pb-12 rounded-b-3xl border-b-4 border-gray-600">
          {isSignedIn && recent ? (
            <div className="mb-8 w-full flex flex-col gap-3 items-center">
              <div className="md:w-80 sm:w-64 w-full min-h-24 h-auto bg-gradient-to-r from-blue-500 to-blue-400 border-2 dark:border-[#262629ff] border-gray-400 rounded-xl p-4 cursor-pointer transition-discrete transition-all duration-300 border rounded-lg text-gray-400 flex flex-col justify-between text-white">
                <p className="text-white text-2xl pb-2 text-left font-open-sans">
                  Continue Reading
                </p>
                <Link href={`/surah/${recent.number}`} key={recent.number}>
                  <div className="flex w-full justify-between text-sm">
                    <p className="text-lg font-semibold">
                      {recent.englishName}
                    </p>
                    <p>{recent.number}</p>
                  </div>

                  <div className="flex w-full justify-between text-sm">
                    <p>{recent.englishNameTranslation}</p>
                    <p>{recent.numberOfAyahs} Ayahs</p>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center text-xl bg-black rounded-xl text-gray-200 w-full">
              <p>
                <Link
                  href={isSignedIn ? "/surah/1" : "/sign-in"}
                  className="text-blue-500"
                >
                  {isSignedIn ? "Visit a surah" : "Sign in"}
                </Link>{" "}
                to unlock your reading history.
              </p>
            </div>
          )}
          {surahs.map((surah: Surah) => (
            <Link href={`/surah/${surah.number}`} key={surah.number}>
              <div className="group lg:w-116 md:w-96 sm:w-64 w-full min-h-24 h-auto bg-zinc-900 border dark:border-[#262629ff] border-gray-400 rounded-xl p-4 cursor-pointer transition-discrete transition-all duration-100 border rounded-lg text-gray-400 flex hover:brightness-110">
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 w-full">
                  <div className="group-hover:bg-blue-500 w-10 h-10 rounded-xl bg-black/45 flex justify-center items-center rotate-45 transition-all duration-100">
                    <p className="-rotate-45 text-white text-sm font-bold">
                      {surah.number}
                    </p>
                  </div>

                  <div className="flex flex-col text-sm flex-1">
                    <p className="text-lg font-semibold dark:text-white text-black">
                      {surah.englishName}
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {surah.englishNameTranslation}
                    </p>
                  </div>

                  <div className="text-right text-sm text-zinc-600 dark:text-zinc-400 min-w-[80px]">
                    <p>{surah.numberOfAyahs} Ayahs</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* move up later */}

        <Hills />
        <footer className="w-full min-h-32 pb-8 flex flex-col px-4 sm:px-6 items-center bg-[#18181B] text-white">
          <div className="flex flex-col md:flex-row flex-wrap justify-center w-full lg:px-32 gap-4">
            {/* Column 1 */}
            <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col gap-5">
              <div className="flex gap-3 items-center">
                <LogoIcon />
                <div className="flex flex-col">
                  <p className="font-bold">QuranNet</p>
                  <p className="text-gray-200 text-[12px]">
                    Read, and Study The Quran
                  </p>
                </div>
              </div>
              <p className="text-sm">
                QuranNet is providing free, easy, and ad-free access to the Holy
                Quran — beautifully designed, always available, and built with
                love for every heart.
              </p>
              <p className="text-xl">
                <SignOutButton />
              </p>
            </div>

            {/* Column 2 */}
            <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col gap-2">
              <p className="text-gray-400 font-semibold">Quick Navigation</p>
              <div className="text-gray-200 underline space-y-1">
                <p onClick={() => openUserProfile()} className="cursor-pointer">
                  Profile
                </p>
                <p>
                  <Link href="/surah/1" target="_blank">
                    Start reading
                  </Link>
                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col gap-2">
              <p className="text-gray-400 font-semibold">Quick Links</p>
              <div className="text-gray-200 underline space-y-1">
                <p>
                  <Link
                    href="https://github.com/s1ddiq/Qurannet"
                    target="_blank"
                  >
                    QuranNet GitHub
                  </Link>
                </p>
                <p>
                  <Link href="/surah/1" target="_blank">
                    Start reading
                  </Link>
                </p>
              </div>
            </div>

            {/* Column 4 */}
            <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col gap-2">
              <p className="text-gray-400 font-semibold">Latest News</p>
              <div className="text-gray-200 underline">
                <p>
                  <Link
                    href="https://github.com/s1ddiq/QuranNet/releases/tag/v1.0.0"
                    target="_blank"
                  >
                    v1.0.0 Latest Release
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SurahsList;
