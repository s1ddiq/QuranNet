"use client";
import { fetchSurahById, fetchSurahTranslation } from "@/api/api";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavigatorButton from "@/components/NavigatorButton";
import AyahCard from "@/components/AyahCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { UserButton } from "@clerk/nextjs";
import BismillahIcon from "@/components/svg/BismillahIcon";
import { Loader } from "lucide-react";
import SignInPopup from "@/components/popups/SignInPopup";
import ThemeToggleButton from "@/components/ThemeToggleButton";
const Surah = () => {
  const [surah, setSurah] = useState<Surah | any>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const params = useParams();
  const searchParams = useSearchParams();
  const ayahParam = searchParams.get("ayah");
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loading, setLoading] = useState(true);
  // Fetch the surah data (metadata and list of ayahs!)
  const pathname = usePathname();
  useEffect(() => {
    const fetchSurahData = async () => {
      if (!params.surah) return;
      try {
        const surahResponse = await fetchSurahById(Number(params.surah));
        const translationResponse = await fetchSurahTranslation(
          Number(params.surah)
        );

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
        localStorage.setItem(`recent`, JSON.stringify(surahResponse.data))
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
        }, 4000);

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

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < lastY) {
        setShowHeader(true);
      } else if (currentY > lastY) {
        setShowHeader(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // <-- No dependencies

  if (loading)
    return <Loader className="text-gray-400 m-8 animate-spin" size={32} />;
  return (
    <section className="w-full flex items-center flex-col dark:bg-[#08080aff] bg-white flex-1 dark:text-white text-black">
      {/* turn into component */}
      <SignInPopup />
      <div
        className={cn(
          "flex flex-row justify-between items-center w-1/3 mb-2 min-h-16 md:sticky top-0 dark:bg-[#08080aff] bg-white w-full px-6 border-b dark:border-[#262629ff] border-gray-400 transition-all duration-300",
          !showHeader && "-translate-y-24 opacity-0"
        )}
      >
        {/* <h1 className="text-6xl font-bold text-center ">
          {surah?.englishName}
        </h1> */}
        <p className="font-bold text-center text-2xl">
          {surah?.englishNameTranslation}
        </p>
        <p className="font-bold text-center text-2xl">{surah?.name}</p>
        <div className="hidden sm:block">
          <UserButton />
        </div>
      </div>

      <div className="flex flex-col w-full gap-16">
        <div className="flex justify-center text-center w-full">
          {/* <Image
          src='/svg/bismillah.svg'
          width={512}
          height={512}
          alt='Bismillahirahmaniraheem'
          className={cn('py-16', loading && 'pt-8')}
          title="In the name of allah, the most merciful"

        /> */}
          <BismillahIcon className="dark:text-white text-black md:max-w-128 max-w-64" />
        </div>
        {!loading &&
          ayahs.map((ayah) => (
            <AyahCard
              key={ayah.number}
              surah={surah}
              ayah={ayah}
              params={params}
            />
          ))}
      </div>

      <div className="mb-8 w-full flex justify-center items-center flex-col p-4 sm:p-8">
        <div className={cn("flex flex-row w-full", loading && "mt-16")}>
          <NavigatorButton
            direction="Previous"
            surahNumber={params.surah ? Number(params.surah) - 1 : 1}
          />
          <Link href={`/`} className="flex-center navigator-styles">
            Go Home
          </Link>
          <NavigatorButton
            direction="Next"
            surahNumber={params.surah ? Number(params.surah) + 1 : 1}
          />
        </div>
        <div className="flex justify-between w-full pt-2 sm:pt-8">
          <p className="text-sm font-bold tracking-widest text-gray-400">
            QuranNet
          </p>
          <ThemeToggleButton />
          <p className="text-sm font-bold tracking-widest text-gray-400">
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Surah;
