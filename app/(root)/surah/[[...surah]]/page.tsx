"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  fetchAyahAudio,
  fetchJuz,
  fetchSurahById,
  fetchSurahTranslation,
} from "@/api/api";
import Link from "next/link";
import { toast } from "sonner";
import { useClerk, UserButton } from "@clerk/nextjs";
// ORGANIZE ⬆ 😎

// COMPONENTS START ⭐
import SignInPopup from "@/components/popups/SignInPopup";
import NavigatorButton from "@/components/NavigatorButton";

// COMPONENTS END

// UTILS
import { cn, convertNumberToArabicNumeral } from "@/lib/utils"; // ⭐
// UTILS

// ICONS START ⭐
import BismillahIcon from "@/components/svg/icons/BismillahIcon";
import {
  Check,
  ChevronUp,
  Copy,
  Loader,
  Pause,
  Play,
  Save,
} from "lucide-react";
// ICONS END ⭐

// SHADCN UI START ⭐
import SurahPlayer from "@/components/SurahPlayer";
import { useGlobalState } from "@/lib/providers/GlobalStatesProvider";
import { amiri } from "@/app/fonts";
import GettingStarted from "@/components/popups/GettingStarted";

// SHADCN UI END

const Surah = () => {
  // clerk auth
  const { isSignedIn } = useClerk();
  // clerk auth
  // USESTATES START
  const [surah, setSurah] = useState<Surah | any>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [juz, setJuz] = useState<{ arabic: any; english: any } | null>(null);
  const [loading, setLoading] = useState(true);
  // USESTATES END

  // Global States
  const { fontSize } = useGlobalState();
  // USESTATES OPEN/CLOSED STATES START ⭐
  const [showHeader, setShowHeader] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  // Subdivision of O/C;
  const [currentlyPlayingAyah, setCurrentlyPlayingAyah] = useState<
    number | null
  >(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // const [copied, setCopied] = useState(false);
  // USESTATES OPEN/CLOSED STATES END

  // Params
  const params = useParams();
  const searchParams = useSearchParams();
  const ayahParam = searchParams.get("ayah");
  const juzParam = searchParams.get("juz");
  const surahNumber = Number(params.surah);
  // Params END

  // ROUTER NEXTJS
  const router = useRouter();
  // END

  const removeDiacritics = (text: string) => {
    return text.replace(/[\u064B-\u065F\u0670]/g, ""); // removes harakat + dagger alif
  };

  useEffect(() => {
    const fetchSurahData = async () => {
      if (!params.surah || !surahNumber) return; // 🚨
      try {
        const surahResponse = await fetchSurahById(surahNumber); // Surah Data
        const translationResponse = await fetchSurahTranslation(surahNumber); // Surah Translation Data

        setSurah(surahResponse.data);

        const combinedAyahs = surahResponse.data.ayahs.map((ayah: Ayah) => {
          const translated = translationResponse.ayahs.find(
            (t: EnglishAyah) => t.numberInSurah === ayah.numberInSurah // gets translation for each ayah. slow and (may refactor)
          );
          return {
            ...ayah, // spreads the contents of ayah in this new object
            cleanText: removeDiacritics(ayah.text), // removes harakat from arabic text
            translation: translated?.text || "", // append translation directly into the object /w ayah
          };
        });

        setAyahs(combinedAyahs); // Now ayahs[] has both Arabic + English
        // console.log(translationResponse);
        localStorage.setItem(`recent`, JSON.stringify(surahResponse.data));
        // console.log("hi");
        // console.log(combinedAyahs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchSurahData();
  }, [params.surah]);

  // Scroll to the selected ayah (if provided via the "ayah" search param) (use when search is implemented)
  useEffect(() => {
    if (ayahParam && !loading) {
      const element = document.getElementById(`ayah-${ayahParam}`);
      if (element) {
        toast("Scrolling to requested Ayah");
        const c = ["dark:bg-[#1c1c1cff]", "bg-[var(--sephia-300)]"];
        element.classList.add(...c);

        element.scrollIntoView({ behavior: "auto", block: "center" }); // maybe make this smooth

        const b = setTimeout(() => {
          element.classList.remove(...c);
        }, 2000);

        // Cleanup timeouts when the effect is cleaned up or ayahParam changes
        return () => {
          clearTimeout(b);
        };
      } else {
        toast("Requested ayah was not found");
      }
    }
  }, [ayahParam, ayahs]);

  useEffect(() => {
    const func = async () => {
      if (!juzParam) return;
      toast(
        <div
          className="flex items-center gap-3"
          onClick={() => router.push("/sign-in")}
        >
          <p className="text-3xl">⚠</p>
          <div>
            <p className="font-semibold">Juz functionality is limited</p>
          </div>
        </div>
      );
      try {
        const res = await fetchJuz(juzParam);
        if (res) {
          setJuz(res);
          setAyahs(
            res.arabic.data.ayahs.map((ayah: any, index: number) => ({
              ...ayah,
              translation: res.english[index]?.text || "",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching juz:", error);
      }
    };
    func();
  }, [juzParam]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentY = window.scrollY; // was working on juz

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentY < lastY) {
            setShowHeader(true);
          } else if (currentY > lastY) {
            setShowHeader(false);
          }
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyAyah = ({ numberInSurah, text, translation }: Ayah) => {
    // console.log(numberInSurah, text, translation);
    // setCopied(true);
    navigator.clipboard.writeText(
      `${text} ${translation} [${params.surah}:${numberInSurah}]`
    );
    toast(
      <div className="flex items-center gap-3">
        <Check size={22} />
        <div>
          <p className="font-semibold">Copied Verse to Clipboard</p>
        </div>
      </div>,
      {
        className:
          "bg-[var(--sephia-200)] dark:bg-[#27272A] text-black dark:text-white",
        duration: 3000,
      }
    );
    return;
  };

  const handleFetchAudio = async (ayah: Ayah) => {
    const response = await fetchAyahAudio(surahNumber, ayah.numberInSurah);
    if (!response?.data?.audio) return;

    // halt/stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // if clicking the same ayah that was currently playing stop and return
    if (currentlyPlayingAyah === ayah.numberInSurah) {
      setCurrentlyPlayingAyah(null);
      return;
    }

    // Create new audio and store it in ref
    const audio = new Audio(response.data.audio);
    audioRef.current = audio;

    // play the audio
    audio.play();
    setCurrentlyPlayingAyah(ayah.numberInSurah);

    // clear currently playing ayah when audio ends
    audio.addEventListener("ended", () => {
      setCurrentlyPlayingAyah(null);
    });
  };
  const handleSaveAyah = (ayah: Ayah) => {
    if (isSignedIn) {
      const saved = JSON.parse(localStorage.getItem("saved-ayahs") || "[]");

      // Check if this ayah is already saved
      const alreadySaved = saved.some(
        (item: Ayah) => item.number === ayah.number
      );

      if (alreadySaved) {
        // 🧾📑🔖
        toast(
          <div className="flex items-center gap-3">
            <p className="text-3xl">🧾</p>

            <div>
              <p className="font-semibold">Already saved</p>
              <p className="text-sm text-muted-foreground">
                This ayah is already in your saved list.
              </p>
            </div>
          </div>
        );
        // toast('hello', {style: {backgroundColor: 'red'}})
        return;
      }

      const updated = [...saved, { ...ayah, surahNumber }];
      localStorage.setItem("saved-ayahs", JSON.stringify(updated));

      toast(
        <div className="flex items-center gap-3">
          <Check size={36} />
          <div>
            <p className="font-semibold">Saved Ayah</p>
          </div>
        </div>
      );
    } else {
      toast(
        <Link href="/sign-in" className="flex items-center gap-3">
          <p className="text-3xl">☹</p>
          <div>
            <p className="font-semibold">
              <span className="text-blue-500">Sign in&nbsp;</span>required
            </p>
            <p className="text-sm text-muted-foreground">
              You need to be signed in to save ayahs.
            </p>
          </div>
        </Link>
      );
    }
  };

  if (loading)
    return (
      <div className="w-full h-screen bg-zinc-900 flex justify-center items-center">
        <Loader className="size-12 text-gray-400 animate-spin" />
      </div>
    );

  return (
    <section className="w-full flex items-center flex-col dark:bg-zinc-900 bg-[var(--sephia-primary)] flex-1 dark:text-white text-black">
      {/* turn into component */}
      <SignInPopup />
      <div
        className={cn(
          "hidden md:flex items-center justify-between w-full md:min-h-14 px-6 sticky top-0 backdrop-blur-md dark:bg-zinc-900/70 border-b bg-[var(--sephia-200)] border-white/10 transition-all duration-300 z-50 shadow-sm",
          !showHeader && "-translate-y-24 opacity-0"
        )}
      >
        <div className="flex gap-3 items-center">
          <p
            className={`${amiri.className} dark:text-white text-black font-bold text-lg leading-tight`}
          >
            {surah?.name}
          </p>
        </div>

        <div className="hidden sm:flex items-center">
          <UserButton />
        </div>
      </div>

      <div className="flex flex-col w-full min-h-screen lg:px-24 px-4">
        <div className="flex items-center text-center w-full flex-col">
          <div className="relative">
            <BismillahIcon className="dark:text-white text-black md:max-w-128 max-w-72  md:mt-0 mt-16" />

            <button
              onClick={() => setCollapsed((prev) => !prev)}
              // dark:bg-zinc-800 bg-[var(--sephia-200)]
              className="dark:text-white text-black rounded-full hover:opacity-80 absolute bottom-0 left-1/2 -translate-x-1/2"
            >
              <ChevronUp
                className={`${
                  collapsed ? "rotate-180" : ""
                } size-6 cursor-pointer transition-all transition-discrete duration-300`}
              />
            </button>
          </div>

          {/* {!collapsed && ( */}
          <>
            <div
              className={`mx-2 rounded-2xl ${
                collapsed ? "" : "px-4 py-6"
              } border dark:border-zinc-700 border-white shadow-xl bg-[var(--sephia-100)] dark:bg-zinc-900 text-sm sm:text-base space-y-2 overflow-hidden transition-all delay-300 duration-300 ${
                collapsed ? "h-0 opacity-0" : "h-56"
              }`}
            >
              {juzParam ? (
                <p className="text-zinc-700 dark:text-gray-200">
                  <span className="font-medium">Juz Number:</span>&nbsp;
                  <span className="text-blue-500">{juzParam}</span>
                </p>
              ) : (
                <div className="space-y-1 text-zinc-800 dark:text-gray-200">
                  <p>
                    <span className="font-medium">Surah Number:</span>&nbsp;
                    <span className="text-blue-500">{surah?.number}</span>
                  </p>
                  <p>
                    <span className="font-medium">Surah Name:</span>&nbsp;
                    <span className={`${amiri.className} text-blue-500`}>
                      {surah?.name}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">English Name:</span>&nbsp;
                    <span className="text-blue-500">{surah?.englishName}</span>
                  </p>
                  <p>
                    <span className="font-medium">Translation:</span>&nbsp;
                    <span className="text-blue-500">
                      {surah?.englishNameTranslation}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Number of Ayahs:</span>
                    &nbsp;
                    <span className="text-blue-500">
                      {surah?.numberOfAyahs}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Revelation Type:</span>
                    &nbsp;
                    <span className="text-blue-500">
                      {surah?.revelationType}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </>
          {/* )} */}
        </div>

        {!loading &&
          !juz &&
          ayahs.map((ayah) => (
            <div
              key={ayah.number}
              className="border-b-[0.1px] border-b-[var(--sephia-500)] dark:border-b-[#262629ff]
 sm:px-4 px-2 sm:py-12 py-4 rounded-md sm:rounded-none flex flex-col items-end justify-end sm:flex-row gap-12 transition-all duration-300"
              id={`ayah-${ayah.numberInSurah}`}
            >
              <div className="h-full flex flex-row sm:order-1 order-2 sm:flex-col gap-3 sm:justify-center items-center">
                <p className="text-lg font-light text-[var(--sephia-700)] dark:text-gray-400 ">
                  {params.surah}:{ayah.numberInSurah}
                </p>

                <div className="p-2 rounded-full dark:hover:bg-zinc-800 hover:bg-[var(--sephia-500)]/45 transition-colors cursor-pointer inline-flex items-center justify-center">
                  <Copy
                    className="dark:text-gray-400 text-[#72603F]"
                    size={18}
                    onClick={() => handleCopyAyah(ayah)}
                  />
                </div>
                <div
                  onClick={() => handleSaveAyah(ayah)}
                  className="p-2 rounded-full dark:hover:bg-zinc-800 hover:bg-[var(--sephia-500)]/45 transition-colors cursor-pointer inline-flex items-center justify-center"
                >
                  <Save
                    className="dark:text-gray-400 text-[#72603F]"
                    size={18}
                  />
                </div>
                <div
                  onClick={() => handleFetchAudio(ayah)}
                  className="p-2 rounded-full dark:hover:bg-zinc-800 hover:bg-[var(--sephia-500)]/45 transition-colors cursor-pointer inline-flex items-center justify-center"
                >
                  {currentlyPlayingAyah === ayah.numberInSurah ? (
                    <Pause
                      className="dark:text-gray-400 text-[var(--sephia-700)]"
                      size={18}
                    />
                  ) : (
                    <Play
                      className="dark:text-gray-400 text-[#72603F]"
                      size={18}
                    />
                  )}
                </div>
              </div>

              <div className="text-right sm:order-2 order-1 flex flex-col w-full">
                <p
                  lang="ar"
                  id={`atext-${ayah.numberInSurah}`}
                  className={`${
                    amiri.className
                  } tracking-wide leading-loose font-light sm:pr-8 md:pr-16 lg:pr-26 md:pb-8 ${
                    fontSize === 0
                      ? "text-lg"
                      : fontSize === 1
                      ? "text-2xl"
                      : fontSize === 2
                      ? "text-3xl"
                      : fontSize === 3
                      ? "sm:text-3xl text-2xl"
                      : fontSize === 4
                      ? "sm:text-5xl text-4xl"
                      : fontSize === 5
                      ? "text-6xl"
                      : "text-7xl"
                  }`}
                >
                  <span className="inline-flex items-center justify-center size-8 rounded-full border border-gray-400 text-2xl mr-4">
                    {convertNumberToArabicNumeral(ayah.numberInSurah)}
                  </span>
                  {ayah.text}
                </p>

                <div>
                  <p
                    className={cn(
                      `text-white md:leading-[1.2] leading-[1.8] md:ml-8 text-left pt-6 lg:w-2/3 md:w-4/6`,
                      {
                        "text-sm": fontSize === 0,
                        "text-[12px]": fontSize === 1,
                        "text-lg": fontSize === 2,
                        "text-base": fontSize === 3,
                        "sm:text-2xl text-xl": fontSize === 4,
                        "text-3xl": fontSize === 5,
                        "text-4xl": fontSize === 6,
                        "text-5xl": fontSize === 7,
                        "text-6xl": fontSize >= 8,
                      }
                    )}
                  >
                    {ayah.translation}
                  </p>
                </div>
              </div>
            </div>
          ))}

        <div></div>
      </div>

      <div className="mb-2 md:w-4/6  lg:w-[500px] w-full flex justify-center items-center flex-col p-4 sm:p-8">
        <div className={cn("flex flex-row w-full gap-3", loading && "mt-16")}>
          <NavigatorButton
            direction="Previous"
            surahNumber={params.surah ? surahNumber - 1 : 1}
          />
          <Link
            href={`/`}
            className="flex-center navigator-styles dark:bg-zinc-800 bg-[var(--sephia-200)]"
          >
            Go Home
          </Link>
          <NavigatorButton
            direction="Next"
            surahNumber={params.surah ? surahNumber + 1 : 1}
          />
        </div>
      </div>
      <div className="sticky bottom-0 bg-transparent p-4 w-full flex justify-center items-center">
        <SurahPlayer
          surahNumber={surahNumber}
          ayahText={ayahs.map((a) => a.cleanText)}
          lastAyahNumber={surah?.numberOfAyahs || 0}
          router={router}
        />
      </div>
    </section>
  );
};

export default Surah;
