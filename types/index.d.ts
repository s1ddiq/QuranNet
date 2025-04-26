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

// im singing rn lol
// [Verse 1: Rxseboy]
// Stay with me a little longer 'fore we break it off
// I know you love me this ain't something I would trade at all
// We got a past I know it's tragic we can't take it back
// We're at the end but honestly girl I don't hate the fact
// That we gave it a good try, it's warming my heart
// But the day that you gon' leave me girl it tears me apart
// I got used to having you so close in my arms
// Nowadays when you got close to me I sound an alarm

// [Chorus: Rxseboy]
// Oh~ why you say that you don't know~
// Tell me where you wanna go~
// We could hit the road~ oh~
// Oh~ why you say that you don't know~
// Tell me where you wanna go~
// We could hit the road~ oh~

// [Verse 2: Jomie]
// But if you really wanna leave you know I'll never blame you
// You always were so hard to reach like you're my operator
// Took a piece of me when you're the one that needed saving
// Would you sneak your face, take them with an explanation
// 'Cus there's always bumps on this road (this road)
// But now I got no hand to hold
// Take your chance look where it took me
// Baby you're rookie
// C'mon let's-
// See upcoming rap shows
// Get tickets for your favorite artists
// You might also like
// Sweet
// Lana Del Rey
// Dum Dum
// Jeff Satur
// ไผกะได้ (Anyone)
// FIIXD, BIRDMANKKC & 1LIFE (THA)
// Oh~ why you say that you don't know~
// Tell me where you wanna go~
// We could hit the road~ oh~
// Oh~ why you say that you don't know~
// Tell me where you wanna go~
// We could hit the road~ oh~