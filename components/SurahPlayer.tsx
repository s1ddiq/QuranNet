"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import levenshtein from "js-levenshtein";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface SurahPlayerProps {
  surahNumber: number;
  ayahText: any;
  lastAyahNumber: number;
  router: any;
}

const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function SurahPlayer({
  surahNumber,
  ayahText,
  lastAyahNumber,
  router,
}: SurahPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [collapsed, setCollapsed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [recording, setRecording] = useState(false);

  const correct = new Audio("/sounds/correct.mp3");
  const wrong = new Audio("/sounds/wrong.mp3");

  correct.volume = 0.5;
  wrong.volume = 0.5;
  // TODO: Refactor and clean up code, change it from highlighting background to highlighting the text instead. 6.12.25 (✅)

  // TRANSCRIPTION
  // const expectedText = ayahText;
  let currentAyah = 0;
  // load audio
  function normalizeArabic(text: string) {
    return text
      .replace(/[\u064B-\u0652\u0670\u06D6-\u06ED]/g, "") // remove tashkeel
      .replace(/[\u200F\u200E\u06DD]/g, "") // remove markers
      .replace(/\s+/g, "") // remove whitespace
      .trim();
  }

  useEffect(() => {
    // console.log(ayahText);
    let isCancelled = false;

    const audio = new Audio(
      `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`
    );

    audioRef.current?.pause();
    audioRef.current = audio;
    audio.preload = "auto";
    audio.playbackRate = playbackRate;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    // ← Remove this autoplay
    // audio.play().then(() => {
    //   if (!isCancelled) setPlaying(true);
    // });

    return () => {
      isCancelled = true;
      audio.pause();
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [surahNumber]);

  // Apply new playback rate immediately
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const skip = (sec: number) => {
    if (audioRef.current) {
      const t = audioRef.current.currentTime + sec;
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(t, audioRef.current.duration)
      );
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const unlockAudio = () => {
    // This is a helper function to unlock audio in browsers that require user interaction
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  };

  const requestMicPermission = async () => {
    if (recording) {
      setRecording(false);
      return;
    } else {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        // Permission granted
        startTranscription();

        document
          .getElementById(`ayah-${currentAyah + 1}`)
          ?.classList.add("bg-gray-200/25");
        toast.success(
          "This is a beta feature. Please open issues on our github to report a bug."
        );
        setTimeout(() => {
          toast.success(
            "Please start reading the Ayah aloud. \n You can click on the mic icon to stop recording."
          );
        }, 3000);
        setRecording(true);
      } catch (error) {
        // Permission not granted
        setRecording(false);
      }
    }
  };

  const startTranscription = async () => {
    if (recording) return;
    // alert("You are about to start recording. please speak clearly.");

    const SpeechRecongition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecongition) {
      toast.error("Speech recognition is not supported in this browser.");
    }

    const recognition = new SpeechRecongition();
    recognition.lang = "ar-SA"; // Arabic Saudi
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true; // keep listening even after person stopp talking

    recognition.onresult = (event: any) => {
      // TODO: change later
      const transcript = event.results[event.resultIndex][0].transcript;
      console.log("Transcript:", transcript);

      // simplify both values
      const normalizedTranscript = normalizeArabic(transcript);
      const normalizedExpected = normalizeArabic(ayahText[currentAyah]);

      // Levenshtein distance + similarity score (stackoverflow.com/a/10543930)
      const distance = levenshtein(normalizedTranscript, normalizedExpected);
      const maxLen = Math.max(
        normalizedTranscript.length,
        normalizedExpected.length
      );
      const similarity = 1 - distance / maxLen;

      // ✅ If match > 0.6:

      // ✅ Remove red background.

      // ✅ Add green to current ayah

      // ✅ Scroll down.

      // ✅ Add blue to next ayah

      // ❌ If incorrect:

      // ✅ Just show red.

      const currentAyahId = `ayah-${currentAyah + 1}`;
      const currentTextId = `atext-${currentAyah + 1}`;
      const nextAyahId = `ayah-${currentAyah + 2}`;

      const currentEl = document.getElementById(currentAyahId);
      const currentTextEl = document.getElementById(currentTextId);
      const nextEl = document.getElementById(nextAyahId);

      if (similarity > 0.6) {
        if (currentAyah >= lastAyahNumber - 1) {
          toast.success("You have completed the Surah!");
          setTimeout(() => {
            router.push(`/surah/${surahNumber + 1}`);
          }, 1500);
        }
        correct.play();
        currentTextEl?.classList.remove("text-red-500");
        currentTextEl?.classList.add("text-green-500");
        nextEl?.scrollIntoView({ behavior: "smooth", block: "center" });
        currentEl?.classList.remove("bg-gray-200/25", "bg-gray-200/50");
        currentAyah++;
        nextEl?.classList.remove(
          "text-green-500",
          "text-red-500",
          "bg-gray-200/25"
        );
        nextEl?.classList.add("bg-gray-200/25");
      } else {
        currentEl?.classList.add("text-red-500");
        wrong.play();
      }
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  // console.log(ayahText[0]);

  return (
    <AnimatePresence initial={false} mode="wait">
      {!collapsed && (
        <motion.div
          key="expanded"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.2 } }}
          className="flex justify-center items-center space-x-3 dark:bg-zinc-800/90 bg-[var(--sephia-200)] backdrop-blur-md p-3 rounded-full shadow-lg overflow-hidden"
        >
          <button
            onClick={() => setCollapsed(true)}
            className="text-white p-1 hover:bg-white/10 rounded-full transition cursor-pointer"
          >
            <ChevronDown className="size-6 dark:text-white text-black" />
          </button>

          <div className="relative flex justify-center items-center flex-col">
            {recording ? (
              <Mic
                className="size-5 dark:text-white text-black cursor-pointer animate-pulse"
                onClick={() => {
                  unlockAudio();
                  requestMicPermission();
                }}
              />
            ) : (
              <MicOff
                onClick={() => {
                  unlockAudio();
                  requestMicPermission();
                }}
              />
            )}

            <p className=" bg-blue-500 rounded-md text-sm px-2 absolute opacity-10 pointer-events-none -z-9">
              BETA
            </p>
          </div>

          <button
            onClick={() => skip(-10)}
            className="text-white p-2 hover:bg-white/10 rounded-full"
          >
            <SkipBackIcon className="size-5 dark:text-white text-black cursor-pointer" />
          </button>
          <button
            onClick={handlePlayPause}
            className="text-white p-2 dark:bg-white/10 hover:opacity-80 rounded-full hover:bg-[var(--sephia-500)]/45 transition-colors cursor-pointer bg-[var(--sephia-300)]"
          >
            {playing ? (
              <Pause className="size-5 dark:text-white text-black" />
            ) : (
              <Play className="size-5 dark:text-white text-black" />
            )}
          </button>
          <button
            onClick={() => skip(10)}
            className="text-white p-2 hover:bg-white/10 rounded-full"
          >
            <SkipForwardIcon className="size-5 dark:text-white text-black cursor-pointer" />
          </button>
          <span className="text-xs font-mono dark:text-gray-300 text-black">
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </span>
          <Popover>
            <PopoverTrigger className="dark:text-white text-black p-2 hover:bg-white/10 rounded-full cursor-pointer">
              {playbackRate}×
            </PopoverTrigger>
            <PopoverContent className="dark:bg-zinc-800 bg-[var(--sephia-200)] rounded-lg p-2 space-y-1 shadow-lg">
              {playbackRates.map((rate) => (
                <div
                  key={rate}
                  onClick={() => setPlaybackRate(rate)}
                  className={`px-3 py-1 rounded cursor-pointer hover:bg-white/20 ${
                    playbackRate === rate ? "bg-white/20" : ""
                  }`}
                >
                  {rate}×
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </motion.div>
      )}
      {collapsed && (
        <motion.button
          key="collapsed"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.2 } }}
          onClick={() => setCollapsed(false)}
          className="dark:bg-zinc-800 bg-[var(--sephia-200)] dark:text-white text-black p-2 rounded-full shadow-lg transition cursor-pointer"
        >
          <ChevronUp className="size-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
