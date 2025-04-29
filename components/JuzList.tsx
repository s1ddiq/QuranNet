"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const juzData = [
  { juz: 1, surahs: ["Al-Fatiha", "Al-Baqarah (part)"] },
  { juz: 2, surahs: ["Al-Baqarah (part)"] },
  { juz: 3, surahs: ["Al-Baqarah (part)", "Aal-E-Imran (part)"] },
  { juz: 4, surahs: ["Aal-E-Imran (part)", "An-Nisa (part)"] },
  { juz: 5, surahs: ["An-Nisa (part)"] },
  { juz: 6, surahs: ["An-Nisa (part)", "Al-Ma'idah (part)"] },
  { juz: 7, surahs: ["Al-Ma'idah (part)", "Al-An'am (part)"] },
  { juz: 8, surahs: ["Al-An'am (part)", "Al-A'raf (part)"] },
  { juz: 9, surahs: ["Al-A'raf (part)"] },
  { juz: 10, surahs: ["Al-A'raf (part)", "Al-Anfal (part)"] },
  { juz: 11, surahs: ["Al-Anfal (part)", "At-Tawbah (part)"] },
  { juz: 12, surahs: ["At-Tawbah (part)", "Yunus (part)"] },
  { juz: 13, surahs: ["Yunus (part)", "Hud", "Yusuf (part)"] },
  { juz: 14, surahs: ["Yusuf (part)", "Ar-Ra'd", "Ibrahim"] },
  { juz: 15, surahs: ["Al-Hijr", "An-Nahl (part)"] },
  { juz: 16, surahs: ["An-Nahl (part)", "Al-Isra (part)"] },
  { juz: 17, surahs: ["Al-Isra (part)", "Al-Kahf (part)"] },
  { juz: 18, surahs: ["Al-Kahf (part)", "Maryam", "Ta-Ha (part)"] },
  { juz: 19, surahs: ["Ta-Ha (part)", "Al-Anbiya", "Al-Hajj (part)"] },
  {
    juz: 20,
    surahs: ["Al-Hajj (part)", "Al-Mu’minun", "An-Nur", "Al-Furqan (part)"],
  },
  { juz: 21, surahs: ["Al-Furqan (part)", "Ash-Shu'ara", "An-Naml (part)"] },
  { juz: 22, surahs: ["An-Naml (part)", "Al-Qasas", "Al-Ankabut (part)"] },
  {
    juz: 23,
    surahs: [
      "Al-Ankabut (part)",
      "Ar-Rum",
      "Luqman",
      "As-Sajda",
      "Al-Ahzab (part)",
    ],
  },
  { juz: 24, surahs: ["Al-Ahzab (part)", "Saba", "Fatir", "Ya-Sin (part)"] },
  { juz: 25, surahs: ["Ya-Sin (part)", "As-Saffat", "Sad", "Az-Zumar (part)"] },
  { juz: 26, surahs: ["Az-Zumar (part)", "Ghafir", "Fussilat (part)"] },
  {
    juz: 27,
    surahs: [
      "Fussilat (part)",
      "Ash-Shura",
      "Az-Zukhruf",
      "Ad-Dukhan",
      "Al-Jathiya",
      "Al-Ahqaf (part)",
    ],
  },
  {
    juz: 28,
    surahs: [
      "Al-Ahqaf (part)",
      "Muhammad",
      "Al-Fath",
      "Al-Hujurat",
      "Qaf",
      "Adh-Dhariyat (part)",
    ],
  },
  {
    juz: 29,
    surahs: [
      "Adh-Dhariyat (part)",
      "At-Tur",
      "An-Najm",
      "Al-Qamar",
      "Ar-Rahman",
      "Al-Waqia",
      "Al-Hadid",
    ],
  },
  {
    juz: 30,
    surahs: [
      "Al-Mujadila",
      "Al-Hashr",
      "Al-Mumtahina",
      "As-Saff",
      "Al-Jumu'a",
      "Al-Munafiqun",
      "At-Taghabun",
      "At-Talaq",
      "At-Tahrim",
      "Al-Mulk",
      "Al-Qalam",
      "Al-Haqqa",
      "Al-Ma'arij",
      "Nuh",
      "Al-Jinn",
      "Al-Muzzammil",
      "Al-Muddaththir",
      "Al-Qiyama",
      "Al-Insan",
      "Al-Mursalat",
      "An-Naba",
      "An-Nazi'at",
      "Abasa",
      "At-Takwir",
      "Al-Infitar",
      "Al-Mutaffifin",
      "Al-Inshiqaq",
      "Al-Buruj",
      "At-Tariq",
      "Al-Ala",
      "Al-Ghashiyah",
      "Al-Fajr",
      "Al-Balad",
      "Ash-Shams",
      "Al-Lail",
      "Ad-Duhaa",
      "Ash-Sharh",
      "At-Tin",
      "Al-Alaq",
      "Al-Qadr",
      "Al-Bayyina",
      "Az-Zalzala",
      "Al-Adiyat",
      "Al-Qari'a",
      "At-Takathur",
      "Al-Asr",
      "Al-Humazah",
      "Al-Fil",
      "Quraish",
      "Al-Ma'un",
      "Al-Kawthar",
      "Al-Kafirun",
      "An-Nasr",
      "Al-Masad",
      "Al-Ikhlas",
      "Al-Falaq",
      "An-Nas",
    ],
  },
];

//   const filteredSurahs = surahs.filter(surah => surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()));
const JuzList = ({ searchQuery }: { searchQuery: string }) => {
  const router = useRouter();
  const filteredJuzData =
    searchQuery.trim() === ""
      ? juzData
      : juzData.filter((juz) => juz.juz === Number(searchQuery));

    const searchParams = useSearchParams();
    const selectedJuz = searchParams.get('juz');

  return (
    <>
      {filteredJuzData.map((juz) => (
        <Link
          key={juz.juz}
          href={`?juz=${juz.juz}`}
          title={`Juz ${juz.juz}`}
          className={cn(
            "block rounded-md py-2 hover:bg-[var(--sephia-300)] transition flex items-center gap-6 w-full",
            juz.juz === Number(selectedJuz) &&
              "dark:bg-zinc-800 bg-[var(--sephia-300)] font-bold"
          )}
        >
          <span className="dark:text-gray-400 text-black w-6 text-right">
            {juz.juz}
          </span>
          <div className="flex flex-col">
            <span className="dark:text-white text-black">Juz {juz.juz}</span>
          </div>
        </Link>
      ))}
    </>
  );
};

export default JuzList;
