

export const fetchAllSurahs = async () => {
    try {
        const response = await fetch(`https://quranapi.pages.dev/api/surah.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {   
        console.error("Error fetching surahs:", error);
    }
}