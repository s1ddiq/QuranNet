import Link from 'next/link';
import React from 'react';

const Saved = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center px-6 text-white bg-[#18181B]">
      <div className="text-6xl mb-4">😢</div>
      <h1 className="text-2xl font-semibold mb-2">Saved not available yet</h1>
      <p className="text-gray-300 max-w-md">
       We're still working on setting up the Saved system.
        Check back soon, or follow us for updates!
      </p>
      <Link
          href="/"
          className="px-5 py-2 mt-4 bg-blue-500 hover:bg-zinc-700 text-white rounded-xl text-sm font-medium transition"
        >
          Go back ♥
        </Link>
    </div>
  );
};

export default Saved;
