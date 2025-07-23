import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import { RootProviders } from '@/app/RootProviders';

const coinbaseSans = localFont({
  src: [
    {
      path: '../fonts/base-sans/BaseSans-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/base-sans/BaseSans-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../fonts/base-sans/BaseSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/base-sans/BaseSans-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/base-sans/BaseSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/base-sans/BaseSans-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/base-sans/BaseSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/base-sans/BaseSans-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/base-sans/BaseSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/base-sans/BaseSans-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../fonts/base-sans/BaseSans-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../fonts/base-sans/BaseSans-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-coinbase-sans',
});

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={`${coinbaseSans.variable} ${inter.className}`}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
