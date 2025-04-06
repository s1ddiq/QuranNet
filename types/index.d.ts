interface Surah {
    number: number;
    name: string,
    englishName: string,
    englishNameTranslation: string,
    numberOfAyahs: number,
    revelationType: string,
}

interface Ayah {
    number: number;
    text: string,
    numberInSurah: number,
    juz: number,
    manzil: number,
    page: number,
    ruku: number,
    hizbQuarter: number,
    sajda: boolean,
}

interface SearchResult {
    edition: Object,
    number: number,
    numberInsurah: number,
    surah: Object,
    text: string,
}