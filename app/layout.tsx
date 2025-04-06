import { Inter, Noto_Sans_Arabic, Codystar, DM_Sans } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ['latin'] })
const cody = Codystar({ subsets: ['latin'], weight: "400", variable: '--font-cody' });
const noto_sans = Noto_Sans_Arabic({subsets: ['arabic']})
const dm_sans = DM_Sans({subsets: ['latin']})


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
    <html lang="en">
      <body
        className={`${dm_sans.className}`}
      >
        {children}
      </body>
    </html>
  );
}
