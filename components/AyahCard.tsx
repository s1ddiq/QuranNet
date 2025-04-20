"use client";
import React, { useEffect, useState } from "react";
import { fetchAyahAudio } from "@/api/api";
import HighlighterPen from "./svg/HighlighterPenIcon";
import PlayIcon from "./svg/PlayIcon";
import DocumentIcon from "./svg/DocumentIcon";
import { toast } from "sonner";
import CopyIcon from "./svg/CopyIcon";
import { PauseIcon } from "lucide-react";

const AyahCard = ({ surah, ayah, params, currentAudio, setCurrentAudio }: AyahCardProps) => {
  // Find the translation for this ayah based on its number in the surah.
  const [playing, setPlaying] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [preloadedAudio, setPreloadedAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const preload = async () => {
      const response = await fetchAyahAudio(surah.number, ayah.numberInSurah)
      if (response && response.data.audio) {
        const audio = new Audio(response.data.audio)
        audio.preload = "auto"
        setPreloadedAudio(audio)
      }
    }
  
    preload()
  }, [surah.number, ayah.numberInSurah])
  
  const handleFetchAudio = () => {
    if (!preloadedAudio || preloadedAudio.src === "") {
      toast.error("Audio not ready.");
      return;
    }
  
    if (playing) {
      preloadedAudio.pause();
      setPlaying(false);
      return;
    }
  
    // Stop other audio
    if (currentAudio && currentAudio !== preloadedAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  
    preloadedAudio
      .play()
      .then(() => {
        setPlaying(true);
        setCurrentAudio(preloadedAudio);
  
        preloadedAudio.onended = () => {
          setPlaying(false);
          setCurrentAudio(null);
        };
      })
      .catch((err) => {
        console.error("Playback failed", err);
        toast.error("Playback failed.");
        setPlaying(false);
      });
  };
  
  
  
  const handleHighlightAyah = async () => {
    const e = document.getElementById(`ayah-${ayah.numberInSurah}`);
    const f = [
      "dark:bg-[#1c1c1cff]",
      "bg-gray-200",
      "border-l-4",
      "dark:border-l-white",
      "border-l-gray-400",
    ];
    // turn into globals.css just class for all these
    if (highlighted) {
      //   @apply dark:bg-[#1c1c1cff] bg-gray-200 border-l-4 dark:border-l-white border-l-gray-400;
      e?.classList.remove(...f);
      setHighlighted(false);
    } else {
      e?.classList.add(...f);
      setHighlighted(true);
    }
  };
  const handleCopyAyah = async () => {
    let copyText = ayah.translation?.toString();
    if (copyText !== undefined) {
      navigator.clipboard.writeText(copyText);
      toast("Copied text", { description: `${copyText}` });
    }
  };
  
  return (
    <div
    key={ayah.number}
    className="border-b border-px dark:border-[#262629ff] border-gray-400 p-2 md:p-6 flex flex-col sm:flex-row justify-between gap-12 transition-all duration-300"
    id={`ayah-${ayah.numberInSurah}`}
    >
      <div className="h-full flex flex-row sm:order-1 order-2 sm:flex-col gap-3 sm:justify-center justify-end">
        <p className="text-lg font-light text-gray-600 dark:text-gray-400 ">
          {params.surah}:{ayah.numberInSurah}
        </p>

        <CopyIcon onClick={() => handleCopyAyah()}/>
        <HighlighterPen onClick={() => handleHighlightAyah()} />
        <DocumentIcon />
        {/* <PlayIcon onClick={() => handleFetchAudio()} /> */}
          {playing ? <PauseIcon fill="white" onClick={() => handleFetchAudio()} /> : <PlayIcon onClick={() => handleFetchAudio()} />}
      </div>

      <div className="text-right sm:order-2 order-1 flex flex-col w-full">
        <p
          className="md:text-3xl lg:text-4xl text-xl font-light tracking-wider arabic-text 
          sm:pr-8 md:pr-16 lg:pr-26 md:leading-[2] leading-[2.25] cursor-pointer"
          onClick={() => handleFetchAudio()}
        >
          {ayah.text.startsWith("بِسۡمِ")
            ? ayah.text.replace("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", "")
            : ayah.text}
        </p>
        <div>
          <p className="dark:text-gray-400 text-gray-600 md:text-lg md:leading-[1.2] leading-[1.5] text-base md:ml-8 text-left pt-6 lg:w-1/2 md:w-4/6">
            {ayah.translation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AyahCard;
