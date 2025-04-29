// //   useEffect(() => {
//     const fetchSearchResults = async () => {
//         if (!searchQuery.trim()) {
//           setSearchResults([]);
//           return;
//         }
  
//         setLoading(true);
//         try {
//           const res = await searchQuran(searchQuery);
//           setSearchResults(res.data.matches); // Adjust this depending on your API response
//           // Debug statement removed for production
//         } catch (err: unknown) {
//           if (err instanceof Error) {
//             console.error("Search error:", err.message);
//           } else {
//             console.error("Search error:", err);
//           }
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       const debounceTimer = setTimeout(fetchSearchResults, 300); // debounce 300ms
//       return () => clearTimeout(debounceTimer);
//     }, [searchQuery]);



//  {/* {isSearchModalOpen && (
//     <div
//     className="fixed top-0 bg-transparent backdrop-blur-sm w-full h-screen flex justify-center items-center"
//     onClick={() => setIsSearchModalOpen(false)}
//   >
//     <div className="min-w-[680px] border h-72 bg-zinc-800 rounded-xl">
//       <div className="relative w-full">
//         <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-5 h-5" />
//         <Input
//           type="text"
//           placeholder="Search the Quran"
//           onClick={() => setIsSearchModalOpen(true)}
//           className="w-full pl-10 border-0 border-b !bg-transparent rounded-none h-14 focus:ring-0 focus:ring-offset-0 text-white"
//         />
//       </div>

//       <div className="p-4">
//         <p className="text-gray-200 text-sm">Quick Navigation</p>
//         <div className="w-full flex gap-3 pt-2">
//           {["Al-Fatihaa", "Al-Kahf", "Juz 1",].map((i) => (
//             <div className="bg-zinc-900 rounded-md px-2 text-sm" key={i}>
//               <Link href='/surah/1' className="text-gray-200">{i}</Link>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="p-4">
//       <p className="text-gray-200 text-sm">Recent Navigations</p>
//       😢
//       <p>Nothing...</p>
//       </div>
//     </div>
//   </div>
// )} */}