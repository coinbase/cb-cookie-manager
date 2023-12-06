import { CookieBanner } from '@coinbase/cookie-banner';
import { Inter } from 'next/font/google';

import useTranslations from '@/hooks/useTranslations';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex min-h-screen bg-black justify-end flex-col ${inter.className}`}>
      <CookieBanner
        link={'https://www.coinbase.com/legal/cookie'}
        useTranslations={useTranslations}
      />
    </main>
  );
}
