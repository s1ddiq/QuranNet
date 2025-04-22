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
  translation: any;
  surahNumber?: number;
}

interface EnglishAyah {
  number: number;
  text: string;
  edition: {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
    direction: string;
  };
  surah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
  };
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

interface SearchResult {
  edition: {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
    direction: string;
  };
  number: number;
  numberInSurah: number;
  surah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
  };
  text: string;
}

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
  params: any; // REPLACE LATER WITH PROPER TYPES.
  ayah: Ayah & { translation?: string }; // REPLACE LATER WITH PROPER TYPES.
  currentAudio: HTMLAudioElement | null;
  setCurrentAudio: (audio: HTMLAudioElement | null) => void;
}

interface MobileSheetProps {
  isOpen: boolean; // Boolean state for whether the sheet is open or not
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Set state function to toggle the open state
  // isScrolling: boolean; // Boolean state to check if the sheet is scrolling
  setIsScrolling?: React.Dispatch<React.SetStateAction<boolean>>; // Set state function for scrolling state
  searchResults?: SearchResult[]; // Array of search results of type `SearchResult`
  searchQuery: string; // Search query string to filter the results
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  // amount: number;
  surahs?: Surah[];
}

interface SidebarHeaderProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
}

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

interface ActionButtonProps {
  text: string;
  onClick?: () => void; // make unoptional;
}

interface SurahPlayerProps {
  surahNumber: number;
}

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
  sajda: boolean; // maybe add ayahs[] as seperate
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