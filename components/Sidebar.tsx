"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div>
      <div className="w-[350px] h-screen bg-transparent border-x border-px border-[#262629ff] sticky top-0 sm:block hidden">
        <div className="w-full flex justify-start pt-4 pl-4 items-center">
          <Image
            src="/svg/logo.svg"
            width={72}
            height={72}
            alt="Logo"
            className="hover:-translate-y-2 cursor-pointer transition-discrete transition-all duration-300"
            title="QuranNet - Home"
            onClick={() => router.replace("/")}
          />
        </div>
        <div className="flex flex-col gap-3 mt-4 px-4">
          <p className="text-white text-sm font-light ml-2 pointer-events-none">
            Search surah, verse, juz, or page
          </p>
          <div className="rounded-full border border-px border-[#262629ff] w-full h-12 flex items-center justify-center relative p-2">
            <Image
              src="/svg/search.svg"
              alt="Search Icon"
              width={16}
              height={16}
              className="absolute left-4 pointer-events-none"
            />
          </div>
        </div>

        <div className="p-4"></div>

        <p className="text-white text-sm font-light ml-2 opacity-10 pointer-events-none">
          website in development pls dont judge this trash.
        </p>
      </div>
      <Sheet>
        <SheetTrigger className="text-white fixed w-full sm:hidden flex justify-between p-2 top-0 bg-[#08080a] border-b border-px border-[#262629ff]">
          <Image
            src="/svg/menu.svg"
            width={32}
            height={32}
            alt="Logo"
            title="QuranNet - Menu"
          />

<Image
            src="/svg/logo.svg"
            width={56}
            height={56}
            alt="Logo"
            title="QuranNet - Home"
          />
        </SheetTrigger>
        <SheetContent side="top" className="h-[30%] bg-[#08080a]">
          <SheetHeader>
            <div className="flex flex-col gap-3 mt-4 px-4">
              <p className="text-white text-lg font-light">
                Search surah, verse, juz, or page
              </p>
              <div className="rounded-full border border-px border-[#262629ff] w-full h-12 flex items-center justify-center relative p-2">
                <Image
                  src="/svg/search.svg"
                  alt="Search Icon"
                  width={16}
                  height={16}
                  className="absolute left-4 pointer-events-none"
                />
              </div>
            <p className="text-white text-lg font-light">
                Quick Navigation
              </p>

              <div className="opacity-80">
                <Link href={'/'} className="text-lg text-white">Go Home</Link>
              </div>
            </div>

            <p className="text-white text-sm font-light ml-2 absolute bottom-0 opacity-10 pointer-events-none">
              website in development pls dont judge this trash.
            </p>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
