import { useGlobalState } from "@/lib/providers/GlobalStatesProvider";
import React from "react";
import { Slider } from "./ui/slider";
import ThemeToggleButton from "./ThemeToggleButton";

const Settings = () => {
  const { fontSize, setFontSize } = useGlobalState();

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  return (
    <div className="p-6 rounded-xl bg-transparent space-y-6 max-w-md mx-auto">
      <section className="space-y-2">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
            Font Size
          </h2>
          <p className="text-lg font-semibold dark:text-blue-500 text-[var(--sephia-400)]">
            {fontSize.toString() === "0" ? "Base" : `${fontSize}x`}
          </p>
        </div>
        <Slider
          value={[fontSize]}
          defaultValue={[2]}
          max={8}
          step={1}
          onValueChange={handleFontSizeChange}
          className="w-full"
        />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Adjust the font size to your preference.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
          Theme
        </h2>
        <ThemeToggleButton />
      </section>
    </div>
  );
};

export default Settings;
