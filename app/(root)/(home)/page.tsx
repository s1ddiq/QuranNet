"use client";
// Other -/-Essential Imports ⭐
import React, { useEffect, useState } from "react";
// API ⭐
import { fetchAllSurahs, searchQuran } from "@/api/api";
// Next ⭐
import Link from "next/link";
// Clerk ⭐
import {
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/nextjs";
// Components ⭐
import SearchIcon from "@/components/svg/SearchIcon";
import SignInPopup from "@/components/popups/SignInPopup";
import LogoIcon from "@/components/svg/LogoIcon";
import { useRouter } from "next/navigation";
import SearchResultCard from "@/components/sidebar/SearchResultCard";
import SearchInput from "@/components/sidebar/SearchInput";
import Hills from "@/components/svg/illustrations/Hills";
import SingleHill from "@/components/svg/illustrations/SingleHill";
import ScrollingAyah from "@/components/ScrollingAyahs";
// ShadCN ⭐
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

// Icons / Lucide React ⭐
import MenuIcon from "@/components/svg/MenuIcon";
import { X } from "lucide-react";
// Hooks ⭐
import useSurahNavigation from "@/hooks/useSurahNavigation";
// Fonts ⭐
import { amiri } from "@/app/fonts";
import MobileSheet from "@/components/sidebar/MobileSheet";

const SurahsList = () => {
  // organize later
  // -ROUTER-
  const router = useRouter();
  // USE STATES Data: 🔹
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [recent, setRecent] = useState<any>(); // ‼ ☹
  const [deletedAyah, setDeletedAyah] = useState<Ayah>();
  const [savedAyahs, setSavedAyahs] = useState<Ayah[]>(); // ‼ ☹

  // USE STATES States: 🔹
  // Active: 🟥
  const [isOpen, setIsOpen] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<
    "overview" | "search"
  >("search");
  const [activeSection, setActiveSection] = useState<
    "Last Read" | "Saved" | "Collections"
  >("Last Read");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [amount, setAmount] = useState(21);
  // USE STATES Clerk 🔹

  // USE STATEs essentials 🔹
  const { isSignedIn } = useUser();
  const { openUserProfile } = useClerk();
  // Boolean 🔹
  const [loading, setLoading] = useState(false);
  // Hooks 🔹
  const { getSurahNumber } = useSurahNavigation();

  // FETCH HOOK FOR SURAHS, RECENT, SAVED AYAHS!
  useEffect(() => {
    const func = async () => {
      const resA = await fetchAllSurahs(); //
      const resB = localStorage.getItem("recent");
      const resC = localStorage.getItem("saved-ayahs");
      setSurahs(resA.data);
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

  // HANDLE remove Saved Ayahs
  const handleRemoveSavedAyah = (ayah: Ayah) => {
    const saved = savedAyahs ?? []; // use current state, fallback if needed
    const updated = saved.filter((a: Ayah) => a.number !== ayah.number);

    localStorage.setItem("saved-ayahs", JSON.stringify(updated));
    setSavedAyahs(updated); // <- update the state too
    setDeletedAyah(ayah);
  };

  return (
    <>
      {/* <div className="w-full h-44 bg-[var(--sephia-700)]"></div> */}
      <MobileSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        surahs={surahs}
      />

      <div className="sticky top-0 z-50 h-16 w-full backdrop-blur-md bg-transparent border-b border-[#262629ff] hidden md:flex items-center justify-between xl:px-64 lg:px-24 px-4">
        <LogoIcon className="dark:text-white text-[var(--sephia-700)] hidden md:block" />
        <div className="sm:hidden flex items-center">
          <MenuIcon
            className="dark:text-white text-[var(--sephia-700)]"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>

        {/* Sheet for Mobile Menu */}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-6 text-gray-200 text-sm">
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

        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link
            href="/sign-in"
            className="px-5 py-2 dark:bg-blue-500 bg-[var(--sephia-700)] hover:bg-zinc-700 text-white rounded-xl text-sm font-medium transition"
          >
            Sign in
          </Link>
        </SignedOut>
      </div>

      <div className="w-full flex-items-center flex-col flex-1 text-white ">
        <div className="w-full min-h-[calc(100vh-64px)] flex flex-col justify-between dark:bg-black bg-[var(--sephia-primary)]">
          <div className="w-full px-4 flex flex-col items-center pt-32 space-y-6">
            <h1 className="md:text-6xl text-4xl font-bold text-center !font-serif dark:text-white text-black">
              QuranNet
            </h1>

            <div className="rounded-full dark:border border-[#262629ff] dark:bg-[#18181B] bg-[var(--sephia-700)] lg:w-116 sm:w-96 w-full h-16 flex items-center justify-center my-4 relative p-4 ">
              <SearchIcon />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setIsOpen(true)}
                placeholder="Search the Quran"
                className="border-0 ml-4 focus-visible:ring-0 h-full !bg-transparent !shadow-none !text-white"
              />
            </div>

            <div
              className="flex flex-wrap justify-between items-center sm:justify-center gap-3 bg-transparent 
                w-[calc(100%+1rem)] sm:w-[28rem] lg:w-[30rem] 
                sm:flex-row items-stretch sm:mt-4 px-2"
            >
              {["Al-Mulk", "Al-Baqara", "An-Nisaa"].map(
                (
                  surah // rename to surah
                ) => (
                  <Link
                    key={surah}
                    href={`/surah/${getSurahNumber(surah)}`} // map to surah name later
                    className="dark:bg-[#18181B] bg-[var(--sephia-700)] text-center rounded-full px-4 py-2 flex justify-center items-center"
                  >
                    {surah}
                  </Link>
                )
              )}
            </div>

            <div className="mt-4 w-full dark:bg-blue-600 bg-[var(--sephia-700)] text-white rounded-xl p-6 sm:hidden flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-center">
                  Join Our Community
                </h2>
                <p className="text-center">
                  Sign up to track your reading progress and save your favorite
                  ayahs.
                </p>
              </div>
              {/* <Link
                href="/sign-up"
                className="dark:bg-white bg-[var(--sephia-300)] text-[var(--sephia-400)] dark:text-blue-600 px-4 py-2 rounded-full"
              >
                Get Started
              </Link> */}
            </div>
          </div>
          <ScrollingAyah />

          <SingleHill />
        </div>

        <SignInPopup />

        <div className="w-full xl:px-64 lg:px-24 px-4 dark:bg-[#0F0F0F] bg-[var(--sephia-200)] pb-12">
          <div className="text-base flex md:flex-row flex-col gap-4 justify-between">
            <p
              className="dark:text-white text-black text-2xl pb-2 text-left font-open-sans cursor-pointer"
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

            <div className="dark:bg-zinc-900 bg-[var(--sephia-700)] flex rounded-full p-2 md:text-base text-sm mb-6">
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

          <div className="min-h-32">
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
              <div className="flex flex-wrap w-full gap-5">
                {savedAyahs && savedAyahs.length > 0 ? (
                  savedAyahs.slice(0, 5).map(
                    (
                      ayah: Ayah // destructure later
                    ) => (
                      <div
                        key={ayah.number}
                        className={cn(
                          "min-h-12 lg:w-fit w-full rounded-xl bg-zinc-900 border border-[#262629ff] p-4 relative",
                          deletedAyah?.number === ayah.number ? "hidden" : ""
                        )}
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
                  )
                ) : (
                  <div>
                    <p className="text-xl text-gray-200 hover:text-gray-100 text-center">
                      No saved ayahs
                      <Link href="/surah/1" className="text-blue-500 text-lg">
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
        <div className="w-full grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 dark:bg-[#0F0F0F] bg-[var(--sephia-200)] gap-3 xl:px-64 lg:px-24 px-4 lg:pt-24">
          {surahs.slice(0, amount).map((surah: Surah) => (
            <Link href={`/surah/${surah.number}`} key={surah.number}>
              <div className="group min-h-12 dark:bg-zinc-900 bg-[var(--sephia-300)] dark:border border-[#262629ff] rounded-xl px-4 py-2 cursor-pointer transition-discrete text-gray-400 flex hover:brightness-110">
                <div className="flex items-center justify-between gap-3 px-2 py-4 rounded-xl w-full">
                  <div className="group-hover:bg-blue-500 size-8 rounded-md dark:bg-black/45 bg-[var(--sephia-700)] flex justify-center items-center rotate-45">
                    <p className="-rotate-45 text-white text-sm font-bold">
                      {surah.number}
                    </p>
                  </div>

                  <div className="flex flex-col text-sm flex-1">
                    <p className="font-semibold dark:text-white text-black">
                      {surah.englishName}
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      {surah.englishNameTranslation}
                    </p>
                  </div>

                  <p
                    className={`${amiri.className} text-sm leading-relaxed tracking-wide dark:text-white text-black`}
                  >
                    {surah.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-full flex justify-center dark:bg-[#0F0F0F] bg-[var(--sephia-200)] py-6">
          <div className="dark:bg-zinc-900 bg-[var(--sephia-700)] rounded-md shadow-lg px-4 py-2 flex items-center border border-gray-700">
            <button
              className={`
        relative overflow-hidden rounded-md
        px-5 py-2 text-sm font-medium
        transition
        before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-blue-500 before:to-purple-600
        before:opacity-0 before:scale-90 before:transition-all
        hover:before:opacity-30 hover:before:scale-100
        text-white
      `}
              onClick={() => (amount < 22 ? setAmount(114) : setAmount(21))}
            >
              {amount < 22 ? "Show More ⬇" : "Show Less ⬆"}
            </button>
          </div>
        </div>

        {/* move up later */}

        <Hills />
        <footer className="w-full min-h-32 pb-8 flex flex-col px-4 sm:px-6 items-center dark:bg-[#18181B] bg-var(--sephia-primary)] text-white">
          <div className="flex flex-col md:flex-row flex-wrap justify-center w-full lg:px-32 gap-4">
            {/* Column 1 */}
            {/* Column 1 */}
            <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col gap-5">
              <div className="flex gap-3 items-center">
                <LogoIcon className="dark:text-[var(--sephia-200)] text-[var(--sephia-800)]" />
                <div className="flex flex-col">
                  <p className="font-bold dark:text-[var(--sephia-100)] text-[var(--sephia-900)]">
                    QuranNet
                  </p>
                  <p className="text-[12px] dark:text-[var(--sephia-300)] text-[var(--sephia-600)]">
                    Read, and Study The Quran
                  </p>
                </div>
              </div>
              <p className="text-sm dark:text-[var(--sephia-200)] text-[var(--sephia-800)]">
                QuranNet is providing free, easy, and ad-free access to the Holy
                Quran — beautifully designed, always available, and built with
                love for every heart.
              </p>
              <UserButton />
            </div>

            {/* Column 2 */}
            <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col gap-2">
              <p className="font-semibold dark:text-[var(--sephia-300)] text-[var(--sephia-600)]">
                Quick Navigation
              </p>
              <div className="underline space-y-1 dark:text-[var(--sephia-200)] text-[var(--sephia-800)]">
                <p
                  onClick={() => openUserProfile()}
                  className="cursor-pointer dark:hover:text-[var(--sephia-100)] hover:text-[var(--sephia-700)] transition"
                >
                  Profile
                </p>
                <p>
                  <Link
                    href="/surah/1"
                    target="_blank"
                    className="dark:hover:text-[var(--sephia-100)] hover:text-[var(--sephia-700)] transition"
                  >
                    Start reading
                  </Link>
                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col gap-2">
              <p className="font-semibold dark:text-[var(--sephia-300)] text-[var(--sephia-600)]">
                Quick Links
              </p>
              <div className="underline space-y-1 dark:text-[var(--sephia-200)] text-[var(--sephia-800)]">
                <p>
                  <Link
                    href="https://github.com/s1ddiq/Qurannet"
                    target="_blank"
                    className="dark:hover:text-[var(--sephia-100)] hover:text-[var(--sephia-700)] transition"
                  >
                    QuranNet GitHub
                  </Link>
                </p>
                <p>
                  <Link
                    href="/surah/1"
                    target="_blank"
                    className="dark:hover:text-[var(--sephia-100)] hover:text-[var(--sephia-700)] transition"
                  >
                    Start reading
                  </Link>
                </p>
              </div>
            </div>

            {/* Column 4 */}
            <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col gap-2">
              <p className="font-semibold dark:text-[var(--sephia-300)] text-[var(--sephia-600)]">
                Latest News
              </p>
              <div className="underline dark:text-[var(--sephia-200)] text-[var(--sephia-800)]">
                <p>
                  <Link
                    href="https://github.com/s1ddiq/QuranNet/releases/tag/v1.0.0"
                    target="_blank"
                    className="dark:hover:text-[var(--sephia-100)] hover:text-[var(--sephia-700)] transition"
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
