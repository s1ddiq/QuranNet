"use client";

import React, { useEffect, useRef, useState } from "react";
//  ^^^ React Basic Imports
import { motion, AnimatePresence } from "framer-motion";
// Framer Motion for Animations

// Icons
import {
  Pause,
  SkipForwardIcon,
  SkipBackIcon,
  ChevronDown,
  ChevronUp,
  Play,
  Mic,
  MicOff,
} from "lucide-react";

// Package/Library to check similarity between sentences
import levenshtein from "js-levenshtein";
// ShadCN UI
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { toast } from "sonner";

// Components
import GettingStartedPopup from "./popups/GettingStartedPopup";
// API
import { fetchAyahAudio } from "@/api/api";
// Utilities
import { useGlobalState } from "@/lib/providers/GlobalStatesProvider";
import { formatTime, normalizeArabic, unlockAudio } from "@/lib/utils";

interface SurahPlayerProps {
  surahNumber: number;
  ayahText: string[];
  lastAyahNumber: number;
  router: any;
}

const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];

export default function SurahPlayer({
  surahNumber,
  ayahText,
  lastAyahNumber,
  router,
}: SurahPlayerProps) {
  // Audio effects
  const correct = useRef(new Audio("/assets/sounds/correct.mp3")).current;
  const wrong = useRef(new Audio("/assets/sounds/wrong.mp3")).current;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const [recording, setRecording] = useState(false);
  const [showReciteGuide, setShowReciteGuide] = useState(false);

  const { repeatOnMistake, zenMode, setZenMode } = useGlobalState();
  const repeatOnMistakeRef = useRef(repeatOnMistake);
  const [playingCorrectAudio, setPlayingCorrectAudio] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(0);
  const currentAyahRef = useRef(currentAyah);

  const [collapsed, setCollapsed] = useState(false);

  // +=============- User Experience UseEffects -=============+
  // Set user-friendly volumes
  useEffect(() => {
    correct.volume = 0.5;
    wrong.volume = 0.5;
  }, [correct, wrong]);

  // Keep ref in sync
  useEffect(() => {
    currentAyahRef.current = currentAyah;
  }, [currentAyah]);

  // Keep repeatOnMistakeRef in sync
  useEffect(() => {
    repeatOnMistakeRef.current = repeatOnMistake;
  }, [repeatOnMistake]);

  /** Preload and current Surah audio */
  useEffect(() => {
    const audio = new Audio(
      `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`
    );
    audio.preload = "auto";
    audio.playbackRate = playbackRate;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    audioRef.current?.pause();
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [surahNumber, playbackRate]);

  // Audio Controls
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const skip = (sec: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(
      0,
      Math.min(audio.currentTime + sec, duration)
    );
  };

  // Handle Incorrect Pronounciation of Verse
  const handleIncorrect = async () => {
    if (playingCorrectAudio) return;
    setPlayingCorrectAudio(true);
    wrong.play();
    if (repeatOnMistakeRef.current) {
      try {
        const res = await fetchAyahAudio(
          surahNumber,
          currentAyahRef.current + 1
        );
        if (!res?.data?.audio) throw new Error("Missing audio URL");
        const audio = new Audio(res.data.audio);
        await audio.play();
        // await new Promise((r) =>
        //   audio.addEventListener("ended", r, { once: true })
        // );
      } catch (err) {
        toast.error("Failed to replay Ayah.");
      } finally {
        setPlayingCorrectAudio(false);
      }
    } else {
      setPlayingCorrectAudio(false);
    }
  };

  // ================- SPEECH RECOGNITION FUNCTION -================!
  // TODO: Clean up this function and organize.
  const startRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported.");
      return;
    }
    // Check SR Compatibility ^^

    const recognition = new SpeechRecognition();
    recognition.lang = "ar-SA";
    recognition.interimResults = false;
    recognition.continuous = true;
    // Initialize SR ^^

    recognition.onresult = (e: any) => {
      const transcript = e.results[e.resultIndex][0].transcript;
      const expected = normalizeArabic(ayahText[currentAyahRef.current]);
      const actual = normalizeArabic(transcript);
      const similarity =
        1 -
        levenshtein(actual, expected) /
          Math.max(actual.length, expected.length);
      // ^ Uses the levenshtein algorithm to check similarties between senteces!

      const currentAyahId = `ayah-${currentAyahRef.current + 1}`; // uses a ref to be safe
      const arabicTextElement = document.getElementById(
        `atext-${currentAyahRef.current + 1}` // current arabicTextElement for highlighting
      );

      if (similarity > 0.6) {
        correct.play();
        arabicTextElement?.classList.add("text-green-500"); // adds if correct
        arabicTextElement?.classList.remove("text-red-500"); // removes just in case user got it wrong before
        document
          .getElementById(currentAyahId)
          ?.classList.remove("bg-zinc-800/75"); // removes highlight

        setCurrentAyah((prev) => prev + 1); // next ayah

        if (currentAyahRef.current + 2 <= lastAyahNumber) {
          document
            .getElementById(`ayah-${currentAyahRef.current + 2}`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" }); // scrolls into view
          document
            .getElementById(`ayah-${currentAyahRef.current + 2}`)
            ?.classList.add("bg-zinc-800/75"); // highlights it
        } else {
          toast.success("You completed the Surah!");
          setTimeout(() => router.push(`/surah/${surahNumber + 1}`), 1500); // if completed surah, go to next surah
        }
      } else {
        handleIncorrect(); // calls incorrect function
        document.getElementById(currentAyahId)?.classList.add("text-red-500"); // highlights red
      }
    };

    recognition.onerror = (e: any) =>
      console.error("Speech recognition error:", e.error);
    recognition.start();
  };

  const requestMic = async () => {
    if (recording) {
      // if the user presses while recording, set it to false
      setRecording(false);
      return;
    }

    try {
      // attempt to get userMedia, once that's done setRecording to true and call speech recognition
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecording(true);
      startRecognition();
      document
        .getElementById(`ayah-${currentAyahRef.current + 1}`)
        ?.classList.add("bg-zinc-800/75"); // highlight it
      toast.success("Start reciting aloud. Tap mic again to stop."); // toast user
    } catch {
      setRecording(false);
    }
  };

  return (
    <AnimatePresence initial={false} mode="wait">
      {showReciteGuide && (
        <GettingStartedPopup
          onStart={() => {
            unlockAudio();
            requestMic();
            setShowReciteGuide(false);
            localStorage.setItem("hasSeenReciteGuide", "true");
          }}
        />
      )}
      {!collapsed && !zenMode ? (
        <motion.div
          key="controls"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.2 } }}
          className="flex justify-center items-center gap-3 backdrop-blur-md dark:bg-zinc-800/90 p-3 sm:w-fit w-full rounded-full shadow-lg"
        >
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 text-white hover:bg-white/10 rounded-full"
          >
            <ChevronDown className="size-6 dark:text-white text-black" />
          </button>
          <div className="flex flex-col items-center relative">
            <button className="p-1 cursor-pointer">
              {recording ? (
                <Mic
                  className="size-5 animate-pulse text-blue-400"
                  onClick={requestMic}
                />
              ) : (
                <MicOff
                  className="size-5 text-blue-500"
                  onClick={() => {
                    if (localStorage.getItem("hasSeenReciteGuide") === "true") {
                      unlockAudio();
                      requestMic();
                      // console.log("has seen it!");
                    } else {
                      // console.log("has seen it2!");
                      setShowReciteGuide(true);
                    }
                  }}
                />
              )}
            </button>
            {/* <span className="absolute -top-4 scale-75 rounded bg-blue-500 px-2 text-xs text-white pointer-events-none">
              Beta feature
            </span> */}
          </div>
          <button
            onClick={() => skip(-10)}
            className="p-2 text-white hover:bg-white/10 rounded-full"
          >
            <SkipBackIcon className="size-5" />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-2 text-white hover:bg-white/10 rounded-full"
          >
            {playing ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5" />
            )}
          </button>
          <button
            onClick={() => skip(10)}
            className="p-2 text-white hover:bg-white/10 rounded-full"
          >
            <SkipForwardIcon className="size-5" />
          </button>
          <span className="md:block hidden font-mono text-xs text-white">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <Popover>
            <PopoverTrigger className="p-2 text-white hover:bg-white/10 rounded-full">
              {playbackRate}×
            </PopoverTrigger>
            <PopoverContent className="space-y-1 rounded-lg bg-zinc-800 p-2 shadow-lg">
              {playbackRates.map((rate) => (
                <div
                  key={rate}
                  onClick={() => setPlaybackRate(rate)}
                  className={`cursor-pointer rounded px-3 py-1 hover:bg-white/20 ${
                    playbackRate === rate ? "bg-white/20" : ""
                  }`}
                >
                  {rate}×
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </motion.div>
      ) : (
        <motion.button
          key="collapsed"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.2 } }}
          onClick={() => setCollapsed(false)}
          className="rounded-full p-2 bg-zinc-800/80 text-white shadow-lg"
        >
          <ChevronUp className="size-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
