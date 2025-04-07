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


{/* TODO: Change to a more detailed function name */}
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
