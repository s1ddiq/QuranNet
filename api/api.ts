export const fetchAllSurahs = async () => {
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/surah`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching surahs:", error);
  }
};

export const fetchSurahById = async (id: number) => {
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching surah by ID:", error);
  }
};

{
  /* TODO: Change to a more detailed function name */
}
export const searchQuran = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/search/${query}/all/en`
    );
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching Quran:", error);
  }
};

export const fetchSurahTranslation = async (surahId: number) => {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahId}/en.sahih`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data); // --DEBUG
    return data.data; // Assuming the translation text is in data.data.text
  } catch (error) {
    console.error("Error fetching ayah translation:", error);
  }
};

export const fetchAyahTranslation = async (surahId: number, ayahId: number) => {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/ayah/${surahId}:${ayahId}/en.sahih`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data); // --DEBUG
    return data; // Assuming the translation text is in data.data.text
  } catch (error) {
    console.log("Error fetching ayah translation:", error);
  }
};

export const fetchAyahAudio = async (
  surahId: number,
  ayahId: number,
  type?: unknown
) => {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/ayah/${surahId}:${ayahId}/ar.alafasy`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching ayah-audio:", error);
  }
};

export const fetchSurahAudio = async (surahId: number) => {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahId}/ar.alafasy`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching surah-audio: ${error}`);
  }
};

export const fetchJuz = async (juzId: string | null) => {
  if (!juzId) {
    console.log("Invalid juzId provided."); // 🚨
    return null;
  }

  try {
    const responseEnglish = await fetch(
      `https://api.alquran.cloud/v1/juz/${juzId}/en.sahih`
    );
    const responseArabic = await fetch(
      `https://api.alquran.cloud/v1/juz/${juzId}/quran-uthmani`
    );

    if (!responseEnglish.ok || !responseArabic.ok) {
      throw new Error(`HTTP error! status: ${responseEnglish.status}`);
    }
    
    const english = await responseEnglish.json();
    const arabic = await responseArabic.json();
    
    return { arabic, english };
  } catch (error) {
    console.log(`Error fetching juz: ${error}`);
    return null;
  }
};


// archoiv


/*
     {juz?.arabic.data.ayahs.map((juzAyah: Ayah) => (
            <div key={juzAyah.number}>
              <p className="text-sm text-gray-400 p-4">
                {juzAyah.numberInSurah}
              </p>
              <p
                className={cn(
                  "text-zinc-200 md:leading-[1.2] leading-[1.5] md:ml-8 text-left pt-6 lg:w-2/3 md:w-4/6",
                  {
                    "text-base": fontSize === 1, // If fontSize is 1, apply text-sm
                    "text-lg": fontSize === 2, // If fontSize is 2, apply text-base
                    "text-xl": fontSize === 3, // If fontSize is 3, apply text-lg
                  }
                )}
              >
                {juzAyah.text}
              </p>
            </div>
          ))}
          {juz?.english.data.ayahs.map((juzAyah: Ayah) => (
            <div key={juzAyah.number}>
              <p className="text-sm text-gray-400 p-4">
                {juzAyah.numberInSurah}
              </p>
              <p
                className={cn(
                  "text-zinc-200 md:leading-[1.2] leading-[1.5] md:ml-8 text-left pt-6 lg:w-2/3 md:w-4/6",
                  {
                    "text-base": fontSize === 1, // If fontSize is 1, apply text-sm
                    "text-lg": fontSize === 2, // If fontSize is 2, apply text-base
                    "text-xl": fontSize === 3, // If fontSize is 3, apply text-lg
                  }
                )}
              >
                {juzAyah.text}
              </p>
            </div>
          ))}
*/