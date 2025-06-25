"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import MobileSheet from "./MobileSheet";
import { fetchAllSurahs } from "@/api/api";
import JuzList from "../JuzList";
import { Input } from "../ui/input";
import { useParams } from "next/navigation";
import Settings from "../Settings";

type TabKey = "surah" | "juz" | "settings";
const tabs: { key: TabKey; label: string }[] = [
  { key: "surah", label: "Surah" },
  { key: "juz", label: "Juz" },
  { key: "settings", label: "Settings" }, // maybe settings
];

const Sidebar = () => {
  // USESTATES START
  const params = useParams();
  const surahNumber = Number(params?.surah);
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
  const filteredSurahs = surahs.filter((surah) =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // calculate pill position & size (three tabs)
  const idx = tabs.findIndex((t) => t.key === activeTab);
  const pillPct = 100 / tabs.length;
  const pillLeft = `${idx * pillPct}%`;
  const pillW = `${pillPct}%`;

  return (
    <div>
      <div
        className={cn(
          "min-h-screen lg:block hidden sticky top-0 z-40 border-r dark:border-[#262629ff] border-[var(--sephia-500)] bg-zinc-900 text-white transition-all duration-300 shadow-sm",
          isCollapsed ? "w-16" : "md:w-[350px]" // fix mobilesheet hiding before MD (yk)
        )}
      >
        {/* Header with collapse button */}
        <SidebarHeader
          toggleSidebar={toggleSidebar}
          isCollapsed={isCollapsed}
        />

        {/* Tab Switcher */}
        {!isCollapsed && (
          <div className="relative mt-4 mx-4">
            {/* Sliding pill */}
            <div
              className="absolute -top-[4px] fatranslate-y-[6px] left-0 h-12 dark:bg-blue-500 bg-[var(--sephia-400)] rounded-full transition-all duration-300 px-2"
              style={{ width: pillW, left: pillLeft }}
            />
            <div className="relative flex dark:border dark:bg-zinc-800 bg-[var(--sephia-300)] border-[#262629ff] p-1 rounded-full">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex-1 text-center text-sm font-medium py-2 transition-colors dark:text-white text-black",
                    activeTab === tab.key && "hover:text-gray-400"
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
          <div className="mt-4 mx-4">
            {" "}
            {/* add relative later for searchicon maybe */}
            {/* <SearchIcon className="absolute left-2 text-gray-400 top-1/2 -translate-y-1/2" /> */}
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search by ${
                tabs.find((tab) => tab.key === activeTab)?.label
              }`}
              className="dark:bg-zinc-800 bg-[var(--sephia-300)] dark:text-white  border-0"
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
                className={cn(
                  "rounded-md py-2 hover:bg-zinc-800  transition flex items-center gap-6 w-full",
                  surah.number === surahNumber &&
                    "dark:bg-zinc-800 bg-[var(--sephia-300)] font-bold"
                )}
              >
                <span className="dark:text-gray-400 text-black w-6 text-right">
                  {surah.number}
                </span>
                <div className="flex flex-col">
                  <span className="dark:text-white text-black">
                    {surah.englishName}
                  </span>
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
        {!isCollapsed && activeTab === "settings" && <Settings />}
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
        surahNumber={surahNumber}
      />
    </div>
  );
};

export default Sidebar;
