"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, SkipForwardIcon, SkipBackIcon, ChevronDown, ChevronUp } from "lucide-react";
import PlayIcon from "./svg/PlayIcon";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface SurahPlayerProps {
  surahNumber: number;
}

const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function SurahPlayer({ surahNumber }: SurahPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [collapsed, setCollapsed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load and setup audio
  useEffect(() => {
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
      audioRef.current.currentTime = Math.max(0, Math.min(t, audioRef.current.duration));
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

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
          <button onClick={() => skip(-10)} className="text-white p-2 hover:bg-white/10 rounded-full">
            <SkipBackIcon className="size-5 dark:text-white text-black cursor-pointer" />
          </button>
          <button
            onClick={handlePlayPause}
            className="text-white p-2 dark:bg-white/10 hover:opacity-80 rounded-full hover:bg-[var(--sephia-500)]/45 transition-colors cursor-pointer bg-[var(--sephia-300)]"
          >
            {playing ? <Pause className="size-5 dark:text-white text-black" /> : <PlayIcon className="size-5 dark:text-white text-black" />}
          </button>
          <button onClick={() => skip(10)} className="text-white p-2 hover:bg-white/10 rounded-full">
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
                    playbackRate === rate ? 'bg-white/20' : ''
                  }`}>
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
          className="dark:bg-zinc-800 bg-[var(--sephia-200)] dark:text-white text-black p-2 rounded-full shadow-lg bg-[var(--sephia-500)] transition cursor-pointer"
        >
          <ChevronUp className="size-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
