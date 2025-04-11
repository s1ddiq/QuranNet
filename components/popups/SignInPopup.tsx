"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";

export default function SignInPopup() {
  const { isSignedIn } = useUser();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      setShowPopup(true);
    }
  }, [isSignedIn]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-[#08080aff]/90 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full text-center border-2 border-black">
        <h2 className="text-2xl font-bold mb-2 text-black">Sign in to unlock more 🔓</h2>
        <p className="text-gray-400 mb-4">
          Create your profile, access recent surahs, enjoy saved highlighted/bookmarked ayahs,
          and get personalized features.
        </p>

        <div className="flex flex-row justify-center items-center flex-wrap w-full">
          <Button className="mr-2 min-w-32 hover:opacity-80 text-white">
            <Link href={`/sign-in`}>Sign In</Link>
          </Button>
          <Button
            className="text-gray-400 hover:opacity-80 ml-2 min-w-32"
            onClick={() => setShowPopup(false)}
          >
            Maybe later
          </Button>
        </div>
      </div>
    </div>
  );
}
