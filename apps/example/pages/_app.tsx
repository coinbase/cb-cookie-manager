'use client';
import '@/styles/globals.css';

import { Provider, Region, TrackingCategory, TrackingPreference } from 'cb-cookie-manager';
import type { AppProps } from 'next/app';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cookieManagerConfig } from '../utils/cookieManagerConfig';

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const trackingPreference = useRef<TrackingPreference | undefined>();
  const setTrackingPreference = useCallback((newPreference: TrackingPreference) => {
    const priorConsent = trackingPreference.current?.consent;
    trackingPreference.current = newPreference;

    if (!priorConsent) {
      // The first time the modal appears, this function is called with nothing present in
      // trackingPreference.current. To avoid an infinite refresh loop, we return early on
      // the first call.
      return;
    }

    const newConsent = newPreference.consent;

    // Best only to reload if the preferences have actually changed.
    const diff = [
      ...priorConsent.filter((elem: TrackingCategory) => !newConsent.includes(elem)),
      ...newConsent.filter((elem: any) => !priorConsent.includes(elem)),
    ];

    // reload if the preferences have changed
    if (diff.length > 0) {
      window.location.reload();
    }
  }, []);
  if (!isMounted) return null;

  return (
    <Provider
      onError={console.error}
      projectName="test"
      locale="en"
      region={Region.EU}
      config={cookieManagerConfig}
      log={console.log}
      onPreferenceChange={setTrackingPreference}
    >
      <Component {...pageProps} />
    </Provider>
  );
}
