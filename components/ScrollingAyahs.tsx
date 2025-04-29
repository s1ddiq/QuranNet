"use client";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

const ayahs = [
  "Indeed, with hardship will be ease.",
  "Indeed, Allah is with the patient.",
  "So remember Me; I will remember you.",
  "My success is only by Allah.",
  "Do not despair of the mercy of Allah.",
  "Indeed, my Lord is near and responsive.",
  "And Allah is the best of providers.",
  "And whatever good you do — Allah is All-Knowing of it.",
  "And Allah loves the patient.",
  "And Allah is Forgiving and Merciful.",
  "My mercy encompasses all things.",
  "We are closer to him than [his] jugular vein.",
  "And say, 'My Lord, increase me in knowledge.'",
  "And Allah is Knowing and Wise.",
  "Allah does not waste the reward of the doers of good.",
  "And rely upon Allah.",
  "Indeed, He is ever Merciful to you.",
  "Indeed, Allah loves those who rely [upon Him].",
  "What is with Allah is better.",
  "And He is over all things competent.",
];

export default function ScrollingAyah() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % ayahs.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-transparent text-white py-2 relative h-10 px-2">
      <div
        key={index}
        className="absolute w-full transition-opacity duration-500 ease-in-out text-center text-lg sm:text-sm"
      >
        <Carousel >
          <CarouselContent>
            <CarouselItem>{ayahs[index]}</CarouselItem>
            <CarouselItem>{ayahs[index + 1]}</CarouselItem>
            <CarouselItem>{ayahs[index + 2]}</CarouselItem>
            <CarouselItem>{ayahs[index + 3]}</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
