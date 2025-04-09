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
  edition: Object;
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
  ayah: Ayah;
  translatedAyahs: any[]; // REPLACE LATER WITH PROPER TYPES.
}

interface MobileSheetProps {
  isOpen: boolean; // Boolean state for whether the sheet is open or not
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Set state function to toggle the open state
  isScrolling: boolean; // Boolean state to check if the sheet is scrolling
  setIsScrolling: React.Dispatch<React.SetStateAction<boolean>>; // Set state function for scrolling state
  searchResults: SearchResult[]; // Array of search results of type `SearchResult`
  searchQuery: string; // Search query string to filter the results
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  amount: number;
}

interface SidebarHeaderProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
}

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}