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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  }
};
/* This file is used to define the web app manifest for the QuranNet PWA.  */
/* It includes metadata such as the app name, description, start URL, display mode, background color, theme color, and icons. */
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
          <body className={`${dm_sans.className} dark:bg-[#08080a] bg-[var(--sephia-primary)]`}>
            {children}
            <Toaster />
          </body>
        </html>
      </GlobalStateProvider>
    </ClerkProvider>
  );
}
