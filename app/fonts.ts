import { Amiri, Montserrat } from 'next/font/google';

export const amiri = Amiri({
  weight: '400',
  subsets: ['arabic'],
});

export const montserrat = Montserrat({
  weight: ['400', '700'], // you can add more like '500' if you want
  subsets: ['latin'],
});
