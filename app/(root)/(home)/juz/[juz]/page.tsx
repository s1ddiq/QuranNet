// 'use client'
// import { fetchJuz } from '@/api/api';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react'

// const Juz = () => {
//   const [juz, setJuz] = useState<Juz[]>();
//   const params = useParams();
//   const juzNumber = Number(params.juz);
//   useEffect(() => {
//     const func = async () => {
//       const res = await fetchJuz(juzNumber);
      
//       setJuz(res.data.ayahs);
//     }
//     func();
//   }, [])
//   return (
//     <div className='text-white'>
//       {juz && juz.map((juz) => (
//         <p>{juz.text}</p>
//       ))}
//     </div>
//   )
// }

// export default Juz
'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Juz = () => {
  const router = useRouter();
  return (
    <div>
      <div className="w-full h-screen flex flex-col items-center justify-center text-center px-6 text-white bg-[#18181B]">
      <div className="text-6xl mb-4">😢</div>
      <h1 className="text-2xl font-semibold mb-2">Juz Reader not available yet</h1>
      <p className="text-gray-300 max-w-md">
       We're still working on setting up the Juz Reader.
        Check back soon, or follow us for updates!
      </p>
      <button
          onClick={() => router.back()}
          className="px-5 py-2 mt-4 bg-blue-500 hover:bg-zinc-700 text-white rounded-xl text-sm font-medium transition"
        >
          Go back ♥
        </button>
    </div>
    </div>
  )
}

export default Juz 
