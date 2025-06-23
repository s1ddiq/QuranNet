// * ================== SURAH & AYAH TYPES ================== *
interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Ayah {
  cleanText: any;
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  translation?: string;
  surahNumber?: number;
}

interface EnglishAyah {
  number: number;
  text: string;
  edition: Edition;
  surah: Surah;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

// * ================== SEARCH TYPES ================== *
interface SearchResult {
  edition: Edition;
  number: number;
  numberInSurah: number;
  surah: SurahSummary;
  text: string;
}

// * ================== PROPS ================== *
interface SearchResultCardProps {
  result: SearchResult;
  searchQuery: string;
  type: string;
  index?: number;
  amount?: number;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

interface SurahNavigationProps {
  surah: string;
  number?: number;
}

interface AyahCardProps {
  surah: Surah;
  params: Record<string, any>; // Replace later with specific params type
  ayah: Ayah;
  currentAudio: HTMLAudioElement | null;
  setCurrentAudio: (audio: HTMLAudioElement | null) => void;
}

interface MobileSheetProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsScrolling?: React.Dispatch<React.SetStateAction<boolean>>;
  searchResults?: SearchResult[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  surahs?: Surah[];
  surahNumber?: number;
}

interface SidebarHeaderProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
}

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

interface ActionButtonProps {
  text: string;
  onClick: () => void;
}

interface SurahPlayerProps {
  surahNumber: number;
}

// * ================== JUZ ================== *
interface Juz {
  number: number;
  text: string;
  surah: Surah;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

// * ================== SHARED SMALL TYPES ================== *
interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
}

interface SurahSummary {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
}

// REWRITE ENTIRE PROPS AND ORGANIZE WITH STARS

interface SurahPlayerProps {
  surahNumber: number;
  ayahText: any;
  lastAyahNumber: number;
  router: any;
}
