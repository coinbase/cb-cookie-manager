import { CookieBanner } from '@coinbase/cookie-banner';
import { useCookie } from '@coinbase/cookie-manager';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

import useTranslations from '@/hooks/useTranslations';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [, setIpCountryCookie] = useCookie('ip_country');
  const [, setLocaleCookie] = useCookie('locale');
  const [, setRFMCookie] = useCookie('rfm');
  const [trackingPreference] = useCookie('cm_eu_preference');

  useEffect(() => {
    setIpCountryCookie('US');
    setRFMCookie('locale');
    setLocaleCookie('en');
  }, [setIpCountryCookie, setLocaleCookie, setRFMCookie, trackingPreference]);

  return (
    <main className={`flex min-h-screen bg-black justify-end flex-col ${inter.className}`}>
      <CookieBanner
        link={'https://www.coinbase.com/legal/cookie'}
        useTranslations={useTranslations}
        companyName={'Coinbase'}
      />
    </main>
  );
}
