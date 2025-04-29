"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import MobileSheet from "./MobileSheet";
import { fetchAllSurahs } from "@/api/api";
import JuzList from "../JuzList";
import { Input } from "../ui/input";
import { useGlobalState } from "@/lib/providers/GlobalStatesProvider";
import { Slider } from "../ui/slider";

type TabKey = "surah" | "juz" | "settings";
const tabs: { key: TabKey; label: string }[] = [
  { key: "surah", label: "Surah" },
  { key: "juz", label: "Juz" },
  { key: "settings", label: "Settings" }, // maybe settings
];

const Sidebar = () => {
  // USESTATES START
  
  // Data States:
  const [surahs, setSurahs] = useState<Surah[]>([]);
  // Active States:
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("surah");
  // Open/Closed States:
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // USESTATES END

  // Load all surahs for the Surah panel
  useEffect(() => {
    const load = async () => {
      const res = await fetchAllSurahs();
      setSurahs(res.data);
    };
    load();
  }, []);

  const toggleSidebar = () => setIsCollapsed((c) => !c);
  const filteredSurahs = surahs.filter(surah => surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()));
  // Compute pill position & size (three tabs)
  const idx = tabs.findIndex((t) => t.key === activeTab);
  const pillPct = 100 / tabs.length;
  const pillLeft = `${idx * pillPct}%`;
  const pillW = `${pillPct}%`;

    const { fontSize, setFontSize } = useGlobalState();
  
    const handleFontSizeChange = (value: number[]) => {
      setFontSize(value[0]);
    };
  return (
    <div>
      <div
        className={cn(
          "min-h-screen md:block hidden sticky top-0 z-50 border-x border-[#262629ff] dark:bg-zinc-900 bg-orange-100 text-white transition-all duration-300",
          isCollapsed ? "w-16" : "md:w-[350px]" // fix mobilesheet hiding before MD (yk)
        )}
      >
        {/* Header with collapse button */}
        <SidebarHeader toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

        {/* Tab Switcher */}
        {!isCollapsed && (
          <div className="relative mt-4 mx-4">
            {/* Sliding pill */}
            <div
              className="absolute -top-[4px] fatranslate-y-[6px] left-0 h-12 bg-blue-500 rounded-full transition-all duration-300 px-2"
              style={{ width: pillW, left: pillLeft }}
            />
            <div className="relative flex border bg-zinc-800 border-[#262629ff] p-1 rounded-full">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex-1 text-center text-sm font-medium py-2 transition-colors",
                    activeTab === tab.key
                      ? "text-white"
                      : "text-white hover:text-gray-400"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Input */}
        {!isCollapsed && (
          <div className="mt-4 mx-4"> {/* add relative later for searchicon maybe */}
          {/* <SearchIcon className="absolute left-2 text-gray-400 top-1/2 -translate-y-1/2" /> */}
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search by ${tabs.find((tab) => tab.key === activeTab)?.label}`}
            className="bg-zinc-800 text-white border-0"
          />
        </div>
        )}

        {/* Surah Panel */}
        {!isCollapsed && activeTab === "surah" && (
          <div className="px-4 py-4 overflow-y-auto scrollable-container max-h-[calc(100vh-200px)]">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.number}
              href={`/surah/${surah.number}`}
              title={`${surah.englishName} — ${surah.englishNameTranslation}`}
              className="block rounded-md py-2 hover:bg-white/10 transition flex items-center gap-3 w-full"
            >
              <span className="text-gray-400 w-6 text-right">{surah.number}.</span>
              <div className="flex flex-col">
                <span className="text-white">{surah.englishName}</span>
                {/* <span className="text-sm text-gray-400">{surah.englishNameTranslation}</span> */}
              </div>
            </Link>
          ))}
        </div>
        
        )}

        {/* Juz Panel */}
        {!isCollapsed && activeTab === "juz" && (
          <div className="px-4 py-4 overflow-y-auto scrollable-container max-h-[calc(100vh-200px)]">
            {/* Example Juz Content */}
            {/* <h2 className="text-lg font-semibold">Juz Content</h2>
            <p className="text-gray-400">Display Juz related content here</p> */}
            <JuzList searchQuery={searchQuery} />
          </div>
        )}

        {/* Page Panel */}
        {!isCollapsed && activeTab === "settings" && (
          <div className="px-4 py-4 overflow-y-auto scrollable-container max-h-[calc(100vh-200px)]">
            {/* Example Page Content */}
            {/* <p className="text-xl text-white">Font Size</p> */}
            <p className="text-xl mb-2 text-gray-400">Adjust Font Size</p>

            <div className="space-y-4">
              <Slider
                value={[fontSize]}
                defaultValue={[6]}
                max={8}
                step={1}
                onValueChange={handleFontSizeChange}
                className="relative flex w-full touch-none select-none items-center"
              >
              </Slider>
            </div>

            <p className="text-sm mb-2 text-gray-400">...More settings coming soon</p>
          </div>
        )}
{/* 
        {!isCollapsed && activeTab === "settings" && (
          <div className="px-5 py-4">
            <Link
              href="/support"
              className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition"
            >
              Support Us ♥
            </Link>
          </div>
        )} */}
      </div>

      {/* Mobile version */}
      <MobileSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        surahs={surahs}
      />
    </div>
  );
};

export default Sidebar;
