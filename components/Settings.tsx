import { useGlobalState } from "@/lib/providers/GlobalStatesProvider";
import React, { useEffect, useState } from "react";
import { Slider } from "./ui/slider";
import ThemeToggleButton from "./ThemeToggleButton";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import SettingSection from "./SettingSection";

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
    <div className="p-2 rounded-xl bg-transparent space-y-6 max-w-md">
      <SettingSection
        title="Font and Text Size"
        control={
          <>
            <div className="flex justify-between">
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
          </>
        }
        description="Adjust the size of Arabic and translation text to suit your reading comfort."
      />

      <SettingSection
        title="Mistake Detection"
        control={
          <>
            <Switch
              checked={repeatOnMistake}
              onCheckedChange={() => setRepeatOnMistake((prev) => !prev)}
            />
          </>
        }
        description="Automatically replay the verse when a recitation mistake is detected."
      />

      <SettingSection
        title="Show Translation"
        control={<Switch />}
        description="Toggle whether translations are shown beneath the Arabic text."
      />

      <SettingSection
        title="Zen Mode"
        control={<Switch />}
        description="Enter a distraction-free mode that hides all UI except the Qur’an."
      />

      <SettingSection
        title="Show Bismillah"
        control={<Switch />}
        description="Toggle the visibility of 'Bismillah' before each surah (except At-Tawbah)."
      />

      <SettingSection
        title="Audio Playback Speed"
        control={<Slider step={0.25} min={0.5} max={2} className="w-full" />}
        description="Adjust the recitation speed to your preference (slow or fast)."
      />
    </div>
  );
};

export default Settings;
