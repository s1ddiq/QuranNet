"use client";

import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { X, Pin } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  surahNumber: number;
  translation: string;
  pinned?: boolean;
}

type SortOption = "pinned" | "surah" | "ayah" | "recent";

const Saved = () => {
  const { isSignedIn } = useClerk();
  const [savedAyahs, setSavedAyahs] = useState<Ayah[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("pinned");
  const router = useRouter();

  useEffect(() => {
    const res = localStorage.getItem("saved-ayahs");
    if (res) {
      try {
        setSavedAyahs(JSON.parse(res));
      } catch {
        console.error("Invalid saved data");
      }
    }
  }, []);

  const updateStorage = (updated: Ayah[]) => {
    localStorage.setItem("saved-ayahs", JSON.stringify(updated));
    setSavedAyahs(updated);
  };

  const handleRemove = (number: number) => {
    const updated = savedAyahs.filter((ayah) => ayah.number !== number);
    updateStorage(updated);
  };

  const togglePin = (number: number) => {
    const updated = savedAyahs.map((ayah) =>
      ayah.number === number ? { ...ayah, pinned: !ayah.pinned } : ayah
    );
    updateStorage(updated);
  };

  const sortedAyahs = () => {
    const cloned = [...savedAyahs];
    switch (sortBy) {
      case "surah":
        return cloned.sort((a, b) => a.surahNumber - b.surahNumber);
      case "ayah":
        return cloned.sort((a, b) => a.numberInSurah - b.numberInSurah);
      case "recent":
        return cloned.reverse(); // most recent at top
      case "pinned":
      default:
        return [
          ...cloned.filter((a) => a.pinned),
          ...cloned.filter((a) => !a.pinned),
        ];
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#0f0f11] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex justify-between items-center mb-8 flex-col gap-5">
          <h1 className="text-3xl font-bold">Saved Ayahs 🧾</h1>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option value="pinned">📌 Pinned First</option>
            <option value="surah">🔢 Sort by Surah</option>
            <option value="ayah">🔄 Sort by Ayah Number</option>
            <option value="recent">🆕 Most Recent</option>
          </select>
        </div>

        {savedAyahs.length > 0 ? (
          <div className="space-y-6">
            {sortedAyahs().map((ayah) => (
              <div
                key={ayah.number}
                className="relative rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:bg-zinc-800"
              >
                <Link
                  href={`/surah/${ayah.surahNumber}?ayah=${ayah.numberInSurah}`}
                  className="block space-y-2"
                >
                  <p className="text-lg leading-relaxed font-medium">{ayah.text}</p>
                  <p className="text-sm text-zinc-400">{ayah.translation}</p>
                  <div className="text-xs text-zinc-500 mt-2">
                    Surah {ayah.surahNumber} — Ayah {ayah.numberInSurah}
                  </div>
                </Link>

                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => togglePin(ayah.number)}
                    className={`p-2 rounded-full ${
                      ayah.pinned ? "bg-yellow-500" : "bg-zinc-800 hover:bg-yellow-600"
                    }`}
                    title={ayah.pinned ? "Unpin Ayah" : "Pin Ayah"}
                  >
                    <Pin size={16} className={ayah.pinned ? "rotate-45" : ""} />
                  </button>

                  <button
                    onClick={() => handleRemove(ayah.number)}
                    className="p-2 bg-zinc-800 hover:bg-red-600 text-white rounded-full"
                    title="Remove Ayah"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20 text-zinc-400">
            <p className="text-xl mb-4">No saved ayahs yet.</p>
            <Link
              href="/surah/1"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-medium"
            >
              Start Reading
            </Link>
          </div>
        )}
        <button
          onClick={() => router.back()}
          className="px-8 sm:w-auto w-11/12 py-2 mt-4 bg-blue-500 hover:bg-zinc-700 text-white rounded-xl text-sm font-medium transition fixed left-1/2 -translate-x-1/2 bottom-4"
        >
          Go back ♥
        </button>
      </div>
    </main>
  );
};

export default Saved;
