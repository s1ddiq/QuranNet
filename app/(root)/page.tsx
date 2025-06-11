"use client";
// Other -/-Essential Imports ⭐
import React, { useEffect, useState } from "react";
// API ⭐
import { fetchAllSurahs } from "@/api/api";
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
import SearchIcon from "@/components/svg/icons/SearchIcon";
import SignInPopup from "@/components/popups/SignInPopup";
import LogoIcon from "@/components/svg/icons/LogoIcon";
import { useRouter } from "next/navigation";
import Hills from "@/components/svg/illustrations/Hills";
import Hill from "@/components/svg/illustrations/Hill";
import ScrollingAyah from "@/components/ScrollingAyahs";
// ShadCN ⭐
import { cn } from "@/lib/utils";

// Icons / Lucide React ⭐
import MenuIcon from "@/components/svg/icons/MenuIcon";
import { X } from "lucide-react";
// Hooks ⭐
import useSurahNavigation from "@/hooks/useSurahNavigation";
// Fonts ⭐
import { amiri, inter } from "@/app/fonts";
import MobileSheet from "@/components/sidebar/MobileSheet";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
  const [activeSection, setActiveSection] = useState<
    "Last Read" | "Saved" | "Collections"
  >("Last Read");

  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [searchResults, setSearchResults] = useState([]);
  const [amount, setAmount] = useState(21);
  // USE STATES Clerk 🔹

  // USE STATEs essentials 🔹
  const { isSignedIn } = useUser();
  const { openUserProfile } = useClerk();
  // Boolean 🔹
  // const [loading, setLoading] = useState(false);
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
        // console.log(parsedRecent);
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

      <div className="sticky top-0 z-50 h-16 w-full backdrop-blur-md bg-transparent border-b border-[#262629ff] hidden md:flex items-center justify-between xl:px-48 lg:px-24 px-4">
        <LogoIcon className="dark:text-white text-black hidden md:block" />
        <div className="sm:hidden flex items-center">
          <MenuIcon
            className="dark:text-white text-black"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>

        {/* Sheet for Mobile Menu */}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-6 text-[var(--gray-100)] text-sm">
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
            className="px-5 py-2 dark:bg-blue-500  hover:bg-zinc-700 text-white rounded-xl text-sm font-medium transition"
          >
            Sign in
          </Link>
        </SignedOut>
      </div>

      <div className="w-full flex-items-center flex-col flex-1 text-white ">
        <div className="w-full min-h-[calc(100vh-64px)] flex flex-col justify-between dark:bg-black bg-white">
          <div className="w-full px-4 flex flex-col justify-center items-center space-y-6 h-[calc(100vh-64px)]">
            <div className="relative">
              <div
                className="w-[450px] h-[300px] absolute left-1/2 -translate-x-1/2 -top-20"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)",
                  maskImage:
                    "radial-gradient(ellipse at center, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 100%)",
                }}
              >
                <Image
                  src="/images/bg.png"
                  alt="bg"
                  width={1200}
                  height={1200}
                  className="object-cover w-full h-full"
                />
              </div>

              <h1
                className={`${inter.className} md:text-6xl text-4xl font-semibold text-center dark:text-white text-black`}
              >
                Read. Reflect. Recite.
              </h1>
              <p className="md:text-6xl text-4xl font-semibold text-center text-[var(--gray-100)]">
                A journey through the Holy Quran.
              </p>
            </div>
          </div>

          <div className={`${inter.className}  xl:px-48 lg:px-24 px-4`}>
            <div className=" w-full grid md:grid-cols-2 grid-cols-1 gap-5">
              {/* READ */}
              <div className="flex justify-center flex-col order-2 md:order-1">
                <p className="text-3xl">Easy Reading</p>
                <p className="text-[var(--gray-100)] text-xl">
                  Navigate through content quickly and effortlessly with a
                  clean, distraction-free layout designed to enhance focus and
                  understanding.
                </p>
              </div>
              <div className="flex md:justify-end justify-center order-1 md:order-2">
                <Image
                  src="/svg/book4.svg"
                  alt="Book with Tasbih"
                  width={356}
                  height={356}
                  className="object-cover md:ml-12 dark:text-blue-300 text-blue-500"
                />
              </div>
            </div>

            {/* REFLECT */}

            <div className=" w-full grid md:grid-cols-2 grid-cols-1 gap-5">
              <Image
                src="/svg/book2.svg"
                alt="Book with Button Lock"
                width={356}
                height={356}
                className="object-cover order-1 md:order-2"
              />
              <div className="flex justify-center flex-col order-1 md:order-2">
                <p className="text-3xl">Saved Reflections</p>
                <p className="text-[var(--gray-100)] text-xl">
                  Signed-in users can save verses or revisit recent surahs
                  anytime. Reflect deeply by returning to what matters most,
                  whenever you need.
                </p>
              </div>
            </div>

            {/* RECITE */}

            <div className=" w-full grid md:grid-cols-2 grid-cols-1 gap-5">
              <div className="flex justify-center flex-col order-2 md:order-1">
                <p className="text-3xl">Recite with Ease</p>
                <p className="text-[var(--gray-100)] text-xl">
                  Follow along with clear audio and text to improve your
                  recitation. Designed to help you build confidence and fluency,
                  one verse at a time.
                </p>
              </div>
              <div className="flex md:justify-end justify-center order-1 md:order-2">
                <Image
                  src="/svg/book3.svg"
                  alt="Person Holding Open Book"
                  width={356}
                  height={356}
                  className="object-cover order-1 md:order-2 md:ml-12"
                />
              </div>
            </div>
          </div>
        </div>

        <SignInPopup />

        <div className="w-full xl:px-48 lg:px-24 px-4 bg-black pb-12">
          <div className="text-base flex md:flex-row flex-col gap-4 justify-between mt-16">
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

            <div className="border border-[#262629ff] flex rounded-md p-2 md:text-base text-sm mb-6 ">
              {["Last Read", "Saved", "Collections"].map((section) => (
                <p
                  key={section}
                  onClick={() =>
                    setActiveSection(section as typeof activeSection)
                  }
                  className={cn(
                    "cursor-pointer py-2 md:w-auto md:px-6 text-center w-1/3 rounded-md",
                    activeSection === section
                      ? "text-black bg-[var(--gray-100)]"
                      : "text-[var(--gray-100)]"
                  )}
                >
                  {section}
                </p>
              ))}
            </div>
          </div>

          <div className="min-h-32">
            {isSignedIn && activeSection === "Last Read" && recent && (
              <div className="md:w-80 sm:w-64 w-full min-h-24 h-auto bg-gradient-to-r from-blue-500 to-blue-400 border-2 dark:border-[#262629ff] rounded-xl p-4 cursor-pointer flex flex-col justify-between text-white hover:scale-105 transition-all duration-100">
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
                  {/* <Link
                    href="/saved"
                    className="bg-zinc-900 border border-gray-400 text-white rounded-full px-8 py-2 w-44 text-center flex justify-center items-center"
                  >
                    View All Saved
                  </Link> */}
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
        <div
          className={`w-full grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 bg-black gap-3 xl:px-48 lg:px-24 px-4 lg:pt-24 ${inter.className}`}
        >
          {surahs.slice(0, amount).map((surah: Surah) => (
            <Link href={`/surah/${surah.number}`} key={surah.number}>
              <div className="border border-[#262629ff] group cursor-pointer rounded-md backdrop-blur-md px-4 py-4 shadow-md transition-all duration-200 ease-in-out hover:scale-[1.01] hover:shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <div className="size-8 rounded-sm border border-[#262629ff] flex justify-center items-center rotate-45 transition-all group-hover:bg-blue-500 dark:group-hover:bg-blue-500">
                    <p className="-rotate-45 text-white text-sm font-bold">
                      {surah.number}
                    </p>
                  </div>

                  <div className="flex flex-col flex-1 space-y-0.5 text-sm">
                    <p className="font-semibold text-white">
                      {surah.englishName}
                    </p>
                    <p className="text-xs text-[var(--gray-100)]">
                      {surah.englishNameTranslation}
                    </p>
                  </div>

                  <p className={`surah-font text-sm text-white tracking-wide`}>
                    {surah.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-full flex justify-center bg-black pb-16 pt-6">
          <Button
            onClick={() => (amount < 22 ? setAmount(114) : setAmount(21))}
            className="px-5 py-2 dark:bg-blue-500 bg-[var(--sephia-700)] hover:bg-zinc-700 text-white rounded-xl text-sm font-medium transition"
          >
            {amount < 22 ? "Expand" : "Collapse"}
          </Button>
        </div>

        {/* <Hills /> */}
        <footer className="w-full min-h-32 flex flex-col px-4 sm:px-6 items-center bg-black text-white border-t border-[#262629ff]">
          <div className="relative w-full">
            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70 pointer-events-none z-0" />

            <div className="relative z-10 flex flex-col md:flex-row justify-center py-12 w-full xl:px-48 lg:px-24 px-4 gap-4">
              {/* Column 1 */}
              <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-5 md:items-start items-center">
                <div className="flex gap-3 items-center">
                  <LogoIcon className="text-white" />
                  <div className="flex flex-col">
                    <p className="font-bold text-white">QuranNet</p>
                    <p className="text-[12px] text-gray-400">
                      Read, and Study The Quran
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white">
                  QuranNet is providing free, easy, and ad-free access to the
                  Holy Quran — beautifully designed, always available, and built
                  with love for every heart.
                </p>
                <UserButton />
              </div>

              {/* Column 2 */}
              <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-2 md:items-start items-center">
                <p className="font-semibold text-white">Quick Navigation</p>
                <div className="underline space-y-1 text-white">
                  <p
                    onClick={() => openUserProfile()}
                    className="cursor-pointer hover:text-gray-300 transition"
                  >
                    Profile
                  </p>
                  <p>
                    <Link
                      href="/surah/1"
                      target="_blank"
                      className="hover:text-gray-300 transition"
                    >
                      Start reading
                    </Link>
                  </p>
                </div>
              </div>

              {/* Column 3 */}
              <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-2 md:items-start items-center">
                <p className="font-semibold text-white">Quick Links</p>
                <div className="underline space-y-1 text-white">
                  <p>
                    <Link
                      href="https://github.com/s1ddiq/Qurannet"
                      target="_blank"
                      className="hover:text-gray-300 transition"
                    >
                      QuranNet GitHub
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="/surah/1"
                      target="_blank"
                      className="hover:text-gray-300 transition"
                    >
                      Start reading
                    </Link>
                  </p>
                </div>
              </div>

              {/* Column 4 */}
              <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-2 md:items-start items-center">
                <p className="font-semibold text-white">Latest News</p>
                <div className="underline text-white">
                  <p>
                    <Link
                      href="https://github.com/s1ddiq/QuranNet/releases/tag/v1.0.0"
                      target="_blank"
                      className="hover:text-gray-300 transition"
                    >
                      v1.0.0 Latest Release
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SurahsList;
