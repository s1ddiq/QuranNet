"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "../ui/button";
import { ArrowRight, TriangleAlert } from "lucide-react";
import { Switch } from "../ui/switch";
import { useGlobalState } from "@/lib/providers/GlobalStatesProvider";

const GettingStartedPopup = ({ onStart }: { onStart: () => void }) => {
  if (localStorage.getItem("hasSeenReciteGuide") === "true") return;
  const { repeatOnMistake, setRepeatOnMistake } = useGlobalState();
  const [current, setCurrent] = useState("1");
  const containerRef = useRef(null);
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);
  const buttonRef = useRef(null);

  const steps = [
    "Ensure your microphone is enabled and working.",
    "Recite each word clearly and at a steady pace.",
    "Listen to the ayah playback for guidance before reciting.",
    "Coming soon, we'll guide and give you feedback!",
  ];

  useEffect(() => {
    // This resets the refs
    stepsRef.current = stepsRef.current.slice(0, steps.length);

    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } }); // Timeline

    // timeline.from(headingRef.current, { opacity: 0, y: 20, duration: 1 });

    stepsRef.current.forEach((el) => {
      timeline.fromTo(
        el,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1 },
        "+=0.2"
      );
    });

    timeline.from(buttonRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      delay: 6,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="z-9999999999999999999999 fixed top-1/2 left-1/2 md:max-w-md mx-4 w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-zinc-800 p-4 shadow-lg space-y-6"
    >
      <h1
        // ref={headingRef}
        className="text-2xl font-semibold text-white text-center"
      >
        Recite Guide
      </h1>

      {current === "1" ? (
        <ul className="space-y-4 bg-blue-500 bg-opacity-20 border-l-4 border-blue-400 p-4 rounded-md text-yellow-100 text-sm leading-relaxed shadow-md">
          {steps.map((text, i) => (
            <li
              key={i}
              ref={(el) => {
                stepsRef.current[i] = el;
              }}
              className="list-none text-lg text-gray-200"
            >
              <ArrowRight size={20} className="inline-block" /> {text}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div className="bg-blue-500 bg-opacity-20 border-l-4 border-blue-400 p-4 rounded-md text-yellow-100 text-sm leading-relaxed shadow-md">
            <strong className="block mb-2 font-semibold text-orange-50">
              <TriangleAlert className="inline-block mr-2" size={20} /> Beta
              Feature
            </strong>
            <p>
              This feature is in beta and may not always assess pronunciation
              perfectly. Please use it as a helpful guide for practice, but not
              as a substitute/replacement for expert recitation or instruction.
            </p>
            {/* <div className="w-full h-[1px] bg-white"></div> */}
            <p className="text-[12px]">
              Sign in to access personalized feedback and track your progress
              for improvement tips.
            </p>
          </div>
          <div className="flex justify-between">
            <Switch
              checked={repeatOnMistake}
              onCheckedChange={() => setRepeatOnMistake((prev) => !prev)}
            />
            <p className="text-[12px] text-black dark:text-zinc-400">
              Enable this to replay the ayah if you make a mistake while
              reciting.
            </p>
          </div>

          <div>
            {/* <Switch
              className="bg-blue-500"
              checked={repeatOnMistake}
              onCheckedChange={setRepeatOnMistake}
            /> */}
          </div>
        </>
      )}

      <Button
        onClick={() => {
          if (current === "2") onStart();
          else setCurrent("2");
        }}
        className="group flex items-center justify-center gap-2 w-full bg-blue-500 py-4 text-white font-medium rounded-lg shadow hover:bg-blue-600 border-blue-400"
      >
        Next {current}/2{" "}
        <ArrowRight
          size={20}
          className="group-hover:translate-x-2 transition-all"
        />
      </Button>
    </div>
  );
};

export default GettingStartedPopup;
