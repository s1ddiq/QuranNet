import { Inter, Noto_Sans_Arabic, Codystar, DM_Sans } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Toaster } from "@/components/ui/sonner";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { EclipseIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });
const cody = Codystar({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cody",
});
const noto_sans = Noto_Sans_Arabic({ subsets: ["arabic"] });
const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "QuranNet",
  description: "Read and listen to quran for free - forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body className={`${dm_sans.className} dark:bg-[#08080a] bg-white`}>
          {children}
          {/* <ThemeToggleButton classlist="fixed right-32 bottom-32"/> */}
          <div
            className="fixed bottom-8 right-8 text-3xl dark:bg-[#08080aff] bg-white rounded-full 
          flex justify-center items-center border-px dark:border-white border-gray-400
          cursor-pointer transition-all duration-300 hover:-translate-y-2"
          >
            <ThemeToggleButton classlist="!opacity-0 absolute cursor-pointer" />

            <p className="pointer-events-none dark:text-white text-black">
              <EclipseIcon size={48} />
            </p>
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
