"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import MobileSheet from "./MobileSheet";
import { toast } from "sonner";
import { fetchAllSurahs } from "@/api/api";
import JuzList from "../JuzList";

type TabKey = "surah" | "juz" | "page";
const tabs: { key: TabKey; label: string }[] = [
  { key: "surah", label: "Surah" },
  { key: "juz", label: "Juz" },
  { key: "page", label: "Page" },
];

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("surah");
  const [surahs, setSurahs] = useState<Surah[]>([]);

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

  return (
    <div>
      <div
        className={cn(
          "min-h-screen md:block hidden sticky top-0 z-50 bg-transparent border-x border-[#262629ff] text-white transition-all duration-300",
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
              className="absolute top-0 fatranslate-y-[6px] left-0 h-12 bg-blue-500 rounded-full transition-all duration-300 px-2"
              style={{ width: pillW, left: pillLeft }}
            />
            <div className="relative flex bg-[#18181B] p-1 rounded-full">
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
          <div className="mt-4 mx-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search by ${tabs.find((tab) => tab.key === activeTab)?.label}`}
              className="w-full p-2 bg-[#18181B] text-white rounded-md"
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
                onClick={() => toast("Navigating to surah")}
                className="block rounded-md p-2 hover:bg-white/10 transition flex items-center gap-3"
              >
                <span className="text-gray-400">{surah.number}.</span>
                <span className="flex-1">{surah.englishName}</span>
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
        {!isCollapsed && activeTab === "page" && (
          <div className="px-4 py-4 overflow-y-auto scrollable-container max-h-[calc(100vh-200px)]">
            {/* Example Page Content */}
            <h2 className="text-lg font-semibold">Page Content</h2>
            <p className="text-gray-400">Surah Pages will be displayed here</p>
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
