import { DM_Sans } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { GlobalStateProvider } from "@/lib/providers/GlobalStatesProvider";

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
      <GlobalStateProvider>
        <html lang="en" className="dark">
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <body className={`${dm_sans.className} dark:bg-[#08080a] bg-white`}>
            {children}
            <Toaster />
          </body>
        </html>
      </GlobalStateProvider>
    </ClerkProvider>
  );
}
