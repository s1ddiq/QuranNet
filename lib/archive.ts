// //   useEffect(() => {
//     const fetchSearchResults = async () => {
//         if (!searchQuery.trim()) {
//           setSearchResults([]);
//           return;
//         }
  
//         setLoading(true);
//         try {
//           const res = await searchQuran(searchQuery);
//           setSearchResults(res.data.matches); // Adjust this depending on your API response
//           // Debug statement removed for production
//         } catch (err: unknown) {
//           if (err instanceof Error) {
//             console.error("Search error:", err.message);
//           } else {
//             console.error("Search error:", err);
//           }
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       const debounceTimer = setTimeout(fetchSearchResults, 300); // debounce 300ms
//       return () => clearTimeout(debounceTimer);
//     }, [searchQuery]);



//  {/* {isSearchModalOpen && (
//     <div
//     className="fixed top-0 bg-transparent backdrop-blur-sm w-full h-screen flex justify-center items-center"
//     onClick={() => setIsSearchModalOpen(false)}
//   >
//     <div className="min-w-[680px] border h-72 bg-zinc-800 rounded-xl">
//       <div className="relative w-full">
//         <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-5 h-5" />
//         <Input
//           type="text"
//           placeholder="Search the Quran"
//           onClick={() => setIsSearchModalOpen(true)}
//           className="w-full pl-10 border-0 border-b !bg-transparent rounded-none h-14 focus:ring-0 focus:ring-offset-0 text-white"
//         />
//       </div>

//       <div className="p-4">
//         <p className="text-gray-200 text-sm">Quick Navigation</p>
//         <div className="w-full flex gap-3 pt-2">
//           {["Al-Fatihaa", "Al-Kahf", "Juz 1",].map((i) => (
//             <div className="bg-zinc-900 rounded-md px-2 text-sm" key={i}>
//               <Link href='/surah/1' className="text-gray-200">{i}</Link>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="p-4">
//       <p className="text-gray-200 text-sm">Recent Navigations</p>
//       😢
//       <p>Nothing...</p>
//       </div>
//     </div>
//   </div>
// )} */}


//  className="border-b-[0.1px] dark:border-[#262629ff] dark:border-gray-400 border-[var(--sephia-500)] border-opacity-50 p-2 py-12 md:px-4 flex flex-col items-end justify-end sm:flex-row justify-between gap-12 transition-all duration-300"

//          <div className="px-4 py-4 overflow-y-auto scrollable-container max-h-[calc(100vh-200px)]">
        //     {/* Example Page Content */}
        //     {/* <p className="text-xl text-white">Font Size</p> */}
        //     <p className="text-xl mb-2 text-gray-400">Adjust Font Size</p>

        //     <div className="space-y-4">
        //       <Slider
        //         value={[fontSize]}
        //         defaultValue={[6]}
        //         max={8}
        //         step={1}
        //         onValueChange={handleFontSizeChange}
        //         className="relative flex w-full touch-none select-none items-center"
        //       >
        //       </Slider>
        //     </div>


        //     <p className="text-sm mb-2 text-gray-400">...More settings coming soon</p>
        //   </div>

//         "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Pause, SkipForwardIcon, SkipBackIcon, ChevronDown, ChevronUp } from "lucide-react";
// import PlayIcon from "./svg/PlayIcon";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

// interface SurahPlayerProps {
//   surahNumber: number;
// }

// const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

// export default function SurahPlayer({ surahNumber }: SurahPlayerProps) {
//   const [playing, setPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [collapsed, setCollapsed] = useState(false);
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   // Load and setup audio
//   useEffect(() => {
//     let isCancelled = false;
//     const audio = new Audio(
//       `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`
//     );
  
//     audioRef.current?.pause();
//     audioRef.current = null;
  
//     audioRef.current = audio;
//     audio.preload = "auto";
//     audio.playbackRate = playbackRate;
  
//     const updateTime = () => setCurrentTime(audio.currentTime);
//     const updateDuration = () => setDuration(audio.duration);
//     const handleEnded = () => setPlaying(false);
  
//     audio.addEventListener("timeupdate", updateTime);
//     audio.addEventListener("loadedmetadata", updateDuration);
//     audio.addEventListener("ended", handleEnded);
  
//     // Optional: auto-play when switching surahs
//     audio.play().then(() => {
//       if (!isCancelled) setPlaying(true);
//     }).catch(() => {
//       if (!isCancelled) setPlaying(false);
//     });
  
//     return () => {
//       isCancelled = true;
//       audio.pause();
//       audio.removeEventListener("timeupdate", updateTime);
//       audio.removeEventListener("loadedmetadata", updateDuration);
//       audio.removeEventListener("ended", handleEnded);
//     };
//   }, [surahNumber]);
  

//   // Apply new playback rate immediately
//   useEffect(() => {
//     if (audioRef.current) audioRef.current.playbackRate = playbackRate;
//   }, [playbackRate]);

//   const handlePlayPause = () => {
//     if (!audioRef.current) return;
//     if (playing) {
//       audioRef.current.pause();
//       setPlaying(false);
//     } else {
//       audioRef.current.play();
//       setPlaying(true);
//     }
//   };

//   const skip = (sec: number) => {
//     if (audioRef.current) {
//       const t = audioRef.current.currentTime + sec;
//       audioRef.current.currentTime = Math.max(0, Math.min(t, audioRef.current.duration));
//     }
//   };

