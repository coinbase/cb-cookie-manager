import { useMemo } from 'react';

import {
  DEFAULT_CONSENT_PREFERENCES_COOKIE,
  EU_CONSENT_PREFERENCES_COOKIE,
  IS_MOBILE_APP,
} from '../constants';
import { useCookie } from '../CookieContext';
import { useTrackingManager } from '../TrackingManagerContext';
import { Region, TrackingCategory, TrackingPreference } from '../types';
import { getIsMobileAppFromQueryParams } from '../utils/persistMobileAppPreferences';

export const useSavedTrackingPreferenceFromMobileApp = (): TrackingPreference | undefined => {
  const { region } = useTrackingManager();

  const [isMobileAppFromCookie] = useCookie(IS_MOBILE_APP);

  const isMobileAppFromQueryParams = useMemo(() => getIsMobileAppFromQueryParams(), []);

  const isMobileApp = isMobileAppFromCookie || isMobileAppFromQueryParams;

  const mobileAppPreference: TrackingPreference | undefined = useMemo(() => {
    if (isMobileApp)
      return {
        region,
        consent: [TrackingCategory.NECESSARY],
      };
  }, [isMobileApp, region]);

  return mobileAppPreference;
};

export const useSavedTrackingPreference = (): TrackingPreference | undefined => {
  const { region, onError } = useTrackingManager();

  const [euCookie] = useCookie(EU_CONSENT_PREFERENCES_COOKIE);
  const [defaultCookie] = useCookie(DEFAULT_CONSENT_PREFERENCES_COOKIE);
  const preference: TrackingPreference | undefined =
    region === Region.EU ? euCookie : defaultCookie;
  if (!preference) return;

  if (!preference.region || !preference.consent) {
    onError(new Error('Malformed preferences'));
    return;
  }
  return preference;
};
