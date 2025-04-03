'use client'
import { fetchAllSurahs } from '@/api/api';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Surah = () => {
      const [surahs, setSurahs] = useState<any[]>([]);
      const [searchQuery, setSearchQuery] = useState<string>("");
    
      useEffect(() => {
        const func = async () => {
          const response = await fetchAllSurahs();
          setSurahs(response);
        };
        func();
      }, []);
    
      // Filter surahs based on search query
      const filteredSurahs = surahs.filter((surah) =>
        surah.surahName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const params = useParams();
  return (
    <section className="w-full flex items-center flex-col bg-[#08080aff] flex-1 pt-8">
     <h1 className='text-6xl font-bold text-center text-white'>{params.surah}</h1>
     <div>
        <p>{}</p>
     </div>
    </section>
  )
}

export default Surah
