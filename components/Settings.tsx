import { useGlobalState } from "@/lib/providers/GlobalStatesProvider";
import React, { useEffect } from "react";
import { Slider } from "./ui/slider";
import ThemeToggleButton from "./ThemeToggleButton";
import { Switch } from "./ui/switch";

const Settings = () => {
  const { fontSize, setFontSize, repeatOnMistake, setRepeatOnMistake } =
    useGlobalState();
  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  useEffect(() => {
    console.log(repeatOnMistake);
  }, [repeatOnMistake]);

  return (
    <div className="p-6 rounded-xl bg-transparent space-y-6 max-w-md">
      <section className="space-y-2">
        {/* <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
          Theme
        </h2>
        <ThemeToggleButton /> */}
      </section>
      <section className="space-y-2">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
            Font Size
          </h2>
          <p className="text-lg font-semibold dark:text-blue-500 text-black">
            {fontSize.toString() === "0" ? "Base" : `${fontSize}x`}
          </p>
        </div>
        <Slider
          value={[fontSize]}
          defaultValue={[3]}
          max={8}
          step={1}
          onValueChange={handleFontSizeChange}
          className="w-full"
        />
        <p className="text-sm text-black dark:text-zinc-400">
          Adjust the font size to your preference.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
            Recite Guide
          </h2>
          <Switch
            checked={repeatOnMistake}
            onCheckedChange={() => setRepeatOnMistake((prev) => !prev)}
          />
          <p className="text-sm text-black dark:text-zinc-400">
            Enable this to replay the ayah if you make a mistake while reciting.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Settings;
