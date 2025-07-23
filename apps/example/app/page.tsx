'use client';

import { CookieBanner } from '@coinbase/cookie-banner';
import { useCookie } from '@coinbase/cookie-manager';
import { useEffect } from 'react';

import useTranslations from '@/hooks/useTranslations';
const cookieBannerTheme = {
  colors: {
    primary: '#1652F0',
    positive: '#05B169',
    negative: '#DF5F67',
    warning: '#F4C622',
    background: '#ffffff',
    backgroundMuted: '#ffffff',
    onBackground: 'rgba(0,0,0)',
    onBackgroundMuted: 'rgba(0,0,0,0.5)',
    onPrimary: '#FFFFFF',
    overlay: 'rgba(17,52,83,0.6)',
  },
  border: {
    border: '1px solid #D8D8D8',
    borderRadius: '4px',
  },
  fontSize: {
    sm: '14px',
    md: '16px',
  },
  lineHeight: {
    sm: '16px',
    md: '24px',
  },
  fontWeight: {
    regular: '400',
    bold: '500',
  },
  size: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
  },
  breakpoints: {
    phone: 560,
    desktop: 992,
    tablet: 768,
  },
  zIndex: {
    hidden: 0,
    normal: 1,
    elevated: 2,
    high: 2,
    extraHigh: 3,
    backdrop: 999,
    overlay: 1000,
    top: 1001,
  },
  gutters: {
    horizontal: {
      sm: '10px',
      md: '20px',
    },
    vertical: {
      sm: '10px',
      md: '10px',
    },
  },
};

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
    <main className={`flex min-h-screen bg-black justify-end flex-col`}>
      <CookieBanner
        link={'https://www.coinbase.com/legal/cookie'}
        useTranslations={useTranslations}
        companyName={'Coinbase'}
        theme={cookieBannerTheme}
        classNames={{
          banner: {
            container: 'leading-[16px] font-sans tracking-[0.14px]',
            secondaryCta:
              '!rounded-[8px] !border-[rgba(10,11,13,0.2)] !border-[1px] !border !border-solid !text-black !py-2.5 !px-4 md:!border-none hover:!text-gray-90 transition-colors',
            primaryCta:
              '!rounded-[8px] !bg-[#0A0B0D] !text-base-white hover:!bg-base-blue !py-2.5 !px-4 transition-colors !border-transparent',
            cookieLink: '!text-[#0A0B0D]',
          },
          modal: {
            container: 'leading-[16px] font-sans',
            primaryCta:
              '!rounded-[8px] !bg-base-black !text-base-white hover:!bg-base-blue !py-2.5 !px-4 transition-colors',
          },
        }}
      />
    </main>
  );
}
