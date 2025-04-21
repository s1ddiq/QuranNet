"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  fetchAyahAudio,
  fetchSurahById,
  fetchSurahTranslation,
} from "@/api/api";
import Link from "next/link";
import { toast } from "sonner";
import { useClerk, UserButton } from "@clerk/nextjs";
// ORGANIZE ⬆ 😎

// COMPONENTS START ⭐
import SignInPopup from "@/components/popups/SignInPopup";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import NavigatorButton from "@/components/NavigatorButton";

// COMPONENTS END

// UTILS
import { cn } from "@/lib/utils"; // ⭐
// UTILS

// ICONS START ⭐
import BismillahIcon from "@/components/svg/BismillahIcon";
import { Check, Loader, Pause } from "lucide-react";
import DocumentIcon from "@/components/svg/DocumentIcon";
import PlayIcon from "@/components/svg/PlayIcon";
import CopyIcon from "@/components/svg/CopyIcon";
// ICONS END ⭐

// SHADCN UI START ⭐
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ActionButton from "@/components/ActionButton";
import SurahPlayer from "@/components/SurahPlayer";
// SHADCN UI END

const Surah = () => {
  // clerk auth
  const { isSignedIn } = useClerk();
  // clerk auth
  // USESTATES START
  const [surah, setSurah] = useState<Surah | any>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  // USESTATES END

  // USESTATES OPEN/CLOSED STATES START ⭐
  const [showHeader, setShowHeader] = useState(true);

  // Subdivision of O/C;
  const [currentlyPlayingAyah, setCurrentlyPlayingAyah] = useState<
    number | null
  >(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [copied, setCopied] = useState(false);
  // USESTATES OPEN/CLOSED STATES END

  const params = useParams();
  const searchParams = useSearchParams();
  const ayahParam = searchParams.get("ayah");
  const surahNumber = Number(params.surah);

  useEffect(() => {
    const fetchSurahData = async () => {
      if (!params.surah) return;
      try {
        const surahResponse = await fetchSurahById(surahNumber);
        const translationResponse = await fetchSurahTranslation(surahNumber);

        setSurah(surahResponse.data);

        const combinedAyahs = surahResponse.data.ayahs.map((ayah: Ayah) => {
          const translated = translationResponse.ayahs.find(
            (t: EnglishAyah) => t.numberInSurah === ayah.numberInSurah
          );
          return {
            ...ayah,
            translation: translated?.text || "", // Merge translation directly into the ayah
          };
        });

        setAyahs(combinedAyahs); // Now ayahs[] has both Arabic + English
        console.log(translationResponse);
        localStorage.setItem(`recent`, JSON.stringify(surahResponse.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchSurahData();
  }, [params.surah]);

  // Scroll to the selected ayah (if provided via the "ayah" search param)
  useEffect(() => {
    if (ayahParam && !loading) {
      const element = document.getElementById(`ayah-${ayahParam}`);
      if (element) {
        toast("Scrolling to requested Ayah");
        const c = ["dark:bg-[#1c1c1cff]", "bg-gray-200"];
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
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentY = window.scrollY;

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

  const handleCopyAyah = (
    type: string,
    { numberInSurah, text, translation }: Ayah
  ) => {
    setCopied(true);
    if (type === "english") {
      navigator.clipboard.writeText(
        `${translation} [${params.surah}:${numberInSurah}]`
      );
    } else if (type === "arabic") {
      navigator.clipboard.writeText(
        `${text} ${params.surah}:[${numberInSurah}]`
      );
    } else {
      navigator.clipboard.writeText(
        `${text} ${translation} [${params.surah}:${numberInSurah}]`
      );
    }
    toast(
      <div className="flex items-center gap-3">
        <Check size={36} />
        <div>
          <p className="font-semibold">Copied Ayah</p>
        </div>
      </div>
    );
    return;
  };

  const handleFetchAudio = async (ayah: Ayah) => {
    const response = await fetchAyahAudio(surahNumber, ayah.numberInSurah);
    if (!response?.data?.audio) return;

    // Pause any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // If clicking the same ayah that's currently playing, stop and return
    if (currentlyPlayingAyah === ayah.numberInSurah) {
      setCurrentlyPlayingAyah(null);
      return;
    }

    // Create new audio and store it in ref
    const audio = new Audio(response.data.audio);
    audioRef.current = audio;

    // Play the new audio
    audio.play();
    setCurrentlyPlayingAyah(ayah.numberInSurah);

    // When it ends, clear
    audio.addEventListener("ended", () => {
      setCurrentlyPlayingAyah(null);
    });
  };
  const handleSaveAyah = (ayah: Ayah) => {
    if (isSignedIn) {
      const saved = JSON.parse(localStorage.getItem("saved-ayahs") || "[]");
  
      // Check if this ayah is already saved
      const alreadySaved = saved.some((item: Ayah) => item.number === ayah.number);
  
      if (alreadySaved) { // 🧾📑🔖
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
        return;
      }
  
      const updated = [...saved, {...ayah, surahNumber}];
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
        <div className="flex items-center gap-3">
          <p className="text-3xl">☹</p>
          <div>
            <p className="font-semibold">Sign in required</p>
            <p className="text-sm text-muted-foreground">
              You need to be signed in to save ayahs.
            </p>
          </div>
        </div>
      );
    }
  };
  

  if (loading)
    return (
      <Loader
        className="text-gray-400 text-center animate-spin absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        size={32}
      />
    );
  return (
    <section className="w-full flex items-center flex-col dark:bg-[#08080aff] bg-white flex-1 dark:text-white text-black">
      {/* turn into component */}
      <SignInPopup />
      <div
        className={cn(
          "md:flex hidden flex-row justify-between items-center w-1/3 mb-2 min-h-14 md:sticky top-0 backdrop-blur-md bg-transparent border-b border-[#262629ff] w-full px-6 transition-all duration-300",
          !showHeader && "-translate-y-24 opacity-0"
        )}
      >
        <p className="font-bold text-center text-2xl">
          {surah?.englishNameTranslation}
        </p>
        <p className="font-bold text-center text-2xl">{surah?.name}</p>
        <div className="hidden sm:block">
          <UserButton />
        </div>
      </div>

      <div className="flex flex-col w-full gap-14">
        <div className="flex justify-center text-center w-full">
          <BismillahIcon className="dark:text-white text-black md:max-w-128 max-w-64" />
        </div>
        {!loading &&
          ayahs.map((ayah) => (
            <div
              key={ayah.number}
              className="border-b border-px dark:border-[#262629ff] border-gray-400 p-2 md:p-4 flex flex-col sm:flex-row justify-between gap-12 transition-all duration-300"
              id={`ayah-${ayah.numberInSurah}`}
            >
              <div className="h-full flex flex-row sm:order-1 order-2 sm:flex-col gap-3 sm:justify-center justify-end">
                <p className="text-lg font-light text-gray-600 dark:text-gray-400 ">
                  {params.surah}:{ayah.numberInSurah}
                </p>

                <Popover>
                  <PopoverTrigger>
                    <CopyIcon />
                    {/* REFACTOR TO MAP OVER. */}
                    <PopoverContent className="w-48 p-2 rounded-xl bg-background shadow-xl space-y-1">
                      <ActionButton
                        text="Arabic"
                        onClick={() => handleCopyAyah("arabic", ayah)}
                      />
                      <ActionButton
                        text="English"
                        onClick={() => handleCopyAyah("english", ayah)}
                      />
                      <ActionButton
                        text="Arabic + English"
                        onClick={() => handleCopyAyah("both", ayah)}
                      />
                    </PopoverContent>
                  </PopoverTrigger>
                </Popover>
                {/* <HighlighterPenIcon /> */}
                <DocumentIcon onClick={() => handleSaveAyah(ayah)} className="hover:opacity-80"/>
                {/* <Popover>
                  <PopoverTrigger>
                    <PopoverContent className="w-48 p-2 rounded-xl bg-background shadow-xl space-y-1">
                      <ActionButton text="Save to Collections" />
                      <ActionButton text="Bookmark Ayah" />
                    </PopoverContent>
                  </PopoverTrigger>
                </Popover> */}
                {currentlyPlayingAyah === ayah.numberInSurah ? (
                  <Pause fill="white" onClick={() => handleFetchAudio(ayah)} className="hover:opacity-80" />
                ) : (
                  <PlayIcon onClick={() => handleFetchAudio(ayah)} className="hover:opacity-80" />
                )}

                {/* <PlayIcon onClick={() => handleFetchAudio()} /> */}
                {/* {playing ? <PauseIcon fill="white" onClick={() => handleFetchAudio()} /> : <PlayIcon onClick={() => handleFetchAudio()} />} */}
              </div>

              <div className="text-right sm:order-2 order-1 flex flex-col w-full">
                <p
                  className="md:text-3xl lg:text-4xl text-xl font-light tracking-wider arabic-text 
                  sm:pr-8 md:pr-16 lg:pr-26 md:leading-[2] leading-[2.25] cursor-pointer"
                  // onClick={() => handleFetchAudio()}
                >
                  {ayah.text.startsWith("بِسۡمِ")
                    ? ayah.text.replace(
                        "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ",
                        ""
                      )
                    : ayah.text}
                </p>
                <div>
                  <p className="text-gray-300 md:text-lg md:leading-[1.2] leading-[1.5] text-base md:ml-8 text-left pt-6 lg:w-2/3 md:w-4/6">
                    {ayah.translation}
                  </p>
                </div>
              </div>
            </div>
          ))}

      </div>

      <div className="mb-8 lg:w-5/6 w-full flex justify-center items-center flex-col p-4 sm:p-8">
        <div className={cn("flex flex-row w-full", loading && "mt-16")}>
          <NavigatorButton
            direction="Previous"
            surahNumber={params.surah ? surahNumber - 1 : 1}
          />
          <Link href={`/`} className="flex-center navigator-styles">
            Go Home
          </Link>
          <NavigatorButton
            direction="Next"
            surahNumber={params.surah ? surahNumber + 1 : 1}
          />
        </div>
        {/* <div className="flex justify-between w-full pt-2 sm:pt-8">
          <p className="text-sm font-bold tracking-widest text-gray-400">
            QuranNet
          </p>
          <p className="text-sm font-bold tracking-widest text-gray-400">
            {new Date().getFullYear()}
          </p>
        </div> */}
      </div>
      <div className="sticky bottom-0 bg-transparent p-4 w-full flex justify-center items-center">
      <SurahPlayer surahNumber={surahNumber} />
    </div>
    </section>
  );
};

export default Surah;
