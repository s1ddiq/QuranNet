"use client";
import { fetchAllSurahs, searchQuran } from "@/api/api";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
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
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import useSurahNavigation from "@/hooks/useSurahNavigation";

const SurahsList = () => {
  // organize later
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [recent, setRecent] = useState<any>(); // ‼ ☹
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { openUserProfile } = useClerk();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<
    "overview" | "search"
  >("search");
  const [activeSection, setActiveSection] = useState<
    "Last Read" | "Saved" | "Collections"
  >("Last Read");
  const [amount, setAmount] = useState(21);
  const [deletedAyah, setDeletedAyah] = useState<Ayah>()
  const [savedAyahs, setSavedAyahs] = useState<Ayah[]>(); // ‼ ☹
  const {getSurahNumber} = useSurahNavigation();

  useEffect(() => {
    const func = async () => {
      const resA = await fetchAllSurahs();
      setSurahs(resA.data);
      const resB = localStorage.getItem("recent");
      const resC = localStorage.getItem("saved-ayahs");
      if (resB && resC) {
        const parsedRecent = JSON.parse(resB);
        const parsedSaved = JSON.parse(resC);
        setRecent(parsedRecent);
        setSavedAyahs(parsedSaved);
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

  const handleRemoveSavedAyah = (ayah: Ayah) => {
    const saved = savedAyahs ?? []; // use current state, fallback if needed
    const updated = saved.filter((a: Ayah) => a.number !== ayah.number);
  
    localStorage.setItem("saved-ayahs", JSON.stringify(updated));
    setSavedAyahs(updated); // <- update the state too
    setDeletedAyah(ayah);
  };
  

  return (
    <>
      <div className="sticky top-0 z-50 h-16 w-full backdrop-blur-md bg-transparent border-b border-[#262629ff] flex items-center justify-between xl:px-32 lg:px-24 px-4">
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
                  onClick={() => setActiveSidebarTab("search")}
                  className={`cursor-pointer ${
                    activeSidebarTab === "search"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  Search
                </p>

                <p
                  onClick={() => setActiveSidebarTab("overview")}
                  className={`cursor-pointer ${
                    activeSidebarTab === "overview"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  Overview
                </p>
              </div>
            </div>

            {activeSidebarTab === "search" && (
              <>
                <SearchInput
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <div className="flex flex-col gap-8 items-center scrollable-container">
                  {searchResults.length > 0 ? (
                    searchResults.map((result: SearchResult, index) => (
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

            {activeSidebarTab === "overview" && (
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
              setActiveSidebarTab("overview");
              setIsOpen(true);
            }}
          >
            Overview
          </span>
        </nav>

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
            href="/sign-in"
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
                (sura) => ( // rename to surah
                  <Link
                    key={sura}
                    href={`/surah/${getSurahNumber(sura)}`}// map to surah name later
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
        {/* w-full flex sm:flex-row flex-col flex-wrap md:gap-6 gap-5 justify-center px-4 mb-12 bg-[#0F0F0F] pb-12 rounded-b-3xl border-b-4 border-gray-600 */}

        <div className="w-full xl:px-32 lg:px-24 px-4 bg-[#0F0F0F] pb-24">
          <div className="text-base flex md:flex-row flex-col gap-4 justify-between">
            <p
              className="text-white text-2xl pb-2 text-left font-open-sans cursor-pointer"
              onClick={!isSignedIn ? () => router.push("/sign-in") : () => {}}
            >
              {!isSignedIn
                ? "Sign in to unlock this feature 🔒"
                : activeSection === "Last Read"
                ? "Continue Reading"
                : activeSection === "Saved"
                ? "Your saved"
                : activeSection === "Collections"
                ? "Your Collections"
                : ""}
            </p>

            <div className="bg-zinc-900 flex rounded-full p-2 md:text-base text-sm mb-6">
              {["Last Read", "Saved", "Collections"].map((section) => (
                <p
                  key={section}
                  onClick={() =>
                    setActiveSection(section as typeof activeSection)
                  }
                  className={cn(
                    "cursor-pointer py-2 md:w-auto md:px-6 text-center w-1/3 rounded-full",
                    activeSection === section
                      ? "text-blue-500 bg-black/45"
                      : "text-white"
                  )}
                >
                  {section}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:min-h-48 min-h-32">
            {isSignedIn && activeSection === "Last Read" && recent && (
              <div className="md:w-80 sm:w-64 w-full min-h-24 h-auto bg-gradient-to-r from-blue-500 to-blue-400 border-2 dark:border-[#262629ff] rounded-xl p-4 cursor-pointer text-gray-400 flex flex-col justify-between text-white hover:scale-105 transition-all duration-100">
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
            )}

            {isSignedIn && activeSection === "Saved" && (
              // <div>
              //   <p className="text-xl">😢</p>
              //   <p className="text-gray-200 hover:text-gray-100">
              //     We're sorry, but saving surahs is currently unavailable. We're
              //     actively working to bring this feature to you as soon as
              //     possible.{" "}
              //     <Link
              //       href="https://github.com/s1ddiq/QuranNet"
              //       className="text-blue-500 text-lg"
              //     >
              //       Learn More
              //     </Link>
              //   </p>
              // </div>
              <div className="flex flex-wrap w-full gap-5">
                {savedAyahs && savedAyahs.length > 0 ? savedAyahs.slice(0, 5).map(
                  (
                    ayah: Ayah // destructure later
                  ) => (
                    <div
                      key={ayah.number}
                      className={cn('min-h-12 lg:w-fit w-full rounded-xl bg-zinc-900 border border-[#262629ff] p-4 relative', deletedAyah?.number === ayah.number ? 'hidden' : '')}
                    >
                      <Link
                        href={`surah/${ayah.surahNumber}?ayah=${ayah.numberInSurah}`}
                      >
                        <p className="text-lg">{ayah.text}</p>
                        <p className="text-gray-400">{ayah.translation}</p>
                        <div className="flex justify-between">
                          <div className="bg-black/45 p-[8px] rounded-full w-fit">
                            {ayah.surahNumber}:{ayah.numberInSurah}
                          </div>
                        </div>
                      </Link>
                      <X
                        className="text-blue-500 cursor-pointer absolute right-4 top-4"
                        onClick={() => handleRemoveSavedAyah(ayah)}
                        size={24}
                      />
                    </div>
                  )
                ) : (
                  <div>
                  <p className="text-xl text-gray-200 hover:text-gray-100 text-center">
                   No saved ayahs
                    <Link
                      href="/surah/1"
                      className="text-blue-500 text-lg"
                    >
                      &nbsp;Start Reading
                    </Link>
                  </p>
                </div>
                )}

                <div className="w-full rounded-full p-2 flex justify-center items-center">
                  <Link
                    href="/saved"
                    className="bg-zinc-900 border border-gray-400 text-white rounded-full px-8 py-2 w-44 text-center flex justify-center items-center"
                  >
                    View All Saved
                  </Link>
                </div>
              </div>
            )}

            {isSignedIn && activeSection === "Collections" && (
              <div>
                <p className="text-xl">😢</p>
                <p className="text-gray-200 hover:text-gray-100">
                  We're sorry, but the Collections is currently unavailable.
                  We're actively working to bring this feature to you as soon as
                  possible.{" "}
                  <Link
                    href="https://github.com/s1ddiq/QuranNet"
                    className="text-blue-500 text-lg"
                  >
                    Learn More
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 bg-[#0F0F0F] gap-6 xl:px-32 lg:px-24 px-4 lg:pt-24">
          {surahs.slice(0, amount).map((surah: Surah) => (
            <Link href={`/surah/${surah.number}`} key={surah.number}>
              <div className="group min-h-24 bg-zinc-900 border dark:border-[#262629ff] border-gray-400 rounded-xl p-4 cursor-pointer transition-discrete transition-all duration-100 text-gray-400 flex hover:brightness-110">
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
        <div className="w-full flex-center pt-8">
          <div className="bg-zinc-900 w-44 min-h-8 flex-center rounded-full py-2">
            <button
              className="text-white bg-black/45 rounded-full py-2 px-8"
              onClick={() => (amount < 22 ? setAmount(114) : setAmount(21))}
            >
              {amount < 22 ? "Show More ⬇" : "Show Less ⬆"}
            </button>
          </div>
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
                <UserButton />
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