//   const formatTime = (sec: number) => {
//     const m = Math.floor(sec / 60).toString().padStart(2, "0");
//     const s = Math.floor(sec % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   return (
//     <div>
//               <button
//                     onClick={() => setCollapsed((prev) => !prev)}
//                     className="dark:bg-zinc-900/80 bg-[var(--sephia-200)] dark:text-white text-black rounded-full shadow-lg hover:opacity-80 absolute bottom-0 left-1/2 -translate-x-1/2"
//                   >
//                     <ChevronUp
//                       className={`${
//                         collapsed ? "rotate-180" : ""
//                       } size-6 cursor-pointer transition-all transition-discrete duration-300`}
//                     />
//                   </button>
//       {collapsed ? (
//         <button
//           onClick={() => setCollapsed(false)}
//           className="dark:bg-zinc-900/80 bg-[var(--sephia-200)] dark:text-white text-black p-2 rounded-full shadow-lg hover:bg-zinc-900 transition"
//         >
//           <ChevronUp className="size-6" />
//         </button>
//       ) : (
//         <div className="flex justify-center items-center space-x-3 dark:bg-zinc-800/90 bg-[var(--sephia-200)] backdrop-blur-md p-3 rounded-full shadow-lg">
//           {/* collapse button */}
//           <button
//             onClick={() => setCollapsed(true)}
//             className="text-white p-1 hover:bg-white/10 rounded-full transition"
//           >
//             <ChevronDown className="size-6 dark:text-white text-black" />
//           </button>

//           {/* Skip Back 10s */}
//           <button onClick={() => skip(-10)} className="text-white p-2 hover:bg-white/10 rounded-full">
//             <SkipBackIcon className="size-5 dark:text-white text-black" />
//           </button>

//           {/* Play/Pause */}
//           <button onClick={handlePlayPause} className="text-white p-3 dark:bg-white/10 hover:opacity-80 rounded-full p-2 rounded-full hover:bg-[var(--sephia-500)]/45 transition-colors cursor-pointer bg-[var(--sephia-300)]">
          
//             {playing ? <Pause className="size-5 dark:text-white text-black" /> : <PlayIcon className="size-5 dark:text-white text-black" />}
//           </button>

//           {/* Skip Forward 10s */}
//           <button onClick={() => skip(10)} className="text-white p-2 hover:bg-white/10 rounded-full">
//             <SkipForwardIcon className="size-5 dark:text-white text-black" />
//           </button>

//           {/* Time Display */}
//           <span className="text-xs font-mono dark:text-gray-300 text-black">
//             {formatTime(currentTime)} / {formatTime(duration || 0)}
//           </span>

//           {/* Playback Speed Popover */}
//           <Popover>
//             <PopoverTrigger className="dark:text-white text-black p-2 hover:bg-white/10 rounded-full cursor-pointer">
//               {playbackRate}×
//             </PopoverTrigger>
//             <PopoverContent className="dark:bg-zinc-800 bg-[var(--sephia-200)] rounded-lg p-2 space-y-1 shadow-lg">
//               {playbackRates.map((rate) => (
//                 <div
//                   key={rate}
//                   onClick={() => setPlaybackRate(rate)}
//                   className={`px-3 py-1 rounded cursor-pointer hover:bg-white/20 ${
//                     playbackRate === rate ? 'bg-white/20' : ''
//                   }`}
//                 >
//                   {rate}×
//                 </div>
//               ))}
//             </PopoverContent>
//           </Popover>
//         </div>
//       )}
//     </div>
//   );
// }
// <Sheet open={isOpen} onOpenChange={setIsOpen}>
// <VisuallyHidden>
//   <SheetTitle>Menu</SheetTitle>
//   <SheetHeader>Mobile Menu</SheetHeader>
// </VisuallyHidden>
// <SheetContent className="px-2 py-2">
//   <div className="w-full flex items-center justify-center">
//     <div className="flex w-full justify-center items-center gap-4 pt-6 border-b border-[#262629ff] pb-2">
//       <p
//         onClick={() => setActiveSidebarTab("search")}
//         className={`cursor-pointer ${
//           activeSidebarTab === "search"
//             ? "text-white"
//             : "text-gray-500"
//         }`}
//       >
//         Search
//       </p>

//       <p
//         onClick={() => setActiveSidebarTab("overview")}
//         className={`cursor-pointer ${
//           activeSidebarTab === "overview"
//             ? "text-white"
//             : "text-gray-500"
//         }`}
//       >
//         Overview
//       </p>
//     </div>
//   </div>

//   {activeSidebarTab === "search" && (
//     <>
//       <SearchInput
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//       />
//       <div className="flex flex-col gap-8 items-center scrollable-container">
//         {searchResults.length > 0 ? (
//           searchResults.map((result: SearchResult, index) => (
//             <SearchResultCard
//               key={`${result.number}-${index}`}
//               result={result}
//               searchQuery={searchQuery}
//               type="desktop"
//             />
//           ))
//         ) : (
//           <p className="text-sm font-light ml-2 text-gray-400 pointer-events-none">
//             {searchQuery.length > 3 && searchResults.length === 0
//               ? `No results found for "${searchQuery}"`
//               : null}
//           </p>
//         )}
//       </div>
//     </>
//   )}

//   {activeSidebarTab === "overview" && (
//     <Link
//       href="/support"
//       className="px-5 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium transition relative w-44"
//     >
//       Support Us ♥
//       <span className="absolute -top-[4px] -right-[6px] flex size-4">
//         <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
//         <span className="relative inline-flex size-4 rounded-full bg-indigo-500"></span>
//       </span>
//     </Link>
//   )}
// </SheetContent>
// </Sheet>